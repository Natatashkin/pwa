import "./js/gallery.js";

window.addEventListener("load", async () => {
  try {
    if ("serviceWorker" in navigator) {
      const request = await navigator.serviceWorker.register("/sw.js");
      console.log("[SW]: registration success", request);
      return request;
    }
  } catch (error) {
    console.log("[SW]: registration failed");
  }
});
