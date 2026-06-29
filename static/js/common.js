// TUXIA GitHub static edition: browser-only tools with no account or backend API.

var toastTimer;
var TUXIA_SETTINGS_KEY = 'tuxia_settings_public';

function showToast(msg) {
  var toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(function() { toast.classList.remove('show'); }, 2000);
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function getSitePath(path) {
  var cleanPath = String(path || '').replace(/^\/+/, '');
  var scripts = document.getElementsByTagName('script');
  for (var i = scripts.length - 1; i >= 0; i--) {
    var src = scripts[i].getAttribute('src') || '';
    var marker = '/js/common.js';
    var index = src.indexOf(marker);
    if (index >= 0) return src.slice(0, index + 1) + cleanPath;
  }
  return '/' + cleanPath;
}

function getFriendlyErrorMessage(err, fallback) {
  var message = err && err.message ? String(err.message) : '';
  if (/failed to fetch|networkerror|load failed|network request failed/i.test(message)) {
    return 'Network connection failed. Check your connection or try again later.';
  }
  if (/timeout/i.test(message)) return 'Request timed out. Please try again later.';
  return fallback || 'The operation failed. Please try again later.';
}

function validateImageFile(file, maxSize) {
  if (!file || !file.type || !file.type.startsWith('image/')) {
    showToast('Please choose an image file');
    return false;
  }
  var limit = maxSize || 10 * 1024 * 1024;
  if (file.size > limit) {
    showToast('File size must be under ' + formatSize(limit));
    return false;
  }
  return true;
}

function getSettings() {
  try {
    return JSON.parse(localStorage.getItem(TUXIA_SETTINGS_KEY) || '{}');
  } catch (err) {
    return {};
  }
}

function saveSettingsObj(obj) {
  var current = getSettings();
  Object.keys(obj || {}).forEach(function(key) {
    current[key] = obj[key];
  });
  try {
    localStorage.setItem(TUXIA_SETTINGS_KEY, JSON.stringify(current));
  } catch (err) {}
  showToast('Settings saved');
}

function loadApiKey() {
  var s = getSettings();
  var el = document.getElementById('api-key');
  if (el) el.value = s.apiKey || '';
}

function getPreferredTheme() {
  try {
    var saved = localStorage.getItem('tuxia_theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch (err) {}
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

function applyTheme(theme) {
  var nextTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', nextTheme);
  document.querySelectorAll('[data-theme-toggle]').forEach(function(btn) {
    btn.setAttribute('aria-pressed', nextTheme === 'dark' ? 'true' : 'false');
    btn.setAttribute('title', nextTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
  var next = current === 'dark' ? 'light' : 'dark';
  try {
    localStorage.setItem('tuxia_theme', next);
  } catch (err) {}
  applyTheme(next);
}

function bindThemeToggle() {
  applyTheme(getPreferredTheme());
  document.querySelectorAll('[data-theme-toggle]').forEach(function(btn) {
    btn.addEventListener('click', toggleTheme);
  });
}

function bindHeaderScrollState() {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var headerDetails = header.querySelectorAll('details');
  function updateHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  function updateMenuState() {
    header.classList.toggle('is-menu-open', !!header.querySelector('details[open]'));
  }
  function closeHeaderMenus() {
    headerDetails.forEach(function(details) { details.removeAttribute('open'); });
    updateMenuState();
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  headerDetails.forEach(function(details) {
    details.addEventListener('toggle', updateMenuState);
  });
  document.addEventListener('click', function(e) {
    if (!header.querySelector('details[open]')) return;
    if (header.contains(e.target)) return;
    closeHeaderMenus();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeHeaderMenus();
  });
}

function scrollToToolsSection() {
  var target = document.getElementById('tools');
  if (!target) return false;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

function bindToolSectionLinks() {
  document.querySelectorAll('[data-scroll-tools]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var path = window.location.pathname.replace(/\/index\.html$/, '/');
      if (path === '/' && scrollToToolsSection()) {
        e.preventDefault();
        return;
      }
      try {
        sessionStorage.setItem('tuxia_scroll_tools', '1');
      } catch (err) {}
    });
  });
  try {
    if (sessionStorage.getItem('tuxia_scroll_tools') === '1') {
      sessionStorage.removeItem('tuxia_scroll_tools');
      setTimeout(scrollToToolsSection, 60);
    }
  } catch (err) {}
}

function bindDragDrop(dropZoneEl, fileInputEl, onFileCallback) {
  dropZoneEl.addEventListener('click', function() {
    fileInputEl.click();
  });
  dropZoneEl.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropZoneEl.classList.add('drag-over');
  });
  dropZoneEl.addEventListener('dragleave', function() {
    dropZoneEl.classList.remove('drag-over');
  });
  dropZoneEl.addEventListener('drop', function(e) {
    e.preventDefault();
    dropZoneEl.classList.remove('drag-over');
    if (e.dataTransfer.files.length > 0) onFileCallback(e.dataTransfer.files[0]);
  });
  fileInputEl.addEventListener('change', function() {
    if (fileInputEl.files.length > 0) onFileCallback(fileInputEl.files[0]);
  });
}

function copyToClipboard(text, callback) {
  function done() {
    showToast('Copied to clipboard');
    if (callback) callback();
  }
  function fallback() {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      if (document.execCommand('copy')) done();
      else showToast('Copy failed. Please copy manually.');
    } catch (err) {
      showToast('Copy failed. Please copy manually.');
    }
    document.body.removeChild(ta);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(fallback);
  } else {
    fallback();
  }
}

function mimeToExt(type) {
  var map = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
    'image/bmp': 'bmp',
    'image/svg+xml': 'svg'
  };
  return map[type] || 'png';
}

function downloadBlob(blob, filename) {
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(function() { URL.revokeObjectURL(url); }, 500);
}

function downloadDataUrl(dataUrl, filename) {
  var a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

function canvasToBlob(canvas, type, quality, callback) {
  if (type === 'image/bmp') type = 'image/png';
  canvas.toBlob(function(blob) {
    if (blob) callback(blob, mimeToExt(type));
  }, type, quality);
}

function canvasToBmpBlob(canvas) {
  var w = canvas.width;
  var h = canvas.height;
  var ctx = canvas.getContext('2d');
  var pixels = ctx.getImageData(0, 0, w, h).data;
  var rowSize = Math.floor((24 * w + 31) / 32) * 4;
  var dataSize = rowSize * h;
  var buffer = new ArrayBuffer(54 + dataSize);
  var view = new DataView(buffer);

  function writeStr(offset, value) {
    for (var i = 0; i < value.length; i++) view.setUint8(offset + i, value.charCodeAt(i));
  }

  writeStr(0, 'BM');
  view.setUint32(2, 54 + dataSize, true);
  view.setUint32(10, 54, true);
  view.setUint32(14, 40, true);
  view.setInt32(18, w, true);
  view.setInt32(22, h, true);
  view.setUint16(26, 1, true);
  view.setUint16(28, 24, true);
  view.setUint32(34, dataSize, true);
  view.setInt32(38, 2835, true);
  view.setInt32(42, 2835, true);

  for (var y = h - 1; y >= 0; y--) {
    var rowOffset = 54 + (h - 1 - y) * rowSize;
    for (var x = 0; x < w; x++) {
      var src = (y * w + x) * 4;
      var dst = rowOffset + x * 3;
      view.setUint8(dst, pixels[src + 2]);
      view.setUint8(dst + 1, pixels[src + 1]);
      view.setUint8(dst + 2, pixels[src]);
    }
  }

  return new Blob([buffer], { type: 'image/bmp' });
}

function downloadImageDataUrl(dataUrl, baseName, format) {
  if (!dataUrl) {
    showToast('Generate downloadable content first');
    return;
  }
  var ext = format || 'png';
  if (ext === 'svg') {
    var img = new Image();
    img.onload = function() {
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + img.width + '" height="' + img.height + '" viewBox="0 0 ' + img.width + ' ' + img.height + '"><image href="' + dataUrl + '" width="' + img.width + '" height="' + img.height + '"/></svg>';
      downloadBlob(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), baseName + '.svg');
    };
    img.src = dataUrl;
    return;
  }
  var mime = ext === 'jpg' ? 'image/jpeg' : 'image/' + ext;
  var img2 = new Image();
  img2.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = img2.width;
    canvas.height = img2.height;
    var ctx = canvas.getContext('2d');
    if (mime === 'image/jpeg') {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img2, 0, 0);
    if (ext === 'bmp') {
      downloadBlob(canvasToBmpBlob(canvas), baseName + '.bmp');
      return;
    }
    canvasToBlob(canvas, mime, 0.92, function(blob, realExt) {
      downloadBlob(blob, baseName + '.' + (ext === 'jpg' ? 'jpg' : realExt));
    });
  };
  img2.src = dataUrl;
}

function getImageDimensions(dataUrl, callback) {
  var img = new Image();
  img.onload = function() { callback(img.width, img.height); };
  img.src = dataUrl;
}

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

function clearCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + window.location.hostname;
}

