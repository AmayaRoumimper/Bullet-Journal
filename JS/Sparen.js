const datumVakken = document.querySelectorAll('.lijn-datum');
const bedragVakken = document.querySelectorAll('.lijn-bedrag');
const blokken = [...document.querySelectorAll('.vul-blok')];

/* --- LADEN VAN BEDRAGEN & DATUMS --- */
function loadFields() {
    // Bedragen
    bedragVakken.forEach(vak => {
        const key = vak.dataset.key;

        db.collection("spaarpot").doc(key).get().then(doc => {
            if (doc.exists) {
                vak.value = doc.data().value || "";
            }
        });

        vak.addEventListener("input", () => {
            db.collection("spaarpot").doc(key).set({
                value: vak.value
            });
            checkEnVulPot();
        });
    });

    // Datums
    datumVakken.forEach(vak => {
        const key = vak.dataset.key;

        db.collection("spaarpot").doc(key).get().then(doc => {
            if (doc.exists) {
                vak.value = doc.data().value || "";
            }
        });

        vak.addEventListener("input", () => {
            db.collection("spaarpot").doc(key).set({
                value: vak.value
            });
            checkEnVulPot();
        });
    });
}

/* --- POT VULLEN OP BASIS VAN COMPLETE LIJNEN --- */
function checkEnVulPot() {
    let completeLijnen = 0;

    for (let i = 0; i < 10; i++) {
        const bedrag = bedragVakken[i].value.trim();
        const datum = datumVakken[i].value.trim();

        if (bedrag !== "" && datum !== "") {
            completeLijnen++;
        }
    }

    // reset alle blokjes
    blokken.forEach(blok => blok.style.opacity = 0);

    // vul juiste aantal blokjes
    for (let i = 0; i < completeLijnen; i++) {
        blokken[i].style.opacity = 1;
    }

    // opslaan in Firebase
    db.collection("spaarpot_status").doc("lijnen").set({
        completeLijnen: completeLijnen
    });
}

/* --- LADEN VAN COMPLETE LIJNEN --- */
function loadPotStatus() {
    db.collection("spaarpot_status").doc("lijnen").get().then(doc => {
        if (doc.exists) {
            const saved = doc.data().completeLijnen || 0;

            for (let i = 0; i < saved; i++) {
                blokken[i].style.opacity = 1;
            }
        }
    });
}

/* --- START --- */
loadFields();
loadPotStatus();
