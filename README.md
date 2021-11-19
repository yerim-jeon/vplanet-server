# Twitter Infinite Scroll

https://user-images.githubusercontent.com/79728856/142518728-f4928a73-4f33-4b10-abfb-3c2adb1370a1.mp4

client: https://github.com/yerim-jeon/vplanet-client <br>
server: https://github.com/yerim-jeon/vplanet-server

## Feature

- 검색어 입력시 검색어와 연관된 Tweet 목록을 불러옵니다.
- 실시간 Tweet 목록을 불러옵니다.

## Installation

Local 환경에서 실행을 위해 환경 변수 설정이 필요합니다.

### Client

Root 디렉토리에 .env 파일을 생성하고 아래와 같이 환경변수 값을 입력합니다.

```
REACT_APP_BASE_URL=<YOUR_PORT_NUMBER>
```

```
npm install
npm start
```

### Server

Root 디렉토리에 .env 파일을 생성하고 아래와 같이 환경변수 값을 입력합니다.

```
ORIGIN_URI=<YOUR_PORT_NUMBER>
TOKEN=<YOUR_TWITTER_TOKEN>
```

```
npm install
npm run dev
```

## Stack

Client: react, socket.io, intersection-observer, styled-components, responsive web <br>
Server: nodejs, express, socket.io

## Technical Log

- cors issue로 인한 proxy server를 구축하였습니다.
- 원래는 api 요청을 보내 stream된 tweet 10개를 배열에 담아 client에게 response 해주는 방식이였으나, 속도가 너무 느리고 실시간 데이터를 받아온다는 점에서 socket.io로 변경하였습니다. <br>(+ 추가로 트위터 api 문서에 max_results와 같은 option이 없어서 소켓으로 진행하였습니다.)
- reflow가 없다는 점에서 intersection-observer를 사용하였습니다.
- 모바일에서만 접근 가능한 search router에 pc에서 접근했을 시 redirect를 시켜주지 못한 점이 아쉽습니다.
- mobile 또는 pc에서만 보여야하는 컴포넌트를 media query를 사용하여 display: none 시켰는데 해당 디바이스에서 아예 랜더링 시키지 않는 방법으로 개선이 필요할 것 같습니다.
- 스크롤 시 Loading 상태에서 화면이 미세하게 흔들리는데 그 점을 해결하지 못했습니다.

## Comment

- 처음에 문서를 봤을 땐 이해도 잘 안가고 서치할때 자료가 별로 없어 막막했는데, 결과적으로 과제를 끝내게 되어 뿌듯합니다. 많이 공부할 수 있는 좋은 기회였습니다. 감사합니다! 🙇‍♂️
