---
layout: post
title: 'JIRA 와 Confluence war로 설치하기'
date: '2013-04-08 11:17:54 +0900'
tags: ['tools', 'jira', 'confluence', 'wiki', 'war']
image: img/brandi-redd-aJTiW00qqtI-unsplash.jpg
draft: false
---

회사들어와서 가장먼저 리눅스를 건들게 된 계기가 된 요 두 프로그램.

간단하게 얘네가 뭐하는 놈들이냐 하면.

Jira 는 국내에 더 많이 알려진 redmine 같은 프로그램이다. 이슈들을 등록하고 관리하고 뭐 그런것들이고 플러그인들이 좋은게 너무많다.
하지만 전~부 유료라서 돈많으면 편하다... 에자일 프로세스할 때 유용하다.
Confluence 는 사내 wiki 정도로 보면된다. space에 블로그를 포스팅해서 서로 공유하는 거다.

그냥 standalone 으로 한번에 설치하면 쉽게 쓸 수 있는거 뭐좀 해보겠다고 war 로 받아서 1주일이상을 삽질한것 같다.
메뉴얼은 영문밖에 없고 한글판 배포하는 회사들도 그렇게 도움이 안된다.

현재 우리회사에서는 두 프로그램 다 스타터버전으로 10명이하 10불내고 사용하고 있으며,
구입후 1년정도는 지속적인 업그레이드 제품을 다운받을수있다. 그래서 새버전나올때마다 업그레이드 하고있다.
Trial 버전은 한달을 무료로 사용할 수 있다.
자세한 설명과 다운은 요기서 ! http://www.atlassian.com
매달 사용료를 지불하는 OnDemand 와 한번에 지불하고 쭉 사용하는 Download 버전 두가지가 있다.

환경은 지난번 포스팅 글이랑 똑같다. centos 6.3 + nginx 1.2.7(지금은 1.2.8) + httpd 2.4 + mod_jk + tomcat 6 & tomcat 7

설치하기전에 간단하게 알아두어야 할 점은 이렇다.

- JIRA는 java 7 + tomcat 7 에서 설치가 가능하다. 그 이하 버전에서도 물론 잘된다.
- Confluence 는 java 7 은 지원하지만 tomcat 6 에서만 돌아간다. 그래서 mod_jk 를 써서 연결하도록 한다.
- 내장DB를 사용하는 방법도 있고 기존 쓰던 DB에 데이터베이스만 만들어서 사용할 수 있다.
  (JIRA 는 mysql에 Confluence 는 Embedded DB 를 사용해서 설치했다.)

## JIRA 설치.

http://www.atlassian.com/software/jira/download
리눅스에 설치할 것이기 때문에 맞는 것을 다운받는다.
JIRA 5.2.10 WAR (TAR.GZ Archive) 현재는 이파일이 가장 최신이다.
항상 이런 파일들은 /usr/local/src 에 받는다. (임시 다운로드 폴더 처럼 쓰고 있다)

wget 으로 받을때 윈도환경에서 크롬으로 다운받고 받는 도중 다운로드창에서 파일 경로를 복사해서 받는다.

그리고 local 로 옮겨준다.

```bash

# cd /usr/local/src

# wget http://wpc.29c4.edgecastcdn.net/8029C4/downloads/software/jira/downloads/atlassian-jira-5.2.10-war.tar.gz

# tar -zxvf atlassian-jira-5.2.10-war.tar.gz

# mv atlassian-jira-5.2.10-war /usr/local/atlassian-jira-5.2.10

# cd /usr/local/atlassian-jira-5.2.10

```

이제 build 를 해야하는데 build 를 하기전에 어플리케이션이 돌때 사용하는 파일들을 어디에 저장할지 지정해주어야한다.
(WAR 압축 해제를 시킬 곳.)
vi 에디터로 아래와 같이 수정. 뭐 이파일 수정하지말라고 하는데 그냥 해도된다..
원래 공식홈에서는 JIRA_HOME 이라는 환경변수를 주고 거기에 이 경로를 넣어주라고 하는데.. 이걸로는 잘설치가 안되었다.

```bash

# vi edit-webapp/WEB-INF/classes/jira-application.properties

```

```properties
jira.home = /usr/local/jira-5.2.10

```

그리고 build 해준다.
오류 없이 잘끝나면 성공!

```bash
./build.sh
```

이제 톰캣에 이놈을 붙여주어야 한다.
그러기전에 아래처럼 환경설정 파일을 하나 만들어주자. 자바 힙메모리를 늘려준다거나 하는거..
보통 이클립스실행할때 ini 에 설정해주는 놈들이랑 비슷한애들이다.
Xms - 최소메모리
Xmx - 최대메모리
XX:MaxPermSize - Permanant Area Size 를 말하는거 같은데.. 어째든 셋다 똑같이 준다.
웬만해선 512씩 줘도 상관없다. 768일때 제일 최적의 속도가 나오는듯해서.. 원래 1024쓰고있었다 ㅋㅋ

그리고 아래와 같은 파일을 tomcat 6 에도 복사해준다. (Confluence 설치할 때도 쓴다.)

```bash

# cd /usr/local/tomcat7

# touch bin/setenv.sh

# vi bin/setenv.sh

```

```bash
export CATALINA_OPTS="-Dorg.apache.jasper.runtime.BodyContentImpl.LIMIT_BUFFER=true -Dmail.mime.decodeparameters=true -Xms768m -Xmx768m -XX:MaxPermSize=768m"
```

