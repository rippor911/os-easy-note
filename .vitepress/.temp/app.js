import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrRenderVNode, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderStyle, renderToString } from "vue/server-renderer";
import { defineComponent, mergeProps, useSSRContext, computed, unref, ref, watch, onMounted, watchEffect, watchPostEffect, onUnmounted, onUpdated, resolveComponent, shallowRef, createVNode, resolveDynamicComponent, withCtx, renderSlot, createTextVNode, toDisplayString, inject, openBlock, createBlock, createCommentVNode, readonly, nextTick, Fragment, renderList, defineAsyncComponent, provide, toHandlers, withKeys, onBeforeUnmount, useSlots, h, createSSRApp } from "vue";
import { u as useData$1, i as isExternal, t as treatAsHtml, w as withBase, a as isActive, g as getScrollOffset, o as onContentUpdated, E as EXTERNAL_URL_RE, b as useRoute, c as inBrowser, d as createTitle, m as mergeHead, p as pathToFile, R as RouterSymbol, e as initData, f as dataSymbol, C as Content, s as siteDataRef, h as createRouter } from "./Content.DN7lV9yp.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import { useMediaQuery, useWindowSize, onKeyStroke, useWindowScroll, useScrollLock } from "@vueuse/core";
const _sfc_main$1h = /* @__PURE__ */ defineComponent({
  __name: "VPBadge",
  __ssrInlineRender: true,
  props: {
    text: {},
    type: { default: "tip" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["VPBadge", __props.type]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`${ssrInterpolate(__props.text)}`);
      }, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$1h = _sfc_main$1h.setup;
_sfc_main$1h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPBadge.vue");
  return _sfc_setup$1h ? _sfc_setup$1h(props, ctx) : void 0;
};
const _sfc_main$1g = /* @__PURE__ */ defineComponent({
  __name: "VPBackdrop",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPBackdrop" }, _attrs))} data-v-c79a1216></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1g = _sfc_main$1g.setup;
_sfc_main$1g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPBackdrop.vue");
  return _sfc_setup$1g ? _sfc_setup$1g(props, ctx) : void 0;
};
const VPBackdrop = /* @__PURE__ */ _export_sfc(_sfc_main$1g, [["__scopeId", "data-v-c79a1216"]]);
const useData = useData$1;
function throttleAndDebounce(fn, delay) {
  let timeoutId;
  let called = false;
  return () => {
    if (timeoutId)
      clearTimeout(timeoutId);
    if (!called) {
      fn();
      (called = true) && setTimeout(() => called = false, delay);
    } else
      timeoutId = setTimeout(fn, delay);
  };
}
function ensureStartingSlash(path) {
  return path.startsWith("/") ? path : `/${path}`;
}
function normalizeLink$1(url) {
  const { pathname, search, hash, protocol } = new URL(url, "http://a.com");
  if (isExternal(url) || url.startsWith("#") || !protocol.startsWith("http") || !treatAsHtml(pathname))
    return url;
  const { site } = useData();
  const normalizedPath = pathname.endsWith("/") || pathname.endsWith(".html") ? url : url.replace(/(?:(^\.+)\/)?.*$/, `$1${pathname.replace(/(\.md)?$/, site.value.cleanUrls ? "" : ".html")}${search}${hash}`);
  return withBase(normalizedPath);
}
function useLangs({ correspondingLink = false } = {}) {
  const { site, localeIndex, page, theme: theme2, hash } = useData();
  const currentLang = computed(() => {
    var _a, _b;
    return {
      label: (_a = site.value.locales[localeIndex.value]) == null ? void 0 : _a.label,
      link: ((_b = site.value.locales[localeIndex.value]) == null ? void 0 : _b.link) || (localeIndex.value === "root" ? "/" : `/${localeIndex.value}/`)
    };
  });
  const localeLinks = computed(() => Object.entries(site.value.locales).flatMap(([key, value]) => currentLang.value.label === value.label ? [] : {
    text: value.label,
    link: normalizeLink(value.link || (key === "root" ? "/" : `/${key}/`), theme2.value.i18nRouting !== false && correspondingLink, page.value.relativePath.slice(currentLang.value.link.length - 1), !site.value.cleanUrls) + hash.value
  }));
  return { localeLinks, currentLang };
}
function normalizeLink(link2, addPath, path, addExt) {
  return addPath ? link2.replace(/\/$/, "") + ensureStartingSlash(path.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, addExt ? ".html" : "")) : link2;
}
const _sfc_main$1f = /* @__PURE__ */ defineComponent({
  __name: "NotFound",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const { currentLang } = useLangs();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "NotFound" }, _attrs))} data-v-d6be1790><p class="code" data-v-d6be1790>${ssrInterpolate(((_a = unref(theme2).notFound) == null ? void 0 : _a.code) ?? "404")}</p><h1 class="title" data-v-d6be1790>${ssrInterpolate(((_b = unref(theme2).notFound) == null ? void 0 : _b.title) ?? "PAGE NOT FOUND")}</h1><div class="divider" data-v-d6be1790></div><blockquote class="quote" data-v-d6be1790>${ssrInterpolate(((_c = unref(theme2).notFound) == null ? void 0 : _c.quote) ?? "But if you don't change your direction, and if you keep looking, you may end up where you are heading.")}</blockquote><div class="action" data-v-d6be1790><a class="link"${ssrRenderAttr("href", unref(withBase)(unref(currentLang).link))}${ssrRenderAttr("aria-label", ((_d = unref(theme2).notFound) == null ? void 0 : _d.linkLabel) ?? "go to home")} data-v-d6be1790>${ssrInterpolate(((_e = unref(theme2).notFound) == null ? void 0 : _e.linkText) ?? "Take me home")}</a></div></div>`);
    };
  }
});
const _sfc_setup$1f = _sfc_main$1f.setup;
_sfc_main$1f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/NotFound.vue");
  return _sfc_setup$1f ? _sfc_setup$1f(props, ctx) : void 0;
};
const NotFound = /* @__PURE__ */ _export_sfc(_sfc_main$1f, [["__scopeId", "data-v-d6be1790"]]);
function getSidebar(_sidebar, path) {
  if (Array.isArray(_sidebar))
    return addBase(_sidebar);
  if (_sidebar == null)
    return [];
  path = ensureStartingSlash(path);
  const dir = Object.keys(_sidebar).sort((a, b) => {
    return b.split("/").length - a.split("/").length;
  }).find((dir2) => {
    return path.startsWith(ensureStartingSlash(dir2));
  });
  const sidebar = dir ? _sidebar[dir] : [];
  return Array.isArray(sidebar) ? addBase(sidebar) : addBase(sidebar.items, sidebar.base);
}
function getSidebarGroups(sidebar) {
  const groups = [];
  let lastGroupIndex = 0;
  for (const index in sidebar) {
    const item = sidebar[index];
    if (item.items) {
      lastGroupIndex = groups.push(item);
      continue;
    }
    if (!groups[lastGroupIndex]) {
      groups.push({ items: [] });
    }
    groups[lastGroupIndex].items.push(item);
  }
  return groups;
}
function getFlatSideBarLinks(sidebar) {
  const links = [];
  function recursivelyExtractLinks(items) {
    for (const item of items) {
      if (item.text && item.link) {
        links.push({
          text: item.text,
          link: item.link,
          docFooterText: item.docFooterText
        });
      }
      if (item.items) {
        recursivelyExtractLinks(item.items);
      }
    }
  }
  recursivelyExtractLinks(sidebar);
  return links;
}
function hasActiveLink(path, items) {
  if (Array.isArray(items)) {
    return items.some((item) => hasActiveLink(path, item));
  }
  return isActive(path, items.link) ? true : items.items ? hasActiveLink(path, items.items) : false;
}
function addBase(items, _base) {
  return [...items].map((_item) => {
    const item = { ..._item };
    const base = item.base || _base;
    if (base && item.link)
      item.link = base + item.link;
    if (item.items)
      item.items = addBase(item.items, base);
    return item;
  });
}
function useSidebar() {
  const { frontmatter, page, theme: theme2 } = useData();
  const is960 = useMediaQuery("(min-width: 960px)");
  const isOpen = ref(false);
  const _sidebar = computed(() => {
    const sidebarConfig = theme2.value.sidebar;
    const relativePath = page.value.relativePath;
    return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
  });
  const sidebar = ref(_sidebar.value);
  watch(_sidebar, (next, prev) => {
    if (JSON.stringify(next) !== JSON.stringify(prev))
      sidebar.value = _sidebar.value;
  });
  const hasSidebar = computed(() => {
    return frontmatter.value.sidebar !== false && sidebar.value.length > 0 && frontmatter.value.layout !== "home";
  });
  const leftAside = computed(() => {
    if (hasAside)
      return frontmatter.value.aside == null ? theme2.value.aside === "left" : frontmatter.value.aside === "left";
    return false;
  });
  const hasAside = computed(() => {
    if (frontmatter.value.layout === "home")
      return false;
    if (frontmatter.value.aside != null)
      return !!frontmatter.value.aside;
    return theme2.value.aside !== false;
  });
  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value);
  const sidebarGroups = computed(() => {
    return hasSidebar.value ? getSidebarGroups(sidebar.value) : [];
  });
  function open() {
    isOpen.value = true;
  }
  function close() {
    isOpen.value = false;
  }
  function toggle() {
    isOpen.value ? close() : open();
  }
  return {
    isOpen,
    sidebar,
    sidebarGroups,
    hasSidebar,
    hasAside,
    leftAside,
    isSidebarEnabled,
    open,
    close,
    toggle
  };
}
function useCloseSidebarOnEscape(isOpen, close) {
  let triggerElement;
  watchEffect(() => {
    triggerElement = isOpen.value ? document.activeElement : void 0;
  });
  onMounted(() => {
    window.addEventListener("keyup", onEscape);
  });
  onUnmounted(() => {
    window.removeEventListener("keyup", onEscape);
  });
  function onEscape(e) {
    if (e.key === "Escape" && isOpen.value) {
      close();
      triggerElement == null ? void 0 : triggerElement.focus();
    }
  }
}
function useSidebarControl(item) {
  const { page, hash } = useData();
  const collapsed = ref(false);
  const collapsible = computed(() => {
    return item.value.collapsed != null;
  });
  const isLink = computed(() => {
    return !!item.value.link;
  });
  const isActiveLink = ref(false);
  const updateIsActiveLink = () => {
    isActiveLink.value = isActive(page.value.relativePath, item.value.link);
  };
  watch([page, item, hash], updateIsActiveLink);
  onMounted(updateIsActiveLink);
  const hasActiveLink$1 = computed(() => {
    if (isActiveLink.value) {
      return true;
    }
    return item.value.items ? hasActiveLink(page.value.relativePath, item.value.items) : false;
  });
  const hasChildren = computed(() => {
    return !!(item.value.items && item.value.items.length);
  });
  watchEffect(() => {
    collapsed.value = !!(collapsible.value && item.value.collapsed);
  });
  watchPostEffect(() => {
    (isActiveLink.value || hasActiveLink$1.value) && (collapsed.value = false);
  });
  function toggle() {
    if (collapsible.value) {
      collapsed.value = !collapsed.value;
    }
  }
  return {
    collapsed,
    collapsible,
    isLink,
    isActiveLink,
    hasActiveLink: hasActiveLink$1,
    hasChildren,
    toggle
  };
}
function useAside() {
  const { hasSidebar } = useSidebar();
  const is960 = useMediaQuery("(min-width: 960px)");
  const is1280 = useMediaQuery("(min-width: 1280px)");
  const isAsideEnabled = computed(() => {
    if (!is1280.value && !is960.value) {
      return false;
    }
    return hasSidebar.value ? is1280.value : is960.value;
  });
  return {
    isAsideEnabled
  };
}
const ignoreRE = /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/;
const resolvedHeaders = [];
function resolveTitle(theme2) {
  return typeof theme2.outline === "object" && !Array.isArray(theme2.outline) && theme2.outline.label || theme2.outlineTitle || "On this page";
}
function getHeaders(range) {
  const headers = [
    ...document.querySelectorAll(".VPDoc :where(h1,h2,h3,h4,h5,h6)")
  ].filter((el) => el.id && el.hasChildNodes()).map((el) => {
    const level = Number(el.tagName[1]);
    return {
      element: el,
      title: serializeHeader(el),
      link: "#" + el.id,
      level
    };
  });
  return resolveHeaders(headers, range);
}
function serializeHeader(h2) {
  let ret = "";
  for (const node of h2.childNodes) {
    if (node.nodeType === 1) {
      if (ignoreRE.test(node.className))
        continue;
      ret += node.textContent;
    } else if (node.nodeType === 3) {
      ret += node.textContent;
    }
  }
  return ret.trim();
}
function resolveHeaders(headers, range) {
  if (range === false) {
    return [];
  }
  const levelsRange = (typeof range === "object" && !Array.isArray(range) ? range.level : range) || 2;
  const [high, low] = typeof levelsRange === "number" ? [levelsRange, levelsRange] : levelsRange === "deep" ? [2, 6] : levelsRange;
  return buildTree(headers, high, low);
}
function useActiveAnchor(container, marker) {
  const { isAsideEnabled } = useAside();
  const onScroll = throttleAndDebounce(setActiveLink, 100);
  let prevActiveLink = null;
  onMounted(() => {
    requestAnimationFrame(setActiveLink);
    window.addEventListener("scroll", onScroll);
  });
  onUpdated(() => {
    activateLink(location.hash);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });
  function setActiveLink() {
    if (!isAsideEnabled.value) {
      return;
    }
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const offsetHeight = document.body.offsetHeight;
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;
    const headers = resolvedHeaders.map(({ element, link: link2 }) => ({
      link: link2,
      top: getAbsoluteTop(element)
    })).filter(({ top }) => !Number.isNaN(top)).sort((a, b) => a.top - b.top);
    if (!headers.length) {
      activateLink(null);
      return;
    }
    if (scrollY < 1) {
      activateLink(null);
      return;
    }
    if (isBottom) {
      activateLink(headers[headers.length - 1].link);
      return;
    }
    let activeLink = null;
    for (const { link: link2, top } of headers) {
      if (top > scrollY + getScrollOffset() + 4) {
        break;
      }
      activeLink = link2;
    }
    activateLink(activeLink);
  }
  function activateLink(hash) {
    if (prevActiveLink) {
      prevActiveLink.classList.remove("active");
    }
    if (hash == null) {
      prevActiveLink = null;
    } else {
      prevActiveLink = container.value.querySelector(`a[href="${decodeURIComponent(hash)}"]`);
    }
    const activeLink = prevActiveLink;
    if (activeLink) {
      activeLink.classList.add("active");
      marker.value.style.top = activeLink.offsetTop + 39 + "px";
      marker.value.style.opacity = "1";
    } else {
      marker.value.style.top = "33px";
      marker.value.style.opacity = "0";
    }
  }
}
function getAbsoluteTop(element) {
  let offsetTop = 0;
  while (element !== document.body) {
    if (element === null) {
      return NaN;
    }
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}
function buildTree(data2, min, max) {
  resolvedHeaders.length = 0;
  const result = [];
  const stack = [];
  data2.forEach((item) => {
    const node = { ...item, children: [] };
    let parent = stack[stack.length - 1];
    while (parent && parent.level >= node.level) {
      stack.pop();
      parent = stack[stack.length - 1];
    }
    if (node.element.classList.contains("ignore-header") || parent && "shouldIgnore" in parent) {
      stack.push({ level: node.level, shouldIgnore: true });
      return;
    }
    if (node.level > max || node.level < min)
      return;
    resolvedHeaders.push({ element: node.element, link: node.link });
    if (parent)
      parent.children.push(node);
    else
      result.push(node);
    stack.push(node);
  });
  return result;
}
const _sfc_main$1e = /* @__PURE__ */ defineComponent({
  __name: "VPDocOutlineItem",
  __ssrInlineRender: true,
  props: {
    headers: {},
    root: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VPDocOutlineItem = resolveComponent("VPDocOutlineItem", true);
      _push(`<ul${ssrRenderAttrs(mergeProps({
        class: ["VPDocOutlineItem", __props.root ? "root" : "nested"]
      }, _attrs))} data-v-b933a997><!--[-->`);
      ssrRenderList(__props.headers, ({ children, link: link2, title }) => {
        _push(`<li data-v-b933a997><a class="outline-link"${ssrRenderAttr("href", link2)}${ssrRenderAttr("title", title)} data-v-b933a997>${ssrInterpolate(title)}</a>`);
        if (children == null ? void 0 : children.length) {
          _push(ssrRenderComponent(_component_VPDocOutlineItem, { headers: children }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$1e = _sfc_main$1e.setup;
_sfc_main$1e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocOutlineItem.vue");
  return _sfc_setup$1e ? _sfc_setup$1e(props, ctx) : void 0;
};
const VPDocOutlineItem = /* @__PURE__ */ _export_sfc(_sfc_main$1e, [["__scopeId", "data-v-b933a997"]]);
const _sfc_main$1d = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideOutline",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter, theme: theme2 } = useData();
    const headers = shallowRef([]);
    onContentUpdated(() => {
      headers.value = getHeaders(frontmatter.value.outline ?? theme2.value.outline);
    });
    const container = ref();
    const marker = ref();
    useActiveAnchor(container, marker);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        "aria-labelledby": "doc-outline-aria-label",
        class: ["VPDocAsideOutline", { "has-outline": headers.value.length > 0 }],
        ref_key: "container",
        ref: container
      }, _attrs))} data-v-a5bbad30><div class="content" data-v-a5bbad30><div class="outline-marker" data-v-a5bbad30></div><div aria-level="2" class="outline-title" id="doc-outline-aria-label" role="heading" data-v-a5bbad30>${ssrInterpolate(unref(resolveTitle)(unref(theme2)))}</div>`);
      _push(ssrRenderComponent(VPDocOutlineItem, {
        headers: headers.value,
        root: true
      }, null, _parent));
      _push(`</div></nav>`);
    };
  }
});
const _sfc_setup$1d = _sfc_main$1d.setup;
_sfc_main$1d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideOutline.vue");
  return _sfc_setup$1d ? _sfc_setup$1d(props, ctx) : void 0;
};
const VPDocAsideOutline = /* @__PURE__ */ _export_sfc(_sfc_main$1d, [["__scopeId", "data-v-a5bbad30"]]);
const _sfc_main$1c = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideCarbonAds",
  __ssrInlineRender: true,
  props: {
    carbonAds: {}
  },
  setup(__props) {
    const VPCarbonAds = () => null;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAsideCarbonAds" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(VPCarbonAds), { "carbon-ads": __props.carbonAds }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1c = _sfc_main$1c.setup;
_sfc_main$1c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideCarbonAds.vue");
  return _sfc_setup$1c ? _sfc_setup$1c(props, ctx) : void 0;
};
const _sfc_main$1b = /* @__PURE__ */ defineComponent({
  __name: "VPDocAside",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAside" }, _attrs))} data-v-3f215769>`);
      ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(VPDocAsideOutline, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push, _parent);
      _push(`<div class="spacer" data-v-3f215769></div>`);
      ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push, _parent);
      if (unref(theme2).carbonAds) {
        _push(ssrRenderComponent(_sfc_main$1c, {
          "carbon-ads": unref(theme2).carbonAds
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1b = _sfc_main$1b.setup;
_sfc_main$1b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAside.vue");
  return _sfc_setup$1b ? _sfc_setup$1b(props, ctx) : void 0;
};
const VPDocAside = /* @__PURE__ */ _export_sfc(_sfc_main$1b, [["__scopeId", "data-v-3f215769"]]);
function useEditLink() {
  const { theme: theme2, page } = useData();
  return computed(() => {
    const { text = "Edit this page", pattern = "" } = theme2.value.editLink || {};
    let url;
    if (typeof pattern === "function") {
      url = pattern(page.value);
    } else {
      url = pattern.replace(/:path/g, page.value.filePath);
    }
    return { url, text };
  });
}
function usePrevNext() {
  const { page, theme: theme2, frontmatter } = useData();
  return computed(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const sidebar = getSidebar(theme2.value.sidebar, page.value.relativePath);
    const links = getFlatSideBarLinks(sidebar);
    const candidates = uniqBy(links, (link2) => link2.link.replace(/[?#].*$/, ""));
    const index = candidates.findIndex((link2) => {
      return isActive(page.value.relativePath, link2.link);
    });
    const hidePrev = ((_a = theme2.value.docFooter) == null ? void 0 : _a.prev) === false && !frontmatter.value.prev || frontmatter.value.prev === false;
    const hideNext = ((_b = theme2.value.docFooter) == null ? void 0 : _b.next) === false && !frontmatter.value.next || frontmatter.value.next === false;
    return {
      prev: hidePrev ? void 0 : {
        text: (typeof frontmatter.value.prev === "string" ? frontmatter.value.prev : typeof frontmatter.value.prev === "object" ? frontmatter.value.prev.text : void 0) ?? ((_c = candidates[index - 1]) == null ? void 0 : _c.docFooterText) ?? ((_d = candidates[index - 1]) == null ? void 0 : _d.text),
        link: (typeof frontmatter.value.prev === "object" ? frontmatter.value.prev.link : void 0) ?? ((_e = candidates[index - 1]) == null ? void 0 : _e.link)
      },
      next: hideNext ? void 0 : {
        text: (typeof frontmatter.value.next === "string" ? frontmatter.value.next : typeof frontmatter.value.next === "object" ? frontmatter.value.next.text : void 0) ?? ((_f = candidates[index + 1]) == null ? void 0 : _f.docFooterText) ?? ((_g = candidates[index + 1]) == null ? void 0 : _g.text),
        link: (typeof frontmatter.value.next === "object" ? frontmatter.value.next.link : void 0) ?? ((_h = candidates[index + 1]) == null ? void 0 : _h.link)
      }
    };
  });
}
function uniqBy(array, keyFn) {
  const seen = /* @__PURE__ */ new Set();
  return array.filter((item) => {
    const k = keyFn(item);
    return seen.has(k) ? false : seen.add(k);
  });
}
const _sfc_main$1a = /* @__PURE__ */ defineComponent({
  __name: "VPLink",
  __ssrInlineRender: true,
  props: {
    tag: {},
    href: {},
    noIcon: { type: Boolean },
    target: {},
    rel: {}
  },
  setup(__props) {
    const props = __props;
    const tag = computed(() => props.tag ?? (props.href ? "a" : "span"));
    const isExternal2 = computed(
      () => props.href && EXTERNAL_URL_RE.test(props.href) || props.target === "_blank"
    );
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tag.value), mergeProps({
        class: ["VPLink", {
          link: __props.href,
          "vp-external-link-icon": isExternal2.value,
          "no-icon": __props.noIcon
        }],
        href: __props.href ? unref(normalizeLink$1)(__props.href) : void 0,
        target: __props.target ?? (isExternal2.value ? "_blank" : void 0),
        rel: __props.rel ?? (isExternal2.value ? "noreferrer" : void 0)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$1a = _sfc_main$1a.setup;
_sfc_main$1a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLink.vue");
  return _sfc_setup$1a ? _sfc_setup$1a(props, ctx) : void 0;
};
const _sfc_main$19 = /* @__PURE__ */ defineComponent({
  __name: "VPDocFooterLastUpdated",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2, page, lang } = useData();
    const date = computed(
      () => new Date(page.value.lastUpdated)
    );
    const isoDatetime = computed(() => date.value.toISOString());
    const datetime = ref("");
    onMounted(() => {
      watchEffect(() => {
        var _a, _b, _c;
        datetime.value = new Intl.DateTimeFormat(
          ((_b = (_a = theme2.value.lastUpdated) == null ? void 0 : _a.formatOptions) == null ? void 0 : _b.forceLocale) ? lang.value : void 0,
          ((_c = theme2.value.lastUpdated) == null ? void 0 : _c.formatOptions) ?? {
            dateStyle: "short",
            timeStyle: "short"
          }
        ).format(date.value);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<p${ssrRenderAttrs(mergeProps({ class: "VPLastUpdated" }, _attrs))} data-v-e98dd255>${ssrInterpolate(((_a = unref(theme2).lastUpdated) == null ? void 0 : _a.text) || unref(theme2).lastUpdatedText || "Last updated")}: <time${ssrRenderAttr("datetime", isoDatetime.value)} data-v-e98dd255>${ssrInterpolate(datetime.value)}</time></p>`);
    };
  }
});
const _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocFooterLastUpdated.vue");
  return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
const VPDocFooterLastUpdated = /* @__PURE__ */ _export_sfc(_sfc_main$19, [["__scopeId", "data-v-e98dd255"]]);
const _sfc_main$18 = /* @__PURE__ */ defineComponent({
  __name: "VPDocFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2, page, frontmatter } = useData();
    const editLink = useEditLink();
    const control = usePrevNext();
    const hasEditLink = computed(
      () => theme2.value.editLink && frontmatter.value.editLink !== false
    );
    const hasLastUpdated = computed(() => page.value.lastUpdated);
    const showFooter = computed(
      () => hasEditLink.value || hasLastUpdated.value || control.value.prev || control.value.next
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      if (showFooter.value) {
        _push(`<footer${ssrRenderAttrs(mergeProps({ class: "VPDocFooter" }, _attrs))} data-v-e257564d>`);
        ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push, _parent);
        if (hasEditLink.value || hasLastUpdated.value) {
          _push(`<div class="edit-info" data-v-e257564d>`);
          if (hasEditLink.value) {
            _push(`<div class="edit-link" data-v-e257564d>`);
            _push(ssrRenderComponent(_sfc_main$1a, {
              class: "edit-link-button",
              href: unref(editLink).url,
              "no-icon": true
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="vpi-square-pen edit-link-icon" data-v-e257564d${_scopeId}></span> ${ssrInterpolate(unref(editLink).text)}`);
                } else {
                  return [
                    createVNode("span", { class: "vpi-square-pen edit-link-icon" }),
                    createTextVNode(" " + toDisplayString(unref(editLink).text), 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (hasLastUpdated.value) {
            _push(`<div class="last-updated" data-v-e257564d>`);
            _push(ssrRenderComponent(VPDocFooterLastUpdated, null, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (((_a = unref(control).prev) == null ? void 0 : _a.link) || ((_b = unref(control).next) == null ? void 0 : _b.link)) {
          _push(`<nav class="prev-next" aria-labelledby="doc-footer-aria-label" data-v-e257564d><span class="visually-hidden" id="doc-footer-aria-label" data-v-e257564d>Pager</span><div class="pager" data-v-e257564d>`);
          if ((_c = unref(control).prev) == null ? void 0 : _c.link) {
            _push(ssrRenderComponent(_sfc_main$1a, {
              class: "pager-link prev",
              href: unref(control).prev.link
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                var _a2, _b2;
                if (_push2) {
                  _push2(`<span class="desc" data-v-e257564d${_scopeId}>${(((_a2 = unref(theme2).docFooter) == null ? void 0 : _a2.prev) || "Previous page") ?? ""}</span><span class="title" data-v-e257564d${_scopeId}>${unref(control).prev.text ?? ""}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "desc",
                      innerHTML: ((_b2 = unref(theme2).docFooter) == null ? void 0 : _b2.prev) || "Previous page"
                    }, null, 8, ["innerHTML"]),
                    createVNode("span", {
                      class: "title",
                      innerHTML: unref(control).prev.text
                    }, null, 8, ["innerHTML"])
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="pager" data-v-e257564d>`);
          if ((_d = unref(control).next) == null ? void 0 : _d.link) {
            _push(ssrRenderComponent(_sfc_main$1a, {
              class: "pager-link next",
              href: unref(control).next.link
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                var _a2, _b2;
                if (_push2) {
                  _push2(`<span class="desc" data-v-e257564d${_scopeId}>${(((_a2 = unref(theme2).docFooter) == null ? void 0 : _a2.next) || "Next page") ?? ""}</span><span class="title" data-v-e257564d${_scopeId}>${unref(control).next.text ?? ""}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "desc",
                      innerHTML: ((_b2 = unref(theme2).docFooter) == null ? void 0 : _b2.next) || "Next page"
                    }, null, 8, ["innerHTML"]),
                    createVNode("span", {
                      class: "title",
                      innerHTML: unref(control).next.text
                    }, null, 8, ["innerHTML"])
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></nav>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</footer>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocFooter.vue");
  return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
const VPDocFooter = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["__scopeId", "data-v-e257564d"]]);
const _sfc_main$17 = /* @__PURE__ */ defineComponent({
  __name: "VPDoc",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const route = useRoute();
    const { hasSidebar, hasAside, leftAside } = useSidebar();
    const pageName = computed(
      () => route.path.replace(/[./]+/g, "_").replace(/_html$/, "")
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = resolveComponent("Content");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPDoc", { "has-sidebar": unref(hasSidebar), "has-aside": unref(hasAside) }]
      }, _attrs))} data-v-39a288b8>`);
      ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push, _parent);
      _push(`<div class="container" data-v-39a288b8>`);
      if (unref(hasAside)) {
        _push(`<div class="${ssrRenderClass([{ "left-aside": unref(leftAside) }, "aside"])}" data-v-39a288b8><div class="aside-curtain" data-v-39a288b8></div><div class="aside-container" data-v-39a288b8><div class="aside-content" data-v-39a288b8>`);
        _push(ssrRenderComponent(VPDocAside, null, {
          "aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
              ];
            }
          }),
          "aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="content" data-v-39a288b8><div class="content-container" data-v-39a288b8>`);
      ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push, _parent);
      _push(`<main class="main" data-v-39a288b8>`);
      _push(ssrRenderComponent(_component_Content, {
        class: ["vp-doc", [
          pageName.value,
          unref(theme2).externalLinkIcon && "external-link-icon-enabled"
        ]]
      }, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(VPDocFooter, null, {
        "doc-footer-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push, _parent);
      _push(`</div></div></div>`);
      ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDoc.vue");
  return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
const VPDoc = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["__scopeId", "data-v-39a288b8"]]);
const _sfc_main$16 = /* @__PURE__ */ defineComponent({
  __name: "VPButton",
  __ssrInlineRender: true,
  props: {
    tag: {},
    size: { default: "medium" },
    theme: { default: "brand" },
    text: {},
    href: {},
    target: {},
    rel: {}
  },
  setup(__props) {
    const props = __props;
    const isExternal2 = computed(
      () => props.href && EXTERNAL_URL_RE.test(props.href)
    );
    const component = computed(() => {
      return props.tag || (props.href ? "a" : "button");
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(component.value), mergeProps({
        class: ["VPButton", [__props.size, __props.theme]],
        href: __props.href ? unref(normalizeLink$1)(__props.href) : void 0,
        target: props.target ?? (isExternal2.value ? "_blank" : void 0),
        rel: props.rel ?? (isExternal2.value ? "noreferrer" : void 0)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.text)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.text), 1)
            ];
          }
        }),
        _: 1
      }), _parent);
    };
  }
});
const _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPButton.vue");
  return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
const VPButton = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["__scopeId", "data-v-fa7799d5"]]);
const _sfc_main$15 = /* @__PURE__ */ defineComponent({
  ...{ inheritAttrs: false },
  __name: "VPImage",
  __ssrInlineRender: true,
  props: {
    image: {},
    alt: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VPImage = resolveComponent("VPImage", true);
      if (__props.image) {
        _push(`<!--[-->`);
        if (typeof __props.image === "string" || "src" in __props.image) {
          _push(`<img${ssrRenderAttrs(mergeProps({ class: "VPImage" }, typeof __props.image === "string" ? _ctx.$attrs : { ...__props.image, ..._ctx.$attrs }, {
            src: unref(withBase)(typeof __props.image === "string" ? __props.image : __props.image.src),
            alt: __props.alt ?? (typeof __props.image === "string" ? "" : __props.image.alt || "")
          }))} data-v-8426fc1a>`);
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_VPImage, mergeProps({
            class: "dark",
            image: __props.image.dark,
            alt: __props.image.alt
          }, _ctx.$attrs), null, _parent));
          _push(ssrRenderComponent(_component_VPImage, mergeProps({
            class: "light",
            image: __props.image.light,
            alt: __props.image.alt
          }, _ctx.$attrs), null, _parent));
          _push(`<!--]-->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPImage.vue");
  return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
const VPImage = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["__scopeId", "data-v-8426fc1a"]]);
const _sfc_main$14 = /* @__PURE__ */ defineComponent({
  __name: "VPHero",
  __ssrInlineRender: true,
  props: {
    name: {},
    text: {},
    tagline: {},
    image: {},
    actions: {}
  },
  setup(__props) {
    const heroImageSlotExists = inject("hero-image-slot-exists");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPHero", { "has-image": __props.image || unref(heroImageSlotExists) }]
      }, _attrs))} data-v-4f9c455b><div class="container" data-v-4f9c455b><div class="main" data-v-4f9c455b>`);
      ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, () => {
        _push(`<h1 class="heading" data-v-4f9c455b>`);
        if (__props.name) {
          _push(`<span class="name clip" data-v-4f9c455b>${__props.name ?? ""}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.text) {
          _push(`<span class="text" data-v-4f9c455b>${__props.text ?? ""}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</h1>`);
        if (__props.tagline) {
          _push(`<p class="tagline" data-v-4f9c455b>${__props.tagline ?? ""}</p>`);
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push, _parent);
      if (__props.actions) {
        _push(`<div class="actions" data-v-4f9c455b><!--[-->`);
        ssrRenderList(__props.actions, (action) => {
          _push(`<div class="action" data-v-4f9c455b>`);
          _push(ssrRenderComponent(VPButton, {
            tag: "a",
            size: "medium",
            theme: action.theme,
            text: action.text,
            href: action.link,
            target: action.target,
            rel: action.rel
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push, _parent);
      _push(`</div>`);
      if (__props.image || unref(heroImageSlotExists)) {
        _push(`<div class="image" data-v-4f9c455b><div class="image-container" data-v-4f9c455b><div class="image-bg" data-v-4f9c455b></div>`);
        ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, () => {
          if (__props.image) {
            _push(ssrRenderComponent(VPImage, {
              class: "image-src",
              image: __props.image
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHero.vue");
  return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
const VPHero = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["__scopeId", "data-v-4f9c455b"]]);
const _sfc_main$13 = /* @__PURE__ */ defineComponent({
  __name: "VPHomeHero",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter: fm } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(fm).hero) {
        _push(ssrRenderComponent(VPHero, mergeProps({
          class: "VPHomeHero",
          name: unref(fm).hero.name,
          text: unref(fm).hero.text,
          tagline: unref(fm).hero.tagline,
          image: unref(fm).hero.image,
          actions: unref(fm).hero.actions
        }, _attrs), {
          "home-hero-info-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-before")
              ];
            }
          }),
          "home-hero-info": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info")
              ];
            }
          }),
          "home-hero-info-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-after")
              ];
            }
          }),
          "home-hero-actions-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-actions-after")
              ];
            }
          }),
          "home-hero-image": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-image")
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeHero.vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
const _sfc_main$12 = /* @__PURE__ */ defineComponent({
  __name: "VPFeature",
  __ssrInlineRender: true,
  props: {
    icon: {},
    title: {},
    details: {},
    link: {},
    linkText: {},
    rel: {},
    target: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1a, mergeProps({
        class: "VPFeature",
        href: __props.link,
        rel: __props.rel,
        target: __props.target,
        "no-icon": true,
        tag: __props.link ? "a" : "div"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<article class="box" data-v-a3976bdc${_scopeId}>`);
            if (typeof __props.icon === "object" && __props.icon.wrap) {
              _push2(`<div class="icon" data-v-a3976bdc${_scopeId}>`);
              _push2(ssrRenderComponent(VPImage, {
                image: __props.icon,
                alt: __props.icon.alt,
                height: __props.icon.height || 48,
                width: __props.icon.width || 48
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (typeof __props.icon === "object") {
              _push2(ssrRenderComponent(VPImage, {
                image: __props.icon,
                alt: __props.icon.alt,
                height: __props.icon.height || 48,
                width: __props.icon.width || 48
              }, null, _parent2, _scopeId));
            } else if (__props.icon) {
              _push2(`<div class="icon" data-v-a3976bdc${_scopeId}>${__props.icon ?? ""}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h2 class="title" data-v-a3976bdc${_scopeId}>${__props.title ?? ""}</h2>`);
            if (__props.details) {
              _push2(`<p class="details" data-v-a3976bdc${_scopeId}>${__props.details ?? ""}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.linkText) {
              _push2(`<div class="link-text" data-v-a3976bdc${_scopeId}><p class="link-text-value" data-v-a3976bdc${_scopeId}>${ssrInterpolate(__props.linkText)} <span class="vpi-arrow-right link-text-icon" data-v-a3976bdc${_scopeId}></span></p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</article>`);
          } else {
            return [
              createVNode("article", { class: "box" }, [
                typeof __props.icon === "object" && __props.icon.wrap ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "icon"
                }, [
                  createVNode(VPImage, {
                    image: __props.icon,
                    alt: __props.icon.alt,
                    height: __props.icon.height || 48,
                    width: __props.icon.width || 48
                  }, null, 8, ["image", "alt", "height", "width"])
                ])) : typeof __props.icon === "object" ? (openBlock(), createBlock(VPImage, {
                  key: 1,
                  image: __props.icon,
                  alt: __props.icon.alt,
                  height: __props.icon.height || 48,
                  width: __props.icon.width || 48
                }, null, 8, ["image", "alt", "height", "width"])) : __props.icon ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "icon",
                  innerHTML: __props.icon
                }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                createVNode("h2", {
                  class: "title",
                  innerHTML: __props.title
                }, null, 8, ["innerHTML"]),
                __props.details ? (openBlock(), createBlock("p", {
                  key: 3,
                  class: "details",
                  innerHTML: __props.details
                }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                __props.linkText ? (openBlock(), createBlock("div", {
                  key: 4,
                  class: "link-text"
                }, [
                  createVNode("p", { class: "link-text-value" }, [
                    createTextVNode(toDisplayString(__props.linkText) + " ", 1),
                    createVNode("span", { class: "vpi-arrow-right link-text-icon" })
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFeature.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const VPFeature = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["__scopeId", "data-v-a3976bdc"]]);
const _sfc_main$11 = /* @__PURE__ */ defineComponent({
  __name: "VPFeatures",
  __ssrInlineRender: true,
  props: {
    features: {}
  },
  setup(__props) {
    const props = __props;
    const grid = computed(() => {
      const length = props.features.length;
      if (!length) {
        return;
      } else if (length === 2) {
        return "grid-2";
      } else if (length === 3) {
        return "grid-3";
      } else if (length % 3 === 0) {
        return "grid-6";
      } else if (length > 3) {
        return "grid-4";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.features) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPFeatures" }, _attrs))} data-v-a6181336><div class="container" data-v-a6181336><div class="items" data-v-a6181336><!--[-->`);
        ssrRenderList(__props.features, (feature) => {
          _push(`<div class="${ssrRenderClass([[grid.value], "item"])}" data-v-a6181336>`);
          _push(ssrRenderComponent(VPFeature, {
            icon: feature.icon,
            title: feature.title,
            details: feature.details,
            link: feature.link,
            "link-text": feature.linkText,
            rel: feature.rel,
            target: feature.target
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFeatures.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const VPFeatures = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["__scopeId", "data-v-a6181336"]]);
const _sfc_main$10 = /* @__PURE__ */ defineComponent({
  __name: "VPHomeFeatures",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter: fm } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(fm).features) {
        _push(ssrRenderComponent(VPFeatures, mergeProps({
          class: "VPHomeFeatures",
          features: unref(fm).features
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeFeatures.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  __name: "VPHomeContent",
  __ssrInlineRender: true,
  setup(__props) {
    const { width: vw } = useWindowSize({
      initialWidth: 0,
      includeScrollbar: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "vp-doc container",
        style: unref(vw) ? { "--vp-offset": `calc(50% - ${unref(vw) / 2}px)` } : {}
      }, _attrs))} data-v-8e2d4988>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeContent.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const VPHomeContent = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["__scopeId", "data-v-8e2d4988"]]);
const _sfc_main$_ = /* @__PURE__ */ defineComponent({
  __name: "VPHome",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter, theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = resolveComponent("Content");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPHome", {
          "external-link-icon-enabled": unref(theme2).externalLinkIcon
        }]
      }, _attrs))} data-v-8b561e3d>`);
      ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$13, null, {
        "home-hero-info-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)
            ];
          }
        }),
        "home-hero-info": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)
            ];
          }
        }),
        "home-hero-info-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)
            ];
          }
        }),
        "home-hero-actions-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)
            ];
          }
        }),
        "home-hero-image": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$10, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push, _parent);
      if (unref(frontmatter).markdownStyles !== false) {
        _push(ssrRenderComponent(VPHomeContent, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Content, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Content)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_Content, null, null, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHome.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const VPHome = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["__scopeId", "data-v-8b561e3d"]]);
const _sfc_main$Z = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_Content = resolveComponent("Content");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPPage" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push, _parent);
  _push(ssrRenderComponent(_component_Content, null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPPage.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const VPPage = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$Y = /* @__PURE__ */ defineComponent({
  __name: "VPContent",
  __ssrInlineRender: true,
  setup(__props) {
    const { page, frontmatter } = useData();
    const { hasSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPContent", {
          "has-sidebar": unref(hasSidebar),
          "is-home": unref(frontmatter).layout === "home"
        }],
        id: "VPContent"
      }, _attrs))} data-v-1428d186>`);
      if (unref(page).isNotFound) {
        ssrRenderSlot(_ctx.$slots, "not-found", {}, () => {
          _push(ssrRenderComponent(NotFound, null, null, _parent));
        }, _push, _parent);
      } else if (unref(frontmatter).layout === "page") {
        _push(ssrRenderComponent(VPPage, null, {
          "page-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "page-top", {}, void 0, true)
              ];
            }
          }),
          "page-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "page-bottom", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
      } else if (unref(frontmatter).layout === "home") {
        _push(ssrRenderComponent(VPHome, null, {
          "home-hero-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-before", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)
              ];
            }
          }),
          "home-hero-actions-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)
              ];
            }
          }),
          "home-hero-image": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)
              ];
            }
          }),
          "home-hero-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-after", {}, void 0, true)
              ];
            }
          }),
          "home-features-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-before", {}, void 0, true)
              ];
            }
          }),
          "home-features-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
      } else if (unref(frontmatter).layout && unref(frontmatter).layout !== "doc") {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(frontmatter).layout), null, null), _parent);
      } else {
        _push(ssrRenderComponent(VPDoc, null, {
          "doc-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-top", {}, void 0, true)
              ];
            }
          }),
          "doc-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-bottom", {}, void 0, true)
              ];
            }
          }),
          "doc-footer-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
              ];
            }
          }),
          "doc-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-before", {}, void 0, true)
              ];
            }
          }),
          "doc-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)
              ];
            }
          }),
          "aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
              ];
            }
          }),
          "aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPContent.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const VPContent = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__scopeId", "data-v-1428d186"]]);
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  __name: "VPFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2, frontmatter } = useData();
    const { hasSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).footer && unref(frontmatter).footer !== false) {
        _push(`<footer${ssrRenderAttrs(mergeProps({
          class: ["VPFooter", { "has-sidebar": unref(hasSidebar) }]
        }, _attrs))} data-v-e315a0ad><div class="container" data-v-e315a0ad>`);
        if (unref(theme2).footer.message) {
          _push(`<p class="message" data-v-e315a0ad>${unref(theme2).footer.message ?? ""}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(theme2).footer.copyright) {
          _push(`<p class="copyright" data-v-e315a0ad>${unref(theme2).footer.copyright ?? ""}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></footer>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFooter.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const VPFooter = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__scopeId", "data-v-e315a0ad"]]);
function useLocalNav() {
  const { theme: theme2, frontmatter } = useData();
  const headers = shallowRef([]);
  const hasLocalNav = computed(() => {
    return headers.value.length > 0;
  });
  onContentUpdated(() => {
    headers.value = getHeaders(frontmatter.value.outline ?? theme2.value.outline);
  });
  return {
    headers,
    hasLocalNav
  };
}
const _sfc_main$W = /* @__PURE__ */ defineComponent({
  __name: "VPLocalNavOutlineDropdown",
  __ssrInlineRender: true,
  props: {
    headers: {},
    navHeight: {}
  },
  setup(__props) {
    const { theme: theme2 } = useData();
    const open = ref(false);
    const vh = ref(0);
    const main = ref();
    ref();
    function closeOnClickOutside(e) {
      var _a;
      if (!((_a = main.value) == null ? void 0 : _a.contains(e.target))) {
        open.value = false;
      }
    }
    watch(open, (value) => {
      if (value) {
        document.addEventListener("click", closeOnClickOutside);
        return;
      }
      document.removeEventListener("click", closeOnClickOutside);
    });
    onKeyStroke("Escape", () => {
      open.value = false;
    });
    onContentUpdated(() => {
      open.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "VPLocalNavOutlineDropdown",
        style: { "--vp-vh": vh.value + "px" },
        ref_key: "main",
        ref: main
      }, _attrs))} data-v-8a42e2b4>`);
      if (__props.headers.length > 0) {
        _push(`<button class="${ssrRenderClass({ open: open.value })}" data-v-8a42e2b4><span class="menu-text" data-v-8a42e2b4>${ssrInterpolate(unref(resolveTitle)(unref(theme2)))}</span><span class="vpi-chevron-right icon" data-v-8a42e2b4></span></button>`);
      } else {
        _push(`<button data-v-8a42e2b4>${ssrInterpolate(unref(theme2).returnToTopLabel || "Return to top")}</button>`);
      }
      if (open.value) {
        _push(`<div class="items" data-v-8a42e2b4><div class="header" data-v-8a42e2b4><a class="top-link" href="#" data-v-8a42e2b4>${ssrInterpolate(unref(theme2).returnToTopLabel || "Return to top")}</a></div><div class="outline" data-v-8a42e2b4>`);
        _push(ssrRenderComponent(VPDocOutlineItem, { headers: __props.headers }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLocalNavOutlineDropdown.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const VPLocalNavOutlineDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__scopeId", "data-v-8a42e2b4"]]);
const _sfc_main$V = /* @__PURE__ */ defineComponent({
  __name: "VPLocalNav",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  emits: ["open-menu"],
  setup(__props) {
    const { theme: theme2, frontmatter } = useData();
    const { hasSidebar } = useSidebar();
    const { headers } = useLocalNav();
    const { y } = useWindowScroll();
    const navHeight = ref(0);
    onMounted(() => {
      navHeight.value = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--vp-nav-height"
        )
      );
    });
    onContentUpdated(() => {
      headers.value = getHeaders(frontmatter.value.outline ?? theme2.value.outline);
    });
    const empty = computed(() => {
      return headers.value.length === 0;
    });
    const emptyAndNoSidebar = computed(() => {
      return empty.value && !hasSidebar.value;
    });
    const classes = computed(() => {
      return {
        VPLocalNav: true,
        "has-sidebar": hasSidebar.value,
        empty: empty.value,
        fixed: emptyAndNoSidebar.value
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(frontmatter).layout !== "home" && (!emptyAndNoSidebar.value || unref(y) >= navHeight.value)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: classes.value }, _attrs))} data-v-a6f0e41e><div class="container" data-v-a6f0e41e>`);
        if (unref(hasSidebar)) {
          _push(`<button class="menu"${ssrRenderAttr("aria-expanded", __props.open)} aria-controls="VPSidebarNav" data-v-a6f0e41e><span class="vpi-align-left menu-icon" data-v-a6f0e41e></span><span class="menu-text" data-v-a6f0e41e>${ssrInterpolate(unref(theme2).sidebarMenuLabel || "Menu")}</span></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(VPLocalNavOutlineDropdown, {
          headers: unref(headers),
          navHeight: navHeight.value
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLocalNav.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const VPLocalNav = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__scopeId", "data-v-a6f0e41e"]]);
function useNav() {
  const isScreenOpen = ref(false);
  function openScreen() {
    isScreenOpen.value = true;
    window.addEventListener("resize", closeScreenOnTabletWindow);
  }
  function closeScreen() {
    isScreenOpen.value = false;
    window.removeEventListener("resize", closeScreenOnTabletWindow);
  }
  function toggleScreen() {
    isScreenOpen.value ? closeScreen() : openScreen();
  }
  function closeScreenOnTabletWindow() {
    window.outerWidth >= 768 && closeScreen();
  }
  const route = useRoute();
  watch(() => route.path, closeScreen);
  return {
    isScreenOpen,
    openScreen,
    closeScreen,
    toggleScreen
  };
}
const _sfc_main$U = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    class: "VPSwitch",
    type: "button",
    role: "switch"
  }, _attrs))} data-v-1d5665e3><span class="check" data-v-1d5665e3>`);
  if (_ctx.$slots.default) {
    _push(`<span class="icon" data-v-1d5665e3>`);
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</span></button>`);
}
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSwitch.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const VPSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-1d5665e3"]]);
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  __name: "VPSwitchAppearance",
  __ssrInlineRender: true,
  setup(__props) {
    const { isDark, theme: theme2 } = useData();
    const toggleAppearance = inject("toggle-appearance", () => {
      isDark.value = !isDark.value;
    });
    const switchTitle = ref("");
    watchPostEffect(() => {
      switchTitle.value = isDark.value ? theme2.value.lightModeSwitchTitle || "Switch to light theme" : theme2.value.darkModeSwitchTitle || "Switch to dark theme";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VPSwitch, mergeProps({
        title: switchTitle.value,
        class: "VPSwitchAppearance",
        "aria-checked": unref(isDark),
        onClick: unref(toggleAppearance)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="vpi-sun sun" data-v-5337faa4${_scopeId}></span><span class="vpi-moon moon" data-v-5337faa4${_scopeId}></span>`);
          } else {
            return [
              createVNode("span", { class: "vpi-sun sun" }),
              createVNode("span", { class: "vpi-moon moon" })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const VPSwitchAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__scopeId", "data-v-5337faa4"]]);
const _sfc_main$S = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarAppearance",
  __ssrInlineRender: true,
  setup(__props) {
    const { site } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavBarAppearance" }, _attrs))} data-v-6c893767>`);
        _push(ssrRenderComponent(VPSwitchAppearance, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarAppearance.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const VPNavBarAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-6c893767"]]);
const focusedElement = ref();
let active = false;
let listeners = 0;
function useFlyout(options) {
  const focus = ref(false);
  if (inBrowser) {
    !active && activateFocusTracking();
    listeners++;
    const unwatch = watch(focusedElement, (el) => {
      var _a, _b, _c;
      if (el === options.el.value || ((_a = options.el.value) == null ? void 0 : _a.contains(el))) {
        focus.value = true;
        (_b = options.onFocus) == null ? void 0 : _b.call(options);
      } else {
        focus.value = false;
        (_c = options.onBlur) == null ? void 0 : _c.call(options);
      }
    });
    onUnmounted(() => {
      unwatch();
      listeners--;
      if (!listeners) {
        deactivateFocusTracking();
      }
    });
  }
  return readonly(focus);
}
function activateFocusTracking() {
  document.addEventListener("focusin", handleFocusIn);
  active = true;
  focusedElement.value = document.activeElement;
}
function deactivateFocusTracking() {
  document.removeEventListener("focusin", handleFocusIn);
}
function handleFocusIn() {
  focusedElement.value = document.activeElement;
}
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  __name: "VPMenuLink",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const { page } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenuLink" }, _attrs))} data-v-35975db6>`);
      _push(ssrRenderComponent(_sfc_main$1a, {
        class: {
          active: unref(isActive)(
            unref(page).relativePath,
            __props.item.activeMatch || __props.item.link,
            !!__props.item.activeMatch
          )
        },
        href: __props.item.link,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-35975db6${_scopeId}>${__props.item.text ?? ""}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: __props.item.text
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenuLink.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const VPMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__scopeId", "data-v-35975db6"]]);
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  __name: "VPMenuGroup",
  __ssrInlineRender: true,
  props: {
    text: {},
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenuGroup" }, _attrs))} data-v-69e747b5>`);
      if (__props.text) {
        _push(`<p class="title" data-v-69e747b5>${ssrInterpolate(__props.text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<!--[-->`);
        if ("link" in item) {
          _push(ssrRenderComponent(VPMenuLink, { item }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenuGroup.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const VPMenuGroup = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__scopeId", "data-v-69e747b5"]]);
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  __name: "VPMenu",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenu" }, _attrs))} data-v-b98bc113>`);
      if (__props.items) {
        _push(`<div class="items" data-v-b98bc113><!--[-->`);
        ssrRenderList(__props.items, (item) => {
          _push(`<!--[-->`);
          if ("link" in item) {
            _push(ssrRenderComponent(VPMenuLink, { item }, null, _parent));
          } else if ("component" in item) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props), null), _parent);
          } else {
            _push(ssrRenderComponent(VPMenuGroup, {
              text: item.text,
              items: item.items
            }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenu.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const VPMenu = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__scopeId", "data-v-b98bc113"]]);
const _sfc_main$O = /* @__PURE__ */ defineComponent({
  __name: "VPFlyout",
  __ssrInlineRender: true,
  props: {
    icon: {},
    button: {},
    label: {},
    items: {}
  },
  setup(__props) {
    const open = ref(false);
    const el = ref();
    useFlyout({ el, onBlur });
    function onBlur() {
      open.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "VPFlyout",
        ref_key: "el",
        ref: el
      }, _attrs))} data-v-cf11d7a2><button type="button" class="button" aria-haspopup="true"${ssrRenderAttr("aria-expanded", open.value)}${ssrRenderAttr("aria-label", __props.label)} data-v-cf11d7a2>`);
      if (__props.button || __props.icon) {
        _push(`<span class="text" data-v-cf11d7a2>`);
        if (__props.icon) {
          _push(`<span class="${ssrRenderClass([__props.icon, "option-icon"])}" data-v-cf11d7a2></span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.button) {
          _push(`<span data-v-cf11d7a2>${__props.button ?? ""}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="vpi-chevron-down text-icon" data-v-cf11d7a2></span></span>`);
      } else {
        _push(`<span class="vpi-more-horizontal icon" data-v-cf11d7a2></span>`);
      }
      _push(`</button><div class="menu" data-v-cf11d7a2>`);
      _push(ssrRenderComponent(VPMenu, { items: __props.items }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFlyout.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const VPFlyout = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__scopeId", "data-v-cf11d7a2"]]);
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  __name: "VPSocialLink",
  __ssrInlineRender: true,
  props: {
    icon: {},
    link: {},
    ariaLabel: {}
  },
  setup(__props) {
    var _a;
    const props = __props;
    const el = ref();
    onMounted(async () => {
      var _a2;
      await nextTick();
      const span = (_a2 = el.value) == null ? void 0 : _a2.children[0];
      if (span instanceof HTMLElement && span.className.startsWith("vpi-social-") && (getComputedStyle(span).maskImage || getComputedStyle(span).webkitMaskImage) === "none") {
        span.style.setProperty(
          "--icon",
          `url('https://api.iconify.design/simple-icons/${props.icon}.svg')`
        );
      }
    });
    const svg = computed(() => {
      if (typeof props.icon === "object") return props.icon.svg;
      return `<span class="vpi-social-${props.icon}"></span>`;
    });
    {
      typeof props.icon === "string" && ((_a = useSSRContext()) == null ? void 0 : _a.vpSocialIcons.add(props.icon));
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        ref_key: "el",
        ref: el,
        class: "VPSocialLink no-icon",
        href: __props.link,
        "aria-label": __props.ariaLabel ?? (typeof __props.icon === "string" ? __props.icon : ""),
        target: "_blank",
        rel: "noopener"
      }, _attrs))} data-v-bd121fe5>${svg.value ?? ""}</a>`);
    };
  }
});
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSocialLink.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const VPSocialLink = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__scopeId", "data-v-bd121fe5"]]);
const _sfc_main$M = /* @__PURE__ */ defineComponent({
  __name: "VPSocialLinks",
  __ssrInlineRender: true,
  props: {
    links: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPSocialLinks" }, _attrs))} data-v-7bc22406><!--[-->`);
      ssrRenderList(__props.links, ({ link: link2, icon, ariaLabel }) => {
        _push(ssrRenderComponent(VPSocialLink, {
          key: link2,
          icon,
          link: link2,
          ariaLabel
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSocialLinks.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const VPSocialLinks = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-7bc22406"]]);
const _sfc_main$L = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarExtra",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, theme: theme2 } = useData();
    const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
    const hasExtraContent = computed(
      () => localeLinks.value.length && currentLang.value.label || site.value.appearance || theme2.value.socialLinks
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (hasExtraContent.value) {
        _push(ssrRenderComponent(VPFlyout, mergeProps({
          class: "VPNavBarExtra",
          label: "extra navigation"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(localeLinks).length && unref(currentLang).label) {
                _push2(`<div class="group translations" data-v-bb2aa2f0${_scopeId}><p class="trans-title" data-v-bb2aa2f0${_scopeId}>${ssrInterpolate(unref(currentLang).label)}</p><!--[-->`);
                ssrRenderList(unref(localeLinks), (locale) => {
                  _push2(ssrRenderComponent(VPMenuLink, { item: locale }, null, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto") {
                _push2(`<div class="group" data-v-bb2aa2f0${_scopeId}><div class="item appearance" data-v-bb2aa2f0${_scopeId}><p class="label" data-v-bb2aa2f0${_scopeId}>${ssrInterpolate(unref(theme2).darkModeSwitchLabel || "Appearance")}</p><div class="appearance-action" data-v-bb2aa2f0${_scopeId}>`);
                _push2(ssrRenderComponent(VPSwitchAppearance, null, null, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(theme2).socialLinks) {
                _push2(`<div class="group" data-v-bb2aa2f0${_scopeId}><div class="item social-links" data-v-bb2aa2f0${_scopeId}>`);
                _push2(ssrRenderComponent(VPSocialLinks, {
                  class: "social-links-list",
                  links: unref(theme2).socialLinks
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(localeLinks).length && unref(currentLang).label ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "group translations"
                }, [
                  createVNode("p", { class: "trans-title" }, toDisplayString(unref(currentLang).label), 1),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(localeLinks), (locale) => {
                    return openBlock(), createBlock(VPMenuLink, {
                      key: locale.link,
                      item: locale
                    }, null, 8, ["item"]);
                  }), 128))
                ])) : createCommentVNode("", true),
                unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "group"
                }, [
                  createVNode("div", { class: "item appearance" }, [
                    createVNode("p", { class: "label" }, toDisplayString(unref(theme2).darkModeSwitchLabel || "Appearance"), 1),
                    createVNode("div", { class: "appearance-action" }, [
                      createVNode(VPSwitchAppearance)
                    ])
                  ])
                ])) : createCommentVNode("", true),
                unref(theme2).socialLinks ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "group"
                }, [
                  createVNode("div", { class: "item social-links" }, [
                    createVNode(VPSocialLinks, {
                      class: "social-links-list",
                      links: unref(theme2).socialLinks
                    }, null, 8, ["links"])
                  ])
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarExtra.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const VPNavBarExtra = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__scopeId", "data-v-bb2aa2f0"]]);
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarHamburger",
  __ssrInlineRender: true,
  props: {
    active: { type: Boolean }
  },
  emits: ["click"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: ["VPNavBarHamburger", { active: __props.active }],
        "aria-label": "mobile navigation",
        "aria-expanded": __props.active,
        "aria-controls": "VPNavScreen"
      }, _attrs))} data-v-e5dd9c1c><span class="container" data-v-e5dd9c1c><span class="top" data-v-e5dd9c1c></span><span class="middle" data-v-e5dd9c1c></span><span class="bottom" data-v-e5dd9c1c></span></span></button>`);
    };
  }
});
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarHamburger.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const VPNavBarHamburger = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-e5dd9c1c"]]);
const _sfc_main$J = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenuLink",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const { page } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1a, mergeProps({
        class: {
          VPNavBarMenuLink: true,
          active: unref(isActive)(
            unref(page).relativePath,
            __props.item.activeMatch || __props.item.link,
            !!__props.item.activeMatch
          )
        },
        href: __props.item.link,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon,
        tabindex: "0"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-e56f3d57${_scopeId}>${__props.item.text ?? ""}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: __props.item.text
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const VPNavBarMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-e56f3d57"]]);
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenuGroup",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const { page } = useData();
    const isChildActive = (navItem) => {
      if ("component" in navItem) return false;
      if ("link" in navItem) {
        return isActive(
          page.value.relativePath,
          navItem.link,
          !!props.item.activeMatch
        );
      }
      return navItem.items.some(isChildActive);
    };
    const childrenActive = computed(() => isChildActive(props.item));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VPFlyout, mergeProps({
        class: {
          VPNavBarMenuGroup: true,
          active: unref(isActive)(unref(page).relativePath, __props.item.activeMatch, !!__props.item.activeMatch) || childrenActive.value
        },
        button: __props.item.text,
        items: __props.item.items
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).nav) {
        _push(`<nav${ssrRenderAttrs(mergeProps({
          "aria-labelledby": "main-nav-aria-label",
          class: "VPNavBarMenu"
        }, _attrs))} data-v-dc692963><span id="main-nav-aria-label" class="visually-hidden" data-v-dc692963> Main Navigation </span><!--[-->`);
        ssrRenderList(unref(theme2).nav, (item) => {
          _push(`<!--[-->`);
          if ("link" in item) {
            _push(ssrRenderComponent(VPNavBarMenuLink, { item }, null, _parent));
          } else if ("component" in item) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props), null), _parent);
          } else {
            _push(ssrRenderComponent(_sfc_main$I, { item }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenu.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const VPNavBarMenu = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-dc692963"]]);
function createSearchTranslate(defaultTranslations) {
  const { localeIndex, theme: theme2 } = useData();
  function translate(key) {
    var _a, _b, _c;
    const keyPath = key.split(".");
    const themeObject = (_a = theme2.value.search) == null ? void 0 : _a.options;
    const isObject = themeObject && typeof themeObject === "object";
    const locales = isObject && ((_c = (_b = themeObject.locales) == null ? void 0 : _b[localeIndex.value]) == null ? void 0 : _c.translations) || null;
    const translations = isObject && themeObject.translations || null;
    let localeResult = locales;
    let translationResult = translations;
    let defaultResult = defaultTranslations;
    const lastKey = keyPath.pop();
    for (const k of keyPath) {
      let fallbackResult = null;
      const foundInFallback = defaultResult == null ? void 0 : defaultResult[k];
      if (foundInFallback) {
        fallbackResult = defaultResult = foundInFallback;
      }
      const foundInTranslation = translationResult == null ? void 0 : translationResult[k];
      if (foundInTranslation) {
        fallbackResult = translationResult = foundInTranslation;
      }
      const foundInLocale = localeResult == null ? void 0 : localeResult[k];
      if (foundInLocale) {
        fallbackResult = localeResult = foundInLocale;
      }
      if (!foundInFallback) {
        defaultResult = fallbackResult;
      }
      if (!foundInTranslation) {
        translationResult = fallbackResult;
      }
      if (!foundInLocale) {
        localeResult = fallbackResult;
      }
    }
    return (localeResult == null ? void 0 : localeResult[lastKey]) ?? (translationResult == null ? void 0 : translationResult[lastKey]) ?? (defaultResult == null ? void 0 : defaultResult[lastKey]) ?? "";
  }
  return translate;
}
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarSearchButton",
  __ssrInlineRender: true,
  setup(__props) {
    const defaultTranslations = {
      button: {
        buttonText: "Search",
        buttonAriaLabel: "Search"
      }
    };
    const translate = createSearchTranslate(defaultTranslations);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: "DocSearch DocSearch-Button",
        "aria-label": unref(translate)("button.buttonAriaLabel")
      }, _attrs))}><span class="DocSearch-Button-Container"><span class="vp-icon DocSearch-Search-Icon"></span><span class="DocSearch-Button-Placeholder">${ssrInterpolate(unref(translate)("button.buttonText"))}</span></span><span class="DocSearch-Button-Keys"><kbd class="DocSearch-Button-Key"></kbd><kbd class="DocSearch-Button-Key">K</kbd></span></button>`);
    };
  }
});
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSearchButton.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarSearch",
  __ssrInlineRender: true,
  setup(__props) {
    const VPLocalSearchBox = defineAsyncComponent(() => import("./VPLocalSearchBox.ys57jIPY.js"));
    const VPAlgoliaSearchBox = () => null;
    const { theme: theme2 } = useData();
    const loaded = ref(false);
    const actuallyLoaded = ref(false);
    onMounted(() => {
      {
        return;
      }
    });
    function load() {
      if (!loaded.value) {
        loaded.value = true;
        setTimeout(poll, 16);
      }
    }
    function poll() {
      const e = new Event("keydown");
      e.key = "k";
      e.metaKey = true;
      window.dispatchEvent(e);
      setTimeout(() => {
        if (!document.querySelector(".DocSearch-Modal")) {
          poll();
        }
      }, 16);
    }
    function isEditingContent(event) {
      const element = event.target;
      const tagName = element.tagName;
      return element.isContentEditable || tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA";
    }
    const showSearch = ref(false);
    {
      onKeyStroke("k", (event) => {
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          showSearch.value = true;
        }
      });
      onKeyStroke("/", (event) => {
        if (!isEditingContent(event)) {
          event.preventDefault();
          showSearch.value = true;
        }
      });
    }
    const provider = "local";
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavBarSearch" }, _attrs))}>`);
      if (unref(provider) === "local") {
        _push(`<!--[-->`);
        if (showSearch.value) {
          _push(ssrRenderComponent(unref(VPLocalSearchBox), {
            onClose: ($event) => showSearch.value = false
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div id="local-search">`);
        _push(ssrRenderComponent(_sfc_main$G, {
          onClick: ($event) => showSearch.value = true
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else if (unref(provider) === "algolia") {
        _push(`<!--[-->`);
        if (loaded.value) {
          _push(ssrRenderComponent(unref(VPAlgoliaSearchBox), {
            algolia: ((_a = unref(theme2).search) == null ? void 0 : _a.options) ?? unref(theme2).algolia,
            onVnodeBeforeMount: ($event) => actuallyLoaded.value = true
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (!actuallyLoaded.value) {
          _push(`<div id="docsearch">`);
          _push(ssrRenderComponent(_sfc_main$G, { onClick: load }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSearch.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarSocialLinks",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).socialLinks) {
        _push(ssrRenderComponent(VPSocialLinks, mergeProps({
          class: "VPNavBarSocialLinks",
          links: unref(theme2).socialLinks
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const VPNavBarSocialLinks = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-0394ad82"]]);
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarTitle",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, theme: theme2 } = useData();
    const { hasSidebar } = useSidebar();
    const { currentLang } = useLangs();
    const link2 = computed(
      () => {
        var _a;
        return typeof theme2.value.logoLink === "string" ? theme2.value.logoLink : (_a = theme2.value.logoLink) == null ? void 0 : _a.link;
      }
    );
    const rel = computed(
      () => {
        var _a;
        return typeof theme2.value.logoLink === "string" ? void 0 : (_a = theme2.value.logoLink) == null ? void 0 : _a.rel;
      }
    );
    const target = computed(
      () => {
        var _a;
        return typeof theme2.value.logoLink === "string" ? void 0 : (_a = theme2.value.logoLink) == null ? void 0 : _a.target;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPNavBarTitle", { "has-sidebar": unref(hasSidebar) }]
      }, _attrs))} data-v-1168a8e4><a class="title"${ssrRenderAttr("href", link2.value ?? unref(normalizeLink$1)(unref(currentLang).link))}${ssrRenderAttr("rel", rel.value)}${ssrRenderAttr("target", target.value)} data-v-1168a8e4>`);
      ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push, _parent);
      if (unref(theme2).logo) {
        _push(ssrRenderComponent(VPImage, {
          class: "logo",
          image: unref(theme2).logo
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(theme2).siteTitle) {
        _push(`<span data-v-1168a8e4>${unref(theme2).siteTitle ?? ""}</span>`);
      } else if (unref(theme2).siteTitle === void 0) {
        _push(`<span data-v-1168a8e4>${ssrInterpolate(unref(site).title)}</span>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push, _parent);
      _push(`</a></div>`);
    };
  }
});
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarTitle.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const VPNavBarTitle = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-1168a8e4"]]);
const _sfc_main$C = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarTranslations",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(localeLinks).length && unref(currentLang).label) {
        _push(ssrRenderComponent(VPFlyout, mergeProps({
          class: "VPNavBarTranslations",
          icon: "vpi-languages",
          label: unref(theme2).langMenuLabel || "Change language"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="items" data-v-88af2de4${_scopeId}><p class="title" data-v-88af2de4${_scopeId}>${ssrInterpolate(unref(currentLang).label)}</p><!--[-->`);
              ssrRenderList(unref(localeLinks), (locale) => {
                _push2(ssrRenderComponent(VPMenuLink, { item: locale }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "items" }, [
                  createVNode("p", { class: "title" }, toDisplayString(unref(currentLang).label), 1),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(localeLinks), (locale) => {
                    return openBlock(), createBlock(VPMenuLink, {
                      key: locale.link,
                      item: locale
                    }, null, 8, ["item"]);
                  }), 128))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarTranslations.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const VPNavBarTranslations = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-88af2de4"]]);
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  __name: "VPNavBar",
  __ssrInlineRender: true,
  props: {
    isScreenOpen: { type: Boolean }
  },
  emits: ["toggle-screen"],
  setup(__props) {
    const props = __props;
    const { y } = useWindowScroll();
    const { hasSidebar } = useSidebar();
    const { frontmatter } = useData();
    const classes = ref({});
    watchPostEffect(() => {
      classes.value = {
        "has-sidebar": hasSidebar.value,
        "home": frontmatter.value.layout === "home",
        "top": y.value === 0,
        "screen-open": props.isScreenOpen
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPNavBar", classes.value]
      }, _attrs))} data-v-6aa21345><div class="wrapper" data-v-6aa21345><div class="container" data-v-6aa21345><div class="title" data-v-6aa21345>`);
      _push(ssrRenderComponent(VPNavBarTitle, null, {
        "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
            ];
          }
        }),
        "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div><div class="content" data-v-6aa21345><div class="content-body" data-v-6aa21345>`);
      ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$F, { class: "search" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarMenu, { class: "menu" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarTranslations, { class: "translations" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarAppearance, { class: "appearance" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarSocialLinks, { class: "social-links" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarExtra, { class: "extra" }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push, _parent);
      _push(ssrRenderComponent(VPNavBarHamburger, {
        class: "hamburger",
        active: __props.isScreenOpen,
        onClick: ($event) => _ctx.$emit("toggle-screen")
      }, null, _parent));
      _push(`</div></div></div></div><div class="divider" data-v-6aa21345><div class="divider-line" data-v-6aa21345></div></div></div>`);
    };
  }
});
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBar.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const VPNavBar = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-6aa21345"]]);
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenAppearance",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavScreenAppearance" }, _attrs))} data-v-b44890b2><p class="text" data-v-b44890b2>${ssrInterpolate(unref(theme2).darkModeSwitchLabel || "Appearance")}</p>`);
        _push(ssrRenderComponent(VPSwitchAppearance, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenAppearance.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const VPNavScreenAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-b44890b2"]]);
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuLink",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const closeScreen = inject("close-screen");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1a, mergeProps({
        class: "VPNavScreenMenuLink",
        href: __props.item.link,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon,
        onClick: unref(closeScreen)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-df37e6dd${_scopeId}>${__props.item.text ?? ""}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: __props.item.text
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuLink.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const VPNavScreenMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-df37e6dd"]]);
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroupLink",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const closeScreen = inject("close-screen");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1a, mergeProps({
        class: "VPNavScreenMenuGroupLink",
        href: __props.item.link,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon,
        onClick: unref(closeScreen)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-3e9c20e4${_scopeId}>${__props.item.text ?? ""}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: __props.item.text
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupLink.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const VPNavScreenMenuGroupLink = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-3e9c20e4"]]);
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroupSection",
  __ssrInlineRender: true,
  props: {
    text: {},
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavScreenMenuGroupSection" }, _attrs))} data-v-8133b170>`);
      if (__props.text) {
        _push(`<p class="title" data-v-8133b170>${ssrInterpolate(__props.text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(ssrRenderComponent(VPNavScreenMenuGroupLink, {
          key: item.text,
          item
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupSection.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const VPNavScreenMenuGroupSection = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-8133b170"]]);
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroup",
  __ssrInlineRender: true,
  props: {
    text: {},
    items: {}
  },
  setup(__props) {
    const props = __props;
    const isOpen = ref(false);
    const groupId = computed(
      () => `NavScreenGroup-${props.text.replace(" ", "-").toLowerCase()}`
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPNavScreenMenuGroup", { open: isOpen.value }]
      }, _attrs))} data-v-b9ab8c58><button class="button"${ssrRenderAttr("aria-controls", groupId.value)}${ssrRenderAttr("aria-expanded", isOpen.value)} data-v-b9ab8c58><span class="button-text" data-v-b9ab8c58>${__props.text ?? ""}</span><span class="vpi-plus button-icon" data-v-b9ab8c58></span></button><div${ssrRenderAttr("id", groupId.value)} class="items" data-v-b9ab8c58><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<!--[-->`);
        if ("link" in item) {
          _push(`<div class="item" data-v-b9ab8c58>`);
          _push(ssrRenderComponent(VPNavScreenMenuGroupLink, { item }, null, _parent));
          _push(`</div>`);
        } else if ("component" in item) {
          _push(`<div class="item" data-v-b9ab8c58>`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props, { "screen-menu": "" }), null), _parent);
          _push(`</div>`);
        } else {
          _push(`<div class="group" data-v-b9ab8c58>`);
          _push(ssrRenderComponent(VPNavScreenMenuGroupSection, {
            text: item.text,
            items: item.items
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroup.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const VPNavScreenMenuGroup = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-b9ab8c58"]]);
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).nav) {
        _push(`<nav${ssrRenderAttrs(mergeProps({ class: "VPNavScreenMenu" }, _attrs))}><!--[-->`);
        ssrRenderList(unref(theme2).nav, (item) => {
          _push(`<!--[-->`);
          if ("link" in item) {
            _push(ssrRenderComponent(VPNavScreenMenuLink, { item }, null, _parent));
          } else if ("component" in item) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props, { "screen-menu": "" }), null), _parent);
          } else {
            _push(ssrRenderComponent(VPNavScreenMenuGroup, {
              text: item.text || "",
              items: item.items
            }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenu.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenSocialLinks",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).socialLinks) {
        _push(ssrRenderComponent(VPSocialLinks, mergeProps({
          class: "VPNavScreenSocialLinks",
          links: unref(theme2).socialLinks
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenSocialLinks.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenTranslations",
  __ssrInlineRender: true,
  setup(__props) {
    const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
    const isOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(localeLinks).length && unref(currentLang).label) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["VPNavScreenTranslations", { open: isOpen.value }]
        }, _attrs))} data-v-858fe1a4><button class="title" data-v-858fe1a4><span class="vpi-languages icon lang" data-v-858fe1a4></span> ${ssrInterpolate(unref(currentLang).label)} <span class="vpi-chevron-down icon chevron" data-v-858fe1a4></span></button><ul class="list" data-v-858fe1a4><!--[-->`);
        ssrRenderList(unref(localeLinks), (locale) => {
          _push(`<li class="item" data-v-858fe1a4>`);
          _push(ssrRenderComponent(_sfc_main$1a, {
            class: "link",
            href: locale.link
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(locale.text)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(locale.text), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenTranslations.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const VPNavScreenTranslations = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-858fe1a4"]]);
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreen",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  setup(__props) {
    const screen = ref(null);
    useScrollLock(inBrowser ? document.body : null);
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.open) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "VPNavScreen",
          ref_key: "screen",
          ref: screen,
          id: "VPNavScreen"
        }, _attrs))} data-v-f2779853><div class="container" data-v-f2779853>`);
        ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push, _parent);
        _push(ssrRenderComponent(_sfc_main$v, { class: "menu" }, null, _parent));
        _push(ssrRenderComponent(VPNavScreenTranslations, { class: "translations" }, null, _parent));
        _push(ssrRenderComponent(VPNavScreenAppearance, { class: "appearance" }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$u, { class: "social-links" }, null, _parent));
        ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push, _parent);
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreen.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const VPNavScreen = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-f2779853"]]);
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "VPNav",
  __ssrInlineRender: true,
  setup(__props) {
    const { isScreenOpen, closeScreen, toggleScreen } = useNav();
    const { frontmatter } = useData();
    const hasNavbar = computed(() => {
      return frontmatter.value.navbar !== false;
    });
    provide("close-screen", closeScreen);
    watchEffect(() => {
      if (inBrowser) {
        document.documentElement.classList.toggle("hide-nav", !hasNavbar.value);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (hasNavbar.value) {
        _push(`<header${ssrRenderAttrs(mergeProps({ class: "VPNav" }, _attrs))} data-v-ae24b3ad>`);
        _push(ssrRenderComponent(VPNavBar, {
          "is-screen-open": unref(isScreenOpen),
          onToggleScreen: unref(toggleScreen)
        }, {
          "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(ssrRenderComponent(VPNavScreen, { open: unref(isScreenOpen) }, {
          "nav-screen-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)
              ];
            }
          }),
          "nav-screen-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(`</header>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNav.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const VPNav = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-ae24b3ad"]]);
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "VPSidebarItem",
  __ssrInlineRender: true,
  props: {
    item: {},
    depth: {}
  },
  setup(__props) {
    const props = __props;
    const {
      collapsed,
      collapsible,
      isLink,
      isActiveLink,
      hasActiveLink: hasActiveLink2,
      hasChildren,
      toggle
    } = useSidebarControl(computed(() => props.item));
    const sectionTag = computed(() => hasChildren.value ? "section" : `div`);
    const linkTag = computed(() => isLink.value ? "a" : "div");
    const textTag = computed(() => {
      return !hasChildren.value ? "p" : props.depth + 2 === 7 ? "p" : `h${props.depth + 2}`;
    });
    const itemRole = computed(() => isLink.value ? void 0 : "button");
    const classes = computed(() => [
      [`level-${props.depth}`],
      { collapsible: collapsible.value },
      { collapsed: collapsed.value },
      { "is-link": isLink.value },
      { "is-active": isActiveLink.value },
      { "has-active": hasActiveLink2.value }
    ]);
    function onItemInteraction(e) {
      if ("key" in e && e.key !== "Enter") {
        return;
      }
      !props.item.link && toggle();
    }
    function onCaretClick() {
      props.item.link && toggle();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VPSidebarItem = resolveComponent("VPSidebarItem", true);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(sectionTag.value), mergeProps({
        class: ["VPSidebarItem", classes.value]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.item.text) {
              _push2(`<div class="item"${ssrRenderAttr("role", itemRole.value)}${ssrRenderAttr("tabindex", __props.item.items && 0)} data-v-b3fd67f8${_scopeId}><div class="indicator" data-v-b3fd67f8${_scopeId}></div>`);
              if (__props.item.link) {
                _push2(ssrRenderComponent(_sfc_main$1a, {
                  tag: linkTag.value,
                  class: "link",
                  href: __props.item.link,
                  rel: __props.item.rel,
                  target: __props.item.target
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(textTag.value), { class: "text" }, null), _parent3, _scopeId2);
                    } else {
                      return [
                        (openBlock(), createBlock(resolveDynamicComponent(textTag.value), {
                          class: "text",
                          innerHTML: __props.item.text
                        }, null, 8, ["innerHTML"]))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(textTag.value), { class: "text" }, null), _parent2, _scopeId);
              }
              if (__props.item.collapsed != null && __props.item.items && __props.item.items.length) {
                _push2(`<div class="caret" role="button" aria-label="toggle section" tabindex="0" data-v-b3fd67f8${_scopeId}><span class="vpi-chevron-right caret-icon" data-v-b3fd67f8${_scopeId}></span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.item.items && __props.item.items.length) {
              _push2(`<div class="items" data-v-b3fd67f8${_scopeId}>`);
              if (__props.depth < 5) {
                _push2(`<!--[-->`);
                ssrRenderList(__props.item.items, (i) => {
                  _push2(ssrRenderComponent(_component_VPSidebarItem, {
                    key: i.text,
                    item: i,
                    depth: __props.depth + 1
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.item.text ? (openBlock(), createBlock("div", mergeProps({
                key: 0,
                class: "item",
                role: itemRole.value
              }, toHandlers(
                __props.item.items ? { click: onItemInteraction, keydown: onItemInteraction } : {},
                true
              ), {
                tabindex: __props.item.items && 0
              }), [
                createVNode("div", { class: "indicator" }),
                __props.item.link ? (openBlock(), createBlock(_sfc_main$1a, {
                  key: 0,
                  tag: linkTag.value,
                  class: "link",
                  href: __props.item.link,
                  rel: __props.item.rel,
                  target: __props.item.target
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(textTag.value), {
                      class: "text",
                      innerHTML: __props.item.text
                    }, null, 8, ["innerHTML"]))
                  ]),
                  _: 1
                }, 8, ["tag", "href", "rel", "target"])) : (openBlock(), createBlock(resolveDynamicComponent(textTag.value), {
                  key: 1,
                  class: "text",
                  innerHTML: __props.item.text
                }, null, 8, ["innerHTML"])),
                __props.item.collapsed != null && __props.item.items && __props.item.items.length ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "caret",
                  role: "button",
                  "aria-label": "toggle section",
                  onClick: onCaretClick,
                  onKeydown: withKeys(onCaretClick, ["enter"]),
                  tabindex: "0"
                }, [
                  createVNode("span", { class: "vpi-chevron-right caret-icon" })
                ], 32)) : createCommentVNode("", true)
              ], 16, ["role", "tabindex"])) : createCommentVNode("", true),
              __props.item.items && __props.item.items.length ? (openBlock(), createBlock("div", {
                key: 1,
                class: "items"
              }, [
                __props.depth < 5 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.item.items, (i) => {
                  return openBlock(), createBlock(_component_VPSidebarItem, {
                    key: i.text,
                    item: i,
                    depth: __props.depth + 1
                  }, null, 8, ["item", "depth"]);
                }), 128)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }), _parent);
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebarItem.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const VPSidebarItem = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-b3fd67f8"]]);
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "VPSidebarGroup",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const disableTransition = ref(true);
    let timer = null;
    onMounted(() => {
      timer = setTimeout(() => {
        timer = null;
        disableTransition.value = false;
      }, 300);
    });
    onBeforeUnmount(() => {
      if (timer != null) {
        clearTimeout(timer);
        timer = null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<div class="${ssrRenderClass([{ "no-transition": disableTransition.value }, "group"])}" data-v-c40bc020>`);
        _push(ssrRenderComponent(VPSidebarItem, {
          item,
          depth: 0
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebarGroup.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const VPSidebarGroup = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-c40bc020"]]);
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "VPSidebar",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  setup(__props) {
    const { sidebarGroups, hasSidebar } = useSidebar();
    const props = __props;
    const navEl = ref(null);
    const isLocked = useScrollLock(inBrowser ? document.body : null);
    watch(
      [props, navEl],
      () => {
        var _a;
        if (props.open) {
          isLocked.value = true;
          (_a = navEl.value) == null ? void 0 : _a.focus();
        } else isLocked.value = false;
      },
      { immediate: true, flush: "post" }
    );
    const key = ref(0);
    watch(
      sidebarGroups,
      () => {
        key.value += 1;
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(hasSidebar)) {
        _push(`<aside${ssrRenderAttrs(mergeProps({
          class: ["VPSidebar", { open: __props.open }],
          ref_key: "navEl",
          ref: navEl
        }, _attrs))} data-v-319d5ca6><div class="curtain" data-v-319d5ca6></div><nav class="nav" id="VPSidebarNav" aria-labelledby="sidebar-aria-label" tabindex="-1" data-v-319d5ca6><span class="visually-hidden" id="sidebar-aria-label" data-v-319d5ca6> Sidebar Navigation </span>`);
        ssrRenderSlot(_ctx.$slots, "sidebar-nav-before", {}, null, _push, _parent);
        _push(ssrRenderComponent(VPSidebarGroup, {
          items: unref(sidebarGroups),
          key: key.value
        }, null, _parent));
        ssrRenderSlot(_ctx.$slots, "sidebar-nav-after", {}, null, _push, _parent);
        _push(`</nav></aside>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebar.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const VPSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-319d5ca6"]]);
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "VPSkipLink",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const route = useRoute();
    const backToTop = ref();
    watch(() => route.path, () => backToTop.value.focus());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><span tabindex="-1" data-v-0b0ada53></span><a href="#VPContent" class="VPSkipLink visually-hidden" data-v-0b0ada53>${ssrInterpolate(unref(theme2).skipToContentLabel || "Skip to content")}</a><!--]-->`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSkipLink.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const VPSkipLink = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-0b0ada53"]]);
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      isOpen: isSidebarOpen,
      open: openSidebar,
      close: closeSidebar
    } = useSidebar();
    const route = useRoute();
    watch(() => route.path, closeSidebar);
    useCloseSidebarOnEscape(isSidebarOpen, closeSidebar);
    const { frontmatter } = useData();
    const slots = useSlots();
    const heroImageSlotExists = computed(() => !!slots["home-hero-image"]);
    provide("hero-image-slot-exists", heroImageSlotExists);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = resolveComponent("Content");
      if (unref(frontmatter).layout !== false) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["Layout", unref(frontmatter).pageClass]
        }, _attrs))} data-v-5d98c3a5>`);
        ssrRenderSlot(_ctx.$slots, "layout-top", {}, null, _push, _parent);
        _push(ssrRenderComponent(VPSkipLink, null, null, _parent));
        _push(ssrRenderComponent(VPBackdrop, {
          class: "backdrop",
          show: unref(isSidebarOpen),
          onClick: unref(closeSidebar)
        }, null, _parent));
        _push(ssrRenderComponent(VPNav, null, {
          "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)
              ];
            }
          }),
          "nav-screen-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)
              ];
            }
          }),
          "nav-screen-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(ssrRenderComponent(VPLocalNav, {
          open: unref(isSidebarOpen),
          onOpenMenu: unref(openSidebar)
        }, null, _parent));
        _push(ssrRenderComponent(VPSidebar, { open: unref(isSidebarOpen) }, {
          "sidebar-nav-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "sidebar-nav-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "sidebar-nav-before", {}, void 0, true)
              ];
            }
          }),
          "sidebar-nav-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "sidebar-nav-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "sidebar-nav-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(ssrRenderComponent(VPContent, null, {
          "page-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "page-top", {}, void 0, true)
              ];
            }
          }),
          "page-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "page-bottom", {}, void 0, true)
              ];
            }
          }),
          "not-found": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "not-found", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "not-found", {}, void 0, true)
              ];
            }
          }),
          "home-hero-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-before", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)
              ];
            }
          }),
          "home-hero-actions-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)
              ];
            }
          }),
          "home-hero-image": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)
              ];
            }
          }),
          "home-hero-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-after", {}, void 0, true)
              ];
            }
          }),
          "home-features-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-before", {}, void 0, true)
              ];
            }
          }),
          "home-features-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-after", {}, void 0, true)
              ];
            }
          }),
          "doc-footer-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
              ];
            }
          }),
          "doc-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-before", {}, void 0, true)
              ];
            }
          }),
          "doc-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)
              ];
            }
          }),
          "doc-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-top", {}, void 0, true)
              ];
            }
          }),
          "doc-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-bottom", {}, void 0, true)
              ];
            }
          }),
          "aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
              ];
            }
          }),
          "aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(ssrRenderComponent(VPFooter, null, null, _parent));
        ssrRenderSlot(_ctx.$slots, "layout-bottom", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_component_Content, _attrs, null, _parent));
      }
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/Layout.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const Layout = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-5d98c3a5"]]);
const GridSettings = {
  xmini: [[0, 2]],
  mini: [],
  small: [
    [920, 6],
    [768, 5],
    [640, 4],
    [480, 3],
    [0, 2]
  ],
  medium: [
    [960, 5],
    [832, 4],
    [640, 3],
    [480, 2]
  ],
  big: [
    [832, 3],
    [640, 2]
  ]
};
function useSponsorsGrid({ el, size = "medium" }) {
  const onResize = throttleAndDebounce(manage, 100);
  onMounted(() => {
    manage();
    window.addEventListener("resize", onResize);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });
  function manage() {
    adjustSlots(el.value, size);
  }
}
function adjustSlots(el, size) {
  const tsize = el.children.length;
  const asize = el.querySelectorAll(".vp-sponsor-grid-item:not(.empty)").length;
  const grid = setGrid(el, size, asize);
  manageSlots(el, grid, tsize, asize);
}
function setGrid(el, size, items) {
  const settings = GridSettings[size];
  const screen = window.innerWidth;
  let grid = 1;
  settings.some(([breakpoint, value]) => {
    if (screen >= breakpoint) {
      grid = items < value ? items : value;
      return true;
    }
  });
  setGridData(el, grid);
  return grid;
}
function setGridData(el, value) {
  el.dataset.vpGrid = String(value);
}
function manageSlots(el, grid, tsize, asize) {
  const diff = tsize - asize;
  const rem = asize % grid;
  const drem = rem === 0 ? rem : grid - rem;
  neutralizeSlots(el, drem - diff);
}
function neutralizeSlots(el, count) {
  if (count === 0) {
    return;
  }
  count > 0 ? addSlots(el, count) : removeSlots(el, count * -1);
}
function addSlots(el, count) {
  for (let i = 0; i < count; i++) {
    const slot = document.createElement("div");
    slot.classList.add("vp-sponsor-grid-item", "empty");
    el.append(slot);
  }
}
function removeSlots(el, count) {
  for (let i = 0; i < count; i++) {
    el.removeChild(el.lastElementChild);
  }
}
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "VPSponsorsGrid",
  __ssrInlineRender: true,
  props: {
    size: { default: "medium" },
    data: {}
  },
  setup(__props) {
    const props = __props;
    const el = ref(null);
    useSponsorsGrid({ el, size: props.size });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPSponsorsGrid vp-sponsor-grid", [__props.size]],
        ref_key: "el",
        ref: el
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.data, (sponsor) => {
        _push(`<div class="vp-sponsor-grid-item"><a class="vp-sponsor-grid-link"${ssrRenderAttr("href", sponsor.url)} target="_blank" rel="sponsored noopener"><article class="vp-sponsor-grid-box"><h4 class="visually-hidden">${ssrInterpolate(sponsor.name)}</h4><img class="vp-sponsor-grid-image"${ssrRenderAttr("src", sponsor.img)}${ssrRenderAttr("alt", sponsor.name)}></article></a></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSponsorsGrid.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "VPSponsors",
  __ssrInlineRender: true,
  props: {
    mode: { default: "normal" },
    tier: {},
    size: {},
    data: {}
  },
  setup(__props) {
    const props = __props;
    const sponsors = computed(() => {
      const isSponsors = props.data.some((s) => {
        return "items" in s;
      });
      if (isSponsors) {
        return props.data;
      }
      return [
        { tier: props.tier, size: props.size, items: props.data }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPSponsors vp-sponsor", [__props.mode]]
      }, _attrs))}><!--[-->`);
      ssrRenderList(sponsors.value, (sponsor, index) => {
        _push(`<section class="vp-sponsor-section">`);
        if (sponsor.tier) {
          _push(`<h3 class="vp-sponsor-tier">${ssrInterpolate(sponsor.tier)}</h3>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$l, {
          size: sponsor.size,
          data: sponsor.items
        }, null, _parent));
        _push(`</section>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSponsors.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideSponsors",
  __ssrInlineRender: true,
  props: {
    tier: {},
    size: {},
    data: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAsideSponsors" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$k, {
        mode: "aside",
        tier: __props.tier,
        size: __props.size,
        data: __props.data
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "VPHomeSponsors",
  __ssrInlineRender: true,
  props: {
    message: {},
    actionText: { default: "Become a sponsor" },
    actionLink: {},
    data: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "VPHomeSponsors" }, _attrs))} data-v-3d121b4a><div class="container" data-v-3d121b4a><div class="header" data-v-3d121b4a><div class="love" data-v-3d121b4a><span class="vpi-heart icon" data-v-3d121b4a></span></div>`);
      if (__props.message) {
        _push(`<h2 class="message" data-v-3d121b4a>${ssrInterpolate(__props.message)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="sponsors" data-v-3d121b4a>`);
      _push(ssrRenderComponent(_sfc_main$k, { data: __props.data }, null, _parent));
      _push(`</div>`);
      if (__props.actionLink) {
        _push(`<div class="action" data-v-3d121b4a>`);
        _push(ssrRenderComponent(VPButton, {
          theme: "sponsor",
          text: __props.actionText,
          href: __props.actionLink
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeSponsors.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "VPTeamMembersItem",
  __ssrInlineRender: true,
  props: {
    size: { default: "medium" },
    member: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: ["VPTeamMembersItem", [__props.size]]
      }, _attrs))} data-v-f3fa364a><div class="profile" data-v-f3fa364a><figure class="avatar" data-v-f3fa364a><img class="avatar-img"${ssrRenderAttr("src", __props.member.avatar)}${ssrRenderAttr("alt", __props.member.name)} data-v-f3fa364a></figure><div class="data" data-v-f3fa364a><h1 class="name" data-v-f3fa364a>${ssrInterpolate(__props.member.name)}</h1>`);
      if (__props.member.title || __props.member.org) {
        _push(`<p class="affiliation" data-v-f3fa364a>`);
        if (__props.member.title) {
          _push(`<span class="title" data-v-f3fa364a>${ssrInterpolate(__props.member.title)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.member.title && __props.member.org) {
          _push(`<span class="at" data-v-f3fa364a> @ </span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.member.org) {
          _push(ssrRenderComponent(_sfc_main$1a, {
            class: ["org", { link: __props.member.orgLink }],
            href: __props.member.orgLink,
            "no-icon": ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(__props.member.org)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(__props.member.org), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.member.desc) {
        _push(`<p class="desc" data-v-f3fa364a>${__props.member.desc ?? ""}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.member.links) {
        _push(`<div class="links" data-v-f3fa364a>`);
        _push(ssrRenderComponent(VPSocialLinks, {
          links: __props.member.links
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.member.sponsor) {
        _push(`<div class="sp" data-v-f3fa364a>`);
        _push(ssrRenderComponent(_sfc_main$1a, {
          class: "sp-link",
          href: __props.member.sponsor,
          "no-icon": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="vpi-heart sp-icon" data-v-f3fa364a${_scopeId}></span> ${ssrInterpolate(__props.member.actionText || "Sponsor")}`);
            } else {
              return [
                createVNode("span", { class: "vpi-heart sp-icon" }),
                createTextVNode(" " + toDisplayString(__props.member.actionText || "Sponsor"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</article>`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamMembersItem.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const VPTeamMembersItem = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-f3fa364a"]]);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "VPTeamMembers",
  __ssrInlineRender: true,
  props: {
    size: { default: "medium" },
    members: {}
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => [props.size, `count-${props.members.length}`]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPTeamMembers", classes.value]
      }, _attrs))} data-v-6cb0dbc4><div class="container" data-v-6cb0dbc4><!--[-->`);
      ssrRenderList(__props.members, (member) => {
        _push(`<div class="item" data-v-6cb0dbc4>`);
        _push(ssrRenderComponent(VPTeamMembersItem, {
          size: __props.size,
          member
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamMembers.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = {};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPage.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = {};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPageSection.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = {};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const theme = {
  Layout,
  enhanceApp: ({ app }) => {
    app.component("Badge", _sfc_main$1h);
  }
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "CompareCard",
  __ssrInlineRender: true,
  props: {
    title: { default: "概念对比" },
    leftTitle: {},
    rightTitle: {},
    left: {},
    right: {},
    summary: {}
  },
  setup(__props) {
    const props = __props;
    function toItems(value) {
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    }
    const leftItems = computed(() => toItems(props.left));
    const rightItems = computed(() => toItems(props.right));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "compare study-card" }, _attrs))} data-v-c647d128><p class="compare__eyebrow" data-v-c647d128>${ssrInterpolate(__props.title)}</p><div class="compare__grid" data-v-c647d128><article class="compare__side" data-v-c647d128><h3 data-v-c647d128>${ssrInterpolate(__props.leftTitle)}</h3>`);
      if (leftItems.value.length) {
        _push(`<ul data-v-c647d128><!--[-->`);
        ssrRenderList(leftItems.value, (item) => {
          _push(`<li data-v-c647d128>${ssrInterpolate(item)}</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        ssrRenderSlot(_ctx.$slots, "left", {}, null, _push, _parent);
      }
      _push(`</article><article class="compare__side" data-v-c647d128><h3 data-v-c647d128>${ssrInterpolate(__props.rightTitle)}</h3>`);
      if (rightItems.value.length) {
        _push(`<ul data-v-c647d128><!--[-->`);
        ssrRenderList(rightItems.value, (item) => {
          _push(`<li data-v-c647d128>${ssrInterpolate(item)}</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        ssrRenderSlot(_ctx.$slots, "right", {}, null, _push, _parent);
      }
      _push(`</article></div>`);
      if (__props.summary) {
        _push(`<p class="compare__summary" data-v-c647d128>${ssrInterpolate(__props.summary)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../components/CompareCard.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const CompareCard = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-c647d128"]]);
const STORAGE_KEYS = {
  readPages: "os-notes:read-pages",
  doneQuestions: "os-notes:done-questions",
  wrongQuestions: "os-notes:wrong-questions"
};
function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}
function readJson(key, fallback) {
  if (!canUseStorage()) return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
function writeJson(key, value) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}
function byNewest(a, b) {
  return (b.at || b.readAt || 0) - (a.at || a.readAt || 0);
}
function markPageRead(record) {
  const pages = readJson(STORAGE_KEYS.readPages, []);
  const next = [record, ...pages.filter((page) => page.path !== record.path)].sort(byNewest);
  writeJson(STORAGE_KEYS.readPages, next);
}
function getReadPages() {
  return readJson(STORAGE_KEYS.readPages, []).sort(byNewest);
}
function getDoneQuestionIds() {
  return readJson(STORAGE_KEYS.doneQuestions, []);
}
function getWrongQuestions() {
  return readJson(STORAGE_KEYS.wrongQuestions, []).sort(byNewest);
}
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "AdditionReviewPaper",
  __ssrInlineRender: true,
  setup(__props) {
    const questions = [
      {
        id: "addition-01",
        type: "single",
        title: "多级页表",
        question: "关于多级页表，下列说法不正确的是哪一项？",
        options: [
          { label: "A", text: "能够减少页表占用内存大小。" },
          { label: "B", text: "级数越多，平均访问内存时间越长。" },
          { label: "C", text: "有效页表项中都会存储页框号。" },
          { label: "D", text: "使用二级页表平均访存性能优于一级页表。" }
        ],
        answer: "D",
        sourceAnswer: "A",
        explanation: "多级页表的主要收益是按需分配下级页表，从而节省页表空间；但页表级数越多，TLB 未命中时的页表遍历通常更长，因此不能说二级页表平均访存性能优于一级页表。"
      },
      {
        id: "addition-02",
        type: "multiple",
        title: "x86 分段地址转换",
        question: "Intel x86 下，从段式地址到线性地址转换中可能需要查找哪些对象？",
        options: [
          { label: "A", text: "GDT" },
          { label: "B", text: "LDT" },
          { label: "C", text: "页目录" },
          { label: "D", text: "页表" }
        ],
        answer: ["A", "B"],
        sourceAnswer: "A",
        explanation: "段式地址到线性地址的转换要用段选择子在 GDT 或 LDT 中找到段描述符。页目录和页表属于线性地址到物理地址的分页阶段，不属于本题这一问。"
      },
      {
        id: "addition-03",
        type: "multiple",
        title: "请求式分页",
        question: "页表项 `Valid = 0` 可以说明什么？",
        options: [
          { label: "A", text: "该页当前还未映射到物理页框。" },
          { label: "B", text: "该页已经装入内存。" },
          { label: "C", text: "访问它会触发缺页异常。" },
          { label: "D", text: "页面内容可能位于磁盘上。" }
        ],
        answer: ["A", "C", "D"],
        sourceAnswer: "A、C",
        explanation: "在请求式分页语境下，`Valid = 0` 表示当前页表项无效，访问它会触发缺页异常；页面尚未分配物理页框，或者内容暂时在磁盘上，都是合理解释。"
      },
      {
        id: "addition-04",
        type: "multiple",
        title: "可重入代码",
        question: "关于可重入代码，下列说法正确的是哪些？",
        options: [
          { label: "A", text: "即使系统里只有一个用户进程，也仍然可能需要可重入代码。" },
          { label: "B", text: "可重入代码一般不依赖可修改的全局变量。" },
          { label: "C", text: "可重入代码一般不依赖可修改的静态局部变量。" },
          { label: "D", text: "可重入代码可被多个执行流安全共享。" }
        ],
        answer: ["A", "B", "C", "D"],
        sourceAnswer: "B、C、D",
        explanation: "A 也正确。即使只有一个用户进程，也可能因为中断、异常、信号处理或递归再次进入同一段代码。可重入代码的关键是不要依赖未受保护的可修改共享状态。"
      },
      {
        id: "addition-05",
        type: "blank",
        title: "Clock 页面置换",
        question: "引用串 `0,1,7,2,3,2,7,1,0,3`，4 个页框，Clock 算法产生多少次缺页？",
        answers: ["6"],
        placeholder: "输入数字",
        sourceAnswer: "7",
        explanation: "按这套题库的默认规则，新装入页的访问位设为 1。按照 Clock 的扫描和二次机会逻辑模拟，最终缺页次数是 6 次。"
      },
      {
        id: "addition-06",
        type: "blank",
        title: "按需调页平均延迟因素",
        question: "按原题选项字母作答：影响按需调页平均延迟的正确选项是哪些？",
        answers: ["ABCD", "A,B,C,D", "A、B、C、D"],
        placeholder: "例如 A、B、C、D",
        sourceAnswer: "A、B、D",
        answerNote: "原始选项未完整保留，本题按老师原题的字母集合回忆作答。",
        explanation: "你当时漏掉了 C。题目确认的最终答案是 A、B、C、D，其中 C 对应“进程切换开销”，它也是影响按需调页平均延迟的因素。"
      },
      {
        id: "addition-07",
        type: "blank",
        title: "虚拟内存说法",
        question: "按原题选项字母作答：关于虚拟内存说法正确的是哪些？",
        answers: ["ABCD", "A,B,C,D", "A、B、C、D"],
        placeholder: "例如 A、B、C、D",
        sourceAnswer: "B、C、D",
        answerNote: "原始选项未完整保留，本题按老师原题的字母集合回忆作答。",
        explanation: "本题最终答案是 A、B、C、D。易错点在 A：在这套题库的教学语境里，“页表需要占用虚拟地址空间”判为正确。"
      },
      {
        id: "addition-08",
        type: "blank",
        title: "4MB 对齐",
        question: "按原题选项字母作答：以下哪个地址不是 4MB 对齐的？",
        answers: ["C"],
        placeholder: "输入选项字母",
        sourceAnswer: "C",
        answerNote: "原始选项未完整保留，本题按老师原题的字母回忆作答。",
        explanation: "你原本作答 C 是对的。中途曾误判为 D，但最后已经修正，正确答案仍然是 C。"
      },
      {
        id: "addition-09",
        type: "blank",
        title: "自映射地址类型",
        question: "按原题选项字母作答：页目录自映射计算过程中，正确的地址类型对应哪一项？",
        answers: ["B"],
        placeholder: "输入选项字母",
        sourceAnswer: "B",
        answerNote: "原始选项未完整保留，本题按老师原题的字母回忆作答。",
        explanation: "这题最终正确答案是 B。之前曾误判过 C，后来已经修正。"
      },
      {
        id: "addition-10",
        type: "blank",
        title: "fork()",
        question: "按原题选项字母作答：关于 `fork()`，下列说法不正确的是哪一项？",
        answers: ["D"],
        placeholder: "输入选项字母",
        sourceAnswer: "B",
        answerNote: "原始选项未完整保留，本题按老师原题的字母回忆作答。",
        explanation: "牢记 `pid = fork();` 后，子进程得到返回值 0，父进程得到子进程 PID。因此本题不正确的是 D，而不是 B。"
      },
      {
        id: "addition-11",
        type: "blank",
        title: "PCB",
        question: "按原题选项字母作答：PCB 中记录的信息包括哪些？",
        answers: ["BCDEF", "B,C,D,E,F", "B C D E F", "B、C、D、E、F"],
        placeholder: "例如 B、C、D、E、F",
        sourceAnswer: "B、C、D、E、F、G、H",
        answerNote: "原始选项未完整保留，本题按老师原题的字母集合回忆作答。",
        explanation: "最终正确答案是 B、C、D、E、F。G“代码段长度”和 H“符号表”不属于 PCB 必备记录项。PCB 主要保存进程标识、状态、调度信息、寄存器现场、内存和文件等运行管理信息。"
      },
      {
        id: "addition-12",
        type: "single",
        title: "Peterson 临界区算法",
        question: "Peterson 临界区算法更适合哪种情况的调度？",
        options: [
          { label: "A", text: "抢占式调度" },
          { label: "B", text: "非抢占式调度" }
        ],
        answer: "A",
        sourceAnswer: "B",
        explanation: "Peterson 算法面向两个并发执行的进程，通过共享变量和忙等待实现互斥。它默认进程在竞争期间可能被随时切换，因此更典型地适用于抢占式调度环境；在非抢占式调度下，互斥问题本身会被弱化。"
      },
      {
        id: "addition-13",
        type: "single",
        title: "管程",
        question: "关于管程，不正确的是哪一项？",
        options: [
          { label: "A", text: "管程是一种高级同步原语。" },
          { label: "B", text: "管程可以解决信号量无法解决的进程同步问题。" },
          { label: "C", text: "管程需要依赖编译器和语言支持。" },
          { label: "D", text: "同一时刻，只有一个进程可以在管程内执行。" }
        ],
        answer: "B",
        sourceAnswer: "A",
        explanation: "A、C、D 都成立。错误在 B：管程不是比信号量“能力更强”，而是把同步机制封装得更安全、更易写。理论上信号量可以实现管程功能，所以不能说管程能解决而信号量不能解决的问题。"
      },
      {
        id: "addition-14",
        type: "multiple",
        title: "信号量集",
        question: "对于信号量集，下列说法错误的是哪些？",
        options: [
          { label: "A", text: "`SP(S,d,e)` 表示每次申请 `d` 个资源，当资源数量小于 `e` 个时便不予分配。" },
          { label: "B", text: "`SP(S,0,1)` 表示互斥信号量。" },
          { label: "C", text: "`SP(S,1,0)` 在 `S = 0` 时禁止任何进程进入临界区。" }
        ],
        answer: ["A", "B"],
        sourceAnswer: "B、C",
        explanation: "`SP(S,d,e)` 的准确条件是 `S ≥ d` 且 `S - d ≥ e`，所以 A 错在只看了 `e` 而忽略了申请量 `d`。`SP(S,0,1)` 申请 0 个资源，没有互斥意义，因此 B 也错。C 是对的，因为 `SP(S,1,0)` 在 `S = 0` 时确实无法分配资源。"
      }
    ];
    const singleAnswers = ref({});
    const multipleAnswers = ref({});
    const blankAnswers = ref({});
    const submitted = ref({});
    const answeredCount = computed(() => questions.filter((question) => hasAnswered(question)).length);
    function normalize(value) {
      return value.trim().toUpperCase().replace(/[，、,\s]+/g, "");
    }
    function hasAnswered(question) {
      var _a, _b;
      if (question.type === "single") return Boolean(singleAnswers.value[question.id]);
      if (question.type === "multiple") return Boolean((_a = multipleAnswers.value[question.id]) == null ? void 0 : _a.length);
      return Boolean((_b = blankAnswers.value[question.id]) == null ? void 0 : _b.trim());
    }
    function isCorrect(question) {
      if (question.type === "single") {
        return singleAnswers.value[question.id] === question.answer;
      }
      if (question.type === "multiple") {
        const selected2 = [...multipleAnswers.value[question.id] || []].sort().join("");
        return selected2 === [...question.answer].sort().join("");
      }
      const selected = normalize(blankAnswers.value[question.id] || "");
      return question.answers.some((answer) => normalize(answer) === selected);
    }
    function answerText(question) {
      if (question.type === "single") return question.answer;
      if (question.type === "multiple") return question.answer.join("、");
      return question.answers[0];
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "addition-paper" }, _attrs))} data-v-ae8b5f69><header class="addition-paper__hero" data-v-ae8b5f69><div data-v-ae8b5f69><p class="addition-paper__eyebrow" data-v-ae8b5f69>Comprehensive Review</p><h2 data-v-ae8b5f69>补充综合测试</h2><p data-v-ae8b5f69>共 11 题，按题提交即可看到答案与解析。部分题目原始选项未完整保留，页面里已明确标注为“按原题字母回忆作答”。</p></div><div class="addition-paper__meta" data-v-ae8b5f69><strong data-v-ae8b5f69>${ssrInterpolate(answeredCount.value)} / ${ssrInterpolate(questions.length)}</strong><span data-v-ae8b5f69>已作答</span></div></header><!--[-->`);
      ssrRenderList(questions, (question, index) => {
        _push(`<article class="addition-question" data-v-ae8b5f69><header class="addition-question__header" data-v-ae8b5f69><div data-v-ae8b5f69><p class="addition-question__index" data-v-ae8b5f69>第 ${ssrInterpolate(index + 1)} 题</p><h3 data-v-ae8b5f69>${ssrInterpolate(question.title)}</h3></div><span class="addition-question__type" data-v-ae8b5f69>${ssrInterpolate(question.type === "single" ? "单选" : question.type === "multiple" ? "多选" : "填空/字母作答")}</span></header><p class="addition-question__stem" data-v-ae8b5f69>${ssrInterpolate(question.question)}</p>`);
        if (question.answerNote) {
          _push(`<p class="addition-question__note" data-v-ae8b5f69>${ssrInterpolate(question.answerNote)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (question.type === "single") {
          _push(`<div class="addition-options" data-v-ae8b5f69><!--[-->`);
          ssrRenderList(question.options, (option) => {
            _push(`<button type="button"${ssrIncludeBooleanAttr(submitted.value[question.id]) ? " disabled" : ""} class="${ssrRenderClass({
              "is-selected": singleAnswers.value[question.id] === option.label,
              "is-answer": submitted.value[question.id] && question.answer === option.label,
              "is-wrong": submitted.value[question.id] && singleAnswers.value[question.id] === option.label && singleAnswers.value[question.id] !== question.answer
            })}" data-v-ae8b5f69><strong data-v-ae8b5f69>${ssrInterpolate(option.label)}</strong><span data-v-ae8b5f69>${ssrInterpolate(option.text)}</span></button>`);
          });
          _push(`<!--]--></div>`);
        } else if (question.type === "multiple") {
          _push(`<div class="addition-options" data-v-ae8b5f69><!--[-->`);
          ssrRenderList(question.options, (option) => {
            _push(`<button type="button"${ssrIncludeBooleanAttr(submitted.value[question.id]) ? " disabled" : ""} class="${ssrRenderClass({
              "is-selected": (multipleAnswers.value[question.id] || []).includes(option.label),
              "is-answer": submitted.value[question.id] && question.answer.includes(option.label),
              "is-wrong": submitted.value[question.id] && (multipleAnswers.value[question.id] || []).includes(option.label) && !question.answer.includes(option.label)
            })}" data-v-ae8b5f69><strong data-v-ae8b5f69>${ssrInterpolate(option.label)}</strong><span data-v-ae8b5f69>${ssrInterpolate(option.text)}</span></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<label class="addition-blank" data-v-ae8b5f69><span data-v-ae8b5f69>你的作答</span><input${ssrRenderAttr("value", blankAnswers.value[question.id])}${ssrIncludeBooleanAttr(submitted.value[question.id]) ? " disabled" : ""} type="text"${ssrRenderAttr("placeholder", question.placeholder || "输入答案")} data-v-ae8b5f69></label>`);
        }
        _push(`<div class="addition-question__actions" data-v-ae8b5f69><span data-v-ae8b5f69>你当时的答案：${ssrInterpolate(question.sourceAnswer)}</span><button type="button"${ssrIncludeBooleanAttr(!hasAnswered(question) || submitted.value[question.id]) ? " disabled" : ""} data-v-ae8b5f69> 提交本题 </button></div>`);
        if (submitted.value[question.id]) {
          _push(`<div class="${ssrRenderClass([{ "is-correct": isCorrect(question) }, "addition-result"])}" data-v-ae8b5f69><strong data-v-ae8b5f69>${ssrInterpolate(isCorrect(question) ? "回答正确" : `回答错误，标准答案：${answerText(question)}`)}</strong><p data-v-ae8b5f69>${ssrInterpolate(question.explanation)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--><footer class="addition-paper__footer" data-v-ae8b5f69><button type="button" data-v-ae8b5f69>重新作答全部题目</button></footer></section>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../components/AdditionReviewPaper.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const AdditionReviewPaper = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-ae8b5f69"]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "ExamPaper",
  __ssrInlineRender: true,
  setup(__props) {
    const trueFalseQuestions = [
      {
        id: "tf-01",
        type: "true-false",
        title: "内核态与用户态",
        question: "现代操作系统中，内核态和用户态的概念主要是为了保护操作系统的核心资源，并防止应用程序随意访问关键硬件。",
        answer: true,
        points: 2,
        explanation: "内核态/用户态的核心作用就是通过特权级隔离保护内核与关键硬件资源。"
      },
      {
        id: "tf-02",
        type: "true-false",
        title: "操作系统功能",
        question: "操作系统的主要功能包括进程管理、内存管理、文件系统、设备管理和安全管理等。",
        answer: true,
        points: 2,
        explanation: "这些都是操作系统常见的核心管理职责。"
      },
      {
        id: "tf-03",
        type: "true-false",
        title: "微内核与宏内核",
        question: "同一操作系统如果采用微内核架构比宏内核架构占用空间更小，但功能更强大且更易扩展。",
        answer: false,
        points: 2,
        explanation: "微内核通常把更多服务移到用户态，内核本体更小、扩展性较好，但不能直接推出“功能更强大”。"
      },
      {
        id: "tf-04",
        type: "true-false",
        title: "段式管理",
        question: "段式内存管理支持按照程序中“逻辑段”来分配内存，适合按功能或数据结构对内存进行更直观的划分。",
        answer: true,
        points: 2,
        explanation: "段式管理面向逻辑段，如代码段、数据段、栈段等。"
      },
      {
        id: "tf-05",
        type: "true-false",
        title: "缺页异常",
        question: "缺页异常是由程序中 Bug 引起的，需要程序员修复后才能消除。",
        answer: false,
        points: 2,
        explanation: "缺页异常是请求分页和虚拟内存中的正常机制，不等同于程序错误。"
      },
      {
        id: "tf-06",
        type: "true-false",
        title: "内核级线程阻塞",
        question: "内核级线程在进行阻塞调用时不会阻塞同一进程的其他线程，因为内核可为其他可运行线程分配 CPU。",
        answer: true,
        points: 2,
        explanation: "内核能感知并调度内核级线程，一个线程阻塞时，同进程其他可运行线程仍可被调度。"
      },
      {
        id: "tf-07",
        type: "true-false",
        title: "多对多线程模型",
        question: "在多对多线程模型中，多个用户线程可以映射到多个内核线程上，从而既保留用户线程灵活性，又避免单线程阻塞问题。",
        answer: true,
        points: 2,
        explanation: "多对多模型试图结合用户级线程灵活性和内核级并行/阻塞处理能力。"
      },
      {
        id: "tf-08",
        type: "true-false",
        title: "自旋锁适用场景",
        question: "自旋锁在高并发且临界区执行时间较长的场景下一般更有效率，因为线程会一直占用 CPU 等待锁释放，避免上下文切换。",
        answer: false,
        points: 2,
        explanation: "自旋锁适合临界区很短的场景；等待时间长时会浪费 CPU。"
      },
      {
        id: "tf-09",
        type: "true-false",
        title: "信号量用途",
        question: "使用信号量既可以实现互斥，也可以实现同步的功能。",
        answer: true,
        points: 2,
        explanation: "二元信号量可用于互斥，计数或事件信号量也可表达同步约束。"
      },
      {
        id: "tf-10",
        type: "true-false",
        title: "线程资源",
        question: "同一进程内的多个线程共享地址空间，但它们各自拥有独立的寄存器上下文和栈空间。",
        answer: true,
        points: 2,
        explanation: "线程共享进程资源，但每个线程需要自己的执行现场和栈。"
      }
    ];
    const singleChoiceQuestions = [
      {
        id: "choice-01",
        type: "single",
        title: "内存空间管理数据结构",
        question: "关于内存空间管理的数据结构，下面说法错误的是哪一项？",
        options: [
          { label: "A", text: "位图表示法成本固定" },
          { label: "B", text: "链表表示法容错能力差" },
          { label: "C", text: "位图表示法时间成本低" },
          { label: "D", text: "链表表示法的空间成本取决于程序的数量" }
        ],
        answer: "C",
        points: 2,
        explanation: "位图空间开销固定，但查找连续空闲块通常需要扫描位图，不能笼统说时间成本低。"
      },
      {
        id: "choice-02",
        type: "single",
        title: "页表项结构",
        question: "关于页表项结构，正确的是哪一项？",
        options: [
          { label: "A", text: "当操作系统把该页从物理内存调出时，会对有效位置位" },
          { label: "B", text: "当硬件在写入一个页面时，硬件将该页的修改位置为 0" },
          { label: "C", text: "页表项可用于实现页面到页框的映射" },
          { label: "D", text: "页表项会保存对应页面的外存地址" }
        ],
        answer: "C",
        points: 2,
        explanation: "页表项的基本作用是记录虚拟页到物理页框的映射及权限/状态位。"
      },
      {
        id: "choice-03",
        type: "single",
        title: "多级页表",
        question: "关于多级页表，下列说法不正确的是哪一项？",
        options: [
          { label: "A", text: "能够减少页表占用内存的大小" },
          { label: "B", text: "除了顶级页表，其他级别页表可按需动态调入内存" },
          { label: "C", text: "有效的页表项中都会存储页框号" },
          { label: "D", text: "使用三级页表的平均访存性能优于二级页表" }
        ],
        answer: "D",
        points: 2,
        explanation: "页表级数越多，未命中 TLB 时页表遍历通常越长，不能说三级平均访存性能优于二级。"
      },
      {
        id: "choice-04",
        type: "single",
        title: "陷入内核与上下文切换",
        question: "以下说法正确的是哪一项？",
        options: [
          { label: "A", text: "进程上下文切换过程一定会陷入内核" },
          { label: "B", text: "陷入内核一定会导致进程切换" },
          { label: "C", text: "正在执行的程序不可以主动放弃 CPU" },
          { label: "D", text: "系统调用一定会导致进程上下文切换" }
        ],
        answer: "A",
        points: 2,
        explanation: "进程切换由内核完成；但系统调用或中断进入内核后不一定切换到另一个进程。"
      },
      {
        id: "choice-05",
        type: "single",
        title: "线程与进程",
        question: "关于线程与进程，错误的是哪一项？",
        options: [
          { label: "A", text: "一个进程可以拥有多个线程，而一个线程同时只能被一个进程所拥有" },
          { label: "B", text: "进程是资源分配的基本单位，线程是处理机调度的基本单位" },
          { label: "C", text: "使用多线程能够更好的释放多核系统的性能" },
          { label: "D", text: "相比单线程，使用多线程总能获得更好的性能" }
        ],
        answer: "D",
        points: 2,
        explanation: "多线程有同步、调度和上下文切换开销，不能保证总是优于单线程。"
      },
      {
        id: "choice-06",
        type: "single",
        title: "PV 操作",
        question: "关于 PV 操作，错误的是哪一项？",
        options: [
          { label: "A", text: "信号量可以用来解决任何进程同步问题" },
          { label: "B", text: "进程执行 P 操作阻塞时，不会占用 CPU 资源" },
          { label: "C", text: "进程 A、B 调用 P(S) 各一次后，信号量 S 的值与调用顺序有关" },
          { label: "D", text: "信号量操作是原子操作" }
        ],
        answer: "C",
        points: 2,
        explanation: "两次 P 操作对信号量值的净影响相同，最终值不应取决于 A、B 的调用顺序。"
      },
      {
        id: "choice-07",
        type: "single",
        title: "局部性原理",
        question: "关于程序的局部性原理，错误的是哪一项？",
        options: [
          { label: "A", text: "局部性原理包括时间局部性和空间局部性" },
          { label: "B", text: "虚拟存储机制的有效运转依赖程序的局部性原理" },
          { label: "C", text: "程序中的循环结构会导致程序的空间局部性" },
          { label: "D", text: "Cache-主存机制的有效运转依赖程序的局部性原理" }
        ],
        answer: "C",
        points: 2,
        explanation: "循环通常体现时间局部性；顺序访问数组等更常体现空间局部性。"
      },
      {
        id: "choice-08",
        type: "single",
        title: "页面置换算法",
        question: "关于页面置换算法，以下说法不正确的是哪一项？",
        options: [
          { label: "A", text: "二次机会算法是对 FIFO 的改进" },
          { label: "B", text: "Aging 算法是对 LRU 算法的高效近似实现" },
          { label: "C", text: "WSClock 算法仅需要在页表中扫描" },
          { label: "D", text: "工作集算法的思路是驱逐不在工作集中的页面" }
        ],
        answer: "C",
        points: 2,
        explanation: "WSClock 需要维护类似时钟的页面链表并结合访问位、修改位和时间信息，不是“仅扫描页表”。"
      },
      {
        id: "choice-09",
        type: "single",
        title: "快表",
        question: "关于快表，错误的是哪一项？",
        options: [
          { label: "A", text: "使用快表能使得页表查询速度更快" },
          { label: "B", text: "快表的命中率越高，访存的速度越快" },
          { label: "C", text: "反置页表无法使用快表加速" },
          { label: "D", text: "快表项需要记录物理块号及其对应的虚拟页号" }
        ],
        answer: "C",
        points: 2,
        explanation: "反置页表同样可以用 TLB 缓存近期地址转换结果。"
      },
      {
        id: "choice-10",
        type: "single",
        title: "覆盖与交换",
        question: "下列说法错误的是哪一项？",
        options: [
          { label: "A", text: "覆盖可减少一个程序运行所需的空间" },
          { label: "B", text: "覆盖对应用程序员不透明" },
          { label: "C", text: "交换是由操作系统实现的" },
          { label: "D", text: "覆盖在不同作业或程序之间进行" }
        ],
        answer: "D",
        points: 2,
        explanation: "覆盖通常是在同一程序内部按模块复用内存；交换才发生在进程/作业与外存之间。"
      }
    ];
    const blankQuestions = [
      {
        id: "blank-01-fifo",
        type: "blank",
        title: "FIFO 缺页次数",
        question: "页面访问序列 A B C D E F A A C F G D A C G D C E，4 个页框，FIFO 产生多少次缺页中断？",
        answers: ["11"],
        answerText: "11",
        points: 2,
        explanation: "按 FIFO 依次淘汰最早进入内存的页面，共 11 次缺页。"
      },
      {
        id: "blank-01-clock",
        type: "blank",
        title: "CLOCK 缺页次数",
        question: "同一访问序列、4 个页框，CLOCK 算法产生多少次缺页中断？",
        answers: ["11"],
        answerText: "11",
        points: 2,
        explanation: "按装入/访问置引用位、替换时扫描清零的常规定义，共 11 次缺页。"
      },
      {
        id: "blank-02-thrashing",
        type: "blank",
        title: "频繁调页现象",
        question: "并发水平上升导致每个进程常驻集减小、缺页率上升、系统频繁调页，这种现象称为什么？",
        answers: ["抖动", "颠簸", "thrashing"],
        answerText: "抖动 / 颠簸（thrashing）",
        points: 2,
        explanation: "工作集不足导致大量时间花在调页上，就是抖动。"
      },
      {
        id: "blank-03-state",
        type: "blank",
        title: "状态转换",
        question: "在操作系统进程状态模型中，进程不能直接从哪一种状态转换到运行态？",
        answers: ["阻塞态", "阻塞状态", "等待态", "等待状态", "blocked"],
        answerText: "阻塞态 / 等待态",
        points: 2,
        explanation: "阻塞进程等待事件完成后通常先进入就绪态，再由调度器分配 CPU。"
      },
      {
        id: "blank-04-uboot",
        type: "blank",
        title: "U-Boot 阶段",
        question: "U-Boot 程序中通常用 C 语言来实现的部分称为什么？",
        answers: ["第二阶段", "stage2", "stage 2", "secondstage", "second stage"],
        answerText: "第二阶段（stage 2）",
        points: 2,
        explanation: "U-Boot 早期启动通常先由汇编完成必要初始化，再进入主要由 C 编写的第二阶段。"
      },
      {
        id: "blank-05-worst-fit",
        type: "blank",
        title: "可变分区分配",
        question: "可变分区存储分配算法中，哪种算法总是挑选可以容纳作业的最大空闲区进行分配？",
        answers: ["最坏适应", "最坏适应算法", "worstfit", "worst fit"],
        answerText: "最坏适应算法（Worst Fit）",
        points: 2,
        explanation: "Worst Fit 每次选择最大的可用空闲分区。"
      },
      {
        id: "blank-06-data",
        type: "blank",
        title: "变量 a 所在段",
        question: "程序中全局变量 int a = 100; 装载后通常在哪个段中分配存储空间？",
        answers: ["数据段", ".data", "data", "已初始化数据段"],
        answerText: "数据段（.data）",
        points: 2,
        explanation: "已初始化全局变量通常放在 .data。"
      },
      {
        id: "blank-06-stack",
        type: "blank",
        title: "变量 x 所在段",
        question: "函数内局部数组 int x[100]; 运行时通常在哪个段中分配存储空间？",
        answers: ["栈", "栈段", "stack"],
        answerText: "栈段（stack）",
        points: 2,
        explanation: "普通自动局部变量通常分配在线程栈上。"
      },
      {
        id: "blank-07-dekker-wait",
        type: "blank",
        title: "Dekker 等待语句",
        question: "补全 Dekker 算法中 P0 放弃意向后等待 turn 改变的语句。",
        answers: ["while(turn==1)", "while(turn==1);", "while(turn!=0)", "while(turn!=0);"],
        answerText: "while (turn == 1);",
        points: 2,
        explanation: "P0 暂时撤销 pturn 后，应等待 turn 不再偏向 P1，再重新声明进入意向。"
      },
      {
        id: "blank-07-dekker-turn",
        type: "blank",
        title: "Dekker 退出语句",
        question: "补全 Dekker 算法中 P0 离开临界区时交出优先权的语句。",
        answers: ["turn=1", "turn=1;"],
        answerText: "turn = 1;",
        points: 2,
        explanation: "P0 退出临界区时把 turn 交给 P1，再撤销自己的进入意向。"
      }
    ];
    const subjectiveQuestions = [
      {
        id: "subj-01-page-table-size",
        title: "四-1 页表规模计算",
        points: 8,
        prompt: "在一个 32 位虚拟内存系统中，页面大小为 4KB。回答：（1）页表全部占用时，1 级页表和 4 级页表需要多少页表项？（2）如果一个进程只分配 1 页内存，1 级页表和 4 级页表需要分配多少页表项？",
        answer: [
          "32 位地址空间、4KB 页时，虚拟页数为 2^32 / 2^12 = 2^20。",
          "按本题常见简化口径：页表全部占用时，1 级页表需要 2^20 个最终 PTE；4 级页表最终也覆盖 2^20 个虚拟页，若计入各级目录项还会有额外上级项，具体数量取决于每级索引位分配。",
          "只分配 1 页内存时，1 级页表仍通常需要完整线性页表，即 2^20 项；4 级页表只需要沿该虚拟页路径分配各级所需项，简化为 4 项。"
        ],
        rubric: [
          "能算出虚拟页数 2^20。",
          "能说明满映射时多级页表不节省最终映射项。",
          "能说明稀疏映射时多级页表只需分配一条路径。"
        ]
      },
      {
        id: "subj-02-segment-page-translation",
        title: "四-2 段页式地址转换",
        points: 7,
        prompt: "20 位虚拟地址格式为：虚拟段号 4 位、虚拟页号 8 位、页内偏移 8 位。物理地址为：物理页号 8 位、页内偏移 8 位。根据原卷给出的段表、页表项格式和物理内存内容，写出各条 Load/Store 指令的结果。",
        details: [
          "指令：Load [0x30111]；Store [0x30116]；Load [0x42020]；Load [0x00112]；Store [0x00210]；Load [0x21211]；Load [0x11135]",
          "段表：0 -> base 0x2000, max 0x20, Valid；1 -> base 0x1000, max 0x10, Valid；2 -> base 0x3100, max 0x40, Invalid；3 -> base 0x4000, max 0x20, Valid。",
          "PTE 标志：0x00 Invalid；0x06 Valid Read Only；0x07 Valid Read/Write。"
        ],
        answer: [
          "Load [0x30111] = 0x13。段 3 有效，VPN=0x01，PTE 为 frame 0x31 / RO，物理地址 0x3111，读到 0x13。",
          "Store [0x30116] = Error。段 3、VPN=0x01 只读，不能写。",
          "Load [0x42020] = Error。段号 4 超出最大段号 3。",
          "Load [0x00112] = Error。段 0、VPN=0x01 的 PTE 标志为 Invalid。",
          "Store [0x00210] = OK。段 0、VPN=0x02 映射到 frame 0x10 且可读写。",
          "Load [0x21211] = Error。段 2 的段表项 Invalid。",
          "Load [0x11135] = Error。段 1 有效页面数为 0x10，VPN=0x11 越界。"
        ],
        rubric: [
          "先拆出段号、页号、偏移。",
          "检查段有效性和段内页号范围。",
          "检查 PTE 有效位和读写权限。",
          "Load 成功时用物理页号拼接偏移读取字节。"
        ]
      },
      {
        id: "subj-03-self-map",
        title: "五 页表自映射",
        points: 5,
        prompt: "一个 32 位两级页表系统，逻辑地址中 31..22 位是一级页表索引，21..12 位是二级页表索引，11..0 位是页内偏移。从 0x2C000000 开始映射 4MB 的页表。给出一级页表的起始虚拟地址，以及一级页表中映射自己的表项的虚拟地址。",
        answer: [
          "页表窗口基址 PT_base = 0x2C000000 = r << 22，所以 r = 0xB0。",
          "一级页表（页目录）所在页的起始虚拟地址：PD_base = (r << 22) | (r << 12) = 0x2C0B0000。",
          "映射自己的一级页表项地址：PDE_self = PD_base + r * 4 = 0x2C0B0000 + 0x2C0 = 0x2C0B02C0。"
        ],
        rubric: [
          "正确求出自映射索引 r = 0xB0。",
          "正确写出 PD_base。",
          "正确考虑一个 32 位表项占 4 字节。"
        ]
      },
      {
        id: "subj-04-process-thread",
        title: "六-1 进程与线程",
        points: 5,
        prompt: "简述进程与线程的区别和联系。",
        answer: [
          "进程是资源分配和保护的基本单位，拥有独立地址空间、打开文件等资源。",
          "线程是处理机调度和执行的基本单位，拥有独立 PC、寄存器上下文和栈。",
          "同一进程内的线程共享地址空间和多数进程资源，因此通信方便但也需要同步。",
          "进程切换通常比同进程内线程切换开销更大。"
        ],
        rubric: [
          "说清资源分配单位与调度单位。",
          "说清共享资源与独立执行现场。",
          "能提到同步/开销差异。"
        ]
      },
      {
        id: "subj-05-process-switch",
        title: "六-2 进程切换步骤",
        points: 5,
        prompt: "简述进程切换的步骤。",
        answer: [
          "发生中断、异常、系统调用或调度事件后进入内核。",
          "保存当前进程上下文，包括 PC、寄存器、栈指针、状态字等到 PCB/内核栈。",
          "更新当前进程状态并放入相应队列。",
          "调度器选择下一个可运行进程。",
          "切换地址空间和内核调度相关状态，恢复新进程上下文并返回执行。"
        ],
        rubric: [
          "有保存现场。",
          "有调度选择。",
          "有恢复现场。",
          "能提到状态/队列或地址空间切换。"
        ]
      },
      {
        id: "subj-06-pv-reader-writer",
        title: "七 进程互斥与同步",
        points: 10,
        prompt: "公园每天最多允许 N 人购票入园。查询者 Q 读余票数量，购票者 B 写余票数量，每次只能买一张票。要求：Q 和 B 按到达顺序访问；多个 Q 连续到达时允许并发读；余票为 0 时不允许 B 执行写操作。基于 PV 操作设计算法。",
        answer: [
          "可使用公平读写者方案。设 semaphore order = 1, rw = 1, mutex = 1; int readcnt = 0; int tickets = N。",
          "Q：P(order); P(mutex); readcnt++; if (readcnt == 1) P(rw); V(mutex); V(order); 读 tickets; P(mutex); readcnt--; if (readcnt == 0) V(rw); V(mutex)。",
          "B：P(order); P(rw); V(order); if (tickets > 0) tickets--; else 不写; V(rw)。",
          "order 保证按到达顺序进入等待队列；连续到达的 Q 在已有读者持有 rw 时可继续并发读；B 独占 rw，且 tickets == 0 时不修改余票。"
        ],
        rubric: [
          "有到达顺序控制。",
          "允许连续读者并发。",
          "写者互斥。",
          "购票前检查余票。",
          "PV 操作配对正确，无明显死锁。"
        ]
      }
    ];
    const trueFalseAnswers = ref({});
    const choiceAnswers = ref({});
    const blankAnswers = ref({});
    const subjectiveAnswers = ref({});
    const subjectiveJudgements = ref({});
    const submitted = ref(false);
    const objectiveQuestions = computed(() => [
      ...trueFalseQuestions,
      ...singleChoiceQuestions,
      ...blankQuestions
    ]);
    const objectiveMaxScore = computed(() => objectiveQuestions.value.reduce((sum, question) => sum + question.points, 0));
    const subjectiveMaxScore = computed(() => subjectiveQuestions.reduce((sum, question) => sum + question.points, 0));
    const totalScore = computed(() => objectiveMaxScore.value + subjectiveMaxScore.value);
    const objectiveAnsweredCount = computed(() => {
      const trueFalseCount = trueFalseQuestions.filter((question) => typeof trueFalseAnswers.value[question.id] === "boolean").length;
      const choiceCount = singleChoiceQuestions.filter((question) => Boolean(choiceAnswers.value[question.id])).length;
      const blankCount = blankQuestions.filter((question) => {
        var _a;
        return Boolean((_a = blankAnswers.value[question.id]) == null ? void 0 : _a.trim());
      }).length;
      return trueFalseCount + choiceCount + blankCount;
    });
    const subjectiveAnsweredCount = computed(() => subjectiveQuestions.filter((question) => {
      var _a;
      return Boolean((_a = subjectiveAnswers.value[question.id]) == null ? void 0 : _a.trim());
    }).length);
    const answeredCount = computed(() => objectiveAnsweredCount.value + subjectiveAnsweredCount.value);
    const questionCount = computed(() => objectiveQuestions.value.length + subjectiveQuestions.length);
    const unansweredCount = computed(() => questionCount.value - answeredCount.value);
    const allAnswered = computed(() => unansweredCount.value === 0);
    const subjectiveJudgedCount = computed(() => subjectiveQuestions.filter((question) => typeof subjectiveJudgements.value[question.id] === "boolean").length);
    const objectiveScore = computed(() => {
      if (!submitted.value) return 0;
      return objectiveQuestions.value.reduce((sum, question) => isObjectiveCorrect(question) ? sum + question.points : sum, 0);
    });
    function normalizeAnswer(value) {
      return value.trim().toLowerCase().replace(/[，。；;：:、,.]/g, "").replace(/[（）()]/g, "").replace(/\s+/g, "");
    }
    function boolLabel(value) {
      if (typeof value !== "boolean") return "未作答";
      return value ? "√" : "×";
    }
    function isBlankCorrect(question) {
      const selected = normalizeAnswer(blankAnswers.value[question.id] || "");
      return question.answers.some((answer) => normalizeAnswer(answer) === selected);
    }
    function isObjectiveCorrect(question) {
      if (question.type === "true-false") {
        return trueFalseAnswers.value[question.id] === question.answer;
      }
      if (question.type === "single") {
        return choiceAnswers.value[question.id] === question.answer;
      }
      return isBlankCorrect(question);
    }
    function answerText(question) {
      if (question.type === "true-false") return boolLabel(question.answer);
      if (question.type === "single") return question.answer;
      return question.answerText;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "exam-paper" }, _attrs))} data-v-3c9f15f3><header class="exam-paper__hero" data-v-3c9f15f3><div data-v-3c9f15f3><p class="exam-paper__eyebrow" data-v-3c9f15f3>Interactive Exam</p><h2 data-v-3c9f15f3>2025 期中考试</h2><p data-v-3c9f15f3>客观题提交整卷后自动判分；主观题提交后显示参考答案，由你自行判定是否进入错题记录。</p></div><div class="exam-paper__score" data-v-3c9f15f3><strong data-v-3c9f15f3>${ssrInterpolate(submitted.value ? objectiveScore.value : "-")}</strong><span data-v-3c9f15f3>/ ${ssrInterpolate(objectiveMaxScore.value)} 客观题分</span></div></header><div class="exam-paper__meta" data-v-3c9f15f3><span data-v-3c9f15f3>${ssrInterpolate(answeredCount.value)} / ${ssrInterpolate(questionCount.value)} 已作答</span><span data-v-3c9f15f3>客观题 ${ssrInterpolate(objectiveMaxScore.value)} 分</span><span data-v-3c9f15f3>主观题 ${ssrInterpolate(subjectiveMaxScore.value)} 分</span><span data-v-3c9f15f3>总分 ${ssrInterpolate(totalScore.value)} 分</span></div><section class="exam-section" data-v-3c9f15f3><h3 data-v-3c9f15f3>一、判断题</h3><!--[-->`);
      ssrRenderList(trueFalseQuestions, (question, index) => {
        _push(`<article class="exam-question" data-v-3c9f15f3><div class="exam-question__stem" data-v-3c9f15f3><strong data-v-3c9f15f3>${ssrInterpolate(index + 1)}.</strong><span data-v-3c9f15f3>${ssrInterpolate(question.question)}</span></div><div class="exam-question__actions" data-v-3c9f15f3><button type="button"${ssrIncludeBooleanAttr(submitted.value) ? " disabled" : ""} class="${ssrRenderClass({ "is-selected": trueFalseAnswers.value[question.id] === true })}" data-v-3c9f15f3> √ </button><button type="button"${ssrIncludeBooleanAttr(submitted.value) ? " disabled" : ""} class="${ssrRenderClass({ "is-selected": trueFalseAnswers.value[question.id] === false })}" data-v-3c9f15f3> × </button></div>`);
        if (submitted.value) {
          _push(`<div class="${ssrRenderClass([{ "is-correct": isObjectiveCorrect(question) }, "exam-result"])}" data-v-3c9f15f3><strong data-v-3c9f15f3>${ssrInterpolate(isObjectiveCorrect(question) ? "正确" : `错误，答案：${answerText(question)}`)}</strong><p data-v-3c9f15f3>${ssrInterpolate(question.explanation)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></section><section class="exam-section" data-v-3c9f15f3><h3 data-v-3c9f15f3>二、单项选择题</h3><!--[-->`);
      ssrRenderList(singleChoiceQuestions, (question, index) => {
        _push(`<article class="exam-question" data-v-3c9f15f3><div class="exam-question__stem" data-v-3c9f15f3><strong data-v-3c9f15f3>${ssrInterpolate(index + 1)}.</strong><span data-v-3c9f15f3>${ssrInterpolate(question.question)}</span></div><div class="exam-options" data-v-3c9f15f3><!--[-->`);
        ssrRenderList(question.options, (option) => {
          _push(`<button type="button"${ssrIncludeBooleanAttr(submitted.value) ? " disabled" : ""} class="${ssrRenderClass({
            "is-selected": choiceAnswers.value[question.id] === option.label,
            "is-answer": submitted.value && question.answer === option.label,
            "is-wrong": submitted.value && choiceAnswers.value[question.id] === option.label && !isObjectiveCorrect(question)
          })}" data-v-3c9f15f3><strong data-v-3c9f15f3>${ssrInterpolate(option.label)}</strong><span data-v-3c9f15f3>${ssrInterpolate(option.text)}</span></button>`);
        });
        _push(`<!--]--></div>`);
        if (submitted.value) {
          _push(`<div class="${ssrRenderClass([{ "is-correct": isObjectiveCorrect(question) }, "exam-result"])}" data-v-3c9f15f3><strong data-v-3c9f15f3>${ssrInterpolate(isObjectiveCorrect(question) ? "正确" : `错误，答案：${answerText(question)}`)}</strong><p data-v-3c9f15f3>${ssrInterpolate(question.explanation)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></section><section class="exam-section" data-v-3c9f15f3><h3 data-v-3c9f15f3>三、填空题</h3><!--[-->`);
      ssrRenderList(blankQuestions, (question, index) => {
        _push(`<article class="exam-question" data-v-3c9f15f3><label class="exam-blank" data-v-3c9f15f3><span data-v-3c9f15f3>${ssrInterpolate(index + 1)}. ${ssrInterpolate(question.question)}</span><input${ssrRenderAttr("value", blankAnswers.value[question.id])}${ssrIncludeBooleanAttr(submitted.value) ? " disabled" : ""} type="text" placeholder="输入答案" data-v-3c9f15f3></label>`);
        if (submitted.value) {
          _push(`<div class="${ssrRenderClass([{ "is-correct": isObjectiveCorrect(question) }, "exam-result"])}" data-v-3c9f15f3><strong data-v-3c9f15f3>${ssrInterpolate(isObjectiveCorrect(question) ? "正确" : `标准答案：${answerText(question)}`)}</strong><p data-v-3c9f15f3>${ssrInterpolate(question.explanation)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></section><section class="exam-section" data-v-3c9f15f3><h3 data-v-3c9f15f3>四至七、主观题</h3><!--[-->`);
      ssrRenderList(subjectiveQuestions, (question) => {
        var _a, _b;
        _push(`<article class="exam-question exam-question--subjective" data-v-3c9f15f3><header class="exam-subjective__header" data-v-3c9f15f3><div data-v-3c9f15f3><strong data-v-3c9f15f3>${ssrInterpolate(question.title)}</strong><span data-v-3c9f15f3>${ssrInterpolate(question.points)} 分</span></div></header><p class="exam-subjective__prompt" data-v-3c9f15f3>${ssrInterpolate(question.prompt)}</p><!--[-->`);
        ssrRenderList(question.details, (detail) => {
          _push(`<pre class="exam-subjective__detail" data-v-3c9f15f3>${ssrInterpolate(detail)}</pre>`);
        });
        _push(`<!--]--><textarea${ssrIncludeBooleanAttr(submitted.value) ? " disabled" : ""} rows="6" placeholder="写下你的作答要点" data-v-3c9f15f3>${ssrInterpolate(subjectiveAnswers.value[question.id])}</textarea>`);
        if (submitted.value) {
          _push(`<div class="exam-reference" data-v-3c9f15f3><h4 data-v-3c9f15f3>参考答案</h4><ul data-v-3c9f15f3><!--[-->`);
          ssrRenderList(question.answer, (item) => {
            _push(`<li data-v-3c9f15f3>${ssrInterpolate(item)}</li>`);
          });
          _push(`<!--]--></ul>`);
          if ((_a = question.rubric) == null ? void 0 : _a.length) {
            _push(`<h4 data-v-3c9f15f3>评分要点</h4>`);
          } else {
            _push(`<!---->`);
          }
          if ((_b = question.rubric) == null ? void 0 : _b.length) {
            _push(`<ul data-v-3c9f15f3><!--[-->`);
            ssrRenderList(question.rubric, (item) => {
              _push(`<li data-v-3c9f15f3>${ssrInterpolate(item)}</li>`);
            });
            _push(`<!--]--></ul>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="exam-judge" data-v-3c9f15f3><span data-v-3c9f15f3>自主判题：</span><button type="button" class="${ssrRenderClass({ "is-selected": subjectiveJudgements.value[question.id] === true })}" data-v-3c9f15f3> 判为正确 </button><button type="button" class="${ssrRenderClass({ "is-selected is-wrong": subjectiveJudgements.value[question.id] === false })}" data-v-3c9f15f3> 加入错题 </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></section><footer class="exam-paper__footer" data-v-3c9f15f3><button type="button"${ssrIncludeBooleanAttr(!allAnswered.value) ? " disabled" : ""} data-v-3c9f15f3>${ssrInterpolate(submitted.value ? "重新统计客观题" : "提交整卷")}</button>`);
      if (submitted.value) {
        _push(`<button type="button" class="is-secondary" data-v-3c9f15f3> 重新作答 </button>`);
      } else {
        _push(`<!---->`);
      }
      if (!allAnswered.value) {
        _push(`<p data-v-3c9f15f3>还有 ${ssrInterpolate(unansweredCount.value)} 题未作答，提交后才会显示答案。</p>`);
      } else if (submitted.value) {
        _push(`<p data-v-3c9f15f3> 主观题已判 ${ssrInterpolate(subjectiveJudgedCount.value)} / ${ssrInterpolate(subjectiveQuestions.length)}，判为错误的题会进入错题记录。 </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</footer></section>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../components/ExamPaper.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const ExamPaper = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-3c9f15f3"]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "FillBlank",
  __ssrInlineRender: true,
  props: {
    id: {},
    question: {},
    answer: {},
    explanation: {},
    placeholder: { default: "输入答案后校验" },
    caseSensitive: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const input = ref("");
    const checked = ref(false);
    const answers = computed(() => Array.isArray(props.answer) ? props.answer : [props.answer]);
    function normalize(value) {
      const trimmed = value.trim();
      return props.caseSensitive ? trimmed : trimmed.toLowerCase();
    }
    const correct = computed(() => {
      const userAnswer = normalize(input.value);
      return answers.value.some((answer) => normalize(answer) === userAnswer);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "fill study-card" }, _attrs))} data-v-3c8f3ef0><p class="fill__question" data-v-3c8f3ef0>${ssrInterpolate(__props.question)}</p><div class="fill__row" data-v-3c8f3ef0><input${ssrRenderAttr("value", input.value)} class="fill__input"${ssrRenderAttr("placeholder", __props.placeholder)} type="text" data-v-3c8f3ef0><button class="fill__button" type="button" data-v-3c8f3ef0>校验</button></div>`);
      if (checked.value) {
        _push(`<div class="${ssrRenderClass([{ "is-correct": correct.value }, "fill__result"])}" data-v-3c8f3ef0><strong data-v-3c8f3ef0>${ssrInterpolate(correct.value ? "回答正确" : `标准答案：${answers.value.join(" / ")}`)}</strong>`);
        if (__props.explanation) {
          _push(`<p data-v-3c8f3ef0>${ssrInterpolate(__props.explanation)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../components/FillBlank.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const FillBlank = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-3c8f3ef0"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Mermaid",
  __ssrInlineRender: true,
  props: {
    code: {}
  },
  setup(__props) {
    const props = __props;
    const container = ref(null);
    let observer;
    function decodedCode() {
      try {
        return decodeURIComponent(props.code);
      } catch {
        return props.code;
      }
    }
    async function renderDiagram() {
      if (!container.value || typeof window === "undefined") return;
      const { default: mermaid } = await import("mermaid");
      const id = `mermaid-${Math.random().toString(36).slice(2)}`;
      const dark = document.documentElement.classList.contains("dark");
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: dark ? "dark" : "default"
      });
      try {
        const { svg } = await mermaid.render(id, decodedCode());
        container.value.innerHTML = svg;
      } catch (error) {
        container.value.textContent = error instanceof Error ? error.message : "Mermaid render failed.";
      }
    }
    onMounted(() => {
      void nextTick(renderDiagram);
      observer = new MutationObserver(() => {
        void renderDiagram();
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    });
    onBeforeUnmount(() => {
      observer == null ? void 0 : observer.disconnect();
    });
    watch(() => props.code, () => {
      void renderDiagram();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<figure${ssrRenderAttrs(mergeProps({ class: "mermaid-block" }, _attrs))} data-v-9610f546><div class="mermaid-block__canvas" data-v-9610f546></div></figure>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../components/Mermaid.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const Mermaid = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-9610f546"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "MultiFillBlank",
  __ssrInlineRender: true,
  props: {
    id: {},
    question: {},
    items: {},
    explanation: {},
    caseSensitive: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const inputs = ref(props.items.map(() => ""));
    const checked = ref(false);
    watch(() => props.items, (items) => {
      inputs.value = items.map(() => "");
      checked.value = false;
    });
    function answersOf(item) {
      return Array.isArray(item.answer) ? item.answer : [item.answer];
    }
    function normalize(value) {
      const trimmed = value.trim();
      return props.caseSensitive ? trimmed : trimmed.toLowerCase();
    }
    function itemCorrect(item, index) {
      const userAnswer = normalize(inputs.value[index] || "");
      return answersOf(item).some((answer) => normalize(answer) === userAnswer);
    }
    const canCheck = computed(() => inputs.value.every((value) => value.trim()));
    const correct = computed(() => props.items.every((item, index) => itemCorrect(item, index)));
    function standardAnswer(item) {
      return answersOf(item).join(" / ");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "multi-fill study-card" }, _attrs))} data-v-2712610b><p class="multi-fill__question" data-v-2712610b>${ssrInterpolate(__props.question)}</p><div class="multi-fill__items" data-v-2712610b><!--[-->`);
      ssrRenderList(__props.items, (item, index) => {
        _push(`<label class="${ssrRenderClass([{
          "is-correct": checked.value && itemCorrect(item, index),
          "is-wrong": checked.value && !itemCorrect(item, index)
        }, "multi-fill__item"])}" data-v-2712610b><span class="multi-fill__label" data-v-2712610b>${ssrInterpolate(item.label)}</span><input${ssrRenderAttr("value", inputs.value[index])} class="multi-fill__input"${ssrRenderAttr("placeholder", item.placeholder || "输入答案")} type="text" data-v-2712610b>`);
        if (item.hint) {
          _push(`<small class="multi-fill__hint" data-v-2712610b>${ssrInterpolate(item.hint)}</small>`);
        } else {
          _push(`<!---->`);
        }
        if (checked.value && !itemCorrect(item, index)) {
          _push(`<small class="multi-fill__answer" data-v-2712610b> 标准答案：${ssrInterpolate(standardAnswer(item))}</small>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
      });
      _push(`<!--]--></div><button class="multi-fill__button" type="button"${ssrIncludeBooleanAttr(!canCheck.value) ? " disabled" : ""} data-v-2712610b> 校验 </button>`);
      if (checked.value) {
        _push(`<div class="${ssrRenderClass([{ "is-correct": correct.value }, "multi-fill__result"])}" data-v-2712610b><strong data-v-2712610b>${ssrInterpolate(correct.value ? "全部正确" : "还有空需要修正")}</strong>`);
        if (__props.explanation) {
          _push(`<p data-v-2712610b>${ssrInterpolate(__props.explanation)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../components/MultiFillBlank.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const MultiFillBlank = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-2712610b"]]);
const data = JSON.parse('[{"title":"补充综合测试","url":"/addition-review.html","tags":["exam","tricky","review"],"difficulty":"medium","review":"2026-04-28T00:00:00.000Z"},{"title":"进程与线程","url":"/进程与线程/main.html","tags":["process","concurrency"]},{"title":"进程与线程/4_1 进程状态与控制.html","url":"/进程与线程/4_1 进程状态与控制.html","tags":[]},{"title":"进程与线程/4_2 线程.html","url":"/进程与线程/4_2 线程.html","tags":[]},{"title":"进程与线程/4_3 同步与互斥.html","url":"/进程与线程/4_3 同步与互斥.html","tags":[]},{"title":"进程与线程/4_4 同步互斥典例.html","url":"/进程与线程/4_4 同步互斥典例.html","tags":[]},{"title":"进程与线程/4_5 进程间通信.html","url":"/进程与线程/4_5 进程间通信.html","tags":[]},{"title":"内存管理","url":"/内存管理/main.html","tags":["memory"]},{"title":"内存管理/3_1存储管理.html","url":"/内存管理/3_1存储管理.html","tags":[]},{"title":"内存管理/3_2 页式管理基础.html","url":"/内存管理/3_2 页式管理基础.html","tags":[]},{"title":"内存管理/3_3 段式管理.html","url":"/内存管理/3_3 段式管理.html","tags":[]},{"title":"内存管理/3_4 虚拟内存管理.html","url":"/内存管理/3_4 虚拟内存管理.html","tags":[]},{"title":"内存管理/3_5 请求式分页系统.html","url":"/内存管理/3_5 请求式分页系统.html","tags":[]},{"title":"内存管理/3_6 页表自映射.html","url":"/内存管理/3_6 页表自映射.html","tags":[]},{"title":"期中考试真题","url":"/exams.html","tags":["exam","midterm"],"difficulty":"overview","review":"2026-04-26T00:00:00.000Z"},{"title":"推荐资料","url":"/resources.html","tags":["resources"],"difficulty":"overview","review":"2026-04-27T00:00:00.000Z"},{"title":"学习进度","url":"/progress.html","tags":["review"],"difficulty":"dashboard","review":"2026-04-26T00:00:00.000Z"},{"title":"Knowledge Map","url":"/knowledge-map.html","tags":["index"],"difficulty":"overview","review":"2026-04-26T00:00:00.000Z"},{"title":"OS Boot","url":"/OS Boot/main.html","tags":["boot"]},{"title":"OS Boot/1_0 引言.html","url":"/OS Boot/1_0 引言.html","tags":[]},{"title":"OS Boot/2_0 Boot.html","url":"/OS Boot/2_0 Boot.html","tags":[]},{"title":"OS Boot/3_0 程序运行基本过程.html","url":"/OS Boot/3_0 程序运行基本过程.html","tags":[]},{"title":"OS Notes Web","url":"/","tags":["index"],"difficulty":"overview","review":"2026-04-26T00:00:00.000Z"}]');
const memory = [
  {
    id: "memory-tlb-01",
    title: "TLB miss 与缺页",
    question: "发生 TLB miss 时，下面哪项一定成立？",
    options: [
      {
        label: "A",
        text: "该虚拟页一定不在物理内存中"
      },
      {
        label: "B",
        text: "需要查询页表或由硬件/内核继续完成地址转换"
      },
      {
        label: "C",
        text: "一定会触发磁盘 I/O"
      },
      {
        label: "D",
        text: "当前进程一定会被阻塞"
      }
    ],
    answer: "B",
    explanation: "TLB miss 只表示快表中没有缓存该映射。页表项可能有效，此时只需查页表并回填 TLB；只有页表项无效、权限不满足等情况才会进入缺页或保护异常处理。",
    tags: [
      "memory",
      "tricky",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-page-offset-01",
    title: "页内偏移位数",
    question: "页大小为 8 KiB 时，页内偏移字段有多少位？",
    options: [
      {
        label: "A",
        text: "10 位"
      },
      {
        label: "B",
        text: "12 位"
      },
      {
        label: "C",
        text: "13 位"
      },
      {
        label: "D",
        text: "16 位"
      }
    ],
    answer: "C",
    explanation: "8 KiB = 8192 Byte = 2^13 Byte，因此页内偏移为 13 位。",
    tags: [
      "memory",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "memory-self-map-01",
    title: "自映射与普通页表遍历",
    question: "关于页目录自映射，下面哪种说法最准确？",
    options: [
      {
        label: "A",
        text: "自映射改变了 MMU 的地址转换规则，使 MMU 能直接识别页表项地址"
      },
      {
        label: "B",
        text: "自映射只是改变某个页目录项的内容，MMU 仍按普通多级页表规则逐级查表"
      },
      {
        label: "C",
        text: "自映射要求所有页表页在物理内存中连续存放，否则无法计算 PTE 地址"
      },
      {
        label: "D",
        text: "自映射建立后，访问页表项不再经过 TLB 和页表权限检查"
      }
    ],
    answer: "B",
    explanation: "自映射并没有给 MMU 增加新规则。它只是让某个 PDE 指向页目录自己的物理页框，于是访问自映射窗口时，普通页表遍历会自然走到页目录和页表页。",
    tags: [
      "memory",
      "paging",
      "self-map",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-self-map-02",
    title: "自映射建立后的映射状态",
    question: "把某个 PDE 设为自映射项并刷新 TLB 后，下面哪种理解是正确的？",
    options: [
      {
        label: "A",
        text: "自映射窗口里的每个位置都已经有效，因为所有页表页都会被自动创建"
      },
      {
        label: "B",
        text: "自映射窗口只保证页目录和已经存在的页表页可按公式访问，未分配的页表页仍可能无效"
      },
      {
        label: "C",
        text: "自映射窗口只能访问页目录项，不能访问普通页表项"
      },
      {
        label: "D",
        text: "自映射窗口会减少可用物理内存容量，因为页目录物理页被复制了一份"
      }
    ],
    answer: "B",
    explanation: "自映射提供的是访问页表结构的虚拟窗口，不会自动分配所有页表页。尚未建立的页表页，其对应窗口地址在页表遍历中仍会遇到无效项。",
    tags: [
      "memory",
      "paging",
      "self-map",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-self-map-03",
    title: "PTE 虚拟地址计算",
    question: "若自映射索引 r = 1023，则页表窗口起始地址为 0xFFC00000。某虚拟地址的页目录索引为 2，页表索引为 3，则它对应 PTE 的虚拟地址是多少？",
    options: [
      {
        label: "A",
        text: "0xFFC0200C"
      },
      {
        label: "B",
        text: "0xFFC03008"
      },
      {
        label: "C",
        text: "0xFFFFF00C"
      },
      {
        label: "D",
        text: "0x00002003"
      }
    ],
    answer: "A",
    explanation: "PTE_addr = 0xFFC00000 + PDE_index × 4096 + PTE_index × 4 = 0xFFC00000 + 2 × 0x1000 + 3 × 4 = 0xFFC0200C。",
    tags: [
      "memory",
      "paging",
      "self-map",
      "calculation"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-self-map-04",
    title: "自映射不等于创建页表页",
    question: "建立页目录自映射后，下面哪种说法最准确？",
    options: [
      {
        label: "A",
        text: "所有页表页都会立刻被分配出来"
      },
      {
        label: "B",
        text: "所有虚拟地址都会自动变成有效映射"
      },
      {
        label: "C",
        text: "页目录和已经存在的页表页可以通过固定虚拟窗口访问"
      },
      {
        label: "D",
        text: "TLB 中所有旧映射都会自动消失，不需要内核处理"
      }
    ],
    answer: "C",
    explanation: "自映射只是提供访问页目录和已有页表页的虚拟窗口，并不会自动分配尚不存在的页表页。修改页表项后，内核仍需按体系结构要求处理 TLB 失效。",
    tags: [
      "memory",
      "paging",
      "self-map",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-storage-01",
    title: "逻辑地址与物理地址",
    question: "操作系统把逻辑地址和物理地址分开，最直接的目的是什么？",
    options: [
      {
        label: "A",
        text: "让程序员直接决定数据在内存条上的物理位置"
      },
      {
        label: "B",
        text: "让程序使用独立地址空间，并由系统完成重定位和保护"
      },
      {
        label: "C",
        text: "保证所有进程访问同一组内存地址"
      },
      {
        label: "D",
        text: "取消硬件参与，完全由应用程序完成地址转换"
      }
    ],
    answer: "B",
    explanation: "逻辑地址让程序不依赖实际装入位置；物理地址由系统和硬件管理，从而支持重定位、隔离和保护。",
    tags: [
      "memory",
      "address",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "memory-storage-02",
    title: "内碎片与外碎片",
    question: "关于内碎片和外碎片，下面哪项说法正确？",
    options: [
      {
        label: "A",
        text: "内碎片是空闲区之间不连续造成的，外碎片是已分配区内部浪费造成的"
      },
      {
        label: "B",
        text: "内碎片是已分配空间中未被使用的部分，外碎片是空闲但难以形成足够大连续区的空间"
      },
      {
        label: "C",
        text: "固定分区只会产生外碎片，不会产生内碎片"
      },
      {
        label: "D",
        text: "动态分区只要有空闲空间总量足够，就一定能满足任意连续内存请求"
      }
    ],
    answer: "B",
    explanation: "内碎片发生在已分配空间内部；外碎片发生在空闲空间之间。动态分区可能因为空闲区分散而无法满足连续空间请求。",
    tags: [
      "memory",
      "fragmentation",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "memory-storage-03",
    title: "动态分区的切分",
    question: "动态分区分配时，如果把请求空间切出后剩余空间非常小，常见处理是什么？",
    options: [
      {
        label: "A",
        text: "必须保留该小空闲区，等待之后精确大小的请求"
      },
      {
        label: "B",
        text: "必须立即执行紧凑，把所有空闲区合并"
      },
      {
        label: "C",
        text: "把整块空闲区分给请求者，避免留下难以利用的小外碎片"
      },
      {
        label: "D",
        text: "拒绝本次分配，因为剩余空间小于请求空间"
      }
    ],
    answer: "C",
    explanation: "过小的剩余区很难再被有效利用，保留下来会增加外碎片和管理开销，所以常把它并入本次分配。",
    tags: [
      "memory",
      "partition",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-storage-04",
    title: "首次适应算法",
    question: "首次适应（First Fit）算法的核心策略是什么？",
    options: [
      {
        label: "A",
        text: "每次都从空闲区表头开始，找第一个足够大的空闲区"
      },
      {
        label: "B",
        text: "每次都找大小最接近请求的空闲区"
      },
      {
        label: "C",
        text: "每次都找最大的空闲区"
      },
      {
        label: "D",
        text: "每次都从上次查找结束位置继续找"
      }
    ],
    answer: "A",
    explanation: "首次适应从头顺序查找第一个满足请求的空闲区。B 是最佳适应，C 是最坏适应，D 是下次适应。",
    tags: [
      "memory",
      "partition",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "memory-storage-05",
    title: "最佳适应的风险",
    question: "为什么最佳适应（Best Fit）不一定带来最好的长期内存利用效果？",
    options: [
      {
        label: "A",
        text: "它每次都会选择最大的空闲区，导致大空闲区被快速消耗"
      },
      {
        label: "B",
        text: "它不允许拆分空闲区，所以无法满足小请求"
      },
      {
        label: "C",
        text: "它可能反复留下很小的剩余空闲区，形成难以利用的外碎片"
      },
      {
        label: "D",
        text: "它只能用于固定分区，不能用于动态分区"
      }
    ],
    answer: "C",
    explanation: "最佳适应追求本次分配后的剩余空间最小，但长期看容易产生许多很小、难以再次利用的外碎片。",
    tags: [
      "memory",
      "partition",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-storage-06",
    title: "伙伴系统",
    question: "关于伙伴系统（buddy system），下面哪项说法最准确？",
    options: [
      {
        label: "A",
        text: "它按任意字节大小精确分配，因此完全没有内部浪费"
      },
      {
        label: "B",
        text: "它按 2 的幂管理块，便于拆分和合并，但可能产生内碎片"
      },
      {
        label: "C",
        text: "它只能通过移动作业来消除外碎片"
      },
      {
        label: "D",
        text: "它要求所有进程共享同一个逻辑地址空间"
      }
    ],
    answer: "B",
    explanation: "伙伴系统把块大小限制为 2 的幂，地址计算和伙伴合并方便；请求大小被向上取整时，可能产生内碎片。",
    tags: [
      "memory",
      "buddy",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-storage-07",
    title: "紧凑与动态重定位",
    question: "紧凑技术通常为什么需要动态重定位支持？",
    options: [
      {
        label: "A",
        text: "因为紧凑会移动作业位置，移动后需要重新建立逻辑地址到物理地址的对应关系"
      },
      {
        label: "B",
        text: "因为紧凑会把所有进程永久写入辅存"
      },
      {
        label: "C",
        text: "因为紧凑会取消逻辑地址，只保留物理地址"
      },
      {
        label: "D",
        text: "因为紧凑只能在程序编译时完成"
      }
    ],
    answer: "A",
    explanation: "紧凑通过移动作业把分散空闲区拼成大空闲区。作业位置变化后，地址转换关系必须能随运行时位置变化而调整。",
    tags: [
      "memory",
      "compaction",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-storage-08",
    title: "覆盖与交换",
    question: "关于覆盖（Overlay）和交换（Swapping），下面哪项说法正确？",
    options: [
      {
        label: "A",
        text: "覆盖由操作系统自动完成，交换必须由程序员手工划分模块"
      },
      {
        label: "B",
        text: "覆盖和交换都只发生在同一个程序内部的不同函数之间"
      },
      {
        label: "C",
        text: "覆盖通常由程序员安排同一程序内部哪些段不同时驻留；交换通常由 OS 在进程之间调入调出"
      },
      {
        label: "D",
        text: "交换只能减少一个程序内部同时驻留内存的代码段数量，不能改变内存中的进程数"
      }
    ],
    answer: "C",
    explanation: "覆盖关注同一程序内部不同时使用的程序段，早期常需程序员安排；交换由 OS 控制，把整个进程地址空间换出或换入，以提高内存利用率和并发度。",
    tags: [
      "memory",
      "overlay",
      "swapping",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-storage-09",
    title: "交换与 I/O",
    question: "为什么正在进行 I/O 且 I/O 缓冲区在用户空间的进程通常不宜直接换出？",
    options: [
      {
        label: "A",
        text: "因为等待 I/O 的进程一定拥有最高调度优先级"
      },
      {
        label: "B",
        text: "因为设备可能仍要读写该用户缓冲区，换出会使 I/O 目标内存不再可靠"
      },
      {
        label: "C",
        text: "因为换出会自动清空该进程的所有文件描述符"
      },
      {
        label: "D",
        text: "因为 I/O 进程没有地址空间，所以无法交换"
      }
    ],
    answer: "B",
    explanation: "如果设备或内核仍在使用用户空间缓冲区，直接换出相关页面或地址空间可能破坏 I/O 目标。常见处理是锁定相关内存或使用系统缓冲。",
    tags: [
      "memory",
      "swapping",
      "tricky"
    ],
    difficulty: "hard"
  },
  {
    id: "memory-storage-10",
    title: "存储器扩充的含义",
    question: "为什么说覆盖、交换、请求调入等技术是在逻辑上扩充内存？",
    options: [
      {
        label: "A",
        text: "因为它们会自动增加物理内存条的容量"
      },
      {
        label: "B",
        text: "因为它们让 CPU 不再需要访问内存"
      },
      {
        label: "C",
        text: "因为它们通过时间复用主存和利用辅存，让程序感觉可用空间更大"
      },
      {
        label: "D",
        text: "因为它们把所有地址都变成同一个物理地址"
      }
    ],
    answer: "C",
    explanation: "这些技术并没有增加真实主存容量，而是通过把暂时不用的部分放在辅存、需要时再调入，使有限主存被复用。",
    tags: [
      "memory",
      "swapping",
      "virtual-memory",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "memory-paging-basic-01",
    title: "纯分页系统",
    question: "关于纯分页系统（基本分页），下面哪项说法最准确？",
    options: [
      {
        label: "A",
        text: "支持请求分页，页面可以在访问时再从外存调入"
      },
      {
        label: "B",
        text: "作业运行前通常需要把所有页面一次装入主存页框"
      },
      {
        label: "C",
        text: "要求一个作业的所有页面在物理内存中连续存放"
      },
      {
        label: "D",
        text: "不会产生任何形式的碎片"
      }
    ],
    answer: "B",
    explanation: "纯分页不具备请求分页和页面置换能力，作业运行前通常要把全部页面装入主存。它不要求物理连续，通常无外碎片，但页内可能有内碎片。",
    tags: [
      "memory",
      "paging",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "memory-paging-basic-02",
    title: "页和页框",
    question: "在分页管理中，页和页框的关系是什么？",
    options: [
      {
        label: "A",
        text: "页是物理内存中的块，页框是逻辑地址空间中的块"
      },
      {
        label: "B",
        text: "页和页框大小相同，页属于逻辑地址空间，页框属于物理内存"
      },
      {
        label: "C",
        text: "页必须连续存放，页框可以离散存放"
      },
      {
        label: "D",
        text: "页框大小必须大于页大小，才能存放页表项"
      }
    ],
    answer: "B",
    explanation: "分页把逻辑地址空间分成等长的页，把物理内存分成等长的页框。页和页框大小相同，页可以离散装入不同页框。",
    tags: [
      "memory",
      "paging",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "memory-paging-basic-03",
    title: "分页地址结构",
    question: "若逻辑地址为 m 位，页大小为 2^k Byte，则逻辑地址通常如何划分？",
    options: [
      {
        label: "A",
        text: "高 k 位为页号，低 m-k 位为页内偏移"
      },
      {
        label: "B",
        text: "高 m-k 位为页号，低 k 位为页内偏移"
      },
      {
        label: "C",
        text: "高 k 位为页框号，低 m-k 位为页号"
      },
      {
        label: "D",
        text: "高 m-k 位为物理地址，低 k 位为逻辑地址"
      }
    ],
    answer: "B",
    explanation: "页大小为 2^k Byte，页内偏移需要 k 位；剩余高 m-k 位用于表示页号。",
    tags: [
      "memory",
      "paging",
      "calculation"
    ],
    difficulty: "easy"
  },
  {
    id: "memory-paging-basic-04",
    title: "分页地址转换",
    question: "分页系统中，根据逻辑地址得到物理地址的关键步骤是什么？",
    options: [
      {
        label: "A",
        text: "用页内偏移查页表，再把页号作为物理地址低位"
      },
      {
        label: "B",
        text: "用页号查页表得到页框号，再把页框号与原页内偏移组合"
      },
      {
        label: "C",
        text: "直接把逻辑地址整体作为物理地址使用"
      },
      {
        label: "D",
        text: "先执行紧凑，再按作业长度计算物理地址"
      }
    ],
    answer: "B",
    explanation: "页表记录的是虚拟页到物理页框的映射。地址转换时替换页号为页框号，页内偏移保持不变。",
    tags: [
      "memory",
      "paging",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "memory-paging-basic-05",
    title: "页面大小权衡",
    question: "页面大小变大时，通常会带来哪种典型影响？",
    options: [
      {
        label: "A",
        text: "页表项数量减少，但页内浪费可能增加"
      },
      {
        label: "B",
        text: "页表项数量增加，但内碎片一定减少为 0"
      },
      {
        label: "C",
        text: "页内偏移位数减少，页号位数增加"
      },
      {
        label: "D",
        text: "所有页面换入换出的单次 I/O 数据量一定减少"
      }
    ],
    answer: "A",
    explanation: "页面越大，同一地址空间需要的页数越少，页表可能更小；但最后一页或未充分使用的页内空间更容易浪费。",
    tags: [
      "memory",
      "paging",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-paging-basic-06",
    title: "两级页表位数",
    question: "32 位逻辑地址、4 KiB 页、每个页表项 4 Byte 的两级页表中，地址字段通常如何划分？",
    options: [
      {
        label: "A",
        text: "页目录号 10 位，页表索引 10 位，页内偏移 12 位"
      },
      {
        label: "B",
        text: "页目录号 12 位，页表索引 10 位，页内偏移 10 位"
      },
      {
        label: "C",
        text: "页目录号 8 位，页表索引 12 位，页内偏移 12 位"
      },
      {
        label: "D",
        text: "页目录号 16 位，页表索引 4 位，页内偏移 12 位"
      }
    ],
    answer: "A",
    explanation: "4 KiB = 2^12，所以偏移 12 位。每个页表页可放 4096/4 = 1024 = 2^10 个页表项，因此页表索引 10 位，剩余 10 位为页目录号。",
    tags: [
      "memory",
      "paging",
      "calculation",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-paging-basic-07",
    title: "多级页表的价值",
    question: "多级页表相对一级页表的主要价值是什么？",
    options: [
      {
        label: "A",
        text: "一定减少页表占用空间的理论上限"
      },
      {
        label: "B",
        text: "让每次内存访问都只需要访问一次内存"
      },
      {
        label: "C",
        text: "可以只为实际用到的虚拟地址范围分配下级页表页，并减少对大块连续内存的需求"
      },
      {
        label: "D",
        text: "让页面不再需要页框即可运行"
      }
    ],
    answer: "C",
    explanation: "多级页表把页表本身分页，未使用的地址范围无需分配下级页表页；它还避免单个巨大页表必须连续存放。但层级增加会增加查表次数，理论上限也不一定更小。",
    tags: [
      "memory",
      "paging",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-paging-basic-08",
    title: "TLB 有效访问时间",
    question: "假设查找 TLB 时间为 t，访问内存时间为 T，TLB 命中率为 α；忽略缺页和多级页表，未命中时需要访问一次页表和一次目标数据。有效访问时间是哪一项？",
    options: [
      {
        label: "A",
        text: "α(t+T) + (1-α)(t+2T)"
      },
      {
        label: "B",
        text: "α(T) + (1-α)(t+T)"
      },
      {
        label: "C",
        text: "α(t+2T) + (1-α)(t+T)"
      },
      {
        label: "D",
        text: "t + αT"
      }
    ],
    answer: "A",
    explanation: "命中时查 TLB 后访问目标数据，时间为 t+T；未命中时查 TLB、查页表、访问目标数据，时间为 t+2T。",
    tags: [
      "memory",
      "tlb",
      "calculation"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-paging-basic-09",
    title: "TLB miss 与缺页",
    question: "关于 TLB miss 和缺页，下列说法正确的是哪一项？",
    options: [
      {
        label: "A",
        text: "TLB miss 一定表示对应页面不在物理内存中"
      },
      {
        label: "B",
        text: "TLB miss 只表示快表中没有该映射，页表项仍可能有效"
      },
      {
        label: "C",
        text: "只要页表项有效，就一定不会发生 TLB miss"
      },
      {
        label: "D",
        text: "缺页只需要重新查 TLB，不需要操作系统参与"
      }
    ],
    answer: "B",
    explanation: "TLB 是页表映射的缓存。TLB miss 可能只需要查页表并回填 TLB；只有页表项无效或页面不在内存等情况才涉及缺页处理。",
    tags: [
      "memory",
      "tlb",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-paging-basic-10",
    title: "反置页表",
    question: "反置页表相对普通页表的核心区别是什么？",
    options: [
      {
        label: "A",
        text: "普通页表按物理页框排列，反置页表按虚拟页号排列"
      },
      {
        label: "B",
        text: "反置页表按物理页框排列，表项记录该页框对应的进程和虚拟页信息"
      },
      {
        label: "C",
        text: "反置页表不需要保存任何进程信息"
      },
      {
        label: "D",
        text: "反置页表会让每个进程拥有一张与虚拟地址空间等大的页表"
      }
    ],
    answer: "B",
    explanation: "普通页表通常以虚拟页号为索引；反置页表以物理页框为中心，表项说明该页框当前映射到哪个进程的哪个虚拟页，因此表规模主要与物理内存页框数相关。",
    tags: [
      "memory",
      "paging",
      "inverted-page-table"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-virtual-01",
    title: "局部性与按需调页",
    question: "虚拟内存能够在只装入部分页面的情况下仍让程序有效运行，最主要依赖于哪组性质？",
    options: [
      {
        label: "A",
        text: "时间局部性和空间局部性"
      },
      {
        label: "B",
        text: "并发性和异步性"
      },
      {
        label: "C",
        text: "可重入性和共享性"
      },
      {
        label: "D",
        text: "静态链接和动态链接"
      }
    ],
    answer: "A",
    explanation: "局部性原理说明程序在一段时间内往往反复访问刚用过的指令和数据，也倾向访问其附近内容，因此系统通常只需把当前活跃的那部分页面调入主存。",
    tags: [
      "memory",
      "virtual-memory",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "memory-virtual-02",
    title: "虚拟内存提供的抽象",
    question: "关于虚拟内存为进程提供的地址空间，下列哪项描述最准确？",
    options: [
      {
        label: "A",
        text: "为所有进程提供同一份共享且连续的物理地址空间"
      },
      {
        label: "B",
        text: "为每个进程提供大的、一致的、连续可用且私有的地址空间"
      },
      {
        label: "C",
        text: "只负责扩大可见容量，不负责隔离和保护"
      },
      {
        label: "D",
        text: "让应用程序直接决定页面换入换出的时机"
      }
    ],
    answer: "B",
    explanation: "虚拟内存的核心价值不只是“看起来更大”，还包括给每个进程提供一致的地址空间抽象，并通过地址映射和保护机制实现隔离。",
    tags: [
      "memory",
      "virtual-memory",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "memory-virtual-03",
    title: "主存与磁盘的缓存关系",
    question: "从分层存储角度看，虚拟内存更贴近下面哪种理解？",
    options: [
      {
        label: "A",
        text: "磁盘是主存的高速缓存"
      },
      {
        label: "B",
        text: "主存是磁盘的高速缓存"
      },
      {
        label: "C",
        text: "页表是磁盘的高速缓存"
      },
      {
        label: "D",
        text: "寄存器是磁盘的高速缓存"
      }
    ],
    answer: "B",
    explanation: "虚拟内存利用分层存储思想，把当前活跃的数据页放在速度更快但容量更小的主存中，因此可以把主存看作磁盘上后备存储的高速缓存。",
    tags: [
      "memory",
      "virtual-memory",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "memory-virtual-04",
    title: "虚拟存储的多次性",
    question: "虚拟存储技术中“多次性”的含义是什么？",
    options: [
      {
        label: "A",
        text: "作业必须一次性全部装入主存后才能运行"
      },
      {
        label: "B",
        text: "一个作业可以被分成多次调入主存运行"
      },
      {
        label: "C",
        text: "每个页面必须同时被多个进程共享"
      },
      {
        label: "D",
        text: "每次调页都必须把相邻多个页面一起调入"
      }
    ],
    answer: "B",
    explanation: "“多次性”强调作业不必一次性全部装入主存，而是允许在运行过程中分批调入所需部分，这是虚拟存储区别于早期一次性装入方式的重要特征。",
    tags: [
      "memory",
      "virtual-memory",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-virtual-05",
    title: "虚拟内存与 Cache 的侧重点",
    question: "关于 cache-主存机制和虚拟内存机制，下列说法正确的是哪一项？",
    options: [
      {
        label: "A",
        text: "两者未命中后都只需要硬件处理，不需要操作系统参与"
      },
      {
        label: "B",
        text: "cache 更侧重缓解 CPU 与主存速度差异，虚拟内存更侧重容量扩充、保护和管理"
      },
      {
        label: "C",
        text: "虚拟内存未命中一定比 cache miss 更快，因为有磁盘后备"
      },
      {
        label: "D",
        text: "两者对程序来说完全等价，只是叫法不同"
      }
    ],
    answer: "B",
    explanation: "cache 的主要目标是缩小 CPU 与主存的速度差；虚拟内存则主要解决容量扩充、地址空间管理和保护问题。发生缺页时通常还需要 OS 介入，代价远大于普通 cache miss。",
    tags: [
      "memory",
      "virtual-memory",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-virtual-06",
    title: "更新问题的含义",
    question: "虚拟内存需要解决的“更新问题”主要关注什么？",
    options: [
      {
        label: "A",
        text: "如何保证主存和辅存中页面内容的一致性"
      },
      {
        label: "B",
        text: "如何让所有页面永久驻留在主存中"
      },
      {
        label: "C",
        text: "如何决定页内偏移占多少位"
      },
      {
        label: "D",
        text: "如何让不同进程共用同一张页表"
      }
    ],
    answer: "A",
    explanation: "页面在主存和辅存之间换入换出时，系统必须考虑脏页写回、页表状态更新等问题，本质上是在维护不同层级存储之间的数据一致性。",
    tags: [
      "memory",
      "virtual-memory",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-virtual-07",
    title: "虚拟内存的基本流程",
    question: "从高层次流程看，程序访问某页而该页当前不在内存时，下面哪一项最符合虚拟内存的工作过程？",
    options: [
      {
        label: "A",
        text: "直接终止进程，然后重新编译程序"
      },
      {
        label: "B",
        text: "发生缺页，操作系统按策略调入所需页，必要时置换旧页，然后继续执行"
      },
      {
        label: "C",
        text: "先把整个进程全部换入，再重新建立所有逻辑地址"
      },
      {
        label: "D",
        text: "先扩大物理内存容量，再重新访问该页"
      }
    ],
    answer: "B",
    explanation: "虚拟内存的基本思路是访问时检查所需页是否在主存中；若不在，则触发缺页并由 OS 调页，必要时进行页面置换，随后恢复并继续执行原来的访问。",
    tags: [
      "memory",
      "virtual-memory",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "memory-virtual-08",
    title: "虚拟存储的离散性",
    question: "虚拟存储技术的“离散性”主要指什么？",
    options: [
      {
        label: "A",
        text: "作业必须占用一整块连续物理内存"
      },
      {
        label: "B",
        text: "作业的各个部分可以离散地放在不同物理块中，并通过地址映射组织起来"
      },
      {
        label: "C",
        text: "所有页面必须按访问顺序连续写入磁盘"
      },
      {
        label: "D",
        text: "CPU 每次只能访问一个固定的物理地址"
      }
    ],
    answer: "B",
    explanation: "虚拟存储建立在离散分配基础上，程序的不同页面或段可以不连续地放入主存，再由页表或段表等机制完成逻辑地址到物理地址的映射。",
    tags: [
      "memory",
      "virtual-memory",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "memory-virtual-09",
    title: "虚拟内存容量限制",
    question: "关于虚拟内存最大容量，下列说法最准确的是哪一项？",
    options: [
      {
        label: "A",
        text: "只由物理内存容量决定"
      },
      {
        label: "B",
        text: "只由当前空闲页框数量决定"
      },
      {
        label: "C",
        text: "受计算机地址结构和可用外存等因素限制，并不等于无限大"
      },
      {
        label: "D",
        text: "一定等于 CPU cache 容量"
      }
    ],
    answer: "C",
    explanation: "虚拟内存让程序看到的地址空间可以大于物理内存，但它仍受地址位数、页表结构、后备存储等条件限制，不能理解为无限容量。",
    tags: [
      "memory",
      "virtual-memory",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-virtual-10",
    title: "覆盖、交换与虚拟内存",
    question: "虚拟内存相对覆盖技术的一个重要改进是什么？",
    options: [
      {
        label: "A",
        text: "要求程序员手工划分覆盖段，并显式安排调入顺序"
      },
      {
        label: "B",
        text: "由操作系统和硬件协作完成按需调入，不要求程序员手工管理覆盖关系"
      },
      {
        label: "C",
        text: "完全取消辅存，只依赖寄存器保存程序"
      },
      {
        label: "D",
        text: "只能一次性把整个程序装入主存后运行"
      }
    ],
    answer: "B",
    explanation: "覆盖技术通常需要程序员理解程序结构并安排不同时驻留的代码段；虚拟内存借鉴“用时调入”的思想，但调页、保护和映射主要由 OS 与硬件完成。",
    tags: [
      "memory",
      "virtual-memory",
      "overlay",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-virtual-11",
    title: "虚拟内存的代价",
    question: "下面哪项最能体现虚拟内存机制的主要代价？",
    options: [
      {
        label: "A",
        text: "每次命中 CPU cache 都必须访问磁盘"
      },
      {
        label: "B",
        text: "地址转换、缺页处理和页面换入换出会消耗 CPU 时间与 I/O 时间"
      },
      {
        label: "C",
        text: "所有进程必须共享同一个地址空间"
      },
      {
        label: "D",
        text: "程序不能再使用逻辑地址"
      }
    ],
    answer: "B",
    explanation: "虚拟内存提升了地址空间抽象和主存利用率，但地址转换需要硬件结构支持，缺页时还可能进入内核并发生磁盘 I/O，因此会带来明显运行时开销。",
    tags: [
      "memory",
      "virtual-memory",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "memory-virtual-12",
    title: "调入与替换问题",
    question: "虚拟内存管理中，“调入问题”和“替换问题”分别关注什么？",
    options: [
      {
        label: "A",
        text: "调入关注地址位数，替换关注指令编码"
      },
      {
        label: "B",
        text: "调入关注何时、哪些页进入主存，替换关注主存不足时换出哪些页"
      },
      {
        label: "C",
        text: "调入关注 CPU 调度，替换关注进程创建"
      },
      {
        label: "D",
        text: "调入只发生在 cache 中，替换只发生在寄存器中"
      }
    ],
    answer: "B",
    explanation: "虚拟内存需要决定哪些程序和数据页在何时进入主存；当主存没有足够空闲页框时，还要按页面置换策略选择牺牲页换出。",
    tags: [
      "memory",
      "virtual-memory",
      "exam"
    ],
    difficulty: "medium"
  }
];
const process = [
  {
    id: "process-thread-01",
    title: "进程与线程",
    question: "关于进程和线程，下列说法最准确的是哪一项？",
    options: [
      {
        label: "A",
        text: "线程是资源分配的基本单位，进程是 CPU 调度的基本单位"
      },
      {
        label: "B",
        text: "进程是资源分配的基本单位，线程是 CPU 调度的基本单位"
      },
      {
        label: "C",
        text: "同一进程内的线程不共享地址空间"
      },
      {
        label: "D",
        text: "线程切换一定比系统调用开销更大"
      }
    ],
    answer: "B",
    explanation: "现代操作系统通常把进程作为资源拥有和保护边界，把线程作为调度执行单元。同进程线程共享地址空间，因此通信方便但并发风险更高。",
    tags: [
      "process",
      "concurrency",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "process-thread-02",
    title: "线程的提出",
    question: "引入线程主要是为了解决进程模型中的哪类问题？",
    options: [
      {
        label: "A",
        text: "把资源拥有者和可执行单元完全绑定在一起，降低协作灵活性"
      },
      {
        label: "B",
        text: "让每个线程都拥有完全独立的地址空间"
      },
      {
        label: "C",
        text: "取消操作系统对并发执行的支持"
      },
      {
        label: "D",
        text: "让所有程序只能串行运行"
      }
    ],
    answer: "A",
    explanation: "传统进程同时承担资源拥有者和执行单元两个角色，进程间通信和切换开销较大。线程把执行单元从进程中分离出来，使同一进程内可以有多个较轻量的执行流。",
    tags: [
      "process",
      "concurrency",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "process-thread-03",
    title: "线程共享与私有状态",
    question: "同一进程内多个线程之间，下面哪种说法最准确？",
    options: [
      {
        label: "A",
        text: "通常共享地址空间和进程资源，但各自拥有执行现场，如寄存器状态和栈"
      },
      {
        label: "B",
        text: "每个线程都拥有独立页表和完全独立地址空间"
      },
      {
        label: "C",
        text: "所有线程必须共享同一个程序计数器和同一个栈"
      },
      {
        label: "D",
        text: "线程之间不能访问同一进程的数据"
      }
    ],
    answer: "A",
    explanation: "线程共享所属进程的地址空间、打开文件等资源，所以通信成本低；但线程作为独立执行流，需要各自保存程序计数器、寄存器和栈等执行现场。",
    tags: [
      "process",
      "concurrency",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "process-thread-04",
    title: "多线程适用场景",
    question: "下列哪种场景最能体现多线程的优势？",
    options: [
      {
        label: "A",
        text: "单核上一个完全不等待 I/O 的短小计算任务"
      },
      {
        label: "B",
        text: "任务中既有计算又有频繁 I/O 等待，等待期间还有其他工作可做"
      },
      {
        label: "C",
        text: "所有任务都必须严格按固定顺序执行，不能交错"
      },
      {
        label: "D",
        text: "程序只执行一次简单赋值后立即退出"
      }
    ],
    answer: "B",
    explanation: "多线程适合把可并发推进的工作拆成多个执行流，尤其在某些线程等待 I/O 时，其他线程仍可运行。若任务很短或几乎没有等待，线程创建和切换开销可能抵消收益。",
    tags: [
      "process",
      "concurrency",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "process-thread-05",
    title: "用户级线程",
    question: "关于用户级线程（ULT），下列说法最准确的是哪一项？",
    options: [
      {
        label: "A",
        text: "线程管理主要由用户态线程库完成，内核通常不知道这些用户级线程的存在"
      },
      {
        label: "B",
        text: "每个用户级线程都必须对应一个内核线程，且只能由内核调度"
      },
      {
        label: "C",
        text: "用户级线程切换一定需要切换页表"
      },
      {
        label: "D",
        text: "用户级线程只能运行在多处理器系统上"
      }
    ],
    answer: "A",
    explanation: "用户级线程由语言运行时或线程库在用户态管理，切换通常不需要陷入内核，因此开销较低；但内核只看到所属进程，无法直接按这些线程进行调度。",
    tags: [
      "process",
      "concurrency",
      "kernel"
    ],
    difficulty: "medium"
  },
  {
    id: "process-thread-06",
    title: "用户级线程阻塞问题",
    question: "在纯用户级线程模型中，一个线程执行阻塞式系统调用时，常见问题是什么？",
    options: [
      {
        label: "A",
        text: "内核可能阻塞整个进程，导致该进程内其他用户级线程也无法继续运行"
      },
      {
        label: "B",
        text: "阻塞只会影响该用户级线程，内核一定能继续调度同进程其他用户级线程"
      },
      {
        label: "C",
        text: "系统调用不会进入内核，所以不可能阻塞"
      },
      {
        label: "D",
        text: "阻塞会自动把用户级线程转换成独立进程"
      }
    ],
    answer: "A",
    explanation: "纯 ULT 中内核调度对象通常是进程而不是用户级线程。若一个用户级线程触发会阻塞进程的系统调用，内核可能让整个进程等待，其他 ULT 也随之停住。",
    tags: [
      "process",
      "concurrency",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "process-thread-07",
    title: "内核级线程",
    question: "内核级线程（KLT）相对纯用户级线程的一个重要优势是什么？",
    options: [
      {
        label: "A",
        text: "内核可以感知并调度线程，阻塞通常发生在线程级别，并可在多处理器上并行运行同进程多个线程"
      },
      {
        label: "B",
        text: "线程切换永远不需要进入内核，因此没有管理开销"
      },
      {
        label: "C",
        text: "所有线程必须共享同一个栈，节省全部内存"
      },
      {
        label: "D",
        text: "内核级线程不能执行系统调用"
      }
    ],
    answer: "A",
    explanation: "KLT 是内核可见的调度实体，内核能够把同一进程的不同线程调度到不同处理器上；某个线程阻塞时，也不必阻塞整个进程的所有线程。",
    tags: [
      "process",
      "concurrency",
      "kernel"
    ],
    difficulty: "medium"
  },
  {
    id: "process-thread-08",
    title: "内核级线程开销",
    question: "内核级线程的主要代价通常体现在哪里？",
    options: [
      {
        label: "A",
        text: "线程创建、撤销和切换需要内核参与，模式切换和内核数据结构维护带来额外开销"
      },
      {
        label: "B",
        text: "内核级线程无法被操作系统调度"
      },
      {
        label: "C",
        text: "内核级线程一定不能在多处理器上运行"
      },
      {
        label: "D",
        text: "内核级线程会让进程之间失去地址空间隔离"
      }
    ],
    answer: "A",
    explanation: "KLT 的管理由内核完成，功能更强但开销也更高。线程操作可能涉及陷入内核、调度器、内核栈和控制块等数据结构维护。",
    tags: [
      "process",
      "kernel",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "process-thread-09",
    title: "混合线程模型",
    question: "关于 Many-to-One、One-to-One 和 Many-to-Many 线程模型，下列说法正确的是哪一项？",
    options: [
      {
        label: "A",
        text: "Many-to-One 通常无法让同一进程的多个用户线程在多个 CPU 上真正并行"
      },
      {
        label: "B",
        text: "One-to-One 会把所有用户线程映射到同一个内核线程"
      },
      {
        label: "C",
        text: "Many-to-Many 完全没有实现复杂度和调度开销"
      },
      {
        label: "D",
        text: "三种模型都要求用户线程数量必须等于内核线程数量"
      }
    ],
    answer: "A",
    explanation: "Many-to-One 把多个用户线程映射到一个内核调度实体，内核无法把它们分配到多个处理器并行执行；One-to-One 是一个用户线程对应一个内核线程，Many-to-Many 则在并发度和开销之间折中。",
    tags: [
      "process",
      "concurrency",
      "tricky"
    ],
    difficulty: "hard"
  },
  {
    id: "process-mode-switch-01",
    title: "陷入内核与进程切换",
    question: "用户进程执行系统调用时，下面哪项描述更准确？",
    options: [
      {
        label: "A",
        text: "一定发生进程上下文切换"
      },
      {
        label: "B",
        text: "一定切换到另一个进程运行"
      },
      {
        label: "C",
        text: "会从用户态进入内核态，但不一定发生进程切换"
      },
      {
        label: "D",
        text: "不会保存任何寄存器现场"
      }
    ],
    answer: "C",
    explanation: "系统调用会触发受控的特权级切换，进入内核执行服务例程；是否调度其他进程取决于系统调用行为、阻塞与调度策略。",
    tags: [
      "kernel",
      "tricky",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "process-state-control-01",
    title: "进程与程序",
    question: "关于程序和进程的关系，下列哪项描述最准确？",
    options: [
      {
        label: "A",
        text: "程序和进程都是静态的磁盘文件"
      },
      {
        label: "B",
        text: "程序是静态实体，进程是程序在数据集合上的一次动态运行过程"
      },
      {
        label: "C",
        text: "一个程序在任意时刻只能对应一个进程"
      },
      {
        label: "D",
        text: "进程只包含程序代码，不包含数据和控制信息"
      }
    ],
    answer: "B",
    explanation: "程序是静态的代码和数据描述；进程是程序运行起来之后形成的动态实体，通常由程序、数据和 PCB 等组成，是系统进行资源分配和调度管理的重要单位。",
    tags: [
      "process",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "process-state-control-02",
    title: "并发与并行",
    question: "在单核处理机上，多个进程看起来同时推进，通常体现的是哪种概念？",
    options: [
      {
        label: "A",
        text: "并行：多个进程在同一时刻分别运行在不同处理机上"
      },
      {
        label: "B",
        text: "并发：多个进程的执行在时间上交替推进并发生重叠"
      },
      {
        label: "C",
        text: "串行：一个进程必须完全结束后另一个进程才能开始"
      },
      {
        label: "D",
        text: "独占：每个进程都永久占有一个独立 CPU"
      }
    ],
    answer: "B",
    explanation: "单核系统同一时刻只能执行一个执行流，但操作系统可以通过调度让多个进程在时间上交替推进，因此体现的是并发而不是真正的并行。",
    tags: [
      "process",
      "concurrency",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "process-state-control-03",
    title: "Bernstein 条件",
    question: "两个程序段 S1 和 S2 并发执行仍能保证结果可复现，关键条件是什么？",
    options: [
      {
        label: "A",
        text: "R(S2) 与 W(S1)、R(S1) 与 W(S2)、W(S1) 与 W(S2) 均不存在交集"
      },
      {
        label: "B",
        text: "只要两个程序段读取同一个变量，就一定不能并发执行"
      },
      {
        label: "C",
        text: "只要两个程序段写入不同变量，结果就一定不可复现"
      },
      {
        label: "D",
        text: "只需保证两个程序段的运行时间完全相同"
      }
    ],
    answer: "A",
    explanation: "Bernstein 条件排除的是读写冲突和写写冲突。如果一个程序段会写另一个程序段要读或要写的数据，并发执行结果就可能依赖具体交错顺序。",
    tags: [
      "process",
      "concurrency",
      "tricky",
      "exam"
    ],
    difficulty: "hard"
  },
  {
    id: "process-state-control-04",
    title: "进程创建",
    question: "下列哪种情况最不属于典型的进程创建触发场景？",
    options: [
      {
        label: "A",
        text: "提交一个批处理作业"
      },
      {
        label: "B",
        text: "用户登录后，系统创建服务进程"
      },
      {
        label: "C",
        text: "已有进程请求创建子进程"
      },
      {
        label: "D",
        text: "正在执行的进程等待磁盘 I/O 完成"
      }
    ],
    answer: "D",
    explanation: "提交作业、用户登录或已有进程派生新进程都可能触发进程创建；等待磁盘 I/O 通常会导致当前进程从执行状态转为阻塞状态，而不是创建新进程。",
    tags: [
      "process",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "process-state-control-05",
    title: "就绪与阻塞",
    question: "某进程已经获得除 CPU 以外的运行所需资源，只等待调度器分配处理机，它处于什么状态？",
    options: [
      {
        label: "A",
        text: "执行状态"
      },
      {
        label: "B",
        text: "阻塞状态"
      },
      {
        label: "C",
        text: "就绪状态"
      },
      {
        label: "D",
        text: "终止状态"
      }
    ],
    answer: "C",
    explanation: "就绪状态表示进程已经具备运行条件，只差 CPU；阻塞状态则表示进程正在等待某个事件或资源，即使 CPU 空闲也暂时不能继续执行。",
    tags: [
      "process",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "process-state-control-06",
    title: "状态转换",
    question: "正在执行的进程因为等待磁盘 I/O 完成而暂时不能继续运行，典型的状态转换是哪一项？",
    options: [
      {
        label: "A",
        text: "执行状态 → 就绪状态"
      },
      {
        label: "B",
        text: "执行状态 → 阻塞状态"
      },
      {
        label: "C",
        text: "阻塞状态 → 执行状态"
      },
      {
        label: "D",
        text: "就绪状态 → 阻塞状态"
      }
    ],
    answer: "B",
    explanation: "进程在执行时主动等待 I/O、信号或其他事件，会放弃处理机并进入阻塞状态。时间片用完或被抢占更常见的是从执行转为就绪。",
    tags: [
      "process",
      "kernel",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "process-state-control-07",
    title: "挂起状态",
    question: "引入挂起状态后，关于“就绪挂起”的理解，下列哪项最准确？",
    options: [
      {
        label: "A",
        text: "进程在内存中等待 CPU，分配处理机后即可运行"
      },
      {
        label: "B",
        text: "进程已被换出到外存，具备运行条件，但需要先换入内存再参与调度"
      },
      {
        label: "C",
        text: "进程正在 CPU 上执行，但随时可能被中断"
      },
      {
        label: "D",
        text: "进程正在等待 I/O 完成，事件未发生前不能运行"
      }
    ],
    answer: "B",
    explanation: "挂起表示进程被暂时移出内存。就绪挂起的进程不缺等待事件，主要限制是当前不在内存中；阻塞挂起才是既被换出又在等待事件。",
    tags: [
      "process",
      "memory",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "process-state-control-08",
    title: "原语",
    question: "关于操作系统原语，下列哪项描述最准确？",
    options: [
      {
        label: "A",
        text: "原语可以在执行到一半时被任意中断并交给用户态程序继续完成"
      },
      {
        label: "B",
        text: "原语是一段完成特定功能、执行过程连续不可分割的核心操作"
      },
      {
        label: "C",
        text: "原语只存在于应用程序库中，与内核无关"
      },
      {
        label: "D",
        text: "原语的作用是让当前进程永久阻塞"
      }
    ],
    answer: "B",
    explanation: "原语用于实现创建、撤销、阻塞、唤醒等核心控制操作，要求执行过程具有不可分割性，通常在内核态完成，以避免关键状态被并发破坏。",
    tags: [
      "process",
      "kernel",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "process-state-control-09",
    title: "PCB 作用",
    question: "为什么 PCB 是进程管理与控制的核心数据结构？",
    options: [
      {
        label: "A",
        text: "因为 PCB 保存进程标识、当前状态、现场、资源清单等信息，使 OS 能识别和管理进程"
      },
      {
        label: "B",
        text: "因为 PCB 只保存可执行程序的源代码"
      },
      {
        label: "C",
        text: "因为所有进程共享同一个 PCB，可以减少内存占用"
      },
      {
        label: "D",
        text: "因为没有 PCB，OS 也能完整恢复任意进程的执行现场"
      }
    ],
    answer: "A",
    explanation: "PCB 把进程的身份、状态、调度信息、现场保护信息和资源占用等集中记录下来。创建、撤销、调度和恢复进程都依赖这些控制信息。",
    tags: [
      "process",
      "kernel",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "process-state-control-10",
    title: "并发执行特征",
    question: "程序并发执行后出现“不可再现性”的根本原因通常是什么？",
    options: [
      {
        label: "A",
        text: "程序代码被永久删除"
      },
      {
        label: "B",
        text: "多个程序共享资源，执行交错顺序可能改变共享状态"
      },
      {
        label: "C",
        text: "CPU 不再执行任何指令"
      },
      {
        label: "D",
        text: "所有输入数据都会自动变成随机数"
      }
    ],
    answer: "B",
    explanation: "并发程序可能读写同一资源，实际执行顺序又由调度决定；如果存在读写或写写冲突，相同初始条件下也可能得到不同结果。",
    tags: [
      "process",
      "concurrency",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "process-state-control-11",
    title: "时间片用完的状态转换",
    question: "正在执行的进程因时间片用完被调度器剥夺 CPU，典型状态转换是哪一项？",
    options: [
      {
        label: "A",
        text: "执行状态 → 就绪状态"
      },
      {
        label: "B",
        text: "执行状态 → 阻塞状态"
      },
      {
        label: "C",
        text: "阻塞状态 → 执行状态"
      },
      {
        label: "D",
        text: "就绪状态 → 挂起状态"
      }
    ],
    answer: "A",
    explanation: "时间片用完表示进程仍具备运行条件，只是暂时失去处理机，因此通常回到就绪队列；等待 I/O 或事件才会转入阻塞状态。",
    tags: [
      "process",
      "scheduling",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "process-state-control-12",
    title: "阻塞与唤醒",
    question: "一个阻塞进程等待的 I/O 事件完成后，通常不会直接变为执行状态，而是先进入就绪状态。原因是什么？",
    options: [
      {
        label: "A",
        text: "它还需要等待调度器分配 CPU"
      },
      {
        label: "B",
        text: "它的程序代码已经被删除"
      },
      {
        label: "C",
        text: "阻塞进程不能再参与任何调度"
      },
      {
        label: "D",
        text: "I/O 完成一定会让进程终止"
      }
    ],
    answer: "A",
    explanation: "事件完成只说明阻塞原因消失，进程重新具备运行条件；是否真正执行还取决于处理机分配，所以通常先转入就绪队列。",
    tags: [
      "process",
      "scheduling",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "process-state-control-13",
    title: "PCB 中的现场保护区",
    question: "PCB 中设置现场保护区的主要目的是什么？",
    options: [
      {
        label: "A",
        text: "保存 CPU 寄存器等执行现场，以便进程以后恢复运行"
      },
      {
        label: "B",
        text: "保存源代码注释，便于重新编译程序"
      },
      {
        label: "C",
        text: "永久保存所有磁盘文件内容"
      },
      {
        label: "D",
        text: "让进程绕过内核直接访问所有设备"
      }
    ],
    answer: "A",
    explanation: "进程失去 CPU 时，操作系统需要保存程序计数器、寄存器、栈指针等现场信息；下次调度该进程时再恢复这些信息，才能从断点继续执行。",
    tags: [
      "process",
      "kernel",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "process-state-control-14",
    title: "进程撤销场景",
    question: "下列哪项最符合进程撤销而不是进程创建的场景？",
    options: [
      {
        label: "A",
        text: "用户提交一个新的批处理作业"
      },
      {
        label: "B",
        text: "已有进程调用接口创建子进程"
      },
      {
        label: "C",
        text: "进程正常结束或因错误失败而被系统终止"
      },
      {
        label: "D",
        text: "用户登录后系统为其建立服务进程"
      }
    ],
    answer: "C",
    explanation: "正常结束、出错失败、超时或用户退出等都可能触发撤销；提交作业、登录服务和创建子进程更常见于进程创建。",
    tags: [
      "process",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "process-state-control-15",
    title: "模态切换与上下文切换",
    question: "关于陷入内核和进程上下文切换，下列说法最准确的是哪一项？",
    options: [
      {
        label: "A",
        text: "只要从用户态进入内核态，就一定切换到另一个进程"
      },
      {
        label: "B",
        text: "陷入内核是特权级变化；进程上下文切换还涉及调度并切换到另一个进程的执行现场"
      },
      {
        label: "C",
        text: "进程上下文切换不需要保存任何寄存器"
      },
      {
        label: "D",
        text: "系统调用只能在用户态完整执行，不能进入内核态"
      }
    ],
    answer: "B",
    explanation: "系统调用、中断或异常会导致 CPU 进入内核态，但内核处理完后可能仍返回原进程；只有调度器决定换另一个进程运行时，才发生通常意义上的进程上下文切换。",
    tags: [
      "process",
      "kernel",
      "tricky"
    ],
    difficulty: "medium"
  }
];
const sync = [
  {
    id: "sync-mutex-semaphore-01",
    title: "Mutex 与 Semaphore",
    question: "关于 Mutex 和 Semaphore，下列说法最合适的是哪一项？",
    options: [
      {
        label: "A",
        text: "Mutex 更强调互斥所有权，Semaphore 更强调计数和同步信号"
      },
      {
        label: "B",
        text: "Semaphore 只能取 0 或 1"
      },
      {
        label: "C",
        text: "Mutex 不能用于保护临界区"
      },
      {
        label: "D",
        text: "二者没有任何语义差异"
      }
    ],
    answer: "A",
    explanation: "Mutex 通常用于保护临界区并强调加锁者释放；Semaphore 可以表达资源数量，也可作为线程间同步信号。",
    tags: [
      "concurrency",
      "tricky",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "sync-condition-variable-01",
    title: "条件变量",
    question: "使用条件变量等待某个条件时，为什么通常要用 while 而不是 if？",
    options: [
      {
        label: "A",
        text: "while 的性能一定更好"
      },
      {
        label: "B",
        text: "线程被唤醒后条件可能仍不满足，需要重新检查"
      },
      {
        label: "C",
        text: "if 无法通过编译"
      },
      {
        label: "D",
        text: "条件变量不需要和锁配合"
      }
    ],
    answer: "B",
    explanation: "条件变量可能出现虚假唤醒，或者多个线程竞争导致被唤醒时条件已被其他线程改变，因此需要在循环中重新检查条件。",
    tags: [
      "concurrency",
      "tricky",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "sync-critical-section-01",
    title: "互斥与同步",
    question: "关于互斥和同步，下列说法最准确的是哪一项？",
    options: [
      {
        label: "A",
        text: "互斥强调多个进程按固定先后顺序执行，和资源竞争无关"
      },
      {
        label: "B",
        text: "同步强调协调进程间的执行次序，互斥强调临界资源一次只允许一个执行流访问"
      },
      {
        label: "C",
        text: "同步和互斥都只能通过关闭中断实现"
      },
      {
        label: "D",
        text: "只要使用多线程，就不会出现互斥问题"
      }
    ],
    answer: "B",
    explanation: "互斥来自对临界资源的竞争，目标是同一时刻只有一个执行流进入临界区；同步来自执行顺序约束，目标是让不同执行流按条件或先后关系推进。",
    tags: [
      "concurrency",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "sync-critical-section-02",
    title: "临界区管理准则",
    question: "下列哪项最符合“有限等待”的含义？",
    options: [
      {
        label: "A",
        text: "临界区空闲时，任何申请者都必须继续等待"
      },
      {
        label: "B",
        text: "临界区中可以同时有多个进程运行，只要它们优先级相同"
      },
      {
        label: "C",
        text: "申请进入临界区的进程应能在有限时间内获得进入机会，避免饥饿"
      },
      {
        label: "D",
        text: "进程在临界区外运行时必须阻止其他进程进入临界区"
      }
    ],
    answer: "C",
    explanation: "有限等待要求请求临界区的进程不会无限期等待；它和空闲让进、忙则等待、让权等待共同约束临界区管理。",
    tags: [
      "concurrency",
      "tricky",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "sync-dekker-01",
    title: "Dekker 算法",
    question: "Dekker 算法中，`turn` 与两个申请标志共同使用的主要目的是什么？",
    options: [
      {
        label: "A",
        text: "只记录当前系统中 CPU 的数量"
      },
      {
        label: "B",
        text: "在双方同时申请临界区时决定谁先进入，并让另一方暂时等待"
      },
      {
        label: "C",
        text: "让两个进程永远同时进入临界区"
      },
      {
        label: "D",
        text: "保存临界区内共享变量的备份值"
      }
    ],
    answer: "B",
    explanation: "`pturn/qturn` 表示是否申请进入，`turn` 用来处理双方同时申请时的优先权，从而保证互斥并避免双方都坚持进入。",
    tags: [
      "concurrency",
      "algorithm",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "sync-peterson-01",
    title: "Peterson 算法",
    question: "Peterson 算法中，一个进程申请进入临界区后主动设置 `turn = other`，这一步的作用是什么？",
    options: [
      {
        label: "A",
        text: "主动把竞争时的优先权让给对方，若对方也申请则自己等待"
      },
      {
        label: "B",
        text: "永久禁止对方进入临界区"
      },
      {
        label: "C",
        text: "让两个进程跳过临界区"
      },
      {
        label: "D",
        text: "清空所有共享变量，避免读写冲突"
      }
    ],
    answer: "A",
    explanation: "Peterson 算法用意愿标志表示自己想进入，用 `turn` 解决双方同时有意愿时的让步关系。它比 Dekker 更简洁，但仍主要适用于两个进程。",
    tags: [
      "concurrency",
      "algorithm",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "sync-bakery-01",
    title: "Bakery 算法",
    question: "Bakery Algorithm 中同时比较编号和进程 ID 的主要原因是什么？",
    options: [
      {
        label: "A",
        text: "编号越大代表越早申请，必须优先进入"
      },
      {
        label: "B",
        text: "只按进程 ID 排序即可保证完全公平，不需要编号"
      },
      {
        label: "C",
        text: "编号体现申请先后，进程 ID 用于在编号相同时打破平局"
      },
      {
        label: "D",
        text: "进程 ID 用于保存临界区中的计算结果"
      }
    ],
    answer: "C",
    explanation: "Bakery 算法用动态编号近似“先来先服务”；当多个进程取到相同编号时，再用进程 ID 保证比较关系确定。",
    tags: [
      "concurrency",
      "algorithm",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "sync-interrupt-disable-01",
    title: "中断屏蔽",
    question: "为什么关中断实现互斥不适合作为普通用户程序的通用方案？",
    options: [
      {
        label: "A",
        text: "关中断会让该 CPU 不再被中断抢占，若用户程序滥用会破坏系统响应甚至导致系统无法继续运行"
      },
      {
        label: "B",
        text: "关中断会自动释放所有临界资源"
      },
      {
        label: "C",
        text: "关中断可以同时阻止所有 CPU 访问共享变量，因此没有任何代价"
      },
      {
        label: "D",
        text: "关中断只能用于实现同步，不能用于互斥"
      }
    ],
    answer: "A",
    explanation: "关中断依赖抢占和调度入口被关闭，通常只适合内核中极短的关键区域；多 CPU 下还不能阻止其他 CPU 访问同一共享资源。",
    tags: [
      "concurrency",
      "kernel",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "sync-test-and-set-01",
    title: "Test-and-Set",
    question: "关于 test_and_set 指令，下列说法正确的是哪一项？",
    options: [
      {
        label: "A",
        text: "它先返回 lock 的旧值，再原子地把 lock 置为 true"
      },
      {
        label: "B",
        text: "它只能读取 lock，不能修改 lock"
      },
      {
        label: "C",
        text: "它由多条可被任意中断的用户态语句组成"
      },
      {
        label: "D",
        text: "它执行后一定会让当前进程阻塞并释放 CPU"
      }
    ],
    answer: "A",
    explanation: "test_and_set 的关键是读旧值与写新值不可分割。自旋锁正是利用旧值判断是否已经有人持锁。",
    tags: [
      "concurrency",
      "kernel",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "sync-spinlock-01",
    title: "自旋锁适用场景",
    question: "下列哪种场景更适合使用自旋锁？",
    options: [
      {
        label: "A",
        text: "临界区很短，预计持锁时间小于阻塞和唤醒的开销"
      },
      {
        label: "B",
        text: "临界区包含长时间磁盘 I/O"
      },
      {
        label: "C",
        text: "持锁线程可能长期睡眠"
      },
      {
        label: "D",
        text: "系统希望等待线程立刻让出 CPU，完全不忙等"
      }
    ],
    answer: "A",
    explanation: "自旋锁用忙等待换取避免睡眠/唤醒开销，因此适合短临界区；等待时间长时会浪费 CPU。",
    tags: [
      "concurrency",
      "tricky",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "sync-priority-inversion-01",
    title: "优先级反转",
    question: "优先级反转问题的典型表现是什么？",
    options: [
      {
        label: "A",
        text: "高优先级任务等待低优先级任务释放锁，而低优先级任务又迟迟得不到运行机会"
      },
      {
        label: "B",
        text: "所有低优先级任务都会自动变成高优先级任务"
      },
      {
        label: "C",
        text: "进程 ID 较小的任务永远不能进入临界区"
      },
      {
        label: "D",
        text: "关闭中断后系统必然提升所有任务优先级"
      }
    ],
    answer: "A",
    explanation: "低优先级任务持有高优先级任务需要的锁时，高优先级任务会被锁间接阻塞；若低优先级任务被其他中优先级任务抢占，就可能长期无法释放锁。",
    tags: [
      "concurrency",
      "scheduling",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "sync-semaphore-02",
    title: "信号量避免唤醒丢失",
    question: "信号量相比单纯的 Sleep/Wakeup 更能避免“唤醒丢失”的关键原因是什么？",
    options: [
      {
        label: "A",
        text: "信号量用整型值累计可用资源或唤醒次数，V 操作的效果不会因为暂时无人等待就必然丢失"
      },
      {
        label: "B",
        text: "信号量完全不需要原子操作"
      },
      {
        label: "C",
        text: "信号量只能用于一个进程，不能用于多个进程"
      },
      {
        label: "D",
        text: "信号量会自动判断临界区代码是否正确"
      }
    ],
    answer: "A",
    explanation: "信号量的值保存了资源数量或已经发生的信号；后来执行 P 操作的进程可以消耗这个计数，而不是依赖某次瞬时 wakeup 是否正好有人等待。",
    tags: [
      "concurrency",
      "semaphore",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "sync-barrier-01",
    title: "屏障同步",
    question: "笔记中的屏障实现里，线程执行 `P(barrier)` 后紧接着执行 `V(barrier)` 的作用是什么？",
    options: [
      {
        label: "A",
        text: "被唤醒的线程继续唤醒下一个等待线程，使所有已到达屏障的线程依次通过"
      },
      {
        label: "B",
        text: "把 count 重置为 0，保证屏障可无限复用"
      },
      {
        label: "C",
        text: "让第一个到达屏障的线程立刻越过所有其他线程"
      },
      {
        label: "D",
        text: "关闭中断，防止任何线程进入屏障"
      }
    ],
    answer: "A",
    explanation: "最后一个到达的线程释放一次 barrier 后，每个被唤醒的线程再释放下一次，相当于接力唤醒等待队列中的其他线程。",
    tags: [
      "concurrency",
      "semaphore",
      "tricky"
    ],
    difficulty: "hard"
  },
  {
    id: "sync-semaphore-set-01",
    title: "AND 型信号量集",
    question: "AND 型信号量集机制的核心思想是什么？",
    options: [
      {
        label: "A",
        text: "进程需要多个资源时，一次性测试并分配全部所需资源，使用完后再一起释放"
      },
      {
        label: "B",
        text: "每次只允许进程申请一个资源，失败后仍然占有已经申请到的资源"
      },
      {
        label: "C",
        text: "把所有信号量都强制改成二元信号量"
      },
      {
        label: "D",
        text: "取消 P/V 操作，只保留条件变量"
      }
    ],
    answer: "A",
    explanation: "AND 型信号量集把多个资源的申请作为一个整体处理，避免进程只占有部分资源后继续等待其他资源而增加死锁风险。",
    tags: [
      "concurrency",
      "semaphore",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "sync-monitor-01",
    title: "Hoare 管程",
    question: "在 Hoare 管程语义中，进程 Q 对条件变量 X 执行 signal 唤醒 P 后，典型执行关系是什么？",
    options: [
      {
        label: "A",
        text: "P 立即获得管程执行权继续运行，Q 进入紧急等待队列等待恢复"
      },
      {
        label: "B",
        text: "Q 继续运行直到退出，P 只能重新从入口等待队列排队"
      },
      {
        label: "C",
        text: "P 和 Q 可以同时在管程内执行"
      },
      {
        label: "D",
        text: "signal 一定会永久保存，直到未来任意进程 wait"
      }
    ],
    answer: "A",
    explanation: "Hoare 管程强调被 signal 唤醒的等待进程立即接管管程；signal 发起者则暂时进入 urgent queue，等管程再次可用时优先恢复。",
    tags: [
      "concurrency",
      "monitor",
      "tricky"
    ],
    difficulty: "hard"
  }
];
const boot = [
  {
    id: "boot-intro-01",
    title: "操作系统的角色",
    question: "关于操作系统的作用，下面哪种说法最准确？",
    options: [
      {
        label: "A",
        text: "操作系统只是一个图形界面，负责让用户点击程序"
      },
      {
        label: "B",
        text: "操作系统在用户程序和硬件之间提供抽象、资源管理和保护"
      },
      {
        label: "C",
        text: "操作系统只负责启动计算机，启动完成后不再参与程序运行"
      },
      {
        label: "D",
        text: "操作系统让所有程序都可以直接访问全部硬件寄存器"
      }
    ],
    answer: "B",
    explanation: "操作系统的核心是向上提供接口和抽象，向下管理 CPU、内存、I/O 等硬件资源，并通过权限和隔离机制保护内核与进程。",
    tags: [
      "boot",
      "os-intro",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "boot-intro-02",
    title: "抽象的意义",
    question: "文件系统体现了操作系统的哪一类核心思想？",
    options: [
      {
        label: "A",
        text: "把复杂磁盘细节抽象成文件、目录等更容易使用的对象"
      },
      {
        label: "B",
        text: "让应用程序直接指定磁头、柱面和扇区完成所有 I/O"
      },
      {
        label: "C",
        text: "取消所有设备驱动，让程序自己控制硬件"
      },
      {
        label: "D",
        text: "只提高 CPU 主频，不改变程序访问数据的方式"
      }
    ],
    answer: "A",
    explanation: "抽象的价值在于屏蔽硬件复杂性。文件系统让程序以文件和目录为单位访问数据，而不必直接处理磁盘物理布局。",
    tags: [
      "boot",
      "abstraction",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "boot-intro-03",
    title: "分时系统的影响",
    question: "分时系统把多个程序放到同一台机器上交替运行后，最直接推动了哪类机制的必要性？",
    options: [
      {
        label: "A",
        text: "让每个用户程序都独占全部物理内存和 I/O 设备"
      },
      {
        label: "B",
        text: "通过中断、系统调用、内核态和内存保护来受控共享硬件"
      },
      {
        label: "C",
        text: "取消调度器，因为程序必须严格串行执行"
      },
      {
        label: "D",
        text: "关闭虚拟内存，使所有程序使用相同物理地址"
      }
    ],
    answer: "B",
    explanation: "分时系统要求多个程序共享 CPU、内存和设备，因此必须限制用户程序权限，并通过中断、调度、系统调用、地址空间和内存保护来协调共享。",
    tags: [
      "boot",
      "history",
      "kernel"
    ],
    difficulty: "medium"
  },
  {
    id: "boot-intro-04",
    title: "中断与陷阱",
    question: "关于中断 interrupt 和陷阱 trap，下面哪项最准确？",
    options: [
      {
        label: "A",
        text: "中断通常由当前指令主动触发，陷阱通常由外设异步触发"
      },
      {
        label: "B",
        text: "中断和陷阱都一定表示程序发生了不可恢复错误"
      },
      {
        label: "C",
        text: "中断通常是异步外部事件，系统调用常被视为同步陷阱"
      },
      {
        label: "D",
        text: "陷阱发生后 CPU 不会进入内核态"
      }
    ],
    answer: "C",
    explanation: "中断多来自 I/O 设备或定时器，和当前指令不一定相关；系统调用是程序有意触发的受控陷入内核，通常属于同步陷阱。",
    tags: [
      "boot",
      "interrupt",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "boot-intro-05",
    title: "虚拟特征",
    question: "下面哪项最能体现操作系统的“虚拟”特征？",
    options: [
      {
        label: "A",
        text: "让多个进程看到各自独立的虚拟地址空间"
      },
      {
        label: "B",
        text: "禁止任何程序使用内存"
      },
      {
        label: "C",
        text: "让 CPU 不再执行机器指令"
      },
      {
        label: "D",
        text: "把所有文件都复制到寄存器中"
      }
    ],
    answer: "A",
    explanation: "虚拟化不是假的资源，而是通过映射、调度和保护把物理资源表现为更规则的逻辑资源。虚拟地址空间是典型例子。",
    tags: [
      "boot",
      "abstraction",
      "memory"
    ],
    difficulty: "easy"
  },
  {
    id: "boot-intro-06",
    title: "机制与策略",
    question: "“机制与策略分离”在操作系统设计中通常表示什么？",
    options: [
      {
        label: "A",
        text: "内核只保留硬件，不再提供任何软件接口"
      },
      {
        label: "B",
        text: "机制提供能做什么，策略决定具体如何选择"
      },
      {
        label: "C",
        text: "所有调度算法都必须写死在硬件里"
      },
      {
        label: "D",
        text: "用户程序可以绕过内核直接修改页表"
      }
    ],
    answer: "B",
    explanation: "机制是基本能力，例如切换进程、设置页表、阻塞或唤醒进程；策略是在具体场景下选择哪个进程、如何分配资源。",
    tags: [
      "boot",
      "kernel",
      "design"
    ],
    difficulty: "medium"
  },
  {
    id: "boot-sequence-01",
    title: "Boot 的核心矛盾",
    question: "为什么说计算机启动是一个 bootstrapping 问题？",
    options: [
      {
        label: "A",
        text: "必须先有程序运行才能初始化系统，但程序又依赖被初始化的运行环境"
      },
      {
        label: "B",
        text: "启动过程中只能运行用户态程序，不能运行内核态程序"
      },
      {
        label: "C",
        text: "启动只需要显示登录界面，不需要初始化硬件"
      },
      {
        label: "D",
        text: "启动阶段不允许执行任何指令"
      }
    ],
    answer: "A",
    explanation: "启动必须从极弱、固定、可靠的初始状态开始，先运行一小段程序，逐步初始化硬件并加载更复杂的软件。",
    tags: [
      "boot",
      "bootloader",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "boot-sequence-02",
    title: "Bootloader 职责",
    question: "Bootloader 的主要职责不包括哪一项？",
    options: [
      {
        label: "A",
        text: "初始化必要硬件，使系统具备最小运行环境"
      },
      {
        label: "B",
        text: "把操作系统内核映像加载到内存"
      },
      {
        label: "C",
        text: "跳转到操作系统内核入口"
      },
      {
        label: "D",
        text: "长期负责所有用户进程的调度和内存回收"
      }
    ],
    answer: "D",
    explanation: "Bootloader 只负责把系统带到内核可以接管的状态。长期调度、内存回收和资源管理是操作系统内核的职责。",
    tags: [
      "boot",
      "bootloader",
      "tricky"
    ],
    difficulty: "easy"
  },
  {
    id: "boot-sequence-03",
    title: "MIPS kseg1",
    question: "MIPS 上电启动时选择 `kseg1` 区域作为可靠入口的重要原因是什么？",
    options: [
      {
        label: "A",
        text: "它是用户态可直接访问的高速缓存区域"
      },
      {
        label: "B",
        text: "它不依赖 TLB 和 Cache，重启时仍能可靠映射到物理地址"
      },
      {
        label: "C",
        text: "它只能在分页机制完全建立后访问"
      },
      {
        label: "D",
        text: "它会自动创建所有页表项"
      }
    ],
    answer: "B",
    explanation: "启动早期不能假设 TLB 和 Cache 已可用。`kseg1` 是不经过 Cache 的直接映射区域，因此适合放置重启入口。",
    tags: [
      "boot",
      "mips",
      "memory"
    ],
    difficulty: "medium"
  },
  {
    id: "boot-sequence-04",
    title: "Cache as RAM",
    question: "U-Boot 早期把一部分 Cache 当作临时 RAM 使用，主要是为了解决什么问题？",
    options: [
      {
        label: "A",
        text: "DDR RAM 尚未配置好，但调用 C 函数需要栈"
      },
      {
        label: "B",
        text: "让所有用户程序都运行在 Cache 中"
      },
      {
        label: "C",
        text: "绕过所有寄存器初始化"
      },
      {
        label: "D",
        text: "把内核永久存放在 Cache 中，避免加载到内存"
      }
    ],
    answer: "A",
    explanation: "早期还不能可靠使用 DDR，但 C 代码需要栈。将部分 Cache 锁定为临时栈空间，可以让启动代码继续执行到内存控制器初始化完成。",
    tags: [
      "boot",
      "mips",
      "uboot"
    ],
    difficulty: "medium"
  },
  {
    id: "boot-sequence-05",
    title: "内核接管控制权",
    question: "Bootloader 把 Linux 内核映像放到内存后，下一步的关键动作是什么？",
    options: [
      {
        label: "A",
        text: "继续替内核调度所有用户进程"
      },
      {
        label: "B",
        text: "跳转到内核入口，让内核开始建立自己的运行环境"
      },
      {
        label: "C",
        text: "删除内核映像并重新执行 BIOS"
      },
      {
        label: "D",
        text: "直接执行 `/bin/login`，绕过内核初始化"
      }
    ],
    answer: "B",
    explanation: "控制权交接是启动链路的核心。Bootloader 准备参数和内核映像后跳到内核入口，随后由内核完成栈、页表、调度器、内存和设备等初始化。",
    tags: [
      "boot",
      "kernel",
      "linux"
    ],
    difficulty: "easy"
  },
  {
    id: "boot-sequence-06",
    title: "传统 x86 启动顺序",
    question: "传统 x86 BIOS/MBR 启动链路中，下面顺序最合理的是哪一项？",
    options: [
      {
        label: "A",
        text: "加电 -> BIOS -> POST -> 找启动设备 -> 读取 MBR -> Bootloader"
      },
      {
        label: "B",
        text: "加电 -> 用户登录 -> BIOS -> MBR -> 内核"
      },
      {
        label: "C",
        text: "加电 -> MBR -> POST -> BIOS -> Bootloader"
      },
      {
        label: "D",
        text: "加电 -> `/sbin/init` -> BIOS -> Bootloader"
      }
    ],
    answer: "A",
    explanation: "传统链路中 CPU 先跳到 BIOS 固定入口，BIOS 做硬件自检并按启动顺序寻找设备，然后读取 MBR，把控制权交给 Bootloader。",
    tags: [
      "boot",
      "x86",
      "bios"
    ],
    difficulty: "easy"
  },
  {
    id: "boot-sequence-07",
    title: "MBR 结构",
    question: "传统 MBR 的 512 字节结构中，下面哪项正确？",
    options: [
      {
        label: "A",
        text: "前 446 字节为启动代码和数据，随后 64 字节为分区表，最后 2 字节为启动签名"
      },
      {
        label: "B",
        text: "全部 512 字节都必须存放文件系统目录项"
      },
      {
        label: "C",
        text: "最后 2 字节固定为 `0x0000` 才能启动"
      },
      {
        label: "D",
        text: "MBR 中可以直接保存任意数量的主分区表项"
      }
    ],
    answer: "A",
    explanation: "MBR 由 446 字节启动代码、4 个 16 字节分区表项和 2 字节 `0x55aa` 启动签名组成，因此传统主分区表项数量受限。",
    tags: [
      "boot",
      "mbr",
      "exam"
    ],
    difficulty: "medium"
  },
  {
    id: "boot-sequence-08",
    title: "GRUB stage1.5",
    question: "GRUB 引入 stage1.5 的主要目的是什么？",
    options: [
      {
        label: "A",
        text: "识别文件系统，使后续阶段能从文件系统读取菜单、内核和 initrd"
      },
      {
        label: "B",
        text: "永久替代 Linux 内核中的调度器"
      },
      {
        label: "C",
        text: "关闭所有磁盘分区功能"
      },
      {
        label: "D",
        text: "在用户登录后重新执行 BIOS"
      }
    ],
    answer: "A",
    explanation: "MBR 中的 stage1 空间很小，通常只负责加载下一阶段。stage1.5 提供文件系统识别能力，stage2 才能加载菜单和内核映像。",
    tags: [
      "boot",
      "grub",
      "mbr"
    ],
    difficulty: "medium"
  },
  {
    id: "boot-program-01",
    title: "程序与进程",
    question: "关于程序和进程，下面哪项最准确？",
    options: [
      {
        label: "A",
        text: "程序是静态代码或文件，进程是程序的一次执行过程"
      },
      {
        label: "B",
        text: "程序和进程完全等价，只是名称不同"
      },
      {
        label: "C",
        text: "一个程序最多只能对应一个进程"
      },
      {
        label: "D",
        text: "进程不需要任何内核管理数据结构"
      }
    ],
    answer: "A",
    explanation: "程序存放在磁盘上，本身是静态对象；进程包含 PCB、地址空间、打开文件、寄存器现场等运行状态，是动态执行实体。",
    tags: [
      "boot",
      "process",
      "exam"
    ],
    difficulty: "easy"
  },
  {
    id: "boot-program-02",
    title: "执行可执行文件",
    question: "用户通过 shell 执行一个可执行文件时，操作系统通常需要做什么？",
    options: [
      {
        label: "A",
        text: "检查可执行文件头部，建立进程地址空间，并设置 CPU 上下文"
      },
      {
        label: "B",
        text: "把源代码逐行解释成自然语言"
      },
      {
        label: "C",
        text: "让程序直接覆盖内核代码段"
      },
      {
        label: "D",
        text: "跳过调度器，使该程序永久独占 CPU"
      }
    ],
    answer: "A",
    explanation: "执行程序时，内核需要识别文件格式，建立地址空间，映射代码和数据，设置入口、栈、参数等上下文，再把进程放入调度体系。",
    tags: [
      "boot",
      "process",
      "kernel"
    ],
    difficulty: "medium"
  },
  {
    id: "boot-program-03",
    title: "缺页异常",
    question: "程序执行第一条指令时发生缺页异常，下面哪种说法一定正确？",
    options: [
      {
        label: "A",
        text: "该程序一定写错了，必须立即终止"
      },
      {
        label: "B",
        text: "内核会检查地址是否合法；若合法，可能调入页面后重试该指令"
      },
      {
        label: "C",
        text: "缺页异常一定不需要进入内核"
      },
      {
        label: "D",
        text: "缺页异常一定由键盘中断引起"
      }
    ],
    answer: "B",
    explanation: "请求分页系统中，合法页面尚未调入时会触发缺页异常。内核处理后可以更新页表并重试指令；非法地址或权限错误才会导致错误结果。",
    tags: [
      "boot",
      "memory",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "boot-program-04",
    title: "printf 输出路径",
    question: '`printf("hello world\\n")` 通常不会直接做哪件事？',
    options: [
      {
        label: "A",
        text: "通过 C 库格式化输出内容"
      },
      {
        label: "B",
        text: "通过系统调用请求内核写标准输出"
      },
      {
        label: "C",
        text: "经由终端、伪终端或窗口系统显示字符"
      },
      {
        label: "D",
        text: "由用户程序直接控制显示器电子束或所有显存硬件细节"
      }
    ],
    answer: "D",
    explanation: "普通用户程序通常通过库函数和系统调用输出数据，内核和设备/终端/窗口系统负责后续路径，而不是让用户程序直接操作全部显示硬件。",
    tags: [
      "boot",
      "syscall",
      "device"
    ],
    difficulty: "easy"
  },
  {
    id: "boot-program-05",
    title: "系统调用与上下文切换",
    question: "关于系统调用和进程上下文切换，下面哪项最准确？",
    options: [
      {
        label: "A",
        text: "每次系统调用都必然切换到另一个进程"
      },
      {
        label: "B",
        text: "系统调用表示从用户态进入内核态处理请求，不必然发生进程上下文切换"
      },
      {
        label: "C",
        text: "进程上下文切换不需要保存任何寄存器状态"
      },
      {
        label: "D",
        text: "系统调用只能由外部设备异步触发"
      }
    ],
    answer: "B",
    explanation: "系统调用是一次受控的 mode switch。它可能在同一进程上下文内完成；进程上下文切换则由调度器切换执行实体，两者不能混为一谈。",
    tags: [
      "boot",
      "syscall",
      "process",
      "tricky"
    ],
    difficulty: "medium"
  },
  {
    id: "boot-program-06",
    title: "程序运行链条",
    question: "下面哪条链路最符合一个普通程序从文件到运行的过程？",
    options: [
      {
        label: "A",
        text: "源代码 -> 编译/链接 -> 可执行文件 -> 内核创建进程 -> 调度执行"
      },
      {
        label: "B",
        text: "源代码 -> BIOS POST -> 用户登录 -> 物理磁头直接执行源代码"
      },
      {
        label: "C",
        text: "可执行文件 -> 删除页表 -> 直接覆盖 Bootloader -> 输出结果"
      },
      {
        label: "D",
        text: "程序运行不需要内核参与，只需要显示器刷新"
      }
    ],
    answer: "A",
    explanation: "普通程序先变成可执行文件，再由内核装入并创建进程，设置地址空间和上下文，最后通过调度获得 CPU 运行。",
    tags: [
      "boot",
      "process",
      "exam"
    ],
    difficulty: "easy"
  }
];
const quizCollections = {
  boot,
  memory,
  process,
  sync
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ProgressDashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const readPages = ref([]);
    const doneQuestions = ref([]);
    const wrongQuestions = ref([]);
    const utilityPageUrls = /* @__PURE__ */ new Set(["/", "/progress", "/knowledge-map", "/exams", "/resources"]);
    const studySections = [
      { label: "OS Boot", prefix: "/OS Boot/" },
      { label: "内存管理", prefix: "/内存管理/" },
      { label: "进程与线程", prefix: "/进程与线程/" }
    ];
    const notePages = computed(() => data.filter((page) => !utilityPageUrls.has(page.url)));
    const readPageKeys = computed(() => new Set(readPages.value.map((page) => page.path.replace(/\/$/, ""))));
    const sortedReadPages = computed(() => [...readPages.value].sort((a, b) => b.readAt - a.readAt));
    const readRate = computed(() => {
      if (!notePages.value.length) return 0;
      const count = notePages.value.filter((page) => readPageKeys.value.has(page.url.replace(/\/$/, ""))).length;
      return Math.round(count / notePages.value.length * 100);
    });
    const nextPage = computed(() => notePages.value.find((page) => !readPageKeys.value.has(page.url.replace(/\/$/, ""))));
    const sectionCoverage = computed(() => studySections.map((section) => {
      const sectionPages = notePages.value.filter((page) => page.url.startsWith(section.prefix));
      const read = sectionPages.filter((page) => readPageKeys.value.has(page.url.replace(/\/$/, ""))).length;
      const total = sectionPages.length;
      return {
        ...section,
        read,
        total,
        rate: total ? Math.round(read / total * 100) : 0
      };
    }).filter((section) => section.total));
    const wrongQuestionViews = computed(() => wrongQuestions.value.map((record) => {
      const bankQuestion = findBankQuestion(record);
      return {
        record,
        title: (bankQuestion == null ? void 0 : bankQuestion.title) || record.title,
        question: record.question || (bankQuestion == null ? void 0 : bankQuestion.question) || record.title,
        options: record.options || (bankQuestion == null ? void 0 : bankQuestion.options) || [],
        explanation: record.explanation || (bankQuestion == null ? void 0 : bankQuestion.explanation) || ""
      };
    }));
    function findBankQuestion(record) {
      const collection = quizCollections[record.collection];
      if (!collection) return void 0;
      const quizIdPrefix = `quiz:${record.collection}:`;
      const questionId = record.id.startsWith(quizIdPrefix) ? record.id.slice(quizIdPrefix.length) : record.id;
      return collection.find((question) => question.id === questionId);
    }
    function isSelectedOption(record, label) {
      return splitLabels(record.selected).includes(label);
    }
    function isAnswerOption(record, label) {
      return splitLabels(record.answer).includes(label);
    }
    function splitLabels(value) {
      return value.split(/[、,，\s]+/).map((item) => item.trim()).filter(Boolean);
    }
    function displayValue(value) {
      return (value == null ? void 0 : value.trim()) || "未作答";
    }
    function refresh() {
      readPages.value = getReadPages();
      doneQuestions.value = getDoneQuestionIds();
      wrongQuestions.value = getWrongQuestions();
    }
    function formatTime(timestamp) {
      return new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(timestamp);
    }
    onMounted(refresh);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "progress" }, _attrs))} data-v-5d4fa764><div class="progress__stats" data-v-5d4fa764><article class="progress__stat" data-v-5d4fa764><span data-v-5d4fa764>已读页面</span><strong data-v-5d4fa764>${ssrInterpolate(readPages.value.length)}</strong></article><article class="progress__stat" data-v-5d4fa764><span data-v-5d4fa764>阅读覆盖</span><strong data-v-5d4fa764>${ssrInterpolate(readRate.value)}%</strong></article><article class="progress__stat" data-v-5d4fa764><span data-v-5d4fa764>已做题目</span><strong data-v-5d4fa764>${ssrInterpolate(doneQuestions.value.length)}</strong></article><article class="progress__stat" data-v-5d4fa764><span data-v-5d4fa764>错题记录</span><strong data-v-5d4fa764>${ssrInterpolate(wrongQuestions.value.length)}</strong></article></div><div class="progress__actions" data-v-5d4fa764><button type="button" data-v-5d4fa764>刷新进度</button><button type="button" class="is-danger" data-v-5d4fa764>清空本地进度</button></div><div class="progress__focus" data-v-5d4fa764><section class="progress__panel progress__panel--focus" data-v-5d4fa764><h2 data-v-5d4fa764>继续学习</h2>`);
      if (nextPage.value) {
        _push(`<a class="progress__continue"${ssrRenderAttr("href", nextPage.value.url)} data-v-5d4fa764><span data-v-5d4fa764>下一篇</span><strong data-v-5d4fa764>${ssrInterpolate(nextPage.value.title)}</strong></a>`);
      } else {
        _push(`<p data-v-5d4fa764>当前笔记页面已经全部阅读过，可以回到错题记录做复盘。</p>`);
      }
      _push(`</section><section class="progress__panel" data-v-5d4fa764><h2 data-v-5d4fa764>章节覆盖</h2><!--[-->`);
      ssrRenderList(sectionCoverage.value, (section) => {
        _push(`<div class="progress__coverage" data-v-5d4fa764><div data-v-5d4fa764><strong data-v-5d4fa764>${ssrInterpolate(section.label)}</strong><span data-v-5d4fa764>${ssrInterpolate(section.read)} / ${ssrInterpolate(section.total)}</span></div><div class="progress__bar" aria-hidden="true" data-v-5d4fa764><span style="${ssrRenderStyle({ width: `${section.rate}%` })}" data-v-5d4fa764></span></div></div>`);
      });
      _push(`<!--]--></section></div><section class="progress__panel" data-v-5d4fa764><h2 data-v-5d4fa764>最近阅读</h2>`);
      if (!readPages.value.length) {
        _push(`<p data-v-5d4fa764>还没有阅读记录。打开任意笔记页面停留片刻后会自动记录。</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(sortedReadPages.value.slice(0, 10), (page) => {
        _push(`<a${ssrRenderAttr("href", page.path)} class="progress__row" data-v-5d4fa764><strong data-v-5d4fa764>${ssrInterpolate(page.title)}</strong><span data-v-5d4fa764>${ssrInterpolate(formatTime(page.readAt))}</span></a>`);
      });
      _push(`<!--]--></section><section class="progress__panel" data-v-5d4fa764><h2 data-v-5d4fa764>错题记录</h2>`);
      if (!wrongQuestions.value.length) {
        _push(`<p data-v-5d4fa764>暂无错题。答错客观题，或把主观题自主判为错误后，会出现在这里。</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(wrongQuestionViews.value, (item) => {
        _push(`<article class="progress__wrong" data-v-5d4fa764><header class="progress__wrong-head" data-v-5d4fa764><strong data-v-5d4fa764>${ssrInterpolate(item.title)}</strong><span data-v-5d4fa764>${ssrInterpolate(formatTime(item.record.at))}</span></header><p class="progress__wrong-question" data-v-5d4fa764>${ssrInterpolate(item.question)}</p>`);
        if (item.options.length) {
          _push(`<div class="progress__wrong-options" data-v-5d4fa764><!--[-->`);
          ssrRenderList(item.options, (option) => {
            _push(`<div class="${ssrRenderClass([{
              "is-answer": isAnswerOption(item.record, option.label),
              "is-selected": isSelectedOption(item.record, option.label)
            }, "progress__wrong-option"])}" data-v-5d4fa764><strong data-v-5d4fa764>${ssrInterpolate(option.label)}</strong><span data-v-5d4fa764>${ssrInterpolate(option.text)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="progress__wrong-answer" data-v-5d4fa764><span data-v-5d4fa764>你的答案：${ssrInterpolate(displayValue(item.record.selected))}</span><span data-v-5d4fa764>标准答案：${ssrInterpolate(displayValue(item.record.answer))}</span></div>`);
        if (item.explanation) {
          _push(`<p class="progress__wrong-explanation" data-v-5d4fa764> 解析：${ssrInterpolate(item.explanation)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></section></section>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../components/ProgressDashboard.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const ProgressDashboard = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-5d4fa764"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Quiz",
  __ssrInlineRender: true,
  props: {
    collection: { default: "memory" },
    questionId: {},
    title: {},
    items: {}
  },
  setup(__props) {
    const props = __props;
    const selected = ref("");
    const checked = ref(false);
    const currentIndex = ref(0);
    const sourceQuestions = computed(() => {
      var _a;
      if ((_a = props.items) == null ? void 0 : _a.length) return props.items;
      return quizCollections[props.collection] || [];
    });
    const questions = computed(() => {
      if (!props.questionId) return sourceQuestions.value;
      return sourceQuestions.value.filter((question) => question.id === props.questionId);
    });
    const current = computed(() => questions.value[currentIndex.value]);
    const isCorrect = computed(() => {
      var _a;
      return checked.value && selected.value === ((_a = current.value) == null ? void 0 : _a.answer);
    });
    const hasNext = computed(() => currentIndex.value < questions.value.length - 1);
    function resetAnswer() {
      selected.value = "";
      checked.value = false;
    }
    watch(() => [props.collection, props.questionId], () => {
      currentIndex.value = 0;
      resetAnswer();
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "quiz study-card" }, _attrs))} data-v-df4b761b><header class="quiz__header" data-v-df4b761b><div data-v-df4b761b><p class="quiz__eyebrow" data-v-df4b761b>Single Choice</p><h3 data-v-df4b761b>${ssrInterpolate(__props.title || ((_a = current.value) == null ? void 0 : _a.title) || "单选题")}</h3></div>`);
      if (questions.value.length > 1) {
        _push(`<span class="quiz__count" data-v-df4b761b>${ssrInterpolate(currentIndex.value + 1)} / ${ssrInterpolate(questions.value.length)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
      if (current.value) {
        _push(`<p class="quiz__question" data-v-df4b761b>${ssrInterpolate(current.value.question)}</p>`);
      } else {
        _push(`<p class="quiz__empty" data-v-df4b761b>当前题库为空，请检查 collection 或 questionId。</p>`);
      }
      if (current.value) {
        _push(`<div class="quiz__options" data-v-df4b761b><!--[-->`);
        ssrRenderList(current.value.options, (option) => {
          _push(`<button class="${ssrRenderClass([{
            "is-selected": selected.value === option.label,
            "is-correct": checked.value && option.label === current.value.answer,
            "is-wrong": checked.value && selected.value === option.label && selected.value !== current.value.answer
          }, "quiz__option"])}" type="button"${ssrRenderAttr("aria-pressed", selected.value === option.label)} data-v-df4b761b><strong data-v-df4b761b>${ssrInterpolate(option.label)}</strong><span data-v-df4b761b>${ssrInterpolate(option.text)}</span></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (current.value) {
        _push(`<footer class="quiz__footer" data-v-df4b761b><button class="quiz__submit" type="button"${ssrIncludeBooleanAttr(!selected.value || checked.value) ? " disabled" : ""} data-v-df4b761b> 提交答案 </button>`);
        if (hasNext.value) {
          _push(`<button class="quiz__next" type="button"${ssrIncludeBooleanAttr(!checked.value) ? " disabled" : ""} data-v-df4b761b> 下一题 </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</footer>`);
      } else {
        _push(`<!---->`);
      }
      if (checked.value && current.value) {
        _push(`<div class="${ssrRenderClass([{ "is-correct": isCorrect.value }, "quiz__result"])}" data-v-df4b761b><strong data-v-df4b761b>${ssrInterpolate(isCorrect.value ? "回答正确" : `回答错误，正确答案是 ${current.value.answer}`)}</strong><p data-v-df4b761b>${ssrInterpolate(current.value.explanation)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../components/Quiz.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Quiz = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-df4b761b"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "QuizSet",
  __ssrInlineRender: true,
  props: {
    collection: { default: "memory" },
    questionIds: {},
    title: { default: "本节练习" },
    description: {},
    initiallyOpen: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const open = ref(props.initiallyOpen);
    const selected = ref("");
    const checked = ref(false);
    const currentIndex = ref(0);
    const questions = computed(() => {
      var _a;
      const source = quizCollections[props.collection] || [];
      if (!((_a = props.questionIds) == null ? void 0 : _a.length)) return source;
      const byId = new Map(source.map((question) => [question.id, question]));
      return props.questionIds.map((id) => byId.get(id)).filter((question) => Boolean(question));
    });
    const current = computed(() => questions.value[currentIndex.value]);
    const hasNext = computed(() => currentIndex.value < questions.value.length - 1);
    const isCorrect = computed(() => {
      var _a;
      return checked.value && selected.value === ((_a = current.value) == null ? void 0 : _a.answer);
    });
    const answeredCount = computed(() => checked.value ? currentIndex.value + 1 : currentIndex.value);
    const completionRate = computed(() => {
      if (!questions.value.length) return 0;
      return Math.round(answeredCount.value / questions.value.length * 100);
    });
    function resetAnswer() {
      selected.value = "";
      checked.value = false;
    }
    watch(() => {
      var _a;
      return [props.collection, (_a = props.questionIds) == null ? void 0 : _a.join("|")];
    }, () => {
      currentIndex.value = 0;
      resetAnswer();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "quiz-set study-card" }, _attrs))} data-v-37ba5783><header class="quiz-set__header" data-v-37ba5783><div data-v-37ba5783><p class="quiz-set__eyebrow" data-v-37ba5783>Practice Set</p><h3 data-v-37ba5783>${ssrInterpolate(__props.title)}</h3>`);
      if (__props.description) {
        _push(`<p class="quiz-set__description" data-v-37ba5783>${ssrInterpolate(__props.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="quiz-set__toggle" type="button"${ssrRenderAttr("aria-expanded", open.value)} data-v-37ba5783>${ssrInterpolate(open.value ? "收起练习" : "开始练习")}</button></header><div class="quiz-set__meta" data-v-37ba5783><span data-v-37ba5783>${ssrInterpolate(answeredCount.value)} / ${ssrInterpolate(questions.value.length)}</span><span data-v-37ba5783>${ssrInterpolate(completionRate.value)}%</span></div><div class="quiz-set__bar" aria-hidden="true" data-v-37ba5783><span style="${ssrRenderStyle({ width: `${completionRate.value}%` })}" data-v-37ba5783></span></div>`);
      if (!questions.value.length) {
        _push(`<p class="quiz-set__empty" data-v-37ba5783>当前题组为空，请检查 collection 或 question-ids。</p>`);
      } else if (open.value) {
        _push(`<div class="quiz-set__body" data-v-37ba5783><p class="quiz-set__count" data-v-37ba5783>第 ${ssrInterpolate(currentIndex.value + 1)} 题，共 ${ssrInterpolate(questions.value.length)} 题</p><p class="quiz-set__question" data-v-37ba5783>${ssrInterpolate(current.value.question)}</p><div class="quiz-set__options" data-v-37ba5783><!--[-->`);
        ssrRenderList(current.value.options, (option) => {
          _push(`<button class="${ssrRenderClass([{
            "is-selected": selected.value === option.label,
            "is-correct": checked.value && option.label === current.value.answer,
            "is-wrong": checked.value && selected.value === option.label && selected.value !== current.value.answer
          }, "quiz-set__option"])}" type="button"${ssrRenderAttr("aria-pressed", selected.value === option.label)} data-v-37ba5783><strong data-v-37ba5783>${ssrInterpolate(option.label)}</strong><span data-v-37ba5783>${ssrInterpolate(option.text)}</span></button>`);
        });
        _push(`<!--]--></div><footer class="quiz-set__footer" data-v-37ba5783><button class="quiz-set__submit" type="button"${ssrIncludeBooleanAttr(!selected.value || checked.value) ? " disabled" : ""} data-v-37ba5783> 提交答案 </button>`);
        if (hasNext.value) {
          _push(`<button class="quiz-set__next" type="button"${ssrIncludeBooleanAttr(!checked.value) ? " disabled" : ""} data-v-37ba5783> 下一题 </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</footer>`);
        if (checked.value) {
          _push(`<div class="${ssrRenderClass([{ "is-correct": isCorrect.value }, "quiz-set__result"])}" data-v-37ba5783><strong data-v-37ba5783>${ssrInterpolate(isCorrect.value ? "回答正确" : `回答错误，正确答案是 ${current.value.answer}`)}</strong><p data-v-37ba5783>${ssrInterpolate(current.value.explanation)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../components/QuizSet.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const QuizSet = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-37ba5783"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Reveal",
  __ssrInlineRender: true,
  props: {
    title: { default: "答案与解析" },
    openText: { default: "展开" },
    closeText: { default: "收起" }
  },
  setup(__props) {
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "reveal" }, _attrs))} data-v-c95a322f><button class="reveal__button" type="button"${ssrRenderAttr("aria-expanded", open.value)} data-v-c95a322f><span data-v-c95a322f>${ssrInterpolate(__props.title)}</span><strong data-v-c95a322f>${ssrInterpolate(open.value ? __props.closeText : __props.openText)}</strong></button>`);
      if (open.value) {
        _push(`<div class="reveal__content" data-v-c95a322f>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../components/Reveal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Reveal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c95a322f"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DocMeta",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter } = useData$1();
    const difficulty = computed(() => frontmatter.value.difficulty);
    const review = computed(() => frontmatter.value.review);
    return (_ctx, _push, _parent, _attrs) => {
      if (difficulty.value || review.value) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "doc-meta" }, _attrs))}>`);
        if (difficulty.value) {
          _push(`<div class="doc-meta__item"><span class="doc-meta__label">Difficulty</span><span>${ssrInterpolate(difficulty.value)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (review.value) {
          _push(`<div class="doc-meta__item"><span class="doc-meta__label">Review</span><span>${ssrInterpolate(review.value)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/components/DocMeta.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProgressClient",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { frontmatter, page } = useData$1();
    let timer;
    function scheduleReadMark() {
      if (typeof window === "undefined") return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const title = frontmatter.value.title || page.value.title || route.path;
        const rawTags = frontmatter.value.tags;
        const tags = Array.isArray(rawTags) ? rawTags : rawTags ? String(rawTags).split(",") : [];
        markPageRead({
          path: route.path,
          title,
          tags: tags.map((tag) => String(tag).trim()).filter(Boolean),
          readAt: Date.now()
        });
      }, 1200);
    }
    onMounted(() => {
      watch(() => route.path, scheduleReadMark, { immediate: true });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        hidden: "",
        "aria-hidden": "true"
      }, _attrs))}></span>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/components/ProgressClient.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const { Layout: Layout2 } = theme;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Layout2), _attrs, {
        "doc-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1),
              createVNode(_sfc_main$2)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/Layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RawTheme = {
  extends: theme,
  Layout: _sfc_main,
  enhanceApp({ app }) {
    app.component("Quiz", Quiz);
    app.component("QuizSet", QuizSet);
    app.component("FillBlank", FillBlank);
    app.component("MultiFillBlank", MultiFillBlank);
    app.component("Reveal", Reveal);
    app.component("CompareCard", CompareCard);
    app.component("AdditionReviewPaper", AdditionReviewPaper);
    app.component("ExamPaper", ExamPaper);
    app.component("ProgressDashboard", ProgressDashboard);
    app.component("Mermaid", Mermaid);
  }
};
const ClientOnly = defineComponent({
  setup(_, { slots }) {
    const show = ref(false);
    onMounted(() => {
      show.value = true;
    });
    return () => show.value && slots.default ? slots.default() : null;
  }
});
function useCodeGroups() {
  if (inBrowser) {
    window.addEventListener("click", (e) => {
      var _a;
      const el = e.target;
      if (el.matches(".vp-code-group input")) {
        const group = (_a = el.parentElement) == null ? void 0 : _a.parentElement;
        if (!group)
          return;
        const i = Array.from(group.querySelectorAll("input")).indexOf(el);
        if (i < 0)
          return;
        const blocks = group.querySelector(".blocks");
        if (!blocks)
          return;
        const current = Array.from(blocks.children).find((child) => child.classList.contains("active"));
        if (!current)
          return;
        const next = blocks.children[i];
        if (!next || current === next)
          return;
        current.classList.remove("active");
        next.classList.add("active");
        const label = group == null ? void 0 : group.querySelector(`label[for="${el.id}"]`);
        label == null ? void 0 : label.scrollIntoView({ block: "nearest" });
      }
    });
  }
}
function useCopyCode() {
  if (inBrowser) {
    const timeoutIdMap = /* @__PURE__ */ new WeakMap();
    window.addEventListener("click", (e) => {
      var _a;
      const el = e.target;
      if (el.matches('div[class*="language-"] > button.copy')) {
        const parent = el.parentElement;
        const sibling = (_a = el.nextElementSibling) == null ? void 0 : _a.nextElementSibling;
        if (!parent || !sibling) {
          return;
        }
        const isShell = /language-(shellscript|shell|bash|sh|zsh)/.test(parent.className);
        const ignoredNodes = [".vp-copy-ignore", ".diff.remove"];
        const clone = sibling.cloneNode(true);
        clone.querySelectorAll(ignoredNodes.join(",")).forEach((node) => node.remove());
        let text = clone.textContent || "";
        if (isShell) {
          text = text.replace(/^ *(\$|>) /gm, "").trim();
        }
        copyToClipboard(text).then(() => {
          el.classList.add("copied");
          clearTimeout(timeoutIdMap.get(el));
          const timeoutId = setTimeout(() => {
            el.classList.remove("copied");
            el.blur();
            timeoutIdMap.delete(el);
          }, 2e3);
          timeoutIdMap.set(el, timeoutId);
        });
      }
    });
  }
}
async function copyToClipboard(text) {
  try {
    return navigator.clipboard.writeText(text);
  } catch {
    const element = document.createElement("textarea");
    const previouslyFocusedElement = document.activeElement;
    element.value = text;
    element.setAttribute("readonly", "");
    element.style.contain = "strict";
    element.style.position = "absolute";
    element.style.left = "-9999px";
    element.style.fontSize = "12pt";
    const selection = document.getSelection();
    const originalRange = selection ? selection.rangeCount > 0 && selection.getRangeAt(0) : null;
    document.body.appendChild(element);
    element.select();
    element.selectionStart = 0;
    element.selectionEnd = text.length;
    document.execCommand("copy");
    document.body.removeChild(element);
    if (originalRange) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }
}
function useUpdateHead(route, siteDataByRouteRef) {
  let isFirstUpdate = true;
  let managedHeadElements = [];
  const updateHeadTags = (newTags) => {
    if (isFirstUpdate) {
      isFirstUpdate = false;
      newTags.forEach((tag) => {
        const headEl = createHeadElement(tag);
        for (const el of document.head.children) {
          if (el.isEqualNode(headEl)) {
            managedHeadElements.push(el);
            return;
          }
        }
      });
      return;
    }
    const newElements = newTags.map(createHeadElement);
    managedHeadElements.forEach((oldEl, oldIndex) => {
      const matchedIndex = newElements.findIndex((newEl) => newEl == null ? void 0 : newEl.isEqualNode(oldEl ?? null));
      if (matchedIndex !== -1) {
        delete newElements[matchedIndex];
      } else {
        oldEl == null ? void 0 : oldEl.remove();
        delete managedHeadElements[oldIndex];
      }
    });
    newElements.forEach((el) => el && document.head.appendChild(el));
    managedHeadElements = [...managedHeadElements, ...newElements].filter(Boolean);
  };
  watchEffect(() => {
    const pageData = route.data;
    const siteData = siteDataByRouteRef.value;
    const pageDescription = pageData && pageData.description;
    const frontmatterHead = pageData && pageData.frontmatter.head || [];
    const title = createTitle(siteData, pageData);
    if (title !== document.title) {
      document.title = title;
    }
    const description = pageDescription || siteData.description;
    let metaDescriptionElement = document.querySelector(`meta[name=description]`);
    if (metaDescriptionElement) {
      if (metaDescriptionElement.getAttribute("content") !== description) {
        metaDescriptionElement.setAttribute("content", description);
      }
    } else {
      createHeadElement(["meta", { name: "description", content: description }]);
    }
    updateHeadTags(mergeHead(siteData.head, filterOutHeadDescription(frontmatterHead)));
  });
}
function createHeadElement([tag, attrs, innerHTML]) {
  const el = document.createElement(tag);
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
  if (innerHTML) {
    el.innerHTML = innerHTML;
  }
  if (tag === "script" && attrs.async == null) {
    el.async = false;
  }
  return el;
}
function isMetaDescription(headConfig) {
  return headConfig[0] === "meta" && headConfig[1] && headConfig[1].name === "description";
}
function filterOutHeadDescription(head) {
  return head.filter((h2) => !isMetaDescription(h2));
}
const hasFetched = /* @__PURE__ */ new Set();
const createLink = () => document.createElement("link");
const viaDOM = (url) => {
  const link2 = createLink();
  link2.rel = `prefetch`;
  link2.href = url;
  document.head.appendChild(link2);
};
const viaXHR = (url) => {
  const req = new XMLHttpRequest();
  req.open("GET", url, req.withCredentials = true);
  req.send();
};
let link;
const doFetch = inBrowser && (link = createLink()) && link.relList && link.relList.supports && link.relList.supports("prefetch") ? viaDOM : viaXHR;
function usePrefetch() {
  if (!inBrowser) {
    return;
  }
  if (!window.IntersectionObserver) {
    return;
  }
  let conn;
  if ((conn = navigator.connection) && (conn.saveData || /2g/.test(conn.effectiveType))) {
    return;
  }
  const rIC = window.requestIdleCallback || setTimeout;
  let observer = null;
  const observeLinks = () => {
    if (observer) {
      observer.disconnect();
    }
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link2 = entry.target;
          observer.unobserve(link2);
          const { pathname } = link2;
          if (!hasFetched.has(pathname)) {
            hasFetched.add(pathname);
            const pageChunkPath = pathToFile(pathname);
            if (pageChunkPath)
              doFetch(pageChunkPath);
          }
        }
      });
    });
    rIC(() => {
      document.querySelectorAll("#app a").forEach((link2) => {
        const { hostname, pathname } = new URL(link2.href instanceof SVGAnimatedString ? link2.href.animVal : link2.href, link2.baseURI);
        const extMatch = pathname.match(/\.\w+$/);
        if (extMatch && extMatch[0] !== ".html") {
          return;
        }
        if (
          // only prefetch same tab navigation, since a new tab will load
          // the lean js chunk instead.
          link2.target !== "_blank" && // only prefetch inbound links
          hostname === location.hostname
        ) {
          if (pathname !== location.pathname) {
            observer.observe(link2);
          } else {
            hasFetched.add(pathname);
          }
        }
      });
    });
  };
  onMounted(observeLinks);
  const route = useRoute();
  watch(() => route.path, observeLinks);
  onUnmounted(() => {
    observer && observer.disconnect();
  });
}
function resolveThemeExtends(theme2) {
  if (theme2.extends) {
    const base = resolveThemeExtends(theme2.extends);
    return {
      ...base,
      ...theme2,
      async enhanceApp(ctx) {
        if (base.enhanceApp)
          await base.enhanceApp(ctx);
        if (theme2.enhanceApp)
          await theme2.enhanceApp(ctx);
      }
    };
  }
  return theme2;
}
const Theme = resolveThemeExtends(RawTheme);
const VitePressApp = defineComponent({
  name: "VitePressApp",
  setup() {
    const { site, lang, dir } = useData$1();
    onMounted(() => {
      watchEffect(() => {
        document.documentElement.lang = lang.value;
        document.documentElement.dir = dir.value;
      });
    });
    if (site.value.router.prefetchLinks) {
      usePrefetch();
    }
    useCopyCode();
    useCodeGroups();
    if (Theme.setup)
      Theme.setup();
    return () => h(Theme.Layout);
  }
});
async function createApp() {
  globalThis.__VITEPRESS__ = true;
  const router = newRouter();
  const app = newApp();
  app.provide(RouterSymbol, router);
  const data2 = initData(router.route);
  app.provide(dataSymbol, data2);
  app.component("Content", Content);
  app.component("ClientOnly", ClientOnly);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: {
      get() {
        return data2.frontmatter.value;
      }
    },
    $params: {
      get() {
        return data2.page.value.params;
      }
    }
  });
  if (Theme.enhanceApp) {
    await Theme.enhanceApp({
      app,
      router,
      siteData: siteDataRef
    });
  }
  return { app, router, data: data2 };
}
function newApp() {
  return createSSRApp(VitePressApp);
}
function newRouter() {
  let isInitialPageLoad = inBrowser;
  return createRouter((path) => {
    let pageFilePath = pathToFile(path);
    let pageModule = null;
    if (pageFilePath) {
      if (isInitialPageLoad) {
        pageFilePath = pageFilePath.replace(/\.js$/, ".lean.js");
      }
      if (false) ;
      else {
        pageModule = import(
          /*@vite-ignore*/
          pageFilePath
        );
      }
    }
    if (inBrowser) {
      isInitialPageLoad = false;
    }
    return pageModule;
  }, Theme.NotFound);
}
if (inBrowser) {
  createApp().then(({ app, router, data: data2 }) => {
    router.go().then(() => {
      useUpdateHead(router.route, data2.site);
      app.mount("#app");
    });
  });
}
async function render(path) {
  const { app, router } = await createApp();
  await router.go(path);
  const ctx = { content: "", vpSocialIcons: /* @__PURE__ */ new Set() };
  ctx.content = await renderToString(app, ctx);
  return ctx;
}
export {
  createSearchTranslate as c,
  render,
  useData as u
};
