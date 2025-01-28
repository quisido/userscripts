// ==UserScript==
// @name         Amazon Prime Gaming: Automatically get in-game content
// @version      1.0.0
// @description  Automatically gets in-game content.
// @downloadURL  https://raw.githubusercontent.com/quisido/userscripts/refs/heads/main/automatically-get-amazon-prime-gaming-in-game-content.userscript.js
// @updateURL    https://raw.githubusercontent.com/quisido/userscripts/refs/heads/main/automatically-get-amazon-prime-gaming-in-game-content.userscript.js
// @icon         https://d2u4zldaqlyj2w.cloudfront.net/022cf383-d2ed-4c6f-bef6-11cff2472b44/favicon.ico
// @match        https://gaming.amazon.com/*
// @match        https://gaming.amazon.com/home
// @author       quisi.do
// @namespace    https://quisi.do/
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const hideOfferSection = id => {
    const section = document.querySelector(`[data-a-target="offer-section-${id}"]`);
    if (section === null) {
      return;
    }

    const container = section.parentNode;
    container.parentNode.removeChild(container);
  };

  const mapToCard = element => {
    if (
      element.nodeName === 'A' ||
      !element.classList.contains('tw-block')
    ) {
      return mapToCard(element.parentNode);
    }
    return element;
  };

  const CARD_LINK_SELECTOR = 'a[data-a-target="learn-more-card"]';
  const getCards = () => {
    return [...document.querySelectorAll(CARD_LINK_SELECTOR)].map(mapToCard);
  };

  const isCollectedCard = card => {
    return (
      card.querySelector('p[title="Collected"]') !== null ||
      card.querySelector('p[title="Install"]') !== null
    );
  };

  const isPlayOnLunaCard = (card) => {
    return (
      card.querySelector('p[title="Play game"]') !== null ||
      card.querySelector('p[title="Play on Luna"]') !== null
    );
  };

  const isUselessCard = (card) => {
    return isCollectedCard(card) || isPlayOnLunaCard(card);
  };

  const getUselessCards = () => {
    return getCards().filter(isUselessCard);
  };

  const hideUselessCards = () => {
    const cards = getUselessCards();
    for (const card of cards) {
      card.style.setProperty('opacity', '25%'); // card.parentNode.removeChild(card);
    }
  };

  const TWITCH_SUB_CREDIT_BANNER_SELECTOR = 'div[data-a-target="SubCreditBannerSectionRootHome"]';
  const hideTwitchSubCreditBanner = () => {
    const banner = document.querySelector(TWITCH_SUB_CREDIT_BANNER_SELECTOR);
    if (banner !== null) {
      banner.parentNode.removeChild(banner);
    }
  };

  const GET_GAME_BUTTON_TEXT = 'Get game';
  const GET_IN_GAME_CONTENT_BUTTON_TEXT = 'Get in-game content';
  const getGetInGameContentButton = () => {
    const buttons = document.getElementsByTagName('button');
    for (const button of buttons) {
      if (
        button.innerText !== GET_GAME_BUTTON_TEXT &&
        button.innerText !== GET_IN_GAME_CONTENT_BUTTON_TEXT
      ) {
        continue;
      }
      return button;
    }
    return null;
  };

  const clickGetInGameContentButton = () => {
    const getInGameContentButton = getGetInGameContentButton();
    if (getInGameContentButton === null) {
      return;
    }
    getInGameContentButton.click();
  };

  // Success, your Tomb Keeper Tiberius Skin will be sent to your game.
  const SUCCESS_TEXT = /^Success, your .+ will be sent to your game\.$/;
  const isSuccess = () => {
    const h1s = document.getElementsByTagName('h1');
    for (const h1 of h1s) {
      if (!SUCCESS_TEXT.test(h1.innerText)) {
        continue;
      }
      return true;
    }
    return false;
  };

  const closeWindow = () => {
    window.location.href = 'javascript:window.close();void(0);';
  };

  const hideSearchBar = () => {
    const bar = document.getElementById('SearchBar');
    if (bar !== null) {
      bar.parentNode.removeChild(bar);
    }
  };

  const hideFeaturedContent = () => {
    const content = document.querySelector('div.featured-content');
    if (content !== null) {
      content.parentNode.removeChild(content);
    }
  };

  const hideAlertBanner = () => {
    const banner = document.querySelector('div[data-a-target="alert-banner-container"]');
    if (banner !== null) {
      banner.parentNode.removeChild(banner);
    }
  };

  const hideEventContainer = () => {
    const container = document.querySelector('div.event-container');
    if (container !== null) {
      container.parentNode.removeChild(container);
    }
  };

  const handleMutation = () => {
    hideAlertBanner();
    hideEventContainer();
    hideFeaturedContent();
    hideOfferSection('LUNA');
    hideOfferSection('WEB_GAMES');
    hideSearchBar();
    hideTwitchSubCreditBanner();
    hideUselessCards();
    clickGetInGameContentButton();
    if (isSuccess()) {
      closeWindow();
    }
  };

  const observer = new MutationObserver(handleMutation);
  observer.observe(document.body, {
    attributes: false,
    characterData: true,
    childList: true,
    subtree: true,
  });
})();
