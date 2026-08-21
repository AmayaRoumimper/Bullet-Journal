function loadField(field) {
  const key = field.dataset.id;

  // 🔥 1. Waarde laden uit Firebase
  db.collection("media_fields").doc(key).get().then(doc => {
    if (doc.exists) {
      field.value = doc.data().value || "";
    }
  });

  // 🔥 2. Waarde opslaan in Firebase
  field.addEventListener('input', () => {
    db.collection("media_fields").doc(key).set({
      value: field.value
    });
  });
}

// Alle velden koppelen
document.querySelectorAll('.media-type').forEach(loadField);
document.querySelectorAll('.media-datum').forEach(loadField);
document.querySelectorAll('.media-titel').forEach(loadField);
document.querySelectorAll('.media-sterren').forEach(loadField);
