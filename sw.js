const CACHE_NAME = "meu-pwa-v1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];

self.addEventListener("install", (event) => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ARQUIVOS);
            })
    );
});

self.addEventListener("activate", (event) => {

    event.waitUntil(
        caches.keys().then((chaves) => {

            return Promise.all(
                chaves.map((chave) => {

                    if (chave !== CACHE_NAME) {
                        return caches.delete(chave);
                    }

                })
            );

        })
    );
});

self.addEventListener("fetch", (event) => {

    event.respondWith(
        caches.match(event.request)
            .then((resposta) => {

                return resposta || fetch(event.request);

            })
    );

});