# Grass Frontend

React + Vite + Solana Wallet Adapter 기반 프론트엔드

## 설치

\`\`\`bash
npm install
\`\`\`

## 환경 변수

`.env` 파일을 생성하세요:

\`\`\`env
VITE_API_URL=http://localhost:3001
\`\`\`

## 실행

개발 모드:
\`\`\`bash
npm run dev
\`\`\`

빌드:
\`\`\`bash
npm run build
\`\`\`

프리뷰:
\`\`\`bash
npm run preview
\`\`\`

## 주요 컴포넌트

- **LoginPage** - 지갑 연결 페이지
- **Header** - 상단 네비게이션 바
- **Dashboard** - 메인 대시보드
- **TaskInput** - 작업 입력 폼
- **TaskList** - 작업 목록
- **Stats** - 통계 위젯
- **AIHelper** - AI 도우미 패널

## Context

- **AuthContext** - 사용자 인증 상태 관리
- **TaskContext** - 작업 관리 및 CRUD


