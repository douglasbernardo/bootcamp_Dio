
const dino = document.querySelector(".dino")
const background = document.querySelector(".background")
let isJumping = false
var position = 500

const handlekeyup = (event) =>{
    if(event.keyCode === 32 || event.keyCode === 38){
        if(!isJumping){
            jump()
        }
    }
}
const jump = () =>{
    isJumping = true
    let upInterval = setInterval(()=>{
        if(position >= 600){
            clearInterval(upInterval)
            //intervalo de descida
            let downInterval = setInterval(()=>{
                if(position<=400){  
                    clearInterval(downInterval)
                    isJumping = false
                }else{
                    position-=20
                    dino.style.bottom=position+"px"
                }
            },20)
        }else{
            //intervalo quando subir
            position+=20
            dino.style.bottom=position+"px"
        }
    },20) 
}

const createCactus = ()=>{
    const cactus = document.createElement("div")
    let cactusPosition = 1000
    let showCactus = Math.random()*6000 
    cactus.classList.add("cactus")
    cactus.style.left = 1000 + "px"
    background.appendChild(cactus)
    let leftInterval = setInterval(()=>{
        if(cactusPosition < -60){
            clearInterval(leftInterval)
            background.removeChild(cactus)
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 500){
            //Game over
            clearInterval(leftInterval)
            document.body.innerHTML = "<h1 class='gameOver'>Game Over</h1>"
        }
        else{
            cactusPosition -=10
            cactus.style.left = cactusPosition + "px"
        }
    },20)
    setTimeout(createCactus,showCactus)
}
createCactus()
document.addEventListener('keyup',handlekeyup)