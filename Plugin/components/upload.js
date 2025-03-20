function createFileUploadForm(updateInterfaceDiv) {
    // Cria os elementos do formulário
    const form = updateInterfaceDiv.createElement('form');
    form.id = 'uploadForm';
    form.enctype = 'multipart/form-data';

    const label = updateInterfaceDiv.createElement('label');
    label.setAttribute('for', 'fileInput');
    label.textContent = 'Selecione o arquivo Excel:';

    const fileInput = updateInterfaceDiv.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'fileInput';
    fileInput.name = 'file';
    fileInput.accept = '.xlsx, .xls';
    fileInput.required = true;

    const submitButton = updateInterfaceDiv.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Enviar';

    const responseMessageDiv = updateInterfaceDiv.createElement('div');
    responseMessageDiv.id = 'responseMessage';

    // Adiciona os elementos ao formulário
    form.appendChild(label);
    form.appendChild(fileInput);
    form.appendChild(updateInterfaceDiv.createElement('br'));
    form.appendChild(updateInterfaceDiv.createElement('br'));
    form.appendChild(submitButton);
    updateInterfaceDiv.body.appendChild(form);
    updateInterfaceDiv.body.appendChild(responseMessageDiv);

    // Adiciona o evento de envio do formulário
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData();
        const fileInput = updateInterfaceDiv.getElementById('fileInput');
        
        // Verifique se o arquivo foi selecionado
        if (fileInput.files.length === 0) {
            updateInterfaceDiv.getElementById('responseMessage').innerText = "Por favor, selecione um arquivo!";
            return;
        }

        formData.append('file', fileInput.files[0]);

        // Envia o arquivo para o servidor usando fetch
        fetch('/api/upload/produtos', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                updateInterfaceDiv.getElementById('responseMessage').innerText = data.message;
            } else {
                updateInterfaceDiv.getElementById('responseMessage').innerText = "Erro ao enviar o arquivo.";
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            updateInterfaceDiv.getElementById('responseMessage').innerText = "Erro ao enviar o arquivo.";
        });
    });
}