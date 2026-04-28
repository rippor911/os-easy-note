<script setup lang="ts">
import { computed, ref } from 'vue'
import { recordQuestion } from './utils/progress'
import ExamSupplements, { type SupplementBlock } from './ExamSupplements.vue'

type ObjectiveType = 'true-false' | 'single' | 'blank'

interface ObjectiveBase {
  id: string
  type: ObjectiveType
  title: string
  question: string
  points: number
  explanation: string
}

interface TrueFalseQuestion extends ObjectiveBase {
  type: 'true-false'
  answer: boolean
}

interface SingleChoiceQuestion extends ObjectiveBase {
  type: 'single'
  options: Array<{
    label: string
    text: string
  }>
  answer: string
}

interface BlankQuestion extends ObjectiveBase {
  type: 'blank'
  answers: string[]
  answerText: string
  supplements?: SupplementBlock[]
}

type ObjectiveQuestion = TrueFalseQuestion | SingleChoiceQuestion | BlankQuestion

interface SubjectiveQuestion {
  id: string
  title: string
  points: number
  prompt: string
  details?: string[]
  answer: string[]
  rubric?: string[]
  supplements?: SupplementBlock[]
}

const trueFalseQuestions: TrueFalseQuestion[] = [
  {
    id: 'tf-01',
    type: 'true-false',
    title: '内核态与用户态',
    question: '现代操作系统中，内核态和用户态的概念主要是为了保护操作系统的核心资源，并防止应用程序随意访问关键硬件。',
    answer: true,
    points: 2,
    explanation: '内核态/用户态的核心作用就是通过特权级隔离保护内核与关键硬件资源。'
  },
  {
    id: 'tf-02',
    type: 'true-false',
    title: '操作系统功能',
    question: '操作系统的主要功能包括进程管理、内存管理、文件系统、设备管理和安全管理等。',
    answer: true,
    points: 2,
    explanation: '这些都是操作系统常见的核心管理职责。'
  },
  {
    id: 'tf-03',
    type: 'true-false',
    title: '微内核与宏内核',
    question: '同一操作系统如果采用微内核架构比宏内核架构占用空间更小，但功能更强大且更易扩展。',
    answer: false,
    points: 2,
    explanation: '微内核通常把更多服务移到用户态，内核本体更小、扩展性较好，但不能直接推出“功能更强大”。'
  },
  {
    id: 'tf-04',
    type: 'true-false',
    title: '段式管理',
    question: '段式内存管理支持按照程序中“逻辑段”来分配内存，适合按功能或数据结构对内存进行更直观的划分。',
    answer: true,
    points: 2,
    explanation: '段式管理面向逻辑段，如代码段、数据段、栈段等。'
  },
  {
    id: 'tf-05',
    type: 'true-false',
    title: '缺页异常',
    question: '缺页异常是由程序中 Bug 引起的，需要程序员修复后才能消除。',
    answer: false,
    points: 2,
    explanation: '缺页异常是请求分页和虚拟内存中的正常机制，不等同于程序错误。'
  },
  {
    id: 'tf-06',
    type: 'true-false',
    title: '内核级线程阻塞',
    question: '内核级线程在进行阻塞调用时不会阻塞同一进程的其他线程，因为内核可为其他可运行线程分配 CPU。',
    answer: true,
    points: 2,
    explanation: '内核能感知并调度内核级线程，一个线程阻塞时，同进程其他可运行线程仍可被调度。'
  },
  {
    id: 'tf-07',
    type: 'true-false',
    title: '多对多线程模型',
    question: '在多对多线程模型中，多个用户线程可以映射到多个内核线程上，从而既保留用户线程灵活性，又避免单线程阻塞问题。',
    answer: true,
    points: 2,
    explanation: '多对多模型试图结合用户级线程灵活性和内核级并行/阻塞处理能力。'
  },
  {
    id: 'tf-08',
    type: 'true-false',
    title: '自旋锁适用场景',
    question: '自旋锁在高并发且临界区执行时间较长的场景下一般更有效率，因为线程会一直占用 CPU 等待锁释放，避免上下文切换。',
    answer: false,
    points: 2,
    explanation: '自旋锁适合临界区很短的场景；等待时间长时会浪费 CPU。'
  },
  {
    id: 'tf-09',
    type: 'true-false',
    title: '信号量用途',
    question: '使用信号量既可以实现互斥，也可以实现同步的功能。',
    answer: true,
    points: 2,
    explanation: '二元信号量可用于互斥，计数或事件信号量也可表达同步约束。'
  },
  {
    id: 'tf-10',
    type: 'true-false',
    title: '线程资源',
    question: '同一进程内的多个线程共享地址空间，但它们各自拥有独立的寄存器上下文和栈空间。',
    answer: true,
    points: 2,
    explanation: '线程共享进程资源，但每个线程需要自己的执行现场和栈。'
  }
]

