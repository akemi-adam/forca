    
    //Variables

var letterChecker = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]; //Array boolean que ser de referência das letras para saber se elas já foram escolhidas ou não
var matchProgress = false; //Variável responsável por dizer se a partida está em andamento ou não
var insertWord = false; //Variável responsável por dizer se a palavra já foi inserida
var win = false; //Variável que indica vitória
var stopMusic = false; //Variável responsável para parar a música
var wordArray = []; //Array que vai armazenar em caracteres a string passada no input
var encodedArray = []; //Array da palavra codificada
var errorCont = 0; //Contador de tentativas falhas do usuário
const msc = new Audio('Musics/Et Voila - Chris Haugen.mp3'); //Objeto que vai tocar a música

    //Functions

function setLetter(letter, key) { //Função que define a letra clicada
    if (insertWord) { //Verifica se a palavra já foi digitada
        if (letterChecker[key]) { //Verifica se a letra já foi inserida
            alert('Essa letra já foi inserida!\nPor favor, insira outra');
        }
        else {
            letterFound = false; //Variável para saber se a letra existe na palavra ou não
            for (let i = 0; i < encodedArray.length; i++) { //Percorre o array da palavra e setta a letra no array codificado caso ela exista
                if (letter == wordArray[i]) {    
                    encodedArray[i] = letter;
                    letterFound = true; //Indica que a letra foi encontrada
                }
            }
            if (!letterFound) { //Caso em que a letra não foi encontrada
                alert('Letra não encontrada na palavra');
                errorCont++; //Variável responsável por saber quantas vezes o usuário errou
                uptadeImage(errorCont); //errorCont incrementa 1 e é passado como parâmetro de uptadeImage
            }
            else { //Caso em que a letra foi encontrada
                for (let i = 0; i < encodedArray.length; i++) {
                    if (encodedArray[i] == wordArray[i]) { //Verifica se os arrays (encodedArray e wordAArray) são iguais
                        win = true; //Setta win como true
                    }
                }
                for (let i = 0; i < encodedArray.length; i++) { //Verifica se os arrays são diferentes
                    if (encodedArray[i] != wordArray[i]) {
                        win = false; //Setta win como false
                    }                    
                }
                if (win) { //Verifica se o usuário ganhou caso win tenha valor verdadeiro
                    printCodedWord(encodedArray); //Printa a palavra completa
                    setTimeout(function(){ //Depois de 5 segundos chama a função gameWin()
                        gameWin();
                    }, 1000);
                }
                else { //Caso em que o usuário não ganhou o jogo mas acertou a palavra
                    printCodedWord(encodedArray); //Printa o que o usuário acertou da decodificação da palavra
                }
            }
            letterChecker[key] =  true; //Seta o indice associado a letra pressionada como true e impede dela ser apertada novamente
        }
    }
    else { //Caso em que nenhuma palavra foi digita e o usuário tenta clicar algo
        alert('Insira uma palavra!')
    }
}

function encodeWord() { //Função responsável por encripitografar/codificar o que o usuário digitou no input
    if (matchProgress) { //Verifica se a partida ainda está em andamento para impedir que o usuário insira outra palavra enquanto ela ainda não acabou
        alert('Partida em andamento\nEspere-a acabar para digitar outra palavra');
    }
    else { //Partida não está em andamento
        form = document.getElementById('send-word-form'); //Pega os campos do formulário pelo Id
        fieldValue = form.elements[0]; //Pega o input
        word = fieldValue.value; //Pega o valoro do input
        word = word.toLowerCase(); //Transforma qualquer coisa que o usuário digitou em minúsculo
        wordArray = word.split(''); //Transforma a string em um array de caracteres
        for (let i = 0; i < wordArray.length; i++) { //Codifica esse array
            if (wordArray[i] != ' ') { //Verifica se é uma letra (diferente de espaço)
                encodedArray.push('_'); //Usa o método push para adicionar um _ no encodedArray
            }
            else {
                wordArray[i] = '-'; //Determina que o valor de todo espaço digitado é -
                encodedArray.push('-'); //Adiciona justamente '-' no encodedArray
            }
        }
        printCodedWord(encodedArray); //Printa a codificaçãõ
        matchProgress = true; //Partida em andamento
        insertWord = true; //Palavra inserida
    }
}

function printCodedWord(codedWord) { //Função responsável por printar no <p> do index.html a palavra
    var showWordId = document.getElementById('show-word'); //Pega o <p> pelo Id
    showWordId.innerHTML = ''; //Reseta o valor do que está dentro do p para não concatenar quando essa função for chamada outra vez
    for (let i = 0; i < codedWord.length; i++) { //Concatena, bota espaço e mostra o estado atual da palavra no p
        showWordId.innerHTML = showWordId.innerHTML + ' ' + codedWord[i];
    }
}

function uptadeImage(cont) { //Atualiza a imagem da forca
    var elementForca = document.getElementById('image-forca'); //Pega o img
    //Atualizaçãõ da imagem baseado no parâmetro que é a quantidade de erros (errorCont) que o usuário teve
    if (cont == 1) {
        elementForca.src = 'Images/forca2.png';
    }
    if (cont == 2) {
        elementForca.src = 'Images/forca3.png';
    }
    if (cont == 3) {
        elementForca.src = 'Images/forca4.png';
    }
    if (cont == 4) {
        elementForca.src = 'Images/forca5.png';
    }
    if (cont == 5) {
        elementForca.src = 'Images/forca6.png';
    }
    if (cont == 6) {
        elementForca.src = 'Images/forca7.png';
        setTimeout(function(){
            gameOver(); //Depois de 5 segundos chama a função gameOver()
        }, 1000);
    }
}

function gameOver() { //Função que determina que o usuário perdeu o jogo
    alert('GAME OVER\nInfelizmente (ou não) você perdeu o jogo. Talvez da próxima vez você consiga :)');
    location.reload(); //Recarrega a página
}

function gameWin() { //Função que determina que o usuário ganhou o jogo
    alert('PARABÉNS! Você ganhou o jogo!\nAparentemente você é bom com as palavras. \nFique a vontade para jogar mais uma vez.');
    location.reload(); //Recarrega a página
}

function music() { //Função que será chamada quando o usuário clicar no ícone/butão da música na página
    if (!stopMusic) { //Se a stopMusic for falso, liga a música
        musicOn();
    }
    else { //Se stopMusic for verdadeiro, pausa a música
        musicPause();
    }
}

function musicOn() { //Liga a música
    var elementMusicIcon = document.getElementById('music-icon'); //Pega a imagem do ícone da música
    msc.play(); //Toca a música
    msc.loop = true; //Bota em loop
    elementMusicIcon.src = 'Images/music_icon_1.png'; //Define a imagem como do ícone com som
    stopMusic = true; //Define stopMusic como true pra quando music() for chamada de novo, caia no else e chame musicPause
}

function musicPause() { //Pausa a música
    var elementMusicIcon = document.getElementById('music-icon'); //Pega a imagem do ícone da música
    msc.pause(); //Pausa a música
    elementMusicIcon.src = 'Images/music_icon_2.png'; //Troca a imagem para o ícone sem som
    stopMusic = false; //Define stopMusic como false ppra quando music() for chamada de novo, caia no if e chame musicOn
}