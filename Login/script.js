//Lista de credenciais predefinidas (usuário e senha)
const predefinedCredentials = [
    { username: "usuario1", password: "senha1" },
    { username: "usuario2", password: "senha2" }
];
//Função de login
function login () {
    //Captura do valor do campo de nome de usuário
    const username = document.querySelector("#usuario").value;
    //Captura do valor do campo de senha
    const password = document.querySelector("#senha").value;

    //Verificação se o nome de usuário e senha correspondem a um usuário predefinido
    const matchedUser = predefinedCredentials.find(user => user.username === username && user.password === password);
    //Se um usuário correspondente for encontrado
    if (matchedUser) {
        console.log('usuarios encontrados')
        //Criação de objeto de usuário para armazenar no armazenamento local
        const usuario = {
            nome:username,
        }
        //Armazenamento do objeto de usuário no armazenamento local
        localStorage.setItem('usuario', JSON.stringify(usuario))
        //Redirecionamento para a página de Despesas
        window.location = "/Despesas/";
    } else {
        //Se não for encontrada uma correspondência, exibi alerta
        alert("Credenciais inválidas. Tente novamente.");
    }
}