const singleChoiceQuestions: SingleChoiceQuestion[] = [
  {
    id: 'choice-01',
    type: 'single',
    title: '内存空间管理数据结构',
    question: '关于内存空间管理的数据结构，下面说法错误的是哪一项？',
    options: [
      { label: 'A', text: '位图表示法成本固定' },
      { label: 'B', text: '链表表示法容错能力差' },
      { label: 'C', text: '位图表示法时间成本低' },
      { label: 'D', text: '链表表示法的空间成本取决于程序的数量' }
    ],
    answer: 'C',
    points: 2,
    explanation: '位图空间开销固定，但查找连续空闲块通常需要扫描位图，不能笼统说时间成本低。'
  },
  {
    id: 'choice-02',
    type: 'single',
    title: '页表项结构',
    question: '关于页表项结构，正确的是哪一项？',
    options: [
      { label: 'A', text: '当操作系统把该页从物理内存调出时，会对有效位置位' },
      { label: 'B', text: '当硬件在写入一个页面时，硬件将该页的修改位置为 0' },
      { label: 'C', text: '页表项可用于实现页面到页框的映射' },
      { label: 'D', text: '页表项会保存对应页面的外存地址' }
    ],
    answer: 'C',
    points: 2,
    explanation: '页表项的基本作用是记录虚拟页到物理页框的映射及权限/状态位。'
  },
  {
    id: 'choice-03',
    type: 'single',
    title: '多级页表',
    question: '关于多级页表，下列说法不正确的是哪一项？',
    options: [
      { label: 'A', text: '能够减少页表占用内存的大小' },
      { label: 'B', text: '除了顶级页表，其他级别页表可按需动态调入内存' },
      { label: 'C', text: '有效的页表项中都会存储页框号' },
      { label: 'D', text: '使用三级页表的平均访存性能优于二级页表' }
    ],
    answer: 'D',
    points: 2,
    explanation: '页表级数越多，未命中 TLB 时页表遍历通常越长，不能说三级平均访存性能优于二级。'
  },
  {
    id: 'choice-04',
    type: 'single',
    title: '陷入内核与上下文切换',
    question: '以下说法正确的是哪一项？',
    options: [
      { label: 'A', text: '进程上下文切换过程一定会陷入内核' },
      { label: 'B', text: '陷入内核一定会导致进程切换' },
      { label: 'C', text: '正在执行的程序不可以主动放弃 CPU' },
      { label: 'D', text: '系统调用一定会导致进程上下文切换' }
    ],
    answer: 'A',
    points: 2,
    explanation: '进程切换由内核完成；但系统调用或中断进入内核后不一定切换到另一个进程。'
  },
  {
    id: 'choice-05',
    type: 'single',
    title: '线程与进程',
    question: '关于线程与进程，错误的是哪一项？',
    options: [
      { label: 'A', text: '一个进程可以拥有多个线程，而一个线程同时只能被一个进程所拥有' },
      { label: 'B', text: '进程是资源分配的基本单位，线程是处理机调度的基本单位' },
      { label: 'C', text: '使用多线程能够更好的释放多核系统的性能' },
      { label: 'D', text: '相比单线程，使用多线程总能获得更好的性能' }
    ],
    answer: 'D',
    points: 2,
    explanation: '多线程有同步、调度和上下文切换开销，不能保证总是优于单线程。'
  },
  {
    id: 'choice-06',
    type: 'single',
    title: 'PV 操作',
    question: '关于 PV 操作，错误的是哪一项？',
    options: [
      { label: 'A', text: '信号量可以用来解决任何进程同步问题' },
      { label: 'B', text: '进程执行 P 操作阻塞时，不会占用 CPU 资源' },
      { label: 'C', text: '进程 A、B 调用 P(S) 各一次后，信号量 S 的值与调用顺序有关' },
      { label: 'D', text: '信号量操作是原子操作' }
    ],
    answer: 'C',
    points: 2,
    explanation: '两次 P 操作对信号量值的净影响相同，最终值不应取决于 A、B 的调用顺序。'
  },
  {
    id: 'choice-07',
    type: 'single',
    title: '局部性原理',
    question: '关于程序的局部性原理，错误的是哪一项？',
    options: [
      { label: 'A', text: '局部性原理包括时间局部性和空间局部性' },
      { label: 'B', text: '虚拟存储机制的有效运转依赖程序的局部性原理' },
      { label: 'C', text: '程序中的循环结构会导致程序的空间局部性' },
      { label: 'D', text: 'Cache-主存机制的有效运转依赖程序的局部性原理' }
    ],
    answer: 'C',
    points: 2,
    explanation: '循环通常体现时间局部性；顺序访问数组等更常体现空间局部性。'
  },
  {
    id: 'choice-08',
    type: 'single',
    title: '页面置换算法',
    question: '关于页面置换算法，以下说法不正确的是哪一项？',
    options: [
      { label: 'A', text: '二次机会算法是对 FIFO 的改进' },
      { label: 'B', text: 'Aging 算法是对 LRU 算法的高效近似实现' },
      { label: 'C', text: 'WSClock 算法仅需要在页表中扫描' },
      { label: 'D', text: '工作集算法的思路是驱逐不在工作集中的页面' }
    ],
    answer: 'C',
    points: 2,
    explanation: 'WSClock 需要维护类似时钟的页面链表并结合访问位、修改位和时间信息，不是“仅扫描页表”。'
  },
  {
    id: 'choice-09',
    type: 'single',
    title: '快表',
    question: '关于快表，错误的是哪一项？',
    options: [
      { label: 'A', text: '使用快表能使得页表查询速度更快' },
      { label: 'B', text: '快表的命中率越高，访存的速度越快' },
      { label: 'C', text: '反置页表无法使用快表加速' },
      { label: 'D', text: '快表项需要记录物理块号及其对应的虚拟页号' }
    ],
    answer: 'C',
    points: 2,
    explanation: '反置页表同样可以用 TLB 缓存近期地址转换结果。'
  },
  {
    id: 'choice-10',
    type: 'single',
    title: '覆盖与交换',
    question: '下列说法错误的是哪一项？',
    options: [
      { label: 'A', text: '覆盖可减少一个程序运行所需的空间' },
      { label: 'B', text: '覆盖对应用程序员不透明' },
      { label: 'C', text: '交换是由操作系统实现的' },
      { label: 'D', text: '覆盖在不同作业或程序之间进行' }
    ],
    answer: 'D',
    points: 2,
    explanation: '覆盖通常是在同一程序内部按模块复用内存；交换才发生在进程/作业与外存之间。'
  }
]

