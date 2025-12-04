# 🔄 Solana → BNB Chain Migration Guide

## ✅ 완료된 변경사항

### Frontend

#### 제거된 패키지:
```
- @solana/wallet-adapter-*
- @solana/web3.js
- bs58
- tweetnacl
```

#### 추가된 패키지:
```
+ ethers (Ethereum 상호작용)
+ wagmi (React Hooks for Ethereum)
+ @rainbow-me/rainbowkit (지갑 UI)
+ viem (Ethereum 유틸리티)
+ @tanstack/react-query (상태 관리)
```

### Backend

#### 제거된 패키지:
```
- bs58
- tweetnacl
```

#### 추가된 패키지:
```
+ ethers (서명 검증)
```

---

## 🔑 지원되는 지갑

### BNB Chain (BSC):
- ✅ MetaMask (가장 인기)
- ✅ Coinbase Wallet
- ✅ Brave Wallet
- ✅ 기타 EVM 호환 지갑 (WalletConnect 미사용)

---

## ⚙️ 설정 필요

### WalletConnect 사용 여부
- 현재 버전은 WalletConnect를 사용하지 않습니다.
- `VITE_WALLETCONNECT_PROJECT_ID` 환경 변수는 선택 사항입니다.

---

## 🌐 네트워크 설정

### 현재 지원:
- **BSC Mainnet** (메인 네트워크)
- **BSC Testnet** (테스트용)

### 사용자가 지갑에서:
1. 네트워크를 BNB Smart Chain으로 변경
2. 앱에서 자동으로 체인 전환 제안

---

## 🔒 서명 검증 방식 변경

### Solana (이전):
```javascript
nacl.sign.detached.verify(message, signature, publicKey)
```

### Ethereum/BSC (현재):
```javascript
ethers.verifyMessage(message, signature)
→ 복구된 주소와 비교
```

**더 간단하고 표준적입니다!**

---

## 💰 가스비

### Solana:
- 서명만: **무료** (트랜잭션 아님)
- 트랜잭션: ~$0.00025

### BSC:
- 서명만: **무료** (트랜잭션 아님)
- 트랜잭션: ~$0.10-0.30 (사용 안 함)

**Grass 앱은 서명만 사용하므로 두 체인 모두 무료입니다!**

---

## 🎯 기능 동일성

### 동일하게 작동:
- ✅ 지갑 연결
- ✅ 메시지 서명
- ✅ 서명 검증
- ✅ 사용자 인증
- ✅ Task 관리
- ✅ XP 시스템
- ✅ 모든 기능

**사용자 경험 차이 없음!**

---

## 📱 지갑 설치 가이드

### Desktop:
1. **MetaMask**: https://metamask.io/download/
2. **Coinbase Wallet** 확장 프로그램
3. **Brave Wallet** (브라우저 내장)

### Mobile:
> 현재 버전은 WalletConnect를 사용하지 않으므로 MetaMask Mobile 또는 Coinbase Wallet 브라우저를 사용하세요.

---

## 🔧 BNB Chain 네트워크 추가

MetaMask에 BSC 추가:

```
네트워크 이름: BNB Smart Chain
RPC URL: https://bsc-dataseed.binance.org/
체인 ID: 56
통화 기호: BNB
블록 탐색기: https://bscscan.com
```

**또는** 자동 추가:
- https://chainlist.org 접속
- "BSC" 검색
- "Add to MetaMask" 클릭

---

## 🚀 로컬 테스트

### 1. 패키지 재설치

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 2. 지갑 연결
1. MetaMask 설치
2. BNB Smart Chain 네트워크 추가
3. 앱에서 "Connect Wallet" 클릭
4. MetaMask 선택

---

## ⚠️ 중요 사항

### WalletConnect Project ID:
- 현재 구조에서는 입력하지 않아도 됩니다.

---

## 🎨 UI 변화

### Wallet 버튼:
- Before: Solana 스타일 버튼
- After: RainbowKit 버튼 (더 세련됨)

### 지갑 아이콘:
- MetaMask 🦊
- Trust Wallet 💙
- Binance 🟡

---

## 📊 왜 BNB Chain?

### 장점:
- ✅ 더 많은 사용자 (MetaMask 광범위)
- ✅ EVM 호환 (Ethereum 생태계)
- ✅ 낮은 가스비
- ✅ 빠른 트랜잭션
- ✅ 대중적인 체인

### Solana vs BSC:
| 특징 | Solana | BSC |
|------|--------|-----|
| 사용자 | 적음 | 많음 |
| 지갑 | Phantom | MetaMask |
| 속도 | 매우 빠름 | 빠름 |
| 가스비 | 매우 저렴 | 저렴 |
| 대중성 | 개발자 중심 | 일반 사용자 |

---

**Grass 앱은 이제 BNB Chain 기반입니다!** 🌱✨

