// ==UserScript==
// @name         Gog: Auto-redeem codes
// @version      1.0.0
// @description  Automatically redeems Gog codes
// @downloadURL  https://raw.githubusercontent.com/quisido/userscripts/refs/heads/main/automatically-redeem-gog-codes.userscript.js
// @updateURL    https://raw.githubusercontent.com/quisido/userscripts/refs/heads/main/automatically-redeem-gog-codes.userscript.js
// @match        https://www.gog.com/redeem/*
// @author       quisi.do
// @grant        none
// @icon         http://gog.com/favicon.ico
// @namespace    https://quisi.do/
// ==/UserScript==

(function() {
  'use strict';

  let clickedContinue = false;
  const handleContinueButton = () => {
    const continueButton = document.querySelector('button[aria-label="Proceed to the next step"][type="submit"]');
    if (continueButton === null) {
      return;
    }

    clickedContinue = true;
    setTimeout(() => {
      continueButton.click();
    }, 567);
  };

  let clickedRedeem = false;
  const handleRedeemButton = () => {
    const redeemButton = document.querySelector('button[aria-label="Redeem the code"][type="submit"]');
    if (redeemButton === null) {
      return;
    }

    clickedRedeem = true;
    setTimeout(() => {
      redeemButton.click();
    }, 567);
  };

  const handleMutation = () => {
    if (!clickedContinue) {
      handleContinueButton();
    } else if (!clickedRedeem) {
      handleRedeemButton();
    }
  };

  const observer = new MutationObserver(handleMutation);
  observer.observe(document.body, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  });
})();