const variableStorageSnippet = '#include <stdio.h>\nint a = 100;\nint b;\nint main() {\n    int x[100];\n    int y = 10;\n    int *p = &y, *q = &b;\n    printf("a=%d, b=%d, x=0x%lx, p=0x%lx, q=0x%lx\\n", a,\n        b, (unsigned long)x, (unsigned long)p, (unsigned long)q);\n}'

const blankQuestions: BlankQuestion[] = [
  {
    id: 'blank-01-fifo',
    type: 'blank',
    title: 'FIFO 缺页次数',
    question: '页面访问序列 A B C D E F A A C F G D A C G D C E，4 个页框，FIFO 产生多少次缺页中断？',
    answers: ['11'],
    answerText: '11',
    points: 2,
    explanation: '按 FIFO 依次淘汰最早进入内存的页面，共 11 次缺页。'
  },
  {
    id: 'blank-01-clock',
    type: 'blank',
    title: 'CLOCK 缺页次数',
    question: '同一访问序列、4 个页框，CLOCK 算法产生多少次缺页中断？',
    answers: ['11'],
    answerText: '11',
    points: 2,
    explanation: '按装入/访问置引用位、替换时扫描清零的常规定义，共 11 次缺页。'
  },
  {
    id: 'blank-02-thrashing',
    type: 'blank',
    title: '频繁调页现象',
    question: '并发水平上升导致每个进程常驻集减小、缺页率上升、系统频繁调页，这种现象称为什么？',
    answers: ['抖动', '颠簸', 'thrashing'],
    answerText: '抖动 / 颠簸（thrashing）',
    points: 2,
    explanation: '工作集不足导致大量时间花在调页上，就是抖动。'
  },
  {
    id: 'blank-03-state',
    type: 'blank',
    title: '状态转换',
    question: '在操作系统进程状态模型中，进程不能直接从哪一种状态转换到运行态？',
    answers: ['阻塞态', '阻塞状态', '等待态', '等待状态', 'blocked'],
    answerText: '阻塞态 / 等待态',
    points: 2,
    explanation: '阻塞进程等待事件完成后通常先进入就绪态，再由调度器分配 CPU。'
  },
  {
    id: 'blank-04-uboot',
    type: 'blank',
    title: 'U-Boot 阶段',
    question: 'U-Boot 程序中通常用 C 语言来实现的部分称为什么？',
    answers: ['第二阶段', 'stage2', 'stage 2', 'secondstage', 'second stage'],
    answerText: '第二阶段（stage 2）',
    points: 2,
    explanation: 'U-Boot 早期启动通常先由汇编完成必要初始化，再进入主要由 C 编写的第二阶段。'
  },
  {
    id: 'blank-05-worst-fit',
    type: 'blank',
    title: '可变分区分配',
    question: '可变分区存储分配算法中，哪种算法总是挑选可以容纳作业的最大空闲区进行分配？',
    answers: ['最坏适应', '最坏适应算法', 'worstfit', 'worst fit'],
    answerText: '最坏适应算法（Worst Fit）',
    points: 2,
    explanation: 'Worst Fit 每次选择最大的可用空闲分区。'
  },
  {
    id: 'blank-06-data',
    type: 'blank',
    title: '变量 a 所在段',
    question: '程序中全局变量 int a = 100; 装载后通常在哪个段中分配存储空间？',
    answers: ['数据段', '.data', 'data', '已初始化数据段'],
    answerText: '数据段（.data）',
    supplements: [
      {
        type: 'code',
        language: 'c',
        content: variableStorageSnippet
      }
    ],
    points: 2,
    explanation: '已初始化全局变量通常放在 .data。'
  },
  {
    id: 'blank-06-stack',
    type: 'blank',
    title: '变量 x 所在段',
    question: '函数内局部数组 int x[100]; 运行时通常在哪个段中分配存储空间？',
    answers: ['栈', '栈段', 'stack'],
    answerText: '栈段（stack）',
    supplements: [
      {
        type: 'code',
        language: 'c',
        content: variableStorageSnippet
      }
    ],
    points: 2,
    explanation: '普通自动局部变量通常分配在线程栈上。'
  },
  {
    id: 'blank-07-dekker-wait',
    type: 'blank',
    title: 'Dekker 等待语句',
    question: '补全 Dekker 算法中 P0 放弃意向后等待 turn 改变的语句。',
    answers: ['while(turn==1)', 'while(turn==1);', 'while(turn!=0)', 'while(turn!=0);'],
    answerText: 'while (turn == 1);',
    supplements: [
      {
        type: 'code',
        content: '1   ...\n2   pturn = true;\n3   while (qturn) {\n4\n5       if (turn == 1) {\n6           pturn = false;\n7           ________\n8           pturn = true;\n9       }\n10  }\n11  访问临界区\n12\n13  pturn = false;\n14  ...'
      }
    ],
    points: 2,
    explanation: 'P0 暂时撤销 pturn 后，应等待 turn 不再偏向 P1，再重新声明进入意向。'
  },
  {
    id: 'blank-07-dekker-turn',
    type: 'blank',
    title: 'Dekker 退出语句',
    question: '补全 Dekker 算法中 P0 离开临界区时交出优先权的语句。',
    answers: ['turn=1', 'turn=1;'],
    answerText: 'turn = 1;',
    supplements: [
      {
        type: 'code',
        content: '1   ...\n2   pturn = true;\n3   while (qturn) {\n4\n5       if (turn == 1) {\n6           pturn = false;\n7           while (turn == 1);\n8           pturn = true;\n9       }\n10  }\n11  访问临界区\n12  ________\n13  pturn = false;\n14  ...'
      }
    ],
    points: 2,
    explanation: 'P0 退出临界区时把 turn 交给 P1，再撤销自己的进入意向。'
  }
]

