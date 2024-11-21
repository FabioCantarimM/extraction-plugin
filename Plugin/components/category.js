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
            const checkboxItem = document.createElement('input')

            checkboxItem.type = 'checkbox';
            checkboxItem.id = productId;
            checkboxItem.className = "plugin-checkbox"
            checkboxItem.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                z-index: 100;
            `;

            // Elemento do Gráfico Concorrentes
            const fristLine = document.createElement('div');
            const ficon = document.createElement('i');
            const fdescript = document.createElement('span');
            const infoKeyText = document.createElement('span');
            const infoValueText = document.createElement('span');

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
                    
            ficon.className = 'material-icons';
            ficon.style.fontSize = '15px';
            ficon.style.fontWeight = '800';
            ficon.style.color = 'white';
            ficon.style.backgroundColor = "gray"
            ficon.textContent = "block"

            fdescript.style.marginLeft = "-50%";
            fdescript.innerText = " Amazon";

            infoKeyText.appendChild(ficon);
            infoKeyText.appendChild(fdescript);
            infoKeyText.style.cssText = `
                font-size: 10px;
                font-weight: 800;
                color: black;
                display: contents;
            `;
            infoValueText.innerText = "-"

            infoValueText.style.cssText = `
                font-size: 10px;
                font-weight: 800;
                color: black;
            `;
            
            chrome.runtime.sendMessage({ action: 'fetchCompetitorInfo', productId: productId }, (response) => {
                if (response.error || !response) {
                    infoValueText.innerText = 'NaN';
                } else {
                    const competitorInfo = response;
                    const amazon = competitorInfo["AMAZON"] === "Sem Preço" ? competitorInfo["AMAZON"] : parseFloat(competitorInfo["AMAZON"].replace(',', '.'));

                    const priceTag = item.querySelector('[data-qa="price_final_item"]').innerText;
                    const price = parseFloat(priceTag.replace(/R\$|\s/g, '').replace(',', '.'));

                    // Verificando se os preços podem ser comparados
                    if(amazon != "Sem Preço"){
                        ficon.style.backgroundColor = panvel > price ? "green" : "red";
                        ficon.textContent = panvel > price ? 'trending_up' : "trending_down";
                    }       
                    
                    infoValueText.innerText = amazon === "Sem Preço" ? "Sem Preço" : `R$ ${amazon}`;
                }

                setTimeout(() => console.log(productId), 3000);
            });
            

            // Criação da caixa de mensagem
            const messageBox = document.createElement('div');
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
                                
                            // Adiciona o conteúdo estilizado ao messageBox
                            messageBox.innerHTML = `
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">bar_chart</i>
                                        <span style="width: 80%;padding-top: 3px;">
                                            IC Concorrência
                                        </span>
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${productInfo["IC NOVO RAIA/CONCORRENTE"]}</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">bar_chart</i>
                                        <span style="width: 80%;padding-top: 3px;">
                                            IC Loja
                                        </span>
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${productInfo["IC NOVO SITE/LOJA RAIA"]}</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">attach_money</i>
                                        <span style="width: 80%;padding-top: 3px;">
                                            Preço Loja RD
                                        </span>
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${productInfo["MENOR PREÇO RAIA"]}</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">star</i>
                                        <span style="width: 80%;padding-top: 3px;">
                                            Notabilidade
                                        </span>
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${productInfo["NOTABILIDADE"]}</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">group</i>
                                        <span style="width: 80%;padding-top: 3px;">
                                            Nome Competidor
                                        </span>
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${productInfo["NOME COMPETIDOR RAIA"]}</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">move_to_inbox</i>
                                        <span style="width: 80%;padding-top: 3px;">
                                            MG mínima
                                        </span>
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${productInfo["MG MÍN RAIA"]}</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">radar</i>
                                        <span style="width: 80%;padding-top: 3px;">
                                            Posicionamento
                                        </span>
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${productInfo["POSICIONAMENTO RAIA"]}</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">image</i>
                                        <span style="width: 80%;padding-top: 3px;">
                                            Banner
                                        </span>
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${productInfo["BANNER"]}</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">face</i>
                                        <span style="width: 80%;padding-top: 3px;">
                                            Tratativas
                                        </span>
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${productInfo["TRATATIVAS RAIA"]}</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">report</i>
                                        <span style="width: 80%;padding-top: 3px;">
                                            LB%
                                        </span>
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${productInfo["LB % NOVO RAIA"]}</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">price_change</i>
                                        <span style="width: 80%;padding-top: 3px;">
                                            RBV 30 dias
                                        </span>
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${productInfo["RBV L1M"]}</span>
                                </div>
                                <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                        <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">price_change</i>
                                        <span style="width: 80%;padding-top: 3px;">
                                            RBV L1M Pnd.
                                        </span>
                                    </span>
                                    <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${productInfo["RBV L1M POND"]}</span>
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
            item.appendChild(checkboxItem)
            item.appendChild(document.createElement('br'));
            item.appendChild(document.createElement('br'));
            item.appendChild(document.createElement('br'));
            item.appendChild(document.createElement('br'));
            item.appendChild(document.createElement('hr'));
            fristLine.appendChild(infoKeyText);
            fristLine.appendChild(infoValueText);
            additionalInfo.appendChild(fristLine);
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
            
            const categoryId = document.querySelector('#__next > main > div:nth-child(4) > div > div > div:nth-child(1) > h1').innerHTML
            const button = document.createElement('button')

            chrome.runtime.sendMessage({ action: 'fetchCategoryInfo', productId: categoryId }, (response) => {
                const categoryInfo = response;
                const rbv = categoryInfo.total_rbv_l1m || 'NaN';
                const icc = categoryInfo.total_ic_novo_raia_concorrente || 'NaN';
                const icl = categoryInfo.total_ic_novo_site_loja_raia || 'NaN';

                contentDiv.innerHTML = `
                    <div style="width:13.28%; height:100px; padding: 15px;border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">loyalty</i><br><span style="font-size: 9px; color: gray;">Produtos</span><br><br><span style="font-size: 10px;font-weight: 800;">${totalProducts || '8422'}</span></div>
                    <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">bar_chart</i><br><span style="font-size: 9px; color: gray;">IC Concorrente</span><br><br><span style="font-size: 10px;font-weight: 800;">${icc}</span></div>
                    <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">IC vs Loja</span><br><br><span style="font-size: 10px;font-weight: 800;">${icl}</span></div>
                    <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">RBV 30 dias</span><br><br><span style="font-size: 10px;font-weight: 800;">${rbv}</span></div>
                    <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">pageview</i><br><span style="font-size: 9px; color: gray;">Volume de visitas</span><br><br><span style="font-size: 10px;font-weight: 800;">${'Integrar'}</span></div>
                    <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">trending_up</i><br><span style="font-size: 9px; color: gray;">Taxa de conversão</span><br><br><span style="font-size: 10px;font-weight: 800;">${'Integrar'}</span></div>
                `;
                
                contentDiv.innerHTML += `
                    <div style="width:7%;">
                        <button 
                            id="botaoEditar" 
                            style="height:100px; padding: 15px; margin-left:10px; border-radius: 10px; background-color: #FFF; border: 1px solid rgb(204, 204, 204); box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px; color: rgb(51, 51, 51); align-self: center; display: block; text-align: center; overflow-wrap: break-word;" 
                            onmouseover="this.style.backgroundColor='rgb(0,97,114)'; this.style.color='white';" 
                            onmouseout="this.style.backgroundColor='white'; this.style.color='black';" 
                            onclick="const editContent = document.querySelector('#editContent'); if (editContent) { editContent.style.display = editContent.style.display === 'none' ? 'block' : 'none'; } else { console.error('Div com id \\'editContent\\' não encontrada!'); }">
                            <i class="material-icons" style="font-size: 25px !important; font-weight: 800 !important;">edit</i>
                            <br><br>
                            <span style="font-size: 10px;font-weight: 800;">Editar Valores</span>
                        </button>
                    </div>
                `;
            })

            const buttonScript = document.createElement('script')
            buttonScript.type = 'text/javascript'

            buttonScript.innerHTML = `function toggleEditContent() {
                const editContent = document.querySelector('#editContent'); // Certifique-se de que a div com id "editContent" existe
                if (editContent) {
                    editContent.style.display = editContent.style.display === 'none' ? 'block' : 'none';
                } else {
                    console.error('Div com id "editContent" não encontrada!');
                }
            }`

            const editContent = document.createElement('div');
            editContent.id = 'editContent'
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
            editText.innerText = 'selecione aqui';
            editText.id = 'infoTextPlugin'
            editText.style.cssText = `
                padding-left: 15px;
                padding-right: 35px;
                width: 20%;
            `
            
            editToogle.type = 'checkbox';

            editToogle.addEventListener('change', () => {
                editButton.disabled = !editToogle.checked;
                const checkboxList = document.querySelectorAll(".plugin-checkbox")
                checkboxList.forEach(item => {
                    item.checked = editToogle.checked;
                });
               const infoTextPlugin = document.querySelector("#infoTextPlugin")
                if (editToogle.checked) {
                    infoTextPlugin.innerText = `${checkboxList.length} itens selecionados`
                } else {
                    infoTextPlugin.innerText = `Não há itens selecionados`
                }
            })

            editButton.addEventListener('click', ()=>{
                updateInterface()
            })

            editContent.appendChild(editToogle);
            editContent.appendChild(editText);
            editContent.appendChild(editButton);

            // Localizar a Div do H1
            const headerContent = document.querySelector('.OneColumnstyles__ColumnStyles-sc-1w8z7r2-0.dULZUW.rd-col-16');
            headerContent.appendChild(editContent);

            // contentDiv.appendChild(button);
            // Insere a nova div dentro do container ao lado do h1
            containerDiv.appendChild(contentDiv);
        } else {
            console.log("Elemento h1 não encontrado.");
        }
    }, 5000)
}


function updateInterface() {
    const updateInterfaceDiv = document.createElement('div');
    updateInterfaceDiv.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 70%;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    updateInterfaceDiv.innerText = 'OI';
    updateInterfaceDiv.id = "Aqui-Plugin";

    // Cria o botão de fechar
    const closeButton = document.createElement('button');
    const icon = document.createElement('i');

    // Adiciona a classe do Material Icons
    icon.className = 'material-icons';

    // Define o texto do ícone
    icon.textContent = 'close';

    // Estilos do botão
    closeButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: transparent;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
    `;

    // Adiciona o ícone ao botão
    closeButton.appendChild(icon);

    // Adiciona evento de clique para fechar a interface
    closeButton.addEventListener("click", () => {
        updateInterfaceDiv.style.display = "none";
    });

    // Adiciona o botão ao div
    updateInterfaceDiv.appendChild(closeButton);

    // Verifica se o elemento já existe para evitar duplicações
    const existingDiv = document.getElementById("Aqui-Plugin");
    if (!existingDiv) {
        // Adiciona o elemento ao body
        document.body.appendChild(updateInterfaceDiv);
    } else {
        existingDiv.style.display = "flex";
    }
}

