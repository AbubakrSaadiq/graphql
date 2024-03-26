export function containerRation(User) {
    const total = User.totalDown + User.totalUp;
    const pourcentageDown = ((User.totalDown / total) * 100).toFixed(2);
    const pourcentageUp = ((User.totalUp / total) * 100).toFixed(2);
    const segments = [
        { label: "Total Down", value: pourcentageDown, color: "#84172c" },
        { label: "Total Up", value: pourcentageUp, color: "#BB4430" }
    ];
    let containerRation = ``
    const centerX = 150;
    const centerY = 150;
    const radius = 75;
    let startAngle = 0;
    let id = 0
    segments.forEach(item => {
        id++
        const { label, value, color } = item;
        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        applyStyle(text, {
            "x": `100`,
            "y": `${30+(id*20)}`,
            "fill": `${color}`,
            "font-size": "12px",
            "font-family": "Arial, sans-serif"
        });
        text.textContent = `${label} ${value} %`;
        containerRation += text.outerHTML;
        const angle = (value / 100) * Math.PI * 2;
        const endAngle = startAngle + angle;
        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);
        const path = document.createElement("path");
        path.id = `actionMouse-${id}`
        const largeArcFlag = angle > Math.PI ? 1 : 0;
        const d = [
            `M${centerX},${centerY}`,
            `L${x1},${y1}`,
            `A${radius},${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            "Z"
        ].join(" ");
        path.setAttribute("d", d);
        path.setAttribute("fill", color);
        containerRation += path.outerHTML
        startAngle = endAngle;
    });
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    applyStyle(text, {
        "x": `${180}`,
        "y": "20",
        "fill": `#000`,
        "font-size": "15px",
        "font-weight": "bold"
    });
    // text.textContent = `Ratio ${(pourcentageUp/pourcentageDown).toFixed(1)}`;
    containerRation += text.outerHTML;
    const containerGraphic = document.createElement('div')
    containerGraphic.className = "container-graphic"
    containerGraphic.innerHTML = `
        <div class="graphicRatio">
            <h2 class= "transact">Audits Transaction</h2>
            <svg class="svg-ratio">
                ${containerRation}
            </svg>
        </div>`
    return containerGraphic
}

export function createSkillSVG(skillsData, containerWidth, barGap, maxHeight) {
    const numSkills = skillsData.length;
    const barWidth = (containerWidth - (numSkills - 1) * barGap) / numSkills;
    let contentSVG = '';
    skillsData.forEach((skill, index) => {
        let content = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const x = index * (barWidth + barGap) + 30;
        const height = (skill.amount / 100) * maxHeight;
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', maxHeight - height);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', "#84172c");
        rect.classList.add('bar-rect');
        // Ajout d'un identifiant unique au texte correspondant
        content.setAttribute('id', `text-${index}`);
        contentSVG += rect.outerHTML;
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        applyStyle(text, {
            "x": `${x + barWidth / 5}`,
            "y": `${maxHeight + 20}`,
            "fill": `#000`,
            "font-size": "0.5em",
            // Supprimer le display: none initial
        });
        text.textContent = String(skill.type).replace('skill_', '');
        contentSVG += text.outerHTML;
        applyStyle(content, {
            "x": `${(x + barWidth / 5)}`,
            "y": `${maxHeight + 35}`,
            "fill": "#84172c",
            "font-size": "0.8em",
            "font-family": "Arial, sans-serif",
            // Supprimer le display: none initial
        });
        content.textContent = `${skill.amount} %`;
        contentSVG += content.outerHTML;
        
        // Ajout des gestionnaires d'événements pour gérer le hover
        rect.addEventListener('mouseover', () => {
            document.getElementById(`text-${index}`).style.display = 'block';
        });
        
        rect.addEventListener('mouseout', () => {
            document.getElementById(`text-${index}`).style.display = 'none';
        });
    });
    return contentSVG;
}

function applyStyle(element, styles) {
    for (let property in styles) {
        element.setAttribute(property, styles[property]);
    }
}
