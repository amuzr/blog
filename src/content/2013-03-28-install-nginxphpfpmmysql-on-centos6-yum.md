---
layout: post
title: 'CentOS6 에 yum 으로 nginx + php-fpm + mysql 설치하기'
date: '2013-03-28 14:54:43 +0900'
tags: ['linux', 'nginx', 'php', 'mysql', 'centos']
image: img/brandi-redd-aJTiW00qqtI-unsplash.jpg
draft: false
---

기존에 회사에서 아파치 httpd-2.2, php-5.2, mysql-5.1 을 사용하다가 자주 뻗기도 하고 방법을 찾기 어려웠다.
결국 SSD 달린 새서버로 바꾸게 되어 nginx를 써보기로 했다.
바이너리 설치도 있지만 기왕 최신껄 쓰는김에 계속 업데이트 해주는 방법을 쓰기로 결정.

#### 설치할 환경 및 버전

- centos 6.3(64bit) : 가능하면 최신으로 쓰기 위해 6.3으로 설치했다. 5.x 로도 비슷한방법으로 설치가능
- nginx-1.2.7 : stable 최신버전 이고 1.3.x 개발버전이 있다.
- php-5.3.23 : 기존 프로그램이 5.4로 바로올렸을때 strict 에러가 많이 나기 때문에 결정. 처음 설치하는거면 5.4를 해도 무방하다.
- mysql-5.5.31 : 현재 5.6은 바이너리로 설치만 가능한것 같다.

처음 centos 설치 후 아무 세팅이 되어있지 않은 상태에서 root 권한으로 진행을 하도록 한다.
먼저 프로그램들을 전부 update 해준다.

```shall
#yum update
```

그리고 `yum repolist`를 설정해 주어야 한다.
최종 목표는 아래와 같이되면 된다.

![]({{ site.url }}/assets/repolist.png)

##### Atomic 저장소 설치

```
#wget -q -O - http://www.atomicorp.com/installers/atomic | sh
```

##### RHEL EPEL 저장소 설치

```
wget http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
wget http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
sudo rpm -Uvh remi-release-6*.rpm epel-release-6*.rpm
```

항상 `remi`저장소를 사용하기 위해서는 `yum.repos.d` 디렉토리에서 `remi.repo enabled = 1` 로 바꾸어 주면 된다.

##### nginx 저장소 설치

`nginx` 저장소는 `yum.repos.d` 에 직접 파일을 추가해주어야 한다(`/etc/yum.repos.d/nginx.repo`)

```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
```

이제 저장소가 다 등록이 되어 간단하게 `yum` 으로 설치할 수 있다.
아래와 같이 입력

```
#yum install nginx
#yum --enablerepo=remi install php php-fpm php-mysql mysql-server mysql-devel
```

보면서 `y` 를 눌러주면되고 `-y`옵션을 주어도 좋다.

필요에 따라 php 모듈도 설치한다. (기본적으로는 설치되지 않는다.)

```
#yum install php-gd php-mcrypt php-pear
```

방화벽 예외처리를 해주고

```
#iptables -I INPUT -p tcp --dport 80 -j ACCEPT
#iptables -I OUTPUT -p tcp --sport 80 -j ACCEPT
```

서비스에 대몬 등록

```
/sbin/chkconfig nginx on
/sbin/chkconfig mysqld on
/sbin/chkconfig php-fpm on
```

서비스 시작 재시작 중지는 아래와 같이한다. `(start | restart | stop)`

```
/etc/init.d/nginx start
/etc/init.d/php-fpm start
/etc/init.d/mysql start
```

`/etc/init.d/` 대신 `service 이름` 으로 입력해도 좋다.

그리고 MySQL root 계정 비밀번호 설정을 한다.

```
/usr/bin/mysqladmin -uroot password 'new-password'
```

각종 에러로그 확인은 아래와 같이 한다.

```
/var/log/nginx/error.log
/var/log/php-fpm/error.log
/var/log/mysqld.log
```

nginx 와 php-fpm 을 연결하고 virtual-host 설정하는 부분은 다음 포스트에 이어서 작성하도록 하겠다.

참고 : [NPM설치],[저장소설치1],[저장소설치2],[방화벽예외처리]

[npm설치]: http://blog.debug.so/entry/How-to-setuo-nginx-php-mysql-Korean
[저장소설치1]: http://www.rackspace.com/knowledge_center/article/installing-rhel-epel-repo-on-centos-5x-or-6x
[저장소설치2]: http://pat.im/924
[방화벽예외처리]: http://www.i-swear.com/148