const subjectiveQuestions: SubjectiveQuestion[] = [
  {
    id: 'subj-01-page-table-size',
    title: '? 1 ??????',
    points: 8,
    prompt: '??? 32 ?????????????? 4KB?????1?????????1 ???? 4 ????????????2?????????? 1 ????1 ???? 4 ?????????????',
    answer: [
      '32 ??????4KB ???????? 2^32 / 2^12 = 2^20?',
      '1 ????????????????? 2^20???? 1M ?????',
      '????? 4 ?????????????????? 5 ???????????????? 2^5 + 2^10 + 2^15 + 2^20?? 2M ?????',
      '????????? 1 ????1 ??????????????? 2^20 ?????',
      '4 ???????????????????4 ???????? 1 ??????? 32 ???????? 4 x 32 = 128 ?????',
      '?????????????????1 ?? 1M?4 ????? 2M???? 1 ?? 4 ?? 128 ??'
    ],
    rubric: [
      '??????? 2^20?',
      '??? 1 ??????? 1M ?????',
      '??? 4 ?????????????? 2^5 + 2^10 + 2^15 + 2^20?',
      '???????????????????????? 128 ?????'
    ]
  },
  {
    id: 'subj-02-segment-page-translation',
    title: '四-2 段页式地址转换',
    points: 7,
    prompt: '20 位虚拟地址格式为：虚拟段号 4 位、虚拟页号 8 位、页内偏移 8 位。物理地址为：物理页号 8 位、页内偏移 8 位。根据原卷给出的段表、页表项格式和物理内存内容，写出各条 Load/Store 指令的结果。',
    details: [
      '指令：Load [0x30111]；Store [0x30116]；Load [0x42020]；Load [0x00112]；Store [0x00210]；Load [0x21211]；Load [0x11135]',
      '段表：0 -> base 0x2000, max 0x20, Valid；1 -> base 0x1000, max 0x10, Valid；2 -> base 0x3100, max 0x40, Invalid；3 -> base 0x4000, max 0x20, Valid。',
      'PTE 标志：0x00 Invalid；0x06 Valid Read Only；0x07 Valid Read/Write。'
    ],
    answer: [
      'Load [0x30111] = 0x13。段 3 有效，VPN=0x01，PTE 为 frame 0x31 / RO，物理地址 0x3111，读到 0x13。',
      'Store [0x30116] = Error。段 3、VPN=0x01 只读，不能写。',
      'Load [0x42020] = Error。段号 4 超出最大段号 3。',
      'Load [0x00112] = Error。段 0、VPN=0x01 的 PTE 标志为 Invalid。',
      'Store [0x00210] = OK。段 0、VPN=0x02 映射到 frame 0x10 且可读写。',
      'Load [0x21211] = Error。段 2 的段表项 Invalid。',
      'Load [0x11135] = Error。段 1 有效页面数为 0x10，VPN=0x11 越界。'
    ],
    rubric: [
      '先拆出段号、页号、偏移。',
      '检查段有效性和段内页号范围。',
      '检查 PTE 有效位和读写权限。',
      'Load 成功时用物理页号拼接偏移读取字节。'
    ],
    supplements: [
      {
        type: 'table',
        caption: '虚拟地址格式',
        headers: ['字段', '位数'],
        rows: [
          ['虚拟段号', '4'],
          ['虚拟页号', '8'],
          ['页内偏移', '8']
        ]
      },
      {
        type: 'table',
        caption: '物理地址格式',
        headers: ['字段', '位数'],
        rows: [
          ['物理页号', '8'],
          ['页内偏移', '8']
        ]
      },
      {
        type: 'table',
        caption: '指令结果填写表',
        headers: ['指令', '结果'],
        rows: [
          ['Load [0x30111]', ''],
          ['Store [0x30116]', ''],
          ['Load [0x42020]', ''],
          ['Load [0x00112]', ''],
          ['Store [0x00210]', ''],
          ['Load [0x21211]', ''],
          ['Load [0x11135]', '']
        ]
      },
      {
        type: 'table',
        caption: '段表',
        headers: ['段号', '页表基地址', '段内最大页面数', '有效状态'],
        rows: [
          ['0', '0x2000', '0x20', 'Valid'],
          ['1', '0x1000', '0x10', 'Valid'],
          ['2', '0x3100', '0x40', 'Invalid'],
          ['3', '0x4000', '0x20', 'Valid']
        ]
      },
      {
        type: 'table',
        caption: '页表项（PTE）格式',
        headers: ['第 1 字节', '第 2 字节'],
        rows: [
          ['物理页框号', '标志位'],
          ['', '0x00 = Invalid'],
          ['', '0x06 = Valid, Read Only'],
          ['', '0x07 = Valid, Read/Write']
        ]
      },
      {
        type: 'table',
        caption: '物理内存（节选）',
        headers: ['Address', '+0', '+1', '+2', '+3', '+4', '+5', '+6', '+7', '+8', '+9', '+A', '+B', '+C', '+D', '+E', '+F'],
        rows: [
          ['0x0000', '0E', '0F', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1A', '1B', '1C', '1D'],
          ['0x0010', '1E', '1F', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '2A', '2B', '2C', '2D'],
          ['0x1010', '40', '41', '20', '07', '44', '45', '46', '47', '48', '49', '4A', '4B', '4C', '4D', '4E', '4F'],
          ['0x1020', '40', '07', '41', '06', '30', '06', '31', '07', '00', '07', '00', '00', '00', '00', '00', '00'],
          ['0x1030', '51', '07', '4F', '07', '3F', '07', '31', '07', '01', '07', '00', '00', '00', '00', '00', '00'],
          ['0x1040', '40', '07', '41', '07', '31', '07', '31', '07', '02', '07', '00', '00', '00', '00', '00', '00'],
          ['0x2000', '02', '20', '10', '00', '10', '07', '05', '50', '06', '60', '07', '70', '08', '80', '09', '90'],
          ['0x2010', '0A', 'A0', '0B', 'B0', '0C', 'C0', '0D', 'D0', '0E', 'E0', '0F', 'F0', '10', '01', '11', '11'],
          ['0x2020', '12', '21', '13', '31', '14', '41', '15', '51', '16', '61', '17', '71', '18', '81', '19', '91'],
          ['0x2030', '10', '06', '11', '00', '12', '07', '40', '07', '41', '07', '00', '00', '00', '00', '00', '00'],
          ['0x30F0', '00', '11', '22', '33', '44', '55', '66', '77', '88', '99', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF'],
          ['0x3100', '01', '12', '23', '34', '45', '56', '67', '78', '89', '9A', 'AB', 'BC', 'CD', 'DE', 'EF', '00'],
          ['0x3110', '02', '13', '24', '35', '20', '07', '68', '79', '8A', '9B', 'AC', 'BD', 'CE', 'DF', 'F0', '01'],
          ['0x3120', '03', '06', '25', '36', '47', '58', '69', '7A', '8B', '9C', 'AD', 'BE', 'CF', 'E0', 'F1', '02'],
          ['0x3130', '04', '15', '26', '37', '48', '59', '70', '7B', '8C', '9D', 'AE', 'BF', 'D0', 'E1', 'F2', '03'],
          ['0x4000', '30', '00', '31', '06', '20', '07', '33', '07', '34', '06', '35', '00', '43', '38', '32', '79'],
          ['0x4010', '50', '28', '84', '19', '71', '69', '39', '93', '75', '10', '58', '20', '97', '49', '44', '59'],
          ['0x4020', '23', '07', '20', '07', '00', '06', '62', '08', '99', '86', '28', '03', '48', '25', '34', '21']
        ]
      }
    ]
  },
  {
    id: 'subj-03-self-map',
    title: '? 3 ?????',
    points: 5,
    prompt: '?? 32 ????????????? 31..22 ?????????21..12 ?????????11..0 ???????? 0x2C000000 ???? 4MB ??????????????????????????????????????',
    answer: [
      '?????? PT_base = 0x2C000000 = r << 22??? r = 0xB0?',
      '?? 4MB = 2^22???????????????????? r?????????',
      '??????????????? PD_base = (r << 22) | (r << 12) = 0x2C0B0000?',
      '???????????? 10 ????????????????????????????????',
      '????????????? PDE_self = PD_base + r * 4 = 0x2C0B0000 + 0x2C0 = 0x2C0B02C0?',
      '???? 4 ??? 32 ?????? PDE ? 4 ???'
    ],
    rubric: [
      '????????? r = 0xB0?',
      '???? PD_base?',
      '???? 32 ???? 4 ???',
      '?????????? r??????? = ??? + ?? x ???????????'
    ]
  },
  {
    id: 'subj-04-process-thread',
    title: '? 4-1 ?????',
    points: 5,
    prompt: '??????????????',
    answer: [
      '?????????????????????????????????',
      '??? CPU ???????????????? PC??????????',
      '?????????????????????????????????????',
      '????????????????????????????????????????????',
      '???????????????????????????????????????????????'
    ],
    rubric: [
      '??????????????',
      '??????????????',
      '???????????',
      '???????????'
    ]
  },
  {
    id: 'subj-05-process-switch',
    title: '? 4-2 ??????',
    points: 5,
    prompt: '??????????',
    answer: [
      '???????????????????????',
      '???????????? PC?????????????? PCB ?????',
      '???????????????????',
      '??????????????',
      '???????????????????????????? MMU ?????',
      '???????? PC???????????????????????????',
      '????????????????????????????????????????????'
    ],
    rubric: [
      '??????',
      '??????',
      '??????',
      '?????/??????????',
      '?????????????????????'
    ]
  },
  {
    id: 'subj-06-pv-reader-writer',
    title: '七 进程互斥与同步',
    points: 10,
    prompt: '公园每天最多允许 N 人购票入园。查询者 Q 读余票数量，购票者 B 写余票数量，每次只能买一张票。要求：Q 和 B 按到达顺序访问；多个 Q 连续到达时允许并发读；余票为 0 时不允许 B 执行写操作。基于 PV 操作设计算法。',
    answer: [
      '可使用公平读写者方案。设 semaphore order = 1, rw = 1, mutex = 1; int readcnt = 0; int tickets = N。',
      'Q：P(order); P(mutex); readcnt++; if (readcnt == 1) P(rw); V(mutex); V(order); 读 tickets; P(mutex); readcnt--; if (readcnt == 0) V(rw); V(mutex)。',
      'B：P(order); P(rw); V(order); if (tickets > 0) tickets--; else 不写; V(rw)。',
      'order 保证按到达顺序进入等待队列；连续到达的 Q 在已有读者持有 rw 时可继续并发读；B 独占 rw，且 tickets == 0 时不修改余票。'
    ],
    rubric: [
      '有到达顺序控制。',
      '允许连续读者并发。',
      '写者互斥。',
      '购票前检查余票。',
      'PV 操作配对正确，无明显死锁。'
    ]
  }
]

const trueFalseAnswers = ref<Record<string, boolean | undefined>>({})
const choiceAnswers = ref<Record<string, string>>({})
const blankAnswers = ref<Record<string, string>>({})
const subjectiveAnswers = ref<Record<string, string>>({})
const subjectiveJudgements = ref<Record<string, boolean | undefined>>({})
const submitted = ref(false)

const objectiveQuestions = computed<ObjectiveQuestion[]>(() => [
  ...trueFalseQuestions,
  ...singleChoiceQuestions,
  ...blankQuestions
])

const objectiveMaxScore = computed(() => objectiveQuestions.value.reduce((sum, question) => sum + question.points, 0))
const subjectiveMaxScore = computed(() => subjectiveQuestions.reduce((sum, question) => sum + question.points, 0))
const totalScore = computed(() => objectiveMaxScore.value + subjectiveMaxScore.value)

const objectiveAnsweredCount = computed(() => {
  const trueFalseCount = trueFalseQuestions.filter((question) => typeof trueFalseAnswers.value[question.id] === 'boolean').length
  const choiceCount = singleChoiceQuestions.filter((question) => Boolean(choiceAnswers.value[question.id])).length
  const blankCount = blankQuestions.filter((question) => Boolean(blankAnswers.value[question.id]?.trim())).length
  return trueFalseCount + choiceCount + blankCount
})

const subjectiveAnsweredCount = computed(() => (
  subjectiveQuestions.filter((question) => Boolean(subjectiveAnswers.value[question.id]?.trim())).length
))

const answeredCount = computed(() => objectiveAnsweredCount.value + subjectiveAnsweredCount.value)
const questionCount = computed(() => objectiveQuestions.value.length + subjectiveQuestions.length)
const unansweredCount = computed(() => questionCount.value - answeredCount.value)
const allAnswered = computed(() => unansweredCount.value === 0)
const subjectiveJudgedCount = computed(() => (
  subjectiveQuestions.filter((question) => typeof subjectiveJudgements.value[question.id] === 'boolean').length
))

const objectiveScore = computed(() => {
  if (!submitted.value) return 0
  return objectiveQuestions.value.reduce((sum, question) => (
    isObjectiveCorrect(question) ? sum + question.points : sum
  ), 0)
})

function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[，。；;：:、,.]/g, '')
    .replace(/[（）()]/g, '')
    .replace(/\s+/g, '')
}

