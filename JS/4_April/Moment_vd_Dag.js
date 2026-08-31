const momentList = document.getElementById("moment-list");

// 31 regels maken
for (let day = 1; day <= 30; day++) {

  const row = document.createElement("div");
  row.classList.add("moment-row");

  // dagnummer links
  const number = document.createElement("div");
  number.classList.add("day-number");
  number.textContent = day;
  row.appendChild(number);

  // invulvak rechts
  const inputBox = document.createElement("div");
  inputBox.classList.add("moment-input");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Moment van de dag...";

  // ⭐ Unieke key voor JANUARI
  input.dataset.key = `apr_moment_day_${day}`;

  // laden
  const saved = localStorage.getItem(input.dataset.key);
  if (saved) input.value = saved;

  // opslaan
  input.addEventListener("input", () => {
    localStorage.setItem(input.dataset.key, input.value);
  });

  inputBox.appendChild(input);
  row.appendChild(inputBox);

  momentList.appendChild(row);
}
