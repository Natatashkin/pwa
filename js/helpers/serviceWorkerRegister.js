export const serviceWorkerRegister = async () => {
  try {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("/sw.js");

      console.log("[SW]: registration success");
    }
  } catch (error) {
    console.log("[SW]: registration failed");
  }
};
