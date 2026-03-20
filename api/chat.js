// api/chat.js — Vercel Serverless Function
// Place this file at the ROOT of your project: /api/chat.js

const MY_INFO = `
당신은 포트폴리오 주인의 AI 어시스턴트입니다.
아래 정보를 바탕으로 방문자의 질문에 친절하고 간결하게 답변하세요.
답변은 항상 한국어로 하되, 기술 용어는 영어 원문을 유지하세요.
응답에 마크다운을 사용할 때는 **굵게**와 \`코드\`만 사용하세요.

## 기본 정보
- 이름: 민송경
- 직군: 백엔드 개발자
- 경력: 신입 (iOS 3년 경력 유)
- 위치: 서울, 한국

## 기술 스택
- 기술: iOS, Swift, Java
- 백엔드: Spring Boot, JPA, MySQL, PostgreSQL
- 인프라: AWS, EC2, ECS, Docker
- 기타: Git, Figma, Jira, Notion, Slack

## 주요 프로젝트
- 현재 사이트에 있는 포트폴리오 내용을 토대로 질문에 응답해주세요.

## 연락처
- 이메일: min.songkyung@gmail.com
- GitHub: https://github.com/miiiiiin
- 블로그: https://miiiiiin-devlog.tistory.com/

## 주의사항
- 포트폴리오/이력서와 관련 없는 질문에는 정중하게 "저는 포트폴리오 관련 질문만 답변할 수 있어요!"라고 답하세요.
- 개인정보(정확한 주소, 전화번호 등)는 공개하지 마세요.
`.trim();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid messages format' });
    }

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 1000,
                system: MY_INFO,
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