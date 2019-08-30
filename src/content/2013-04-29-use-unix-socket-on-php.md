---
layout: post
title: 'use unix socket on php'
date: '2013-04-29 09:58:47 +0900'
tags: ['unix_socket', 'php', 'linux', 'centos']
image: img/brandi-redd-aJTiW00qqtI-unsplash.jpg
draft: false
---

nginx 와 php-fpm 을 연동할 때 지금은 크게 차이가 없지만 예전에는 아래처럼하는게 속도차이가 확연히 났다고 한다.

`fastcgi_pass 127.0.0.1:9000`

구글링해보니 크게 성능차이는 없는것 같지만 그래도 이게 좋다고 하니 다 바꿔봤다.

```bash

# vi /etc/php-fpm.d/www.conf

```

............
listen = 127.0.0.1:9000
............이부분을 아래처럼

;listen = 127.0.0.1:9000
listen = /tmp/php5-fpm.sock

```bash

# vi /etc/nginx/conf.d/virtual.conf

```

..........
fastcgi_pass 127.0.0.1:9000
........이부분을 아래처럼

fastcgi_pass unix:/tmp/php5-fpm.sock

```bash

# service php-fpm reload

# service nginx restart

```

php5-fpm.sock 파일이 없어서 뭐지뭐지했는데 기본으로 TCP포트를 사용하고 있다면 자동으로 생성된다!~

속도가 빨라진건지 아직 잘모르겠다.

덧. 보안이슈 해결을 위해 아래와 같이 try_files ~ 부분 한줄을 추가한다.

```
 location ~ \.php$ {
       try_files $uri =404;
       fastcgi_pass unix:/var/run/php5-fpm.sock;
       fastcgi_index index.php;
       fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
       include fastcgi_params;
   }
```
