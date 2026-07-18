(() => {
  if (!("serviceWorker" in navigator)) return;

  navigator.serviceWorker.addEventListener("message", (event) => {
    const data = event.data;
    if (!data || !data.type?.startsWith("IMAGE_PRECACHE_")) return;

    document.documentElement.dataset.imageCacheCompleted = String(data.completed);
    document.documentElement.dataset.imageCacheTotal = String(data.total);
    document.documentElement.dataset.imageCacheState =
      data.type === "IMAGE_PRECACHE_COMPLETE"
        ? (data.failed === 0 ? "ready" : "partial")
        : "loading";

    window.dispatchEvent(new CustomEvent("imagecacheprogress", {
      detail: data
    }));
  });

  navigator.serviceWorker.register("service-worker.js", { scope: "./" })
    .then(() => navigator.serviceWorker.ready)
    .then((registration) => {
      registration.active?.postMessage({ type: "START_IMAGE_PRECACHE" });
    })
    .catch((error) => {
      console.warn("图片缓存服务启动失败，游戏将继续使用普通网络加载。", error);
    });
})();
