
(function () {
  // CSS custom properties to read from :root
  const VARS = [
    '--color-pink-light',
    '--color-yellow-light',
    '--color-orange-light',
    '--color-green-light',
    '--color-aqua-light',
    '--color-blue-light',
    '--color-purple-light'
  ];

  // Resolve actual values from CSS
  function readCssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  // Build the color pool once (on first run)
  function getColorPool() {
    return VARS.map(readCssVar).filter(Boolean);
  }

  // Assign a sticky random hover color to each element matching `selector`
  function assign(selector = '.rand-hover') {
    const pool = getColorPool();
    if (!pool.length) return;

    document.querySelectorAll(selector).forEach((el) => {
      if (el.dataset.hoverColor) return; 
      const randomIndex = Math.floor(Math.random() * pool.length);
      const color = pool[randomIndex];
      el.dataset.hoverColor = color;
      el.style.setProperty('--hover-bg', color);
    });
  }


  window.CBHoverColors = {
    assign,             
    vars: VARS.slice(), 
    get colors() {      
      return getColorPool();
    }
  };


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => assign());
  } else {
    assign();
  }
})();