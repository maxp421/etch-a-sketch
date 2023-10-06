'use strict'

const canvas = document.querySelector('#canvas');
//GENERATE CUSTOM EVENT for both mousedown and mouseover simultaneously?
canvas.addEventListener('drag', paint);
function paint(e) {
  if (!e.currentTarget.contains(e.target)) return;
  if (e.target.tagName !== 'TD') return;
  console.log(e.target.tagName);
}

for (let i = 0; i < 16; i++) {
  let tr = document.createElement('tr');
  canvas.append(tr);
  for (let j = 0; j < 16; j++) {
    let td = document.createElement('td');
    tr.append(td);
  }
}

