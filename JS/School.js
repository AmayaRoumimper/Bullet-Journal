const vakjes = document.querySelectorAll('.vak');

const kleuren = [
    "#750000", // rood (startkleur)
    "#8b004f",
    "#ff00aa",
    "#ff66cc",
    "#ffbbdd",
    "#ffe6ee",
];

const dagenPerMaand = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 🔥 1. Zwarte vakjes instellen (geen Firebase nodig)
vakjes.forEach((vak, index) => {
    const dag = Math.floor(index / 12) + 1;
    const maand = index % 12;

    if (dag > dagenPerMaand[maand]) {
        vak.classList.add('zwart');
        vak.style.backgroundColor = "#000000";
        vak.dataset.kleur = "zwart";
    }
});

// 🔥 2. Kleur laden uit Firebase
vakjes.forEach((vak, index) => {
    if (vak.classList.contains('zwart')) return;

    const key = "school_vak_" + index;

    db.collection("school_vakken").doc(key).get().then(doc => {
        if (doc.exists) {
            const kleur = doc.data().kleur;
            vak.style.backgroundColor = kleur;
            vak.dataset.kleur = kleur;
        } else {
            vak.style.backgroundColor = kleuren[0];
            vak.dataset.kleur = kleuren[0];
        }
    });
});

// 🔥 3. Kleur opslaan in Firebase bij klikken
vakjes.forEach((vak, index) => {
    vak.addEventListener('click', () => {
        if (vak.classList.contains('zwart')) return;

        const key = "school_vak_" + index;

        const huidigeKleur = vak.dataset.kleur;
        const huidigeIndex = kleuren.indexOf(huidigeKleur);

        const nieuweIndex = (huidigeIndex + 1) % kleuren.length;
        const nieuweKleur = kleuren[nieuweIndex];

        vak.style.backgroundColor = nieuweKleur;
        vak.dataset.kleur = nieuweKleur;

        db.collection("school_vakken").doc(key).set({
            kleur: nieuweKleur
        });
    });
});
