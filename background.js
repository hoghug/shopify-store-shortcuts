// Update tooltip when a tab is activated or updated
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  updateTooltipForTab(tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    updateTooltipForTab(tabId);
  }
});

async function updateTooltipForTab(tabId) {
  try {
    const response = await chrome.tabs.sendMessage(tabId, { action: "getStatus" });
    if (!response) return;
    if (response.themeName) {
      let title = response.themeName;
      if (response.themeRole) title += ` (${response.themeRole})`;
      chrome.action.setTitle({ tabId, title });
    }
  } catch {}
}
