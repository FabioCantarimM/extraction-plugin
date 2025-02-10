//Dupliquei essa função porque não consigo chamar o search passando parametros, por isso foi necessário refazer a função aqui.
async function handleCategoryPage() {
  const category = document.querySelector(
    '[class*="Titlestyles__TitleStyles-sc-"]'
  );
  if (category) {
    handleHeaderCategoryPage(category);
    handleCategoryProductsCompetidor();
    handleCategoryProducts();
    expandButton();
  }
}

function expandButton() {
  const areaEx = document.querySelector(
    ".OneColumnstyles__ColumnStyles-sc-1w8z7r2-0.dULZUW.rd-col-16"
  );

  const existExButton = document.querySelector("#exButton");

  if (!existExButton) {
    const button = document.createElement("div");
    button.style.textAlign = "right";
    button.innerHTML =
      '<button id="exButton" style="background-color: rgb(255, 255, 255); color: rgb(241, 166, 88); padding: 5px 15px; font-size: 12px; text-transform: uppercase; border: 1px solid rgb(241, 166, 88); border-radius: 5px; display: inline-block;">Expandir tudo</button>';

    button.addEventListener("mouseover", () => {
      button.style.filter = "brightness(0.95)";
    });

    button.addEventListener("mouseout", () => {
      button.style.filter = "brightness(1)";
    });

    button.addEventListener("click", () => {
      const searchElements = document.querySelectorAll(
        "#__next > main > div:nth-child(5) > div > div.TwoColumnsstyles__SecondColumnStyles-sc-46q9v-1.hcbctD.rd-col-13 > div.ProductGridstyles__ProductGridStyles-sc-1wbcxrt-0.jkDOLa > div"
      );
      searchElements.forEach((item) => {
        /**
         * @type HTMLButtonElement | null
         */
        const toggleButton = item.querySelector("button#contentButton");
        if (toggleButton) {
          toggleButton.click(); // Simula o clique no botão
        }
      });
    });

    const innerAreaEx = document.createElement("div");
    innerAreaEx.appendChild(button);

    if (areaEx) areaEx.append(innerAreaEx);
  }
}

