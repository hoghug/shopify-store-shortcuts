// ── Item definitions ──────────────────────────────────────────────
const ITEMS = {
  toggle: {
    label: "Toggle Preview Bar",
    type: "action",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    iconAlt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
  },
  admin: {
    label: "Admin",
    type: "link",
    path: "",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  },
  themes: {
    label: "Themes",
    type: "link",
    path: "themes",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
  },
  themeEditor: {
    label: "Current Theme Editor",
    type: "link",
    pathFn: (status, _pagePath) => `themes/${status?.themeId || ""}/editor`,
    needsThemeId: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  },
  content: {
    label: "Content",
    type: "link",
    path: "content",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  },
  metaobjects: {
    label: "Metaobjects",
    type: "link",
    path: "content/metaobjects",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  },
  products: {
    label: "Products",
    type: "link",
    path: "products",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  },
  copyThemeId: {
    label: "Copy Theme ID",
    type: "action",
    needsThemeId: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  },
  editCurrentPage: {
    label: "Edit This Page",
    type: "link",
    needsThemeId: true,
    pathFn: (status, pagePath) => `themes/${status?.themeId || ""}/editor?previewPath=${encodeURIComponent(pagePath || "/")}`,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  },
};

const DEFAULT_ORDER = ["toggle", "copyThemeId", "editCurrentPage", "admin", "themes", "themeEditor", "content", "metaobjects", "products"];

const ARROW_UP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`;
const ARROW_DN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

// ── Config helpers ───────────────────────────────────────────────
function getDefaultConfig() {
  return DEFAULT_ORDER.map((id) => ({ id, visible: true }));
}

async function loadConfig() {
  const { menuConfig } = await chrome.storage.sync.get("menuConfig");
  if (!menuConfig) return getDefaultConfig();
  // Merge: keep saved order/visibility, append any new items not yet in config
  const savedIds = new Set(menuConfig.map((i) => i.id));
  const merged = menuConfig.filter((i) => ITEMS[i.id]); // remove stale
  for (const id of DEFAULT_ORDER) {
    if (!savedIds.has(id)) merged.push({ id, visible: true });
  }
  return merged;
}

function saveConfig(config) {
  chrome.storage.sync.set({ menuConfig: config });
}

// ── Menu rendering ───────────────────────────────────────────────
function buildAdminUrl(domain, path) {
  return `https://${domain}/admin/${path}`;
}

function renderMenu(config, domain, status, pagePath) {
  const container = document.getElementById("menu-items");
  container.innerHTML = "";

  // Theme info header
  if (status?.themeName) {
    const info = document.createElement("div");
    info.className = "theme-info";
    let text = status.themeName;
    if (status.themeRole) text += ` (${status.themeRole})`;
    if (status.themeId) text += ` #${status.themeId}`;
    info.textContent = text;
    container.appendChild(info);
  }

  let addedDivider = false;

  for (const entry of config) {
    if (!entry.visible) continue;
    const item = ITEMS[entry.id];
    if (!item) continue;
    if (item.needsThemeId && !status?.themeId) continue;

    if (item.type === "action" && entry.id === "toggle") {
      container.appendChild(renderToggleItem(status));
      continue;
    }

    if (item.type === "action" && entry.id === "copyThemeId") {
      container.appendChild(renderCopyThemeIdItem(status));
      continue;
    }

    // Add divider + header before first link
    if (item.type === "link" && !addedDivider) {
      const div = document.createElement("div");
      div.className = "divider";
      container.appendChild(div);
      const hdr = document.createElement("div");
      hdr.className = "header";
      hdr.textContent = "Quick Links";
      container.appendChild(hdr);
      addedDivider = true;
    }

    if (item.type === "link") {
      const path = item.pathFn ? item.pathFn(status, pagePath) : item.path;
      const url = buildAdminUrl(domain, path);
      const a = document.createElement("a");
      a.className = "menu-item";
      a.href = url;
      a.target = "_blank";
      a.innerHTML = `${item.icon}<span>${item.label}</span>`;
      a.addEventListener("click", () => window.close());
      container.appendChild(a);
    }
  }
}

