class Personagem {
    constructor(nome, descricao, imagem) {
        this.nome = nome;
        this.descricao = descricao;
        this.imagem = imagem;
        this.pontuacao = 0;
    }

    adicionarPontos(pontos) {
        this.pontuacao += pontos;
    }

    zerarPontuacao() {
        this.pontuacao = 0;
    }
}

const edward = new Personagem(
    "Edward Cullen", 
    "Você é misterioso, protetor e valoriza a lógica. Tem um gosto clássico e muitas vezes tenta carregar o peso do mundo nas costas.", 
    "img/edward-cullen.jpg"
);

const bella = new Personagem(
    "Bella Swan", 
    "Você é observadora, empática e incrivelmente corajosa quando se trata de proteger quem ama. Tem uma força interior imensa.", 
    "img/bella-swan.jpg"
);

const jacob = new Personagem(
    "Jacob Black", 
    "Você é leal, caloroso e impulsivo. Adora estar ao ar livre, valoriza muito a amizade e tem um espírito livre e protetor.", 
    "img/jacob-black.jpg"
);

const personagens = [edward, bella, jacob];

class Opcao {
    constructor(texto, pontosEdward, pontosBella, pontosJacob) {
        this.texto = texto;
        this.pontos = [pontosEdward, pontosBella, pontosJacob];
    }
}

class Pergunta {
    constructor(enunciado, opcoes) {
        this.enunciado = enunciado;
        this.opcoes = opcoes;
    }
}

const questionario = [
    new Pergunta("Qual é o seu clima ideal?", [
        new Opcao("Chuvoso e nublado, perfeito para ficar em casa.", 3, 2, 1),
        new Opcao("Frio, mas não me importo se estiver com as pessoas certas.", 1, 3, 2),
        new Opcao("Ensolarado e quente, ótimo para atividades ao ar livre.", 1, 2, 3)
    ]),
    new Pergunta("Como você lida com os problemas?", [
        new Opcao("Analiso tudo friamente e tomo a decisão mais segura.", 3, 1, 2),
        new Opcao("Sigo minha intuição, mesmo que pareça perigoso.", 2, 3, 1),
        new Opcao("Enfrento de frente, usando a força ou a emoção do momento.", 1, 2, 3)
    ]),
    new Pergunta("Qual o seu meio de transporte favorito?", [
        new Opcao("Um carro prateado super rápido e moderno.", 3, 1, 2),
        new Opcao("Uma picape antiga, mas confiável.", 1, 3, 2),
        new Opcao("Uma moto barulhenta e veloz.", 1, 2, 3)
    ]),
    new Pergunta("O que você mais valoriza em um relacionamento?", [
        new Opcao("Proteção e lealdade eterna.", 3, 2, 1),
        new Opcao("Conexão profunda e aceitação do que eu sou.", 2, 3, 1),
        new Opcao("Amizade verdadeira, calor humano e diversão.", 1, 2, 3)
    ]),
    new Pergunta("Se descobrisse um segredo perigoso de um amigo, o que faria?", [
        new Opcao("Guardaria para mim e tentaria protegê-lo das sombras.", 3, 1, 2),
        new Opcao("Apoiaria meu amigo incondicionalmente, não importa o que seja.", 2, 3, 1),
        new Opcao("Ficaria bravo no início, mas faria de tudo para ajudar depois.", 1, 2, 3)
    ]),
    new Pergunta("Qual seria o seu encontro ideal?", [
        new Opcao("Ouvir música clássica e ter conversas profundas.", 3, 2, 1),
        new Opcao("Ler um livro juntos ou um passeio tranquilo na floresta.", 2, 3, 1),
        new Opcao("Fazer uma fogueira na praia com os amigos.", 1, 2, 3)
    ]),
    new Pergunta("Como as pessoas costumam te descrever?", [
        new Opcao("Misterioso(a) e com gostos antiquados.", 3, 1, 2),
        new Opcao("Um pouco desastrado(a), mas com um bom coração.", 1, 3, 2),
        new Opcao("Extrovertido(a), esquentadinho(a) e confiável.", 2, 1, 3)
    ]),
    new Pergunta("Qual a sua cor favorita entre essas?", [
        new Opcao("Prata ou tons escuros e sóbrios.", 3, 2, 1),
        new Opcao("Azul profundo ou verde floresta.", 2, 3, 1),
        new Opcao("Vermelho, laranja ou tons terrosos quentes.", 1, 2, 3)
    ]),
    new Pergunta("O que você costuma fazer no seu tempo livre?", [
        new Opcao("Toco algum instrumento ou pesquiso sobre história/arte.", 3, 2, 1),
        new Opcao("Leio meus livros favoritos repetidas vezes.", 2, 3, 1),
        new Opcao("Conserto coisas ou pratico esportes intensos.", 1, 2, 3)
    ]),
    new Pergunta("Diante de uma ameaça iminente, qual é a sua principal defesa?", [
        new Opcao("Minha inteligência, velocidade e leitura do ambiente.", 3, 1, 2),
        new Opcao("Minha mente fechada para manipulações e minha teimosia.", 2, 3, 1),
        new Opcao("Minha força física e o apoio da minha equipe/bando.", 1, 2, 3)
    ])
];

