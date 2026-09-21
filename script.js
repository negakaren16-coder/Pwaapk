let eventoInstalacao = null;

const btnInstalar = document.getElementById("btnInstalar");

window.addEventListener("beforeinstallprompt", (evento) => {

    evento.preventDefault();

    eventoInstalacao = evento;

    btnInstalar.hidden = false;
});

btnInstalar.addEventListener("click", async () => {

    if (!eventoInstalacao) {
        return;
    }

    eventoInstalacao.prompt();

    const resultado = await eventoInstalacao.userChoice;

    if (resultado.outcome === "accepted") {
        console.log("Aplicativo instalado!");
    } else {
        console.log("Instalação cancelada.");
    }

    eventoInstalacao = null;

    btnInstalar.hidden = true;
});

window.addEventListener("appinstalled", () => {

    console.log("PWA instalado com sucesso!");

    btnInstalar.hidden = true;
});

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./sw.js")
            .then(() => {
                console.log("Service Worker registrado!");
            })
            .catch((erro) => {
                console.error("Erro no Service Worker:", erro);
            });

    });

}