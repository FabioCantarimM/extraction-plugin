function handleSearchPage() {
    setTimeout(() => {
        const searchElements = document.querySelectorAll('#__next > main > div:nth-child(4) > div > div.TwoColumnsstyles__SecondColumnStyles-sc-1lryd20-1.hEcJif.rd-col-13 > div.ProductGridstyles__ProductGridStyles-sc-1wbcxrt-0.jkDOLa > div');
        
        searchElements.forEach((item) => {
            const productId = item.getAttribute('data-item-id'); // Pega o valor da propriedade data-item-id
    
            // Cria uma caixa de mensagem
            const messageBox = document.createElement('div');
            messageBox.innerText = `Conteúdo adicional: ${productId}`;
            messageBox.style.marginTop = '20px';
            messageBox.style.padding = '10px';
            messageBox.style.border = '2px solid #4CAF50';
            messageBox.style.backgroundColor = '#f9f9f9';
            messageBox.style.fontSize = '16px';
            messageBox.style.overflow = 'overlay';
            messageBox.style.display = 'none'; // Inicialmente escondido

            // Cria um botão de toggle
            const toggleButton = document.createElement('button');
            toggleButton.innerText = 'Mais informações';
            toggleButton.style.marginTop = '10px';
            toggleButton.style.cursor = 'pointer';

            // Adiciona o evento de clique ao botão para exibir/ocultar o conteúdo
            toggleButton.addEventListener('click', () => {
                if (messageBox.style.display === 'none') {
                    messageBox.style.display = 'block';
                    toggleButton.innerText = 'Menos informações';
                    chrome.runtime.sendMessage({ action: 'fetchProductInfo', productId: productId }, (response) => {
                        if (response.error) {
                            console.error('Erro ao buscar informações do produto:', response.error);
                        } else {
                            const productInfo = response;
                            const productName = productInfo.name || 'Nome não disponível';
                            const productPrice = productInfo.total_vendas || 'Preço não disponível';
                            messageBox.innerText = ""
                            messageBox.innerHTML = `Nome do Produto: ${productName};<br>Total de Vendas: ${productPrice}<br>Crescimento D30: ${productInfo.crescimento};<br>SKU: ${productInfo.sku};<br>EAN: ${productInfo.ean};<br>Dump Banco: ${JSON.stringify(response)}`;
                        }
                    })
                } else {
                    messageBox.style.display = 'none';
                    toggleButton.innerText = 'Mais informações';
                }
            });
            
            item.appendChild(document.createElement('br'));
            item.appendChild(document.createElement('br'));
            item.appendChild(document.createElement('br'));
            item.appendChild(document.createElement('br'));
            // Adiciona o botão e a caixa de mensagem ao item
            item.appendChild(toggleButton);
            item.appendChild(messageBox);
        });
    }, 10000);
}