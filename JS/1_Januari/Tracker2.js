// laad label
db.collection("jan_tracker_labels").doc(labelInput.dataset.key).get().then(doc => {
    if (doc.exists) {
        labelInput.value = doc.data().value || "";
    }
});

// opslaan label
labelInput.addEventListener("input", () => {
    db.collection("jan_tracker_labels").doc(labelInput.dataset.key).set({
        value: labelInput.value
    });
});

function createDayCell(itemIndex, dayNumber) {
    const cell = document.createElement("div");
    cell.classList.add("day-cell");

    cell.textContent = dayNumber;

    // ⭐ Unieke JANUARI key voor dag-vakjes
    const key = `jan_tracker_item${itemIndex}_day${dayNumber}`;

    /* 🔥 LADEN UIT FIREBASE */
    db.collection("jan_tracker_days").doc(key).get().then(doc => {
        if (doc.exists && doc.data().active === true) {
            cell.classList.add("active");
        }
    });

    /* 🔥 OPSLAAN IN FIREBASE */
    cell.addEventListener("click", () => {
        const active = cell.classList.toggle("active");

        db.collection("jan_tracker_days").doc(key).set({
            active: active
        });
    });

    return cell;
}