let respostasUsuario = [];
let perguntaAtual = 0;
const totalPerguntas = 10;

const telas = {
    home: null,
    quiz: null,
    resultados: []
};

const inicializarTelas = () => {
    telas.home = document.getElementById('home-screen');
    
    const todasQuizScreens = document.querySelectorAll('#quiz-screen');
    telas.quiz = todasQuizScreens;
    
    telas.resultados = document.querySelectorAll('#result-screen');
    
    esconderTodasTelas();
    if (telas.home) telas.home.style.display = 'block';
};

const esconderTodasTelas = () => {
    if (telas.home) telas.home.style.display = 'none';
    
    telas.quiz.forEach(tela => {
        if (tela) tela.style.display = 'none';
    });
    
    telas.resultados.forEach(tela => {
        if (tela) tela.style.display = 'none';
    });
};

const mostrarPergunta = (indice) => {
    esconderTodasTelas();
    
    if (telas.quiz[indice]) {
        telas.quiz[indice].style.display = 'block';
        perguntaAtual = indice;
        
        const titulo = telas.quiz[indice].querySelector('h2');
        if (titulo) {
            titulo.textContent = `Pergunta ${indice + 1}: ${questionario[indice].enunciado}`;
        }
    }
};

const coletarResposta = (indicePergunta) => {
    const telaAtual = telas.quiz[indicePergunta];
    if (!telaAtual) return null;
    
    const radios = telaAtual.querySelectorAll('input[type="radio"]');
    let radioSelecionado = null;
    
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            radioSelecionado = radios[i];
            break;
        }
    }
    
    if (!radioSelecionado) return null;
    
    return radioSelecionado.value;
};

const salvarResposta = (indicePergunta, valorResposta) => {
    const letraParaIndice = { 'A': 0, 'B': 1, 'C': 2 };
    const indiceOpcao = letraParaIndice[valorResposta];
    const pergunta = questionario[indicePergunta];
    const opcao = pergunta.opcoes[indiceOpcao];
    
    if (opcao) {
        edward.adicionarPontos(opcao.pontos[0]);
        bella.adicionarPontos(opcao.pontos[1]);
        jacob.adicionarPontos(opcao.pontos[2]);
    }
};

const calcularVencedor = () => {
    let maiorPontuacao = -1;
    let vencedor = null;
    let pontuacoes = {
        edward: edward.pontuacao,
        bella: bella.pontuacao,
        jacob: jacob.pontuacao
    };
    
    if (edward.pontuacao > maiorPontuacao) {
        maiorPontuacao = edward.pontuacao;
        vencedor = 'edward';
    }
    if (bella.pontuacao > maiorPontuacao) {
        maiorPontuacao = bella.pontuacao;
        vencedor = 'bella';
    }
    if (jacob.pontuacao > maiorPontuacao) {
        maiorPontuacao = jacob.pontuacao;
        vencedor = 'jacob';
    }
    
    return { vencedor, pontuacoes };
};

const mostrarResultado = () => {
    const { vencedor, pontuacoes } = calcularVencedor();
    
    esconderTodasTelas();
    
    let indiceResultado = 0;
    if (vencedor === 'edward') indiceResultado = 1;
    else if (vencedor === 'jacob') indiceResultado = 2;
    
    const telaResultado = telas.resultados[indiceResultado];
    if (telaResultado) {
        telaResultado.style.display = 'block';
        
        const spanPontos = telaResultado.querySelector('span');
        if (spanPontos) {
            spanPontos.textContent = pontuacoes[vencedor];
        }
        
        const tituloPersonagem = telaResultado.querySelector('h1');
        if (tituloPersonagem && vencedor === 'edward') tituloPersonagem.textContent = "Edward Cullen";
        if (tituloPersonagem && vencedor === 'bella') tituloPersonagem.textContent = "Bella Swan";
        if (tituloPersonagem && vencedor === 'jacob') tituloPersonagem.textContent = "Jacob Black";
    }
};

