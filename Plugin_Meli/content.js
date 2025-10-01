debugger;
console.log("rodando");
// Executa na carga inicial da página
checkUrlAndExecute();

// Monitorar mudanças na URL usando History API
let lastUrl = window.location.href;

// Substituímos os métodos pushState e replaceState para monitorar mudanças programáticas
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function (...args) {
    originalPushState.apply(this, args);
    onUrlChange();
};

history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    onUrlChange();
};

// Detecta mudanças manuais no histórico ou alterações da URL
window.addEventListener('popstate', onUrlChange);

window.addEventListener("popstate", function (event) {
    location.reload();
});


function onUrlChange() {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        checkUrlAndExecute();
    }
}

function checkUrlPeriodically() {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        console.log(`URl alterou ${currentUrl}, ${lastUrl}`)
        window.location.reload();
    }

}

// Configura um timer para verificar a URL a cada 1 segundo
setInterval(checkUrlPeriodically, 1000);