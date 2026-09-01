// alle vakjes selecteren
const sportVakjes = document.querySelectorAll('.vak');

// bij het laden: opgeslagen kleuren toepassen
sportVakjes.forEach((vak, index) => {

    // ⭐ Unieke key voor JANUARI
    const key = "nov_sportvak_" + index;

    // 🔥 laden uit Firebase
    db.collection("nov_sport").doc(key).get().then(doc => {
        if (doc.exists && doc.data().gekozen === true) {
            vak.classList.add("gekozen");
        }
    });

    // klikgedrag
    vak.addEventListener("click", () => {
        vak.classList.toggle("gekozen");

        // 🔥 opslaan in Firebase
        db.collection("nov_sport").doc(key).set({
            gekozen: vak.classList.contains("gekozen")
        });
    });
});
