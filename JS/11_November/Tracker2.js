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

  // ⭐ Unieke JANUARI key voor labels
  labelInput.dataset.key = `nov_tracker_label_${itemIndex}`;

  // laad label
  const savedLabel = localStorage.getItem(labelInput.dataset.key);
  if (savedLabel) labelInput.value = savedLabel;

  // opslaan label
  labelInput.addEventListener("input", () => {
    localStorage.setItem(labelInput.dataset.key, labelInput.value);
  });

  label.appendChild(labelInput);
  box.appendChild(label);

  // dag-vakjes
  const grid = document.createElement("div");
  grid.classList.add("days-grid");

  // rij 1: 1 t/m 16
  const row1 = document.createElement("div");
  row1.classList.add("day-row");

  for (let day = 1; day <= 15; day++) {
    row1.appendChild(createDayCell(itemIndex, day));
  }

  // rij 2: 17 t/m 31
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

  // ⭐ Unieke JANUARI key voor dag-vakjes
  const key = `nov_tracker_item${itemIndex}_day${dayNumber}`;

  // laad kleur
  if (localStorage.getItem(key) === "1") {
    cell.classList.add("active");
  }

  // klik togglen
  cell.addEventListener("click", () => {
    const active = cell.classList.toggle("active");
    localStorage.setItem(key, active ? "1" : "0");
  });

  return cell;
}
