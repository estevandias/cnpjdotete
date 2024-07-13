// script.js
const form = document.getElementById('cnpjForm');
const cnpjInput = document.getElementById('cnpjInput');
const resultContainer = document.getElementById('resultContainer');
const resultList = document.getElementById('resultList');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let cnpj = cnpjInput.value.trim();

    // Remove pontos e traços do CNPJ
    cnpj = cnpj.replace(/[.-]/g, '');

    // URL da API do BrasilAPI para consulta de CNPJ
    const apiUrl = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Verificar no console os dados recebidos da API

            // Limpa resultados anteriores
            resultList.innerHTML = '';

            // Definir os campos desejados e seus rótulos
            const fields = [
                { label: 'CNPJ', key: 'cnpj' },
                { label: 'Nome Empresarial', key: 'razao_social' },
                { label: 'Nome Fantasia', key: 'nome_fantasia' },
                { label: 'CEP', key: 'cep' },
                { label: 'Logradouro', key: 'logradouro' },
                { label: 'Número', key: 'numero' },
                { label: 'Bairro', key: 'bairro' },
                { label: 'Município', key: 'municipio' },
                { label: 'UF', key: 'uf' },
                { label: 'Email', key: 'email' },
                { label: 'Telefone', key: 'telefone' }
            ];

            // Percorre os campos definidos e adiciona à lista de resultados
            fields.forEach(field => {
                const listItem = document.createElement('li');
                if (data[field.key]) {
                    listItem.innerHTML = `<strong>${field.label}:</strong> ${data[field.key]}`;
                } else {
                    listItem.innerHTML = `<strong>${field.label}:</strong> Não disponível`;
                }
                resultList.appendChild(listItem);
            });

            // Mostra o container de resultados
            resultContainer.classList.remove('hidden');
        })
        .catch(error => {
            console.error('Erro ao buscar CNPJ:', error);
            alert('Erro ao buscar CNPJ. Verifique se o CNPJ está correto e tente novamente.');
        });
});
