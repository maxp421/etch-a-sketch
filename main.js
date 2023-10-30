"use strict";
const DEFAULT_CANVAS_SIZE = 40;
const DEFAULT_COLOR = "#F02EAA";
let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_CANVAS_SIZE;

const canvas = document.querySelector("#canvas");
const btnSize = document.querySelector("#btn--size");
const btnColorPicker = document.querySelector("#colorPicker");
btnColorPicker.value = DEFAULT_COLOR;
console.log(btnColorPicker)
const btnReset = document.querySelector("#btn--reset");

canvas.addEventListener("mouseover", paint);
canvas.addEventListener("mousedown", paint);
canvas.addEventListener("contextmenu", (e) => e.preventDefault());
btnSize.addEventListener("click", setCanvasSize);
btnColorPicker.addEventListener("input", setColor);
btnReset.addEventListener("click", () => {
  resetCanvas(currentSize);
});

function paint(e) {
  if (!e.currentTarget.contains(e.target)) return;
  if (e.target.tagName !== "TD") return;
  if (e.buttons !== 1) return;
  e.target.style.backgroundColor = currentColor;
  e.preventDefault();
}

function createCanvas(size) {
  for (let i = 0; i < size; i++) {
    let tr = document.createElement("tr");
    canvas.append(tr);
    for (let j = 0; j < size; j++) {
      let td = document.createElement("td");
      tr.append(td);
    }
  }
}
function resetCanvas(size) {
  canvas.innerHTML = "";
  createCanvas(size);
}

function setCanvasSize() {
  const dialog = document.querySelector("#sizeDialog");
  dialog.showModal();
  const form = document.forms.sizeForm;
  const closeBtn = form.elements.close;
  const range = form.elements.size;
  //always displays currentSize
  range.value = currentSize;
  const rangeValue = form.querySelector("#rangeValue");
  rangeValue.textContent = range.value;

  range.oninput = () => {
    rangeValue.textContent = range.value;
  };

  closeBtn.onclick = () => {
    dialog.close();
  };

  form.onsubmit = () => {
    currentSize = range.value;
    resetCanvas(range.value);
    dialog.close();
  };
}

function setColor(e) {
  currentColor = e.target.value;
}

createCanvas(currentSize);
