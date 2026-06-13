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

const fifoOptQuestionStem = '某进程运行时依次访问的内存页面为：1, 2, …, n, 1, 2, …, n, 1, 2, …, n（连续 3 次，按顺序访问 1~n 号页面，n>3）。共为该进程分配了 n-1 个页框，初始时这 n-1 个页框均为空。'

const trueFalseQuestions: TrueFalseQuestion[] = [
  {
    id: 'final-tf-01',
    type: 'true-false',
    title: '多道程序设计的提出',
    question: '多道程序最早是为了解决早期单用户批处理系统 CPU 资源的浪费问题而提出的。',
    answer: true,
    points: 1,
    explanation: '多道程序设计允许多个作业同时驻留内存，当一道作业等待 I/O 时 CPU 可切换到另一道作业，从而提高 CPU 利用率。'
  },
  {
    id: 'final-tf-02',
    type: 'true-false',
    title: '宏内核地址空间',
    question: '宏内核操作系统的内核功能模块之间共享地址空间，能减少上下文切换开销。',
    answer: true,
    points: 1,
    explanation: '宏内核的所有内核模块运行在同一个内核地址空间中，模块间直接函数调用，无需进程间通信，上下文切换开销小。'
  },
  {
    id: 'final-tf-03',
    type: 'true-false',
    title: '系统调用与中断',
    question: '系统调用陷入与外部中断的处理流程完全相同，是操作系统获得 CPU 控制权的关键机制之一。',
    answer: false,
    points: 1,
    explanation: '系统调用陷入是主动的（程序执行 int/syscall 指令），外部中断是被动的（硬件信号），两者触发来源和处理细节不同，但都是进入内核态的入口。'
  },
  {
    id: 'final-tf-04',
    type: 'true-false',
    title: '中级调度器',
    question: '中级调度器通过将作业从主存调出到外部存储（如磁盘）从而优化系统的内存使用和整体性能。',
    answer: true,
    points: 1,
    explanation: '中级调度（medium-term scheduler）负责进程的挂起与激活，通过换出/换入（swapping）来调节内存压力，优化内存使用和系统性能。'
  },
  {
    id: 'final-tf-05',
    type: 'true-false',
    title: 'exec() 与 PID',
    question: '调用 exec() 系统调用会用新程序替换当前进程的地址空间，导致进程的页表信息被替换，从而也修改了该进程的 ID（即 PID）。',
    answer: false,
    points: 1,
    explanation: 'exec() 替换进程的地址空间和代码，但不会改变进程的 PID。PID 在 fork() 时分配，exec() 仅替换程序内容，进程仍然是同一个。'
  },
  {
    id: 'final-tf-06',
    type: 'true-false',
    title: '第二次机会算法',
    question: '第二次机会算法选择最近有引用的页面作为被淘汰页面。',
    answer: false,
    points: 1,
    explanation: '第二次机会（Second Chance）算法是改进的 FIFO：它检查队首页面的引用位，如果引用位为 1，则将其清零并移到队尾（给予第二次机会）；选择引用位为 0 的页面淘汰。因此它淘汰的是"最近没有引用"的页面，而不是"最近有引用"的页面。'
  },
  {
    id: 'final-tf-07',
    type: 'true-false',
    title: '反置页表',
    question: '反置页表（也称反向页表）为每个进程的每个虚拟页保留一个条目。',
    answer: false,
    points: 1,
    explanation: '反置页表（Inverted Page Table）为每个物理页框保留一个条目，记录该页框被哪个进程的哪个虚拟页占用。它与虚拟地址空间大小无关，只与物理内存大小相关。'
  },
  {
    id: 'final-tf-08',
    type: 'true-false',
    title: '硬链接与软链接',
    question: '在 EXT2、EXT3 等文件系统中，指向同一个文件的多个硬链接共享相同 inode 号，删除其中任意一个不会影响数据完整性，而软链接是某个文件的快捷方式，其本身也是一个独立的文件对象。',
    answer: true,
    points: 1,
    explanation: '硬链接共享 inode，删除任意一个链接文件数据仍存在（只要还有一个硬链接）。软链接（符号链接）是独立的 inode，存储目标路径，删除源文件后软链接失效。'
  },
  {
    id: 'final-tf-09',
    type: 'true-false',
    title: '文件系统挂载',
    question: '文件系统挂载时，内核将该文件系统的超级块信息加载到内存中。',
    answer: true,
    points: 1,
    explanation: '挂载（mount）操作将文件系统的超级块（superblock）读入内存，超级块包含文件系统的元信息（如块大小、inode 数量、空闲块信息等）。'
  },
  {
    id: 'final-tf-10',
    type: 'true-false',
    title: '内核级线程阻塞',
    question: '如果内核级线程在执行系统调用时被阻塞，会阻塞与该进程相关的所有线程。',
    answer: false,
    points: 1,
    explanation: '内核级线程由内核管理，每个内核线程独立调度。一个内核级线程阻塞不会阻塞同一进程的其他内核级线程。这是内核级线程相比用户级线程的优势之一。（用户级线程中一个线程阻塞会阻塞整个进程。）'
  }
]

