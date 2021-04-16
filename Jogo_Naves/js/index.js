function start(){

    $("#inicio").hide()
    $("#fundoGame").append("<div id='jogador' class='anima1'></div>")
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>")
    $("#fundoGame").append("<div id='inimigo2' class=''></div>")
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>")

    //principais variaveis do jogo
    var podeAtirar = true
    var jogo = {}
    var velocidade=5
    var posicaoY = (Math.random()*334)
    var teclas = {
        W:87, //pra cima
        S:83, //pra baixa
        D:68, // tiro
        SetaBaixo:40,
        SetaCima:38
    }

    jogo.pressionou =[]
    //Verifica se o usuario pressionou alguma tecla
    $(document).keydown(function(e){
        jogo.pressionou[e.which] = true
    })
    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false
    })

    //Game loop
    jogo.timer = setInterval(loop,30)

    function loop(){
        moveFundo()
        moveJogador()
        moveInimigo1()
        moveInimigo2()
        moveAmigo()
        colisao()
    }

    function moveFundo(){
        esquerda = parseInt($("#fundoGame").css("background-position"))//pegando valor atual do fundo da div
        $("#fundoGame").css("background-position",esquerda-1)//vai andar 1px para a esquerda
    }

    function moveJogador(){
        if(jogo.pressionou[teclas.W] || jogo.pressionou[teclas.SetaCima]){
            var topo = parseInt($("#jogador").css("top"))
            $("#jogador").css("top",topo-10)//anda 10px para cim
            
            if(topo<=0){
                $("#jogador").css("top",topo+10)
            }
        }

        if(jogo.pressionou[teclas.S] || jogo.pressionou[teclas.SetaBaixo]){
            var topo = parseInt($("#jogador").css("top"))
            $("#jogador").css("top",topo+10)//anda 10px para baixo

            if(topo>=434){
                $("#jogador").css("top",topo-10)
            }
        }

        if(jogo.pressionou[teclas.D]){
            disparo()
        }
    }

    function moveInimigo1(){
        posicaoX = parseInt($("#inimigo1").css("left"))
        $("#inimigo1").css("left",posicaoX-velocidade)
        $("#inimigo1").css("top",posicaoY)

        if(posicaoX<=0){
            posicaoY = parseInt(Math.random()*334)
            $("#inimigo1").css("left",694)
            $("#inimigo1").css("top",posicaoY)
        }
    }

    function moveInimigo2(){
        posicaoX = parseInt($("#inimigo2").css("left"))
        $("#inimigo2").css("left",posicaoX-3)
        if(posicaoX<=0){
            $("#inimigo2").css("left",775)
        }
    }

    function moveAmigo(){
        posicaoX = parseInt($("#amigo").css("left"))
        $("#amigo").css("left",posicaoX+1)
        if(posicaoX>906){
            $("#amigo").css("left",0)
        }
    }
    
    function disparo(){
        if(podeAtirar == true){
            podeAtirar = false //o usuario não pode atirar de novo enquanto a função esta em execução
            topo = parseInt($("#jogador").css("top"))
            posicaoX = parseInt($("#jogador").css("left"))
            tiroX = posicaoX+190
            topoTiro = topo+37
            $("#fundoGame").append("<div id='disparo'></div>")
            $("#disparo").css("top",topoTiro)
            $("#disparo").css("left",tiroX)
            var tempoDisparo = window.setInterval(executaDisparo,30)
        }
    }

    function executaDisparo(){
        posicaoX = parseInt($("#disparo").css("left"))
        $("#disparo").css("left",posicaoX+15)
        if(posicaoX>900){
            window.clearInterval(tempoDisparo)
            tempoDisparo=null
            $("#disparo").remove()
            podeAtirar=true
        }
    }

    function colisao(){
        var colisao1 = ($("#jogador").collision($("#inimigo")))
    }
}
