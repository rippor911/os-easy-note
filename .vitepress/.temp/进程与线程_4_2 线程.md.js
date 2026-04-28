import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/assets/image-1.xQ7SJKtQ.png";
const _imports_1 = "/assets/image-2.BeiK-9Ra.png";
const __pageData = JSON.parse('{"title":"线程","description":"","frontmatter":{},"headers":[],"relativePath":"进程与线程/4_2 线程.md","filePath":"进程与线程/4_2 线程.md","lastUpdated":1777187605000}');
const _sfc_main = { name: "进程与线程/4_2 线程.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_QuizSet = resolveComponent("QuizSet");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="线程" tabindex="-1">线程 <a class="header-anchor" href="#线程" aria-label="Permalink to &quot;线程&quot;">​</a></h1><p><strong>进程的问题：</strong> 不同进程间通信（互换数据）开销大，无法有效处理需要紧密协作的多任务。</p><h2 id="线程的提出" tabindex="-1">线程的提出 <a class="header-anchor" href="#线程的提出" aria-label="Permalink to &quot;线程的提出&quot;">​</a></h2><p>实际上，进程包含了两个概念 • 资源拥有者 • 可执行单元</p><p>现代操作系统将资源拥有者称为进程（process, task），将可执行单元称为线程（Thread）。</p><p><strong>多线程的优势：</strong></p><ul><li>并发粒度更细（任务级并行）、并发性更好，线程可提高进程内的并发程度</li><li>线程间可以共享资源，例如运行状态、上下文（如：程序计数器）、执行栈</li><li>由于资源共享，有效减少了创建/撤销/切换/同步等所造成的开销，创建一个线程比一个进程快 10-100 倍</li><li>对于<strong>存在大量计算和大量I/O处理</strong>的应用，大幅度提高性能</li></ul><div class="caution custom-block github-alert"><p class="custom-block-title">CAUTION</p><p><strong>多线程的弱势场景</strong> 使用多线程主要是为了让那些不需要依赖 I/O 等条件就能执行的任务，在需要等待 I/O 等条件的任务被阻塞时，仍然能够运行，不浪费 CPU 资源 当<strong>I/O 等处理很少</strong>的情况下，多线程相比单线程并没有很大优势，反而可能因为线程的创建、切换、撤销等需要一定时间而性能下降</p></div><h2 id="线程的实现方式" tabindex="-1">线程的实现方式 <a class="header-anchor" href="#线程的实现方式" aria-label="Permalink to &quot;线程的实现方式&quot;">​</a></h2><p><strong>分类：</strong></p><ul><li>用户级线程：User level threads(ULT)</li><li>内核级线程：Kernel level threads (KLT)</li><li>混合实现方式</li></ul><h3 id="用户级线程" tabindex="-1">用户级线程 <a class="header-anchor" href="#用户级线程" aria-label="Permalink to &quot;用户级线程&quot;">​</a></h3><p>线程在用户空间,通过用户态线程库 library 模拟的 thread ,不需要或仅需要极少的 kernel 支持</p><p>上下文切换比较快,因为不用更改 page table 等,使用起来较为轻便快速</p><p>提供操控视窗系统的较好的解决方案</p><p>POSIX Pthreads：用于线程创建和同步的 POSIX 标准 API(IEEE 1003.1c)</p><p><img${ssrRenderAttr("src", _imports_0)} alt="典型的 Pthreads API"></p><p><strong>优点：</strong></p><ol><li>线程切换与内核无关</li><li>线程调度由应用决定，容易优化</li><li>可运行在任何操作系统上，只要线程库支持</li></ol><p><strong>缺点：</strong></p><ol><li>很多系统调用会引起阻塞，而系统会因此阻塞这个进程的所有用户级线程</li><li>内核只能把处理器分配给进程，即使有多个处理器也无法实现一个进程中的多个线程并行执行</li></ol><h3 id="内核级线程" tabindex="-1">内核级线程 <a class="header-anchor" href="#内核级线程" aria-label="Permalink to &quot;内核级线程&quot;">​</a></h3><p>内核级线程就是 kernel 有好几个分身,一个分身可以处理一件事</p><p>这用来处理非同步事件很有用, kernel可以对每个非同步事件产生一个分身来处理</p><p>支持内核线程的操作系统内核称作多线程内核</p><p><strong>优点：</strong></p><ol><li>内核可以在多个处理器上调度一个进程的多个线程实现同步并行执行</li><li>阻塞发生在线程级别</li><li>内核可以实现一些多线程处理</li></ol><p><strong>缺点：</strong></p><ol><li>一个进程中的线程切换需要内核参与，线程的切换涉及到两个模式的切换（进程-进程、线程-线程）</li><li>内核级线程的管理开销大于用户级线程，因此操作效率较低；但在阻塞频繁或需要并行处理的环境中，其调度性能和吞吐能力更优。</li></ol><p><strong>线程操作的延迟-μs</strong></p><p><img${ssrRenderAttr("src", _imports_1)} alt="线程操作的延迟-μs"></p><h3 id="用户级线程和内核级线程的比较" tabindex="-1">用户级线程和内核级线程的比较 <a class="header-anchor" href="#用户级线程和内核级线程的比较" aria-label="Permalink to &quot;用户级线程和内核级线程的比较&quot;">​</a></h3><ul><li><strong>OS 感知性：</strong>内核级线程是 OS 内核可感知的；用户级线程是 OS 内核不可感知的（可感知意味着内核知道存在并将其作为管理对象）</li><li><strong>实现方：</strong>用户级线程由语言或者用户库这一级处理；内核级线程由 OS 内核提供支持，与进程的创建、撤销、调度大体相同</li><li><strong>阻塞：</strong>用户级线程会因为所属进程阻塞而其下所有用户级线程都阻塞；而内核级线程阻塞只会导致该线程阻塞</li><li><strong>权限：</strong>用户级线程的程序实体是运行在用户态下的程序，而内核级线程的程序实体则是可以运行在任何状态下的程序</li></ul><h3 id="混合线程实现" tabindex="-1">混合线程实现 <a class="header-anchor" href="#混合线程实现" aria-label="Permalink to &quot;混合线程实现&quot;">​</a></h3><p>下面采用 用户级-to-内核级 来区分模型</p><p><strong>Many-to-One</strong> ：</p><p>从内核级线程的视角来看，相当于只有用户级线程，因此具有仅用户级线程系统的优缺点</p><p><strong>One-to-one</strong> ：</p><p>事实上相当于仅内核级线程系统，拥有相应的优缺点</p><p><strong>Many-to-many</strong>：</p><p>在多对一模型和一对一模型中取了个折中，克服了多对一模型的并发度不高的缺点，又克服了一对一模型的一个用户进程占用太多内核级线程，开销太大的缺点。又拥有多对一模型和一对一模型各自的优点（有一定磨损）。</p><p>缺点是实现复杂度较高</p><h2 id="思考题" tabindex="-1">思考题 <a class="header-anchor" href="#思考题" aria-label="Permalink to &quot;思考题&quot;">​</a></h2><ol><li>什么情况下不适合用多线程？</li></ol><h2 id="交互式复习题" tabindex="-1">交互式复习题 <a class="header-anchor" href="#交互式复习题" aria-label="Permalink to &quot;交互式复习题&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_QuizSet, {
    collection: "process",
    title: "线程练习",
    description: "覆盖线程引入、用户级线程、内核级线程和混合实现方式。",
    "question-ids": [
      "process-thread-02",
      "process-thread-03",
      "process-thread-04",
      "process-thread-05",
      "process-thread-06",
      "process-thread-07",
      "process-thread-08",
      "process-thread-09"
    ]
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("进程与线程/4_2 线程.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _4_2___ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _4_2___ as default
};
