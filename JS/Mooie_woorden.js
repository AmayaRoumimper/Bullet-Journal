const vakjes = document.querySelectorAll('.box');

vakjes.forEach(vak => {
    const key = vak.dataset.id;

    const saved = localStorage.getItem(key);
    if (saved) vak.value = saved;

    vak.addEventListener('input', () => {
        localStorage.setItem(key, vak.value);
    });
});
