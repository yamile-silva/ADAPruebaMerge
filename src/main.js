const container = document.querySelector(".data-container");

document.getElementById('variables')
    .addEventListener('submit',function(e){
  const tam =document.getElementById('ta').value;
  const delay= document.getElementById('ve').value;
  const li = document.getElementById("li").value;
  const ls = document.getElementById("ls").value;
   generateBlocks(tam,li,ls);
   bubbleSort(delay);
  e.preventDefault();
})

function generateBlocks(num, li , ls) {
  for (let i = 0; i < num; i += 1) {
    const value = Math.floor(Math.random()*(ls-li)) + Math.floor(li);
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.height = `${value * 1}px`;
    block.style.transform = `translateX(${i * 25}px)`;
    block.style.transform = `translateY(${100}px)`;

    const blockLabel = document.createElement("label");
    blockLabel.classList.add("block__id");
    blockLabel.innerHTML = value;
    
    block.appendChild(blockLabel);
    container.appendChild(block);
  }
}

function swap(el1, el2) {
  return new Promise(resolve => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    const transform1 = style1.getPropertyValue("transform");
    const transform2 = style2.getPropertyValue("transform");

    el1.style.transform = transform2;
    el2.style.transform = transform1;

    // esperar a que acabe la transición
    window.requestAnimationFrame(function() {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, 250);
    });
  });
}

async function bubbleSort(delay) {

  let blocks = document.querySelectorAll(".block");
  for (let i = 0; i < blocks.length - 1; i += 1) {
    for (let j = 0; j < blocks.length - i - 1; j += 1) {
      /*Se va cambiando de color conforme avanza */
      blocks[j].style.backgroundColor = "#AD0025";
      blocks[j + 1].style.backgroundColor = "#AD0025";

      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      const value1 = Number(blocks[j].childNodes[0].innerHTML);
      const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

      if (value1 > value2) {
        await swap(blocks[j], blocks[j + 1]);
        blocks = document.querySelectorAll(".block");
      }
      /* Se regresa al color base */
      blocks[j].style.backgroundColor = "  #057715fb";
      blocks[j + 1].style.backgroundColor = "  #057715fb";
    }
    /*Se cambia al color final luego de ser ordenado */
    blocks[blocks.length - i - 1].style.backgroundColor = "#F8C405";
  }
  blocks[0].style.backgroundColor ="#F8C405";
}

