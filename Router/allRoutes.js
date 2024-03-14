import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []),
    new Route("/galerie", "La galerie", "/pages/galerie.html", []),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"], "/js/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"], "/js/auth/signup.js"),
    new Route("/account", "Mon compte", "/pages/auth/account.html", ["customer", "admin"]),
    new Route("/editPassword", "Changement du mot de passe", "/pages/auth/editPassword.html", ["customer", "admin"]),
    new Route("/allResa", "Vos réservations", "/pages/reservations/allResa.html", ["customer"]),
    new Route("/reserver", "Réserver", "/pages/reservations/reserver.html", ["customer"]),



];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";