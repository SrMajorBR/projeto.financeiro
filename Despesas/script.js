//Selecionando elementos do DOM
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const data = document.querySelector("#data");
const btnNew = document.querySelector("#btnNew");

//Botão sair
document.querySelector("#btn_sair").addEventListener("click", () => {
    Sair();
})

//Função que é executada ao clicar no botão incluir
btnNew.onclick = () => {

    const itens = getItensBD();

//Verifica se todos os campos foram preenchidos
    if(descItem.value === "" || amount.value === "" || type.value === "" || data.value === "") {
        return alet ("Preencha todos os campos!");
    }
    //Adicionadno novo item ao array items
    itens.push({
        desc: descItem.value,
        amount: Math.abs(amount.value).toFixed(2),
        type: type.value,
        data: new Date(data.value).toLocaleDateString() //Armazena a data como um objeto date
    });

    //Atualizando o armazenamento local
    setItensBD(itens);
    //Recarregando a lista de itens na tabela
    loadItens();
    //Limpando campos de entrada
    descItem.value ="";
    amount.value = "";
};

//Funções que serão iniciadas ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('btn1').addEventListener('click', function () {
        window.location.href = '/Despesas/';
    });

    document.getElementById('btn2').addEventListener('click', function () {
        window.location.href = '/DespesasPeriodo';
    });
    //Carregando itens ao carrega a página
    loadItens();
});