function boolLabel(value: boolean | undefined) {
  if (typeof value !== 'boolean') return '未作答'
  return value ? '√' : '×'
}

function isBlankCorrect(question: BlankQuestion) {
  const selected = normalizeAnswer(blankAnswers.value[question.id] || '')
  return question.answers.some((answer) => normalizeAnswer(answer) === selected)
}

function isObjectiveCorrect(question: ObjectiveQuestion) {
  if (question.type === 'true-false') {
    return trueFalseAnswers.value[question.id] === question.answer
  }

  if (question.type === 'single') {
    return choiceAnswers.value[question.id] === question.answer
  }

  return isBlankCorrect(question)
}

function selectedText(question: ObjectiveQuestion) {
  if (question.type === 'true-false') return boolLabel(trueFalseAnswers.value[question.id])
  if (question.type === 'single') return choiceAnswers.value[question.id] || '未作答'
  return blankAnswers.value[question.id] || '未作答'
}

function answerText(question: ObjectiveQuestion) {
  if (question.type === 'true-false') return boolLabel(question.answer)
  if (question.type === 'single') return question.answer
  return question.answerText
}

function objectiveOptions(question: ObjectiveQuestion) {
  if (question.type === 'true-false') {
    return [
      { label: boolLabel(true), text: '正确' },
      { label: boolLabel(false), text: '错误' }
    ]
  }

  if (question.type === 'single') return question.options
  return []
}

