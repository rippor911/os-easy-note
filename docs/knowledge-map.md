---
title: Knowledge Map
tags: [index]
difficulty: overview
review: 2026-04-26
---

# Knowledge Map

<div class="os-note-band">
  <p>知识地图用来定位概念之间的依赖关系。复习时可以先看主干，再回到具体章节补细节和做练习。</p>
</div>

```mermaid
flowchart LR
  OS[操作系统整体视角]
  OS --> Boot[启动与程序运行]
  OS --> Memory[内存管理]
  OS --> Process[进程与线程]

  Boot --> BootFlow[Boot 流程]
  Boot --> ProgramRun[程序运行过程]

  Memory --> Storage[存储管理]
  Memory --> Paging[页式管理]
  Memory --> Segment[段式管理]
  Paging --> Virtual[虚拟内存]
  Virtual --> Demand[请求式分页]
  Paging --> SelfMap[页表自映射]

  Process --> State[进程状态与控制]
  Process --> Thread[线程模型]
  Process --> Sync[同步与互斥]
  Sync --> Semaphore[信号量]
  Sync --> Monitor[管程]
  Sync --> Classic[经典同步问题]
```

## 模块索引

<div class="os-card-grid">
  <a class="os-card" href="./OS%20Boot/main">
    <span class="os-card__meta">启动主线</span>
    <strong>OS Boot</strong>
    <p>适合在学习内存和进程之前先建立系统启动与程序执行的整体背景。</p>
  </a>
  <a class="os-card" href="./%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86/main">
    <span class="os-card__meta">地址主线</span>
    <strong>内存管理</strong>
    <p>从地址转换进入分页、虚拟内存、缺页异常和页表自映射。</p>
  </a>
  <a class="os-card" href="./%E8%BF%9B%E7%A8%8B%E4%B8%8E%E7%BA%BF%E7%A8%8B/main">
    <span class="os-card__meta">并发主线</span>
    <strong>进程与线程</strong>
    <p>从进程状态出发，连接线程实现、同步互斥和经典并发问题。</p>
  </a>
</div>
