function handleSearchPage() {
    setTimeout(() => {
        const searchElements = document.querySelectorAll('#__next > main > div:nth-child(4) > div > div.TwoColumnsstyles__SecondColumnStyles-sc-1lryd20-1.hEcJif.rd-col-13 > div.ProductGridstyles__ProductGridStyles-sc-1wbcxrt-0.jkDOLa > div');

        searchElements.forEach((item) => {
            const productId = item.getAttribute('data-item-id');

            // Criação da caixa de mensagem
            const messageBox = document.createElement('div');
            messageBox.style.cssText = `
                margin-top: 10px;
                padding: 15px;
                border-radius: 10px;
                background-color: #fff;
                border: 1px solid #ccc;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                font-size: 14px;
                color: #333;
                display: none;
                width: 95%;
                align-self: center;
            `;

            // Criação do botão de alternância
            const divButton = document.createElement('div');
            divButton.style.cssText = `
                width: 100%;
                text-align: center;
                pagging-top: 10px;
                padding-bottom: 10px;
            `;

            const toggleButton = document.createElement('button');
            toggleButton.innerText = '+';
            toggleButton.style.cssText = `
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: transparent; /* Fundo transparente */
                color: black; /* Cor do texto */
                font-size: 18px; /* Tamanho do texto */
                font-weight: bold; /* Negrito para o símbolo */
                border: 1px solid black; /* Borda preta */
                align-items: center;
                cursor: pointer; /* Muda o cursor para indicar interatividade */
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra leve */
                transition: background-color 0.3s ease, color 0.3s ease; /* Transição suave para mudanças de cor */
            `;

            toggleButton.addEventListener('mouseover', () => {
                toggleButton.style.backgroundColor = 'black'; /* Fundo preto ao passar o mouse */
                toggleButton.style.color = 'white'; /* Texto preto */
            });
            
            toggleButton.addEventListener('mouseout', () => {
                toggleButton.style.backgroundColor = 'white'; /* Retorna ao fundo transparente */
                toggleButton.style.color = 'black'; /* Retorna ao texto preto */
            });

            toggleButton.addEventListener('click', () => {
                if (messageBox.style.display === 'none') {
                    messageBox.style.display = 'block';
                    toggleButton.innerText = '-';

                    chrome.runtime.sendMessage({ action: 'fetchProductInfo', productId: productId }, (response) => {
                        if (response.error) {
                            messageBox.innerHTML = `Produto não cadastrado`;
                        } else {
                            const productInfo = response;

                            const productSKU = productInfo.sku_monitorado || 'SKU não disponível';
                            const productWebsite = productInfo.website_monitorado || 'Informação Não Encontrada';
                            const website = extractDomainFromUrl(productWebsite)
                            const productData = productInfo.calendario || 'Informação Não Encontrada';
                            const productHora = productInfo.hora || 'Informação Não Encontrada';
            
                            // Convertendo os valores de preço para decimal com duas casas
                            const precoNormal = productInfo.preco_normal ? parseFloat(productInfo.preco_normal).toFixed(2) : 'Preço Normal não disponível';
                            const precoOferta = productInfo.preco_oferta ? parseFloat(productInfo.preco_oferta).toFixed(2) : 'Preço Oferta não disponível';
                            const precoDe = productInfo.preco_de ? parseFloat(productInfo.preco_de).toFixed(2) : 'Preço De não disponível';
                            const precoUnidadePacote = productInfo.preco_unidade_pacote ? parseFloat(productInfo.preco_unidade_pacote).toFixed(2) : 'Preço por Unidade do Pacote não disponível';
                            const precoLaboratorio = productInfo.preco_laboratorio ? parseFloat(productInfo.preco_laboratorio).toFixed(2) : 'Preço Laboratório não disponível';
            
                            const infPacotes = productInfo.inf_pacotes || 'Informação de Pacotes não disponível';
                            const validade = productInfo.validade || 'Validade não disponível';
                            const disponibilidade = productInfo.disponibilidade || 'Disponibilidade não disponível';
                            const vendidoPor = productInfo.vendido_por || 'Informação de Vendedor não disponível';
                            const vendidoPorRanking = productInfo.vendido_por_ranking || 'Ranking de Vendas não disponível';
                                
                            // Adiciona o conteúdo estilizado ao messageBox
                            messageBox.innerHTML = `
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 12px; width: 40%;">SKU</span><span style="text-align:end;width: 50%;font-size: 12px; font-weight: 800;">${productSKU}</span>
                                </div>
                                <hr />
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 12px; width: 40%;">Website</span><span style="text-align:end; width: 50%;font-size: 12px; font-weight: 800; overflow-wrap: break-word;"><a href='${productWebsite}' target="_blank" style="color: red;">${website}</a></span>
                                </div>
                                <hr />
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 12px; width: 40%;">Data Monitoramento</span><span style="text-align:end; width: 50%;font-size: 12px; font-weight: 800;">${productData}</span>
                                </div>
                                <hr />
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 12px; width: 40%;">Hora Monitoramento</span><span style="text-align:end; width: 50%;font-size: 12px; font-weight: 800;">${productHora}</span>
                                </div>
                                <hr />
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 12px; width: 40%;">Preço Normal</span><span style="text-align:end; width: 50%;font-size: 12px; font-weight: 800;">${precoNormal}</span>
                                </div>
                                <hr />
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 12px; width: 40%;">Preço Oferta</span><span style="text-align:end; width: 50%;font-size: 12px; font-weight: 800;">${precoOferta}</span>
                                </div>
                                <hr />
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 12px; width: 40%;">Preco de</span><span style="text-align:end; width: 50%;font-size: 12px; font-weight: 800;">${precoDe}</span>
                                </div>
                                <hr />
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 12px; width: 40%;">Preco Unid. Pacote</span><span style="text-align:end; width: 50%;font-size: 12px; font-weight: 800;">${precoUnidadePacote}</span>
                                </div>
                                <hr />
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 12px; width: 40%;">Preco Laboratório</span><span style="text-align:end; width: 50%;font-size: 12px; font-weight: 800;">${precoLaboratorio}</span>
                                </div>
                                <hr />
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 12px; width: 40%;">Informações do Pacote</span><span style="text-align:end; width: 50%;font-size: 12px; font-weight: 800;">${infPacotes}</span>
                                </div>
                                <hr />
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 12px; width: 40%;">Validade</span><span style="text-align:end; width: 50%;font-size: 12px; font-weight: 800;">${validade}</span>
                                </div>
                                <hr />
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 12px; width: 40%;">Disponibilidade</span><span style="text-align:end; width: 50%;font-size: 12px; font-weight: 800;">${disponibilidade}</span>
                                </div>
                                <hr />
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 12px; width: 40%;">Vendido Por</span><span style="text-align:end; width: 50%;font-size: 12px; font-weight: 800;">${vendidoPor}</span>
                                </div>
                                <hr />
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 12px; width: 40%;">Vendido por Ranking</span><span style="text-align:end; width: 50%;font-size: 12px; font-weight: 800;">${vendidoPorRanking}</span>
                                </div>
                            `;
                        }
                    });
                } else {
                    messageBox.style.display = 'none';
                    toggleButton.innerText = '+';
                }
            });

            // Inserir os novos elementos no item de produto
            item.appendChild(document.createElement('br'));
            item.appendChild(document.createElement('br'));
            item.appendChild(document.createElement('br'));
            item.appendChild(document.createElement('br'));
            item.appendChild(messageBox);
            item.appendChild(document.createElement('br'));
            divButton.appendChild(toggleButton)
            item.appendChild(divButton);
        });
    }, 5000);
}
