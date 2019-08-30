---
layout: post
title: 'TABLE 에서 일부 셀만 고정시키기'
date: '2015-07-30 10:56:52 +0900'
tags: ['html', 'css']
image: img/brandi-redd-aJTiW00qqtI-unsplash.jpg
draft: false
---

가로폭이 고정인 테이블을 고정시키는 방법은 간단하다.

```css
table {
  table-layout: fixed;
}
```

하지만 내용이 길어질 경우 글자가 잘리는 경우가 발생 아래처럼 처리해주는 방법도 있다. 이른바 "..."

```css
table > tbody > tr > td {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
```

하지만 꼭 글자를 표시해줄 일이 있고 특정열만 고정시키고 싶다면

```css
table {
  table-layout: auto;
}
table > tbody > tr > td {
  min-width: 100px;
}
```

이렇게하자
