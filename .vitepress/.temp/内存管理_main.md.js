import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"内存管理","description":"","frontmatter":{"title":"内存管理","tags":["memory"]},"headers":[],"relativePath":"内存管理/main.md","filePath":"内存管理/main.md","lastUpdated":1777187605000}');
const _sfc_main = { name: "内存管理/main.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="内存管理" tabindex="-1">内存管理 <a class="header-anchor" href="#内存管理" aria-label="Permalink to &quot;内存管理&quot;">​</a></h1><div class="os-chapter-hero os-chapter-hero--memory"><p class="os-chapter-hero__eyebrow">Address Space</p><p>这一章围绕一个核心问题展开：程序看到的地址如何被操作系统和硬件转换成真实内存访问。分页、分段、虚拟内存和缺页处理都服务于这个问题。</p></div><h2 id="学习顺序" tabindex="-1">学习顺序 <a class="header-anchor" href="#学习顺序" aria-label="Permalink to &quot;学习顺序&quot;">​</a></h2><ol class="os-path"><li><a href="./3_1%E5%AD%98%E5%82%A8%E7%AE%A1%E7%90%86">存储管理</a><span>先理解内存管理要解决的抽象、分配和交换问题。</span></li><li><a href="./3_2%20%E9%A1%B5%E5%BC%8F%E7%AE%A1%E7%90%86%E5%9F%BA%E7%A1%80">页式管理基础</a><span>掌握页、页框、页表和地址划分。</span></li><li><a href="./3_3%20%E6%AE%B5%E5%BC%8F%E7%AE%A1%E7%90%86">段式管理</a><span>对比分页与分段，抓住逻辑单位和离散分配的差异。</span></li><li><a href="./3_4%20%E8%99%9A%E6%8B%9F%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86">虚拟内存管理</a><span>用局部性原理理解为什么可以按需装入。</span></li><li><a href="./3_5%20%E8%AF%B7%E6%B1%82%E5%BC%8F%E5%88%86%E9%A1%B5%E7%B3%BB%E7%BB%9F">请求式分页系统</a><span>重点看缺页异常、页面置换和调页策略。</span></li><li><a href="./3_6%20%E9%A1%B5%E8%A1%A8%E8%87%AA%E6%98%A0%E5%B0%84">页表自映射</a><span>把多级页表的地址转换推导落到可计算地址上。</span></li></ol><h2 id="高频辨析" tabindex="-1">高频辨析 <a class="header-anchor" href="#高频辨析" aria-label="Permalink to &quot;高频辨析&quot;">​</a></h2><div class="os-card-grid os-card-grid--compact"><article class="os-card"><span class="os-card__meta">TLB</span><strong>TLB miss 不是缺页</strong><p>TLB miss 只说明快表没有缓存映射；缺页才说明页表项无法直接完成访问。</p></article><article class="os-card"><span class="os-card__meta">Page Fault</span><strong>缺页处理是异常路径</strong><p>缺页通常需要陷入内核，可能触发磁盘 I/O、页面置换和页表更新。</p></article></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("内存管理/main.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const main = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  main as default
};
