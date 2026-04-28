import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"虚拟内存管理","description":"","frontmatter":{},"headers":[],"relativePath":"内存管理/3_4 虚拟内存管理.md","filePath":"内存管理/3_4 虚拟内存管理.md","lastUpdated":1777187605000}');
const _sfc_main = { name: "内存管理/3_4 虚拟内存管理.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_QuizSet = resolveComponent("QuizSet");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="虚拟内存管理" tabindex="-1">虚拟内存管理 <a class="header-anchor" href="#虚拟内存管理" aria-label="Permalink to &quot;虚拟内存管理&quot;">​</a></h1><h2 id="局部性原理" tabindex="-1">局部性原理 <a class="header-anchor" href="#局部性原理" aria-label="Permalink to &quot;局部性原理&quot;">​</a></h2><p><strong>时间局部性</strong> ：即一条指令的一次执行和下次执行，一个数据的一次访问和下次访问都集中在一段较短时间内</p><p><strong>空间局部性</strong> ：即当前指令和邻近的几条指令，当前访问的数据和邻近的数据都集中在一个较小区域内</p><h2 id="虚拟内存" tabindex="-1">虚拟内存 <a class="header-anchor" href="#虚拟内存" aria-label="Permalink to &quot;虚拟内存&quot;">​</a></h2><p>虚拟内存是计算机系统存储管理的一种技术。它为<strong>每个进程</strong>提供了一个<strong>大的、一致的、连续可用的和私有的地址空间</strong>（一个连续完整的地址空间）</p><p>作用：</p><ol><li>给所有进程提供 <strong>一致的地址空间</strong> ，每个进程都认为自己在独占使用单机系统的存储资源；</li><li><strong>保护每个进程的地址空间</strong> 不被其他进程破坏，隔离了进程的地址访问；</li><li>根据缓存原理，上层存储是下层存储的缓存， <strong>虚拟内存把主存作为磁盘的高速缓存</strong> ，在主存和磁盘之间根据需要来回传送数据，高效地使用了主存；</li></ol><p>思路：</p><ul><li>借鉴覆盖技术 → 用时放入内存，但是由操作系统完成；不需要程序员设置覆盖段</li><li>借鉴交换技术 → 实现内存外存之间的交换，获得更多空闲内存空间；但粒度更细</li></ul><p><strong>基本流程：</strong></p><p>检查当前程序是否在内存中 → 若不在，发生缺页错误，请求调入 → OS 采取策略替换，继续执行程序</p><h2 id="虚拟存储技术的特征" tabindex="-1">虚拟存储技术的特征 <a class="header-anchor" href="#虚拟存储技术的特征" aria-label="Permalink to &quot;虚拟存储技术的特征&quot;">​</a></h2><ul><li><strong>离散性：</strong> 物理内存分配的不连续，虚拟地址空间使用的不连续</li><li><strong>多次性：</strong> 作业被分成多次调入内存运行（区别于其他存储器最重要的特征）</li><li><strong>对换性：</strong> 允许在作业运行过程中换进、换出</li><li><strong>虚拟性：</strong> 允许逻辑访问，不考虑物理内存上的空间容量</li></ul><h2 id="虚拟存储技术的优劣" tabindex="-1">虚拟存储技术的优劣 <a class="header-anchor" href="#虚拟存储技术的优劣" aria-label="Permalink to &quot;虚拟存储技术的优劣&quot;">​</a></h2><h3 id="优点" tabindex="-1">优点 <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点&quot;">​</a></h3><ul><li>可用较小物理内存执行较大用户程序（只为实际使用的程序分配内存）</li><li>可容纳更多程序并发执行（独立地址空间）</li><li>不必影响编程时程序结构（与覆盖对比）</li></ul><h3 id="缺点" tabindex="-1">缺点 <a class="header-anchor" href="#缺点" aria-label="Permalink to &quot;缺点&quot;">​</a></h3><ul><li>代价：牺牲CPU处理时间及内外存交换时间</li><li>限制：虚拟内存最大容量由计算机地址结构决定</li></ul><h2 id="与cache-主存机制的异同" tabindex="-1">与Cache-主存机制的异同 <a class="header-anchor" href="#与cache-主存机制的异同" aria-label="Permalink to &quot;与Cache-主存机制的异同&quot;">​</a></h2><h3 id="相同点" tabindex="-1">相同点 <a class="header-anchor" href="#相同点" aria-label="Permalink to &quot;相同点&quot;">​</a></h3><ol><li><strong>出发点：</strong> 为提高存储系统性价比构造的分层存储体系</li><li><strong>原理：</strong> 利用局部性原理，把常用信息块从慢速大容量存储器调入高速小容量存储器</li></ol><h3 id="不同点" tabindex="-1">不同点 <a class="header-anchor" href="#不同点" aria-label="Permalink to &quot;不同点&quot;">​</a></h3><ol><li>侧重点：cache 主要解决主存与 CPU 速度差异问题；虚存主要解决存储容量、存储管理、主存分配和存储保护等问题</li><li>数据通路：cache miss 可以直接访问主存；虚存发生缺页错误需要调页解决，最终还要访问主存</li><li>透明性： cache完全由硬件完成；虚存管理由 OS 和硬件共同完成</li><li>未命中时损失： 主存未命中时损失远大于cache未命中（速度差异问题）</li></ol><h2 id="关键问题" tabindex="-1">关键问题 <a class="header-anchor" href="#关键问题" aria-label="Permalink to &quot;关键问题&quot;">​</a></h2><p>虚存需要解决的关键问题如下：</p><ol><li><strong>地址映射问题：</strong> 地址如何 <strong>映射</strong> ？</li><li><strong>调入问题：</strong> 哪些程序和数据应被 <strong>调入</strong> 主存？何时调入？</li><li><strong>替换问题：</strong> 哪些程序和数据应被 <strong>调出</strong> 主存？</li><li><strong>更新问题：</strong> 如何确保主存和辅存的一致性？ （ <strong>更新</strong> 问题）</li><li><strong>其他问题：</strong> 存储保护、程序重定位。</li></ol><h2 id="交互式复习题" tabindex="-1">交互式复习题 <a class="header-anchor" href="#交互式复习题" aria-label="Permalink to &quot;交互式复习题&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_QuizSet, {
    collection: "memory",
    title: "虚拟内存管理练习",
    description: "覆盖局部性原理、虚拟存储特征、Cache 对比和关键实现问题。",
    "question-ids": [
      "memory-virtual-01",
      "memory-virtual-02",
      "memory-virtual-03",
      "memory-virtual-04",
      "memory-virtual-05",
      "memory-virtual-06",
      "memory-virtual-07",
      "memory-virtual-08",
      "memory-virtual-09",
      "memory-virtual-10",
      "memory-virtual-11",
      "memory-virtual-12"
    ]
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("内存管理/3_4 虚拟内存管理.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _3_4_______ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _3_4_______ as default
};
