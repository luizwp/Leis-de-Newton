function calcular() {
  const massa = parseFloat(document.getElementById("massa").value);
  const forca = parseFloat(document.getElementById("forca").value);
  const aceleracao = parseFloat(document.getElementById("aceleracao").value);
  const saida = document.getElementById("saida");
  const saida3 = document.getElementById("saida3");
  const tela = document.getElementById("tela");
  const ctx = tela.getContext("2d");

  let resultado = "";
  let m = massa, F = forca, a = aceleracao;

  // Verifica quais valores calcular
  if (!isNaN(m) && !isNaN(a) && isNaN(F)) {
    F = m * a;
    resultado = `Força calculada: F = m × a = ${m} × ${a} = <b>${F.toFixed(2)} N</b>`;
  } else if (!isNaN(F) && !isNaN(a) && isNaN(m)) {
    m = F / a;
    resultado = `Massa calculada: m = F ÷ a = ${F} ÷ ${a} = <b>${m.toFixed(2)} kg</b>`;
  } else if (!isNaN(F) && !isNaN(m) && isNaN(a)) {
    a = F / m;
    resultado = `Aceleração calculada: a = F ÷ m = ${F} ÷ ${m} = <b>${a.toFixed(2)} m/s²</b>`;
  } else {
    resultado = "⚠️ Informe exatamente dois valores e deixe um em branco!";
  }

  saida.innerHTML = resultado;

  // limpa o canvas
  ctx.clearRect(0, 0, tela.width, tela.height);

  // desenha o bloco
  ctx.fillStyle = "blue";
  ctx.fillRect(200, 100, 60, 60);

  // caso especial: aceleração = 0 (repouso ou MRU)
  if (a === 0) {
    // forças equilibradas (setas opostas iguais)
    ctx.beginPath();
    ctx.moveTo(200, 130);
    ctx.lineTo(140, 130);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillText("Força ←", 100, 120);

    ctx.beginPath();
    ctx.moveTo(260, 130);
    ctx.lineTo(320, 130);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillText("→ Força", 330, 140);

    saida3.innerHTML = `
      ✅ <b>Aceleração = 0</b><br>
      O corpo está em <b>repouso</b> (ou movimento retilíneo uniforme).<br><br>
      ➝ As forças estão <b>equilibradas</b>, resultando em força resultante nula.<br>
      ➝ Pela <b>1ª Lei de Newton (Inércia)</b>, ele permanecerá assim até que uma força externa atue.
    `;
  } 
  // caso aceleração diferente de 0 (aplica a 3ª Lei normal)
  else if (!isNaN(a)) {
    // ação
    ctx.beginPath();
    ctx.moveTo(260, 130);
    ctx.lineTo(350, 130);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillText("Ação (Força aplicada)", 360, 130);

    // reação
    ctx.beginPath();
    ctx.moveTo(200, 130);
    ctx.lineTo(100, 130);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillText("Reação (Força oposta)", 20, 115);

    saida3.innerHTML = `
      ⚡ <b>Aceleração = ${a.toFixed(2)} m/s²</b><br>
      ➝ Pela <b>2ª Lei</b>: F = m × a<br>
      ➝ Pela <b>3ª Lei</b>: Para toda ação existe uma reação de mesma intensidade em sentido oposto.<br><br>
      <b>Exemplos:</b><br>
      • Seu pé empurra o chão para trás e o chão o empurra para frente.<br>
      • Os gases de um foguete vão para baixo e o foguete sobe.
    `;
  }
}

document.getElementById('toggle-info').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar o comportamento padrão do link

    // Alternar a visibilidade da seção de informações com animação
    const infoSection = document.getElementById('info-section');
    if (infoSection.classList.contains('hidden')) {
        infoSection.classList.remove('hidden');
        infoSection.classList.add('visible');
        document.querySelector('.arrow-link img').style.transform = 'rotate(180deg)'; // Girar a seta
    } else {
        infoSection.classList.remove('visible');
        infoSection.classList.add('hidden');
        document.querySelector('.arrow-link img').style.transform = 'rotate(0deg)'; // Restaurar a seta
    }
});

document.getElementById('collapse-button').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar o comportamento padrão do link

    // Ocultar a caixa de resultados com animação
    const resultado = document.getElementById('pokemon-info');
    resultado.classList.add('hidden');
    document.getElementById('collapse-button').classList.add('hidden');
});