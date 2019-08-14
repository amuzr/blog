---
layout: post
title: 'nginx 411 length required error'
date: '2013-03-27 21:18:13 +0900'
tags: ['android', 'nginx']
draft: false
---

`httpPost` 사용해서 이미지를 보내줄 때
헤더 내용 중 `Content-Length` 값이 없어서 _(-1 리턴)_ `chunked` 로 보내준다. `isChunked true`

**Apach Http** 서버일때는 `chunked` 라도 그냥 처리를 해주었기 때문에문제가 없었지만,
nginx 는 1.3.9 버전 이후부터 처리가 가능하다.
그 이하 버전에서는 바이너리 설치하면서 모듈을 넣어주어야 한다.

어플 단에서 간단하게 몇줄 추가해서 해결할 수 있다.

```java
byte[] byteArray = stream.toByteArray();
final int streamLength = stream.toByteArray().length;
...

new InputStreamBody(new ByteArrayInputStream(byteArray), "image/jpeg", filename){
public long getContentLength() {
return (long)streamLength;
}
```

`getContentLength`는 항상 `-1`을 리턴하게 되있는데 오버라이딩해서 파일크기를 넣어주면 이미지를 보낼 때 헤더에 `Content-Length`를 잘 넣어주고 `chunked`로 처리하지 않는다.

**UPDATE** 현재 2016-12-07 버전이 충분히 높아 문제 없다. 해당 이슈를 찾았던 document 도 찾을 수 없다.
