const HOURS = [...Array(23).keys()].map(i => i + 1).concat(0);
const QUARTERS = ["00", "15", "30", "45"];
const DAYS = 30;

let isMouseDown = false;
let dragMode = null;

// -----------------------------
// HEADER
// -----------------------------
const hoursRow = document.getElementById("hours-row");

HOURS.forEach(h => {
  const th = document.createElement("th");
  th.textContent = h;
  hoursRow.appendChild(th);
});

// -----------------------------
// TABEL GENEREREN
// -----------------------------
const daysBody = document.getElementById("days-body");

for (let day = 1; day <= DAYS; day++) {
  const tr = document.createElement("tr");

  const th = document.createElement("th");
  th.textContent = day;
  tr.appendChild(th);

  HOURS.forEach(hour => {
    const td = document.createElement("td");

    const hourDiv = document.createElement("div");
    hourDiv.classList.add("hour-cell");

    QUARTERS.forEach(q => {
      const quarterDiv = document.createElement("div");
      quarterDiv.classList.add("quarter");

      const key = `apr_sleep_d${day}_h${hour}_q${q}`;

      // laden
      if (localStorage.getItem(key) === "1") {
        quarterDiv.classList.add("active");
      }

      // ⭐ mousedown → enkelklik én start slepen
      quarterDiv.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isMouseDown = true;

        const isActive = quarterDiv.classList.contains("active");
        dragMode = isActive ? "off" : "on";

        applyDragState(quarterDiv, key); // direct kleuren bij 1× klik
      });

      // ⭐ mouseenter → tijdens slepen
      quarterDiv.addEventListener("mouseenter", () => {
        if (!isMouseDown || !dragMode) return;
        applyDragState(quarterDiv, key);
      });

      hourDiv.appendChild(quarterDiv);
    });

    td.appendChild(hourDiv);
    tr.appendChild(td);
  });

  daysBody.appendChild(tr);
}

// -----------------------------
// HELPER
// -----------------------------
function applyDragState(quarterDiv, key) {
  if (dragMode === "on") {
    quarterDiv.classList.add("active");
    localStorage.setItem(key, "1");
  } else if (dragMode === "off") {
    quarterDiv.classList.remove("active");
    localStorage.setItem(key, "0");
  }
}

// -----------------------------
// MUIS LOS
// -----------------------------
document.addEventListener("mouseup", () => {
  isMouseDown = false;
  dragMode = null;
});