const singleChoiceQuestions: SingleChoiceQuestion[] = [
  {
    id: 'final-choice-01',
    type: 'single',
    title: '页表项与地址空间',
    question: '以下说法正确的是：',
    options: [
      { label: 'A', text: '两个不同进程对应的页表中可能包含内容相同的页表项' },
      { label: 'B', text: '虚拟地址空间总是大于物理地址空间' },
      { label: 'C', text: '在页式内存管理下，页面尺寸越小越有利于消除外碎片，提高内存使用效率' },
      { label: 'D', text: '在段式内存管理下，不同分段尺寸大小可以不同，从而可以消除外碎片' }
    ],
    answer: 'A',
    points: 2,
    explanation: 'A 正确，例如共享内存区域的页表项即可相同。B 错误，虚拟地址空间可以小于物理地址空间。C 错误，页面越小内碎片越小但页表开销越大，且分页本身无外碎片。D 错误，段式管理各段大小不同反而可能产生外碎片。'
  },
  {
    id: 'final-choice-02',
    type: 'single',
    title: '多级页表',
    question: '关于多级页表，下列说法错误的是：',
    options: [
      { label: 'A', text: '能够减少页表占用内存的大小' },
      { label: 'B', text: '级数越多，平均访问内存的时间越长' },
      { label: 'C', text: '有效的页表项中都会存储页框号' },
      { label: 'D', text: '使用二级页表的平均访存性能优于一级页表' }
    ],
    answer: 'D',
    points: 2,
    explanation: '二级页表需要两次访问内存才能完成地址转换（一次查页目录，一次查页表），一级页表只需一次，所以二级页表访存性能比一级页表差。多级页表的优势在于节省页表内存（A 对），但代价是增加访存次数（B 对）。'
  },
  {
    id: 'final-choice-03',
    type: 'single',
    title: '页表项结构',
    question: '关于页表项结构的下列说法中，正确的是：',
    options: [
      { label: 'A', text: '当操作系统把该页从物理内存调出时，会对有效位置位' },
      { label: 'B', text: '当硬件在写入一个页面时，硬件将该页的修改位置为 0' },
      { label: 'C', text: '页表项可用于实现页面到页框的映射' },
      { label: 'D', text: '页表项会保存对应页面的外存地址' }
    ],
    answer: 'C',
    points: 2,
    explanation: 'C 正确，页表项的核心功能是实现虚拟页号到物理页框号的映射。A 错误，页面调出时有效位应清零（置为无效）。B 错误，写入页面时修改位（dirty bit）置 1。D 错误，页表项记录物理页框号，不记录外存地址。'
  },
  {
    id: 'final-choice-04',
    type: 'single',
    title: '文件系统说法',
    question: '关于文件系统，下面说法错误的是：',
    options: [
      { label: 'A', text: '目录也是一种文件' },
      { label: 'B', text: '连续文件不利于文件的动态修改' },
      { label: 'C', text: '串联文件随机访问效率较低' },
      { label: 'D', text: '索引文件结构能支持大文件存储，但小文件存取效率较低' }
    ],
    answer: 'D',
    points: 2,
    explanation: 'A 正确，Unix 中一切皆文件，目录是特殊文件。B 正确，连续文件难以动态扩展。C 正确，串联文件需要沿链遍历才能随机访问。D 错误，索引文件对小文件同样高效（直接通过索引表定位），甚至小文件可以直接用直接索引访问。'
  },
  {
    id: 'final-choice-05',
    type: 'single',
    title: '上下文切换',
    question: '以下说法正确的是：',
    options: [
      { label: 'A', text: '进程上下文切换过程一定会陷入内核' },
      { label: 'B', text: '陷入内核一定会导致进程切换' },
      { label: 'C', text: '正在执行的程序不可以主动放弃 CPU' },
      { label: 'D', text: '系统调用一定会导致进程上下文切换' }
    ],
    answer: 'A',
    points: 2,
    explanation: 'A 正确，进程上下文切换需要保存/恢复寄存器、页表、内核栈等，只能在内核态完成。B 错误，系统调用陷入内核但不一定切换进程。C 错误，程序可以通过 yield() 或阻塞操作主动放弃 CPU。D 错误，简单的系统调用（如 getpid）完成后返回原进程，不切换。'
  },
  {
    id: 'final-choice-06',
    type: 'single',
    title: '局部性原理',
    question: '关于程序的局部性原理，错误的是：',
    options: [
      { label: 'A', text: '局部性原理包括时间局部性和空间局部性' },
      { label: 'B', text: '进程调度的有效运转依赖程序的局部性原理' },
      { label: 'C', text: '程序中的循环结构会导致程序的时间局部性' },
      { label: 'D', text: '主存-辅存机制的有效运转依赖程序的局部性原理' }
    ],
    answer: 'B',
    points: 2,
    explanation: 'B 错误，进程调度不依赖局部性原理。局部性原理主要支撑缓存和虚拟内存机制（D 对）。A/C 正确，循环结构反复执行同一段代码，体现时间局部性。'
  },
  {
    id: 'final-choice-07',
    type: 'single',
    title: '死锁',
    question: '关于死锁，错误的是：',
    options: [
      { label: 'A', text: '通讯死锁和资源死锁都属于死锁' },
      { label: 'B', text: '死锁预防主要通过破坏死锁产生的四个必要条件之一' },
      { label: 'C', text: '死锁避免是处理死锁的静态措施' },
      { label: 'D', text: '银行家算法在运行前需要知道进程所需资源最大值' }
    ],
    answer: 'C',
    points: 2,
    explanation: 'C 错误，死锁避免（如银行家算法）是动态措施——在系统运行过程中动态判断资源分配是否会导致不安全状态。死锁预防才是静态措施（在系统设计时预先破坏必要条件）。A/B/D 均正确。'
  },
  {
    id: 'final-choice-08',
    type: 'single',
    title: 'IPC',
    question: '关于 IPC，错误的是：',
    options: [
      { label: 'A', text: '共享内存比信号的信息承载量要大' },
      { label: 'B', text: '消息传递是最快的 IPC 形式' },
      { label: 'C', text: '套接字不仅可用于不同机器之间的进程通讯，也可用于本机的两进程通讯' },
      { label: 'D', text: '消息传递在安全性上要优于共享内存' }
    ],
    answer: 'B',
    points: 2,
    explanation: 'B 错误，共享内存是最快的 IPC 形式（无需内核介入数据拷贝）。消息传递需要内核参与消息的复制和传递，速度相对较慢。A/C/D 均正确。'
  },
  {
    id: 'final-choice-09',
    type: 'single',
    title: 'RAID',
    question: '关于 RAID 错误的是：',
    options: [
      { label: 'A', text: '条带化是提升磁盘访问性能的有效手段' },
      { label: 'B', text: 'RAID4 和 RAID5 都可以容忍一块磁盘故障' },
      { label: 'C', text: '分布的冗余校验是为了避免奇偶校验磁盘成为瓶颈' },
      { label: 'D', text: 'RAID 6 与 RAID 5 的冗余盘数量相同' }
    ],
    answer: 'D',
    points: 2,
    explanation: 'D 错误，RAID 5 使用 1 块冗余盘（单奇偶校验），RAID 6 使用 2 块冗余盘（双奇偶校验），能容忍两块磁盘故障。A/B/C 均正确，RAID 5 将校验信息分布到所有磁盘以消除瓶颈。'
  },
  {
    id: 'final-choice-10',
    type: 'single',
    title: 'I/O 软件层次',
    question: '关于 I/O 软件错误的是：',
    options: [
      { label: 'A', text: '设置网卡的寄存器在驱动层' },
      { label: 'B', text: 'I/O 格式化技术属于用户层' },
      { label: 'C', text: '缓冲机制属于设备无关软件层' },
      { label: 'D', text: '检查用户是否允许使用设备在用户层' }
    ],
    answer: 'D',
    points: 2,
    explanation: 'D 错误，检查用户权限应在内核的设备无关软件层完成，而非用户层。A 正确，设备驱动程序直接操作设备寄存器。B 正确，格式化工具是用户态程序。C 正确，缓冲机制在设备无关层实现。'
  }
]

