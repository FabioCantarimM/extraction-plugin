function getElementByXPath(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function checkUrlAndExecute() {
    const currentUrl = window.location.href;

    if (currentUrl.includes("/search?")) {
        handleSearchPage();
    } else {
        handleProductPage();
    }
}


function extractDomainFromUrl(text) {
    // Expressão regular para validar e capturar a URL
    const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)(\.[a-zA-Z]{2,})?/;

    const match = text.match(urlPattern);

    if (match) {
        // Retorna apenas o domínio sem o TLD
        return match[3]; // Retorna apenas o domínio
    }

    return null; // Retorna null se não for uma URL válida
}