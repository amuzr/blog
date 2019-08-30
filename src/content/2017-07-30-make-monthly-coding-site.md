---
layout: post
title: '월간 코딩 사이트 만들기'
date: '2017-07-30 17:36:16 +0900'
tags: ['code']
image: img/brandi-redd-aJTiW00qqtI-unsplash.jpg
draft: false
---

혼자 뭔가 하려는 프로젝트가 없을까 생각해봤는데 없다. 그래서 아무거나 한달에 하나씩 만들기 프로젝트를 하기로 했다.
언어나 라이브러리에 관계없이 아무거나 직접 배워서 만들어보는 월간코딩. 한달에 하나씩 곡을 발표하는 월간윤종신이나 한달에 피자하나씩 할인하는 월간피자와 비슷한 느낌이다.

월간코딩의 시작은 월간코딩 페이지 만들기.

자바스크립트로 만들기로 하고 `react`, `redux`, `rxjs` 를 이용한다. 디자인은 `material-ui` 를 사용한다.

기본적으로 추가할 의존성은 아래와 같다.

```bash
$ react-create-app monthly-coding
$ cd monthly-coding
$ yarn add react-router react-router-dom react-tab-event-plugin react-redux redux redux-logger redux-observable rxjs material-ui lodash
```

디렉토리 구조는 아래와 같이 만들어준다.
App 으로 시작하는 js 는 삭제한다.

```
|-- src
        |-- index.css
        |-- index.js
        |-- registerServiceWorker.js
        |-- actions
        |-- components
        |-- containers
        |-- epics
        |-- reducers
```

`epics` 는 `redux-observable`을 사용하기 위한 디렉토리이다.
`actions` 와 `reducers` 는 `redux`에서 사용하고
`components`에서는 재사용가능한 컴포넌트들을 정의하고(소문자로 파일을 만들도록 한다)
`containers`에서는 실제 페이지들을 만든다.(첫문자는 대문자로)

default 페이지 코딩을 한다.
`main` 페이지를 만들고 `material-ui`로 래핑할 `app` 컨테이너로 감싼다. 그리고 `action`, `epic`, `reducer` 를 각각 감싸는 combiner 를 만들어주고 마지막으로 `index.js` 를 코딩후 실행한다.

코드는 아래와 같다.

### containers/Main.js

```js
import React, { Component } from 'react';

export default class Main extends Component {
  render() {
    return <div>Hello !</div>;
  }
}
```

### components/app.js

```js
import React, { Component, Children, cloneElement } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>{Children.map(this.props.children, child => cloneElement(child, {}))}</div>
      </MuiThemeProvider>
    );
  }
}

export default App;
```

### actions/index.js

```js
```

### epics/index.js

```js
import { combineEpics } from 'redux-observable';

export default combineEpics();
```

### reducers/index.js

```js
import { combineReducers } from 'redux';
import main from './main';

export default combineReducers({
  main,
});
```

### reducers/main.js

```js
export default function(state = { open: false }, action) {
  switch (action.type) {
    //TODO
    default:
      return state;
  }
}
```

### index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createEpicMiddleware } from 'redux-observable';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import rootEpic from './epics';
import rootReducer from './reducers';

import App from './components/app';

import Main from './containers/Main';

const epicMiddleware = createEpicMiddleware(rootEpic);
const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(epicMiddleware, loggerMiddleware)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <Router>
      <App>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Main} />
      </App>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
```

그리고 실행해주면

```bash
$ yarn start
```

Hello ! 를 보게된다.

여기까지하면 `react`,`redux`,`rxjs`,`redux-observable`,`material-ui` 보일러플레이트 세팅이 완료된다. [Github에서 확인]

[github에서 확인]: https://github.com/amuzr/monthly-coding/tree/5861f6882d265a0b3b34cf17cdda0a3f682bdbb8
