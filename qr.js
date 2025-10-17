function startQRScanner(callback) {
  const reader = document.getElementById("reader");
  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText, decodedResult) => {
      html5QrCode.stop();
      reader.innerHTML = "";
      callback(decodedText);
    },
    (error) => {
      console.warn("QR error:", error);
    }
  );
}