function subjectiveQuestionText(question: SubjectiveQuestion) {
  return [question.prompt, ...(question.details || [])].join('\n')
}

function recordObjective(question: ObjectiveQuestion) {
  recordQuestion({
    id: `exam:2025-midterm:${question.id}`,
    type: question.type === 'true-false' ? 'true-false' : question.type,
    collection: '2025-midterm',
    title: `2025 期中 - ${question.title}`,
    question: question.question,
    options: objectiveOptions(question),
    explanation: question.explanation,
    selected: selectedText(question),
    answer: answerText(question),
    correct: isObjectiveCorrect(question),
    at: Date.now()
  })
}

function submitPaper() {
  if (!allAnswered.value) return

  submitted.value = true
  objectiveQuestions.value.forEach(recordObjective)
}

function judgeSubjective(question: SubjectiveQuestion, correct: boolean) {
  subjectiveJudgements.value[question.id] = correct

  recordQuestion({
    id: `exam:2025-midterm:${question.id}`,
    type: 'subjective',
    collection: '2025-midterm',
    title: `2025 期中 - ${question.title}`,
    question: subjectiveQuestionText(question),
    explanation: question.rubric?.join('；'),
    selected: subjectiveAnswers.value[question.id],
    answer: question.answer.join('；'),
    correct,
    at: Date.now()
  })
}

