const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("connectForm");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials() {
    let dataForm = new FormData(signinForm);
    //Ici, il faudra appeler l'API pour vérifier les informations de connexion
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": dataForm.get("email"),
        "password": dataForm.get("password")
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl+"login", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();

            } else {
                mailInput.classList.add("is-invalid");
                passwordInput.classList.add("is-invalid");
            }
        })
        .then(result => {
            // Il faudra récupérer le vrai token.
            const token = result.apiToken;
            setToken(token);

            // Placer ce token en cookie.
            setCookie(roleCookieName, result.roles[0], 7);
            window.location.replace("/");
        })
        .catch((error) => console.error(error));
}