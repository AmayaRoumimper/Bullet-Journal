const vakjes = document.querySelectorAll('.vak');

vakjes.forEach((vak, index) => {
    const key = "boekenvak_" + index;

    const saved = localStorage.getItem(key);
    if (saved === "true") {
        vak.classList.add('gekozen');
    }

    vak.addEventListener('click', () => {
        if (vak.classList.contains('zwart')) return; // zwarte vakjes niet klikbaar

        vak.classList.toggle('gekozen');
        localStorage.setItem(key, vak.classList.contains('gekozen'));
    });
});

const dagenPerMaand = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

vakjes.forEach((vak, index) => {
    const dag = Math.floor(index / 12) + 1;
    const maand = index % 12;

    if (dag > dagenPerMaand[maand]) {
        vak.classList.add('zwart');
    }
});
