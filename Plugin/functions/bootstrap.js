// Monitorar mudanças na URL usando MutationObserver
let lastUrl = window.location.href;

const urlObserver = new MutationObserver(() => {
  if (window.location.href !== lastUrl) {
    lastUrl = window.location.href;
    history.go();
    checkUrlAndExecute();
  }
});

async function checkUrlAndExecute() {
  const currentUrl = new URL(lastUrl);

  insertGoogleMaterial();

  const searchH1Element = document.querySelector(
    '[data-qa="seo-search_title-h1validator"]'
  );
  // é pagina de search
  if (searchH1Element) {
    const [key, value] = currentUrl.search.split("=");
    if (!value?.length || value.length < 3)
      // regra do próprio site
      return console.log("invalid search terms");

    await handleSearchPage();
    return;
  }

  const productSku = getProductSkuElement();
  if (productSku) {
    await handleProductPage();
    return;
  }

  const category = document.querySelector(
    '[class*="Titlestyles__TitleStyles-sc-"]'
  );
  if (category) {
    await handleCategoryPage();
    return;
  }
}
