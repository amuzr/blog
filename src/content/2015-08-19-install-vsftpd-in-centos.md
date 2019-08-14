---
layout: post
title: 'CentOS에 vsftpd(ftp) 설치하기'
date: '2015-08-19 18:57:48 +0900'
tags: ['centos', 'vsftpd', 'ftp', 'linux']
draft: false
---

ssh 를 통해 기본적으로 접속을 할 수 있지만

ftp 를 이용하여 제한적으로 폴더를 이용할 수 있도록 할 수 있다.
포트변경과 폴더제한까지 하는방법을 알아보자.

#### 설치

# yum install vsftpd

#### 세팅

# vi /etc/vsftpd/vsftpd.conf

설정파일 중에
`chroot_local_user=YES` 의 주석을 풀어주고
아래 내용을 추가한다.

원래 21번 포트로 받는것을 xxx 로 변경한다.
: `listen_port=xxx`

접속하자마자 보이는 루트를 해당 경로의 public_html 로 제한한다.
: `local_root=./public_html`

패시브모드 선택시 아래처럼 해준다.
`pasv_enable=YES`
`pasv_promiscuous=YES`
`pasv_min_port=10090`
`pasv_max_port=10100`

#### 방화벽

위에서 바꾼 xxx 포트를 열어주고, 패시브모드를 위한 포트도 열어준다.

```bash

# iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport xxx -j ACCEPT

# iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 10090:10100 -j ACCEPT

# service iptables save

# service iptables restart

```

- 잘 추가되었는지 확인하려면
  ```bash

  ```

# cat /etc/sysconfig/iptables

````

#### 실행

```bash

# service vsftpd start

````

접속해본다

끗!
