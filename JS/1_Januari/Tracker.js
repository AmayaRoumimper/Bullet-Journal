const svg = document.getElementById("tracker");

const DAYS = 31;
const LAYERS = 7; // 0–5 klikbaar, 6 = cijfers

const centerX = 520;
const centerY = 350;

const innerRadius = 80;
const outerRadius = 300;
const ringThickness = (outerRadius - innerRadius) / LAYERS;

const startAngle = -Math.PI / 2;
const arcFraction = 0.75;
const arcAngle = 2 * Math.PI * arcFraction;
const sectorAngle = arcAngle / DAYS;
const endAngle = startAngle + arcAngle;

const resetColor = "#000000";

const singleColor = "#f9fcf9"; // kies zelf

const ringColors = {
    3: [
        resetColor,
        "#00cc00",
        "#55cc00",
        "#aacc00",
        "#ffcc00",
        "#ff6600",
        "#ff0000"
    ],

    4: [
        resetColor,
        "#0066ff",
        "#3399ff",
        "#66b3ff",
        "#a3c2ff",
        "#d9d9d9"
    ],

    5: [
        resetColor,
        "#ff66cc",
        "#ff33cc",
        "#cc00cc",
        "#9900cc",
        "#660099"
    ]
};

// -----------------------------
// 1. LIJNEN (pointer-events uit)
// -----------------------------
function noClick(el) {
    el.style.pointerEvents = "none";
}

for (let i = 0; i <= LAYERS; i++) {
    const r = innerRadius + i * ringThickness;

    const ring = document.createElementNS("http://www.w3.org/2000/svg", "path");

    const xStart = centerX + r * Math.cos(startAngle);
    const yStart = centerY + r * Math.sin(startAngle);

    const xEnd = centerX + r * Math.cos(endAngle);
    const yEnd = centerY + r * Math.sin(endAngle);

    const largeArc = arcAngle > Math.PI ? 1 : 0;

    const d = `
        M ${xStart} ${yStart}
        A ${r} ${r} 0 ${largeArc} 1 ${xEnd} ${yEnd}
    `;

    ring.setAttribute("d", d.trim());
    ring.setAttribute("stroke", "white");
    ring.setAttribute("stroke-width", "1");
    ring.setAttribute("fill", "none");

    noClick(ring);
    svg.appendChild(ring);

    if (i === LAYERS) continue;

    const y = centerY - r;
    const x1 = centerX + r * Math.cos(startAngle);
    const x2 = x1 - 240;

    const hLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    hLine.setAttribute("x1", x1);
    hLine.setAttribute("y1", y);
    hLine.setAttribute("x2", x2);
    hLine.setAttribute("y2", y);
    hLine.setAttribute("stroke", "white");
    hLine.setAttribute("stroke-width", "1");

    noClick(hLine);
    svg.appendChild(hLine);
}

// radiale lijnen
for (let d = 0; d < DAYS; d++) {
    const angle = startAngle + d * sectorAngle;

    const x1 = centerX + innerRadius * Math.cos(angle);
    const y1 = centerY + innerRadius * Math.sin(angle);

    const x2 = centerX + outerRadius * Math.cos(angle);
    const y2 = centerY + outerRadius * Math.sin(angle);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "1");

    noClick(line);
    svg.appendChild(line);
}

// -----------------------------
// 3. CIJFERS
// -----------------------------
for (let d = 0; d < DAYS; d++) {
    const a1 = startAngle + d * sectorAngle;
    const a2 = startAngle + (d + 1) * sectorAngle;

    const midAngle = (a1 + a2) / 2;
    const midRadius = innerRadius + 6 * ringThickness + ringThickness / 2;

    const x = centerX + midRadius * Math.cos(midAngle);
    const y = centerY + midRadius * Math.sin(midAngle);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("fill", "white");
    text.setAttribute("font-size", "14");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.textContent = d + 1;

    noClick(text);
    svg.appendChild(text);
}

// -----------------------------
// 4. VAKJES (klikbaar)
// -----------------------------
for (let layer = 0; layer < LAYERS - 1; layer++) {
    const rInner = innerRadius + layer * ringThickness;
    const rOuter = rInner + ringThickness;

    for (let d = 0; d < DAYS; d++) {
        const a1 = startAngle + d * sectorAngle;
        const a2 = startAngle + (d + 1) * sectorAngle;

        const x1 = centerX + rInner * Math.cos(a1);
        const y1 = centerY + rInner * Math.sin(a1);

        const x2 = centerX + rOuter * Math.cos(a1);
        const y2 = centerY + rOuter * Math.sin(a1);

        const x3 = centerX + rOuter * Math.cos(a2);
        const y3 = centerY + rOuter * Math.sin(a2);

        const x4 = centerX + rInner * Math.cos(a2);
        const y4 = centerY + rInner * Math.sin(a2);

        const cell = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        cell.setAttribute("points", `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`);

        cell.setAttribute("fill", "transparent");
        cell.setAttribute("pointer-events", "visibleFill");

        cell.setAttribute("stroke", "white");
        cell.setAttribute("stroke-width", "0.5");
        cell.style.cursor = "pointer";

        // ⭐ Unieke JANUARI key
        const key = `jan_cell_${layer}_${d}`;

        const saved = localStorage.getItem(key);
        if (saved) cell.setAttribute("fill", saved);

        cell.addEventListener("click", () => {
            const current = cell.getAttribute("fill");

            if (layer <= 2) {
                const newColor = (current === resetColor) ? singleColor : resetColor;
                cell.setAttribute("fill", newColor);
                localStorage.setItem(key, newColor);
                return;
            }

            const set = ringColors[layer];
            const idx = set.indexOf(current);
            const newColor = set[(idx + 1) % set.length];

            cell.setAttribute("fill", newColor);
            localStorage.setItem(key, newColor);
        });

        svg.appendChild(cell);
    }
}

// ⭐ BLOKJES-RIJ
const rij = document.querySelector(".tracker-blokjes-rij");

const r = innerRadius + 0 * ringThickness;

const yLine = centerY - r;
const xLine = centerX + r * Math.cos(startAngle);

rij.style.left = `${xLine - 240}px`;
rij.style.top = `${yLine - 15}px`;

// ⭐ BLOKJES OPSLAAN
const woordVakken = document.querySelectorAll(".tracker-blokjes-rij .lijn-tracker");

woordVakken.forEach((vak) => {
    const key = `jan_${vak.dataset.key}`;
    const saved = localStorage.getItem(key);
    if (saved) vak.value = saved;

    vak.addEventListener("input", () => {
        localStorage.setItem(key, vak.value);
    });
});
