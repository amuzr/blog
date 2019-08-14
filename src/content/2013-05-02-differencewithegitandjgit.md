---
layout: post
title: 'EGit과 JGit의 차이'
date: '2013-05-02 08:58:33 +0900'
tags: ['git']
draft: false
---

알고보면 너무 간단한데 역시 네이버에서는 검색하기가 어렵다..

이클립스 커뮤니티 포럼에 좋은 댓글이 있어서 퍼왔다.

```
Manuel Doninger wrote on Thu, 05 January 2012 04:38
JGit is the Java implementation of Git. It is a library, that also can be used in your own applications. It also provides some sort of CLI operations.
EGit on the other side is the Eclipse team provider plugin for Git, which uses JGit as Git implementation. Simplified you could say EGit is the UI part, and JGit the background part.
JGit doesn't depend on EGit, but EGit does depend on JGit.
```

JGit 은 자바 구현체,라이브러리 즉 java 로 git을 이것저것 할수있다.
EGit 은 이클립스에서 git 을 사용할 수 있게 해주는 UI 툴. JGit 은 뒤에서 처리해주는 파트.
이클립스가 java 로 되있으니까 Egit 은 Jgit 을 이용해서 이것저것 할수 있게 해준다.
JGit 은 EGit 에 의존성이 없지만 EGit 은 JGit을 의존하고있다.

고로 이클립스에서 EGit 을 쓰려면 JGit 도 설치해야한다.
