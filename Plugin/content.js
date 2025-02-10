/**
 * Setup an event to fire when page finishes loading to avoid load block
 */
window.addEventListener("load", () => {
  urlObserver.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
  });
  
  checkUrlAndExecute();
});
window.addEventListener("unload", () => urlObserver.disconnect());
