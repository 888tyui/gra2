# 🚀 Solana RPC 최적화 가이드

## ⚠️ 현재 문제

공용 RPC (`clusterApiUrl`)는:
- ❌ 매우 느림 (수초 대기)
- ❌ Rate limit (초당 요청 제한)
- ❌ 불안정함

## ✅ 해결책: 빠른 RPC 사용

### Option 1: Helius (추천) 🌟

**무료 플랜:**
- ✅ 월 100,000 요청
- ✅ 매우 빠름
- ✅ 안정적

**설정 방법:**
1. https://helius.dev 가입
2. 무료 API Key 발급
3. Railway Frontend Variables에 추가:
   ```env
   VITE_SOLANA_RPC=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
   ```

### Option 2: QuickNode

**무료 플랜:**
- ✅ 일일 25M 요청
- ✅ 빠름

**설정 방법:**
1. https://quicknode.com 가입
2. Solana Mainnet 엔드포인트 생성
3. Railway Variables:
   ```env
   VITE_SOLANA_RPC=https://your-endpoint.solana-mainnet.quiknode.pro/YOUR_KEY/
   ```

### Option 3: Alchemy

**무료 플랜:**
- ✅ 월 300M 요청
- ✅ 매우 빠름

**설정 방법:**
1. https://alchemy.com 가입
2. Solana 앱 생성
3. Railway Variables:
   ```env
   VITE_SOLANA_RPC=https://solana-mainnet.g.alchemy.com/v2/YOUR_API_KEY
   ```

### Option 4: 공식 RPC (기본값)

Railway Variables에 설정 안 하면 자동으로:
```env
VITE_SOLANA_RPC=https://api.mainnet-beta.solana.com
```

공용 RPC보다 약간 나음.

---

## 🎯 빠른 설정 (Helius 추천)

### 1. Helius 가입
```
https://helius.dev
→ Sign up (무료)
→ Create API Key
```

### 2. Railway 설정
```
Frontend Service
→ Variables
→ Add Variable:
   VITE_SOLANA_RPC=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
```

### 3. 재배포
자동으로 재배포되고, 서명이 빠르게 처리됩니다!

---

## 📊 성능 비교

| RPC | 서명 속도 | Rate Limit | 가격 |
|-----|----------|-----------|------|
| 공용 RPC | 5-10초 ❌ | 매우 낮음 | 무료 |
| mainnet-beta | 2-5초 ⚠️ | 낮음 | 무료 |
| **Helius** | **0.5-1초** ✅ | **100K/월** | **무료** |
| QuickNode | 0.5-1초 ✅ | 25M/일 | 무료 |
| Alchemy | 0.5-1초 ✅ | 300M/월 | 무료 |

---

## 🔧 로컬 개발 설정

`frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
VITE_SOLANA_RPC=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
```

---

## 💡 왜 RPC가 필요한가?

지갑 서명 자체는 RPC 없이 가능하지만:
- Wallet Adapter가 RPC로 네트워크 확인
- 블록체인 상태 조회
- 지갑 잔액 확인 등

느린 RPC = 느린 초기화 = 느린 서명 요청

---

**지금은 기본 RPC**로 작동하고 있고, 더 빠르게 하려면 **Helius 같은 서비스 사용**하시면 됩니다!

당장은 작동하니 일단 테스트해보시고, 필요하면 나중에 Helius 추가하세요! 🚀
