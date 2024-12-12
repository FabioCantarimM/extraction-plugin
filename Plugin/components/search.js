function handleSearchPage() {
    setTimeout(async () => {
        insertGoogleMaterial()
        handleHeaderSearchPage()
        await handleSearchProductsCompetidor()
        handleSearchProducts()
        expandButtonSearchPage()
    }, 3000);
}

function insertGoogleMaterial(){
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';

    // Adiciona o link ao <head> do documento
    document.head.appendChild(link);
}

function expandButtonSearchPage() {
    // Seletor para a área onde o botão será adicionado
    const areaEx = document.querySelector('.sc-877a5d6-12.fIhOaa');
    const existExButton = document.querySelector('#exButton');

    if (!existExButton && areaEx) {  // Verifique se o areaEx foi encontrado
        const exButton = document.createElement('div');
        exButton.style.textAlign = "right";
        exButton.innerHTML = '<button id="exButton" style="background-color: rgb(255, 255, 255); color: rgb(241, 166, 88); padding: 5px 15px; font-size: 12px; text-transform: uppercase; border: 1px solid rgb(241, 166, 88); border-radius: 5px; display: inline-block;">Expandir tudo</button>';

        // Inserir o novo botão antes de areaEx
        areaEx.parentNode.insertBefore(exButton, areaEx);

        // Adicionando eventos de mouseover e mouseout diretamente
        const button = exButton.querySelector('#exButton');

        button.addEventListener('mouseover', () => {
            button.style.filter = 'brightness(0.95)';
        });

        button.addEventListener('mouseout', () => {
            button.style.filter = 'brightness(1)';
        });

        button.addEventListener('click', () => {
            // Seletor para os elementos de produto
            const searchElements = document.querySelectorAll('.sc-aac12c5e-2.iBGjMy');
            searchElements.forEach((item) => {
                const toggleButton = item.querySelector('button#contentButton');
                if (toggleButton) {
                    toggleButton.click(); // Simula o clique no botão
                }
            });
        });
    } else {
        console.error('Não foi possível encontrar a área de inserção ou o botão já foi adicionado.');
    }
}

function handleSearchProducts(){
    const searchElements = document.querySelectorAll('.sc-aac12c5e-2.iBGjMy');

    searchElements.forEach((item) => {
        const productId = item.getAttribute('data-item-id');

        const checkboxItem = document.createElement('input')
        checkboxItem.type = 'checkbox';
        checkboxItem.id = productId;
        checkboxItem.className = "plugin-checkbox"
        checkboxItem.style.cssText = `
            position: absolute;
            top: 3px;
            left: 3px;
            z-index: 100;
        `;

        // Criação da caixa de mensagem
        const messageBox = document.createElement('div');
        messageBox.id = 'messageBox'
        messageBox.style.cssText = `
            padding: 0px 15px 15px 15px;
            border-radius: 10px;
            background-color: #fff;
            // border: 1px solid #ccc;
            // box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
        toggleButton.id = 'contentButton'
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
                        const priceText = document.querySelector('.sc-b0bec8a5-0.iSfaqD').innerText;
                        const priceValue = parseFloat(priceText.replace('R$', '').trim().replace(',', '.'));

                        const concorrente = parseFloat(productInfo.panvel) || 'NaN'
                        const lprice = productInfo.lprice || 'NaN';
                        const ic = parseFloat(productInfo.ic).toFixed(2) || 'NaN';
                        let totalS = parseFloat(productInfo.rbv) / priceValue || 'NaN';
                        let todayS = 0;
                        let weekS = 0;
                        if (totalS != 'NaN'){
                            todayS = parseFloat(totalS * priceValue / 30).toFixed(2)
                            weekS = parseFloat(totalS * priceValue / 4).toFixed(2)
                        }
                        const monthS = productInfo.rbv ;

                        let color = 'gray';
                        let thrend = 'graphic_eq';

                        if (priceValue > concorrente){
                            color = 'red'
                            thrend = 'trending_down'
                        } 
                        if (priceValue < concorrente){
                            color = 'green'
                                thrend = 'trending_up'
                        }

                        // Adiciona o conteúdo estilizado ao messageBox
                        messageBox.innerHTML = `
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                    <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;color: white;background-color: green;">ssid_chart</i>
                                    <span style="width:12%"></span>
                                    <span style="width: 80%;padding-top: 3px;">
                                        IC
                                    </span>
                                </span>
                                <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${ic}</span>
                            </div>
                            <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                    <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">attach_money</i>
                                    <span style="width: 80%;padding-top: 3px;">
                                        Vendas hoje
                                    </span>
                                </span>
                                <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${todayS}</span>
                            </div>
                            <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                    <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">attach_money</i>
                                    <span style="width: 80%;padding-top: 3px;">
                                        Vendas S-1
                                    </span>
                                </span>
                                <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${weekS}</span>
                            </div>
                            <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                    <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">attach_money</i>
                                    <span style="width: 80%;padding-top: 3px;">
                                        Vendas mês
                                    </span>
                                </span>
                                <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${monthS}</span>
                            </div>
                            <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                    <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">groups_2</i>
                                    <span style="width: 80%;padding-top: 3px;">
                                        Volume de Visitas
                                    </span>
                                </span>
                                <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${'Integrar'}</span>
                            </div>
                            <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
                                    <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">trending_up</i>
                                    <span style="width: 80%;padding-top: 3px;">
                                        Taxa de conversão
                                    </span>
                                </span>
                                <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${'Integrar'}</span>
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
        item.appendChild(checkboxItem);
        item.appendChild(messageBox);
        item.appendChild(document.createElement('br'));
        divButton.appendChild(toggleButton)
        item.appendChild(divButton);
    });
}

