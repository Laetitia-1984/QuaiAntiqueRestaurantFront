// Implémenter le JS de ma page
const inputName = document.getElementById("NameInput");
const inputFirstName = document.getElementById("FirstNameInput");
const inputEmail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidatePassword = document.getElementById("ValidatePasswordInput");
const btnValidate = document.getElementById("btn-validate-signup");
const subscribeForm = document.getElementById("subscribeForm");

inputName.addEventListener("keyup", validateForm);
inputFirstName.addEventListener("keyup", validateForm);
inputEmail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidatePassword.addEventListener("keyup", validateForm);

btnValidate.addEventListener("click", subscribeUser);

// Fonction permettant de valider tout le formulaire
function validateForm() {
    const nameOk = validateRequired(inputName);
    const firstNameOk = validateRequired(inputFirstName);
    const emailOk = validateMail(inputEmail);
    const passwordOk = validatePassword(inputPassword);
    const passwordConfirmOk = validateConfirmationPassword(inputPassword, inputValidatePassword);

    if (nameOk && firstNameOk && emailOk && passwordOk && passwordConfirmOk) {
        btnValidate.disabled = false;
    } else {
        btnValidate.disabled = true;
    }
}

function validateMail(input) {
    // Définir le Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        //C'est OK
        input.classList.add("is-valid"); // On ajoute la classe Bootstrap is-valid
        input.classList.remove("is-invalid"); // On supprime la classe is-invalid

        return true;

    } else {
        // Ce n'est pas OK
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");

        return false;
    }
}

function validatePassword(input) {
    // Définir le Regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
        //C'est OK
        input.classList.add("is-valid"); // On ajoute la classe Bootstrap is-valid
        input.classList.remove("is-invalid"); // On supprime la classe is-invalid

        return true;

    } else {
        // Ce n'est pas OK
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");

        return false;
    }
}

function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
    if (inputPwd.value == inputConfirmPwd.value) {
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;

    } else {
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}

//Fonction qui vérifie si l'input est vide ou pas
function validateRequired(input) {
    if (input.value != '') {
        //C'est OK
        input.classList.add("is-valid"); // On ajoute la classe Bootstrap is-valid
        input.classList.remove("is-invalid"); // On supprime la classe is-invalid

        return true;
    } else {
        // Ce n'est pas OK
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");

        return false;
    }
}

function subscribeUser() { // Inscription nouvel user au clic sur le bouton "Inscription"
    let dataForm = new FormData(subscribeForm); // Récupère les valeurs dans cles champs du Form
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "lastName": dataForm.get("name"),
        "firstName": dataForm.get("firstName"),
        "email": dataForm.get("email"),
        "password": dataForm.get("password")
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl+"registration", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Erreur lors de l'inscription");
            }
        })
        .then(result => {
            alert ("Bravo "+dataForm.get("firstName")+", l'inscription s'est bien passé. Vous pouvez vous connecter");
            document.location.href="/signin";
        })
        .catch((error) => console.error(error));
}