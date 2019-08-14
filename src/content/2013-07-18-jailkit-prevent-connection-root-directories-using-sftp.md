---
layout: post
title: 'jailkit로 sftp 사용할 때 root 접근 못하게 하기'
date: '2013-07-18 14:45:04 +0900'
tags: ['jailkit', 'sftp', 'centos', 'linux']
draft: false
---

전용뷰어 보기
기존에 ftp 쓸때는 해당 폴더외에 접근허용이 안된다.
하지만 sftp로 접속하면 어떤 유저도 / 까지도 볼 수 있게된다.

jailkit 은 그걸 막아준다.
sshd5.x 부터는 chroot 로도 가능한데. 3시간동안 해봐도 안되길래 그냥 이걸로했다. 쉽고 편하고 빠르다.

CentOS 6.3 기준 설치방법

저장소를 추가하고 다음과 같이 간단하게 설치해준다.

```bash

# wget http://apt.sw.be/redhat/el6/en/x86_64/rpmforge/RPMS/rpmforge-release-0.5.3-1.el6.rf.x86_64.rpm

# rpm -Uvh rpmforge-release\*rpm

# yum install jailkit

```

이제 사용자를 추가해서 막아보자.
/home/jail 은 가둬둘 곳.

```bash

# jk_init -v -j /home/jail sftp scp jk_lsh

# adduser user_name; passwd user_name

# jk_jailuser -m -j /home/jail user_name

# vi /home/jail/etc/jailkit/jk_lsh.ini

```

아래 내용 추가.

```ini
[user_name]
paths = /usr/libexec/openssh/
executables = /usr/libesec/openssh/sftp-server
allow_word_expansion = 0
```

```bash

# sftp user_name@localhost

```

sftp> 라고 나오면 성공이다 !

jailkit 이 해주는 일은 cp ls 같은걸 실행할 수 있도록 관련 라이브러리 복사 등등인것 같다.