async function handleSearchProductsCompetidor() {
    const searchElements = document.querySelectorAll('.sc-aac12c5e-2.iBGjMy');

    for (let item of searchElements) {
        item.appendChild(document.createElement('br'));
        item.appendChild(document.createElement('br'));
        item.appendChild(document.createElement('br'));
        item.appendChild(document.createElement('br'));
        item.appendChild(document.createElement('br'));
        const additionalInfo = document.createElement('div');
        const productId = item.getAttribute('data-item-id');
        
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

        fdescript.style.cssText = `
                text-align: left;
                flex: auto;
                padding-left: 15px;
        `;
        fdescript.innerText = " Amazon";

        infoKeyText.appendChild(ficon);
        infoKeyText.appendChild(fdescript);
        infoKeyText.style.cssText = `
            font-size: 10px;
            font-weight: 800;
            color: black;
            display: contents;
            text-transform: capitalize;
        `;
        infoValueText.innerText = "-"

        infoValueText.style.cssText = `
            font-size: 10px;
            font-weight: 800;
            color: black;
        `;

        const secondLine = document.createElement('div');
        const sicon = document.createElement('i');
        const sdescript = document.createElement('span');
        const sinfoKeyText = document.createElement('span');
        const sinfoValueText = document.createElement('span');

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
                
        sicon.className = 'material-icons';
        sicon.style.fontSize = '15px';
        sicon.style.fontWeight = '800';
        sicon.style.color = 'white';
        sicon.style.backgroundColor = "gray"
        sicon.textContent = "block"

        sdescript.style.cssText = `
                text-align: left;
                flex: auto;
                padding-left: 15px;
                text-transform: capitalize;
        `;
        sdescript.innerText = " Amazon";

        sinfoKeyText.appendChild(sicon);
        sinfoKeyText.appendChild(sdescript);
        sinfoKeyText.style.cssText = `
            font-size: 10px;
            font-weight: 800;
            color: black;
            display: contents;
        `;
        sinfoValueText.innerText = "-"

        sinfoValueText.style.cssText = `
            font-size: 10px;
            font-weight: 800;
            color: black;
        `;

        try {
            const response = await new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({ action: 'fetchCompetitorInfo', productId: productId }, (response) => {
                    if (response.error || !response) {
                        reject('Erro ao obter os dados do produto');
                    } else {
                        resolve(response);
                    }
                });
            });

            const {
                paguemenos, drogariaspacheco, panvel, belezanaweb, epocacosmeticos, 
                farmaciasnissei, ultrafarma, extrafarma, amazon, drogariavenancio, 
                drogariasaopaulo, magazineluiza, araujo
            } = response;

            // Mapeando as variáveis de preços
            const priceData = {
                paguemenos, drogariaspacheco, panvel, belezanaweb, epocacosmeticos, 
                farmaciasnissei, ultrafarma, extrafarma, amazon, drogariavenancio, 
                drogariasaopaulo, magazineluiza, araujo
            };

            // Criação de um array com os valores convertidos para números
            const values = Object.entries(priceData).map(([key, value]) => ({
                name: key,
                value: parseFloat(value.replace(',', '.'))
            }));

            // Removendo valores inválidos (NaN)
            const filteredValues = values.filter(item => !isNaN(item.value));

            // Encontrando o maior e o menor valor, e sua origem
            const max = filteredValues.reduce((prev, current) => (prev.value > current.value ? prev : current), {});
            const min = filteredValues.reduce((prev, current) => (prev.value < current.value ? prev : current), {});

            const priceTag = (item.querySelector('[data-qa="price_final_item"]') || 
                  item.querySelector('div.special-price') || 
                  item.querySelector('.price-lmpm')).innerText;

            const price = parseFloat(priceTag.replace(/R\$|\s/g, '').replace(',', '.'));

            // Verificando se os preços podem ser comparados
            if (!isNaN(max.value)) {
                ficon.style.backgroundColor = max.value > price ? "green" : "red";
                ficon.textContent = max.value > price ? 'trending_up' : "trending_down";
                fdescript.innerText = `${max.name}`
                infoValueText.innerText = `R$ ${max.value.toFixed(2)}`;
                fristLine.appendChild(infoKeyText);
                fristLine.appendChild(infoValueText);
                additionalInfo.appendChild(fristLine);
            }

            if (!isNaN(min.value)) {
                sicon.style.backgroundColor = min.value > price ? "red" : "green";
                sicon.textContent = min.value > price ? 'trending_down' : "trending_up";
                sdescript.innerText = `${min.name}`
                sinfoValueText.innerText = `${min.value.toFixed(2)}`;
                secondLine.appendChild(sinfoKeyText);
                secondLine.appendChild(sinfoValueText);
                additionalInfo.appendChild(secondLine);
            }

        } catch (e) {
            console.log('Erro ao enviar mensagem ou processar a resposta:', e);
            infoValueText.innerText = 'NaN';
        }

        item.appendChild(additionalInfo);
        item.appendChild(document.createElement('hr'))
    }
}

