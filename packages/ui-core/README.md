# @ui-system/core

### **목적**

- 토큰(CSS Variables)을 통한 UI 룩앤필 전환 가능한 통합 UI 시스템 구축
- 일관된 UI 아키텍처 유지
- 개발자, 퍼블리셔, 디자이너 간 역할 분리 및 협업

### **기술 스택**

- Framework: React
- Build: Vite
- Styling: Styled Components (CSS-in-JS) + Native CSS Variables
- Documentation: Storybook

---

### 토큰 → CSS 변수 파이프라인

```
[*.token.json]  →  scripts/css-generate.js  →  [base.css + light.css + dark.css]
       ↑                                              ↓
   단일 진실 소스                              :root[data-theme="..."] { --var: value; }
```

| 항목              | 설명                                                                             |
| ----------------- | -------------------------------------------------------------------------------- |
| **진입점**        | `src/tokens/<시스템명>.token.json` (예: `basic.token.json`, `custom.token.json`) |
| **생성 스크립트** | `scripts/css-generate.js` — JSON을 순회해 CSS custom properties로 변환           |
| **출력**          | `src/styles/<시스템명>/base.css`(공통), `light.css` / `dark.css`(테마별)         |
| **선택자**        | `:root[data-theme="<시스템명>-<테마>"]` (예: `basic-light`, `custom-dark`)       |

컴포넌트는 토큰 값을 직접 하드코딩하지 않고 `var(--palette-primary-main)` 등 **CSS 변수만** 참조합니다.

### 테마 적용 방식

| 요소              | 설명                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------- |
| **ThemeProvider** | `theme` prop으로 `<html>`에 `data-theme` 설정 (예: `basic-light`, `custom-dark`)            |
| **GlobalStyle**   | styled-components로 `body` 등에 토큰 기반 스타일 적용 (`var(--palette-background-main)` 등) |

### 스타일 소비 경로

- **앱**: `import '@ui-system/core/styles/<시스템명>.css'` 후 `<ThemeProvider theme="<시스템명>-light">` 사용
- **스토리북**: `.storybook/preview.ts`에서 해당 시스템의 base + light/dark CSS import 후 툴바로 테마 전환

---

## 토큰 관리 및 생성

### 토큰 파일 구조 (예: `basic.token.json`)

| 섹션           | 설명                                                     |
| -------------- | -------------------------------------------------------- |
| **meta**       | name, version, description 등 토큰 정보                  |
| **schemes**    | `light`, `dark` 등 → 각각 `light.css`, `dark.css`로 출력 |
| **global**     | breakpoints, spacing 등 테마 무관 값 → `base.css`로 출력 |
| **components** | 컴포넌트 스타일 → `base.css`에 포함                      |

> 위 구조는 개선·변경될 수 있습니다.

### 토큰 빌드 명령

| 명령                                 | 설명                                                 |
| ------------------------------------ | ---------------------------------------------------- |
| `npm run build:tokens -- <시스템명>` | `src/tokens/<시스템명>.token.json`을 사용해 CSS 생성 |

### 새 테마 시스템 추가 절차

1. `src/tokens/<시스템명>.token.json` 생성
2. `npm run build:tokens -- <시스템명>` 실행
3. `ThemeProvider`의 `Theme` 타입에 `'<시스템명>-light' | '<시스템명>-dark'` 추가
4. 앱/스토리북에서 필요 시 해당 시스템 CSS import 및 테마 옵션 추가
