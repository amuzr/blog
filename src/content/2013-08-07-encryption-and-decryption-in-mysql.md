---
layout: post
title: 'MySql 에서 암호화 복호화 참고'
date: '2013-08-07 11:02:09 +0900'
tags: ['mysql', 'encryption', 'decryption']
image: img/brandi-redd-aJTiW00qqtI-unsplash.jpg
draft: false
---

```sql
-- 암호화
insert into table (pass) values ( (HEX(AES_ENCRYPT('암호','key')));
-- 복호화
select AES_DECRYPT(UNHEX(pass), 'key')
```

자세한 설명은 생략한다.
