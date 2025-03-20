chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchProductInfo') {
        const productId = request.productId; // Assume que o ID do produto está sendo enviado na requisição

        // Faz a requisição para o servidor local
        fetch(`http://ec2-23-20-72-33.compute-1.amazonaws.com:3000/api/produtos/${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Converte a resposta para JSON
            })
            .then(data => {
                // Envia os dados recebidos de volta para o script de conteúdo
                sendResponse(data);
            })
            .catch(error => {
                sendResponse({ error: error.message });
            });

        // Indica que a resposta será enviada de forma assíncrona
        return true; // Importante para indicar que a resposta será enviada posteriormente
    }

    if (request.action === 'fetchCompetitorInfo') {
        const productId = request.productId; // Assume que o ID do produto está sendo enviado na requisição

        // Faz a requisição para o servidor local
        fetch(`http://ec2-23-20-72-33.compute-1.amazonaws.com:3000/api/concorrente/${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Converte a resposta para JSON
            })
            .then(data => {
                // Envia os dados recebidos de volta para o script de conteúdo
                sendResponse(data);
            })
            .catch(error => {
                sendResponse({ error: error.message });
            });

        // Indica que a resposta será enviada de forma assíncrona
        return true; // Importante para indicar que a resposta será enviada posteriormente
    }

    if (request.action === 'fetchCategoryInfo') {
        const productId = request.productId; // Assume que o ID do produto está sendo enviado na requisição

        // Faz a requisição para o servidor local
        fetch(`http://ec2-23-20-72-33.compute-1.amazonaws.com:3000/api/categoria/${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Converte a resposta para JSON
            })
            .then(data => {
                // Envia os dados recebidos de volta para o script de conteúdo
                sendResponse(data);
            })
            .catch(error => {
                sendResponse({ error: error.message });
            });

        // Indica que a resposta será enviada de forma assíncrona
        return true; // Importante para indicar que a resposta será enviada posteriormente
    }

    if (request.action === 'uploadFile') {
        const formData = new FormData();
        formData.append('file', request.file);
    
        // Envia o arquivo para o servidor usando fetch
        fetch('http://ec2-23-20-72-33.compute-1.amazonaws.com:3000/api/upload/produtos', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                sendResponse({ message: data.message });
            } else {
                sendResponse({ message: "Erro ao enviar o arquivo." });
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            sendResponse({ message: "Erro ao enviar o arquivo." });
        });
    
        // Indica que a resposta será enviada de forma assíncrona
        return true; // Importante para indicar que a resposta será enviada posteriormente
    }
});