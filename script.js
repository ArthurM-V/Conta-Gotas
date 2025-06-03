"use strict";
// import { dicas } from "./hints";

window.addEventListener("DOMContentLoaded", () => {
  const pesoInfo = document.getElementById("peso-info");
  const calcBtn = document.getElementById("calcular");
  const resultado = document.getElementById("resultado");

  function calcular() {
    const peso = parseFloat(pesoInfo.value);

    if (isNaN(peso) || peso <= 0) {
      resultado.textContent = "Por favor, insira um peso válido.";
      return;
    }

    const idealmL = peso * 35;
    const litros = (idealmL / 1000).toFixed(2);

    resultado.textContent = `Você deve beber aproximadamente ${litros} litros de água por dia.`;
  }

  calcBtn.addEventListener("click", calcular);
});