function handleCategoryProducts() {
  const searchElements = document.querySelectorAll(
    "#__next > main > div:nth-child(5) > div > div.TwoColumnsstyles__SecondColumnStyles-sc-46q9v-1.hcbctD.rd-col-13 > div.ProductGridstyles__ProductGridStyles-sc-1wbcxrt-0.jkDOLa > div"
  );

  searchElements.forEach((item) => {
    const productId = item.getAttribute("data-item-id");
    if (!productId) return;

    const checkboxItem = document.createElement("input");
    checkboxItem.type = "checkbox";
    checkboxItem.id = productId;
    checkboxItem.className = "plugin-checkbox";
    checkboxItem.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
        `;

    // Criação da caixa de mensagem
    const messageBox = document.createElement("div");
    messageBox.id = "messageBox";
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
    const divButton = document.createElement("div");
    divButton.style.cssText = `
            width: 100%;
            text-align: center;
            pagging-top: 10px;
            padding-bottom: 10px;
        `;

    const toggleButton = document.createElement("button");
    toggleButton.id = "contentButton";
    toggleButton.innerText = "+";
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

    toggleButton.addEventListener("mouseover", () => {
      toggleButton.style.backgroundColor =
        "black"; /* Fundo preto ao passar o mouse */
      toggleButton.style.color = "white"; /* Texto preto */
    });

    toggleButton.addEventListener("mouseout", () => {
      toggleButton.style.backgroundColor =
        "white"; /* Retorna ao fundo transparente */
      toggleButton.style.color = "black"; /* Retorna ao texto preto */
    });

    toggleButton.addEventListener("click", () => {
      if (messageBox.style.display === "none") {
        messageBox.style.display = "block";
        toggleButton.innerText = "";

        const icon = document.createElement("i");

        // Adiciona a classe do Material Icons
        icon.className = "material-icons";

        // Define o texto do ícone
        icon.textContent = "close";

        // Adiciona estilos diretamente
        icon.style.fontSize = "15px";
        icon.style.fontWeight = "800";

        toggleButton.appendChild(icon);

        chrome.runtime.sendMessage(
          { action: "fetchProductInfo", productId },
          (response) => {
            if (response.error) {
              messageBox.innerHTML = `Produto não cadastrado`;
            } else {
              const productInfo = response;
              const priceText = document.querySelector(
                "#__next > main > div:nth-child(5) > div > div.TwoColumnsstyles__SecondColumnStyles-sc-46q9v-1.hcbctD.rd-col-13 > div.ProductGridstyles__ProductGridStyles-sc-1wbcxrt-0.jkDOLa > div:nth-child(1) > div.ProductCardstyles__CardFooter-iu9am6-2.jPqIVV > div.PriceBoxstyles__PriceBoxStyle-sc-17xepza-0.fRQkyG.price-box > div.price.price-final.special-price > span > div"
              )?.textContent;
              const priceValue = extractPrice(priceText);

              const concorrente = parseFloat(productInfo.panvel) || "NaN";
              const lprice = productInfo.lprice || "NaN";
              const ic = parseFloat(productInfo.ic).toFixed(2) || "NaN";

              // ?????????????????????????????????

              let totalS = parseFloat(productInfo.rbv) / priceValue || "NaN";
              let todayS = 0;
              let weekS = 0;
              if (totalS != "NaN") {
                todayS = new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(parseFloat((totalS * priceValue) / 30).toFixed(2));
                weekS = new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(parseFloat((totalS * priceValue) / 4).toFixed(2));
              }
              const monthS = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(
                parseFloat(
                  productInfo.rbv.replace("R$", "").trim().replace(",", ".")
                )
              );

              let color = "gray";
              let thrend = "graphic_eq";

              if (priceValue > concorrente) {
                color = "red";
                thrend = "trending_down";
              }
              if (priceValue < concorrente) {
                color = "green";
                thrend = "trending_up";
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
        <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${"Integrar"}</span>
    </div>
    <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: gray; font-size: 10px; width: 60%; display: contents;">
            <i class="material-icons" style="font-size: 15px !important;!i;!;!;font-weight: 800 !important;!i;!;width: 20%;">trending_up</i>
            <span style="width: 80%;padding-top: 3px;">
                Taxa de conversão
            </span>
        </span>
        <span style="text-align:end; width: 40%;font-size: 10px; font-weight: 800;padding-top: 3px;">${"Integrar"}</span>
    </div>
    <hr style="border-color: #a2a2a23b;height: 1px;margin-top: -5px;margin-bottom: 12px;"/>
`;
            }
          }
        );
      } else {
        messageBox.style.display = "none";
        toggleButton.innerText = "+";
      }
    });

    // Inserir os novos elementos no item de produto
    const price = item.querySelector(
      ".ProductCardstyles__CardFooter-iu9am6-2.jPqIVV"
    );

    if (price?.parentNode) {
      item.appendChild(checkboxItem);
      price.parentNode.insertBefore(messageBox, price);
      price.parentNode.insertBefore(document.createElement("br"), price);
      divButton.appendChild(toggleButton);
      price.parentNode.insertBefore(divButton, price);
    }
  });
}

