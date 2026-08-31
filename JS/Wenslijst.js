const inputs = document.querySelectorAll('.wens-omschrijving, .wens-prijs, .wens-check');

inputs.forEach(input => {
    const key = "wenslijst_" + input.dataset.key;

    // 🔥 Laden uit Firebase
    db.collection("wenslijst").doc(key).get().then(doc => {
        if (doc.exists) {
            const data = doc.data();

            if (input.type === "checkbox") {
                input.checked = data.checked || false;
            } else {
                input.value = data.value || "";
            }
        }
    });

    // 🔥 Opslaan in Firebase
    input.addEventListener('input', () => {
        if (input.type === "checkbox") {
            db.collection("wenslijst").doc(key).set({
                checked: input.checked
            });
        } else {
            db.collection("wenslijst").doc(key).set({
                value: input.value
            });
        }
    });
});
