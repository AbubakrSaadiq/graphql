import { containerRation, containerSkills, } from "./graph.js";

// attributs
export function createSections(DataUser) {
    // Création de la section user-infos
    const userInfosSection = document.createElement('div');
    userInfosSection.classList.add('user-infos');
    userInfosSection.id = 'UserInfosSection';

    const UserData = document.createElement('div');
    UserData.className = 'user-data';

    const userIdentification = document.createElement('div');
    userIdentification.classList.add('user-identification');

    // identification structure
    const nameDiv = document.createElement('div');
    nameDiv.className = 'name-div';

    const welcomeText = document.createElement('p');
    welcomeText.textContent = "Welcome, ";
    const welcomeSpan = document.createElement('span');
    welcomeSpan.textContent = DataUser.name;

    nameDiv.appendChild(welcomeText);
    nameDiv.appendChild(welcomeSpan);

    const nickname = document.createElement('p');
    nickname.textContent = `Username: ${DataUser.username}`;
    nickname.className = 'nickname';

    const userMail = document.createElement('p');
    userMail.textContent = `Email address: ${DataUser.email}`;
    userMail.className = 'e-mail';

    const projectCount = document.createElement('p');
    projectCount.textContent = `Projects done: ${DataUser.ProjectsDone}`;
    projectCount.className = 'projects';

    const ratio = document.createElement('p');
    ratio.className = 'ratio';
    ratio.textContent = `Audit ratio: ${DataUser.auditRatio}` || '0'

    const xpAmount = document.createElement('div');
    xpAmount.classList.add('XP-amount');

    const Progress = document.createElement('h2');
    Progress.className = "progress";
    Progress.textContent = "Progression"

    const xpSum = document.createElement('h2');
    xpSum.className = 'xp-sum';
    xpSum.textContent = DataUser.TotalXp;

    const xpSpan = document.createElement('span');
    xpSpan.className = 'xp-span';
    xpSpan.textContent = 'kb';

    const xpDiv = document.createElement('div');
    xpDiv.className = 'xp-div';
    xpDiv.append(xpSum, xpSpan);
    const userLevel = document.createElement('div');
    userLevel.className = 'level-div'

    const levelSpan = document.createElement('span')
    levelSpan.className = 'level-span';
    levelSpan.textContent = "Current Level:";

    const levelAmount = document.createElement('p');
    levelAmount.className = 'level-amount';
    levelAmount.textContent = DataUser.level;

    userLevel.append(levelSpan, levelAmount)


    xpAmount.append(Progress, xpDiv, userLevel)


    const auditGraph = containerRation(DataUser);
    auditGraph.className = 'audit-graph';

    
    userIdentification.append(nameDiv, nickname, userMail, projectCount, ratio);

    

    const skills = containerSkills(DataUser.skills);
    skills.classList.add('skills');

    const graphs = document.createElement('div');
    graphs.className = 'graphs';
    graphs.append(auditGraph);


    UserData.append(userIdentification, xpAmount);

    userInfosSection.appendChild(UserData);
    userInfosSection.appendChild(graphs);
    userInfosSection.appendChild(skills);



    // Retourner les sections créées
    return {
        userInfosSection: userInfosSection
    };
}
