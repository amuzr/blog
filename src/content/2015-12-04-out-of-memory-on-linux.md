---
layout: post
title: '/etc/messages 에서 out of memory 가 일어나서 프로세스가 종료될 때'
date: '2015-12-04 16:51:36 +0900'
tags: ['out_of_memory', 'linux']
image: img/brandi-redd-aJTiW00qqtI-unsplash.jpg
draft: false
---

```
Dec  4 11:16:02 localhost kernel: Call Trace:
Dec  4 11:16:02 localhost kernel: [<ffffffff810d0361>] ? cpuset_print_task_mems_allowed+0x91/0xb0
Dec  4 11:16:02 localhost kernel: [<ffffffff81122730>] ? dump_header+0x90/0x1b0
Dec  4 11:16:02 localhost kernel: [<ffffffff812282fc>] ? security_real_capable_noaudit+0x3c/0x70
Dec  4 11:16:02 localhost kernel: [<ffffffff81122bb2>] ? oom_kill_process+0x82/0x2a0
Dec  4 11:16:02 localhost kernel: [<ffffffff81122af1>] ? select_bad_process+0xe1/0x120
Dec  4 11:16:02 localhost kernel: [<ffffffff81122ff0>] ? out_of_memory+0x220/0x3c0
Dec  4 11:16:02 localhost kernel: [<ffffffff8112f90f>] ? __alloc_pages_nodemask+0x89f/0x8d0
Dec  4 11:16:02 localhost kernel: [<ffffffff8116789a>] ? alloc_pages_current+0xaa/0x110
Dec  4 11:16:02 localhost kernel: [<ffffffff8111fb27>] ? __page_cache_alloc+0x87/0x90
Dec  4 11:16:02 localhost kernel: [<ffffffff8111f50e>] ? find_get_page+0x1e/0xa0
Dec  4 11:16:02 localhost kernel: [<ffffffff81120ac7>] ? filemap_fault+0x1a7/0x500
Dec  4 11:16:02 localhost kernel: [<ffffffff81149e04>] ? __do_fault+0x54/0x530
Dec  4 11:16:02 localhost kernel: [<ffffffff8114a3d7>] ? handle_pte_fault+0xf7/0xb00
Dec  4 11:16:02 localhost kernel: [<ffffffff81528e4e>] ? thread_return+0x4e/0x770
Dec  4 11:16:02 localhost kernel: [<ffffffff810a6d31>] ? ktime_get_ts+0xb1/0xf0
Dec  4 11:16:02 localhost kernel: [<ffffffff81083e1c>] ? lock_timer_base+0x3c/0x70
Dec  4 11:16:02 localhost kernel: [<ffffffff8114b00a>] ? handle_mm_fault+0x22a/0x300
Dec  4 11:16:02 localhost kernel: [<ffffffff81084aa2>] ? del_timer_sync+0x22/0x30
Dec  4 11:16:02 localhost kernel: [<ffffffff8104a8d8>] ? __do_page_fault+0x138/0x480
Dec  4 11:16:02 localhost kernel: [<ffffffff81061d00>] ? default_wake_function+0x0/0x20
Dec  4 11:16:02 localhost kernel: [<ffffffffa00b5938>] ? jbd2_complete_transaction+0x68/0xb0 [jbd2]
Dec  4 11:16:02 localhost kernel: [<ffffffff811d6770>] ? timeout_func+0x0/0x20
Dec  4 11:16:02 localhost kernel: [<ffffffff8152e99e>] ? do_page_fault+0x3e/0xa0
Dec  4 11:16:02 localhost kernel: [<ffffffff8152bd55>] ? page_fault+0x25/0x30
```

해당 방법은 http://cafe.naver.com/opensourcesw/583 에서 확인한 글입니다.

---

메모리관련 메커니즘을 수정해서 out of memory 를 줄이는 방법입니다.
Linux의 메모리 관리에서는 메모리 오버커밋이라는 메커니즘이 적용되어 있어 실제 메모리 이상의 공간을 확보할 수 있습니다.
이는 어떤 문제를 야기시킬 수 있는가 하면 Linux 가상 메모리 시스템은 프로세스가 메모리를 확보할 때는 많게 보이게 하고 실제로 프로세스가 메모리에 접근을 하게되면 실제 메모리를 할당하는데 이때 실제 메모리가 부족하게 되면 OS내부적으로 프로세스를 마음대로 kill을 해버리는데 이걸 OOM-killer(out of memory killer)라고 합니다.

OOM Killer는 시스템이 실제 메모리와 가상 메모리 공간(스왑)을 다 사용해, 필요한 메모리 공간을 새로 확보 할 수 없는 경우 프로세스를 종료시켜 여유메모리를 확보하는 리눅스 커널의 메커니즘 중에 하나입니다.
그래서 kill된 프로세스가 자기가 왜 죽어버리는지 알수 없는 인터럽트가 발생해서 자신이 인터럽트가 발생했을 때 예외처리를 수행하지 못하는 문제가 발생합니다.

이런현상이 데이터를 관리하는 DB서버에서 발생한다면 리눅스의 좋은 메커니즘이라도 고객의 인지 정보가 실제 데이터에는 저장되지 않는 데이터 유실을 유발시킬 수 있습니다. 그러므로 강제로 kill을 통한 메모리 확보가 아닌 DB자체가 메모리 부족을 인지하고 예외처리하는 로직을 태우게 OS환경을 만들어줄 필요가 있습니다.

관련 커널 매개변수 정보
`vm.overcommit_memory`
0 : heuristic에 따라 overcommit 할 수 있고, 하지 않을 수도 있다.(default)
메모리 요구가 있을 때 여유공간이 없는 경우 실행중인 프로세스를 강제 종료 메모리를 억지로 확보함.
1 : 항상 overcommit 함. 메모리를 다 사용했는데도 충분한 메모리가 있는것처럼 처리됨. 그외에는 0과 같음.
무조건적으로 메모리 요청을 허용해주는 것으로서 OOM Killer가 가장 잘 발생될 수 있는 환경
2 : overcommit 하지 않음.
메모리가 부족할 경우 메모리 확보시 에러발생시킴 [Swap size] + ([RAM size} \* vm.overcommit_ratio/100).
실제로 사용하지 않고 있다 하더라도 물리적인 메모리가 허용되는 한도에서만 메모리 할당 요청을 받아주는 형태.

`vm.overcommit_ratio`
사용 가능한 메모리의 백분율로 정의. overcommit_ratio의 디폴트는 50

centos command
/etc/sysctl.conf

vm.overcommit_memory = 2
vm.overcommit_ratio = 100

적용은 sysctl -p

---

여기까지 원글쓴이의 글이다.

만약 레이쇼를 적용하지 못한상태로 적용하게된다면...

bash 조차 먹히지 않는 상황이 발생할 수있다

그럴땐 원격으로 mysqladmin -h(호스트) -uroot -p shutdown 을 입력한다.

참고 kill 우선순위

http://unix.stackexchange.com/a/128667
