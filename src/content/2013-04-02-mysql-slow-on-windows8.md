---
layout: post
title: 'Windows8 에서 mysql 느려지는 문제'
date: '2013-04-02 10:39:28 +0900'
tags: ['windows8', 'mysql', 'slow']
image: img/brandi-redd-aJTiW00qqtI-unsplash.jpg
draft: false
---

php나 jsp 개발시 디비연결을 할때 보통 로컬환경에서는 localhost로 연결을 한다.
windows 7 까지는 IPv4 와 IPv6 를 같이 쓰기 때문에 localhost로 연결하게 되면 127.0.0.1 으로 잘 연결이 된다.

하지만 ! windows 8 에서는 IPv6 를 기본으로 쓰고 있어서 localhost 로 연결 시 ::80 으로 연결된다.

확인은 cmd창에서 이렇게

ping localhost

해결하는 방법은 여러가지가 있다.

- IPv6 을 강제로 끄는 방법이다.
  네트워크 환경설정에서 IPv6 을 끄고 레지스트리에서 DisabledComponents 라는 키를 추가해주어야 한다.
  참고 : http://www.techunboxed.com/2012/08/how-to-disable-ipv6-in-windows-8.html

- 그냥 마음편하게 디비연결을 하는 코드에 모든 localhost 를 127.0.0.1로 바꿔준다.
