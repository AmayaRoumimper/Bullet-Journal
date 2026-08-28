// alle vakjes selecteren
const sportVakjes = document.querySelectorAll('.vak');

// bij het laden: opgeslagen kleuren toepassen
sportVakjes.forEach((vak, index) => {

    // ⭐ Unieke key 
    const key = "maa_sportvak_" + index;

    const saved = localStorage.getItem(key);

    if (saved === "gekozen") {
        vak.classList.add("gekozen");
    }

    // klikgedrag
    vak.addEventListener("click", () => {
        vak.classList.toggle("gekozen");

        // opslaan
        if (vak.classList.contains("gekozen")) {
            localStorage.setItem(key, "gekozen");
        } else {
            localStorage.removeItem(key);
        }
    });
});
