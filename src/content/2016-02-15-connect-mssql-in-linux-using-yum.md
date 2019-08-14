---
layout: post
title: 'yum 을 이용해서 mssql 연결하기'
date: '2016-02-15 18:52:16 +0900'
tags: ['yum', 'mssql', 'linux', 'centos', 'freetds', 'isql']
draft: false
---

리눅스에서 yum 으로 MSSQL 서버 연결하는 방법

#### yum 설치

```bash

# yum install freetds unixODBC

```

#### tsql 을 이용해 접속해본다.

```bash

# tsql -S [아이피나 호스트명] -U [사용자아이디] -P [비밀번호]

```

나오는방법은 `^D`

#### unixODBC 세팅

```bash

# vi /etc/odbcinst.ini

```

아래 추가

```ini
[FreeTDS]
Description = FreeTDS Driver
Driver = /usr/lib64/libtdsodbc.so.0
Setup = /usr/lib64/libtdsS.so.2
FileUsage = 1
```

#### odbc 이름 등록

```bash

# vi /etc/odbc.ini

```

아래 추가

```ini
[MYDSN]
Driver = FreeTDS
Server = [IP address]
Port = 1433
```

```bash

# isql MYDSN [사용자아이디][비밀번호] -v

```

나오는방법은 ^D

끝!

-- 위처럼 하면 한글이 깨진다 !

```bash

# vi /etc/freetds

```

아래 추가

```ini
[서버네임]
host = IP address
port = 1433
tds version = 7.0
client charset = UTF-8
```

```bash

# vi /etc/odbc.ini

```

```bash
[MYDSN]
Driver = FreeTDS
Servername = 서버네임
Database = DB이름
```

이렇게 하면 한글이 깨지지 않는다 !!