function getTranslateCookie() {
  var match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : '';
}

function getCurrentLanguagePreference() {
  var docLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
  if (docLang.indexOf('zh-tw') === 0 || docLang.indexOf('zh-hant') === 0) return 'zh-TW';
  if (docLang.indexOf('zh') === 0) return 'zh-CN';
  var cookie = getTranslateCookie();
  var saved = '';
  try { saved = localStorage.getItem('tuxia_language') || ''; } catch (err) {}
  if (cookie.indexOf('/zh-TW') >= 0 || saved === 'zh-TW') return 'zh-TW';
  return cookie.indexOf('/zh-CN') >= 0 || saved === 'zh-CN' ? 'zh-CN' : 'en';
}

function correctBrandTranslation() {
  var lang = getCurrentLanguagePreference();
  var brandName = lang === 'zh-CN' ? '图匣' : (lang === 'zh-TW' ? '圖匣' : 'TUXIA');
  var brandSubtitle = lang === 'zh-CN' ? '图像工具' : (lang === 'zh-TW' ? '圖像工具' : 'IMAGE TOOLS');
  document.querySelectorAll('[data-brand-name]').forEach(function(node) {
    node.textContent = brandName;
  });
  document.querySelectorAll('[data-brand-subtitle]').forEach(function(node) {
    node.textContent = brandSubtitle;
  });
  document.querySelectorAll('body *').forEach(function(node) {
    if (!node.childNodes || node.childNodes.length !== 1) return;
    var textNode = node.childNodes[0];
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;
    if (textNode.nodeValue.indexOf('兔侠') >= 0) {
      textNode.nodeValue = textNode.nodeValue.replace(/兔侠/g, '图匣');
    }
  });
}

