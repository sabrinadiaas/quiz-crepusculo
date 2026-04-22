
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