import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"补充综合测试","description":"","frontmatter":{"title":"补充综合测试","tags":["exam","tricky","review"],"difficulty":"medium","review":"2026-04-28T00:00:00.000Z"},"headers":[],"relativePath":"addition-review.md","filePath":"addition-review.md","lastUpdated":null}');
const _sfc_main = { name: "addition-review.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AdditionReviewPaper = resolveComponent("AdditionReviewPaper");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="补充综合测试" tabindex="-1">补充综合测试 <a class="header-anchor" href="#补充综合测试" aria-label="Permalink to &quot;补充综合测试&quot;">​</a></h1><p>这一页把 <code>local_temp/addition.md</code> 中整理出的易错题汇总成一套补充测试，当前已经覆盖内存管理、进程基础，以及新补进来的同步与互斥错题，适合在复习完相关章节后集中回查。</p><h2 id="使用说明" tabindex="-1">使用说明 <a class="header-anchor" href="#使用说明" aria-label="Permalink to &quot;使用说明&quot;">​</a></h2><ul><li>单选、多选题可直接点选后提交。</li><li>部分原题的完整选项文本没有保留，只能按老师原题的选项字母回忆作答；这些题在页面里已单独标注。</li><li>每题提交后立即显示标准答案和解析，同时会进入本地做题/错题记录。</li></ul>`);
  _push(ssrRenderComponent(_component_AdditionReviewPaper, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("addition-review.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const additionReview = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  additionReview as default
};
