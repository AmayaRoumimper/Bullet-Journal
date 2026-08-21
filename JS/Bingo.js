const vakjes = document.querySelectorAll('.bingo-vak');
const inputs = document.querySelectorAll('.bingo-input');

// 🔥 X opslaan en laden via Firebase
vakjes.forEach(vak => {
    const id = vak.dataset.id;

    // Laden uit Firebase
    db.collection("bingo_x").doc(id).get().then(doc => {
        if (doc.exists && doc.data().gekruist === true) {
            vak.classList.add('gekruist');
        }
    });

    // Opslaan in Firebase
    vak.addEventListener('click', () => {
        const status = vak.classList.toggle('gekruist');

        db.collection("bingo_x").doc(id).set({
            gekruist: status
        });
    });
});

// 🔥 Tekst opslaan en laden via Firebase
inputs.forEach(input => {
    const key = input.dataset.text;

    // Laden uit Firebase
    db.collection("bingo_text").doc(key).get().then(doc => {
        if (doc.exists) {
            input.value = doc.data().value || "";
        }
    });

    // Opslaan in Firebase
    input.addEventListener('input', () => {
        db.collection("bingo_text").doc(key).set({
            value: input.value
        });
    });
});
