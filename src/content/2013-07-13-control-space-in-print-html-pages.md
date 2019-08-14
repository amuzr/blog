---
layout: post
title: 'HTML페이지 인쇄 시 여백 제어하기'
date: '2013-07-13 14:47:53 +0900'
tags: ['html', 'css', 'print']
draft: false
---

전용뷰어 보기
프린트하는 곳들 보면 거의다 activeX 로 익스플로러 브라우저 접근해서 강제로 조절하는데
IE 8 이상부터, 크롬 및 다른 브라우저들은 이렇게 여백컨트롤 할수 있다.

size 는 IE 에서 안된다. activex 하나하나 없애가자 ~!

```css
@page {
  size: auto;
  /_auto is the initial value _/

    /* this affects the margin in the printer settings */
    margin: 25mm 25mm 25mm 25mm;
}
```
