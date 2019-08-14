---
layout: post
title: 'REDIS 관련 에러'
date: '2015-10-29 11:19:18 +0900'
tags: ['redis', 'db', 'linux', 'centos']
draft: false
---

redis 설치하는 법도 아직 포스팅 하기 전이지만

일단 오류 해결방법에 대해 메모 한다.

Increased maximum number of open files to 10032 (it was originally set to 4096).

해당 오류가 뜨게 된다면

redis 가 설정하려고 하는 파일 갯수를 줄이거나
시스템의 오픈가능 파일갯수를 늘리거나 둘중하나를 하면된다.

시스템 오픈가능 파일은

unlimit -n 으로 확인 가능하다.

redis.conf 에서 maxclients 옵션을 1024로 변경후 재시작.(테스트 서버니까 1024로도 충분하다.)
