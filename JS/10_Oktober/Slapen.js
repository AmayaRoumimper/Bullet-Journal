const HOURS = [...Array(24).keys()];
const QUARTERS = ["00", "15", "30", "45"];
const DAYS = 31;

let isMouseDown = false;
let dragMode = null;

const hoursRow = document.getElementById("hours-row");
HOURS.forEach(h => {
  const th = document.createElement("th");
  th.textContent = h;
  hoursRow.appendChild(th);
});

const daysBody = document.getElementById("days-body");

// -----------------------------
// DAGDOCUMENTEN MAKEN
// -----------------------------
const dayRows = [];
const dayQuarterCells = [];

for (let day = 1; day <= DAYS; day++) {
  const tr = document.createElement("tr");

  const th = document.createElement("th");
  th.textContent = day;
  tr.appendChild(th);

  const quarterCells = [];

  HOURS.forEach(hour => {
    const td = document.createElement("td");
    const hourDiv = document.createElement("div");
    hourDiv.classList.add("hour-cell");

    QUARTERS.forEach(q => {
      const quarterDiv = document.createElement("div");
      quarterDiv.classList.add("quarter");
      quarterCells.push(quarterDiv);

      hourDiv.appendChild(quarterDiv);
    });

    td.appendChild(hourDiv);
    tr.appendChild(td);
  });

  daysBody.appendChild(tr);

  dayRows.push(tr);
  dayQuarterCells.push(quarterCells);
}

// -----------------------------
// LADEN VAN FIREBASE
// -----------------------------
for (let day = 1; day <= DAYS; day++) {
  const cells = dayQuarterCells[day - 1];

  db.collection("okt_sleep").doc(`day_${day}`).get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      const active = data.active || [];

      active.forEach((state, i) => {
        if (state) cells[i].classList.add("active");
      });
    }
  });
}

// -----------------------------
// OPSLAAN IN FIREBASE
// -----------------------------
function saveDay(day) {
  const cells = dayQuarterCells[day - 1];
  const active = cells.map(c => c.classList.contains("active"));

  db.collection("okt_sleep").doc(`day_${day}`).set({
    active
  });
}

// -----------------------------
// SLEPEN / KLIKKEN
// -----------------------------
document.addEventListener("mouseup", () => {
  isMouseDown = false;
  dragMode = null;
});

dayQuarterCells.forEach((cells, dayIndex) => {
  cells.forEach((quarterDiv, quarterIndex) => {
    quarterDiv.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isMouseDown = true;

      const isActive = quarterDiv.classList.contains("active");
      dragMode = isActive ? "off" : "on";

      applyDragState(quarterDiv);
      saveDay(dayIndex + 1);
    });

    quarterDiv.addEventListener("mouseenter", () => {
      if (!isMouseDown || !dragMode) return;

      applyDragState(quarterDiv);
      saveDay(dayIndex + 1);
    });
  });
});

function applyDragState(quarterDiv) {
  if (dragMode === "on") {
    quarterDiv.classList.add("active");
  } else {
    quarterDiv.classList.remove("active");
  }
}
