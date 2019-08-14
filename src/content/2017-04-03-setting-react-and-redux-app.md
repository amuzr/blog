---
layout: post
title: 'React와 Redux를 공부하기 위한 앱 세팅'
date: '2017-04-03 01:07:21 +0900'
tags: ['front', 'react', 'redux']
draft: false
---

`React` 와 `Redux` 그리고 `Material-ui` 를 이용하여 현재 글을 쓰고 있는 이 Jekyll 테마를 만들기 위해 공부를 하고 있다.

오랜만에 `React`를 사용해서 만들려다보니 세팅부터 참 많은시간이 걸렸다.

먼저 지난주까진 ES6 문법들을 공부했고 써먹을 재료들을 모았다.
아직 머리속에 대부분 있지만 차근차근 블로그에 정리해 나갈 예정이다.

오늘 `React` 와 `React-router` 를 세팅하면서 겪은 삽질이다.

### Webpack 2

`react` 얘길 하다가 뜬금없이 `webpack`이 등장한 이유는 몇달전 그리고 며칠전 모았던 사이트들과 코드들은 `webpack` 1버전 기준으로 작성되어 있다. 하지만 `webpack2` 업데이트를 접한지도 꽤 됐고 이걸로 적응하려니 시작부터 실행이 되지 않는다.

`webpack1` 에서 `webpack2` 로 바뀌면서 삽질한 몇가지 부분을 공유하려 한다.

1. `entry` 옵션엔 더 이상 배열을 담을 수 없다.
   문제가 됐던건 react-hot-loader 를 적용하려고 entry 경로를 넣어주는 것이었는데 넣어줄 필요가 없다. 그냥 잘 된다.
2. `mudule` 옵션에서 `loaders` 옵션은 `rules` 로 바뀌었다.
3. 마찬가지로 `loaders` 의 하위옵션이었던 `loader` 는 `use` 로 바꼈고 사용법도 다소 바뀌었다.
4. loader 의 이름은 뒤에 -loader 를 붙여야 된다. 더이상 `react-hot` 또는 `babel` 이렇게 끝나서는 안된다.
   `react-hot-loader` 그리고 `babel-loader` 이렇게 바꿔준다.
5. resolve - extensions 옵션에 공백옵션을 더 이상 줄 수 없다.
   ["","js"] 였던 코드들이 있는데 공백은 제거해줘야 된다.
6. json-loader 는 이제 안넣어줘도 된다. default 로 동작한다.
7. `plugin` 들도 다소 바뀐것들이 있는데 `new webpack.optimize.DedupePlugin()` 은 옵션으로 넣지 않아도 동작한다.

`module` 옵션은 이렇게 사용한다.

```js
module: {
    rules: [{
      test: /\.js$/,  //All .js files
      exclude: [path.resolve(__dirname, 'node_modules')],
      use: [
        {
          loader: "react-hot-loader"
        },
        {
          loader: "babel-loader",
          query: {
            presets: ['react', 'es2015', 'stage-1']
          }
        }
      ]
    }],
  },
```

### React router

`React router` 가 4버전이 되면서 많은 것이 추가되거나 바꼈다.
실제로 DOM 조작을 위한 라이브러리가 분리되면서 `react-router-dom` 을 사용해야 한다.
이 부분이 상당히 애먹은 부분인데 몇시간이나 고민하고 찾아봤다. 같은 고민을 했던 많은 사람들이 Stackoverflow 에도 있었다.

알아둘점은 react-router 대신 react-router-dom 을 사용하는 것이고
api 가 상당히 바꼈으므로 참고하면 된다.

```js
...생략
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
)
```

이런 느낌으로 사용하던 것을 아래처럼 사용하면 되겠다.

```js
...생략
import { Route } from 'react-router-dom';

export default (
  <App>
    <Route exact path="/" component={Home} />
  </App>
)
```
