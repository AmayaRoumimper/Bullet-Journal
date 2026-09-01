const sportVakjes = document.querySelectorAll('.vak');

sportVakjes.forEach((vak, index) => {

    // ⭐ Unieke key voor JANUARI
    const key = `jan_sportvak_${index}`;

    /* 🔥 1. Laden uit Firebase */
    db.collection("jan_sport").doc(key).get().then(doc => {
        if (doc.exists && doc.data().gekozen === true) {
            vak.classList.add("gekozen");
        }
    });

    /* 🔥 2. Klikgedrag + opslaan in Firebase */
    vak.addEventListener("click", () => {
        const isChosen = vak.classList.toggle("gekozen");

        db.collection("jan_sport").doc(key).set({
            gekozen: isChosen
        });
    });
});
