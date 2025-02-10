async function handleProductPage() {
  const skuElement = getProductSkuElement();
  if (skuElement?.textContent)
    updateHeaderWithProductInfo(skuElement.textContent);
}

/**
 * Get the SKU of the displayed product
 *
 * @returns the element containing the SKU of the product
 */
function getProductSkuElement() {
  return document.querySelector(
    "#__next > main > div.RaiaProductDescriptionstyles__Global-sc-1ijezxr-0.jsOYDY.rd-container > div > div > div:nth-child(1) > span.RaiaProductDescriptionstyles__Data-sc-1ijezxr-8.fTuOFQ > div"
  );
}

/**
 *
 * @param {string} productSku sku of the product
 * @returns
 */
async function updateHeaderWithProductInfo(productSku) {
  const headerProduct = document.querySelector(
    "#__next > main > div:nth-child(2)"
  );
  if (!headerProduct)
    return console.warn("Elemento de cabeçalho não encontrado.");

  /**
   * @type {ProductInfo|Error}
   */
  const productInfo = await apiCall("fetchProductInfo", productSku).catch(
    (err) => err
  );
  if (!productInfo || "message" in productInfo)
    return console.error(
      productInfo["message"] ?? "Informações do produto não encontradas."
    );

  const priceValueElement = document.querySelector(
    "#__next main div:nth-child(3) .ProductPricestyles__Price-sc-1fizsje-4"
  );
  const priceValue = extractPrice(priceValueElement?.textContent ?? "0");
  const lowestPrice = parseFloat(productInfo.lprice);
  const rbv = parseFloat(productInfo.rbv);
  const panvel = parseFloat(productInfo.panvel);
  const ic = parseFloat(productInfo.ic);

  const concorrente = formatCurrency(panvel);
  const lprice = formatCurrency(lowestPrice);
  const monthS = formatCurrency(rbv);
  const totalS = rbv / priceValue;
  const dailySoldMean = formatCurrency((totalS * priceValue) / 30);
  const weeklySoldMean = formatCurrency((totalS * priceValue) / 4);

  const { color, trendIcon } = getPriceTrend(priceValue, concorrente);

  const container = createContainer([
    { icon: trendIcon, color, label: "Panvel", value: concorrente },
    { icon: "trending_down", color: "red", label: "Produtos", value: lprice },
    {
      icon: "ssid_chart",
      color: "green",
      label: "IC",
      value: formatCurrency(ic) || "NaN",
    },
    { icon: "attach_money", label: "Vendas hoje", value: dailySoldMean },
    { icon: "attach_money", label: "Vendas s-1", value: weeklySoldMean },
    { icon: "attach_money", label: "Vendas mês", value: monthS },
    { icon: "groups_2", label: "Volume de Visitas", value: "Integrar" },
    { icon: "trending_up", label: "Taxa de conversão", value: "Integrar" },
  ]);

  headerProduct.append(
    container,
    document.createElement("br"),
    document.createElement("br")
  );
}

/**
 *
 * @param {number} priceValue
 * @param {string} concorrente
 * @returns
 */
function getPriceTrend(priceValue, concorrente) {
  if (concorrente === "Sem Preço")
    return { color: "gray", trendIcon: "trending_up" };

  const concorrenteValue = extractPrice(concorrente);
  if (priceValue > concorrenteValue)
    return { color: "red", trendIcon: "trending_down" };
  if (priceValue < concorrenteValue)
    return { color: "green", trendIcon: "trending_up" };

  return { color: "gray", trendIcon: "trending_flat" };
}

/**
 *
 * @param {Array<{icon:string, color?:string, label: string, value:string|number|null}>} items
 * @returns
 */
function createContainer(items) {
  const container = document.createElement("div");
  container.style.cssText =
    "display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; cursor: default;";

  items.forEach(({ icon, color = "gray", label, value }) => {
    const itemDiv = document.createElement("div");
    itemDiv.style.cssText = `width: 13.28%; height: 100px; padding: 15px; border-radius: 10px;
        background-color: #FFF; border: 1px solid #ccc; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        text-align: center; overflow-wrap: break-word; display: flex; flex-direction: column; align-items: center;`;

    itemDiv.innerHTML = `
        <i class="material-icons" style="font-size: 25px; color: white; background-color: ${color}; border-radius: 50%; padding: 5px;">${icon}</i>
        <span style="font-size: 9px; color: gray; margin-top: 5px;">${label}</span>
        <span style="font-size: 10px; font-weight: 800;">${value}</span>
      `;

    container.appendChild(itemDiv);
  });
  return container;
}
