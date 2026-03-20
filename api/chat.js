// api/chat.js — Vercel Serverless Function
// Place this file at the ROOT of your project: /api/chat.js

// api/chat.js — Vercel Serverless Function + Supabase 연동
//
// 필요한 환경변수 (.env.local & Vercel Dashboard):
//   CLAUDE_API_KEY        = sk-ant-xxxxxxxx
//   SUPABASE_URL          = https://xxxx.supabase.co
//   SUPABASE_ANON_KEY     = eyJxxxxxxxx
//
// ─────────────────────────────────────────────────────────

// ── 1. 본인 고정 정보 (DB에 없는 것들) ──────────────────────
const OWNER_PROFILE = {
    name: 'Min',
    role: '백엔드 개발자',
    career: '신입 (iOS 개발자 3년 경력 유)',
    location: '서울, 한국',
    email: 'min.songkyung@gmail.com',
    github: 'https://github.com/miiiiiin',
    blog: 'https://miiiiiin-devlog.tistory.com/'
};

// ── 2. Supabase에서 projects 가져오기 ────────────────────────
async function fetchProjects() {
    // .env 파일의 VITE_ 접두사가 붙은 변수를 사용하도록 수정
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase configuration missing');
        return [];
    }

    const url = `${supabaseUrl}/rest/v1/projects?select=*&order=created_at.desc`;

    const res = await fetch(url, {
        headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
        },
    });

    if (!res.ok) {
        console.error('Supabase fetch failed:', await res.text());
        return [];
    }

    return res.json();
}

// ── 3. projects 데이터 → 프롬프트 텍스트 변환 ────────────────
function formatProjects(projects) {
    if (!projects.length) return '(등록된 프로젝트가 없습니다)';

    return projects
        .map((p) => {
            const lines = [`### ${p.title} [${p.category}]`];

            if (p.short_description) lines.push(`- 한 줄 요약: ${p.short_description}`);
            if (p.full_description) lines.push(`- 상세 설명: ${p.full_description}`);
            if (p.technologies?.length) lines.push(`- 사용 기술: ${p.technologies.join(', ')}`);
            if (p.github_url) lines.push(`- GitHub: ${p.github_url}`);
            if (p.link_url) lines.push(`- 배포/링크: ${p.link_url}`);
            if (p.blog_url?.length) lines.push(`- 블로그 글: ${p.blog_url.join(', ')}`);

            return lines.join('\n');
        })
        .join('\n\n');
}

// ── 4. 최종 System Prompt 조립 ───────────────────────────────
function buildSystemPrompt(projects) {
    const p = OWNER_PROFILE;

    return `
당신은 ${p.name}의 포트폴리오 AI 어시스턴트입니다.
포트폴리오를 방문한 사람들(채용담당자, 협업 제안자, 개발자 동료)의 질문에 답변합니다.

## 페르소나 & 톤
- ${p.name}을 대신해서 1인칭("저는", "제가")으로 말하지 않고, 3인칭("${p.name}님은", "이 분은")도 쓰지 않습니다.
- 대신 "이 포트폴리오의 주인은", "개발자는", 혹은 프로젝트 이름 등 자연스러운 표현을 씁니다.
- 친절하고 전문적인 톤. 지나치게 딱딱하거나 지나치게 캐주얼하지 않게.
- 기술 용어는 영어 원문 유지 (React, TypeScript 등).
- 답변은 항상 한국어로.
- 마크다운은 **굵게**와 \`인라인 코드\`만 사용. 헤더(#)나 불릿 리스트(-)는 쓰지 않음.

## 답변 전략
- 질문의 의도를 파악해서 핵심만 간결하게 답변. 불필요한 서두("네, 좋은 질문이에요!")는 생략.
- 프로젝트 관련 질문이면 관련 프로젝트를 구체적으로 언급하고, GitHub/링크가 있으면 함께 제공.
- 기술 스택 질문이면 단순 나열 대신 "어떤 프로젝트에서 왜 썼는지" 맥락 포함.
- 채용/협업 관련 질문이면 연락처를 자연스럽게 안내.
- 답변이 길어질 것 같으면 핵심 2~3줄 요약 후 "더 궁금하신 점 있으면 알려주세요"로 마무리.

## 기본 정보
- 직군: ${p.role}
- 경력: ${p.career}
- 위치: ${p.location}

## 연락처
- 이메일: ${p.email}
- GitHub: ${p.github}
- Blog: ${p.blog}

## 프로젝트 목록 (Supabase에서 실시간 로드됨)
${formatProjects(projects)}

## 경계 규칙
- 포트폴리오·이력서·개발·채용·협업과 무관한 질문(날씨, 주식, 일반 코딩 튜토리얼 등)에는 "저는 이 포트폴리오에 대한 질문만 답변할 수 있어요! 다른 궁금한 점 있으신가요?" 라고만 답변.
- 존재하지 않는 프로젝트나 경험은 절대 지어내지 않음. 없으면 "해당 내용은 포트폴리오에 없어요."라고 솔직하게 답변.
- 개인정보(정확한 주소, 전화번호 등)는 공개하지 마세요.
`.trim();
}

// ── 5. Vercel Handler ────────────────────────────────────────
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid messages format' });
    }

    // DB 실패해도 기본 정보로 graceful fallback
    let projects = [];
    try {
        projects = await fetchProjects();
    } catch (err) {
        console.error('Supabase error (continuing without projects):', err);
    }

    const systemPrompt = buildSystemPrompt(projects);

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'claude-4-sonnet-20250522',
                max_tokens: 1000,
                system: systemPrompt,
                messages,
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            console.error('Claude API error:', err);
            return res.status(response.status).json({ error: 'AI API error' });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('Handler error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
