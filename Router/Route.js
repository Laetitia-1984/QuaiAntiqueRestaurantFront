export default class Route {
    constructor(url, title, pathHtml, authorize, pathJS = "") {
        this.url = url;
        this.title = title;
        this.pathHtml = pathHtml;
        this.pathJS = pathJS;
        this.authorize = authorize;
    }
}

/*
[] -> Tout le monde peut y accéder
["disconnected"] -> Réservé aux users déconnectés
["client"] ->Réservé aux users avec le role client
["admin"] ->Réservé aux users avec le role admin
["admin, "client"] -> Réservé aux users avec le role admin OU client
*/