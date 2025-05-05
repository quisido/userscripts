// ==UserScript==
// @name         DoorDash: Hide stores
// @version      1.0.0
// @description  Hides stores from Doordash results
// @downloadURL  https://raw.githubusercontent.com/quisido/userscripts/refs/heads/main/hide-doordash-stores.userscript.js
// @updateURL    https://raw.githubusercontent.com/quisido/userscripts/refs/heads/main/hide-doordash-stores.userscript.js
// @icon         http://doordash.com/favicon.ico
// @match        https://www.doordash.com/home
// @author       quisi.do
// @namespace    https://quisi.do/
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const BLOCKED_STORES = new Set([
    '7-Eleven',
    '7-Eleven Beer, Wine & Spirits',
    'Albertsons Beer, Wine & Spirits',
    'Chick-fil-A',
    'Jack in the Box',
    'McDonald\'s',
    'Papa Johns Pizza (US)',
    'Pizza Hut',
    'Starbucks',
    'Subway',
    'Taco Bell',
  ]);

  const PARENT_SELECTORS = [
    '[data-testid="card.store"]',
    '[data-testid="SquareCard"]',
  ];

  const STORE_SELECTORS = [
    'span[data-telemetry-id="legoFacetCardSquare.title"]',
    'span[data-telemetry-id="store.name"]',
  ];

  const hideStore = storeElement => {
    alert(storeElement.innerText);
  };

  const NONE = 0;
  const addHideButton = storeElement => {
    if (storeElement.getElementsByTagName('button').length > NONE) {
      return;
    }

    const handleButtonClick = event => {
      event.stopPropagation();
      hideStore(storeElement);
    };

    const hideButton = document.createElement('button');
    hideButton.appendChild(document.createTextNode('hide'));
    hideButton.style.setProperty('color', '#ff0000');
    hideButton.style.setProperty('font-family', 'monospace');
    hideButton.style.setProperty('font-size', '8px');
    hideButton.style.setProperty('text-transform', 'uppercase');
    hideButton.addEventListener('click', handleButtonClick, true);
    storeElement.appendChild(hideButton);
  };

  const hideParentElement = (childElement, selector) => {
    if (!childElement.matches(selector)) {
      const parentElement = childElement.parentElement;
      if (parentElement === null) {
        throw new Error('Could not find parent');
      }

      hideParentElement(childElement.parentElement, selector);
      return;
    }

    const parentNode = childElement.parentNode;
    if (parentNode === null) {
      throw new Error('Could not find parent node');
    }

    parentNode.removeChild(childElement);
  };

  const parentSelectors = PARENT_SELECTORS.join(', ');
  const hideStoreElement = storeElement => {
    try {
      hideParentElement(storeElement, parentSelectors);
    } catch (err) {
      console.warn(err, storeElement);
    }
  };

  const storeSelectors = STORE_SELECTORS.join(', ');
  const handleMutation = () => {
    const storeElements = document.querySelectorAll(storeSelectors);
    for (const storeElement of storeElements) {
      const innerText = storeElement.innerText;
      if (!BLOCKED_STORES.has(innerText)) {
        addHideButton(storeElement);
        continue;
      }

      hideStoreElement(storeElement);
      console.log(`Hid ${innerText}`);
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
