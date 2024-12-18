import { getItensBD, insertItem, Sair, loadItens, nome_usuario} from "../Controllers/funcoes.js";

//Botão sair
document.querySelector("#btn_sair").addEventListener("click", () => {
    Sair();
});

const monthPicker = document.querySelector("#monthPicker");

let mesSelecionado;

//Carregar funções ao carregara página
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('btn1').addEventListener('click', function () {
        window.location.href = '/Despesas/';
    });

    document.getElementById('btn2').addEventListener('click', function () {
        window.location.href = '/DespesasPeriodo/';
    });

    document.querySelector("#nome-usuario").textContent = nome_usuario;

    document.querySelector("#btnFiltrarMes").addEventListener("click", () => {
        filtrar();
    });

    monthPicker.addEventListener("input", (event) => {
        mesSelecionado = event.target.value;
    })
});

//Filtrar despesas por mês;
const filtrar = () => {
    if (mesSelecionado != "" && mesSelecionado != null && mesSelecionado != undefined) {
        const dataFormatada = '${mesSelecionado.substr(5, 2)}/${mesSelecionado.subtr(0, 4)}';
        const itens =getItensBD();
        const itensFiltrados = itens.filter((item) => item.data.indexOf(dataFormatada) > -1);

        if (itensFiltrados.length === 0) {
            document.querySelector("tbody").innerHTML = "Nenhum dado encontrado";
        } else {
            document.querySelector("tbody").innerHTML = "";
            itensFiltrados.forEach((item) => {
                insertItem(item, null);
            });
        }

        //Calcula o total de entradas,saidas e total
        getTotals(itensFiltrados);
    } else {

    }
}

//Funçao para calcular o total de entradas, saidas e total
function getTotals(items) {
    const amountIncomes = items.filter((item) => item.type === "Entrada").map((transaction) => Number(transaction.amount));
    const amountExpenses = items.filter((item) => item.type === "Saída").map((transaction) => Number(transaction.amount));

    const totalIncomes = amountIncomes.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const totalExpenses = amountExpenses.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const totalItems = (totalIncomes - totalExpenses).toFixed(2);

    document.querySelector(".incomes").innerHTML = totalIncomes;
    document.querySelector(".expenses").innerHTML = totalExpenses;
    document.querySelector(".total").innerHTML = totalItems;
}