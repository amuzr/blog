---
layout: post
title: '심볼릭 링크 생성하고 권한 주기'
date: '2013-08-12 13:34:58 +0900'
tags: ['symbolic_link', 'centos', 'linux']
image: img/brandi-redd-aJTiW00qqtI-unsplash.jpg
draft: false
---

우리같은경우 심볼릭링크를 쓰는경우가 /home 은 SSD 를 쓰고 있는데 그밖에 백업할 데이터들은 HDD 에 보관하고 있다.
프로그램내에서 각각 관리자들이 백업을 복구해줄수 있어야 하기 때문에 해당 폴더안에 십볼릭 링크를 만들어주었다.

심볼릭 링크 생성

```bash

# ln -s [타겟위치][심볼릭 링크 이름]

```

권한 바꿔주기

```bash

# chown -h 사용자:그룹 [심볼릭 링크 이름]

```

간단하게 -h 옵션만 붙여주면 된다.

의외로 구글에서도 찾기 힘들었다.
