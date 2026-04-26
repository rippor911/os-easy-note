---
title: 内存管理
tags: [memory]
---

# 内存管理

<div class="os-chapter-hero os-chapter-hero--memory">
  <p class="os-chapter-hero__eyebrow">Address Space</p>
  <p>这一章围绕一个核心问题展开：程序看到的地址如何被操作系统和硬件转换成真实内存访问。分页、分段、虚拟内存和缺页处理都服务于这个问题。</p>
</div>

## 学习顺序

<ol class="os-path">
  <li><a href="./3_1%E5%AD%98%E5%82%A8%E7%AE%A1%E7%90%86">存储管理</a><span>先理解内存管理要解决的抽象、分配和交换问题。</span></li>
  <li><a href="./3_2%20%E9%A1%B5%E5%BC%8F%E7%AE%A1%E7%90%86%E5%9F%BA%E7%A1%80">页式管理基础</a><span>掌握页、页框、页表和地址划分。</span></li>
  <li><a href="./3_3%20%E6%AE%B5%E5%BC%8F%E7%AE%A1%E7%90%86">段式管理</a><span>对比分页与分段，抓住逻辑单位和离散分配的差异。</span></li>
  <li><a href="./3_4%20%E8%99%9A%E6%8B%9F%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86">虚拟内存管理</a><span>用局部性原理理解为什么可以按需装入。</span></li>
  <li><a href="./3_5%20%E8%AF%B7%E6%B1%82%E5%BC%8F%E5%88%86%E9%A1%B5%E7%B3%BB%E7%BB%9F">请求式分页系统</a><span>重点看缺页异常、页面置换和调页策略。</span></li>
  <li><a href="./3_6%20%E9%A1%B5%E8%A1%A8%E8%87%AA%E6%98%A0%E5%B0%84">页表自映射</a><span>把多级页表的地址转换推导落到可计算地址上。</span></li>
</ol>

## 高频辨析

<div class="os-card-grid os-card-grid--compact">
  <article class="os-card">
    <span class="os-card__meta">TLB</span>
    <strong>TLB miss 不是缺页</strong>
    <p>TLB miss 只说明快表没有缓存映射；缺页才说明页表项无法直接完成访问。</p>
  </article>
  <article class="os-card">
    <span class="os-card__meta">Page Fault</span>
    <strong>缺页处理是异常路径</strong>
    <p>缺页通常需要陷入内核，可能触发磁盘 I/O、页面置换和页表更新。</p>
  </article>
</div>
