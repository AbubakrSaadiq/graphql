import {
    container, design, login, title, textInput1,
    userIcon, usernameInput, textInput2, lockIcon, passwordInput,
    loginButton
} from "./constants.js";
import { showSections } from "./script.js";



// Création des éléments du login 

export const Showlogin = () => {
    const exixt = document.querySelector('.logout')
    if (exixt) {
        exixt.innerHTML = "";
        exixt.remove();
    }
    container.classList.add('container');

    design.classList.add('design');

    const pill1 = document.createElement('div');
    pill1.classList.add('pill-1', 'rotate-45');

    const pill2 = document.createElement('div');
    pill2.classList.add('pill-2', 'rotate-45');

    const pill3 = document.createElement('div');
    pill3.classList.add('pill-3', 'rotate-45');

    const pill4 = document.createElement('div');
    pill4.classList.add('pill-4', 'rotate-45');

    design.appendChild(pill1);
    design.appendChild(pill2);
    design.appendChild(pill3);
    design.appendChild(pill4);

    login.classList.add('login');

    title.classList.add('title');
    title.textContent = 'LOGIN';
    // Ajout d'un élément span pour afficher les messages d'erreur
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error-message');
    errorSpan.textContent = 'Bad credentials or User does not exist.';

    textInput1.classList.add('text-input');
    userIcon.setAttribute('src', 'front-tools/images/user-solid.svg');
    userIcon.setAttribute('alt', 'user icon');
    usernameInput.setAttribute('type', 'text');
    usernameInput.setAttribute('placeholder', 'Username or E-mail');
    textInput1.appendChild(userIcon);
    textInput1.appendChild(usernameInput);

    textInput2.classList.add('text-input');
    lockIcon.setAttribute('src', 'front-tools/images/lock-solid.svg');
    lockIcon.setAttribute('alt', 'lock icon');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('placeholder', 'Password');
    textInput2.appendChild(lockIcon);
    textInput2.appendChild(passwordInput);

    loginButton.classList.add('login-btn');
    loginButton.textContent = 'Login';

    login.appendChild(title);
    login.appendChild(errorSpan);
    login.appendChild(textInput1);
    login.appendChild(textInput2);
    login.appendChild(loginButton);

    container.appendChild(design);
    container.appendChild(login);


    loginButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        try {
            showSections(username, password)


        } catch (error) {
            console.error('Erreur lors de l\'obtention du token :', error);
        }
    });
    return container
};
