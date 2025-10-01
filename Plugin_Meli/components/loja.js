function handleSearchPage() {
    setTimeout(async () => {
        insertGoogleMaterial()
        topArea()
        concorrenteArea()
        productArea()
    }, 1000);
    setTimeout(async () => {
        recomendadosArea()
    }, 3000)
}

function insertGoogleMaterial(){
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';

    // Adiciona o link ao <head> do documento
    document.head.appendChild(link);
}

function topArea() {
    // Seletores para os elementos da página
    const area = document.querySelector("div.slider--meli-home");
    const carousel = document.querySelector("div.carousel-container");

    if (area && carousel) {
        // Cria a div
        const contentArea = document.createElement("div");
        contentArea.style.cssText = `
            display: flex;
            align-items: center;       /* centraliza verticalmente */
            justify-content: center;   /* centraliza horizontalmente */
            padding: 5px 0;            /* padding uniforme */
            background-color: #d3d3d361;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        `;
        const content = document.createElement("div");
        content.innerHTML = `
            <div style="width:13.28%; height:100px; padding: 15px;border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">loyalty</i><br><span style="font-size: 9px; color: gray;">Produtos</span><br><br><span style="font-size: 10px;font-weight: 800;">${'Integrar'}</span></div>
            <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;color: white;background-color: green;">ssid_chart</i><br><span style="font-size: 9px; color: gray;">IC</span><br><br><span style="font-size: 10px;font-weight: 800;">${'Integrar'}</span></div>
            <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas hoje</span><br><br><span style="font-size: 10px;font-weight: 800;">${'Integrar'}</span></div>
            <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas S-1</span><br><br><span style="font-size: 10px;font-weight: 800;">${'Integrar'}</span></div>
            <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas mês</span><br><br><span style="font-size: 10px;font-weight: 800;">${'Integrar'}</span></div>
            <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">groups_2</i><br><span style="font-size: 9px; color: gray;">Volume de visitas</span><br><br><span style="font-size: 10px;font-weight: 800;">${'Integrar'}</span></div>
            <div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">trending_up</i><br><span style="font-size: 9px; color: gray;">Taxa de conversão</span><br><br><span style="font-size: 10px;font-weight: 800;">${'Integrar'}</span></div>
        `;
        content.style.cssText = `
            margin-top: 10px;
            padding: 15px;
            font-size: 14px;
            color: #333;
            display: none;
            width: 75%;
            align-self: center;
            display: flex;
            justify-content: center;
        `;     
        content.id = "teste"; // id sem espaço
        contentArea.id = "Conteudo-Teste"
        contentArea.append(content)
        // Insere a nova div antes do carousel
        area.insertBefore(contentArea, carousel);
        console.log("Botão inserido com sucesso!");
    } else {
        console.error("Não foi possível encontrar a área de inserção.");
    }
}

function productArea() {
    const products = document.querySelector('div.andes-carousel-snapped__wrapper').children;
    let productId = 0;

    for (const product of products) {
        addDataInProduct(product, productId);
        productId++;
    }
}

function concorrenteArea(){
    const products = document.querySelector('div.andes-carousel-snapped__wrapper').children;

    for (const product of products) {
       addCDataInProduct(product)
    }
}

function recomendadosArea(){
    const products = document.querySelector('div.grid-container.ui-ms-grid-container__eshops').children;
    const productId = 5;
    if(products){
        for (const product of products){
            addCDataInProduct(product)
            addDataInProduct(product,productId);
        }
    } else { 
        console.error('Productos Recomendados não encontrados')
    }
}

