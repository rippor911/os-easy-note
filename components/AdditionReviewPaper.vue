<script setup lang="ts">
import { computed, ref } from 'vue'
import { recordQuestion } from './utils/progress'

type QuestionType = 'single' | 'multiple' | 'blank'

interface OptionItem {
  label: string
  text: string
}

interface BaseQuestion {
  id: string
  type: QuestionType
  title: string
  question: string
  explanation: string
  sourceAnswer: string
  answerNote?: string
}

interface SingleQuestion extends BaseQuestion {
  type: 'single'
  options: OptionItem[]
  answer: string
}

interface MultipleQuestion extends BaseQuestion {
  type: 'multiple'
  options: OptionItem[]
  answer: string[]
}

interface BlankQuestion extends BaseQuestion {
  type: 'blank'
  answers: string[]
  placeholder?: string
}

type ReviewQuestion = SingleQuestion | MultipleQuestion | BlankQuestion

const questions: ReviewQuestion[] = [
  {
    id: 'addition-01',
    type: 'single',
    title: '多级页表',
    question: '关于多级页表，下列说法不正确的是哪一项？',
    options: [
      { label: 'A', text: '能够减少页表占用内存大小。' },
      { label: 'B', text: '级数越多，平均访问内存时间越长。' },
      { label: 'C', text: '有效页表项中都会存储页框号。' },
      { label: 'D', text: '使用二级页表平均访存性能优于一级页表。' }
    ],
    answer: 'D',
    sourceAnswer: 'A',
    explanation: '多级页表的主要收益是按需分配下级页表，从而节省页表空间；但页表级数越多，TLB 未命中时的页表遍历通常更长，因此不能说二级页表平均访存性能优于一级页表。'
  },
  {
    id: 'addition-02',
    type: 'multiple',
    title: 'x86 分段地址转换',
    question: 'Intel x86 下，从段式地址到线性地址转换中可能需要查找哪些对象？',
    options: [
      { label: 'A', text: 'GDT' },
      { label: 'B', text: 'LDT' },
      { label: 'C', text: '页目录' },
      { label: 'D', text: '页表' }
    ],
    answer: ['A', 'B'],
    sourceAnswer: 'A',
    explanation: '段式地址到线性地址的转换要用段选择子在 GDT 或 LDT 中找到段描述符。页目录和页表属于线性地址到物理地址的分页阶段，不属于本题这一问。'
  },
  {
    id: 'addition-03',
    type: 'multiple',
    title: '请求式分页',
    question: '页表项 `Valid = 0` 可以说明什么？',
    options: [
      { label: 'A', text: '该页当前还未映射到物理页框。' },
      { label: 'B', text: '该页已经装入内存。' },
      { label: 'C', text: '访问它会触发缺页异常。' },
      { label: 'D', text: '页面内容可能位于磁盘上。' }
    ],
    answer: ['A', 'C', 'D'],
    sourceAnswer: 'A、C',
    explanation: '在请求式分页语境下，`Valid = 0` 表示当前页表项无效，访问它会触发缺页异常；页面尚未分配物理页框，或者内容暂时在磁盘上，都是合理解释。'
  },
  {
    id: 'addition-04',
    type: 'multiple',
    title: '可重入代码',
    question: '关于可重入代码，下列说法正确的是哪些？',
    options: [
      { label: 'A', text: '即使系统里只有一个用户进程，也仍然可能需要可重入代码。' },
      { label: 'B', text: '可重入代码一般不依赖可修改的全局变量。' },
      { label: 'C', text: '可重入代码一般不依赖可修改的静态局部变量。' },
      { label: 'D', text: '可重入代码可被多个执行流安全共享。' }
    ],
    answer: ['A', 'B', 'C', 'D'],
    sourceAnswer: 'B、C、D',
    explanation: 'A 也正确。即使只有一个用户进程，也可能因为中断、异常、信号处理或递归再次进入同一段代码。可重入代码的关键是不要依赖未受保护的可修改共享状态。'
  },
  {
    id: 'addition-05',
    type: 'blank',
    title: 'Clock 页面置换',
    question: '引用串 `0,1,7,2,3,2,7,1,0,3`，4 个页框，Clock 算法产生多少次缺页？',
    answers: ['6'],
    placeholder: '输入数字',
    sourceAnswer: '7',
    explanation: '按这套题库的默认规则，新装入页的访问位设为 1。按照 Clock 的扫描和二次机会逻辑模拟，最终缺页次数是 6 次。'
  },
  {
    id: 'addition-06',
    type: 'blank',
    title: '按需调页平均延迟因素',
    question: '按原题选项字母作答：影响按需调页平均延迟的正确选项是哪些？',
    answers: ['ABCD', 'A,B,C,D', 'A、B、C、D'],
    placeholder: '例如 A、B、C、D',
    sourceAnswer: 'A、B、D',
    answerNote: '原始选项未完整保留，本题按老师原题的字母集合回忆作答。',
    explanation: '你当时漏掉了 C。题目确认的最终答案是 A、B、C、D，其中 C 对应“进程切换开销”，它也是影响按需调页平均延迟的因素。'
  },
  {
    id: 'addition-07',
    type: 'blank',
    title: '虚拟内存说法',
    question: '按原题选项字母作答：关于虚拟内存说法正确的是哪些？',
    answers: ['ABCD', 'A,B,C,D', 'A、B、C、D'],
    placeholder: '例如 A、B、C、D',
    sourceAnswer: 'B、C、D',
    answerNote: '原始选项未完整保留，本题按老师原题的字母集合回忆作答。',
    explanation: '本题最终答案是 A、B、C、D。易错点在 A：在这套题库的教学语境里，“页表需要占用虚拟地址空间”判为正确。'
  },
  {
    id: 'addition-08',
    type: 'blank',
    title: '4MB 对齐',
    question: '按原题选项字母作答：以下哪个地址不是 4MB 对齐的？',
    answers: ['C'],
    placeholder: '输入选项字母',
    sourceAnswer: 'C',
    answerNote: '原始选项未完整保留，本题按老师原题的字母回忆作答。',
    explanation: '你原本作答 C 是对的。中途曾误判为 D，但最后已经修正，正确答案仍然是 C。'
  },
  {
    id: 'addition-09',
    type: 'blank',
    title: '自映射地址类型',
    question: '按原题选项字母作答：页目录自映射计算过程中，正确的地址类型对应哪一项？',
    answers: ['B'],
    placeholder: '输入选项字母',
    sourceAnswer: 'B',
    answerNote: '原始选项未完整保留，本题按老师原题的字母回忆作答。',
    explanation: '这题最终正确答案是 B。之前曾误判过 C，后来已经修正。'
  },
  {
    id: 'addition-10',
    type: 'blank',
    title: 'fork()',
    question: '按原题选项字母作答：关于 `fork()`，下列说法不正确的是哪一项？',
    answers: ['D'],
    placeholder: '输入选项字母',
    sourceAnswer: 'B',
    answerNote: '原始选项未完整保留，本题按老师原题的字母回忆作答。',
    explanation: '牢记 `pid = fork();` 后，子进程得到返回值 0，父进程得到子进程 PID。因此本题不正确的是 D，而不是 B。'
  },
  {
    id: 'addition-11',
    type: 'blank',
    title: 'PCB',
    question: '按原题选项字母作答：PCB 中记录的信息包括哪些？',
    answers: ['BCDEF', 'B,C,D,E,F', 'B C D E F', 'B、C、D、E、F'],
    placeholder: '例如 B、C、D、E、F',
    sourceAnswer: 'B、C、D、E、F、G、H',
    answerNote: '原始选项未完整保留，本题按老师原题的字母集合回忆作答。',
    explanation: '最终正确答案是 B、C、D、E、F。G“代码段长度”和 H“符号表”不属于 PCB 必备记录项。PCB 主要保存进程标识、状态、调度信息、寄存器现场、内存和文件等运行管理信息。'
  },
  {
    id: 'addition-12',
    type: 'single',
    title: 'Peterson 临界区算法',
    question: 'Peterson 临界区算法更适合哪种情况的调度？',
    options: [
      { label: 'A', text: '抢占式调度' },
      { label: 'B', text: '非抢占式调度' }
    ],
    answer: 'A',
    sourceAnswer: 'B',
    explanation: 'Peterson 算法面向两个并发执行的进程，通过共享变量和忙等待实现互斥。它默认进程在竞争期间可能被随时切换，因此更典型地适用于抢占式调度环境；在非抢占式调度下，互斥问题本身会被弱化。'
  },
  {
    id: 'addition-13',
    type: 'single',
    title: '管程',
    question: '关于管程，不正确的是哪一项？',
    options: [
      { label: 'A', text: '管程是一种高级同步原语。' },
      { label: 'B', text: '管程可以解决信号量无法解决的进程同步问题。' },
      { label: 'C', text: '管程需要依赖编译器和语言支持。' },
      { label: 'D', text: '同一时刻，只有一个进程可以在管程内执行。' }
    ],
    answer: 'B',
    sourceAnswer: 'A',
    explanation: 'A、C、D 都成立。错误在 B：管程不是比信号量“能力更强”，而是把同步机制封装得更安全、更易写。理论上信号量可以实现管程功能，所以不能说管程能解决而信号量不能解决的问题。'
  },
  {
    id: 'addition-14',
    type: 'multiple',
    title: '信号量集',
    question: '对于信号量集，下列说法错误的是哪些？',
    options: [
      { label: 'A', text: '`SP(S,d,e)` 表示每次申请 `d` 个资源，当资源数量小于 `e` 个时便不予分配。' },
      { label: 'B', text: '`SP(S,0,1)` 表示互斥信号量。' },
      { label: 'C', text: '`SP(S,1,0)` 在 `S = 0` 时禁止任何进程进入临界区。' }
    ],
    answer: ['A', 'B'],
    sourceAnswer: 'B、C',
    explanation: '`SP(S,d,e)` 的准确条件是 `S ≥ d` 且 `S - d ≥ e`，所以 A 错在只看了 `e` 而忽略了申请量 `d`。`SP(S,0,1)` 申请 0 个资源，没有互斥意义，因此 B 也错。C 是对的，因为 `SP(S,1,0)` 在 `S = 0` 时确实无法分配资源。'
  }
]

