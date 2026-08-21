const vakjes = document.querySelectorAll('.vak');

const kleuren = [
    "#750000", // rood (startkleur)
    "#FFEB3B", // geel
    "#0A2A6B", // Donkerblauw
    "#2196F3", // Blauw
    "#9E9E9E", // Grijs
    "#424242", // Donkergrijs
    "#1B5E20", // Donkergroen
    "#FFFFFF"  // Wit
];

const dagenPerMaand = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

vakjes.forEach((vak, index) => {
    const dag = Math.floor(index / 12) + 1;
    const maand = index % 12;

    if (dag > dagenPerMaand[maand]) {
        vak.classList.add('zwart');
        vak.style.backgroundColor = "#000000";  
        vak.dataset.kleur = "zwart";             
    }
});

vakjes.forEach((vak, index) => {
    if (vak.classList.contains('zwart')) return;

    const key = "weer_vak_" + index;
    const saved = localStorage.getItem(key);

    if (saved) {
        vak.style.backgroundColor = saved;
        vak.dataset.kleur = saved;
    } else {
        vak.style.backgroundColor = kleuren[0]; 
        vak.dataset.kleur = kleuren[0];
    }
});

vakjes.forEach((vak, index) => {
    vak.addEventListener('click', () => {
        if (vak.classList.contains('zwart')) return;

        const key = "weer_vak_" + index;

        const huidigeKleur = vak.dataset.kleur;
        const huidigeIndex = kleuren.indexOf(huidigeKleur);

        const nieuweIndex = (huidigeIndex + 1) % kleuren.length;
        const nieuweKleur = kleuren[nieuweIndex];

        vak.style.backgroundColor = nieuweKleur;
        vak.dataset.kleur = nieuweKleur;

        localStorage.setItem(key, nieuweKleur);
    });
});
