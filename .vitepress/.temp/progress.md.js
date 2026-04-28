import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"学习进度","description":"","frontmatter":{"title":"学习进度","tags":["review"],"difficulty":"dashboard","review":"2026-04-26T00:00:00.000Z"},"headers":[],"relativePath":"progress.md","filePath":"progress.md","lastUpdated":1777187605000}');
const _sfc_main = { name: "progress.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ProgressDashboard = resolveComponent("ProgressDashboard");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="学习进度" tabindex="-1">学习进度 <a class="header-anchor" href="#学习进度" aria-label="Permalink to &quot;学习进度&quot;">​</a></h1>`);
  _push(ssrRenderComponent(_component_ProgressDashboard, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("progress.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const progress = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  progress as default
};
