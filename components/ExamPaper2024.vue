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
  answerCode?: string
  rubric?: string[]
  supplements?: SupplementBlock[]
}

const petersonSnippet = `#define FALSE 0
#define TRUE 1
#define N 2
int turn;
int interested[N];

void enter_region(int process)
{
    int other;
    other = 1 - process;
    interested[process] = TRUE;
    turn = process;
    ________
}

void leave_region(int process)
{
    ________
}`

const segmentSupplements: SupplementBlock[] = [
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
    caption: '段表',
    headers: ['段号', '页表基地址', '段内最大页面数量', '有效状态'],
    rows: [
      ['0', '0x2000', '0x20', 'Valid'],
      ['1', '0x1200', '0x10', 'Valid'],
      ['2', '0x3100', '0x40', 'Invalid'],
      ['3', '0x4000', '0x20', 'Valid']
    ]
  },
  {
    type: 'table',
    caption: 'PTE 格式',
    headers: ['第 1 字节', '第 2 字节'],
    rows: [
      ['物理页框号', '0x00 = Invalid'],
      ['物理页框号', '0x06 = Valid, Read Only'],
      ['物理页框号', '0x07 = Valid, Read/Write']
    ]
  },
  {
    type: 'table',
    caption: '物理内存摘录',
    headers: ['Address', '+0', '+1', '+2', '+3', '+4', '+5', '+6', '+7', '+8', '+9', '+A', '+B', '+C', '+D', '+E', '+F'],
    rows: [
      ['0x0000', '0E', '0F', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1A', '1B', '1C', '1D'],
      ['0x0010', '1E', '1F', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '2A', '2B', '2C', '2D'],
      ['0x1010', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '4A', '4B', '4C', '4D', '4E', '4F'],
      ['0x1020', '40', '07', '41', '06', '30', '06', '31', '07', '00', '07', '00', '00', '00', '00', '00', '00'],
      ['0x1030', '51', '07', '4F', '07', '3F', '07', '31', '07', '01', '07', '00', '00', '00', '00', '00', '00'],
      ['0x1040', '40', '07', '41', '07', '31', '07', '31', '07', '02', '07', '00', '00', '00', '00', '00', '00'],
      ['0x2000', '02', '20', '10', '00', '12', '07', '05', '50', '06', '60', '07', '70', '08', '80', '09', '90'],
      ['0x2010', '0A', 'A0', '0B', 'B0', '0C', 'C0', '0D', 'D0', '0E', 'E0', '0F', 'F0', '10', '01', '11', '11'],
      ['0x2020', '12', '21', '13', '31', '14', '41', '15', '51', '16', '61', '17', '71', '18', '81', '19', '91'],
      ['0x2030', '10', '06', '11', '00', '12', '07', '40', '07', '41', '07', '00', '00', '00', '00', '00', '00'],
      ['0x30F0', '00', '11', '22', '33', '44', '55', '66', '77', '88', '99', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF'],
      ['0x3100', '01', '12', '23', '34', '45', '56', '67', '78', '89', '9A', 'AB', 'BC', 'CD', 'DE', 'EF', '00'],
      ['0x3110', '02', '13', '24', '35', '20', '07', '68', '79', '8A', '9B', 'AC', 'BD', 'CE', 'DF', 'F0', '01'],
      ['0x3120', '03', '06', '25', '36', '47', '58', '69', '7A', '8B', '9C', 'AD', 'BE', 'CF', 'E0', 'F1', '02'],
      ['0x3130', '04', '15', '26', '37', '48', '59', '70', '7B', '8C', '9D', 'AE', 'BF', 'D0', 'E1', 'F2', '03'],
      ['0x4000', '30', '00', '31', '06', '32', '07', '33', '07', '34', '06', '35', '00', '43', '38', '32', '79'],
      ['0x4010', '50', '28', '84', '19', '71', '69', '39', '93', '75', '10', '58', '20', '97', '49', '44', '59'],
      ['0x4020', '23', '07', '20', '07', '00', '06', '62', '08', '99', '86', '28', '03', '48', '25', '34', '21']
    ]
  }
]

const trueFalseQuestions: TrueFalseQuestion[] = [
  {
    id: 'tf-01-stack-pointer',
    type: 'true-false',
    title: '线程共享地址空间',
    question: '同一进程中的不同线程间可以通过传递指向其栈上对象的指针来相互共享数据。',
    answer: true,
    points: 2,
    explanation: '同一进程内线程共享虚拟地址空间，因此一个线程栈上的对象地址可以被同进程其他线程访问；实际使用时仍要保证对象生命周期和同步安全。'
  },
  {
    id: 'tf-02-user-thread-pte',
    type: 'true-false',
    title: '页表保护',
    question: '用户级线程不能修改自己的页表项。',
    answer: true,
    points: 2,
    explanation: '页表项属于受保护的内核管理数据，普通用户态执行流不能直接修改。'
  },
  {
    id: 'tf-03-fork-address',
    type: 'true-false',
    title: 'fork 地址空间',
    question: '当进程被 fork 创建后，父进程和子进程中的同一变量将具有相同的虚拟内存地址，但物理内存地址是不相同的。',
    answer: false,
    points: 2,
    explanation: '按现代写时复制 fork 语境，父子进程初始可能共享同一物理页，写入时才复制，因此“物理地址一定不同”不成立。若只采用立即复制的简化模型，这一题可能会被判为正确。'
  },
  {
    id: 'tf-04-thrashing',
    type: 'true-false',
    title: '虚拟内存抖动',
    question: '消除虚拟内存抖动的最佳方法是增加 I/O 和 CPU 计算之间的并行程度，也就是让 CPU 与 I/O 都“忙”起来，所以增加可运行线程数量可以达到这一目的。',
    answer: false,
    points: 2,
    explanation: '抖动的根因是工作集得不到足够内存。继续增加可运行线程通常会降低每个进程的常驻集，可能让抖动更严重。'
  },
  {
    id: 'tf-05-pc-os',
    type: 'true-false',
    title: 'PC 操作系统',
    question: '大多数 PC 机上的操作系统支持多任务，但不支持多用户。',
    answer: true,
    points: 2,
    explanation: '按操作系统教材的常见分类，PC 操作系统通常强调单用户多任务；现代系统可能有多账户和远程会话能力，考试语境一般按教材分类作答。'
  },
  {
    id: 'tf-06-boot-sector',
    type: 'true-false',
    title: 'MBR 与引导扇区',
    question: '磁盘驱动器上只有一个 MBR（主引导记录），但可能有多个引导扇区。',
    answer: true,
    points: 2,
    explanation: 'MBR 位于磁盘起始位置；不同分区可以有自己的卷引导扇区。'
  },
  {
    id: 'tf-07-process-program',
    type: 'true-false',
    title: '进程与程序',
    question: '多个进程可以同时对应到同一个程序/可执行文件。',
    answer: true,
    points: 2,
    explanation: '程序是静态文件，进程是运行实例；同一可执行文件可以启动多个进程。'
  },
  {
    id: 'tf-08-context-switch',
    type: 'true-false',
    title: '上下文切换',
    question: '从一个进程到另一个进程的上下文切换无需在内核模式下执行操作系统代码即可完成。',
    answer: false,
    points: 2,
    explanation: '进程上下文切换涉及保存/恢复内核管理的执行现场和地址空间状态，必须由内核代码完成。'
  },
  {
    id: 'tf-09-dynamic-relocation',
    type: 'true-false',
    title: '动态重定位',
    question: '动态重定位是指硬件在每次内存访问时动态实现地址的转换。',
    answer: true,
    points: 2,
    explanation: '动态重定位把地址转换推迟到运行时，由硬件在访问内存时完成。'
  },
  {
    id: 'tf-10-thread-stack',
    type: 'true-false',
    title: '线程私有栈',
    question: '进程中的线程必须有自己独立的栈。',
    answer: true,
    points: 2,
    explanation: '每个线程需要独立的调用栈保存函数调用、返回地址和局部自动变量。'
  }
]

const singleChoiceQuestions: SingleChoiceQuestion[] = [
  {
    id: 'choice-01-batch',
    type: 'single',
    title: '批处理系统',
    question: '批处理系统的主要缺点是：',
    options: [
      { label: 'A', text: 'CPU 的利用率不高' },
      { label: 'B', text: '失去了交互性' },
      { label: 'C', text: '不具备并行性' },
      { label: 'D', text: '以上都不是' }
    ],
    answer: 'B',
    points: 2,
    explanation: '批处理系统把作业成批提交和执行，主要问题是用户无法在运行过程中交互控制。'
  },
  {
    id: 'choice-02-memory',
    type: 'single',
    title: '地址空间与分段分页',
    question: '以下说法正确的是：',
    options: [
      { label: 'A', text: '两个不同进程对应的页表中可能包含内容相同的页表项' },
      { label: 'B', text: '虚拟地址空间总是大于物理地址空间' },
      { label: 'C', text: '在页式内存管理下，页面尺寸越小越有利于消除外碎片，提高内存使用效率' },
      { label: 'D', text: '段式内存管理的不同分段大小可不同，从而可消除外碎片，提高内存使用率' }
    ],
    answer: 'A',
    points: 2,
    explanation: '不同进程可以共享同一物理页或碰巧有相同页表项内容。分页本身没有外碎片，分段反而可能产生外碎片。'
  },
  {
    id: 'choice-03-multilevel',
    type: 'single',
    title: '多级页表',
    question: '关于多级页表，下列说法不正确的是：',
    options: [
      { label: 'A', text: '能够减少页表占用内存的大小' },
      { label: 'B', text: '级数越多，平均访问内存的时间越长' },
      { label: 'C', text: '有效的页表项中都会存储页框号' },
      { label: 'D', text: '使用二级页表的平均访存性能优于一级页表' }
    ],
    answer: 'D',
    points: 2,
    explanation: '多级页表节省空间，但 TLB 未命中时要多级访存，不能说二级页表平均访存性能优于一级页表。'
  },
  {
    id: 'choice-04-kernel',
    type: 'single',
    title: '陷入内核',
    question: '以下说法正确的是：',
    options: [
      { label: 'A', text: '进程上下文切换过程一定会陷入内核' },
      { label: 'B', text: '陷入内核一定会导致进程切换' },
      { label: 'C', text: '正在执行的程序不可以主动放弃 CPU' },
      { label: 'D', text: '系统调用一定会导致进程上下文切换' }
    ],
    answer: 'A',
    points: 2,
    explanation: '进程切换必须由内核完成；但系统调用、异常或中断进入内核后不一定切换进程。'
  },
  {
    id: 'choice-05-protection',
    type: 'single',
    title: '多进程保护',
    question: '在一个多进程操作系统中，以下说法正确的是：',
    options: [
      { label: 'A', text: '如果一个用户进程进入死循环，则其他进程永远不可能获得执行' },
      { label: 'B', text: '如果一个用户进程进入死循环，操作系统可以终止该用户进程执行' },
      { label: 'C', text: '如果一个用户进程执行了“跳转到 0 地址”的指令，操作系统内核会立即崩溃' },
      { label: 'D', text: '如果一个用户进程执行了“除以 0”的指令后，操作系统内核会立即崩溃' }
    ],
    answer: 'B',
    points: 2,
    explanation: '时钟中断和保护机制允许内核重新获得控制并终止异常用户进程；用户态错误不应直接导致内核崩溃。'
  },
  {
    id: 'choice-06-pv',
    type: 'single',
    title: 'PV 操作',
    question: '关于 PV 操作错误的是：',
    options: [
      { label: 'A', text: '信号量如果使用不当，可能导致死锁' },
      { label: 'B', text: '进程执行 P 操作阻塞时，不会占用 CPU 资源' },
      { label: 'C', text: '进程 A、B 调用 P(S) 各一次后，信号量 S 的值与调用顺序有关' },
      { label: 'D', text: '信号量操作是原子操作' }
    ],
    answer: 'C',
    points: 2,
    explanation: '两次 P 操作对 S 的净影响相同；阻塞队列顺序可能不同，但信号量值不取决于调用顺序。'
  },
  {
    id: 'choice-07-inverted',
    type: 'single',
    title: '反置页表',
    question: '下列哪项属于反置页表的优点：',
    options: [
      { label: 'A', text: '查找页表项的速度快' },
      { label: 'B', text: '缺页处理速度快' },
      { label: 'C', text: '便于进程之间共享数据' },
      { label: 'D', text: '页表与逻辑地址空间大小无关' }
    ],
    answer: 'D',
    points: 2,
    explanation: '反置页表按物理页框组织，表规模主要与物理内存页框数相关，而不是随每个进程的虚拟地址空间线性增长。'
  },
  {
    id: 'choice-08-replacement',
    type: 'single',
    title: '页面置换算法',
    question: '关于页面置换算法，以下说法不正确的是：',
    options: [
      { label: 'A', text: '二次机会算法是对 FIFO 的改进' },
      { label: 'B', text: 'Aging 算法是对 LRU 算法的高效近似实现' },
      { label: 'C', text: 'WSClock 算法仅需要在页表中扫描' },
      { label: 'D', text: '工作集算法的思路是驱逐不在工作集中的页面' }
    ],
    answer: 'C',
    points: 2,
    explanation: 'WSClock 需要维护时钟链表并结合访问位、修改位和时间信息，不是仅扫描页表。'
  },
  {
    id: 'choice-09-dynamic-partition',
    type: 'single',
    title: '动态分区',
    question: '可变分区又称为动态分区，它是在系统运行过程中什么时动态建立的？',
    options: [
      { label: 'A', text: '作业未装入' },
      { label: 'B', text: '在作业装入' },
      { label: 'C', text: '在作业创建' },
      { label: 'D', text: '在作业完成' }
    ],
    answer: 'B',
    points: 2,
    explanation: '动态分区在作业装入内存时按作业大小从空闲区中划分出来。'
  },
  {
    id: 'choice-10-overlay',
    type: 'single',
    title: '覆盖与交换',
    question: '下列说法错误的是：',
    options: [
      { label: 'A', text: '覆盖可减少一个程序运行所需的空间' },
      { label: 'B', text: '覆盖对应用程序员不透明' },
      { label: 'C', text: '交换是由操作系统实现的' },
      { label: 'D', text: '覆盖在不同作业或程序之间进行' }
    ],
    answer: 'D',
    points: 2,
    explanation: '覆盖通常发生在同一程序内部的不同模块之间；交换是在进程/作业和外存之间进行。'
  }
]

const blankQuestions: BlankQuestion[] = [
  {
    id: 'blank-01-fifo',
    type: 'blank',
    title: 'FIFO 缺页次数',
    question: '访问序列 A B D D E F A A C F G D A C G D C E，4 个页框，FIFO 产生多少次缺页中断？',
    answers: ['10'],
    answerText: '10',
    points: 2,
    explanation: '初始 4 个页框为空，按 FIFO 淘汰最早进入内存的页面，共 10 次缺页。'
  },
  {
    id: 'blank-01-lru',
    type: 'blank',
    title: 'LRU 缺页次数',
    question: '同一访问序列、4 个页框，LRU 产生多少次缺页中断？',
    answers: ['12'],
    answerText: '12',
    points: 2,
    explanation: '按最近最少使用规则淘汰最长时间未被访问的页面，共 12 次缺页。'
  },
  {
    id: 'blank-02-belady',
    type: 'blank',
    title: 'Belady 现象',
    question: '在 FIFO 等页面置换算法中，Belady 现象是指什么？',
    answers: ['分配给进程的页框数增加，缺页次数反而增加', '页框数增加缺页率反而升高', 'belady现象', 'beladys anomaly'],
    answerText: '分配页框数增加时，缺页次数或缺页率反而增加',
    points: 2,
    explanation: 'Belady 现象说明 FIFO 这类算法不具备栈性质，页框变多时缺页次数可能反而上升。'
  },
  {
    id: 'blank-03-abi',
    type: 'blank',
    title: '二进制兼容',
    question: '在一个操作系统中编译好的程序在另一个什么兼容的操作系统中无需重新编译就能运行？',
    answers: ['二进制', '二进制兼容', 'abi', 'abi兼容', '应用程序二进制接口'],
    answerText: '二进制 / ABI',
    points: 2,
    explanation: '无需重新编译运行强调的是二进制接口兼容，即 ABI 兼容。'
  },
  {
    id: 'blank-04-fragment',
    type: 'blank',
    title: '内存碎片',
    question: '内存中无法被利用的存储空间称为什么？',
    answers: ['碎片', '内存碎片'],
    answerText: '碎片',
    points: 2,
    explanation: '无法有效利用的零散内存空间称为碎片，可进一步分为内部碎片和外部碎片。'
  },
  {
    id: 'blank-05-data',
    type: 'blank',
    title: 'DATA 段变量',
    question: '程序中 `int a = 100; int b; static int x; int y = 10; int *p = &y, *q = &b;` 编译装载后，在 DATA 段中分配存储空间的变量有哪些？',
    answers: ['a', '变量a', 'inta'],
    answerText: 'a',
    points: 2,
    explanation: '按常见段划分，已初始化全局变量 a 位于 .data；未初始化的 b 和 static x 通常在 .bss，y、p、q 是自动局部变量，位于栈。'
  },
  {
    id: 'blank-06-peterson-wait',
    type: 'blank',
    title: 'Peterson 进入区',
    question: '补全 Peterson 算法第 13 行。',
    answers: [
      'while(turn==process&&interested[other]==true)',
      'while(interested[other]==true&&turn==process)',
      'while(turn==process&&interested[other])',
      'while(interested[other]&&turn==process)',
      'while(turn==process&&interested[other]==1)',
      'while(interested[other]==1&&turn==process)'
    ],
    answerText: 'while (turn == process && interested[other] == TRUE);',
    supplements: [
      {
        type: 'code',
        language: 'c',
        content: petersonSnippet
      }
    ],
    points: 2,
    explanation: '本题给出的版本先设置 `turn = process`，因此当对方也感兴趣且 turn 仍指向自己时，当前进程等待。'
  },
  {
    id: 'blank-06-peterson-leave',
    type: 'blank',
    title: 'Peterson 退出区',
    question: '补全 Peterson 算法第 18 行。',
    answers: ['interested[process]=false', 'interested[process]=0'],
    answerText: 'interested[process] = FALSE;',
    supplements: [
      {
        type: 'code',
        language: 'c',
        content: petersonSnippet
      }
    ],
    points: 2,
    explanation: '退出临界区时撤销自己的进入意向，让其他进程可以通过等待条件。'
  },
  {
    id: 'blank-07-blocked-range',
    type: 'blank',
    title: '阻塞队列范围',
    question: '单处理器系统中总共有 n 个进程，阻塞队列中的进程个数取值范围是多少？',
    answers: ['0到n', '0至n', '0~n', '0-n', '[0,n]', '0≤x≤n', '0<=x<=n'],
    answerText: '0 到 n',
    points: 2,
    explanation: '如果所有普通进程都在等待事件，阻塞队列可以包含 n 个进程，此时 CPU 可运行 idle 线程或处于空闲调度状态。'
  },
  {
    id: 'blank-08-best-fit',
    type: 'blank',
    title: '最佳适应算法',
    question: '可变分区存储分配算法中，哪种算法总是挑选可以容纳作业的最小空闲区进行分配？',
    answers: ['最佳适应', '最佳适应算法', 'bestfit', 'best fit'],
    answerText: '最佳适应算法（Best Fit）',
    points: 2,
    explanation: 'Best Fit 每次选择能够容纳作业的最小空闲分区。'
  }
]

const subjectiveQuestions: SubjectiveQuestion[] = [
  {
    id: 'subj-01-page-table',
    title: '四-1 页表项数量',
    points: 8,
    prompt: '在一个 32 位虚拟内存系统中，页面大小为 4KB。若页表被全部占用，分别计算 1 级页表和 20 级页表需要多少页表项；若一个进程只分配 1 页内存，再分别计算 1 级页表和 20 级页表需要分配多少页表项。',
    answer: [
      '32 位地址、4KB 页面意味着页内偏移 12 位，虚拟页号 20 位，完整地址空间共有 2^20 个虚拟页。',
      '页表全部占用时，1 级页表需要 2^20 个页表项。',
      '若 20 级页表平均每级使用 1 位虚拟页号，全部占用时需要 2^1 + 2^2 + ... + 2^20 = 2^21 - 2 个页表项。',
      '一个进程只分配 1 页内存时，1 级页表仍需要覆盖完整虚拟页号空间，即 2^20 个页表项。',
      '20 级页表只需要沿目标虚拟页的一条路径建立映射，概念上需要 20 个页表项。'
    ],
    rubric: [
      '算出虚拟页数 2^20。',
      '区分满地址空间和只映射 1 页两种情况。',
      '20 级满表按满二叉树各层页表项求和。',
      '说明多级页表按需分配的空间优势。'
    ]
  },
  {
    id: 'subj-02-segment-page',
    title: '四-2 段页式地址转换',
    points: 7,
    prompt: '20 位虚拟地址采用段页式管理：虚拟段号 4 位、虚拟页号 8 位、页内偏移 8 位。物理地址为物理页号 8 位、页内偏移 8 位。根据段表、PTE 格式和物理内存内容，写出各条 Load/Store 指令结果。',
    details: [
      '指令：Load [0x30114]；Store [0x30115]；Load [0x41015]；Load [0x00115]；Store [0x00210]；Load [0x21202]；Load [0x11145]。',
      'Load 成功时写读入的 1 字节数据，否则写 Error；Store 成功时写 OK，否则写 Error。'
    ],
    answer: [
      'Load [0x30114] = 0x20。段 3 有效，VPN=0x01，PTE 位于 0x4002，内容为 frame 0x31 / Read Only，物理地址 0x3114，读出 0x20。',
      'Store [0x30115] = Error。段 3、VPN=0x01 只读，不能写。',
      'Load [0x41015] = Error。段号 4 超过最大段号 3。',
      'Load [0x00115] = Error。段 0、VPN=0x01 的 PTE 为 0x10 0x00，Invalid。',
      'Store [0x00210] = OK。段 0、VPN=0x02 的 PTE 为 frame 0x12 / Read-Write。',
      'Load [0x21202] = Error。段 2 的段表项 Invalid。',
      'Load [0x11145] = Error。段 1 的段内最大页面数量为 0x10，VPN=0x11 越界。'
    ],
    rubric: [
      '先拆出段号、页号和页内偏移。',
      '依次检查段号范围、段表有效位、段内页号范围。',
      '按页表基址 + VPN * 2 取 PTE。',
      '区分 Load 可读只读页、Store 必须可写。'
    ],
    supplements: segmentSupplements
  },
  {
    id: 'subj-03-self-map',
    title: '五 页表自映射',
    points: 5,
    prompt: '一个 32 位虚拟存储系统采用两级页表，31..22 位为一级页表索引，21..12 位为二级页表索引，11..0 位为页内偏移。若从 0x8C000000 开始映射 4MB 的页表，求一级页表起始虚拟地址，以及一级页表中映射自己的表项的虚拟地址。',
    answer: [
      '4MB 页表窗口起始地址 0x8C000000 对应一级页表索引 r = 0x8C000000 >> 22 = 0x23。',
      '一级页表自身在页表窗口中的起始虚拟地址为 0x8C000000 + r * 0x1000 = 0x8C023000。',
      '映射自己的一级页表项地址为 0x8C023000 + r * 4 = 0x8C02308C。',
      '等价公式：PDE_self = (r << 22) | (r << 12) | (r << 2)。'
    ],
    rubric: [
      '求出自映射索引 r = 0x23。',
      '给出一级页表起始虚拟地址 0x8C023000。',
      '给出自映射表项虚拟地址 0x8C02308C。'
    ]
  },
  {
    id: 'subj-04-process-state',
    title: '六 进程与线程',
    points: 10,
    prompt: '假设进程只有三种基本状态，画出进程的状态转换图，并举例说明这些转换发生的条件。',
    answer: [
      '三种基本状态是：就绪态、运行态、阻塞态。',
      '就绪 -> 运行：调度器选择该进程并分派 CPU。',
      '运行 -> 就绪：时间片用完、被更高优先级进程抢占，或主动让出 CPU。',
      '运行 -> 阻塞：等待 I/O、等待锁/信号量、等待事件或资源。',
      '阻塞 -> 就绪：等待的 I/O、事件或资源条件满足，被内核唤醒。',
      '通常没有阻塞 -> 运行的直接转换，也没有就绪 -> 阻塞的直接转换。'
    ],
    rubric: [
      '状态名称正确。',
      '转换方向正确。',
      '每条转换给出合理触发条件。',
      '指出阻塞态必须先回到就绪态再运行。'
    ]
  },
  {
    id: 'subj-05-semaphore',
    title: '七 信号量基础',
    points: 10,
    prompt: '解释调用一次 P(s) 和 V(s) 后，s.count 与 s.queue 的变化；并用 test-and-set 指令实现 P(s) 和 V(s) 操作的伪代码。',
    details: [
      'test-and-set(boolean* lock)：若 *lock 为 1，返回 1；否则将 *lock 置 1，返回 0。lock 初始值为 0。'
    ],
    answer: [
      'P(s)：原子地将 s.count 减 1；若减 1 后 s.count < 0，则当前进程进入 s.queue 并阻塞，否则继续执行。',
      'V(s)：原子地将 s.count 加 1；若加 1 后 s.count <= 0，说明队列中有等待进程，应从 s.queue 唤醒一个进程。',
      'test-and-set 在这里用于保护 s.count 和 s.queue 的修改，使多个进程并发调用 P/V 时不会破坏信号量内部状态。'
    ],
    answerCode: `void lock(boolean *l) {
    while (test_and_set(l)) {
        ; // spin
    }
}

void unlock(boolean *l) {
    *l = 0;
}

void P(semaphore *s) {
    lock(&s->lock);
    s->count--;
    if (s->count < 0) {
        enqueue(s->queue, current);
        current->state = BLOCKED;
        unlock(&s->lock);
        schedule();
    } else {
        unlock(&s->lock);
    }
}

void V(semaphore *s) {
    lock(&s->lock);
    s->count++;
    if (s->count <= 0) {
        process *p = dequeue(s->queue);
        wakeup(p);
    }
    unlock(&s->lock);
}`,
    rubric: [
      'P/V 对 count 的增减方向正确。',
      '阻塞和唤醒条件正确。',
      '队列入队/出队语义正确。',
      'test-and-set 只保护信号量内部临界区。',
      '阻塞前释放自旋锁，避免死锁。'
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

const objectiveUnansweredCount = computed(() => objectiveQuestions.value.length - objectiveAnsweredCount.value)
const allObjectiveAnswered = computed(() => objectiveUnansweredCount.value === 0)
const subjectiveAnsweredCount = computed(() => subjectiveQuestions.filter((question) => Boolean(subjectiveAnswers.value[question.id]?.trim())).length)
const answeredCount = computed(() => objectiveAnsweredCount.value + subjectiveAnsweredCount.value)
const questionCount = computed(() => objectiveQuestions.value.length + subjectiveQuestions.length)
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
    .replace(/[，。；;：:、,.\s（）()[\]{}]/g, '')
}

function isBeladyAnswer(value: string) {
  return value.includes('belady') || (
    value.includes('页框') &&
    value.includes('缺页') &&
    (value.includes('增加') || value.includes('增多') || value.includes('升高') || value.includes('上升'))
  )
}

function boolLabel(value: boolean | undefined) {
  if (typeof value !== 'boolean') return '未作答'
  return value ? '√' : '×'
}

function isBlankCorrect(question: BlankQuestion) {
  const selected = normalizeAnswer(blankAnswers.value[question.id] || '')
  if (question.id === 'blank-02-belady') return isBeladyAnswer(selected)
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
    id: `exam:2024-midterm:${question.id}`,
    type: question.type === 'true-false' ? 'true-false' : question.type,
    collection: '2024-midterm',
    title: `2024 期中 - ${question.title}`,
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
  if (!allObjectiveAnswered.value) return

  submitted.value = true
  objectiveQuestions.value.forEach(recordObjective)
}

function judgeSubjective(question: SubjectiveQuestion, correct: boolean) {
  subjectiveJudgements.value[question.id] = correct

  recordQuestion({
    id: `exam:2024-midterm:${question.id}`,
    type: 'subjective',
    collection: '2024-midterm',
    title: `2024 期中 - ${question.title}`,
    question: subjectiveQuestionText(question),
    explanation: question.rubric?.join('；'),
    selected: subjectiveAnswers.value[question.id] || '未作答',
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
        <h2>2024 期中考试</h2>
        <p>客观题提交后自动判分；主观题提交后显示参考答案，由你自行判定是否进入错题记录。</p>
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
        <div v-if="submitted" class="exam-result" :class="{ 'is-correct': isObjectiveCorrect(question) }">
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
        <div v-if="submitted" class="exam-result" :class="{ 'is-correct': isObjectiveCorrect(question) }">
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
        <div v-if="submitted" class="exam-result" :class="{ 'is-correct': isObjectiveCorrect(question) }">
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
          rows="6"
          placeholder="写下你的作答要点；客观题提交后会显示参考答案"
        />

        <div v-if="submitted" class="exam-reference">
          <h4>参考答案</h4>
          <ul>
            <li v-for="item in question.answer" :key="item">{{ item }}</li>
          </ul>
          <pre v-if="question.answerCode" class="exam-reference__code">{{ question.answerCode }}</pre>
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
      <button type="button" :disabled="!allObjectiveAnswered" @click="submitPaper">
        {{ submitted ? '重新统计客观题' : '提交客观题并显示答案' }}
      </button>
      <button v-if="submitted" type="button" class="is-secondary" @click="resetPaper">
        重新作答
      </button>
      <p v-if="!allObjectiveAnswered">还有 {{ objectiveUnansweredCount }} 道客观题未作答，提交后才会显示答案。</p>
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

.exam-subjective__detail,
.exam-reference__code {
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
