---
layout: post
title: 'PHP 에서 paradox DB 설치하기'
date: '2013-04-03 18:39:25 +0900'
tags: ['php', 'paradox', 'db', 'paradoxdb']
image: img/brandi-redd-aJTiW00qqtI-unsplash.jpg
draft: false
---

paradox 라는 디비가 있는지 오늘 처음 알았다..

어찌저찌해서 paradox DB를 읽기 위해 PDE 를 찾아서 설치했고
어찌저찌해서 php 에 paradox 파일을 읽는 모듈이 있다고 해서 찾았다...

pecl 패키지 중에 있는데 정상적으로 설치가 안된다.

아래와 같이 진행하자.

```bash

# yum install intltool

# wget http://jaist.dl.sourceforge.net/project/pxlib/pxlib/0.6.5/pxlib-0.6.5.tar.gz

# tar -zxvf pxlib-0.6.5.tar.gz

# cd pxlib-0.6.5

# ./configure

# make

# make install

# wget http://pecl.php.net/get/paradox-1.4.3.tgz

# tar -zxvf paradox-1.4.3.tgz

# cd paradox-1.4.3

# phpize

# ./configure

# make

# make install

```

설정 파일생성을 해주고.

```bash

# vi /etc/php.d/paradox.ini

```

아래 내용을 넣어준다.

```ini
;Enable paradox extension module
extension=paradox.so
```

phpinfo 로 확인해 보자.