async function handleHeaderSearchPage(category) {
    // Seleciona o h1 com o seletor fornecido
    const h1Element = document.querySelector('[data-qa="seo-search_title-h1validator"]');
    
    if (h1Element) {
        // Cria o container para o h1 e a nova div ficarem lado a lado
        const containerDiv = document.createElement('div');
        containerDiv.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 30px;
        `;
        
        // Movendo o h1 para dentro do novo container
        h1Element.parentNode.insertBefore(containerDiv, h1Element);
        containerDiv.appendChild(h1Element);
        
        // Cria a nova div que ficará ao lado do h1
        const contentDiv = document.createElement('div');
        contentDiv.id = 'contentDiv'
        contentDiv.style.cssText = `
            margin-top: 10px;
            padding: 15px;
            border-radius: 3px;
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

        totalProducts = document.querySelectorAll('.sc-35785f40-0.kcCeq > span').innerText
        
        const button = document.createElement('button')

        const searchElements = document.querySelectorAll('.sc-aac12c5e-2.iBGjMy');


        let agg_todayS = 0
        let agg_weekS = 0
        let agg_monthS = 0
        let agg_ic = 0
        let i = 0
        

        for (const item of searchElements) {
            const productId = item.getAttribute('data-item-id');
            const productInfo = await new Promise((resolve) => {
                chrome.runtime.sendMessage({ action: 'fetchProductInfo', productId: productId }, (response) => {
                    resolve(response);
                });
            });
    
            const priceText = document.querySelector('.sc-b0bec8a5-0.iSfaqD').innerText;
            const priceValue = parseFloat(priceText.replace('R$', '').trim().replace(',', '.'));
    
            const concorrente = parseFloat(productInfo.panvel) || NaN;
            const lprice = productInfo.lprice || NaN;
            const ic = parseFloat(productInfo.ic).toFixed(2) || NaN;
            let totalS = parseFloat(productInfo.rbv) / priceValue || NaN;
            let todayS = 0;
            let weekS = 0;
    
            if (totalS !== NaN) {
                todayS = (parseFloat(totalS * priceValue / 30).toFixed(2)) || 0;
                weekS = (parseFloat(totalS * priceValue / 4).toFixed(2)) || 0;
            }
    
            const monthS = !isNaN(parseFloat(productInfo.rbv)) ? parseFloat(productInfo.rbv) : 0;;
    
            if (!isNaN(todayS)) agg_todayS += parseFloat(todayS);
            if (!isNaN(weekS)) agg_weekS += parseFloat(weekS);
            if (!isNaN(monthS)) agg_monthS += parseFloat(monthS);
            if (!isNaN(ic)) agg_ic += parseFloat(ic);
            i++;
        }

            agg_ic = agg_ic / i;
            contentDiv.innerHTML = `
                <div style="width:13.28%; height:100px; padding: 15px;border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">loyalty</i><br><span style="font-size: 9px; color: gray;">Produtos</span><br><br><span style="font-size: 10px;font-weight: 800;">${i || '8422'}</span></div>
                <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;color: white;background-color: green;">ssid_chart</i><br><span style="font-size: 9px; color: gray;">IC</span><br><br><span style="font-size: 10px;font-weight: 800;">${parseFloat(agg_ic).toFixed(2)}</span></div>
                <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas hoje</span><br><br><span style="font-size: 10px;font-weight: 800;">${parseFloat(agg_todayS).toFixed(2)}</span></div>
                <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas S-1</span><br><br><span style="font-size: 10px;font-weight: 800;">${parseFloat(agg_weekS).toFixed(2)}</span></div>
                <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas mês</span><br><br><span style="font-size: 10px;font-weight: 800;">${parseFloat(agg_monthS).toFixed(2)}</span></div>
                <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">groups_2</i><br><span style="font-size: 9px; color: gray;">Volume de visitas</span><br><br><span style="font-size: 10px;font-weight: 800;">${'Integrar'}</span></div>
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
        // const headerContent = document.querySelector('#contentDiv');
        // headerContent.appendChild(editContent);

        // contentDiv.appendChild(button);
        // Insere a nova div dentro do container ao lado do h1
        containerDiv.appendChild(contentDiv);
    } else {
        console.log("Elemento h1 não encontrado.");
    }
}