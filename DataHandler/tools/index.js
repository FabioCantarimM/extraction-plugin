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