function resetPaper() {
  trueFalseAnswers.value = {}
  choiceAnswers.value = {}
  blankAnswers.value = {}
  subjectiveAnswers.value = {}
  subjectiveJudgements.value = {}
  submitted.value = false
}
</script>

<template>
  <section class="exam-paper">
    <header class="exam-paper__hero">
      <div>
        <p class="exam-paper__eyebrow">Interactive Exam</p>
        <h2>2025 期中考试</h2>
        <p>客观题提交整卷后自动判分；主观题提交后显示参考答案，由你自行判定是否进入错题记录。</p>
      </div>
      <div class="exam-paper__score">
        <strong>{{ submitted ? objectiveScore : '-' }}</strong>
        <span>/ {{ objectiveMaxScore }} 客观题分</span>
      </div>
    </header>

    <div class="exam-paper__meta">
      <span>{{ answeredCount }} / {{ questionCount }} 已作答</span>
      <span>客观题 {{ objectiveMaxScore }} 分</span>
      <span>主观题 {{ subjectiveMaxScore }} 分</span>
      <span>总分 {{ totalScore }} 分</span>
    </div>

    <section class="exam-section">
      <h3>一、判断题</h3>
      <article v-for="(question, index) in trueFalseQuestions" :key="question.id" class="exam-question">
        <div class="exam-question__stem">
          <strong>{{ index + 1 }}.</strong>
          <span>{{ question.question }}</span>
        </div>
        <div class="exam-question__actions">
          <button
            type="button"
            :disabled="submitted"
            :class="{ 'is-selected': trueFalseAnswers[question.id] === true }"
            @click="trueFalseAnswers[question.id] = true"
          >
            √
          </button>
          <button
            type="button"
            :disabled="submitted"
            :class="{ 'is-selected': trueFalseAnswers[question.id] === false }"
            @click="trueFalseAnswers[question.id] = false"
          >
            ×
          </button>
        </div>
        <div
          v-if="submitted"
          class="exam-result"
          :class="{ 'is-correct': isObjectiveCorrect(question) }"
        >
          <strong>{{ isObjectiveCorrect(question) ? '正确' : `错误，答案：${answerText(question)}` }}</strong>
          <p>{{ question.explanation }}</p>
        </div>
      </article>
    </section>

    <section class="exam-section">
      <h3>二、单项选择题</h3>
      <article v-for="(question, index) in singleChoiceQuestions" :key="question.id" class="exam-question">
        <div class="exam-question__stem">
          <strong>{{ index + 1 }}.</strong>
          <span>{{ question.question }}</span>
        </div>
        <div class="exam-options">
          <button
            v-for="option in question.options"
            :key="option.label"
            type="button"
            :disabled="submitted"
            :class="{
              'is-selected': choiceAnswers[question.id] === option.label,
              'is-answer': submitted && question.answer === option.label,
              'is-wrong': submitted && choiceAnswers[question.id] === option.label && !isObjectiveCorrect(question)
            }"
            @click="choiceAnswers[question.id] = option.label"
          >
            <strong>{{ option.label }}</strong>
            <span>{{ option.text }}</span>
          </button>
        </div>
        <div
          v-if="submitted"
          class="exam-result"
          :class="{ 'is-correct': isObjectiveCorrect(question) }"
        >
          <strong>{{ isObjectiveCorrect(question) ? '正确' : `错误，答案：${answerText(question)}` }}</strong>
          <p>{{ question.explanation }}</p>
        </div>
      </article>
    </section>

    <section class="exam-section">
      <h3>三、填空题</h3>
      <article v-for="(question, index) in blankQuestions" :key="question.id" class="exam-question">
        <label class="exam-blank">
          <span>{{ index + 1 }}. {{ question.question }}</span>
          <ExamSupplements :blocks="question.supplements" />
          <input
            v-model="blankAnswers[question.id]"
            :disabled="submitted"
            type="text"
            placeholder="输入答案"
          >
        </label>
        <div
          v-if="submitted"
          class="exam-result"
          :class="{ 'is-correct': isObjectiveCorrect(question) }"
        >
          <strong>{{ isObjectiveCorrect(question) ? '正确' : `标准答案：${answerText(question)}` }}</strong>
          <p>{{ question.explanation }}</p>
        </div>
      </article>
    </section>

    <section class="exam-section">
      <h3>四至七、主观题</h3>
      <article v-for="question in subjectiveQuestions" :key="question.id" class="exam-question exam-question--subjective">
        <header class="exam-subjective__header">
          <div>
            <strong>{{ question.title }}</strong>
            <span>{{ question.points }} 分</span>
          </div>
        </header>
        <p class="exam-subjective__prompt">{{ question.prompt }}</p>
        <pre v-for="detail in question.details" :key="detail" class="exam-subjective__detail">{{ detail }}</pre>
        <ExamSupplements :blocks="question.supplements" />
        <textarea
          v-model="subjectiveAnswers[question.id]"
          :disabled="submitted"
          rows="6"
          placeholder="写下你的作答要点"
        />

        <div v-if="submitted" class="exam-reference">
          <h4>参考答案</h4>
          <ul>
            <li v-for="item in question.answer" :key="item">{{ item }}</li>
          </ul>
          <h4 v-if="question.rubric?.length">评分要点</h4>
          <ul v-if="question.rubric?.length">
            <li v-for="item in question.rubric" :key="item">{{ item }}</li>
          </ul>
          <div class="exam-judge">
            <span>自主判题：</span>
            <button
              type="button"
              :class="{ 'is-selected': subjectiveJudgements[question.id] === true }"
              @click="judgeSubjective(question, true)"
            >
              判为正确
            </button>
            <button
              type="button"
              :class="{ 'is-selected is-wrong': subjectiveJudgements[question.id] === false }"
              @click="judgeSubjective(question, false)"
            >
              加入错题
            </button>
          </div>
        </div>
      </article>
    </section>

    <footer class="exam-paper__footer">
      <button type="button" :disabled="!allAnswered" @click="submitPaper">
        {{ submitted ? '重新统计客观题' : '提交整卷' }}
      </button>
      <button v-if="submitted" type="button" class="is-secondary" @click="resetPaper">
        重新作答
      </button>
      <p v-if="!allAnswered">还有 {{ unansweredCount }} 题未作答，提交后才会显示答案。</p>
      <p v-else-if="submitted">
        主观题已判 {{ subjectiveJudgedCount }} / {{ subjectiveQuestions.length }}，判为错误的题会进入错题记录。
      </p>
    </footer>
  </section>