const blankQuestions: BlankQuestion[] = [
  {
    id: 'final-blank-01-fifo',
    type: 'blank',
    title: '页面置换 FIFO 计算',
    question: `${fifoOptQuestionStem} 采用 FIFO 算法进行页面置换，完成上述内存页面访问会产生多少次缺页中断？`,
    answers: ['3n-2'],
    answerText: '3n-2',
    points: 1,
    explanation: 'FIFO: 首次访问 n 个页面产生 n 次缺页。后续每轮 n 个页面中前 n-1 个在内存中，只有最后访问的页面 1 不在内存中产生缺页。三轮共 3n-2 次缺页。'
  },
  {
    id: 'final-blank-01-opt',
    type: 'blank',
    title: '页面置换 OPT 计算',
    question: `${fifoOptQuestionStem} 采用 OPT 算法进行页面置换，完成上述内存页面访问会产生多少次缺页中断？`,
    answers: ['2n'],
    answerText: '2n',
    points: 1,
    explanation: 'OPT 最优算法：第一轮 n 次缺页，第二轮和第三轮各 n 次缺页（因为页面 1 在 n 次访问之后才会再用，被淘汰），所以是 2n 次。'
  },
  {
    id: 'final-blank-02-disks',
    type: 'blank',
    title: 'RAID-5 最少磁盘数',
    question: '一个 RAID-5 系统，至少需要多少块磁盘才能构建？',
    answers: ['3'],
    answerText: '3',
    points: 1,
    explanation: 'RAID 5 至少需要 3 块磁盘（数据分布在 n-1 块磁盘，1 块用于奇偶校验）。'
  },
  {
    id: 'final-blank-02-fault',
    type: 'blank',
    title: 'RAID-5 容错磁盘数',
    question: '一个 RAID-5 系统，为确保不丢失数据，该系统最多可以容忍多少块磁盘故障？',
    answers: ['1'],
    answerText: '1',
    points: 1,
    explanation: 'RAID 5 使用单奇偶校验，最多容忍 1 块磁盘故障。'
  },
  {
    id: 'final-blank-03',
    type: 'blank',
    title: '进程状态转换条件',
    question: '在操作系统进程状态模型中，进程从运行态转换到就绪态的条件是什么？',
    answers: ['时间片用完', '时间片到', '被抢占'],
    answerText: '时间片用完',
    points: 1,
    explanation: '进程从运行态到就绪态的经典原因是时间片用完或被更高优先级进程抢占，进程回到就绪队列等待下一次调度。运行→阻塞的原因是等待 I/O 等事件。'
  },
  {
    id: 'final-blank-04',
    type: 'blank',
    title: '位示图空间计算',
    question: '1 个物理盘块大小为 4KB，一个 1TB 硬盘，采用位示图法管理磁盘块空闲情况，需要占用多少 MB 磁盘存储空间？',
    answers: ['32'],
    answerText: '32',
    points: 1,
    explanation: '1TB / 4KB = 2^40 / 2^12 = 2^28 个盘块。位示图中每个盘块占 1 bit，共需 2^28 bits = 2^25 Bytes = 32 MB。'
  },
  {
    id: 'final-blank-05',
    type: 'blank',
    title: 'BSS 段',
    question: '在 C 语言中的未初始化全局变量在运行时会在哪个段上分配存储空间？',
    answers: ['BSS', 'bss'],
    answerText: 'BSS',
    points: 1,
    explanation: '未初始化的全局变量和静态变量存放在 BSS 段（Block Started by Symbol），程序加载时由 OS 初始化为 0，不占用可执行文件空间。已初始化的全局变量存放在 DATA 段。'
  },
  {
    id: 'final-blank-06-role',
    type: 'blank',
    title: '实时系统主导因素',
    question: '实时系统是一种什么起着主导作用的系统？',
    answers: ['时间'],
    answerText: '时间',
    points: 1,
    explanation: '实时系统的核心特征是时间约束，时间起着主导作用。'
  },
  {
    id: 'final-blank-06-deadline',
    type: 'blank',
    title: '实时系统响应时间',
    question: '当外部的一种或多种物理设备给计算机一个刺激，计算机必须在什么时间内恰当地做出反应？',
    answers: ['规定时间', '指定时间', '截止时间'],
    answerText: '规定时间/截止时间',
    points: 1,
    explanation: '实时系统必须在规定的时间（deadline）内完成响应，否则可能导致系统失效。'
  },
  {
    id: 'final-blank-07',
    type: 'blank',
    title: 'ABI 兼容',
    question: '如果一个二进制程序在两个不同的操作系统上都可以直接运行，则这两个操作系统是什么兼容的？',
    answers: ['ABI', '二进制', 'binary'],
    answerText: 'ABI / 二进制',
    points: 1,
    explanation: 'ABI（Application Binary Interface）兼容意味着二进制程序无需重新编译即可在不同系统上运行。ABI 定义了二进制接口规范（调用约定、系统调用号、可执行文件格式等）。'
  }
]

