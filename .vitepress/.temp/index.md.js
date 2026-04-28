import { useSSRContext, unref } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { w as withBase } from "./Content.DN7lV9yp.js";
import "@vueuse/core";
const __pageData = JSON.parse('{"title":"OS Notes Web","description":"","frontmatter":{"title":"OS Notes Web","tags":["index"],"difficulty":"overview","review":"2026-04-26T00:00:00.000Z"},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":1777281319000}');
const __default__ = { name: "index.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="os-notes-web" tabindex="-1">OS Notes Web <a class="header-anchor" href="#os-notes-web" aria-label="Permalink to &quot;OS Notes Web&quot;">​</a></h1><div class="os-home-hero"><img class="os-home-hero__logo"${ssrRenderAttr("src", unref(withBase)("/logo-round.png"))} alt="OS Notes Web logo"><div><p class="os-home-hero__eyebrow">Operating Systems Study Notes</p><p class="os-home-hero__lead">面向复习、实验和概念辨析的操作系统学习笔记。内容以 Markdown 为主线，配合题目、知识地图和本地学习进度，帮助你把零散概念串成可复盘的结构。</p><div class="os-home-hero__actions"><a class="os-button" href="./knowledge-map">知识结构</a><a class="os-button os-button--secondary" href="./progress">学习进度</a></div></div></div><div class="os-stat-grid"><article class="os-stat"><strong>3</strong><span>主题模块</span></article><article class="os-stat"><strong>14+</strong><span>笔记页面</span></article><article class="os-stat"><strong>题库</strong><span>单选与填空练习</span></article></div><h2 id="学习入口" tabindex="-1">学习入口 <a class="header-anchor" href="#学习入口" aria-label="Permalink to &quot;学习入口&quot;">​</a></h2><div class="os-card-grid"><a class="os-card" href="./OS%20Boot/main"><span class="os-card__meta">Boot</span><strong>OS Boot</strong><p>从机器启动、引导加载到程序运行过程，建立系统从上电到执行用户程序的整体视角。</p></a><a class="os-card" href="./%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86/main"><span class="os-card__meta">Memory</span><strong>内存管理</strong><p>覆盖分页、分段、虚拟内存、请求分页和页表自映射，是考试与实验都很高频的模块。</p></a><a class="os-card" href="./%E8%BF%9B%E7%A8%8B%E4%B8%8E%E7%BA%BF%E7%A8%8B/main"><span class="os-card__meta">Concurrency</span><strong>进程与线程</strong><p>围绕进程状态、线程模型、同步互斥和经典并发问题，整理并发执行的核心约束。</p></a></div><h2 id="辅助入口" tabindex="-1">辅助入口 <a class="header-anchor" href="#辅助入口" aria-label="Permalink to &quot;辅助入口&quot;">​</a></h2><ul><li><a href="./knowledge-map.html">知识地图</a>：从整体结构定位概念关系。</li><li><a href="./exams.html">期中考试真题</a>：打开或下载已收录的期中试题 PDF。</li><li><a href="./addition-review.html">补充综合测试</a>：集中复盘这次补充整理出来的易错题。</li><li><a href="./resources.html">推荐资料</a>：补充教材、课程和实验参考链接。</li><li><a href="./progress.html">学习进度</a>：查看本地阅读、做题和错题记录。</li><li><a href="https://github.com/rippor911/os-easy-note" target="_blank" rel="noreferrer">GitHub repository</a>：反馈错误或补充内容。</li></ul></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
