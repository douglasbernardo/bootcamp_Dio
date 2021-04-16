function start(){

    $("#inicio").hide()
    $("#fundoGame").append("<div id='jogador' class='anima1'></div>")
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>")
    $("#fundoGame").append("<div id='inimigo2'></div>")
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>")
    $("#fundoGame").append("<div id='placar'></div>")

    //principais variaveis do jogo
    var fimdejogo = false
    var podeAtirar = true
    var jogo = {}
    var salvos =0
    var perdidos =0
    var pontos=0
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
        placar()
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
    }
    function colisao(){
        var colisao1 = ($("#jogador").collision($("#inimigo1")))
        var colisao2 = ($("#jogador").collision($("#inimigo2")))
        var colisao3 = ($("#disparo").collision($("#inimigo1")))
        var colisao4 = ($("#disparo").collision($("#inimigo2")))
        var colisao5 = ($("#jogador").collision($("#amigo")))
        var colisao6 = ($("#inimigo2").collision($("#amigo")))

        //Jogador com inimigo 1
        if(colisao1.length>0){

            inimigo1X = parseInt($("#inimigo1").css("left"))
            inimigo1Y = parseInt($("#inimigo1").css("top"))
            explosao1(inimigo1X,inimigo1Y)
            posicaoY = parseInt(Math.random()*334)
            $("#inimigo1").css("left",694)
            $("#inimigo1").css("top",posicaoY)
        }
        
       // jogador com o inimigo2 
        if (colisao2.length>0) {
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X,inimigo2Y);
                    
            $("#inimigo2").remove();
                
            reposicionaInimigo2();
                
        }	
        // Disparo com o inimigo1
            
        if (colisao3.length>0){

            pontos=pontos+100
        
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
                
            explosao1(inimigo1X,inimigo1Y);
            $("#disparo").css("left",950);
                
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
            
        }
        // Disparo com o inimigo2
            
        if (colisao4.length>0) {
            pontos=pontos+50
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();
        
            explosao2(inimigo2X,inimigo2Y);
            $("#disparo").css("left",950);
            
            reposicionaInimigo2();
            
        }
        // jogador com o amigo
            
        if (colisao5.length>0) {
            salvos++
            reposicionaAmigo();
            $("#amigo").remove();
        }
    
        //Inimigo 2 com amigo
        if (colisao6.length>0) {
            perdidos++
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX,amigoY);
            $("#amigo").remove();
                    
            reposicionaAmigo();        
        }
    }

    function explosao1(inimigo1X,inimigo1Y){
        $("#fundoGame").append("<div id='explosao1'></div>")
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        var div=$("#explosao1")
        div.css("top",inimigo1Y)
        div.css("left",inimigo1X)
        div.animate({width:200,opacity:0},"slow") //velocidade para a animação ocontecer

        var tempoExplosao= window.setInterval(removeExplosao,1000)

        function removeExplosao(){
            div.remove()
            window.clearInterval(tempoExplosao)
            tempoExplosao=null
        }
    }

    function explosao2(inimigo2X,inimigo2Y) {
	
        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2=$("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity:0}, "slow");
        
        var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
        
        function removeExplosao2() {
                
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2=null;
        }
    }

    function explosao3(amigoX,amigoY) {
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top",amigoY);
        $("#explosao3").css("left",amigoX);
        var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3=null;      
        }  
    }
    //Reposiciona Inimigo 2
    function reposicionaInimigo2() {
	
        var tempoColisao4=window.setInterval(reposiciona4, 3000);
        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4=null;
                
            if (fimdejogo==false) {
                $("#fundoGame").append("<div id='inimigo2'></div>");
            }     
        }	
    }	
    //Reposiciona Amigo
    function reposicionaAmigo() {
    
        var tempoAmigo=window.setInterval(reposiciona6, 4000);
    
        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo=null;
            
            if (fimdejogo==false) {
                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
            }
            
        }
    }

    function placar(){
        $("#placar").html("<h2> Pontos: " + pontos + " Salvos: "+ salvos + " Perdidos: " + perdidos +"</h2>")
    }
}
