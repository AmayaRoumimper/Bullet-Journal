// -----------------------------
// 4. VAKJES (klikbaar) — Firebase versie
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

        /* 🔥 LADEN UIT FIREBASE */
        db.collection("jan_tracker").doc(key).get().then(doc => {
            if (doc.exists) {
                const savedColor = doc.data().color;
                if (savedColor) cell.setAttribute("fill", savedColor);
            }
        });

        /* 🔥 KLIK + OPSLAAN IN FIREBASE */
        cell.addEventListener("click", () => {
            const current = cell.getAttribute("fill");

            let newColor;

            if (layer <= 2) {
                newColor = (current === resetColor) ? singleColor : resetColor;
            } else {
                const set = ringColors[layer];
                const idx = set.indexOf(current);
                newColor = set[(idx + 1) % set.length];
            }

            cell.setAttribute("fill", newColor);

            db.collection("jan_tracker").doc(key).set({
                color: newColor
            });
        });

        svg.appendChild(cell);
    }
}

// ⭐ BLOKJES OPSLAAN — Firebase versie
const woordVakken = document.querySelectorAll(".tracker-blokjes-rij .lijn-tracker");

woordVakken.forEach((vak) => {
    const key = `jan_${vak.dataset.key}`;

    /* 🔥 LADEN */
    db.collection("jan_tracker_words").doc(key).get().then(doc => {
        if (doc.exists) {
            vak.value = doc.data().value || "";
        }
    });

    /* 🔥 OPSLAAN */
    vak.addEventListener("input", () => {
        db.collection("jan_tracker_words").doc(key).set({
            value: vak.value
        });
    });
});
