---
title: 进程与线程
tags: [process, concurrency]
---

# Process and Threads

## Pages

- [Process State and Control](./4_1%20进程状态与控制.md)
- [Threads](./4_2%20线程.md)
- [Synchronization and Mutual Exclusion](./4_3%20同步与互斥.md)

## 

> [!note]
>
> + **并发（Concurrent）：**任意时刻，活动 $a_1$ 和 $a_2$ 都在各自起点和终点之间的某处（即都没有结束），则称 $a_1$ 和 $a_2$ 并发执行 
> + **并行（Parallel）：**活动 $a_1$ 和 $a_2$ 在不同的处理器上执行（并行 $\subset$ 并发） 
> + **进程（Process）：**一个程序在一个数据集合上运行的过程，是系统进行资源分配和调度的一个独立单位
> + **原语（Primitive）：**由若干条指令所组成的指令序列，来实现某个特定的操作功能（连续不可分割的，OS核心，必须内核态执行，常驻内存）
> + **线程（Thread）：**现代操作系统将进程进一步划分为资源拥有者和可执行单元，线程就是可执行单元（任务层并发），共享资源
