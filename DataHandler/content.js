// Executa na carga inicial da página
checkUrlAndExecute();

// Monitorar mudanças de URL através da API do History
let lastUrl = window.location.href;
new MutationObserver(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        checkUrlAndExecute();  // Executa o código novamente quando a URL mudar
    }
}).observe(document, { subtree: true, childList: true });
