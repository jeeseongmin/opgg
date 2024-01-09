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

- 게임 관련 데이터(챔피언, 아이템
  등) : https://velog.io/@poding84/League-of-Legends-%EC%B1%94%ED%94%BC%EC%96%B8-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0
- React에 scss 적용 : https://codingmania.tistory.com/339
- React에 zustand 적용 : https://jforj.tistory.com/3
- React에 prettier 적용 : https://ripley21.com/intellij-webstorm-prettier-%EC%84%A4%EC%A0%95/
- prettier 옵션
  설명 : https://pstudio411.tistory.com/entry/%EC%95%84-%EB%B3%B4%EA%B8%B0-%EC%A2%8B%EC%9D%80-%EC%BD%94%EB%93%9C%EB%8B%A4-Prettier-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0
- 롤 관련 각종
  이미지 : https://velog.io/@junhok82/RIOT-API%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C-%EB%A1%A4-%EC%A0%84%EC%A0%81-%EA%B2%80%EC%83%89-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-4-%ED%99%94%EB%A9%B4-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EB%A1%9C%EC%A7%81-%EA%B5%AC%EC%84%B11
- axios interceptor 참고 : https://leeseong010.tistory.com/133