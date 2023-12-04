### 프로젝트명

opgg 웹사이트 클론

### 프로젝트 스택

- React
- Typescript
- css(scss)
- 상태관리 라이브러리 : Zustand

### 프로젝트 내용 및 요약

[opgg의 웹사이트](https://www.op.gg/) 를 클론하여 만든다.

### 개발 대상 페이지 목록

1. 홈화면

    - 소환사 및 챔피언 검색

2. 소환사 정보

    - 소환사 기본 정보
    - 소환사 랭크 티어
    - 소환사 게임 기록
        - 해당 게임 정보
        - 팀원 정보
        - 아이템 구성

3. 챔피언 분석

    - 챔피언 랭킹
    - 챔피언 목록
    - 챔피언 상세정보

### 기능 시나리오

1. 상단 헤더바
    - [홈], [챔피언 분석] 클릭 시 각 위치에 해당하는 페이지로 이동

2. 홈화면
    - 챔피언 혹은 소환사 이름 검색
        - 홈 화면 내 input box에서 챔피언 혹은 소환사 이름을 검색하게 되면 해당 정보와 연관된 검색결과 미리보기 모달

3. 소환사 상세 정보

4. 챔피언 분석

### 레퍼런스

- React에 scss 적용 : https://codingmania.tistory.com/339
- React에 zustand 적용 : https://jforj.tistory.com/3
- React에 prettier 적용 : https://ripley21.com/intellij-webstorm-prettier-%EC%84%A4%EC%A0%95/