function renderToggleItem(status) {
  const btn = document.createElement("button");
  btn.className = "menu-item";
  btn.id = "toggle-item";

  const item = ITEMS.toggle;
  const hidden = status?.hidden;

  btn.innerHTML = `
    <span class="toggle-icon">${hidden ? item.iconAlt : item.icon}</span>
    <span>Toggle Preview Bar</span>
    <span class="status">${!status?.hasBar ? "no bar" : hidden ? "hidden" : "visible"}</span>
  `;

  if (!status?.hasBar) {
    btn.style.opacity = "0.5";
    btn.style.pointerEvents = "none";
  } else {
    let currentHidden = hidden;
    btn.addEventListener("click", async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const res = await chrome.tabs.sendMessage(tab.id, { action: "toggle" });
        if (res) {
          currentHidden = res.hidden;
          btn.querySelector(".toggle-icon").innerHTML = currentHidden ? item.iconAlt : item.icon;
          btn.querySelector(".status").textContent = currentHidden ? "hidden" : "visible";
        }
      } catch {}
    });
  }

  return btn;
}

function renderCopyThemeIdItem(status) {
  const btn = document.createElement("button");
  btn.className = "menu-item";
  const item = ITEMS.copyThemeId;

  btn.innerHTML = `${item.icon}<span>${item.label}</span><span class="status">#${status.themeId}</span>`;

  btn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(String(status.themeId));
    btn.querySelector("span:last-child").textContent = "Copied!";
    setTimeout(() => {
      btn.querySelector("span:last-child").textContent = `#${status.themeId}`;
    }, 1000);
  });

  return btn;
}

// ── Settings rendering ───────────────────────────────────────────
function renderSettings(config) {
  const list = document.getElementById("settings-list");
  list.innerHTML = "";

  config.forEach((entry, i) => {
    const item = ITEMS[entry.id];
    if (!item) return;

    const row = document.createElement("div");
    row.className = "settings-item";

    // Reorder arrows
    const arrows = document.createElement("div");
    arrows.className = "reorder-btns";

    const upBtn = document.createElement("button");
    upBtn.className = "reorder-btn";
    upBtn.innerHTML = ARROW_UP;
    upBtn.disabled = i === 0;
    upBtn.addEventListener("click", () => {
      [config[i - 1], config[i]] = [config[i], config[i - 1]];
      saveConfig(config);
      renderSettings(config);
    });

    const dnBtn = document.createElement("button");
    dnBtn.className = "reorder-btn";
    dnBtn.innerHTML = ARROW_DN;
    dnBtn.disabled = i === config.length - 1;
    dnBtn.addEventListener("click", () => {
      [config[i], config[i + 1]] = [config[i + 1], config[i]];
      saveConfig(config);
      renderSettings(config);
    });

    arrows.appendChild(upBtn);
    arrows.appendChild(dnBtn);

    // Label
    const label = document.createElement("span");
    label.className = "item-label";
    label.textContent = item.label;

    // Toggle switch
    const toggle = document.createElement("label");
    toggle.className = "toggle-switch";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = entry.visible;
    input.addEventListener("change", () => {
      entry.visible = input.checked;
      saveConfig(config);
    });
    const slider = document.createElement("span");
    slider.className = "toggle-slider";
    toggle.appendChild(input);
    toggle.appendChild(slider);

    row.appendChild(arrows);
    row.appendChild(label);
    row.appendChild(toggle);
    list.appendChild(row);
  });
}

// ── Init ─────────────────────────────────────────────────────────
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
    document.getElementById("settings").style.display = "none";
    document.getElementById("no-store").style.display = "block";
    return;
  }

  const config = await loadConfig();
  const pagePath = url.pathname;

  // Render menu
  renderMenu(config, domain, status, pagePath);

  // Settings toggle
  const contentEl = document.getElementById("content");
  const settingsEl = document.getElementById("settings");

  document.getElementById("open-settings").addEventListener("click", () => {
    contentEl.style.display = "none";
    settingsEl.style.display = "block";
    renderSettings(config);
  });

  document.getElementById("close-settings").addEventListener("click", () => {
    settingsEl.style.display = "none";
    contentEl.style.display = "block";
    renderMenu(config, domain, status, pagePath);
  });
}

init();
