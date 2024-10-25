//Dupliquei essa função porque não consigo chamar o search passando parametros, por isso foi necessário refazer a função aqui.
function handleProductCategoryPage() {
    setTimeout(() => {
        handleSearchPage()
    },3000)
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
            width: 65%;
            align-self: center;
            display: flex;
            justify-content: center;
        `;

        categoryPath = categories.join("-");
            
            contentDiv.innerHTML = `
                <div style="width:14%; height:100px; padding: 15px;border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><img src="https://cdn-icons-png.flaticon.com/128/8296/8296673.png" style="width: 20px;"><br><span style="font-size: 9px; color: gray;">Produtos</span><br><br><span style="font-size: 12px;font-weight: 800;">${categories[0] || 'N/D'}</span></div>
                <div style="width:14%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><img src="https://cdn-icons-png.flaticon.com/128/87/87112.png" style="width: 20px;"><br><span style="font-size: 9px; color: gray;">IC</span><br><br><span style="font-size: 12px;font-weight: 800;">${categories[1] || 'N/D'}</span></div>
                <div style="width:14%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><img src="https://cdn-icons-png.flaticon.com/128/1194/1194711.png" style="width: 20px;"><br><span style="font-size: 9px; color: gray;">Vendas Hoje</span><br><br><span style="font-size: 12px;font-weight: 800;">${categories[2] || 'N/D'}</span></div>
                <div style="width:14%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><img src="https://cdn-icons-png.flaticon.com/128/1194/1194711.png" style="width: 20px;"><br><span style="font-size: 9px; color: gray;">Vendas S-1</span><br><br><span style="font-size: 12px;font-weight: 800;">${categories[3] || 'N/D'}</span></div>
                <div style="width:14%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><img src="https://cdn-icons-png.flaticon.com/128/1194/1194711.png" style="width: 20px;"><br><span style="font-size: 9px; color: gray;">Vendas mês</span><br><br><span style="font-size: 12px;font-weight: 800;">${categories[4] || 'N/D'}</span></div>
                <div style="width:14%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><img src="https://cdn-icons-png.flaticon.com/128/520/520647.png" style="width: 20px;"><br><span style="font-size: 9px; color: gray;">Volume de visitas</span><br><br><span style="font-size: 12px;font-weight: 800;">${categories[5] || 'N/D'}</span></div>
                <div style="width:14%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><img src="https://cdn-icons-png.flaticon.com/128/9053/9053198.png" style="width: 20px;"><br><span style="font-size: 9px; color: gray;">Taxa de conversão</span><br><br><span style="font-size: 12px;font-weight: 800;">${categories[6] || 'N/D'}</span></div>
            `;

            // Insere a nova div dentro do container ao lado do h1
            containerDiv.appendChild(contentDiv);
        } else {
            console.log("Elemento h1 não encontrado.");
        }
        handleProductCategoryPage();
    }, 5000)
}