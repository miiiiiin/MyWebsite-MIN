# 🚀 백엔드 개발자 포트폴리오 (iOS to Backend)

이 프로젝트는 3년 차 iOS 개발자에서 **Spring Boot 백엔드 개발자**로 직무를 전환하는 과정에서의 기술력과 문제 해결 능력을 시뮬레이션하기 위한 **macOS Big Sur 스타일**의 포트폴리오 웹사이트입니다.

## 🌟 주요 특징

### 1. macOS Big Sur Desktop Experience
- **데스크탑 메타포**: 실제 운영체제와 유사한 윈도우 관리 시스템과 드래그 가능한 아이콘.
- **다이내믹 독(Dock)**: 글래스모피즘 효과가 적용된 하단 독을 통해 Writing, Music, Photos, Code 등의 컨텐츠에 접근.
- **디더링(Dithered) 배경**: 레트로한 감성과 현대적인 UI가 결합된 독특한 비주얼 아이덴티티.

### 2. 고도화된 AI 어시스턴트 (MIN-Bot)
- **Claude 4 정식 연동**: 실시간 문맥 파악과 자연스러운 대화가 가능한 지능형 챗봇.
- **터미널 스타일 인터페이스**: 개발자 감성을 살린 CLI 형태의 입력창과 전송 버튼 UI.
- **자동화 기능**: "이력서"와 같은 특정 키워드에 반응하여 관련 문서를 즉시 출력.

### 3. 클라우드 기반 데이터 관리
- **Supabase Integration**: 실시간 데이터베이스와 인증, 스토리지 시스템을 활용한 확장 가능한 아키텍처.
- **콘텐츠 동적 로딩**: 블로그 포스트(Writing), 음악(Music) 등의 데이터를 백엔드에서 실시간으로 호출.

### 4. 직무 전환 스토리텔링
- iOS 경험을 바탕으로 한 **클라이언트 중심의 API 설계** 및 **시스템 아키텍처** 트러블슈팅 사례 강조.
- 단순한 기능 구현을 넘어, 효율적인 데이터 스키마 설계와 안정적인 서버 운영 모델 제시.

## 🛠 Tech Stack

- **Frontend**: React (Vite), Vanilla CSS (Custom tokens)
- **Backend/DB**: Supabase (PostgreSQL, Realtime, Storage)
- **AI Model**: Anthropic Claude 4 (Proxy Server setup)
- **Concepts**: Glassmorphism, Micro-interactions, Dithering effects

## 📦 Getting Started

```bash
# 환경 변수 설정 (.env)
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
VITE_CLAUDE_API_KEY=your_key

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 📄 License
이 프로젝트는 개인 포트폴리오 용도로 제작되었습니다.
