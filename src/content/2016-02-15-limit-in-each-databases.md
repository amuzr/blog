---
layout: post
title: '각 DB 에서 LIMIT 구현하기'
date: '2016-02-15 15:39:33 +0900'
tags: ['db', 'limit']
image: img/brandi-redd-aJTiW00qqtI-unsplash.jpg
draft: false
---

LIMIT 구현

```sql
-- DB2
select _ from table fetch first 10 rows only
-- Informix
select first 10 _ from table
-- Microsoft SQL Server and Access
select top 10 _ from table
-- MySQL and PostgreSQL
select _ from table limit 10
-- Oracle
select _ from (select _ from table) where rownum <= 10
```
