---
layout: post
title: Menu Orders
description: >
sitemap: false
---

# Menu Orders

---

### 작동방식

- menu의 order컬럼을 두고, 그 order를 이용해서 구현하는 대신, store_detail에 menuOrder컬럼(배열을 문자열로 변환한 것)을 두고 이용
- 따라서, 메뉴 추가나 메뉴 순서 변경, 메뉴 품절처리 등 순서가 변경될 수 있는 곳에서
store_detail의 문자열만 변경 가능

### 동기

- 드래그 방식으로 변경되는 메뉴 순서는 각각의 menu마다 order컬럼을 둔다면,
무수히 많고 복잡한 update문이 작성되리라 예상

## Sequence Diagram ([Link](https://excalidraw.com/#json=fBGp43_9Z20vUQ5eBsxz3,jh1MQb5ZU5H4n7QFpqGN5g))


### 점주


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/56c765c5-a900-4bdb-bea8-c899ab1f0060/5f4c1f37-d426-4156-ae2e-780d61595c0f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240715%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240715T160331Z&X-Amz-Expires=3600&X-Amz-Signature=d4dfbd50da3ee500211a067653c57b851b2b560b94017d04e8e392ad270efe7e&X-Amz-SignedHeaders=host&x-id=GetObject)


### User


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/56c765c5-a900-4bdb-bea8-c899ab1f0060/95aeed95-a2ee-405a-9024-81d2c9b3f506/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240715%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240715T160331Z&X-Amz-Expires=3600&X-Amz-Signature=8bb87ec1f4572d18ae48db7a377216a5e7f70b87f2d152d52331a26fb774d74d&X-Amz-SignedHeaders=host&x-id=GetObject)

