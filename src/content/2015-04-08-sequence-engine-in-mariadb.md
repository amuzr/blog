---
layout: post
title: 'MariaDB 에서 시퀀스엔진 사용하기'
date: '2015-04-08 16:36:46 +0900'
tags: ['mariadb', 'sequenceengine', 'sequence', 'engine']
draft: false
---

전용뷰어 보기
MariaDB 스토리지 엔진중에 아주 쓸만한 시퀀스 엔진이 있다.

간단하게 설명하면 그냥 숫자 쭉 나열해주는 기능이다.

상황에 따라 oracle 의 rownum 처럼 쓸수도 있고
join 하여 날짜를 카운팅 할 수 있다. 특정 텀으로 1주일씩 계산하는것도 가능하다.

설치는 아래와 같이 쿼리를 날려주면 된다.(MariaDB 10.0.x 이상)

```sql
INSTALL PLUGIN sequence SONAME 'ha_sequence';
```

사용방법은

```sql
select seq from seq_x_to_y_step_z
```

x 부터 y까지 z간격으로 임시테이블을 생성해준다.

사용예제는 아래와 같다.

```sql
select seq,DATE_ADD('2015-04-08', INTERVAL -(seq-1)\*7 DAY) as seq_date
from seq_1_to_5_step_1
```

특정 날짜 기준으로 지난주 지지난주 등을 쉽게 구할 수 있다 :)
