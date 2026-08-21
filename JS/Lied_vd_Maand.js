const inputs = document.querySelectorAll('.lied-input, .artiest-input');

inputs.forEach(input => {
    const key = "lied_" + input.dataset.maand;

    // 🔥 1. Tekst laden uit Firebase
    db.collection("liedjes").doc(key).get().then(doc => {
        if (doc.exists) {
            input.value = doc.data().value || "";
        }
    });

    // 🔥 2. Tekst opslaan in Firebase
    input.addEventListener('input', () => {
        db.collection("liedjes").doc(key).set({
            value: input.value
        });
    });
});
