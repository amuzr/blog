---
layout: post
title: 'CentOS 에서 커널 업데이트 할 때 생기는 문제'
date: '2013-09-02 10:54:04 +0900'
tags: ['centos', 'kernel_update', 'problem']
draft: false
---

전용뷰어 보기
리눅스 설치 파티션 나누는 것들 검색해보면 대부분 boot 를 100메가만줘도 된다고한다.
그런데 요새 하드나 ssd 나 용량도 많은데 한 200M 300M 줘도 상관없을거같은데.

결국 우리서버도 boot 파티션 용량이 100M 이다
그런데 yum 업데이트하려니 용량이 부족하다고 한다.

해결은 크게 2가지 방법이있다.

1. 업데이트를 안하게 설정을 바꾼다.
2. 현재설치되있는것빼고 나머지 지우고 설치를 진행한다.

2번을 권장한다.

1번

```
/etc/yum.conf 를 수정한다.
 exclude=kernel*
```

2번

```
/etc/yum.conf 에 아래부분을 수정.
installonly_limit=5 -> installonly_limit=2
```

그리고 안쓰는 rpm 을 지운다.
현재 사용중인 커널확인

```bash

# uname -a

--현재 사용중인 커널확인

# uname -a

--boot 에 있는 파일 확인 후 안쓰는것 삭제.

# rpm -e kernel-2.6.32-71.el6.x86_64 kernel-2.6.32-71.29.1.el6.x86_64

# yum update kernel

# reboot

```
