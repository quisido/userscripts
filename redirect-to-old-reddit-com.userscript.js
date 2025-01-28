// ==UserScript==
// @name         Reddit: Redirect to old.reddit.com
// @version      1.0.0
// @description  redirects www.reddit.com to old.reddit.com
// @downloadURL  https://raw.githubusercontent.com/quisido/userscripts/refs/heads/main/redirect-to-old-reddit-com.userscript.js
// @updateURL    https://raw.githubusercontent.com/quisido/userscripts/refs/heads/main/redirect-to-old-reddit-com.userscript.js
// @exclude      https://www.reddit.com/media?*
// @icon         http://reddit.com/favicon.ico
// @match        https://www.reddit.com/*
// @author       quisi.do
// @namespace    https://quisi.do/
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  window.location.href = `https://old.reddit.com${window.location.pathname}${window.location.search}${window.location.hash}`;
})();
