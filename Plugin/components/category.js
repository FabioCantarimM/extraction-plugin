//Dupliquei essa função porque não consigo chamar o search passando parametros, por isso foi necessário refazer a função aqui.
function handleProductCategoryPage() {
    setTimeout(() => {
        const searchElements = document.querySelectorAll('#__next > main > div:nth-child(5) > div > div.TwoColumnsstyles__SecondColumnStyles-sc-46q9v-1.hcbctD.rd-col-13 > div.ProductGridstyles__ProductGridStyles-sc-1wbcxrt-0.jkDOLa > div');
        // Cria o elemento <link>
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';

        // Adiciona o link ao <head> do documento
        document.head.appendChild(link);

        searchElements.forEach((item) => {
            const productId = item.getAttribute('data-item-id');

            // Criação do Comparador de Preço
            const additionalInfo = document.createElement('div');

            // Primeiro Elemento do Gráfico
            const fristLine = document.createElement('div');
            fristLine.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 8px;
                height: 25px;
                background-color: #a2a2a23b;
                border-radius: 5px;
                padding-right: 5px;
                padding-left: 5px;
            `;
            const ficon = document.createElement('i');
            ficon.className = 'material-icons';
            ficon.textContent = 'trending_up';
            ficon.style.fontSize = '15px';
            ficon.style.fontWeight = '800';
            ficon.style.color = 'white';
            ficon.style.backgroundColor = 'green';

            const fdescript = document.createElement('span');
            fdescript.style.marginLeft = "-50%";
            fdescript.innerText = " Panvel";

            const infoKeyText = document.createElement('span');
            infoKeyText.appendChild(ficon);
            infoKeyText.appendChild(fdescript);
            infoKeyText.style.cssText = `
                font-size: 10px;
                font-weight: 800;
                color: black;
                display: contents;
            `;

            const infoValueText = document.createElement('span');
            infoValueText.innerText = 'R$ 63,00';
            infoValueText.style.cssText = `
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
                height: 25px;
                background-color: #a2a2a23b;
                border-radius: 5px;
                padding-right: 5px;
                padding-left: 5px;
            `;
            const sicon = document.createElement('i');
            sicon.className = 'material-icons';
            sicon.textContent = 'trending_down';
            sicon.style.fontSize = '15px';
            sicon.style.fontWeight = '800';
            sicon.style.color = 'white';
            sicon.style.backgroundColor = 'red';

            const sdescript = document.createElement('span');
            sdescript.style.marginLeft = "-37%";
            sdescript.innerText = " Pague Menos";

            const sinfoKeyText = document.createElement('span');
            sinfoKeyText.appendChild(sicon);
            sinfoKeyText.appendChild(sdescript);
            sinfoKeyText.style.cssText = `
                font-size: 10px;
                font-weight: 800;
                color: black;
                display: contents;
            `;

            const sinfoValueText = document.createElement('span');
            sinfoValueText.innerText = 'R$ 63,00';
            sinfoValueText.style.cssText = `
                font-size: 10px;
                font-weight: 800;
                color: black;
            `;  

            // Criação da caixa de mensagem
            const messageBox = document.createElement('div');
            // border-radius: 10px;
            // border: 1px solid #ccc;
            // box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            messageBox.style.cssText = `
                margin-top: 10px;
                padding: 15px;
                background-color: #fff;
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
                padding-bottom: 10px;
            `;

            const toggleButton = document.createElement('button');
            toggleButton.innerText = '+';
            // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra leve */
            toggleButton.style.cssText = `
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: transparent; /* Fundo transparente */
                color: black; /* Cor do texto */
                font-size: 15px; /* Tamanho do texto */
                font-weight: bold; /* Negrito para o símbolo */
                border: 1px solid black; /* Borda preta */
                align-items: center;
                cursor: pointer; /* Muda o cursor para indicar interatividade */
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
                    toggleButton.innerText = "";

                    const icon = document.createElement('i');

                    // Adiciona a classe do Material Icons
                    icon.className = 'material-icons';

                    // Define o texto do ícone
                    icon.textContent = 'close';

                    // Adiciona estilos diretamente
                    icon.style.fontSize = '15px';
                    icon.style.fontWeight = '800';

                    toggleButton.appendChild(icon);

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
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;margin-right: -65px;">bar_chart</i>
                                        IC
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">98%</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;margin-right: -20px;">attach_money</i>
                                        Vendas Hoje
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">R$ 217,20</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;margin-right: -25px;">attach_money</i>
                                        Vendas S-1
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">R$ 1.520,40</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;margin-right: -20px;">attach_money</i>
                                        Vendas mês
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">R$ 6.081,60</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;margin-right: 2px;">pageview</i>
                                        Volume de Visitas
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">14.983.214</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;margin-right: 7px;">trending_up</i>
                                        Taxa de Conversão
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">4,3%</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
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
            fristLine.appendChild(infoKeyText);
            fristLine.appendChild(infoValueText);
            secondLine.appendChild(sinfoKeyText);
            secondLine.appendChild(sinfoValueText);
            additionalInfo.appendChild(fristLine);
            additionalInfo.appendChild(secondLine);
            item.appendChild(additionalInfo);
            item.appendChild(messageBox);
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
            width: 75%;
            align-self: center;
            display: flex;
            justify-content: center;
        `;

        categoryPath = categories.join("-");
        elementProducts = document.querySelectorAll('#__next > main > div:nth-child(4) > div > div > div.CategoryToolbarstyles__CategoryToolbarStyles-sc-103ck0t-0.lkBZUC > div.Found__FoundStyles-sc-62hzma-0.bjMYbQ > p')[0].innerText
        totalProducts = elementProducts.split(" ")[0]
        

            contentDiv.innerHTML = `
                <div style="width:13.28%; height:100px; padding: 15px;border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">loyalty</i><br><span style="font-size: 9px; color: gray;">Produtos</span><br><br><span style="font-size: 10px;font-weight: 800;">${totalProducts || '8422'}</span></div>
                <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">bar_chart</i><br><span style="font-size: 9px; color: gray;">IC</span><br><br><span style="font-size: 10px;font-weight: 800;">${'98%'}</span></div>
                <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas Hoje</span><br><br><span style="font-size: 10px;font-weight: 800;">${'R$ 253.421,29'}</span></div>
                <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas S-1</span><br><br><span style="font-size: 10px;font-weight: 800;">${'R$ 1.774.020,40'}</span></div>
                <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas mês</span><br><br><span style="font-size: 10px;font-weight: 800;">${'R$ 7.096.081,60'}</span></div>
                <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">pageview</i><br><span style="font-size: 9px; color: gray;">Volume de visitas</span><br><br><span style="font-size: 10px;font-weight: 800;">${'14.983.214'}</span></div>
                <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">trending_up</i><br><span style="font-size: 9px; color: gray;">Taxa de conversão</span><br><br><span style="font-size: 10px;font-weight: 800;">${'2,9%'}</span></div>
            `;

            const button = document.createElement('button')
            button.style.cssText = `
                width:7%;
                height:100px;
                padding: 15px;
                margin-left:10px;
                border-radius: 10px;
                background-color: #FFF;
                border: 1px solid rgb(204, 204, 204);
                box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;
                color: rgb(51, 51, 51);
                align-self: center;
                display: block;
                text-align: center;
                overflow-wrap: break-word;
            `;
            button.innerHTML = `
                <i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">edit</i>
                <br><br>
                <span style="font-size: 10px;font-weight: 800;">Editar Valores</span>
            `;

            button.addEventListener('mouseover', () => {
                button.style.backgroundColor = 'rgb(0,97,114)'; /* Fundo preto ao passar o mouse */
                button.style.color = 'white'; /* Texto preto */
            });
            
            button.addEventListener('mouseout', () => {
                button.style.backgroundColor = 'white'; /* Retorna ao fundo transparente */
                button.style.color = 'black'; /* Retorna ao texto preto */
            });

            const editContent = document.createElement('div');
            
            editContent.style.cssText = `
                text-align: right;
                background-color: #d3d3d361;
                height: 50px;
                padding: 15px 15px 0px 15px;
                display: none;
            `;

            editButton = document.createElement('button');
            editToogle = document.createElement('input');
            editText = document.createElement('span');

            editButton.innerText = 'Edite em massa';
            editButton.disabled = true
            editText.innerText = 'selecione aqui         ';
            
            editToogle.type = 'checkbox';

            editToogle.addEventListener('change', () => {
                editButton.disabled = !editToogle.checked;
            })

            editContent.appendChild(editToogle);
            editContent.appendChild(editText);
            editContent.appendChild(editButton);

            // Localizar a Div do H1
            const headerContent = document.querySelector('.OneColumnstyles__ColumnStyles-sc-1w8z7r2-0.dULZUW.rd-col-16');
            headerContent.appendChild(editContent);

            button.addEventListener('click', () => {
                if(editContent.style.display === 'none'){
                    editContent.style.display = 'block'
                }
                else {
                    editContent.style.display = 'none';
                }
            })

            contentDiv.appendChild(button);
            // Insere a nova div dentro do container ao lado do h1
            containerDiv.appendChild(contentDiv);
        } else {
            console.log("Elemento h1 não encontrado.");
        }
    }, 5000)
}