const singleAnswers = ref<Record<string, string>>({})
const multipleAnswers = ref<Record<string, string[]>>({})
const blankAnswers = ref<Record<string, string>>({})
const submitted = ref<Record<string, boolean>>({})

const answeredCount = computed(() => questions.filter((question) => hasAnswered(question)).length)

function normalize(value: string) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[，、,\s]+/g, '')
}

function hasAnswered(question: ReviewQuestion) {
  if (question.type === 'single') return Boolean(singleAnswers.value[question.id])
  if (question.type === 'multiple') return Boolean(multipleAnswers.value[question.id]?.length)
  return Boolean(blankAnswers.value[question.id]?.trim())
}

function isCorrect(question: ReviewQuestion) {
  if (question.type === 'single') {
    return singleAnswers.value[question.id] === question.answer
  }

  if (question.type === 'multiple') {
    const selected = [...(multipleAnswers.value[question.id] || [])].sort().join('')
    return selected === [...question.answer].sort().join('')
  }

  const selected = normalize(blankAnswers.value[question.id] || '')
  return question.answers.some((answer) => normalize(answer) === selected)
}

function selectedText(question: ReviewQuestion) {
  if (question.type === 'single') return singleAnswers.value[question.id] || '未作答'
  if (question.type === 'multiple') return (multipleAnswers.value[question.id] || []).join('、') || '未作答'
  return blankAnswers.value[question.id] || '未作答'
}

