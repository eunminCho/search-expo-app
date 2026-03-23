# SearchExpoApp

간단한 검색 기능을 구현한 React Native(Expo) 모바일 앱 (for portfolio)

---

## 1. 앱 기능 설명

- 검색어를 입력하면 `mockData`를 페이지네이션으로 가져와 결과 리스트로 보여줍니다.
  - 빈 값으로 검색 요청 시 에러 발생하도록 작성.
- 리스트 아이템을 클릭하면 해당 링크를 인앱 브라우저로 엽니다.
- 검색어 수정 시 디바운스(debounce) 기반으로 검색 요청을 수행합니다.
- 결과 아이템별 북마크 저장/해제 기능을 제공합니다.
- API 실패 등 에러 상황에서 공통 에러 모달을 노출합니다.

---

## 2. 실행 방법

### 2-1. Development Build로 실행 (권장)

현재 프로젝트는 expo-dev-client를 사용해 네이티브 development build(iOS/Android)로 실행하는 구성을 사용합니다. 아래 순서대로 진행하시면 됩니다.

**1단계: git 클론 및 의존성 설치**

```sh
git clone <저장소 URL>
cd search-expo-app
npm install
```

**2단계: 개발 서버 실행**

```sh
npm start
```

`package.json`의 start 스크립트는 `expo start --dev-client`로 설정되어 있어, development build용으로 Metro 번들러가 기동됩니다.

**3단계: iOS 또는 Android에서 앱 실행**

- **iOS 시뮬레이터 / 디바이스**
  ```sh
  npm run ios
  ```
- **Android 에뮬레이터 / 디바이스**
  ```sh
  npm run android
  ```

또는 `npm start`로 띄운 터미널에서 `i`(iOS), `a`(Android) 키를 눌러 해당 플랫폼을 실행할 수 있습니다.

**참고**

