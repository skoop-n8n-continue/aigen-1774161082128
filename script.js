async function loadAppData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load app data:', error);
    return null;
  }
}

async function init() {
  const data = await loadAppData();
  if (!data) return;

  // Apply all data-driven styles before revealing
  const settings = data.sections.app_settings;
  if (settings) {
    if (settings.background_color) {
      document.documentElement.style.setProperty('--background-color', settings.background_color.value);
    }
    if (settings.text_color) {
      document.documentElement.style.setProperty('--text-color', settings.text_color.value);
    }
  }

  // Apply content
  const content = data.sections.main_content;
  if (content) {
    if (content.greeting) {
      document.getElementById('greeting').textContent = content.greeting.value;
    }
    if (content.subtext) {
      document.getElementById('subtext').textContent = content.subtext.value;
    }
  }

  // Reveal the app
  document.getElementById('app-container').classList.add('loaded');
}

// Start app
init();