function answerText(question: ReviewQuestion) {
  if (question.type === 'single') return question.answer
  if (question.type === 'multiple') return question.answer.join('、')
  return question.answers[0]
}

function toggleMultiple(questionId: string, label: string) {
  const current = new Set(multipleAnswers.value[questionId] || [])
  if (current.has(label)) current.delete(label)
  else current.add(label)
  multipleAnswers.value[questionId] = [...current]
}

function submitQuestion(question: ReviewQuestion) {
  if (!hasAnswered(question)) return
  submitted.value[question.id] = true

  recordQuestion({
    id: `addition-review:${question.id}`,
    type: question.type === 'multiple' ? 'multiple' : question.type,
    collection: 'addition-review',
    title: `综合测试补充题 - ${question.title}`,
    question: question.question,
    options: question.type === 'blank' ? [] : question.options,
    explanation: question.explanation,
    selected: selectedText(question),
    answer: answerText(question),
    correct: isCorrect(question),
    at: Date.now()
  })
}

function resetAll() {
  singleAnswers.value = {}
  multipleAnswers.value = {}
  blankAnswers.value = {}
  submitted.value = {}
}
</script>

<template>
  <section class="addition-paper">
    <header class="addition-paper__hero">
      <div>
        <p class="addition-paper__eyebrow">Comprehensive Review</p>
        <h2>补充综合测试</h2>
        <p>共 11 题，按题提交即可看到答案与解析。部分题目原始选项未完整保留，页面里已明确标注为“按原题字母回忆作答”。</p>
      </div>
      <div class="addition-paper__meta">
        <strong>{{ answeredCount }} / {{ questions.length }}</strong>
        <span>已作答</span>
      </div>
    </header>

    <article v-for="(question, index) in questions" :key="question.id" class="addition-question">
      <header class="addition-question__header">
        <div>
          <p class="addition-question__index">第 {{ index + 1 }} 题</p>
          <h3>{{ question.title }}</h3>
        </div>
        <span class="addition-question__type">
          {{ question.type === 'single' ? '单选' : question.type === 'multiple' ? '多选' : '填空/字母作答' }}
        </span>
      </header>

      <p class="addition-question__stem">{{ question.question }}</p>
      <p v-if="question.answerNote" class="addition-question__note">{{ question.answerNote }}</p>

      <div v-if="question.type === 'single'" class="addition-options">
        <button
          v-for="option in question.options"
          :key="option.label"
          type="button"
          :disabled="submitted[question.id]"
          :class="{
            'is-selected': singleAnswers[question.id] === option.label,
            'is-answer': submitted[question.id] && question.answer === option.label,
            'is-wrong': submitted[question.id] && singleAnswers[question.id] === option.label && singleAnswers[question.id] !== question.answer
          }"
          @click="singleAnswers[question.id] = option.label"
        >
          <strong>{{ option.label }}</strong>
          <span>{{ option.text }}</span>
        </button>
      </div>

      <div v-else-if="question.type === 'multiple'" class="addition-options">
        <button
          v-for="option in question.options"
          :key="option.label"
          type="button"
          :disabled="submitted[question.id]"
          :class="{
            'is-selected': (multipleAnswers[question.id] || []).includes(option.label),
            'is-answer': submitted[question.id] && question.answer.includes(option.label),
            'is-wrong': submitted[question.id] && (multipleAnswers[question.id] || []).includes(option.label) && !question.answer.includes(option.label)
          }"
          @click="toggleMultiple(question.id, option.label)"
        >
          <strong>{{ option.label }}</strong>
          <span>{{ option.text }}</span>
        </button>
      </div>

      <label v-else class="addition-blank">
        <span>你的作答</span>
        <input
          v-model="blankAnswers[question.id]"
          :disabled="submitted[question.id]"
          type="text"
          :placeholder="question.placeholder || '输入答案'"
        >
      </label>

      <div class="addition-question__actions">
        <span>你当时的答案：{{ question.sourceAnswer }}</span>
        <button type="button" :disabled="!hasAnswered(question) || submitted[question.id]" @click="submitQuestion(question)">
          提交本题
        </button>
      </div>

      <div v-if="submitted[question.id]" class="addition-result" :class="{ 'is-correct': isCorrect(question) }">
        <strong>{{ isCorrect(question) ? '回答正确' : `回答错误，标准答案：${answerText(question)}` }}</strong>
        <p>{{ question.explanation }}</p>
      </div>
    </article>

    <footer class="addition-paper__footer">
      <button type="button" @click="resetAll">重新作答全部题目</button>
    </footer>
  </section>
