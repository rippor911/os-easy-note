import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import CompareCard from '../../components/CompareCard.vue'
import AdditionReviewPaper from '../../components/AdditionReviewPaper.vue'
import ExamPaper from '../../components/ExamPaper.vue'
import FillBlank from '../../components/FillBlank.vue'
import Mermaid from '../../components/Mermaid.vue'
import MultiFillBlank from '../../components/MultiFillBlank.vue'
import ProgressDashboard from '../../components/ProgressDashboard.vue'
import Quiz from '../../components/Quiz.vue'
import QuizSet from '../../components/QuizSet.vue'
import Reveal from '../../components/Reveal.vue'
import Layout from './Layout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Quiz', Quiz)
    app.component('QuizSet', QuizSet)
    app.component('FillBlank', FillBlank)
    app.component('MultiFillBlank', MultiFillBlank)
    app.component('Reveal', Reveal)
    app.component('CompareCard', CompareCard)
    app.component('AdditionReviewPaper', AdditionReviewPaper)
    app.component('ExamPaper', ExamPaper)
    app.component('ProgressDashboard', ProgressDashboard)
    app.component('Mermaid', Mermaid)
  }
} satisfies Theme
