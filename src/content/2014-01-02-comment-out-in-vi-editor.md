---
layout: post
title: 'vi 에서 여러줄 주석 처리하기'
date: '2014-01-02 13:40:09 +0900'
tags: ['vi', 'comment']
image: img/brandi-redd-aJTiW00qqtI-unsplash.jpg
draft: false
---

주석처리를 하고자 하는 부분을 비주얼모드에서 블럭을 지정하여 사용하면 된다.
비주얼모드: [ctrl] +v

라인을 지정한 상태에서
주석 처리시

```
: norm i#
```

주석 해제시

```
: norm xx
```

예)

```
 :norm 2x
```
