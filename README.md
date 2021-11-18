# Twitter Infinite Scroll

https://user-images.githubusercontent.com/79728856/142498502-00069566-2eb1-4736-97be-b173329d1174.mp4

client: https://github.com/yerim-jeon/vplanet-client <br>
server: https://github.com/yerim-jeon/vplanet-server

## Feature

- 검색어 입력시 검색어와 연관된 Tweet 목록을 불러옵니다.
- 실시간 Tweet 목록을 불러옵니다.

## Stack

Client: react, socket.io, intersection-observer, styled-components, responsive web <br>
Server: nodejs, express, socket.io

## Installation

Local 환경에서 실행을 위해 환경 변수 설정이 필요합니다.

### Client

Root 디렉토리에 .env파일을 생성하고 아래와 같이 환경변수 값을 입력합니다.

```
REACT_APP_BASE_URL=<YOUR_PORT_NUMBER>
```

### Server

Root 디렉토리에 .env파일을 생성하고 아래와 같이 환경변수 값을 입력합니다

```
ORIGIN_URI=<YOUR_PORT_NUMBER>
TOKEN=<YOUR_TWITTER_TOKEN>
```
