function checkUrlAndExecute() {
    const currentUrl = window.location.href;
    const cleanUrl = extractPathFromUrl(currentUrl);

    // Verifica se cleanUrl é nulo ou vazio
    if (!cleanUrl) {
        console.log("URL sem caminho, apenas o domínio.");
        return;
    }

    // Caso contenha "search"
    if (cleanUrl.includes("loja/vanish")) {
        handleSearchPage();
    } else{
        handleProductPage();
    }
}
