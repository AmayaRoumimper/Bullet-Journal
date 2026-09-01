const trackerList = document.getElementById("tracker-list");

// 8 grote vakken maken
for (let itemIndex = 1; itemIndex <= 8; itemIndex++) {

  const box = document.createElement("div");
  box.classList.add("item-box");

  // label bovenaan
  const label = document.createElement("div");
  label.classList.add("item-label");

  const labelInput = document.createElement("input");
  labelInput.type = "text";
  labelInput.placeholder = "Naam...";

  // ⭐ Unieke APRIL key voor labels
  labelInput.dataset.key = `apr_tracker_label_${itemIndex}`;

  // 🔥 laad label uit Firebase
  db.collection("apr_tracker_labels").doc(labelInput.dataset.key).get().then(doc => {
    if (doc.exists) {
      labelInput.value = doc.data().value || "";
    }
  });

  // 🔥 opslaan label in Firebase
  labelInput.addEventListener("input", () => {
    db.collection("apr_tracker_labels").doc(labelInput.dataset.key).set({
      value: labelInput.value
    });
  });

  label.appendChild(labelInput);
  box.appendChild(label);

  // dag-vakjes
  const grid = document.createElement("div");
  grid.classList.add("days-grid");

  // rij 1: 1 t/m 15
  const row1 = document.createElement("div");
  row1.classList.add("day-row");

  for (let day = 1; day <= 15; day++) {
    row1.appendChild(createDayCell(itemIndex, day));
  }

  // rij 2: 16 t/m 30 (APRIL)
  const row2 = document.createElement("div");
  row2.classList.add("day-row");

  for (let day = 16; day <= 30; day++) {
    row2.appendChild(createDayCell(itemIndex, day));
  }

  grid.appendChild(row1);
  grid.appendChild(row2);

  box.appendChild(grid);
  trackerList.appendChild(box);
}

// -----------------------------
// Dagvakje maken
// -----------------------------
function createDayCell(itemIndex, dayNumber) {
  const cell = document.createElement("div");
  cell.classList.add("day-cell");

  cell.textContent = dayNumber;

  // ⭐ Unieke APRIL key voor dag-vakjes
  const key = `apr_tracker_item${itemIndex}_day${dayNumber}`;

  // 🔥 laad kleur uit Firebase
  db.collection("apr_tracker_days").doc(key).get().then(doc => {
    if (doc.exists && doc.data().active === true) {
      cell.classList.add("active");
    }
  });

  // 🔥 klik togglen + opslaan in Firebase
  cell.addEventListener("click", () => {
    const active = cell.classList.toggle("active");

    db.collection("apr_tracker_days").doc(key).set({
      active: active
    });
  });

  return cell;
}
