const butInstall = document.getElementById("buttonInstall");

// An event handler to the beforeinstallprompt event to handle installation of the PWA
window.addEventListener("beforeinstallprompt", (event) => {
  // Store the event for later use
  window.deferredPrompt = event;

  // Show the install button
  butInstall.classList.toggle("hidden", false);
});

// A click event handler on the install button to prompt the user to install the PWA
butInstall.addEventListener("click", async () => {
  // Get the stored event
  const promptEvent = window.deferredPrompt;

  // If the event doesn't exist, do nothing
  if (!promptEvent) {
    return;
  }

  // Prompt the user to install the PWA
  promptEvent.prompt();

  // Clear the stored event
  window.deferredPrompt = null;

  // Hide the install button
  butInstall.classList.toggle("hidden", true);
});

// An event handler for the appinstalled event to clear the stored event
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
});
