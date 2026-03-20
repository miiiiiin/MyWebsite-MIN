// api/chat.js — Vercel Serverless Function + Supabase 연동
//
// 필요한 환경변수 (.env.local & Vercel Dashboard):
//   CLAUDE_API_KEY     = sk-ant-xxxxxxxx
//   SUPABASE_URL       = https://xxxx.supabase.co
//   SUPABASE_ANON_KEY  = eyJxxxxxxxx
//
// ⚠ 주의: Vercel Serverless에서는 VITE_ 접두사 변수를 읽을 수 없어요.
//   프론트엔드용 VITE_SUPABASE_URL 과는 별개로
//   SUPABASE_URL / SUPABASE_ANON_KEY 를 Vercel 환경변수에 따로 추가해야 해요.
// ─────────────────────────────────────────────────────────

const OWNER_PROFILE = {
    name: 'Min',
    role: '백엔드 개발자',
    career: '신입 (iOS 개발자 3년 경력 유)',
    location: '서울, 한국',
    email: 'min.songkyung@gmail.com',
    github: 'https://github.com/miiiiiin',
    blog: 'https://miiiiiin-devlog.tistory.com/',
};

// ── Supabase fetch ────────────────────────────────────────
async function fetchProjects() {
    // VITE_ 접두사 없는 변수만 사용 (Vercel Serverless는 VITE_ 못 읽음)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('[chat.js] Supabase env vars missing. SUPABASE_URL:', !!supabaseUrl, '/ SUPABASE_ANON_KEY:', !!supabaseAnonKey);
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
        const errText = await res.text();
        console.error('[chat.js] Supabase fetch failed:', res.status, errText);
        return [];
    }

    const data = await res.json();
    console.log(`[chat.js] Supabase: fetched ${data.length} projects`);
    return data;
}

// ── 프로젝트 → 프롬프트 텍스트 ──────────────────────────────
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

// ── System Prompt 조립 ───────────────────────────────────
function buildSystemPrompt(projects) {
    const p = OWNER_PROFILE;

    return `
당신은 ${p.name}의 포트폴리오 AI 어시스턴트입니다.
포트폴리오를 방문한 사람들(채용담당자, 협업 제안자, 개발자 동료)의 질문에 답변합니다.

## 페르소나 & 톤
- 1인칭("저는", "제가")이나 3인칭("${p.name}님은") 대신 "이 개발자는", "포트폴리오에서는" 같은 자연스러운 표현을 사용합니다.
- 친절하고 전문적인 톤. 불필요한 서두("네, 좋은 질문이에요!")는 생략하고 바로 핵심을 답합니다.
- 기술 용어는 영어 원문 유지 (React, Swift, UIKit 등).
- 답변은 항상 한국어로.
- 마크다운은 **굵게**와 \`인라인 코드\`만 사용. 헤더(#)나 불릿(-) 리스트는 쓰지 않습니다.

## 답변 전략
- 프로젝트 관련 질문 → 해당 프로젝트를 구체적으로 언급하고 GitHub/링크 제공.
- 기술 스택 질문 → 단순 나열 대신 "어떤 프로젝트에서 왜 썼는지" 맥락 포함.
- iOS 경력과 백엔드 전향 배경 → 자연스럽게 연결지어 강점으로 설명.
- 채용/협업 문의 → 연락처를 자연스럽게 안내.
- 긴 답변은 핵심 2~3줄 요약 후 "더 궁금한 점 있으면 알려주세요"로 마무리.

## 기본 정보
- 직군: ${p.role}
- 경력: ${p.career}
- 위치: ${p.location}

## 연락처
- 이메일: ${p.email}
- GitHub: ${p.github}
- Blog: ${p.blog}

## 프로젝트 목록
${formatProjects(projects)}

## 경계 규칙
- 포트폴리오·채용·개발과 무관한 질문(날씨, 주식 등)에는 "저는 이 포트폴리오에 대한 질문만 답변할 수 있어요! 다른 궁금한 점 있으신가요?"라고만 답변.
- 포트폴리오에 없는 내용은 절대 지어내지 않습니다. 없으면 "해당 내용은 포트폴리오에 없어요."라고 솔직하게 답변.
- 전화번호, 정확한 주소 등 민감한 개인정보는 공개하지 않습니다.
`.trim();
}

// ── Vercel Handler ────────────────────────────────────────
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Supabase fetch (실패해도 기본 정보로 fallback)
    let projects = [];
    try {
        projects = await fetchProjects();
    } catch (err) {
        console.error('[chat.js] Supabase unexpected error:', err);
    }

    const systemPrompt = buildSystemPrompt(projects);

    // Claude API 키 체크
    if (!process.env.CLAUDE_API_KEY) {
        console.error('[chat.js] CLAUDE_API_KEY is missing');
        return res.status(500).json({ error: 'Server misconfiguration' });
    }

    try {
        const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 1000,
                system: systemPrompt,
                messages,
            }),
        });

        // Claude가 에러 반환한 경우 → 상세 내용을 로그에 남기고 프론트에 전달
        if (!claudeRes.ok) {
            const errBody = await claudeRes.json().catch(() => ({}));
            console.error('[chat.js] Claude API error:', claudeRes.status, errBody);
            return res.status(claudeRes.status).json({
                error: errBody?.error?.message ?? 'Claude API error',
                type: errBody?.error?.type ?? 'unknown',
            });
        }

        const data = await claudeRes.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('[chat.js] Fetch to Claude failed:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}