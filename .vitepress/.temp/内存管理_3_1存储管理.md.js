import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"存储管理","description":"","frontmatter":{},"headers":[],"relativePath":"内存管理/3_1存储管理.md","filePath":"内存管理/3_1存储管理.md","lastUpdated":1777187605000}');
const _sfc_main = { name: "内存管理/3_1存储管理.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_QuizSet = resolveComponent("QuizSet");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="存储管理" tabindex="-1">存储管理 <a class="header-anchor" href="#存储管理" aria-label="Permalink to &quot;存储管理&quot;">​</a></h1><h2 id="一、背景" tabindex="-1">一、背景： <a class="header-anchor" href="#一、背景" aria-label="Permalink to &quot;一、背景：&quot;">​</a></h2><ul><li>一般而言，存储空间越大，访问所需时间越长</li><li>内存性能的提升速度落后于CPU</li><li><strong>最佳状态</strong> 应是各层次的存储器都处于均衡的繁忙状态</li></ul><h2 id="二、基本机制-抽象" tabindex="-1">二、基本机制：抽象 <a class="header-anchor" href="#二、基本机制-抽象" aria-label="Permalink to &quot;二、基本机制：抽象&quot;">​</a></h2><p><strong>地址空间：</strong> 一个进程所能够用于访问内存的地址集合</p><p><strong>逻辑地址</strong> （虚拟地址）：程序所使用的地址</p><p><strong>物理地址：</strong> 物理内存中数据存储的地址</p><p><strong>原则：</strong> 独立（程序只需管虚拟地址） + 保护（其他程序无法访问本程序的地址空间）</p><h2 id="三、功能" tabindex="-1">三、功能 <a class="header-anchor" href="#三、功能" aria-label="Permalink to &quot;三、功能&quot;">​</a></h2><ul><li><strong>存储分配和回收</strong> ：存储管理的主要内容</li><li><strong>地址变换</strong> ：可执行文件生成中的链接技术、程序加载时的重定位技术，进程运行时硬件和软件的地址变换技术和机制</li><li><strong>存储共享和保护</strong> ：代码和数据共享，对地址空间的访问权限（读、写、执行）</li><li><strong>存储器扩充</strong> ：涉及存储器的逻辑组织和物理组织</li></ul><p>由应用程序控制：覆盖；</p><p>由OS控制：交换（整个进程空间），请求调入和预调入（部分进程空间）</p><h2 id="四、方法" tabindex="-1">四、方法 <a class="header-anchor" href="#四、方法" aria-label="Permalink to &quot;四、方法&quot;">​</a></h2><p>引入碎片概念为评价优劣提供参考：</p><ul><li><p><strong>碎片：</strong> 内存中无法被利用的存储空间</p></li><li><p><strong>内碎片：</strong> 指分配给作业的存储空间中未被利用的部分</p></li><li><p><strong>外碎片：</strong> 系统中无法利用的小的空闲分区，是造成内存系统性能下降的主因</p></li><li><p>单道程序：静态地址，速度快，但是大程序无法加载，浪费资源</p></li><li><p>多道程序：分区式分配，固定（静态）分区 or 可变（动态）分区</p></li></ul><table tabindex="0"><thead><tr><th></th><th>优点</th><th>缺点</th><th>方法</th></tr></thead><tbody><tr><td>固定分区</td><td>易于实现，开销小</td><td><strong>内碎片</strong> 造成浪费，分区总数固定，限制并发数</td><td>单一队列，多队列</td></tr><tr><td>动态分区</td><td>分区大小按需确定，通常内存利用率较高，无内碎片</td><td>有外碎片；若把过小剩余空间一并分配</td><td>空闲分区表，空闲分区链</td></tr></tbody></table><p><strong>分区分配操作：</strong> 根据具体算法选出一个足够大的空闲分区。若剩余空间不小于最小分区阈值，则拆成“已分配区 + 剩余空闲区”；若剩余空间太小，则把整块分配给请求者，以避免产生难以管理的外碎片。</p><p><strong>分区回收操作：</strong> 若有相邻空闲分区，则合并；否则，新建表项放入空闲分区表</p><p>下面是 <strong>基于顺序搜索的分配算法</strong> ：</p><table tabindex="0"><thead><tr><th></th><th>定义</th><th>说明</th></tr></thead><tbody><tr><td>首次适应（First Fit）</td><td>每次从头找第一个满足的空闲区</td><td>实现简单，查找通常较快；低地址端容易留下许多小空闲区</td></tr><tr><td>下次适应（Next Fit）</td><td>从上次查找结束的地方找下一个满足空闲区</td><td>搜索位置较均匀，但可能破坏较大的空闲区</td></tr><tr><td>最佳适应（Best Fit）</td><td>总是找最小的满足空闲区（即≥且最接近）</td><td>单次剩余最小，但容易产生很多难以利用的小外碎片，查找开销较大</td></tr><tr><td>最坏适应（Worst Fit）</td><td>总是找最大的空闲区</td><td>试图保留较大的剩余块，但会较快消耗大空闲区</td></tr></tbody></table><p>下面是 <strong>基于索引搜索的分配算法</strong> ：</p><table tabindex="0"><thead><tr><th></th><th>定义</th><th>说明</th></tr></thead><tbody><tr><td>快速适应（分类搜索）</td><td>常用大小的空闲区设立单独的空闲区链表，为多个空闲链表设立管理索引表</td><td>分配速度快；回收合并较复杂，可能造成空间浪费或碎片</td></tr><tr><td>伙伴系统（buddy system）</td><td>按 2 的幂大小管理空闲块，分配时递归拆分，回收时与空闲伙伴合并</td><td>地址计算和合并方便；因按 2 的幂取整，可能产生内碎片</td></tr></tbody></table><p><strong>紧凑技术（Compaction）：</strong></p><ul><li><p>通过移动作业，把多个分散的小分区拼接成一个大分区的方法</p></li><li><p>目标：消除外碎片</p></li><li><p>时机：大作业请求时，找不到大空闲分区，但空闲分区总容量足够</p></li><li><p>方法：动态重定位</p></li></ul><p><strong>多重分区分配：</strong> 为了支持结构化程序设计，操作系统往往把一道作业分成若干片段，这样，片段之间不需要连续</p><p><strong>分区的存储保护：</strong></p><ul><li>界限寄存器方法：如上下界、基址、限长</li><li>存储保护键方法：存储块（锁）+ 作业（钥匙）</li></ul><h2 id="五、覆盖交换技术" tabindex="-1">五、覆盖交换技术 <a class="header-anchor" href="#五、覆盖交换技术" aria-label="Permalink to &quot;五、覆盖交换技术&quot;">​</a></h2><p><strong>问题：</strong> 程序可能大于实际可用内存，且程序运行过程可能会增长需要的空间，或系统希望在有限内存中容纳更多并发进程</p><p><strong>解决方案：</strong> <strong>覆盖</strong>与<strong>交换</strong> 技术</p><blockquote><p>覆盖与交换可以解决在小的内存空间运行大作业的问题，是“扩充”内存容量和提高内存利用率的有效措施。</p></blockquote><p><strong>覆盖（Overlay）：</strong></p><ul><li>定义：把一个程序划分为一系列功能相对独立的程序段，让执行时不要求同时装入内存的程序段组成一组覆盖段，共享主存同一区域的内存扩充技术</li><li>说明：早期 OS 使用，从时间维度扩充空间</li><li>缺点：对用户不透明，增加用户负担（用户必须考虑如何划分覆盖段）</li></ul><p><strong>交换（Swapping）：</strong></p><ul><li>定义：把暂时不能运行或短期不用的进程地址空间从主存移到辅存，需要运行时再换入主存并恢复执行</li><li>优点：增加并发程序数；给用户提供适当响应时间；不影响程序结构（用户无需操心）</li><li>缺点：增加系统开销和磁盘 I/O 开销；对程序整个地址空间传送，忽略地址访问的统计特性（例如局部性原理等）</li><li>选择原则：优先考虑阻塞、优先级低、短期不会运行的进程；正在进行 I/O 且 I/O 缓冲区在用户空间的进程不宜直接换出</li><li>交换时机：内存空间不足，且存在合适的换出对象时</li><li>工作：保存进程状态和必要控制信息，为换入进程准备运行环境</li></ul><table tabindex="0"><thead><tr><th></th><th>覆盖</th><th>交换</th></tr></thead><tbody><tr><td>作用范围</td><td>减少一个程序同时驻留内存的空间</td><td>可让整个进程地址空间暂存于外存，让出空间</td></tr><tr><td>实现方式</td><td>由程序员指定覆盖结构</td><td>不需要程序员给出覆盖结构</td></tr><tr><td>作用对象</td><td>同一作业或程序</td><td>作业之间或进程之间</td></tr></tbody></table><h2 id="六、交互式复习题" tabindex="-1">六、交互式复习题 <a class="header-anchor" href="#六、交互式复习题" aria-label="Permalink to &quot;六、交互式复习题&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_QuizSet, {
    collection: "memory",
    title: "存储管理基础练习",
    description: "覆盖存储抽象、内存分配、覆盖与交换等基础判断。",
    "question-ids": [
      "memory-storage-01",
      "memory-storage-02",
      "memory-storage-03",
      "memory-storage-04",
      "memory-storage-05",
      "memory-storage-06",
      "memory-storage-07",
      "memory-storage-08",
      "memory-storage-09",
      "memory-storage-10"
    ]
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("内存管理/3_1存储管理.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _3_1____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _3_1____ as default
};
