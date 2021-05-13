
var jogador = null

var jogadorSelecionado = document.getElementById("jogador-selecionado")
var quadrados = document.getElementsByClassName("quadrado")
mudarJogador("X")
function escolherQuadrado(id){
    let quadrado = document.getElementById(id)
    if(quadrado.innerHTML !== '-'){
        return
    }

    quadrado.innerHTML = jogador
    quadrado.style.color = '#000'

    if(jogador === "X"){
        jogador = "O"
    }else{
        jogador = "X"
    }

    mudarJogador(jogador)
}

function mudarJogador(valor){
    jogador = valor
    jogadorSelecionado.innerHTML = jogador
}

function checaVencedor(){
    var quadrado1 = document.getElementById(1)
    var quadrado2 = document.getElementById(2)
    var quadrado3 = document.getElementById(3)
    var quadrado4 = document.getElementById(4)
    var quadrado5 = document.getElementById(5)
    var quadrado6 = document.getElementById(6)
    var quadrado7 = document.getElementById(7)
    var quadrado8 = document.getElementById(8)
    var quadrado9 = document.getElementById(9)
}

function checaSequencia(quadrado1,quadrado2,quadrado3){
    var igual = false
    if(quadrado.innerHTML === quadrado2.innerHTML && quadrado2 .innerHTML === quadrado3.innerHTML)
}