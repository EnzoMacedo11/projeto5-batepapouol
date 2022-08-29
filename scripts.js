let nome;
let menuParticipantes = [];
let menuMensagens = [];
//Função para coletar o nome do usuário

function adicionarSeuNome() {
  nome = prompt("Qual seu nome?");
  while (nome == "") {
    alert("Nome inválido");
    nome = prompt("Qual seu nome?");
  }
  alert("Seja bem-vindo(a) " + nome + "!");
}
adicionarSeuNome();

//Função para Adicionar o nome do usuário ao servidor de participantes

function adicionarNomeAoServidor() {
  let enviarNome = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants",
    {
      name: `${nome}`,
    }
  );
  enviarNome.then();
  enviarNome.catch(erroNome);
}
adicionarNomeAoServidor();

//Função Para caso exista o nome

function erroNome() {
  alert("Esse nome já foi utilizado, por favor, digite um nome diferente");
  nome = prompt("Qual seu nome?");
}

//Função para manter a conexão com o site

function manterConexao() {
  const promisse = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/status",
    {
      name: `${nome}`,
    }
  );

  console.log(manterConexao);
  promisse.catch(erroMensagem);
}

setInterval(manterConexao, 5000);

//Função para buscar as mensagens do servidor
const verMensagens = axios.get(
  "https://mock-api.driven.com.br/api/v6/uol/messages"
);
verMensagens.then(buscarMensagens);

function buscarMensagens(listaMensagens) {
  //console.log("Mensagens Chegaram")
  //console.table(listaMensagens.data);
  menuMensagens = listaMensagens.data;
  renderizarMensagens();
  scrollarNaUltimaMensagem();
  console.log(menuMensagens);
}
setInterval(() => {
  const verMensagens = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );
  verMensagens.then(buscarMensagens);
}, 3000);

//Função para renderizar as mensagens

function renderizarMensagens() {
  const ul = document.querySelector(".menuMensagens");
  //const type = menuMensagens[i].type;
  ul.innerHTML = "";

  for (let i = 0; i < menuMensagens.length; i++) {
    const elemento = menuMensagens[i];
    if (elemento.type === "status") {
      ul.innerHTML += `<li class="formatoMensagemStatus">
            <p>(${menuMensagens[i].time}) <strong>${menuMensagens[i].from} </strong> para <strong> ${menuMensagens[i].to}</strong>: ${menuMensagens[i].text}</p>
      
            </li>`;
    } else if (elemento.type === "message") {
      ul.innerHTML += `<li class="formatoMensagem">
      <p>(${menuMensagens[i].time}) <strong> ${menuMensagens[i].from} </strong> para <strong> ${menuMensagens[i].to}</strong>: ${menuMensagens[i].text}</p>

      </li>`;
    } else if (elemento.to === nome) {
      ul.innerHTML += `<li class="formatoMensagemPrivada">
      <p>(${menuMensagens[i].time}) <strong> ${menuMensagens[i].from} </strong> para <strong> ${menuMensagens[i].to}</strong>: ${menuMensagens[i].text}</p>

      </li>`;
    }
  }
}

//Função para Enviar Mensagens

function enviarMensagens() {
  const input = document.querySelector(".menubot .textoDigitado");
  const textoMensagem = input.value;

  const Mensagem = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/messages",
    {
      from: `${nome}`,
      to: "Todos",
      text: ": " + textoMensagem,
      type: "message",
    }
  );
  Mensagem.then(buscarMensagens);
  Mensagem.catch(erroMensagem);
  input.value = "";
}

//Função para Erro de enviar mensagem
function erroMensagem() {
  alert("O seu usuário foi desconectado,a página será atualizada");
  window.location.reload();
}

//Scrollar para  ultima mensagem

function scrollarNaUltimaMensagem() {
  const scrollar = document.querySelector(".menuMensagens");
  const ultimaMensagem = scrollar.lastElementChild;
  ultimaMensagem.scrollIntoView();
}

// Bonus

//Função para ver os participantes do site

const verParticipantes = axios.get(
  "https://mock-api.driven.com.br/api/v6/uol/participants"
);
verParticipantes.then(verParticipantesDisponivel);

function verParticipantesDisponivel(listaParticipantes) {
  //console.log("dados chegaram")
  //console.log(listaParticipantes.data);
  menuParticipantes = listaParticipantes.data;
  renderizarParticipantes();
  //console.log(renderizarParticipantes)
}

setInterval(() => {
  const verParticipantes = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/participants"
  );
  verParticipantes.then(verParticipantesDisponivel);
}, 2000);

//Função para renderizar os participantes na tela

function renderizarParticipantes() {
  const ul = document.querySelector(".menuParticipantes");
  ul.innerHTML = "";

  for (let i = 0; i < menuParticipantes.length; i++) {
    ul.innerHTML += `<li>
        ${menuParticipantes[i].name}

        </li>`;
  }
}
