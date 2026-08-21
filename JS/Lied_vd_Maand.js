const inputs = document.querySelectorAll('.lied-input, .artiest-input');

inputs.forEach(input => {
    const key = "lied_" + input.dataset.maand;

    // laad opgeslagen tekst
    const saved = localStorage.getItem(key);
    if (saved) {
        input.value = saved;
    }

    // opslaan bij typen
    input.addEventListener('input', () => {
        localStorage.setItem(key, input.value);
    });
});
