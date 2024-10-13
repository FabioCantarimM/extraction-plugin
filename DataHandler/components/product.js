function handleProductPage() {
    // XPath do elemento que você deseja capturar
    const xpath = '//*[@id="__next"]/main/div[8]/div/div/div[1]/span[2]/div';

    // Procura o elemento pelo XPath
    const element = getElementByXPath(xpath);

    if (element) {
        const contentText = element.textContent.trim();
        console.log('Conteúdo encontrado:', contentText);

        chrome.runtime.sendMessage({ action: 'fetchProductInfo', productId: contentText }, (response) => {
            if (response.error) {
                console.error('Erro ao buscar informações do produto:', response.error);
            } else {
                console.log('Resposta recebida do background:', response);

                const productInfo = response;
                const productName = productInfo.name || 'Nome não disponível';
                const productPrice = productInfo.total_vendas || 'Preço não disponível';

                const productInfoSection = getElementByXPath('//*[@id="__next"]/main/div[2]');

                if (productInfoSection) {
                    const messageBox = document.createElement('div');
                    messageBox.innerHTML = `Nome do Produto: ${productName};<br>Total de Vendas: ${productPrice}<br>Crescimento D30: ${productInfo.crescimento};<br>SKU: ${productInfo.sku};<br>EAN: ${productInfo.ean};<br>Dump Banco: ${JSON.stringify(response)}`;
                    messageBox.style.marginTop = '20px';
                    messageBox.style.padding = '10px';
                    messageBox.style.border = '2px solid #4CAF50';
                    messageBox.style.backgroundColor = '#f9f9f9';
                    messageBox.style.fontSize = '16px';

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