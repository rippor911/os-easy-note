import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"期中考试真题","description":"","frontmatter":{"title":"期中考试真题","tags":["exam","midterm"],"difficulty":"overview","review":"2026-04-26T00:00:00.000Z"},"headers":[],"relativePath":"exams.md","filePath":"exams.md","lastUpdated":1777195480000}');
const _sfc_main = { name: "exams.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ExamPaper = resolveComponent("ExamPaper");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="期中考试真题" tabindex="-1">期中考试真题 <a class="header-anchor" href="#期中考试真题" aria-label="Permalink to &quot;期中考试真题&quot;">​</a></h1><p>这里整理已收录的操作系统期中真题，适合作为整章复习后的限时自测材料。</p><h2 id="_2025-期中考试交互版" tabindex="-1">2025 期中考试交互版 <a class="header-anchor" href="#_2025-期中考试交互版" aria-label="Permalink to &quot;2025 期中考试交互版&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_ExamPaper, null, null, _parent));
  _push(`<h2 id="错题记录如何保存" tabindex="-1">错题记录如何保存 <a class="header-anchor" href="#错题记录如何保存" aria-label="Permalink to &quot;错题记录如何保存&quot;">​</a></h2><p>这个站点没有账号系统，错题和阅读进度保存在浏览器的 <code>localStorage</code> 中。</p><p>这意味着记录只属于当前浏览器和当前站点地址：换设备、换浏览器、无痕模式、清理站点数据，都会看不到原来的记录。它适合个人本地复习，不适合作为跨设备同步的学习档案。</p><h2 id="原卷-pdf" tabindex="-1">原卷 PDF <a class="header-anchor" href="#原卷-pdf" aria-label="Permalink to &quot;原卷 PDF&quot;">​</a></h2><ul><li><a href="./exams/2025-midterm-v3.pdf">打开 PDF</a></li><li>原文件：<code>2025期中考试-v3-试题.pdf</code></li><li>规格：9 页，A4，约 319 KiB</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("exams.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const exams = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  exams as default
};
