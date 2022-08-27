let nome;
let menuParticipantes = [];
let menuMensagens = [];

//Função para coletar o nome do usuário

function adicionarSeuNome(){
   nome = prompt("Qual seu nome?");
   while( nome== ""){
    alert("Nome inválido")
    nome = prompt("Qual seu nome?")
   }
   alert("Seja bem-vindo(a) " + nome +"!");
    
}
adicionarSeuNome();

//Função para Adicionar o nome do usuário ao servidor de participantes

function adicionarNomeAoServidor(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",{
        name: `${nome}`}
    )
    }
    adicionarNomeAoServidor();

//Função para manter a conexão com o site

function manterConexao(){
    const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {
        name: `${nome}`}
        )
        ;
    console.log(manterConexao);
}

setInterval(manterConexao, 4000);

//Função para buscar as mensagens do servidor 
const verMensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
verMensagens.then(buscarMensagens);

function buscarMensagens(listaMensagens){
    //console.log("Mensagens Chegaram")
    //console.table(listaMensagens.data);
    menuMensagens = listaMensagens.data;
    renderizarMensagens();
}
setInterval(()=>{const verMensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
verMensagens.then(buscarMensagens);}, 2000);

//Função para renderizar as mensagens 

function renderizarMensagens(){
    const ul = document.querySelector(".menuMensagens");
    
    ul.innerHTML = "";
    
    for(let i = 0; i < menuMensagens.length;i++){

        ul.innerHTML +=`<li class="formatoMensagem">
        ${menuMensagens[i].time} ${menuMensagens[i].from} ${menuMensagens[i].text}

        </li>`;
       
    }
    
    
}


//Função para Enviar Mensagens

const textoMensagem = document.querySelector(".menubot textoDigitado")
textoMensagem.then(enviarMensagens)

function enviarMensagens(){

        const Mensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",{
        from: `${nome}`,
	    to: "Todos",
	    text: textoMensagem.value,
	    type: "message"
    })

    
}
















// Bonus 

    //Função para ver os participantes do site

const verParticipantes = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
verParticipantes.then(verParticipantesDisponivel);

function verParticipantesDisponivel(listaParticipantes){
    
    //console.log("dados chegaram")
    //console.log(listaParticipantes.data);
    menuParticipantes = listaParticipantes.data;
    renderizarParticipantes();
    //console.log(renderizarParticipantes)
}

setInterval(()=>{const verParticipantes = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
verParticipantes.then(verParticipantesDisponivel);}, 2000);



//Função para renderizar os participantes na tela   

function renderizarParticipantes(){
    const ul = document.querySelector(".menuParticipantes");
    ul.innerHTML = "";

    for(let i = 0; i < menuParticipantes.length;i++){

        ul.innerHTML +=`<li>
        ${menuParticipantes[i].name}

        </li>`;
       
    }
}


/*function onOff(){
    const ligar = document.querySelector('.AbaParticipantes');
    
        if ('.AbaParticipantes' == null) {
            '.AbaParticipantes'.classList.add('ligado');
        }
         const clicarP = document.querySelector(ligar);
        }

        */