```bash

# cp bin/setenv.sh /usr/local/tomcat6/bin/

```

이제 server.xml 을 수정하면 되는데 공홈메뉴얼에서는 이렇게 설명하고 있다.
build 된 디렉토리에서
dist-tomcat/tomcat-6/jira.xml 파일의 내용을 복사해서 넣어줘라!
이게 그 내용이니까 그냥 복사 붙여넣기 하자~!

```bash

# vi /usr/local/tomcat7/conf/server.xml

```

요로코롬 Host 어쩌구 시작하는 곳 밑에 넣어준다.
...

```xml
<Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true" xmlValidation="false" xmlNamespaceAware="false">

<Context path="/jira" docBase="/usr/local/atlassian-jira-5.2.10/dist-tomcat/tomcat-6/atlassian-jira-5.2.10.war" debug="0" useHttpOnly="true">

    <Resource name="UserTransaction" auth="Container" type="javax.transaction.UserTransaction"
    factory="org.objectweb.jotm.UserTransactionFactory" jotm.timeout="60"/>
    <Manager pathname=""/>

</Context>
```

그리고 mysql 드라이버와 관련 라이브러리들을 복사해서 넣어주어야 한다. 다운은 요기서.
http://dev.mysql.com/downloads/connector/j

- Tomcat 6 JARs: http://www.atlassian.com/software/jira/downloads/binary/jira-jars-tomcat-distribution-6.0-m10-tomcat-6x.zip

- Tomcat 7 JARs: http://www.atlassian.com/software/jira/downloads/binary/jira-jars-tomcat-distribution-6.0-m10-tomcat-7x.zip

mysql database 를 하나 만들자.

```sql
CREATE DATABASE jira CHARACTER SET utf8 COLLATE utf8_bin;
```

jdbc 를 이용하는방법과 DataSource를 이용하는 방법 두가지가 있는데 두번째방법은 아래를 참고..(ㅠㅠ해보질 않았다..)
https://confluence.atlassian.com/display/JIRA/Installing+JIRA+on+Tomcat+6.0+or+7.0

세팅이 잘 되었다면
http://127.0.0.1:8090/jira 하면 접속이 가능하다.
nginx+mod_jk 를 통해 연결을 해주었다면 http://도메인/jira 로 접속이 가능하다.
[mod_jk 설정방법은 요기서 !]:{{ site.url }}

nginx 랑 httpd 두놈은 프록시로 연결해주어야 한다.
httpd 는 미리 8080 포트를 이용하게 세팅을 해놓았다 . 아래처럼 연결~!

```bash

# vi /etc/nginx/conf.d/virtual.conf

```

```text
...
server {
listen 80;
server_name develop.amuzr.com;

    charset utf-8;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8080;
    }

}
...

```

```bash

# vi /usr/local/apache2/conf/httpd.conf

```

52번째줄 정도에 port 번호를 8080으로수정.

```bash

# vi /etc/nginx/nginx.conf

```

프록시 연결시간을 쪼~끔 늘려주자.

```bash
#proxy & fastcgi setting
proxy_read_timeout 1800s;
proxy_buffer_size 32k;
proxy_buffers 4 64k;
proxy_busy_buffers_size 64k;
```

세팅중 아래와 같은 에러들을 볼 수 있기 때문에 미리 조치한다.

-java.netSocketException: Too many open files

```bash

# ulimit -a

# ulimit -n 4096

```

재시작할때 같은 문제를 겪지 않기 위해

```bash

# vi /etc/security/limits.conf

```

파일에도 적용한다.

-Packet for query is too large

```bash

# vi /etc/my.cnf

```

```bash
[mysqld]
...
max_allowed_packet = 32M
...
```

이렇게 수정한다.

## Confluence 설치

Confluence 설치는 JIRA 와 크게 다르지 않다.
같은 방법으로 압축을 풀어주고 데이터 폴더를 지정해주고 server.xml 에 context 를 복사해서 넣어주면 끝이다.
데이터폴더를 confluence 설치폴더 안에 data 폴더를 만들고 넣어주었다.
/usr/local/src 에 다운 받아서 압축을 풀었다고 가정하고 진행한다.

```bash

# mv /usr/local/src/confluence-5.1 /usr/local/

# cd /usr/local/confluence-5.1

# vi confluence/WEB-INF/classes/confluence-init.properties

```

```properties
..
confluence.home=/usr/local/confluence-5.1/data/
..

```

```bash

# ./build.sh

# vi /usr/local/tomcat6/conf/server.xml

```

```xml
...
<Context path="/confluence" docBase="/usr/local/confluence-5.1/dist/confluence-5.1.war" debug="0" reloadable="true">

</Context>
...
```

confluence 도 mysql 을 쓰려면 mysql 커넥터드라이버를 넣어주어야 한다.

이제
http://도메인/jira
http://도메인/confluence

으로 접속하여 설치를 진행하면 된다. 이부분부터는 크게 어렵지 않다.
중간에 mysql 세팅할때 unicode ~~ utf8 복사해서 잘 넣어준다.

만약 중간에 쓰던 파일이 있을경우 설치 도중 import existing 어쩌구.. 하는 부분을 눈여겨 봐서 클릭을해서 가져와야한다.

기본적으로 jira confluence 는 주기적으로 xml파일로 백업을해서 압축해서 저장하고 있다. 백업옵션은 나중에 바꿀 수 있으며 용량이 크지 않다.