const avancarParaProximaPergunta = () => {
    const resposta = coletarResposta(perguntaAtual);
    
    if (!resposta) {
        alert('Por favor, selecione uma opção antes de continuar!');
        return false;
    }
    
    salvarResposta(perguntaAtual, resposta);
    
    if (perguntaAtual + 1 < totalPerguntas) {
        mostrarPergunta(perguntaAtual + 1);
    } else {
        mostrarResultado();
    }
    
    return true;
};

const reiniciarJogo = () => {
    respostasUsuario = [];
    perguntaAtual = 0;
    
    edward.zerarPontuacao();
    bella.zerarPontuacao();
    jacob.zerarPontuacao();
    
    telas.quiz.forEach(tela => {
        const radios = tela.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.checked = false;
        });
    });
    
    esconderTodasTelas();
    if (telas.home) telas.home.style.display = 'block';
};

const configurarEventos = () => {
    const botaoIniciar = document.querySelector('#home-screen button');
    if (botaoIniciar) {
        const novoBotao = botaoIniciar.cloneNode(true);
        botaoIniciar.parentNode.replaceChild(novoBotao, botaoIniciar);
        novoBotao.addEventListener('click', () => {
            reiniciarJogo();
            mostrarPergunta(0);
        });
    }
    
    telas.quiz.forEach((tela, indice) => {
        const radios = tela.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            const novoRadio = radio.cloneNode(true);
            radio.parentNode.replaceChild(novoRadio, radio);
            novoRadio.addEventListener('change', () => {
                if (indice === perguntaAtual) {
                    avancarParaProximaPergunta();
                }
            });
        });
    });
    
    telas.resultados.forEach(tela => {
        const botaoTentar = tela.querySelector('button');
        if (botaoTentar) {
            const novoBotao = botaoTentar.cloneNode(true);
            botaoTentar.parentNode.replaceChild(novoBotao, botaoTentar);
            novoBotao.addEventListener('click', reiniciarJogo);
        }
    });
};

const initQuiz = () => {
    inicializarTelas();
    configurarEventos();
};

window.addEventListener('DOMContentLoaded', initQuiz);

let perguntaAtual = 0;

const iniciarJogo = () => { // arrow fuction 
    document.getElementById('home-screen').classList.add('hidden'); 
    document.getElementById('quiz-screen').classList.remove('hidden');

    personagens.forEach(p => p.zerarPontuacao()); 
    perguntaAtual = 0;

    renderizarPergunta();
}

const renderizarPergunta = () => {
    const pergunta = questionario[perguntaAtual] 
    const alternativas = document.getElementById('container-opcoes'); 

    titulo.innerHTML = `Pergunta ${perguntaAtual + 1}: ${pergunta.enunciado}`; 
    

    alternativas.innerHTML = '';  

 pergunta.opcoes.forEach((opcao, i) => { 
        
        const div = document.createElement('div'); 
       
        div.innerHTML = `
            <input type="radio" name="pergunta" id="op${i}" value="${i}"> 
            <label for="op${i}">${opcao.texto}</label>
        `;
        alternativas.appendChild(div);
    });
};
 
const proximaPergunta = () => {

    const selecionado = document.querySelector('input[name="pergunta"]:checked'); // serve para descobri qual das 3 opções o usuario clicou 

    if (!selecionado){
        alert("Selecione uma opção!");
        return;
    }

   const indiceOpcao = selecionado.value  
   const opcaoResposta = questionario[perguntaAtual].opcoes[indiceOpcao]; 
personagens[0].adicionarPontos(opcaoResposta.pontos[0]);
personagens[1].adicionarPontos(opcaoResposta.pontos[1]);
personagens[2].adicionarPontos(opcaoResposta.pontos[2]);

perguntaAtual++;

if (perguntaAtual < questionario.length) { 
    renderizarPergunta();

} else{ 
    document.getElementById('quiz-screen').classList.add('hidden');

     }
}