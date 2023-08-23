confirm("Are you sure you want to delete?")
$(document).ready(function () {

    $(".mudaTela").click(function () {
        mudaTela($(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao"));
    });

    $("a.opcoes").click(function (e) {
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function () {
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = (atual, nova = null, animacao = "fade", tempoAnimacao = 900) => {

        // define a nova tela
        if (!nova) {
            nova = parseInt(atual.parent().attr("id").split("tela")[1]) + 1;
        }

        if (animacao == "fade") {
            $("#tela" + (nova - 1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela" + nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        } else {
            $("#tela" + (nova - 1)).hide(tempoAnimacao);
            $("#tela" + nova).show(tempoAnimacao);
        }

        if ($("#tela" + nova).hasClass("temporizado")) {
            $("#tela" + nova + " div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if (nova == 5) {
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }

    }

    const telaTemporizada = (nTela, contador) => {

        const tela = $("#tela" + nTela + " div:eq(" + contador + ")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador == 0 ? $("#tela" + nTela).attr("tempo") : temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if (tela.attr("final") == "true") {
                    mudaTela(null, nTela + 1, "fade", 900);
                    verificaFundo(nTela + 1);
                } else {
                    telaTemporizada(nTela, contador + 1);
                }

            }, tela.attr("tempo"));

        }, temporizadorPrimeiraTela);

    }

    const verificaFundo = (nTela) => {

        const fundo = $("#tela" + nTela).attr("fundo");
        const tempo = $("#tela" + nTela).attr("tempo");

        if (fundo) {
            $("body").attr("class", fundo);
        }

    }

    const mostraMsgMes = (texto) => {

        let titulo;
        let mensagem;

        switch (texto) {
            case "25/7": titulo = "25 de Julho de 2021"; mensagem = "<p>Este foi o dia que minha fiiiilha, aqui as coisas deram uma mudada muito forte, não sei se você lembra o que teve este dia, mas do jeito que falei já deve até lembrar kkkk, simplesmente demos nosso beijo depois de taanto tempo, indo pra portaria do teu condomínio, tava um climinha muito bom e foi realmente uma sensação muuuito boa</p>"; break;
            case "3/8": titulo = "03 de Agosto de 2021"; mensagem = "<p>Este dia, não sei se você se lembra, mas tecnicamente começamos de certa forma a namorar dia 03/08, foi quando estávamos conversaaando e você falou que se eu te pedisse em namoro você aceitaria e já que tu me deu essa garantia, eu não ia perder uma oportunidade dessas né, então formalmente houve um pedido e uma aceitação, mas claro que ia pedir pessoalmente também né, só não foi de imediato porque eu queria algo melhorzinho e esse é o próximo evento</p>"; break;
            case "11/8": titulo = "11 de Agosto de 2021"; mensagem = "<p>Esse foi o dia em que eu estava completamente decidido em te pedir em namoro, completamente decidido de que era você que eu queria para a minha vida, mais especificamente para toda a vida, e dessa decisão eu não me arrependo, só tenho a agradecer, principalmente por você ter aceitado kkkk, eu realmente tive medo de você não aceitar, e acabar falando que isso tava sendo muito rápido, pra gente ir mais devagar com isso e tudo mais.</p>"; break;
            case "22/8": titulo = "15 de Maio de 2021"; mensagem = "<p>Aqui foi o dia que tu foi me ver jogar um futzinho de bíquini toda gotosa, maravilhosa demaaaais, me desnorteava cada vez que eu te olhava, era absurdo.</p>"; break;
            case "26/8": titulo = "22 de Maio de 2021"; mensagem = "<p>Eu te indiquei Bleachh esse dia e tu simplesmente começou a falar que não ia assistir, não tinha vontade e pipipi, oh você hoje assistindo (crtz que assistiu hoje já kkkkkk), eu falo, minhas recomendações são muito boas</p>"; break;
            case "11/9": titulo = "03 de Junho de 2021"; mensagem = "<p>Nesse dia, eu tenho certeza que você não lembra, mas dissemos que tinhamos escolhido uma música 'nossa', que por sinal não é a 'It's you', que na realidade eu acho que faz mais sentido, mas a música que escolhemos foi a 'Love Nwantiti'</p>"; break;
            case "22/9": titulo = "29 de Maio de 2021"; mensagem = "<p>Fomos no shopping de busão esse dia kkk, tu não tinha carro ainda e eu ainda n tinha pega minha CNH tbm, que absurdo, tempo voa meu bemm</p>"; break;
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto == "final" ? true : false);
    }



});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") => {

    if (mostrar) {
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    } else {
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if (telaFinal) {
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}