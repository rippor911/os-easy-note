import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import CompareCard from '../../components/CompareCard.vue'
import FillBlank from '../../components/FillBlank.vue'
import Mermaid from '../../components/Mermaid.vue'
import MultiFillBlank from '../../components/MultiFillBlank.vue'
import ProgressDashboard from '../../components/ProgressDashboard.vue'
import Quiz from '../../components/Quiz.vue'
import Reveal from '../../components/Reveal.vue'
import TagFilter from '../../components/TagFilter.vue'
import Layout from './Layout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Quiz', Quiz)
    app.component('FillBlank', FillBlank)
    app.component('MultiFillBlank', MultiFillBlank)
    app.component('Reveal', Reveal)
    app.component('CompareCard', CompareCard)
    app.component('TagFilter', TagFilter)
    app.component('ProgressDashboard', ProgressDashboard)
    app.component('Mermaid', Mermaid)
  }
} satisfies Theme
