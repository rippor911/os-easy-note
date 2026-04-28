import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"段式管理","description":"","frontmatter":{},"headers":[],"relativePath":"内存管理/3_3 段式管理.md","filePath":"内存管理/3_3 段式管理.md","lastUpdated":1776392676000}');
const _sfc_main = { name: "内存管理/3_3 段式管理.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="段式管理" tabindex="-1">段式管理 <a class="header-anchor" href="#段式管理" aria-label="Permalink to &quot;段式管理&quot;">​</a></h1></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("内存管理/3_3 段式管理.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _3_3_____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _3_3_____ as default
};
