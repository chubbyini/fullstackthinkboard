import ngrok from "@ngrok/ngrok";

(async function () {
  try {
    const listener = await ngrok.forward({
      addr: 3000,
      authtoken_from_env: true,
    });

    console.log(`✅ Ngrok Tunnel established at: ${listener.url()}`);
  } catch (error) {
    console.error("❌ Ngrok error:", error.message);
  }
})();
