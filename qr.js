function startQRScanner() {
  const reader = document.getElementById("reader");
  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText, decodedResult) => {
      html5QrCode.stop();
      reader.innerHTML = "";
      localStorage.setItem("last_qr", decodedText);
      showSnackbar(`Código leído: ${decodedText}`);
      setTimeout(() => {
        const previous = localStorage.getItem("previous_page") || "index.html";
        window.location.href = previous;
      }, 2000);
    },
    (error) => console.warn("QR error:", error)
  );
}