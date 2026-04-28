import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"推荐资料","description":"","frontmatter":{"title":"推荐资料","tags":["resources"],"difficulty":"overview","review":"2026-04-27T00:00:00.000Z"},"headers":[],"relativePath":"resources.md","filePath":"resources.md","lastUpdated":1777281319000}');
const _sfc_main = { name: "resources.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="推荐资料" tabindex="-1">推荐资料 <a class="header-anchor" href="#推荐资料" aria-label="Permalink to &quot;推荐资料&quot;">​</a></h1><p>这些链接用于补充阅读和实验参考。数量先保持少，后续可以按章节继续细分。</p><h2 id="教材与讲义" tabindex="-1">教材与讲义 <a class="header-anchor" href="#教材与讲义" aria-label="Permalink to &quot;教材与讲义&quot;">​</a></h2><ul><li><a href="https://pages.cs.wisc.edu/~remzi/OSTEP/" target="_blank" rel="noreferrer">Operating Systems: Three Easy Pieces</a>：免费在线操作系统教材，主线是虚拟化、并发和持久化，适合作为概念复习的外部参考。</li><li><a href="https://pdos.csail.mit.edu/6.1810/2025/schedule.html" target="_blank" rel="noreferrer">MIT 6.1810: Operating System Engineering</a>：MIT 操作系统工程课程，包含课程安排、讲义、作业和实验入口。</li><li><a href="https://pdos.csail.mit.edu/6.828/xv6" target="_blank" rel="noreferrer">xv6: a simple Unix-like teaching operating system</a>：xv6 教学操作系统主页，适合结合启动、系统调用、页表、陷入和调度内容阅读源码。</li><li><a href="https://docs.kernel.org/" target="_blank" rel="noreferrer">The Linux Kernel documentation</a>：Linux 内核官方文档，适合在学完基础概念后查阅真实内核中的 API、子系统和架构说明。</li></ul><h2 id="使用建议" tabindex="-1">使用建议 <a class="header-anchor" href="#使用建议" aria-label="Permalink to &quot;使用建议&quot;">​</a></h2><ul><li>先用本站笔记建立章节框架，再用 OSTEP 补足概念解释。</li><li>做实验或看源码时优先查 MIT 6.1810 和 xv6 资料。</li><li>Linux 官方文档更适合验证真实系统实现，不建议在第一次复习时从头读。</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const resources = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  resources as default
};
