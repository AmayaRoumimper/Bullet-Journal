function saveData() {
  const data = {
    notes: document.querySelector("#notes").value,
    updatedAt: new Date()
  };

  db.collection("Journal").doc("AR").set(data)
    .then(() => {
      console.log("Data opgeslagen!");
    })
    .catch((error) => {
      console.error("Fout bij opslaan:", error);
    });
}

function loadData() {
  db.collection("Journal").doc("AR").get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        document.querySelector("#notes").value = data.notes || "";
      } else {
        console.log("Geen data gevonden");
      }
    })
    .catch((error) => {
      console.error("Fout bij laden:", error);
    });
}

window.addEventListener("load", loadData);

<textarea id="notes" onchange="saveData()"></textarea>
