/**
 * @typedef {({ic:string,lprice:string,panvel:string,rbv:string})} ProductInfo
 */
/**
 * @typedef {({soma_rbv_l1m:string,media_ic_atual_site_loja_raia:string})} CategoryInfo
 */

/**
 * Insert google fonts if not present
 */
function insertGoogleMaterial() {
  if (!document.querySelector("link[href*='fonts.googleapis.com/icon']")) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    link.fetchPriority = "low";
    document.head.appendChild(link);
  }
}

/**
 *
 * @param {string} xpath
 * @returns
 */
function getElementByXPath(xpath) {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

/**
 * Formats a value to pt-BR currency format
 *
 * @param {any} value
 * @returns {string} the formatted value with R$ or "Sem Preço" if value can't be casted to number
 */
function formatCurrency(value) {
  return !Number.isNaN(+value)
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(+value)
    : "Sem Preço";
}

/**
 * Converts a currency string (e.g., "R$ 18,99") to a number (e.g., 18.99).
 *
 * @param {string | null | undefined} priceString - The price string to be converted.
 * @returns {number} - The formatted price as a number.
 *
 * @example
 * formatPrice("R$ 18,99"); // Returns 18.99
 */
function extractPrice(priceString) {
  return !priceString
    ? 0
    : +priceString.replace(/[^\d,]/g, "").replace(",", ".");
}

const apiActions = {
  fetchProductInfo: 1,
  fetchCompetitorInfo: 1,
  fetchCategoryInfo: 1,
};

/**
 *
 * @param {keyof typeof apiActions} action
 * @param {string|null|undefined} productId
 * @returns {Promise<any | Error>}
 */
async function apiCall(action, productId) {
  if (!productId) return Promise.reject(new Error("Invalid productId"));
  return new Promise((resolve) =>
    // @ts-ignore
    chrome.runtime.sendMessage({ action, productId }, resolve)
  );
}
