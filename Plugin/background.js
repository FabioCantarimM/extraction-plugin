chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const API_BASE_URL =
    "http://ec2-23-20-72-33.compute-1.amazonaws.com:3000/api";

  if (request.action === "fetchProductInfo") {
    const productId = request.productId; // Assume que o ID do produto está sendo enviado na requisição

    // Faz a requisição para o servidor local
    fetch(`${API_BASE_URL}/produtos/${productId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to [fetchProductInfo]");

        return response.json(); // Converte a resposta para JSON
      })
      .then((data) => {
        // Envia os dados recebidos de volta para o script de conteúdo
        sendResponse(data);
      })
      .catch(sendResponse);

    // Indica que a resposta será enviada de forma assíncrona
    return true; // Importante para indicar que a resposta será enviada posteriormente
  }

  if (request.action === "fetchCompetitorInfo") {
    const productId = request.productId; // Assume que o ID do produto está sendo enviado na requisição

    // Faz a requisição para o servidor local
    fetch(`${API_BASE_URL}/concorrente/${productId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to [fetchCompetitorInfo]");

        return response.json(); // Converte a resposta para JSON
      })
      .then((data) => {
        // Envia os dados recebidos de volta para o script de conteúdo
        sendResponse(data);
      })
      .catch(sendResponse);

    // Indica que a resposta será enviada de forma assíncrona
    return true; // Importante para indicar que a resposta será enviada posteriormente
  }

  if (request.action === "fetchCategoryInfo") {
    const productId = request.productId; // Assume que o ID do produto está sendo enviado na requisição

    if(!productId) return sendResponse(new Error('Missing category name.'))

    // Faz a requisição para o servidor local
    fetch(`${API_BASE_URL}/categoria/${productId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to [fetchCategoryInfo]");

        return response.json(); // Converte a resposta para JSON
      })
      .then((data) => {
        // Envia os dados recebidos de volta para o script de conteúdo
        sendResponse(data);
      })
      .catch(sendResponse);

    // Indica que a resposta será enviada de forma assíncrona
    return true; // Importante para indicar que a resposta será enviada posteriormente
  }
});