async function handleCategoryProductsCompetidor() {
  const searchElements = document.querySelectorAll(
    "#__next > main > div:nth-child(5) > div > div.TwoColumnsstyles__SecondColumnStyles-sc-46q9v-1.hcbctD.rd-col-13 > div.ProductGridstyles__ProductGridStyles-sc-1wbcxrt-0.jkDOLa > div"
  );

  for (let item of searchElements) {
    const additionalInfo = document.createElement("div");
    const productId = item.getAttribute("data-item-id");

    // Elemento do Gráfico Concorrentes
    const fristLine = document.createElement("div");
    const ficon = document.createElement("i");
    const fdescript = document.createElement("span");
    const infoKeyText = document.createElement("span");
    const infoValueText = document.createElement("span");

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

    ficon.className = "material-icons";
    ficon.style.fontSize = "15px";
    ficon.style.fontWeight = "800";
    ficon.style.color = "white";
    ficon.style.backgroundColor = "gray";
    ficon.textContent = "block";

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
    infoValueText.innerText = "-";

    infoValueText.style.cssText = `
            font-size: 10px;
            font-weight: 800;
            color: black;
        `;

    const secondLine = document.createElement("div");
    const sicon = document.createElement("i");
    const sdescript = document.createElement("span");
    const sinfoKeyText = document.createElement("span");
    const sinfoValueText = document.createElement("span");

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

    sicon.className = "material-icons";
    sicon.style.fontSize = "15px";
    sicon.style.fontWeight = "800";
    sicon.style.color = "white";
    sicon.style.backgroundColor = "gray";
    sicon.textContent = "block";

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
    sinfoValueText.innerText = "-";

    sinfoValueText.style.cssText = `
            font-size: 10px;
            font-weight: 800;
            color: black;
        `;

    try {
      apiCall("fetchCompetitorInfo", productId);
      const response = await apiCall("fetchCompetitorInfo", productId);

      const {
        paguemenos,
        drogariaspacheco,
        panvel,
        belezanaweb,
        epocacosmeticos,
        farmaciasnissei,
        ultrafarma,
        extrafarma,
        amazon,
        drogariavenancio,
        drogariasaopaulo,
        magazineluiza,
        araujo,
      } = response;

      // Mapeando as variáveis de preços
      const priceData = {
        paguemenos,
        drogariaspacheco,
        panvel,
        belezanaweb,
        epocacosmeticos,
        farmaciasnissei,
        ultrafarma,
        extrafarma,
        amazon,
        drogariavenancio,
        drogariasaopaulo,
        magazineluiza,
        araujo,
      };

      // Criação de um array com os valores convertidos para números
      const values = Object.entries(priceData).map(([key, value]) => ({
        name: key,
        value: parseFloat(value?.replace(",", ".") ?? "0"),
      }));

      // Removendo valores inválidos (NaN)
      const filteredValues = values.filter((item) => !Number.isNaN(item.value));

      // Encontrando o maior e o menor valor, e sua origem
      const max = filteredValues.reduce(
        (prev, current) => (prev.value > current.value ? prev : current),
        {}
      );
      const min = filteredValues.reduce(
        (prev, current) => (prev.value < current.value ? prev : current),
        {}
      );

      const priceTag = (
        item.querySelector('[data-qa="price_final_item"]') ||
        item.querySelector("div.special-price") ||
        item.querySelector(".price-lmpm")
      )?.textContent;

      const price = extractPrice(priceTag);

      // Verificando se os preços podem ser comparados
      if (!Number.isNaN(max.value)) {
        ficon.style.backgroundColor = max.value > price ? "green" : "red";
        ficon.textContent = "trending_up";
        fdescript.innerText = `${max.name}`;
        infoValueText.innerText = `${formatCurrency(parseFloat(max.value))}`;
        fristLine.appendChild(infoKeyText);
        fristLine.appendChild(infoValueText);
        additionalInfo.appendChild(fristLine);
      }

      if (!Number.isNaN(min.value)) {
        sicon.style.backgroundColor = min.value > price ? "green" : "red";
        sicon.textContent = "trending_down";
        sdescript.innerText = `${min.name}`;
        sinfoValueText.innerText = `${formatCurrency(
          parseFloat(min.value).toFixed(2)
        )}`;
        secondLine.appendChild(sinfoKeyText);
        secondLine.appendChild(sinfoValueText);
        additionalInfo.appendChild(secondLine);
      }
    } catch (e) {
      console.log("Erro ao enviar mensagem ou processar a resposta:", e);
      infoValueText.innerText = "NaN";
    }

    const price = item.querySelector(
      ".ProductCardstyles__CardFooter-iu9am6-2.jPqIVV"
    );
    if (price?.parentNode) price.parentNode.insertBefore(additionalInfo, price);
    // item.appendChild(additionalInfo);
  }
}

/**
 *
 * @param {Element} h1Element
 */
