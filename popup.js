const LINK_ICON = {
  admin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  themes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
  metaobjects: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  content: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  products: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  themeEditor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
};

function buildAdminUrl(domain, path) {
  return `https://${domain}/admin/${path}`;
}

function createLink(label, url, iconKey) {
  const a = document.createElement("a");
  a.className = "menu-item";
  a.href = url;
  a.target = "_blank";
  a.innerHTML = `${LINK_ICON[iconKey]}<span>${label}</span>`;
  a.addEventListener("click", () => window.close());
  return a;
}

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.url) return;

  const url = new URL(tab.url);
  const domain = url.hostname;

  // Get status from content script
  let status = null;
  try {
    status = await chrome.tabs.sendMessage(tab.id, { action: "getStatus" });
  } catch {}

  const isShopify = status?.hasBar || status?.themeName || domain.endsWith(".myshopify.com");

  if (!isShopify) {
    document.getElementById("content").style.display = "none";
    document.getElementById("no-store").style.display = "block";
    return;
  }

  // Toggle button
  const toggleItem = document.getElementById("toggle-item");
  const barStatus = document.getElementById("bar-status");
  const iconVisible = document.getElementById("toggle-icon-visible");
  const iconHidden = document.getElementById("toggle-icon-hidden");

  function updateToggleUI(hidden) {
    barStatus.textContent = hidden ? "hidden" : "visible";
    iconVisible.style.display = hidden ? "none" : "";
    iconHidden.style.display = hidden ? "" : "none";
  }

  if (status?.hasBar) {
    updateToggleUI(status.hidden);
  } else {
    barStatus.textContent = "no bar";
    toggleItem.style.opacity = "0.5";
    toggleItem.style.pointerEvents = "none";
  }

  toggleItem.addEventListener("click", async () => {
    try {
      const res = await chrome.tabs.sendMessage(tab.id, { action: "toggle" });
      if (res) updateToggleUI(res.hidden);
    } catch {}
  });

  // Build quicklinks
  const linksContainer = document.getElementById("links");
  const links = [
    { label: "Admin", path: "", icon: "admin" },
    { label: "Themes", path: "themes", icon: "themes" },
    { label: "Theme Editor", path: `themes/${status?.themeId || ""}`, icon: "themeEditor", needsThemeId: true },
    { label: "Content", path: "content", icon: "content" },
    { label: "Metaobjects", path: "content/metaobjects", icon: "metaobjects" },
    { label: "Products", path: "products", icon: "products" },
  ];

  for (const link of links) {
    if (link.needsThemeId && !status?.themeId) continue;
    const adminUrl = buildAdminUrl(domain, link.path);
    linksContainer.appendChild(createLink(link.label, adminUrl, link.icon));
  }
}

init();
