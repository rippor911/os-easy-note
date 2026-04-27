---
title: OS Notes Web
tags: [index]
difficulty: overview
review: 2026-04-26
---

<script setup>
import { withBase } from 'vitepress'
</script>

# OS Notes Web

<div class="os-home-hero">
  <img class="os-home-hero__logo" :src="withBase('/logo-round.png')" alt="OS Notes Web logo">
  <div>
    <p class="os-home-hero__eyebrow">Operating Systems Study Notes</p>
    <p class="os-home-hero__lead">面向复习、实验和概念辨析的操作系统学习笔记。内容以 Markdown 为主线，配合题目、知识地图和本地学习进度，帮助你把零散概念串成可复盘的结构。</p>
    <div class="os-home-hero__actions">
      <a class="os-button" href="./knowledge-map">知识结构</a>
      <a class="os-button os-button--secondary" href="./progress">学习进度</a>
    </div>
  </div>
</div>

<div class="os-stat-grid">
  <article class="os-stat">
    <strong>3</strong>
    <span>主题模块</span>
  </article>
  <article class="os-stat">
    <strong>14+</strong>
    <span>笔记页面</span>
  </article>
  <article class="os-stat">
    <strong>题库</strong>
    <span>单选与填空练习</span>
  </article>
</div>

## 学习入口

<div class="os-card-grid">
  <a class="os-card" href="./OS%20Boot/main">
    <span class="os-card__meta">Boot</span>
    <strong>OS Boot</strong>
    <p>从机器启动、引导加载到程序运行过程，建立系统从上电到执行用户程序的整体视角。</p>
  </a>
  <a class="os-card" href="./%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86/main">
    <span class="os-card__meta">Memory</span>
    <strong>内存管理</strong>
    <p>覆盖分页、分段、虚拟内存、请求分页和页表自映射，是考试与实验都很高频的模块。</p>
  </a>
  <a class="os-card" href="./%E8%BF%9B%E7%A8%8B%E4%B8%8E%E7%BA%BF%E7%A8%8B/main">
    <span class="os-card__meta">Concurrency</span>
    <strong>进程与线程</strong>
    <p>围绕进程状态、线程模型、同步互斥和经典并发问题，整理并发执行的核心约束。</p>
  </a>
</div>

## 辅助入口

- [知识地图](./knowledge-map.md)：从整体结构定位概念关系。
- [期中考试真题](./exams.md)：打开或下载已收录的期中试题 PDF。
- [推荐资料](./resources.md)：补充教材、课程和实验参考链接。
- [学习进度](./progress.md)：查看本地阅读、做题和错题记录。
- [GitHub repository](https://github.com/rippor911/os-easy-note)：反馈错误或补充内容。
