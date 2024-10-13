function getElementByXPath(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


const currentUrl = window.location.href;

if (currentUrl.includes("/search?")){
    hasFetchedSearchResults = true; 
    // Lógica para a página de busca
    setTimeout(() => {
        const searchElements = document.querySelectorAll('#__next > main > div:nth-child(4) > div > div.TwoColumnsstyles__SecondColumnStyles-sc-1lryd20-1.hEcJif.rd-col-13 > div.ProductGridstyles__ProductGridStyles-sc-1wbcxrt-0.jkDOLa > div');
        searchElements.forEach((item) => {
            const productId = item.getAttribute('data-item-id'); // Pega o valor da propriedade data-item-id
    
            const messageBox = document.createElement('div');
            messageBox.innerText = `Conteúdo adicional: ${productId}`;
            messageBox.style.marginTop = '20px';
            messageBox.style.padding = '10px';
            messageBox.style.border = '2px solid #4CAF50';
            messageBox.style.backgroundColor = '#f9f9f9';
            messageBox.style.fontSize = '16px';
            messageBox.id = 0
            item.appendChild(messageBox); // Insere a nova caixa dentro do item encontrado
        });
    }, 10000);
}else {

    // XPath do elemento que você deseja capturar
    const xpath = '//*[@id="__next"]/main/div[8]/div/div/div[1]/span[2]/div';

    // Procura o elemento pelo XPath
    const element = getElementByXPath(xpath);

    if (element) {
        // Captura o conteúdo do elemento encontrado
        const contentText = element.textContent.trim();
        console.log('Conteúdo encontrado:', contentText); // Log para ver o conteúdo encontrado

        // Envia uma mensagem para o background script com o conteúdo encontrado
        chrome.runtime.sendMessage({ action: 'fetchProductInfo', productId: contentText }, (response) => {
            if (response.error) {
                console.error('Erro ao buscar informações do produto:', response.error);
            } else {
                console.log('Resposta recebida do background:', response); // Log para ver a resposta

                const productInfo = response; // Assumindo que a resposta tem uma propriedade `productInfo`
                const productName = productInfo.name || 'Nome não disponível'; // Use um valor padrão se não houver nome
                const productPrice = productInfo.total_vendas || 'Preço não disponível'; // Use um valor padrão se não houver preço

                // Procura a seção de informações do produto com o XPath fornecido
                const productInfoSection = getElementByXPath('//*[@id="__next"]/main/div[2]');

                if (productInfoSection) {
                    // Cria uma nova caixa <div> para exibir o conteúdo
                    const messageBox = document.createElement('div');
                    messageBox.innerHTML = `Nome do Produto: ${productName};<br>Total de Vendas: ${productPrice}<br>Crescimento D30: ${productInfo.crescimento};<br>SKU: ${productInfo.sku};<br>EAN: ${productInfo.ean};<br>Dump Banco: ${JSON.stringify(response)}`;
                    messageBox.style.marginTop = '20px';
                    messageBox.style.padding = '10px';
                    messageBox.style.border = '2px solid #4CAF50';
                    messageBox.style.backgroundColor = '#f9f9f9';
                    messageBox.style.fontSize = '16px';

                    // Insere a nova caixa abaixo da seção de informações do produto
                    productInfoSection.appendChild(messageBox);
                } else {
                    console.log('Seção de informações do produto não encontrada.');
                }
            }
        });
    } else {
        console.log('Elemento não encontrado pelo XPath fornecido.');
    }
}
isInitializing = false; // Reseta a flag ao terminar a inicialização