- `ios`, `android` 폴더는 Continuous Native Generation으로 빌드 시 자동 생성되며, 기본적으로 `.gitignore`에 포함되어 있습니다. 네이티브 코드 수정이 필요하면 [Config Plugins](https://docs.expo.dev/config-plugins/)를 사용하는 것을 권장합니다.

---

### 2-2. Expo Go로 실행하는 방법

Expo Go 앱으로 실행하려면 다음 변경이 필요합니다.

1. **expo-dev-client 제거**
   ```sh
   npm uninstall expo-dev-client
   ```
2. **start 스크립트에서 `--dev-client` 플래그 제거**
   - `package.json`의 `scripts.start`를 다음처럼 수정합니다.
   ```json
   "start": "expo start"
   ```
3. 이후 `npm start` 후 QR 코드로 Expo Go에서 앱을 엽니다.

**주의**

- 위 변경 후에는 development build가 아닌 Expo Go 런타임으로 실행됩니다.
- 일부 네이티브 기능·커스텀 네이티브 코드는 Expo Go에서 동작하지 않을 수 있습니다.
- **일반적인 개발·테스트는 development build 방식 사용을 권장합니다.**

---

## 3. 프로젝트 개요

### 3-1. `src` 폴더 구조와 역할

| 폴더/파일       | 역할 요약                                                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **api/**        | 서버 API 호출과 쿼리 키 정의. `search`(검색), `bookmark`(save/unsave) 도메인별로 나뉘며, `queryKeys.ts`에서 쿼리 키를 중앙 관리합니다.              |
| **components/** | 공통 UI 컴포넌트. `baseComponents`(Typo, Icon, ScreenContainer), `SearchTextField`, `ErrorModal` 등 앱 전역에서 재사용하는 컴포넌트를 둡니다.       |
| **contexts/**   | React Context 기반 전역 상태·동작. `ErrorModalContext`는 API 에러 시 모달 표시를 제공합니다.                                                        |
| **hooks/**      | 공통 훅. `query/useAppInfiniteQuery`는 useInfiniteQuery 래퍼, `useDebounce`는 입력 디바운스용입니다.                                                |
| **navigation/** | React Navigation 설정과 화면 정의. Native Stack + Static Navigation으로 Home / Results 스크린을 등록하고, 타입 안전한 라우트 파라미터를 사용합니다. |
| **utils/**      | 공통 유틸. `fetch.ts`는 API용 `mockApiFetch`(더미 응답), `browser.ts`는 `expo-web-browser`를 사용한 인앱 브라우저 오픈 함수를 제공합니다.           |
| **constants/**  | 스타일·아이콘 등 상수. `styles.ts`(폰트 패밀리), `icon/`(아이콘 소스·타입) 등입니다.                                                                |
| **assets/**     | 폰트, 이미지, SVG 등 정적 에셋. 앱 진입 시 `expo-asset`으로 일부 에셋을 미리 로드합니다.                                                            |
| **App.tsx**     | App Root. 폰트·에셋 로딩, `QueryClientProvider`·`ErrorModalProvider` 래핑, 스플래시 숨김 후 `Navigation`을 렌더합니다.                              |

---

## 4. 기술 스택·아키텍처

### 네비게이션

- **React Navigation** (Native Stack) + **Static Navigation** 사용.
- `createStaticNavigation`으로 타입 추론 → 라우트/파라미터 변경 시 타입 오류로 실수 방지.

### 서버 상태·API

- **TanStack React Query** — api 요청 데이터 캐싱·동기화, 무한 스크롤(`useInfiniteQuery`).
  - `QueryClientProvider` + `retry: 0` → 실패 시 재시도 없도록 설정.
  - `api/queryKeys.ts`에서 도메인별 정의, `AppQueryKey` 타입을 useInfiniteQuery에서 활용하여 타입 안정성 높임.
  - **bookmark save/unsave**: `useMutation`으로 API 호출 후, `queryClient.setQueryData`로 검색 결과 캐시의 해당 항목 `isBookmarked`만 갱신해 낙관적 업데이트(에러 시 롤백)로 구현.
- **공통 fetch**: `utils/fetch.ts`의 `mockApiFetch` — 실제 서버 없이 검색·컬렉션 엔드포인트에 맞는 더미 JSON/상태를 반환합니다. 실 API 연동 시 이 모듈을 교체·확장하면 됩니다.

### 에러 모달 처리

- **ErrorModalProvider**(Context)를 App 루트에 두고, API 에러 시 공통 모달 표시.
- 화면·훅에서는 `useErrorModal().showError()`만 호출.
- 에러 UX 변경 시 Provider·모달 컴포넌트만 수정해도 되도록 설계.

### Expo·앱 진입

- **expo-dev-client** — development build, 네이티브 디버깅·커스텀 네이티브 모듈.
- **expo-web-browser** — 결과 항목 URL 인앱 브라우저 오픈.
- **expo-font** — Pretendard(Regular/Bold) 로드.
- **expo-asset** — 로고·기본 이미지 선로딩.
- **expo-splash-screen** — `preventAutoHideAsync()` 후 폰트·에셋·네비 준비 완료 시 `hideAsync()` → 준비 전 스플래시 유지.
- **expo-image** — 이미지 캐싱. placeholder. svg 이미지 지원.

### 기타

- **react-native-reanimated** — Results 헤더 등 스크롤 연동 애니메이션을 UI 스레드에서 처리.
- **Path alias**: `tsconfig.json`의 `"@/*": ["./src/*"]`로 `@/` → `src/` 매핑.
- **Icon**, **Typo** — 아이콘·텍스트를 공통 컴포넌트로 두어 소스·폰트를 한곳에서 관리 + 스타일 통일. 적용 시 편의성 고려.

---

## 5. 참고 자료

- [React Navigation 문서](https://reactnavigation.org/)
- [Expo 문서](https://docs.expo.dev/)
- [Expo Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)
