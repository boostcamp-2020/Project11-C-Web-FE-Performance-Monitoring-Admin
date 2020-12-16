const getGuideInfo = (platform: string, dsn: string) => {
  const bashNode: string = `# npm version
npm install @acent/node
# yarn version 
yarn add @acent/node`;

  const bashBrowser: string = `# npm version
npm install @acent/browser
# yarn version
yarn add @acent/browser`;

  const bashReact: string = `# npm version
npm install @acent/react
# yarn version
yarn add @acent/react`;

  const vanillaJsCode: string = `import * as Acent from "@acent/react";

// 발급 받은 dsn 주소로 데이터를 저장하게 됩니다.
Acent.init({ dsn: "${dsn ? dsn : 'Your project dsn'}" });
// startErrorCapturing을 실행하여 에러 캡쳐링을 시작합니다.
Acent.startErrorCapturing();`;

  const reactCode: string = `import React from "react";
import ReactDOM from "react-dom";
import * as Acent from "@acent/react";
import App from "./App";
  
// 발급 받은 dsn 주소로 데이터를 저장하게 됩니다.
Acent.init({ dsn: "${dsn ? dsn : 'Your project dsn'}" });
// startErrorCapturing을 실행하여 에러 캡쳐링을 시작합니다.
Acent.startErrorCapturing();

ReactDOM.render(<App />, document.getElementById("root"));`;

  const vueCode: string = ``;

  const nodeCode: string = `// CommonJS
const Acent = require("@acent/node");
// ES6
import Acent from '@acent/node';

Acent.init({
    dsn: "${dsn ? dsn : 'Your project dsn'}",
  });
Acent.startErrorCapturing();
// 만약 프로미스 에러까지 잡고 싶다면, catchUnhandledRejection을 실행하십시오.
Acent.catchUnhandledRejection();

// 이후 당신의 코드를 추가하면 됩니다.
// Ex)
var http = require("http");
http
  .createServer(function (req, res) {
    test();
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Hello World");
  })
  .listen(3002, "localhost");`;

  const expressCode: string = `// CommonJS
const express = require("express");
const Acent = require("@acent/node");
// ES6
import * as express from 'express';
import Acent from @acent/node;

const app = express();

Acent.init({
    dsn: "${dsn ? dsn : 'Your project dsn'}",
});

// 만약 프로미스 에러까지 잡고 싶다면, catchUnhandledRejection을 실행하십시오.
Acent.catchUnhandledRejection();
.
.
// 예시 코드입니다.
app.use(express.json());
app.get("/", (req, res) => {
    res.json('home');    
});
.
.
// 가장 마지막 단계에 에러 핸들러를 미들웨어로 등록하십시오.
app.use(Acent.errorHandler());
// TypeScript에서 오류가 난다면, 다음과 같은 코드로 시도하십시오.
app.use((acent.errorHandler() as unknown) as express.ErrorRequestHandler);

// 마지막에 당신의 커스텀 에러 미들웨어를 등록해도 좋습니다. Acent에는 영향을 주지 않습니다.
app.use(function (error, req, res, next) {
    res.json({ message: error.message });
});

app.listen(port, () => {
    console.log('Example app listening');
});`;

  const nodeCatch: string = `try {
    // your code
} catch (error) {
    Acent.captureException(error);
    // 만약 Request 객체를 사용하고 있다면, 관련 정보를 추가적으로 수집할 수 있습니다.
    Acent.captureException(error, req);
}`;

  const browserCatch: string = `try {
    // your code
} catch (error) {
    Acent.captureException(error);
}`;

  switch (platform) {
    case 'Node':
      return { bashCode: bashNode, jsCode: nodeCode, catchDesc: nodeCatch };
    case 'Express':
      return { bashCode: bashNode, jsCode: expressCode, catchDesc: nodeCatch };
    case 'React':
      return {
        bashCode: bashReact,
        jsCode: reactCode,
        catchDesc: browserCatch,
      };
    case 'Vue':
      return {
        bashCode: bashBrowser,
        jsCode: vueCode,
        catchDesc: browserCatch,
      };
    case 'JavaScript':
      return {
        bashCode: bashBrowser,
        jsCode: vanillaJsCode,
        catchDesc: browserCatch,
      };
    default:
      return null;
  }
};

export default getGuideInfo;
