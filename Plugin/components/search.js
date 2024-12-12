function handleSearchPage() {
    setTimeout(() => {
        const searchElements = document.querySelectorAll('#__next > main > main > div > div > section > section > div.sc-8f6b8a4-12.bDnVMX > div.sc-8f6b8a4-8.eASWkJ > article');
    
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
            item.appendChild(messageBox);
            item.appendChild(document.createElement('br'));
            divButton.appendChild(toggleButton)
            item.appendChild(divButton);
        });
    }, 10000);
}
