const vakjes = document.querySelectorAll('.vak');

// 🔥 1. Gekozen vakjes laden uit Firebase
vakjes.forEach((vak, index) => {
    const key = "boekenvak_" + index;

    db.collection("boekenvakken").doc(key).get().then(doc => {
        if (doc.exists && doc.data().gekozen === true) {
            vak.classList.add('gekozen');
        }
    });

    // 🔥 2. Klik opslaan in Firebase
    vak.addEventListener('click', () => {
        if (vak.classList.contains('zwart')) return;

        const status = vak.classList.toggle('gekozen');

        db.collection("boekenvakken").doc(key).set({
            gekozen: status
        });
    });
});

// 🔥 3. Zwarte vakjes blijven hetzelfde (geen Firebase nodig)
const dagenPerMaand = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

vakjes.forEach((vak, index) => {
    const dag = Math.floor(index / 12) + 1;
    const maand = index % 12;

    if (dag > dagenPerMaand[maand]) {
        vak.classList.add('zwart');
    }
});