function observeBrandTranslation() {
  correctBrandTranslation();
  if (!window.MutationObserver || !document.body) return;
  var timer = null;
  var observer = new MutationObserver(function() {
    if (timer) return;
    timer = setTimeout(function() {
      timer = null;
      correctBrandTranslation();
    }, 80);
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(correctBrandTranslation, 600);
  setTimeout(correctBrandTranslation, 1600);
}

function applyLanguagePreference(lang) {
  var target = lang === 'zh-CN' || lang === 'zh-TW' ? lang : 'en';
  try { localStorage.setItem('tuxia_language', target); } catch (err) {}
  var alternate = document.querySelector('link[rel="alternate"][hreflang="' + target + '"]');
  if (alternate && alternate.href && alternate.href !== window.location.href) {
    if (target === 'en') {
      clearCookie('googtrans');
    }
    window.location.href = alternate.href;
    return;
  }
  if (target === 'en') {
    clearCookie('googtrans');
  } else {
    setCookie('googtrans', '/en/' + target, 365);
  }
  window.location.reload();
}

function bindLanguageSwitcher() {
  var select = document.getElementById('language-select');
  if (!select) return;
  select.value = getCurrentLanguagePreference();
  select.addEventListener('change', function() {
    applyLanguagePreference(select.value);
  });
}

window.showToast = showToast;
window.formatSize = formatSize;
window.getFriendlyErrorMessage = getFriendlyErrorMessage;
window.validateImageFile = validateImageFile;
window.getSettings = getSettings;
window.saveSettingsObj = saveSettingsObj;
window.loadApiKey = loadApiKey;
window.getPreferredTheme = getPreferredTheme;
window.applyTheme = applyTheme;
window.toggleTheme = toggleTheme;
window.bindHeaderScrollState = bindHeaderScrollState;
window.bindDragDrop = bindDragDrop;
window.copyToClipboard = copyToClipboard;
window.mimeToExt = mimeToExt;
window.downloadBlob = downloadBlob;
window.downloadDataUrl = downloadDataUrl;
window.canvasToBlob = canvasToBlob;
window.canvasToBmpBlob = canvasToBmpBlob;
window.downloadImageDataUrl = downloadImageDataUrl;
window.getImageDimensions = getImageDimensions;
window.applyLanguagePreference = applyLanguagePreference;
window.bindLanguageSwitcher = bindLanguageSwitcher;
window.correctBrandTranslation = correctBrandTranslation;
window.observeBrandTranslation = observeBrandTranslation;

document.addEventListener('DOMContentLoaded', function() {
  bindThemeToggle();
  bindHeaderScrollState();
  bindToolSectionLinks();
  bindLanguageSwitcher();
  observeBrandTranslation();
  loadApiKey();
});