</template>

<style scoped>
.addition-paper {
  margin: 24px 0;
}

.addition-paper__hero,
.addition-question,
.addition-paper__footer {
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--os-radius);
  background: var(--vp-c-bg);
  box-shadow: var(--os-shadow-soft);
}

.addition-paper__hero {
  display: flex;
  gap: 18px;
  justify-content: space-between;
  padding: 18px;
}

.addition-paper__eyebrow,
.addition-question__index {
  margin: 0 0 6px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.addition-paper__hero h2,
.addition-question h3 {
  margin: 0;
  border: 0;
  padding: 0;
}

.addition-paper__hero p:last-child {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
}

.addition-paper__meta {
  display: grid;
  min-width: 120px;
  justify-items: end;
}

.addition-paper__meta strong {
  color: var(--vp-c-brand-1);
  font-size: 28px;
}

.addition-paper__meta span,
.addition-question__type,
.addition-question__note {
  color: var(--vp-c-text-2);
}

.addition-question {
  margin-top: 16px;
  padding: 16px;
}

.addition-question__header,
.addition-question__actions {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.addition-question__type {
  border-radius: 999px;
  padding: 4px 10px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  font-weight: 800;
}

.addition-question__stem {
  margin: 12px 0 0;
  color: var(--vp-c-text-1);
  font-weight: 700;
  line-height: 1.8;
}

.addition-question__note {
  margin: 8px 0 0;
  line-height: 1.7;
}

.addition-options {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.addition-options button,
.addition-question__actions button,
.addition-paper__footer button {
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--os-radius);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.addition-options button {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 10px;
  align-items: center;
  padding: 12px;
  text-align: left;
}

.addition-options button strong {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-bg);
}

.addition-options button.is-selected {
  border-color: var(--vp-c-brand-1);
}

.addition-options button.is-answer {
  border-color: var(--os-c-green);
  background: color-mix(in srgb, var(--os-c-green) 10%, transparent);
}

.addition-options button.is-wrong {
  border-color: var(--os-c-red);
  background: color-mix(in srgb, var(--os-c-red) 10%, transparent);
}

.addition-blank {
  display: grid;
  gap: 8px;
  margin-top: 14px;
  font-weight: 700;
}

.addition-blank input {
  width: 100%;
  min-width: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--os-radius);
  padding: 10px 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font: inherit;
}

.addition-question__actions {
  margin-top: 14px;
  flex-wrap: wrap;
}

.addition-question__actions span {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.addition-question__actions button,
.addition-paper__footer button {
  padding: 9px 13px;
  font-weight: 800;
}

.addition-question__actions button {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.addition-question__actions button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.addition-result {
  margin-top: 14px;
  border-left: 4px solid var(--os-c-red);
  border-radius: var(--os-radius);
  padding: 12px;
  background: color-mix(in srgb, var(--os-c-red) 9%, transparent);
}

.addition-result.is-correct {
  border-left-color: var(--os-c-green);
  background: color-mix(in srgb, var(--os-c-green) 9%, transparent);
}

.addition-result p {
  margin: 6px 0 0;
  line-height: 1.8;
}

.addition-paper__footer {
  margin-top: 16px;
  padding: 14px 16px;
}

.addition-paper__footer button {
  background: var(--vp-c-bg-soft);
  font-weight: 800;
}

@media (max-width: 720px) {
  .addition-paper__hero,
  .addition-question__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .addition-paper__meta {
    justify-items: start;
  }
}
</style>
