---
layout: post
title: 'Redux vs MobX'
date: '2017-04-04 12:30:26 +0900'
tags: ['front', 'react', 'redux']
draft: false
---

여전히 `OOP`와 `FP`가 강세이지만 최근 `Reactive Programming` 이 떠오르고 있다. `Java9`뿐만 아니라 자바스크립트 `ES2017`에서도 `Observable` 이 들어갈 예정이다.
대표적인 라이브러리로는 `Rx`시리즈들이 있는데 `RxJava`,`RxJS` 등 많은 언어에서 `Reactive Programming`을 지원하고 있다.

그 Rx프로그래밍 중에 최근 관심을 가지게 된 것이 `MobX` 이다.
그저 `Observable` 을 구현했다고만 생각했는데 `React Conf 2017` 영상을 보고 생각한것과는 상당히 다르다는것을 느꼈다.

간단하게 비교하자면

### setState vs Redux vs MobX

`setState` 는 `React` 의 사이클을 이해할 수 있는 가장 좋은 방법이다.
`Redux` 와 `MobX` 는 `setState`를 각각 `Functional Programming` 과 `Observable Programming`으로 코딩 할 수 있는 방법이라고 할 수 있겠다.

- setState
  React 를 이해하기 쉬운 필수적인 방법이다. 꼭 한번은 만들어보는 것이 좋다.

- Redux
  이벤트 기반으로 작동하는 시스템에 유리하고 잦은 유지보수 그리고 변하기 쉬운 큰 어플리케이션에 유리하다.
  러닝커브는 상대적으로 높다.
  내부 구조는 하나의 전역 `Store` 를 통해 이벤트를 전달하고 각각의 이벤트를 정의해 주어야 한다.

- MobX
  실시간으로 변하는 시스템에 유리하고 비교적 심플한 어플리케이션에 유리하다.
  러닝커브는 상대적으로 낮다.
  내부구조는 `@(어노테이션)` 을 통해 여러개의 `Store`를 통해 상태를 실시간으로 반영한다.

자세한 사항은 [Redux vs MobX]을 보자 :D

발표자의 마지막 말이 너무 마음에 든다.

Overall, Pick the tool makes you a happy developer. (결과적으로 너를 행복한 개발자로 만들어주는 툴을 선택해라)

[redux vs mobx]: https://youtu.be/76FRrbY18Bs
