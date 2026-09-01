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
  const key = `apr_moment_day_${day}`;
  input.dataset.key = key;

  /* 🔥 1. Laden uit Firebase */
  db.collection("apr_moment").doc(key).get().then(doc => {
    if (doc.exists) {
      input.value = doc.data().value || "";
    }
  });

  /* 🔥 2. Opslaan in Firebase */
  input.addEventListener("input", () => {
    db.collection("apr_moment").doc(key).set({
      value: input.value
    });
  });

  inputBox.appendChild(input);
  row.appendChild(inputBox);

  momentList.appendChild(row);
}
