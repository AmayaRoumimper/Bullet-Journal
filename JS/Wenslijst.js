const inputs = document.querySelectorAll('.wens-omschrijving, .wens-prijs, .wens-check');

inputs.forEach(input => {
    const key = "wenslijst_" + input.dataset.key;

    // Laden
    const saved = localStorage.getItem(key);
    if (input.type === "checkbox") {
        input.checked = saved === "true";
    } else {
        if (saved) input.value = saved;
    }

    // Opslaan
    input.addEventListener('input', () => {
        if (input.type === "checkbox") {
            localStorage.setItem(key, input.checked);
        } else {
            localStorage.setItem(key, input.value);
        }
    });
});
