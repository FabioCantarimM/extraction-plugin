//Dupliquei essa função porque não consigo chamar o search passando parametros, por isso foi necessário refazer a função aqui.
function handleProductCategoryPage() {
    setTimeout(() => {
        const searchElements = document.querySelectorAll('#__next > main > div:nth-child(5) > div > div.TwoColumnsstyles__SecondColumnStyles-sc-46q9v-1.hcbctD.rd-col-13 > div.ProductGridstyles__ProductGridStyles-sc-1wbcxrt-0.jkDOLa > div');
    
        searchElements.forEach((item) => {
            const productId = item.getAttribute('data-item-id');

            // Criação do Comparador de Preço
            const additionalInfo = document.createElement('div');
            const fristLine = document.createElement('div');
            fristLine.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 8px;
                height: 30px;
            `;
            const infoImage = document.createElement('img');
            infoImage.src = 'https://scontent.fcgh11-1.fna.fbcdn.net/v/t39.30808-1/453164228_909535137884186_3994319304934725751_n.jpg?stp=dst-jpg_s480x480&_nc_cat=1&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=r6aaL40dg9wQ7kNvgHG5Aaq&_nc_ht=scontent.fcgh11-1.fna&_nc_gid=ASjO8e5F5yhi5uIu6upW2OP&oh=00_AYB9aO58tSDXVK6vrn5fbA03OS_Z86piiANbkcXLlrW9Uw&oe=6721AA67'; // Substitua pelo URL da imagem desejada
            infoImage.alt = 'Imagem';
            infoImage.style.cssText = `
                width: 100%;
                height: auto;
                object-fit: contain;
                max-width: 25px;
                max-height: 25px;
            `;

            const infoText = document.createElement('span');
            infoText.innerText = 'Melhor oferta'; // Substitua pelo texto desejado
            infoText.style.cssText = `
                font-size: 10px;
                font-weight: 800;
                color: black;
            `;
            // Second Line
            const secondLine = document.createElement('div');
            secondLine.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 8px;
                height: 30px;
            `;
            const infoImage2 = document.createElement('img');
            infoImage2.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mvcIXBjxID5xLlR8YiY8aZaLivG_CdyFyw&s'; // Substitua pelo URL da imagem desejada
            infoImage2.alt = 'Imagem';
            infoImage2.style.cssText = `
                width: 100%;
                height: auto;
                object-fit: contain;
                max-width: 25px;
                max-height: 25px;
            `;

            const infoText2 = document.createElement('span');
            infoText2.innerText = 'Melhor frete'; // Substitua pelo texto desejado
            infoText2.style.cssText = `
                font-size: 10px;
                font-weight: 800;
                color: black;
            `;
            // Third Line
            const thirdLine = document.createElement('div');
            thirdLine.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 8px;
                height: 30px;
            `;
            const infoImage3 = document.createElement('img');
            infoImage3.src = 'https://scontent.fcgh11-1.fna.fbcdn.net/v/t39.30808-1/384575182_742854527881039_1046787814209401339_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=m53Gn4F38-MQ7kNvgHp-TzL&_nc_ht=scontent.fcgh11-1.fna&_nc_gid=Aa-pKnGDW3fJUegLPw0sxhv&oh=00_AYB4zXQoTFH_30VrWJyC-9FE6UG0Djh9J8uAxTo2wDQUHA&oe=6721F40F'; // Substitua pelo URL da imagem desejada
            infoImage3.alt = 'Imagem';
            infoImage3.style.cssText = `
                width: 100%;
                height: auto;
                object-fit: contain;
                max-width: 25px;
                max-height: 25px;
            `;

            const infoText3 = document.createElement('span');
            infoText3.innerText = 'Melhor Forma de Pagamento'; // Substitua pelo texto desejado
            infoText3.style.cssText = `
                font-size: 10px;
                font-weight: 800;
                color: black;
            `;
            

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
            item.appendChild(document.createElement('hr'));
            fristLine.appendChild(infoImage);
            fristLine.appendChild(infoText);
            additionalInfo.appendChild(fristLine);
            secondLine.appendChild(infoImage2);
            secondLine.appendChild(infoText2);
            additionalInfo.appendChild(secondLine);
            thirdLine.appendChild(infoImage3);
            thirdLine.appendChild(infoText3);
            additionalInfo.appendChild(thirdLine);
            item.appendChild(additionalInfo);
            item.appendChild(messageBox);
            item.appendChild(document.createElement('br'));
            divButton.appendChild(toggleButton)
            item.appendChild(divButton);
        });
    }, 5000);
}

function handleCategoryPage(categories) {
    setTimeout(() => {
        // Seleciona o h1 com o seletor fornecido
        const h1Element = document.querySelector('#__next > main > div:nth-child(4) > div > div.OneColumnstyles__ColumnStyles-sc-1w8z7r2-0.dULZUW.rd-col-16 > h1');
        
        if (h1Element) {
            // Cria o container para o h1 e a nova div ficarem lado a lado
            const containerDiv = document.createElement('div');
            containerDiv.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: space-between;
            `;
            
            // Movendo o h1 para dentro do novo container
            h1Element.parentNode.insertBefore(containerDiv, h1Element);
            containerDiv.appendChild(h1Element);
            
            // Cria a nova div que ficará ao lado do h1
            const contentDiv = document.createElement('div');
            contentDiv.style.cssText = `
            margin-top: 10px;
            padding: 15px;
            border-radius: 10px;
            background-color: #d3d3d361;
            border: 1px solid #ccc;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            font-size: 14px;
            color: #333;
            display: none;
            width: 65%;
            align-self: center;
            display: flex;
            justify-content: center;
        `;

        categoryPath = categories.join("-");
            
            contentDiv.innerHTML = `
                <div style="width:14%; height:100px; padding: 15px;border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><img src="https://cdn-icons-png.flaticon.com/128/8296/8296673.png" style="width: 20px;"><br><span style="font-size: 9px; color: gray;">Produtos</span><br><br><span style="font-size: 12px;font-weight: 800;">${categories[0] || 'N/D'}</span></div>
                <div style="width:14%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><img src="https://cdn-icons-png.flaticon.com/128/87/87112.png" style="width: 20px;"><br><span style="font-size: 9px; color: gray;">IC</span><br><br><span style="font-size: 12px;font-weight: 800;">${categories[1] || 'N/D'}</span></div>
                <div style="width:14%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><img src="https://cdn-icons-png.flaticon.com/128/1194/1194711.png" style="width: 20px;"><br><span style="font-size: 9px; color: gray;">Vendas Hoje</span><br><br><span style="font-size: 12px;font-weight: 800;">${categories[2] || 'N/D'}</span></div>
                <div style="width:14%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><img src="https://cdn-icons-png.flaticon.com/128/1194/1194711.png" style="width: 20px;"><br><span style="font-size: 9px; color: gray;">Vendas S-1</span><br><br><span style="font-size: 12px;font-weight: 800;">${categories[3] || 'N/D'}</span></div>
                <div style="width:14%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><img src="https://cdn-icons-png.flaticon.com/128/1194/1194711.png" style="width: 20px;"><br><span style="font-size: 9px; color: gray;">Vendas mês</span><br><br><span style="font-size: 12px;font-weight: 800;">${categories[4] || 'N/D'}</span></div>
                <div style="width:14%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><img src="https://cdn-icons-png.flaticon.com/128/520/520647.png" style="width: 20px;"><br><span style="font-size: 9px; color: gray;">Volume de visitas</span><br><br><span style="font-size: 12px;font-weight: 800;">${categories[5] || 'N/D'}</span></div>
                <div style="width:14%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><img src="https://cdn-icons-png.flaticon.com/128/9053/9053198.png" style="width: 20px;"><br><span style="font-size: 9px; color: gray;">Taxa de conversão</span><br><br><span style="font-size: 12px;font-weight: 800;">${categories[6] || 'N/D'}</span></div>
            `;

            // Insere a nova div dentro do container ao lado do h1
            containerDiv.appendChild(contentDiv);
        } else {
            console.log("Elemento h1 não encontrado.");
        }
        handleProductCategoryPage();
    }, 5000)
}