const subjectiveQuestions: SubjectiveQuestion[] = [
  {
    id: 'final-subj-01',
    title: '四-1 设备死锁最小值',
    points: 5,
    prompt: '某系统有 m 台互斥使用的同类设备，n 个并发进程完成执行分别需要 1，2，3，…，n 台设备。求 m 的最小值，使系统不会发生死锁。',
    answer: [
      '最坏情况下每个进程占用所需设备数-1 台：进程 1 占用 0 台（需 1 台），进程 2 占用 1 台（需 2 台），...，进程 n 占用 n-1 台（需 n 台）。',
      '此时总占用 = 0 + 1 + 2 + ... + (n-1) = n(n-1)/2 台。',
      '为避免死锁，至少还需要 1 台设备满足某个进程的剩余需求，即 m ≥ n(n-1)/2 + 1 台。',
      '因此 m 的最小值为 n(n-1)/2 + 1。'
    ],
    rubric: [
      '正确写出最坏情况下的资源占用（2分）',
      '正确计算总占用 n(n-1)/2（1分）',
      '正确得出 m = n(n-1)/2 + 1（2分）'
    ]
  },
  {
    id: 'final-subj-02',
    title: '四-2 银行家算法',
    points: 5,
    prompt: '假设具有 5 个进程的进程集合 P={P0,P1,P2,P3,P4}，考虑 CPU 和内存两类资源。在某时刻的状态如表所示（已分配/最大需求）。当前系统剩余可利用资源为：CPU 4 核；内存 6MB。系统当前是否安全？若安全请给出安全序列；若不安全说明原因。',
    details: [
      'P0: 已分配 CPU=2, 内存=2; 最大需求 CPU=5, 内存=10',
      'P1: 已分配 CPU=1, 内存=6; 最大需求 CPU=6, 内存=7',
      'P2: 已分配 CPU=1, 内存=15; 最大需求 CPU=4, 内存=20',
      'P3: 已分配 CPU=4, 内存=7; 最大需求 CPU=10, 内存=8',
      'P4: 已分配 CPU=4, 内存=12; 最大需求 CPU=12, 内存=15'
    ],
    answer: [
      '计算各进程剩余需求（Need = Max - Allocated）：',
      'P0: Need=(3,8), P1: Need=(5,1), P2: Need=(3,5), P3: Need=(6,1), P4: Need=(8,3)',
      '当前可用资源 Available=(4,6)',
      '尝试寻找安全序列：',
      '先满足 P2? Need(3,5) ≤ Avail(4,6)，可以！分配后 P2 完成释放，Avail = (4,6)+(1,15) = (5,21)',
      '再满足 P0? Need(3,8) ≤ (5,21)，可以！Avail = (5,21)+(2,2) = (7,23)',
      '再满足 P1? Need(5,1) ≤ (7,23)，可以！Avail = (7,23)+(1,6) = (8,29)',
      '再满足 P3? Need(6,1) ≤ (8,29)，可以！Avail = (8,29)+(4,7) = (12,36)',
      '再满足 P4? Need(8,3) ≤ (12,36)，可以！',
      '系统处于安全状态。安全序列：P2→P0→P1→P3→P4（不唯一）'
    ],
    rubric: [
      '正确计算各进程剩余需求 Need（1分）',
      '正确进行安全性检查算法（2分）',
      '正确给出安全序列并验证（2分）'
    ]
  },
  {
    id: 'final-subj-03',
    title: '五 64位4级页表',
    points: 12,
    prompt: '一个 64 位系统架构中内存采用 4 级页表管理，每个页面大小 8192 字节，每个页表项占 8 字节，每一级页表项恰好填满一页。',
    details: [
      '1. (2分) 页内偏移在虚拟地址中占几位？',
      '2. (4分) 计算有效虚拟地址位长度和有效地址空间大小。',
      '3. (3分) 画出虚拟地址结构，标出各个部分起止位置和长度。',
      '4. (3分) 假设当前进程的第一级页表（页目录）起始物理地址为 0x4000，给出虚拟地址 0xFFFFABC123456789 对应的页目录表项的物理地址。'
    ],
    answer: [
      '1. 页面大小 = 8192 = 2^13 字节，页内偏移占 13 位。',
      '2. 每级页表索引位数 = log2(8192/8) = log2(1024) = 10 位。4 级页表共 4×10 + 13 = 53 位。有效虚拟地址位长度为 53 位，有效地址空间为 2^53 字节 = 8 PB。',
      '3. | 一级(bit 52-43) | 二级(bit 42-33) | 三级(bit 32-23) | 四级(bit 22-13) | 偏移(bit 12-0) |，每级 10 位，偏移 13 位。',
      '4. 虚拟地址 0xFFFFABC123456789，取 bit 52-43 得一级页表索引。页表项大小 8 字节，页目录表项物理地址 = 0x4000 + 一级索引 × 8。由于地址只有低 53 位有效，需截取 bit 52-43 计算。具体计算：(0xFFFFABC123456789 >> 43) & 0x3FF = 索引值，进而得到最终物理地址。'
    ],
    rubric: [
      '小题1: 正确得出 13 位（2分）',
      '小题2: 正确计算每级位数（2分），正确计算有效位和地址空间（2分）',
      '小题3: 正确画出结构并标注起止位置（3分）',
      '小题4: 正确提取一级索引（2分），正确计算物理地址（1分）'
    ]
  },
  {
    id: 'final-subj-04',
    title: '六 磁盘访问时间计算',
    points: 8,
    prompt: '某磁盘的平均寻道时间是 10 ms，旋转速度为 7500 rpm（转/分钟），每磁道可存储 32KB。该磁盘上文件系统的数据块大小是 4KB，文件的平均大小也是 4KB。若不考虑读取文件控制块和目录的时间，从该磁盘中读取一个文件的平均时间为多少 ms？',
    answer: [
      '平均旋转延迟 = 0.5 / (7500/60) = 0.5 / 125 = 4 ms',
      '每磁道 32KB，文件大小 = 数据块大小 = 4KB，每个文件占 1 个数据块。',
      '传输一个 4KB 块的时间 = (4KB / 32KB) × (60/7500) = (1/8) × 8ms = 1 ms',
      '总平均时间 = 平均寻道 + 平均旋转延迟 + 传输时间 = 10 + 4 + 1 = 15 ms'
    ],
    rubric: [
      '正确计算平均旋转延迟（2分）',
      '正确计算传输时间（3分）',
      '正确求和得出总时间（3分）'
    ]
  },
  {
    id: 'final-subj-05',
    title: '七 多级队列调度',
    points: 10,
    prompt: '某系统采用多级队列调度算法，设有以下两个队列：高优先级队列 Q1 采用时间片轮转（RR）调度，时间片长度为 2；低优先级队列 Q2 采用先来先服务（FCFS）调度。调度规则：a) 新到达的进程首先进入 Q1；b) 若进程在 Q1 中用完一个时间片后未完成，则被移入 Q2；c) 仅当 Q1 为空时，才调度 Q2 中的进程；d) 进程一旦开始执行，就不会被打断，除非时间片用完。',
    details: [
      '进程到达时间和执行时间：P1(0,8), P2(1,4), P3(2,5), P4(3,2)'
    ],
    answer: [
      '时间线：',
      't=0: Q1=[P1], P1 运行 2 单位，P1 剩余 6，P1 降级到 Q2',
      't=2: Q1=[P2,P3], Q2=[P1(6)]。P2 运行 2 单位，P2 剩余 2，P2 降级',
      't=4: Q1=[P3], Q2=[P1(6),P2(2)]。P3 运行 2 单位，P3 剩余 3，P3 降级',
      't=6: P4 已到达(t=3)。Q1=[P4], Q2=[P1(6),P2(2),P3(3)]。P4 运行 2 单位，P4 完成！',
      't=8: Q1=[], 调度 Q2。P1 运行(不可抢占)，P1 运行 6 单位，t=14 完成',
      't=14: P2 运行 2 单位，t=16 完成',
      't=16: P3 运行 3 单位，t=19 完成',
      '完成时间：P1=14, P2=16, P3=19, P4=8',
      '周转时间 = 完成时间 - 到达时间：P1=14, P2=15, P3=17, P4=5',
      '平均周转时间 = (14+15+17+5)/4 = 12.75'
    ],
    rubric: [
      '正确画出调度时序图（3分）',
      '正确计算各进程完成时间和周转时间（4分）',
      '正确计算平均周转时间（3分）'
    ]
  },
  {
    id: 'final-subj-06',
    title: '八-1 PV 操作分析',
    points: 4,
    prompt: '多个线程之间共享访问变量 x（初值为 0），为了保障线程之间的同步，定义了一个互斥信号量 mutex（初值为 1），并用 PV 操作来实现同步，伪代码如下。请分析代码是否保证了线程对变量 x 的互斥访问？x 的取值是否可能大于 1？并给出解释。',
    details: [
      'P(mutex); if (x == 0) { V(mutex); P(mutex); x++; } V(mutex);'
    ],
    answer: [
      '代码没有保证互斥访问。分析如下：',
      '线程 A 进入：P(mutex)，x==0，执行 V(mutex) 释放锁，再执行 P(mutex) 等待重新获取。',
      '在线程 A 执行 V(mutex) 和 P(mutex) 之间，线程 B 可能获得锁。线程 B 也检测到 x==0，也执行同样的操作。',
      '如果两个线程先后获得锁并执行 x++，x 的取值可能大于 1。',
      '该代码存在竞态条件，关键在于释放锁和重新获取锁之间存在窗口期。'
    ],
    rubric: [
      '正确判断未保证互斥（1分）',
      '正确分析竞态窗口期（2分）',
      '正确说明 x 可能大于 1（1分）'
    ]
  },
  {
    id: 'final-subj-07',
    title: '八-2 屏障同步设计',
    points: 7,
    prompt: '在一些多线程的应用场景中，各线程需要在某个执行点处进行汇合，汇合之后再并发执行。如果除了信号量之外，不允许使用任何共享变量。请用 PV 操作设计一个函数 Barrier(int threadID)，threadID 为调用 Barrier 函数的线程的 ID。只要每个线程都调用 Barrier，就能解决 N 个线程的汇合问题。请定义信号量，并用伪代码给出 Barrier 函数的实现。',
    answer: [
      '定义信号量：semaphore arrive[N] = {0, 0, ..., 0}; // N 个信号量，初值均为 0',
      '实现思路：线程 i 到达后，通知下一个线程（signal(arrive[(i+1) % N])），然后等待自己的信号量（wait(arrive[i])）。',
      'void Barrier(int threadID) {',
      '  int next = (threadID + 1) % N;',
      '  signal(arrive[next]);   // 通知下一个线程，我已到达',
      '  wait(arrive[threadID]); // 等待上一个线程通知我',
      '}',
      '当所有 N 个线程都完成 signal 和 wait 后，所有线程同时从 wait 中唤醒，实现汇合。'
    ],
    rubric: [
      '正确定义信号量类型和初值（2分）',
      '正确设计 signal 逻辑（2分）',
      '正确设计 wait 逻辑（2分）',
      '正确解释汇合原理（1分）'
    ]
  },
  {
    id: 'final-subj-08',
    title: '九 文件结构推荐',
    points: 9,
    prompt: '文件系统有三种典型的逻辑组织结构，包括连续文件、链接文件和索引文件。针对以下三类用户需求，请推荐一种最适合的文件结构，并给出解释。',
    details: [
      '1. (3分) 文件系统的性能主要取决于对于大文件的连续访问。',
      '2. (3分) 文件系统的性能主要取决于对于大文件的随机访问。',
      '3. (3分) 提高磁盘空间的利用率是文件系统的主要目标。'
    ],
    answer: [
      '1. 推荐连续文件结构。连续文件在磁盘上连续存放，对顺序访问非常高效（只需一次寻道），特别适合大文件的连续读写。',
      '2. 推荐索引文件结构。索引文件通过索引表直接定位到任意数据块，无需遍历链表，随机访问效率高，适合大文件的随机访问。',
      '3. 推荐链接文件结构。链接文件不要求连续空间，可以充分利用磁盘的零散空闲块，磁盘空间利用率最高。'
    ],
    rubric: [
      '第1题：推荐连续文件并给出合理理由（3分）',
      '第2题：推荐索引文件并给出合理理由（3分）',
      '第3题：推荐链接文件并给出合理理由（3分）'
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
    id: `exam:2025-final:${question.id}`,
    type: question.type === 'true-false' ? 'true-false' : question.type,
    collection: '2025-final',
    title: `2025 期末 - ${question.title}`,
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
    id: `exam:2025-final:${question.id}`,
    type: 'subjective',
    collection: '2025-final',
    title: `2025 期末 - ${question.title}`,
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
        <h2>2025 期末考试</h2>
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
      <h3>四至九、主观题</h3>
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