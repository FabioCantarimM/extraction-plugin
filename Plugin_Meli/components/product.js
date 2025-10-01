function handleProductPage() {
    setTimeout(() => {
        insertGoogleMaterial()
        headerProductInfo()
    }, 1000)
}

function insertGoogleMaterial(){
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';

    // Adiciona o link ao <head> do documento
    document.head.appendChild(link);
}


function headerProductInfo(){
    const headerProduct = document.querySelector('div.ui-pdp-container__col.col-6.ui-pdp-container--breadcrumb-related')

    if (headerProduct) {   
        // Cria a nova div que ficará ao lado do h1
        const contentDiv = document.createElement('div');
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
            width: 100%;
            align-self: center;
            display: flex;
            justify-content: center;
        `;

        let concorrente = 'Sem Dados';
        let lprice = 'Sem Dados';
        let ic = 'Sem Dados';
        let todayS = 'Sem Dados';
        let weekS = 'Sem Dados';
        let monthS = 'Sem Dados';
        let dtInicio = 'Sem Dados';
        let dtFim = 'Sem Dados';
        let color = 'gray';
        let thrend = 'trending_up';

        contentDiv.innerHTML = `
            <div style="width:10%; height:100px; padding: 15px;border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;color: white;background-color: ${color};">${thrend}</i><br><span style="font-size: 9px; color: gray;">Panvel</span><br><span style="font-size: 10px;font-weight: 800;">Integrar</span></div>
            <div style="width:10%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;color: white;background-color: red;">trending_down</i><br><span style="font-size: 9px; color: gray;">Produtos</span><br><span style="font-size: 10px;font-weight: 800;">Integrar</span></div>
            <div style="width:10%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;color: white;background-color: green;">ssid_chart</i><br><span style="font-size: 9px; color: gray;">IC</span><br><span style="font-size: 10px;font-weight: 800;">Integrar</span></div>
            <div style="width:10%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas hoje</span><br><span style="font-size: 10px;font-weight: 800;">Integrar</span></div>
            <div style="width:10%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas s-1</span><br><span style="font-size: 10px;font-weight: 800;">Integrar</span></div>
            <div style="width:10%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">attach_money</i><br><span style="font-size: 9px; color: gray;">Vendas mês</span><br><span style="font-size: 10px;font-weight: 800;">Integrar</span></div>
            <div style="width:10%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">event_available</i><br><span style="font-size: 9px; color: gray;">Início da Oferta</span><br><span style="font-size: 10px;font-weight: 800;">Integrar</span></div>
            <div style="width:10%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">event_busy</i><br><span style="font-size: 9px; color: gray;">Fim da Oferta</span><br><span style="font-size: 10px;font-weight: 800;">Integrar</span></div>
            <div style="width:10%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">groups_2</i><br><span style="font-size: 9px; color: gray;">Volume de Visitas</span><br><span style="font-size: 10px;font-weight: 800;">Integrar</span></div>
            <div style="width:10%; height:100px; padding: 15px; margin-left:10px; border-radius: 10px;background-color: #FFF;border: 1px solid rgb(204, 204, 204);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;color: rgb(51, 51, 51);align-self: center;display: block;text-align: center; overflow-wrap: break-word;"><i class="material-icons" style="font-size: 25px !important;!i;!;!;font-weight: 800 !important;!i;!;">trending_up</i><br><span style="font-size: 9px; color: gray;">Taxa de conversão</span><br><span style="font-size: 10px;font-weight: 800;">${'Integrar'}</span></div>
        `;

        headerProduct.appendChild(contentDiv);
        headerProduct.appendChild(document.createElement('br'));
    } else {
        console.log("Elemento h1 não encontrado.");
    }
}