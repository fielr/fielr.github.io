// ==UserScript==
// @name WCE local loader
// @namespace https://www.bondageprojects.com/
// @version 1.2
// @description Wholesome Club Extensions (WCE) - enhancements for the bondage club - fork of FBC 5.8
// @author Sidious, Stella
// @supportURL https://github.com/KittenApps/WCE
// @match http://localhost:*/*
// @icon https://wce-docs.vercel.app/img/logo.png
// @grant none
// @run-at document-end
// ==/UserScript==

var preloadLink = document.createElement("link");
preloadLink.href = "https://fielr.github.io/scripts/wce//wce.js";
preloadLink.rel = "modulepreload";
document.head.appendChild(preloadLink);

var dexiePreloadLink = document.createElement("link");
dexiePreloadLink.href = "https://fielr.github.io/scripts/wce//dexie.js";
dexiePreloadLink.rel = "modulepreload";
document.head.appendChild(dexiePreloadLink);

var fusam = JSON.parse(localStorage.getItem("fusam.settings") || "{}");
fusam.enabledDistributions ??= {};
delete fusam.enabledDistributions.WCE;
delete fusam.enabledDistributions.FBC;
localStorage.setItem("fusam.settings", JSON.stringify(fusam));

if (typeof FUSAM === "object" && FUSAM?.present) {
  import("https://fielr.github.io/scripts/wce//wce.js");
} else {
  let storeFUSAM;
  Object.defineProperty(window, "FUSAM", {
    set(n) {
      storeFUSAM = n;
      import("https://fielr.github.io/scripts/wce//wce.js");
    },
    get() {
      return storeFUSAM;
    },
  });
}