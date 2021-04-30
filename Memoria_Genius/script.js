let order = []
let clickedOrder= []
let score=0
/* 0-verde
1-vermelho
2-amarelo
3-azul
*/

const blue = document.querySelector(".blue")
const red = document.querySelector(".red")
const green = document.querySelector(".green")
const yellow = document.querySelector(".yellow")

//cria orderm aleatoria de cores
let shuffleOrder = ()=>{
    let colorOrder = Math.floor(Math.random()*4)
    order[order.length] = colorOrder
    clickedOrder=[]

    for(let i in order){
        let elementColor = createColorElement(order[i])
        lightColor(elementColor,Number(i) + 1)
    }
}
//acende a proxima cor
let lightColor = (element,number)=>{
    number *=500
    setTimeout(()=>{
        element.classList.add('selected')
    },number - 200)

    setTimeout(()=>{
        element.classList.remove('selected')
    })
}
//verifica se os botoes clicas são os mesmos da ordem criado no jogo
let checkOrder = ()=>{
    for(let i in clickedOrder){
        if(clickedOrder[i]!= order[i]){
            YouLost()
            break
        }
    }

    if(clickedOrder.length == order.length){
        alert(`Pontuação:${score}\nVocê acertou`)
        nextLevel()
    }
}

//clique do usuario 
let click = (color)=>{
    clickedOrder[clickedOrder.length] = color
    createColorElement(color).classList.add('selected')

    setTimeout(()=>{
        createColorElement(color).classList.remove('selected')
        checkOrder()
    },250)
}


//retorna a cor

let createColorElement=(color)=>{
    if(color==0)return green
    if(color==1)return red
    if(color==2)return yellow
    if(color==3)return blue
}

//Proximo nivel do jogo

let nextLevel=()=>{
    score++
    shuffleOrder()
}

//caso o jogador perca o jogo
let YouLost = ()=>{
    alert(`Pontuação:${score}:\nVocê Perdeu o jogo!\nClique em ok para jogar novamente`)
    order=[]
    clickedOrder=[]

    playGame()
}
let playGame = ()=>{
    alert("Bem vindo ao Gênesis")
    score=0
    nextLevel()
}

green.onclick = () => click(0)
red.onclick = () => click(1)
yellow.onclick = () => click(2)
blue.onclick = () => click(3)

playGame()