async function handleHeaderCategoryPage(h1Element) {
  const categoryName = h1Element.textContent?.trim();
  // Limpa conteúdo previamente adicionado (se existente)
  const previousContainer = document.querySelector(".custom-container");
  if (previousContainer) previousContainer.remove();

  // Cria o container para o h1 e a nova div ficarem lado a lado
  const containerDiv = document.createElement("div");
  containerDiv.className = "custom-container";
  containerDiv.style.cssText = `
    display: flex;
    margin-top:10px;
    align-items: center;
    justify-content: space-between;
    cursor: default;
`;

  // Cria a nova div que ficará ao lado do h1
  const contentDiv = document.createElement("div");
  contentDiv.style.cssText = `
    margin-top: 10px;
    padding: var(--spacing-stack-fourpulse,16px) var(--spacing-stack-sixpulse,24px);
    font-size: 14px;
    color: #333;
    display: none;
    width: 75%;
    align-self: center;
    display: flex;
    justify-content: center;
`;

  function prepareContainer() {
    // Movendo o h1 para dentro do novo container
    if (h1Element.parentNode)
      h1Element.parentNode.insertBefore(containerDiv, h1Element);

    containerDiv.appendChild(h1Element);

    const editContent = document.createElement("div");
    editContent.id = "editContent";
    editContent.style.cssText = `
                  text-align: right;
                  background-color: #d3d3d361;
                  height: 50px;
                  padding: 15px 15px 0px 15px;
                  display: none;
              `;

    const editButton = document.createElement("button");
    const editToogle = document.createElement("input");
    const editText = document.createElement("span");

    editButton.innerText = "Edite em massa";
    editButton.disabled = true;
    editText.innerText = "selecione aqui";
    editText.id = "infoTextPlugin";
    editText.style.cssText = `
                  padding-left: 15px;
                  padding-right: 35px;
                  width: 20%;
              `;

    editToogle.type = "checkbox";

    editToogle.addEventListener("change", () => {
      editButton.disabled = !editToogle.checked;

      /**
       * @type {NodeListOf<HTMLInputElement>}
       */
      const checkboxList = document.querySelectorAll(".plugin-checkbox");
      checkboxList.forEach((item) => {
        item.checked = editToogle.checked;
      });
      const infoTextPlugin = document.querySelector("#infoTextPlugin");
      if (infoTextPlugin)
        if (editToogle.checked) {
          infoTextPlugin.textContent = `${checkboxList.length} itens selecionados`;
        } else {
          infoTextPlugin.textContent = `Não há itens selecionados`;
        }
    });

    editButton.addEventListener("click", () => {
      updateInterface();
    });

    editContent.appendChild(editToogle);
    editContent.appendChild(editText);
    editContent.appendChild(editButton);

    h1Element.appendChild(editContent);

    // contentDiv.appendChild(button);
    // Insere a nova div dentro do container ao lado do h1
    containerDiv.appendChild(contentDiv);
  }

  const elementProducts =
    document.querySelector('div[data-testid="foundItems"]')?.textContent ?? "0";

  const totalProducts = elementProducts.split(" ")[0];

  if (categoryName) {
    /**
     * @type {CategoryInfo}
     */
    const categoryInfo = await apiCall("fetchCategoryInfo", categoryName);

    const rbv = parseFloat(categoryInfo.soma_rbv_l1m).toFixed(2) || "NaN";
    const daily = formatCurrency(
      (typeof rbv === "number" ? rbv / 30 : 0).toFixed(2)
    );
    const weekly = formatCurrency(
      (typeof rbv === "number" ? rbv / 4 : 0).toFixed(2)
    );
    const monthly = formatCurrency(
      (typeof rbv === "number" ? rbv : 0).toFixed(2)
    );
    const icl =
      parseFloat(categoryInfo.media_ic_atual_site_loja_raia).toFixed(2) ||
      "NaN";

    contentDiv.innerHTML = `
<div style="width:13.28%; height:100px; padding: 15px;border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">loyalty</i><br><span style="font-size: 9px; color: gray;">Produtos</span><br><br><span style="font-size: 10px;font-weight: 800;">${
      totalProducts || "8422"
    }</span></div>
<div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;color: white;background-color: green;">ssid_chart</i><br><span style="font-size: 9px; color: gray;">IC</span><br><br><span style="font-size: 10px;font-weight: 800;">${icl}</span></div>
<div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas hoje</span><br><br><span style="font-size: 10px;font-weight: 800;">${daily}</span></div>
<div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas S-1</span><br><br><span style="font-size: 10px;font-weight: 800;">${weekly}</span></div>
<div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas mês</span><br><br><span style="font-size: 10px;font-weight: 800;">${monthly}</span></div>
<div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">groups_2</i><br><span style="font-size: 9px; color: gray;">Volume de visitas</span><br><br><span style="font-size: 10px;font-weight: 800;">${"Integrar"}</span></div>
<div style="width:13.28%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">trending_up</i><br><span style="font-size: 9px; color: gray;">Taxa de conversão</span><br><br><span style="font-size: 10px;font-weight: 800;">${"Integrar"}</span></div>
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

    prepareContainer();
  }
}

function updateInterface() {
  const updateInterfaceDiv = document.createElement("div");
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
  updateInterfaceDiv.innerText = "OI";
  updateInterfaceDiv.id = "Aqui-Plugin";

  // Cria o botão de fechar
  const closeButton = document.createElement("button");
  const icon = document.createElement("i");

  // Adiciona a classe do Material Icons
  icon.className = "material-icons";

  // Define o texto do ícone
  icon.textContent = "close";

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
