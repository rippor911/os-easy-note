---
title: OS Boot
tags: [boot]
---

# OS Boot

<div class="os-chapter-hero os-chapter-hero--boot">
  <p class="os-chapter-hero__eyebrow">Boot Sequence</p>
  <p>这一章回答“操作系统如何开始运行”。重点不是背启动步骤，而是看清固件、引导程序、内核入口和用户程序执行之间的边界。</p>
</div>

## 学习顺序

<ol class="os-path">
  <li><a href="./1_0%20引言">引言</a><span>建立从硬件到操作系统的基本问题意识。</span></li>
  <li><a href="./2_0%20Boot">Boot 与启动</a><span>梳理启动阶段各组件的职责。</span></li>
  <li><a href="./3_0%20%E7%A8%8B%E5%BA%8F%E8%BF%90%E8%A1%8C%E5%9F%BA%E6%9C%AC%E8%BF%87%E7%A8%8B">程序运行基本过程</a><span>把装载、地址空间和执行过程连接起来。</span></li>
</ol>

## 复习抓手

<div class="os-card-grid os-card-grid--compact">
  <article class="os-card">
    <span class="os-card__meta">边界</span>
    <strong>谁接管了控制权</strong>
    <p>启动过程的关键线索是控制权如何从固件转移到引导程序，再转移到内核。</p>
  </article>
  <article class="os-card">
    <span class="os-card__meta">执行</span>
    <strong>程序如何真正跑起来</strong>
    <p>关注程序从文件到进程的变化，以及运行时需要哪些系统支持。</p>
  </article>
</div>
