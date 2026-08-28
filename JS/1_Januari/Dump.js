const vakjes = document.querySelectorAll('.box');

// 🔥 1. Waarde laden uit Firebase
vakjes.forEach(vak => {
    const key = vak.dataset.id;

    db.collection("jan_box_values").doc(key).get().then(doc => {
        if (doc.exists) {
            vak.value = doc.data().value || "";
        }
    });

    // 🔥 2. Waarde opslaan in Firebase
    vak.addEventListener('input', () => {
        db.collection("jan_box_values").doc(key).set({
            value: vak.value
        });
    });
});
