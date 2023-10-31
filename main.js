"use strict";
const DEFAULT_CANVAS_SIZE = 40;
const DEFAULT_COLOR = "#F02EAA";

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_CANVAS_SIZE;
let rainbow = {
  active: false,
  getRandomHexClr: function () {
    return "#" + Math.floor(Math.random() * 16777216).toString(16);
  },
};
//Darken not working as intended, needs full rework.
//Make toggle visible
let darken = {
  active: false,
  originalColor: "",
  originalShadeDecimal: "",
  currentShadeDecimal: "",
  getNextDarkerShade: function (currentColor) {
    if (this.originalColor !== currentColor) {
      this.originalColor = currentColor;
      this.originalShadeDecimal = parseInt(this.originalColor.substring(1), 16);
      this.currentShadeDecimal = this.originalShadeDecimal;
      return currentColor;
    }

    this.currentShadeDecimal -= Math.round(this.originalShadeDecimal / 10);

    if (this.currentShadeDecimal <= 0) {
      this.currentShadeDecimal = "000000";
      this.originalColor = "";
      this.active = false;
      btnDarken.dataset.active = 'false';
    }
    console.log(darken);
    return "#" + this.currentShadeDecimal.toString(16);
  },
};

const canvas = document.querySelector("#canvas");
const btnSize = document.querySelector("#btn--size");
const btnColorPicker = document.querySelector("#colorPicker");
btnColorPicker.value = DEFAULT_COLOR;
const btnReset = document.querySelector("#btn--reset");
const btnRainbow = document.querySelector("#btn--rainbow");
const btnDarken = document.querySelector("#btn--darken");

canvas.addEventListener("mouseover", paint);
canvas.addEventListener("mousedown", paint);
canvas.addEventListener("contextmenu", (e) => e.preventDefault());
btnSize.addEventListener("click", setCanvasSize);
btnColorPicker.addEventListener("input", setColor);
btnReset.addEventListener("click", () => {
  resetCanvas(currentSize);
});


//in case of more buttons, group all "mode" objects into 1 object, that way
//all can be toggled with a loop or perhaps make a variable which holds the current
//active button. Both redundant with 2 buttons :D
//
btnRainbow.addEventListener("click", () => {
  rainbow.active ? (rainbow.active = false) : (rainbow.active = true);
  btnRainbow.dataset.active === 'true'
    ? (btnRainbow.dataset.active = 'false')
    : (btnRainbow.dataset.active = 'true');
  darken.active = false;
  btnDarken.dataset.active = false;
});
btnDarken.addEventListener("click", () => {
  darken.active ? (darken.active = false) : (darken.active = true);
  btnDarken.dataset.active === 'true'
    ? (btnDarken.dataset.active = 'false')
    : (btnDarken.dataset.active = 'true');
  rainbow.active = false;
  btnRainbow.dataset.active = false;
});

function paint(e) {
  if (!e.currentTarget.contains(e.target)) return;
  if (e.target.tagName !== "TD") return;
  if (e.buttons !== 1) return;

  //fizzbuzz - change so you can add infinite methods without infinite if else tree
  //finish darken, add effects on buttons so the user knows they are active.
  if (rainbow.active) {
    e.target.style.backgroundColor = rainbow.getRandomHexClr();
  } else if (darken.active) {
    e.target.style.backgroundColor = darken.getNextDarkerShade(currentColor);
  } else e.target.style.backgroundColor = currentColor;
  // if (darken) currentColor = darkerHexClr();

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