function addDataInProduct(product, productId){
        const item = product.querySelector("div");
        if(item){
            const messageBox = document.createElement('div');
            messageBox.id = `messageBox-${productId}`;
            messageBox.style.cssText = `
                padding: 0px 15px 15px 15px;
                border-radius: 10px;
                background-color: #fff;
                font-size: 14px;
                color: #333;
                display: none;
                width: 85%;
                align-self: center;
            `;

            // Botão de toggle
            const divButton = document.createElement('div');
            divButton.style.cssText = `
                width: 100%;
                text-align: center;
                padding-top: 10px;
                padding-bottom: 10px;
            `;

            const toggleButton = document.createElement('button');
            toggleButton.id = `contentButton-${productId}`;
            toggleButton.innerText = '+';
            toggleButton.style.cssText = `
                width: 20px;
                height: 25px;
                border-radius: 50%;
                background-color: transparent;
                color: black;
                font-size: 15px;
                font-weight: bold;
                border: 1px solid black;
                align-items: center;
                cursor: pointer;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                transition: background-color 0.3s ease, color 0.3s ease;
            `;

            // Eventos do botão
            toggleButton.addEventListener('mouseover', () => {
                toggleButton.style.backgroundColor = 'black';
                toggleButton.style.color = 'white';
            });
            toggleButton.addEventListener('mouseout', () => {
                toggleButton.style.backgroundColor = 'transparent';
                toggleButton.style.color = 'black';
            });
            toggleButton.addEventListener('click', () => {
                const isVisible = messageBox.style.display === 'block';
                messageBox.style.display = isVisible ? 'none' : 'block';
                toggleButton.innerText = isVisible ? '+' : '';
                
                if(!isVisible){
                    const icon = document.createElement('i');
                    icon.className = 'material-icons';
                    icon.textContent = 'close';
                    icon.style.fontSize = '15px';
                    icon.style.fontWeight = '800';
                    toggleButton.appendChild(icon);
                }
            });

            // Criação do conteúdo interno (sem onclick inline)
            const createToggleSection = (title, contentId) => {
                const header = document.createElement('div');
                header.style.cssText = "display: flex; justify-content: space-between; margin-bottom: 8px; cursor: pointer;";
                header.innerHTML = `
                    <span style="color: black; font-size: 10px; width: 60%; display: contents;">
                        <span style="width: 95%;padding-top: 3px; font-weight: 800;">${title}</span>
                        <span style="width:5%; font-size: 14px !important; font-weight: 800;"> + </span>
                    </span>
                `;
                const contentDiv = document.createElement('div');
                contentDiv.id = contentId;
                contentDiv.style.display = 'none';
                contentDiv.innerHTML = `<div style="padding:5px;">Conteúdo de ${title}</div>`;

                // Evento toggle para esta seção
                header.addEventListener('click', () => {
                    contentDiv.style.display = contentDiv.style.display === 'none' ? 'block' : 'none';
                });

                messageBox.appendChild(header);
                messageBox.appendChild(contentDiv);
                messageBox.appendChild(document.createElement('hr'));
            };

            // Exemplo de seções
            createToggleSection('Competitividade', `ic-content-${productId}`);
            createToggleSection('Vendas', `vendas-content-${productId}`);
            createToggleSection('Estratégia', `estrategia-content-${productId}`);
            createToggleSection('Funil de Vendas', `funil-content-${productId}`);
            createToggleSection('Market Share', `mkt-content-${productId}`);

            product.style.display = 'block';
            product.append(messageBox);
            divButton.appendChild(toggleButton);
            product.append(divButton);
            productId++;
        } else {
            console.error("Não encontrei o produto");
        }
}

function addCDataInProduct(product){
     const additionalInfo = document.createElement('div');
        additionalInfo.style.cssText = `
           padding: 0px 15px 15px;
            width: 85%;
        `;
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

        ficon.style.backgroundColor = "green";
        ficon.textContent = 'trending_up';
        fdescript.innerText = `Amazon`
        infoValueText.innerText = `R$ 0,00`;
        fristLine.appendChild(infoKeyText);
        fristLine.appendChild(infoValueText);
        additionalInfo.appendChild(fristLine);

        sicon.style.backgroundColor = "red";
        sicon.textContent = 'trending_down';
        sdescript.innerText = `Magalu`;
        sinfoValueText.innerText =  `R$ 0,00`;
        secondLine.appendChild(sinfoKeyText);
        secondLine.appendChild(sinfoValueText);
        additionalInfo.appendChild(secondLine);

        product.style.display = 'block';
        const br = document.createElement('br');
        product.append(br);
        product.append(additionalInfo);
        product.append(document.createElement('hr'));
}