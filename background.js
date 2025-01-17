"use strict";

/* global chrome, URL */

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.get(["blocked", "enabled", "count"], function (local) {
    if (!Array.isArray(local.blocked)) {
      chrome.storage.local.set({ blocked: [] });
    }

    if (typeof local.enabled !== "boolean") {
      chrome.storage.local.set({ enabled: false });
    }

    if (typeof local.count !== "number") {
      chrome.storage.local.set({ count: 0 });
    }
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  const url = changeInfo.pendingUrl || changeInfo.url;
  if (!url || !url.startsWith("http")) {
    return;
  }

  const hostname = new URL(url).hostname;

  chrome.storage.local.get(["blocked", "enabled", "count"], function (local) {
    let { blocked, enabled, count } = local;
    if (
      Array.isArray(blocked) &&
      enabled &&
      blocked.find((domain) => hostname.includes(domain))
    ) {
      chrome.tabs.remove(tabId);
      chrome.storage.local.set({ count: count + 1 });
    }
  });
});