</template>

<style scoped>
.exam-paper {
  margin: 24px 0;
}

.exam-paper__hero {
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--os-radius);
  padding: 18px;
  background: var(--vp-c-bg);
  box-shadow: var(--os-shadow-soft);
}

.exam-paper__eyebrow {
  margin: 0 0 6px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.exam-paper__hero h2,
.exam-section h3 {
  margin: 0;
  border: 0;
  padding: 0;
}

.exam-paper__hero p:last-child {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
}

.exam-paper__score {
  display: grid;
  min-width: 136px;
  justify-items: end;
}

.exam-paper__score strong {
  color: var(--vp-c-brand-1);
  font-size: 36px;
  line-height: 1;
}

.exam-paper__score span {
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 700;
}

.exam-paper__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 14px 0 20px;
}

.exam-paper__meta span {
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 5px 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 800;
}

.exam-section {
  margin-top: 28px;
}

.exam-question {
  margin-top: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--os-radius);
  padding: 14px;
  background: var(--vp-c-bg);
}

.exam-question__stem {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 8px;
  color: var(--vp-c-text-1);
  font-weight: 650;
}

.exam-question__actions,
.exam-judge,
.exam-paper__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.exam-question__actions {
  margin-top: 12px;
}

.exam-question button,
.exam-paper__footer button {
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--os-radius);
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 800;
  cursor: pointer;
}

.exam-question button:disabled,
.exam-paper__footer button:disabled {
  cursor: not-allowed;
  opacity: 0.52;
}

.exam-question button.is-selected,
.exam-paper__footer button {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: white;
}

.exam-paper__footer button.is-secondary {
  border-color: var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.exam-options {
  display: grid;
  gap: 10px;
  margin-top: 12px;
}

.exam-options button {
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 10px;
  align-items: center;
  width: 100%;
  text-align: left;
}

.exam-options button.is-answer {
  border-color: var(--os-c-green);
  background: color-mix(in srgb, var(--os-c-green) 10%, transparent);
  color: var(--vp-c-text-1);
}

.exam-options button.is-wrong,
.exam-judge button.is-wrong {
  border-color: var(--os-c-red);
  background: var(--os-c-red);
  color: white;
}

.exam-blank {
  display: grid;
  gap: 10px;
  font-weight: 650;
}

.exam-blank input,
.exam-question textarea {
  width: 100%;
  min-width: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--os-radius);
  padding: 10px 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font: inherit;
}

.exam-result,
.exam-reference {
  margin-top: 12px;
  border-left: 4px solid var(--os-c-red);
  border-radius: var(--os-radius);
  padding: 12px;
  background: color-mix(in srgb, var(--os-c-red) 9%, transparent);
}

.exam-result.is-correct {
  border-left-color: var(--os-c-green);
  background: color-mix(in srgb, var(--os-c-green) 9%, transparent);
}

.exam-result p,
.exam-subjective__prompt {
  margin: 6px 0 0;
}

.exam-question--subjective {
  display: grid;
  gap: 12px;
}

.exam-subjective__header div {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.exam-subjective__header span {
  color: var(--vp-c-brand-1);
  font-weight: 800;
}

.exam-subjective__detail {
  overflow-x: auto;
  margin: 0;
  border-radius: var(--os-radius);
  padding: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
}

.exam-reference {
  border-left-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 7%, transparent);
}

.exam-reference h4 {
  margin: 6px 0;
}

.exam-reference ul {
  margin: 0 0 10px;
}

.exam-paper__footer {
  position: sticky;
  bottom: 12px;
  z-index: 1;
  margin-top: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--os-radius);
  padding: 12px;
  background: color-mix(in srgb, var(--vp-c-bg) 92%, transparent);
  backdrop-filter: blur(10px);
  box-shadow: var(--os-shadow-soft);
}

.exam-paper__footer p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

@media (max-width: 720px) {
  .exam-paper__hero {
    align-items: flex-start;
    flex-direction: column;
  }

  .exam-paper__score {
    justify-items: start;
  }
}
</style>
