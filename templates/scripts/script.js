import { Showlogin } from "./login.js";
import { getToken, query, main, head, encryptage } from "./constants.js";
import { createSections } from "./interface.js";

// Affichage du formulaire de connexion dès le chargement de la page
main.appendChild(Showlogin());

// Vérification du token JWT lors du chargement de la page
window.onload = async function () {
    // Vérifier si un token JWT est présent dans le stockage local
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
        try {
            await StoredToken(storedToken);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
        }
    }
}

async function fetchUserData(token) {
    const response = await fetch('https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });
    const data = await response.json();
    return data.data;
}

async function StoredToken(storedToken) {
    const userData = await fetchUserData(storedToken);
    const UserInfos = userData.user[0];
    const userTransaction = userData.xpTotal
    const userLevel = userData.level[0];
    const skillsData = userData.skills
    const DataUser = {
        name: `${UserInfos.firstName} ${UserInfos.lastName}`,
        username: UserInfos.login,
        email: UserInfos.email,
        auditRatio: `${parseFloat(UserInfos.auditRatio.toFixed(1))}`,
        ProjectsDone: `${(userData.xp).length - 1}`,
        TotalXp: `${Math.round((userTransaction.aggregate.sum.amount) / 1000)}`,
        level: userLevel.amount,
        totalUp: UserInfos.totalUp,
        totalDown: UserInfos.totalDown,
        skills: skillsData
    };
    console.log(skillsData)
    localStorage.setItem('userData', encryptage(JSON.stringify(DataUser)));
    logged(DataUser);
}

export async function showSections(username, password) {
    try {
        // Obtention du token JWT
        const token = await getToken(username, password);
        // Enregistrement du token dans le stockage local
        localStorage.setItem('jwtToken', token);
        await StoredToken(token);
    } catch (error) {
        const messageError = document.querySelector('.error-message');
        messageError.style.display = 'block';
        setTimeout(() => {
            if (messageError) {
                messageError.style.display = 'none'
            }
        }, 15000);
    }
}

function logged(DataUser) {
    const existing = document.querySelector('.logout');
    if (existing) {
        console.log(existing);
        existing.remove();
    }
    const logOut = document.createElement('div');
    logOut.className = "logout";
    const logSpan = document.createElement("span");
    logSpan.className = "log-span";
    logSpan.textContent = "LOGOUT";
    const logImg = document.createElement("img");
    logImg.className = "log-img";
    logImg.src = "/templates/front-tools/images/logout.png"

    logOut.append(logSpan, logImg);

    logOut.addEventListener('click', () => {
        // Supprimer le token JWT du stockage local
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userData');
        main.innerHTML = "";
        main.appendChild(Showlogin());
        main.style.display = 'flex';
    })

    head.append(logOut);

    main.innerHTML = "";
    const sections = createSections(DataUser);
    main.appendChild(sections.userInfosSection);
    main.style.display = 'block';
    console.log('Sections affichées');
}
