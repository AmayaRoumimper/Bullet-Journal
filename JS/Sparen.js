const datumVakken = document.querySelectorAll('.lijn-datum');
const bedragVakken = document.querySelectorAll('.lijn-bedrag');
const blokken = [...document.querySelectorAll('.vul-blok')];

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

    // opslaan
    localStorage.setItem("completeLijnen", completeLijnen);
}

/* --- LADEN BIJ START --- */
const saved = Number(localStorage.getItem("completeLijnen")) || 0;
for (let i = 0; i < saved; i++) {
    blokken[i].style.opacity = 1;
}

/* --- OPSLAAN VAN BEDRAGEN --- */
bedragVakken.forEach((vak) => {
    const key = vak.dataset.key;
    const saved = localStorage.getItem(key);
    if (saved) vak.value = saved;

    vak.addEventListener("input", () => {
        localStorage.setItem(key, vak.value);
        checkEnVulPot();
    });
});

/* --- OPSLAAN VAN DATUMS --- */
datumVakken.forEach((vak) => {
    const key = vak.dataset.key;
    const saved = localStorage.getItem(key);
    if (saved) vak.value = saved;

    vak.addEventListener("input", () => {
        localStorage.setItem(key, vak.value);
        checkEnVulPot();
    });
});
