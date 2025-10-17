function onScanSuccess(decodedText, decodedResult) {
  console.log(`Código detectado: ${decodedText}`);
  
  // Mostrar el resultado
  document.getElementById("result").innerHTML = `
    <p>✅ Código detectado:</p>
    <strong>${decodedText}</strong>
  `;

  // Ejemplo: lógica para niveles
  if (decodedText === "CAFE") {
    window.location.href = "nivel2.html";
  } else if (decodedText === "AMOR") {
    alert("¡Has encontrado la pista del amor! 💕");
  } else {
    alert("Código no reconocido 😅");
  }
}

function onScanFailure(error) {
  // Ignora errores de lectura repetidos
  console.warn(`Error: ${error}`);
}

// Inicia el lector
const html5QrCode = new Html5Qrcode("reader");
html5QrCode.start(
  { facingMode: "environment" }, // cámara trasera
  { fps: 10, qrbox: 250 },
  onScanSuccess,
  onScanFailure
);