const vakjes = document.querySelectorAll('.bingo-vak');
const inputs = document.querySelectorAll('.bingo-input');

// X opslaan en laden
vakjes.forEach(vak => {
    const id = vak.dataset.id;
    const status = localStorage.getItem(id);

    if (status === "true") {
        vak.classList.add('gekruist');
    }

    vak.addEventListener('click', () => {
        vak.classList.toggle('gekruist');
        localStorage.setItem(id, vak.classList.contains('gekruist'));
    });
});

// Tekst opslaan en laden
inputs.forEach(input => {
    const key = input.dataset.text;
    const saved = localStorage.getItem(key);

    if (saved) {
        input.value = saved;
    }

    input.addEventListener('input', () => {
        localStorage.setItem(key, input.value);
    });
});
