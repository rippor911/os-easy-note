---
title: 进程与线程
tags: [process, concurrency]
---

# 进程与线程

<div class="os-chapter-hero os-chapter-hero--process">
  <p class="os-chapter-hero__eyebrow">Concurrency Control</p>
  <p>这一章关注操作系统如何组织并发执行：进程负责资源与调度边界，线程提高执行粒度，同步互斥保证共享资源访问可控。</p>
</div>

## 学习顺序

<ol class="os-path">
  <li><a href="./4_1%20%E8%BF%9B%E7%A8%8B%E7%8A%B6%E6%80%81%E4%B8%8E%E6%8E%A7%E5%88%B6">进程状态与控制</a><span>先掌握进程、PCB、状态转换和原语。</span></li>
  <li><a href="./4_2%20%E7%BA%BF%E7%A8%8B">线程</a><span>理解用户级线程、内核级线程和混合实现的差异。</span></li>
  <li><a href="./4_3%20%E5%90%8C%E6%AD%A5%E4%B8%8E%E4%BA%92%E6%96%A5">同步与互斥</a><span>把临界区、信号量、管程和经典同步问题串起来。</span></li>
</ol>

## 关键概念

<div class="os-card-grid os-card-grid--compact">
  <article class="os-card">
    <span class="os-card__meta">调度单位</span>
    <strong>进程与线程</strong>
    <p>进程更偏资源拥有者，线程更偏执行单元；很多题目会围绕共享资源和切换开销设陷阱。</p>
  </article>
  <article class="os-card">
    <span class="os-card__meta">约束关系</span>
    <strong>同步与互斥</strong>
    <p>互斥处理竞争同一资源，同步处理执行先后依赖；二者都服务于并发程序的正确性。</p>
  </article>
</div>
