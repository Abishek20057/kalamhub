const CACHE_NAME = "kalamhub-v1";

const urlsToCache = [
    "/",
    "/index.html",
    "/about.html",
    "/services.html",
    "/projects.html",
    "/gallery.html",
    "/team.html",
    "/contact.html",
    "/css/style.css",
    "/css/responsive.css",
    "/css/animations.css",
    "/js/main.js",
    "/js/contact.js"
];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => {

                return response || fetch(event.request);

            })

    );

});