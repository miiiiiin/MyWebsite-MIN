import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';
import * as cheerio from 'cheerio';
import 'dotenv/config';

// 1. 초기화
const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * 단계 1: 티스토리에서 본문 텍스트 추출
 */
async function fetchTistoryContent(url) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // 티스토리 본문 영역 (스킨에 따라 클래스명이 다를 수 있음, 보통 .entry-content 또는 .tt_article_usr)
    const content = $('.entry-content').text() || $('.tt_article_usr').text();
    return content.replace(/\s+/g, ' ').trim();
}

/**
 * 단계 2: 텍스트를 작은 단위(Chunk)로 쪼개기
 * AI의 컨텍스트 제한 때문에 약 1000자 내외로 자르는 것이 좋습니다.
 */
function chunkText(text, chunkSize = 1000) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
}

/**
 * 메인 실행 함수
 */
async function main(url, projectId) {
    console.log('🚀 인제스트 시작:', url);

    try {
        // 1. 글 가져오기
        const rawText = await fetchTistoryContent(url);
        const chunks = chunkText(rawText);
        console.log(`📝 총 ${chunks.length}개의 청크로 분리됨.`);

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];

            // 2. 임베딩 생성 (OpenAI 사용)
            const embeddingResponse = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: chunk,
            });
            const [{ embedding }] = embeddingResponse.data;

            // 3. Supabase DB에 저장
            const { error } = await supabase
                .from('blog_chunks')
                .insert({
                    project_id: projectId, // 포트폴리오 프로젝트 ID (없으면 null 가능)
                    source_url: url,
                    chunk_index: i,
                    content: chunk,
                    embedding: embedding,
                    metadata: { title: "티스토리 블로그 글", crawled_at: new Date() }
                });

            if (error) throw error;
            console.log(`✅ 청크 ${i + 1}/${chunks.length} 저장 완료`);
        }

        console.log('🎉 모든 데이터가 성공적으로 벡터 DB에 저장되었습니다!');
    } catch (err) {
        console.error('❌ 에러 발생:', err);
    }
}

// 실행 예시: node scripts/ingest.js "본인의 티스토리 주소"
const targetUrl = process.argv[2];
if (targetUrl) {
    main(targetUrl, null);
} else {
    console.log("URL을 입력해주세요: node scripts/ingest.js [URL]");
}