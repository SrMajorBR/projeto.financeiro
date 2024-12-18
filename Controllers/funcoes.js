//Variável gobla para armazenar o nome do usuário
export let nome_usuario;
//Seleção de Elementos DOM
const tbody = document.querySelector("tbody");
const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");

//Evento 'DOMContentLoaded' é usado para realizar ações após o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {
	//Obtem o nome do usuário armazenado no localStorage
	nome_usuario = JSON.parse(localStorage.getItem("usuario"))?.nome;
	//Redirecionar para a pagina de login se o usuário não estiver autenticado
	if (nome_usuario == "" || nome_usuario == null) {
		window.location = '/Login/';
		return
	}

	// Atualizar o nome do usuário na interface
	document.querySelector("#nome-usuario").textContent = nome_usuario;

});

//Função para buscar itens no armazenamento local
export const getItensBD = () => {
	return JSON.parse(localStorage.getItem(nome_usuario)) ?? [];
}

//Função para salvar itens no armazenamento local
export const setItensBD = (itens) => {
	localStorage.setItem(nome_usuario, JSON.stringify(itens));
}

//Função para fazer logout
export const Sair = () => {
	localStorage.removeItem('usuario');
	window.location = '/Login/';
}

//Função para carregar os itens na tabela
export const loadItens = () => {

	//Carreganddo itens do armazenamento local
	const itens = getItensBD();
	//Limpar o conteúdo da tabela antes de inserir novos itens
	tbody.innerHTML = "";
	//Iterar sobre os itens e inseri-los na tabela
	itens.forEach((item, index) => {
		insertItem(item, index);
	});

	//Atualizando totais na tabela
	getTotals();
}

//Função para inserir um item na tabela
export const insertItem = (item, index) => {
	//Criar uma nova linha na tabela
	let tr = document.createElement("tr");

	// Descrição
	let desc_td = document.createElement("td");
	desc_td.textContent = item.desc;
	tr.appendChild(desc_td);

	// valor
	let valor_td = document.createElement("td");
	valor_td.textContent = item.amount;
	tr.appendChild(valor_td);

	// Tipo
	let tipo_td = document.createElement("td");
	tipo_td.className = "columnType";

	//Adiciona um ícone de seta para cima ou para baixo com base no tipo de transação (entrada ou saída)
	tipo_td.innerHTML = item.type === "Entrada" ? `<i class="bxs-chevron-down-circle"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 13.586L7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707l-1.414-1.414z"></path></svg></i>`
		: `<i class="bxs-chevron-up-circle"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m6.293 13.293l1.414 1.414L12 10.414l4.293 4.293l1.414-1.414L12 7.586z"></path></svg></i>`
	tipo_td.style.display = "flex";
	tipo_td.style.justifyContent = "center";
	// tipo
	tr.appendChild(tipo_td);

	// Data
	let data_td = document.createElement("td");
	data_td.textContent = item.data;
	tr.appendChild(data_td);

	if (index != null) {
		// Ação
		let action_td = document.createElement("td");
		action_td.className = "columnAction";
		let button = document.createElement("button");
		button.onclick = () => { deleteItem(index) };
		button.title = "Deletar item";
		button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path fill="currentColor" d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>`;
		action_td.appendChild(button);
		tr.appendChild(action_td);
	}

	tbody.appendChild(tr);
}

//Função para calcular totais
function getTotals() {
	const itens = getItensBD();

	//Filtrando o calculando entradas e saidas
	const amountIncomes = itens
		.filter((item) => item.type === "Entrada")
		.map((transaction) => Number(transaction.amount));

	const amountExpenses = itens
		.filter((item) => item.type === "Saída")
		.map((transaction) => Number(transaction.amount));
	//Calculando totais
	const totalIncomes = amountIncomes
		.reduce((acc, cur) => acc + cur, 0)
		.toFixed(2);

	const totalExpenses = Math.abs(
		amountExpenses.reduce((acc, cur) => acc + cur, 0)
	).toFixed(2);

	const totalItems = (totalIncomes - totalExpenses).toFixed(2);
	//Atualizando valores na interface
	incomes.innerHTML = totalIncomes;
	expenses.innerHTML = totalExpenses;
	total.innerHTML = totalItems;
}

//Função para excluir um item
const deleteItem = (index) => {
	let itens = getItensBD();
	//Remove o item pelo índice
	itens.splice(index, 1);
	//Atualizar o armazenamento local e recarregar a tabela
	setItensBD(itens);
	loadItens();
}