function loadField(field) {
  const key = field.dataset.id;
  const saved = localStorage.getItem(key);
  if (saved) field.value = saved;

  field.addEventListener('input', () => {
    localStorage.setItem(key, field.value);
  });
}

document.querySelectorAll('.media-type').forEach(loadField);
document.querySelectorAll('.media-datum').forEach(loadField);
document.querySelectorAll('.media-titel').forEach(loadField);
document.querySelectorAll('.media-sterren').forEach(loadField);
