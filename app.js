// app.js

// ────────────────────────────────────────────────────────────────
// 1) ELEMENT REFERENCES
// ────────────────────────────────────────────────────────────────

const appContainer          = document.querySelector('.app-container');
const nameInput               = document.getElementById('name');
const bioInput                = document.getElementById('bio');
const picUrlInput             = document.getElementById('pic-url');
const picUploadInput          = document.getElementById('pic-upload');
const bgColorInput            = document.getElementById('bg-color');
const textColorInput          = document.getElementById('text-color');
const btnColorInput           = document.getElementById('btn-color');
const themeSelector           = document.getElementById('theme-selector');
const themePickerBtn          = document.getElementById('theme-picker-btn');
const currentThemeName        = document.getElementById('current-theme-name');
const fontSelector            = document.getElementById('font-selector');
const fontPickerBtn           = document.getElementById('font-picker-btn');
const currentFontName         = document.getElementById('current-font-name');
const animationSelector       = document.getElementById('animation-selector');
const animationPickerBtn      = document.getElementById('animation-picker-btn');
const currentAnimationName    = document.getElementById('current-animation-name');
const cardShadowSelector      = document.getElementById('card-shadow-selector');
const shadowPickerBtn         = document.getElementById('shadow-picker-btn');
const currentShadowName       = document.getElementById('current-shadow-name');
const pageBgColorInput        = document.getElementById('page-bg-color');
const pageBgImageUrlInput     = document.getElementById('page-bg-image-url');
const pageBgUploadInput       = document.getElementById('page-bg-upload');
const overlayEnableCheckbox   = document.getElementById('overlay-enable');
const pageBgOverlayColorInput = document.getElementById('page-bg-overlay-color');
const seoTitleInput           = document.getElementById('seo-title');
const seoDescriptionInput     = document.getElementById('seo-description');
const seoImageUrlInput        = document.getElementById('seo-image-url');
const analyticsScriptInput    = document.getElementById('analytics-script');
const addLinkBtn              = document.getElementById('add-link-btn');
const addVideoBtn             = document.getElementById('add-video-btn');
const addHeaderBtn            = document.getElementById('add-header-btn');
const addSpotifyBtn           = document.getElementById('add-spotify-btn');
const addMailBtn              = document.getElementById('add-mail-btn');
const addDividerBtn           = document.getElementById('add-divider-btn');
const addImageBtn             = document.getElementById('add-image-btn');
const addGalleryBtn           = document.getElementById('add-gallery-btn');
const addCountdownBtn         = document.getElementById('add-countdown-btn');
const linksContainer          = document.getElementById('links-container');
const generateBtn             = document.getElementById('generate-btn');
const resetBtn                = document.getElementById('reset-btn');
const previewWrapper          = document.getElementById('preview-wrapper');
const previewContent          = document.getElementById('preview-content');
const previewName             = document.getElementById('preview-name');
const previewBio              = document.getElementById('preview-bio');
const previewPic              = document.getElementById('preview-pic');
const previewLinks            = document.getElementById('preview-links');
const modal                   = document.getElementById('modal');
const closeBtn                = document.getElementById('close-btn');
const htmlOutput              = document.getElementById('html-output');
const iconModal               = document.getElementById('icon-modal');
const iconGrid                = document.getElementById('icon-grid');
const iconSearch              = document.getElementById('icon-search');
const iconCloseBtn            = document.getElementById('icon-close-btn');
const themeModal              = document.getElementById('theme-modal');
const themeGrid               = document.getElementById('theme-grid');
const themeCloseBtn           = document.getElementById('theme-close-btn');
const fontModal               = document.getElementById('font-modal');
const fontGrid                = document.getElementById('font-grid');
const fontCloseBtn            = document.getElementById('font-close-btn');
const animationModal          = document.getElementById('animation-modal');
const animationGrid           = document.getElementById('animation-grid');
const animationCloseBtn       = document.getElementById('animation-close-btn');
const shadowModal             = document.getElementById('shadow-modal');
const shadowGrid              = document.getElementById('shadow-grid');
const shadowCloseBtn          = document.getElementById('shadow-close-btn');
const previewToggleBtn        = document.getElementById('preview-toggle');
const resetPageBgBtn          = document.getElementById('reset-page-bg-btn');


// ────────────────────────────────────────────────────────────────
// 2) DEBOUNCE UTILITY
// ────────────────────────────────────────────────────────────────

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
const debouncedUpdate = debounce(() => {
  updateAllPreviews();
  saveState();
}, 300);

// ────────────────────────────────────────────────────────────────
// 3) ACCORDION & UI HELPERS
// ────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion-header').forEach(header => {
    const panel = header.nextElementSibling;
    if (header.getAttribute('aria-expanded') === 'true') {
        header.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
    }

    header.addEventListener('click', () => {
      header.classList.toggle('active');
      header.setAttribute('aria-expanded', header.classList.contains('active').toString());
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
});

function updateAccordionHeights() {
  document.querySelectorAll('.accordion-header.active').forEach(header => {
    const panel = header.nextElementSibling;
    panel.style.maxHeight = panel.scrollHeight + 'px';
  });
}


// ────────────────────────────────────────────────────────────────
// 4) STATE MANAGEMENT
// ────────────────────────────────────────────────────────────────

const saveState = () => {
    const content = [];
    document.querySelectorAll('.content-field').forEach(field => {
        const type = field.dataset.fieldType;
        let item = { type };
        switch(type) {
            case 'link':
                item.title = field.querySelector('.link-title-input').value;
                item.url = field.querySelector('.link-url-input').value;
                item.icon = field.querySelector('.icon-select-hidden').value;
                break;
            case 'image':
                item.url = field.querySelector('.image-url-input').value;
                item.alt = field.querySelector('.image-alt-input').value;
                break;
            case 'gallery':
                item.images = Array.from(field.querySelectorAll('.gallery-image-control')).map(control => ({
                    url: control.querySelector('.gallery-image-url-input').value,
                    alt: control.querySelector('.gallery-image-alt-input').value
                }));
                break;
            case 'video':
                item.url = field.querySelector('.video-url-input').value;
                break;
            case 'header':
                item.text = field.querySelector('.header-input').value;
                break;
            case 'spotify':
                item.url = field.querySelector('.spotify-url-input').value;
                item.compact = field.querySelector('.spotify-compact-check').checked;
                break;
            case 'mail':
                item.url = field.querySelector('.mail-url-input').value;
                item.buttonText = field.querySelector('.mail-btn-text-input').value;
                break;
            case 'countdown':
                item.title = field.querySelector('.countdown-title-input').value;
                item.datetime = field.querySelector('.countdown-datetime-input').value;
                break;
            case 'divider':
                break;
        }
        content.push(item);
    });

    const state = {
        name: nameInput.value,
        bio: bioInput.value,
        picUrl: picUrlInput.value, // FIX: Save the URL input field
        picSrc: previewPic.src,
        bgColor: bgColorInput.value,
        textColor: textColorInput.value,
        btnColor: btnColorInput.value,
        theme: themeSelector.value,
        animation: animationSelector.value,
        font: fontSelector.value,
        pageBgColor: pageBgColorInput.value,
        pageBgImageUrl: pageBgImageUrlInput.value,
        pageBgOverlayColor: pageBgOverlayColorInput.value,
        overlayEnabled: overlayEnableCheckbox.checked,
        seoTitle: seoTitleInput.value,
        seoDescription: seoDescriptionInput.value,
        analyticsScript: analyticsScriptInput.value,
        seoImageUrl: seoImageUrlInput.value,
        cardShadow: cardShadowSelector.value,
        content: content
    };
    localStorage.setItem('linkPageState', JSON.stringify(state));
};

function loadState() {
  const state = JSON.parse(localStorage.getItem('linkPageState'));
  if (!state) {
    addLinkField();
    initializeAppUI();
    return;
  }
    nameInput.value = state.name || '';
    bioInput.value = state.bio || '';
    picUrlInput.value = state.picUrl || ''; // FIX: Load the URL input field
    if (state.picSrc) {
        previewPic.src = state.picSrc;
    }
    bgColorInput.value = state.bgColor || '#FFFFFF';
    textColorInput.value = state.textColor || '#000000';
    btnColorInput.value = state.btnColor || '#333333';
    themeSelector.value = state.theme || 'custom';
    animationSelector.value = state.animation || 'none';
    fontSelector.value = state.font || 'System Default';
    pageBgColorInput.value = state.pageBgColor || '#F4F4F9';
    pageBgImageUrlInput.value = state.pageBgImageUrl || '';
    pageBgOverlayColorInput.value = state.pageBgOverlayColor || '#000000';
    overlayEnableCheckbox.checked = state.overlayEnabled !== false;
    seoTitleInput.value = state.seoTitle || '';
    seoDescriptionInput.value = state.seoDescription || '';
    seoImageUrlInput.value = state.seoImageUrl || '';
    analyticsScriptInput.value = state.analyticsScript || '';
    cardShadowSelector.value = state.cardShadow || 'shadow-soft';
    
    linksContainer.innerHTML = '';
    if (state.content && state.content.length > 0) {
        state.content.forEach(item => {
            if (item.type === 'link') addLinkField(item.title, item.url, item.icon);
            else if (item.type === 'image') addImageField(item.url, item.alt);
            else if (item.type === 'gallery') addGalleryField(item.images);
            else if (item.type === 'video') addVideoField(item.url);
            else if (item.type === 'header') addHeaderField(item.text);
            else if (item.type === 'spotify') addSpotifyField(item.url, item.compact);
            else if (item.type === 'mail') addMailField(item.url, item.buttonText);
            else if (item.type === 'divider') addDividerField();
            else if (item.type === 'countdown') addCountdownField(item.title, item.datetime);
        });
    } else {
        addLinkField();
    }
  
    initializeAppUI();
}

function initializeAppUI() {
    updateAllPreviews();
    initializeSortable();
    toggleOverlayControls();
    updateAccordionHeights();
    const shadowOption = cardShadowSelector.querySelector(`option[value="${cardShadowSelector.value}"]`);
    if(shadowOption) currentShadowName.textContent = shadowOption.textContent;
}


// ────────────────────────────────────────────────────────────────
// 5) PREVIEW UPDATING
// ────────────────────────────────────────────────────────────────

function updateAllPreviews() {
    // Update simple text and image previews
    previewName.textContent = nameInput.value || 'Your Name';
    previewBio.textContent  = bioInput.value || 'A little about yourself...';
    const defaultPic = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NiIgaGVpZHRoPSI5NiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjY2RjZWNkIj48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MxLjY2IDAgMyAxLjM0IDMgMyAwIDEuMDktLjU5IDIuMDQtMS4yNSAyLjU2QzE0LjUgMTAuMDkgMTYgMTEuOTEgMTYgMTR2MWgtOGMtLjAxLTUuMzQgNS4zMy02IDggLTYgMS4wNiAwIDIuMDYtLjI1NSYyLjkyLS42OUMxNC4zNyAxMC4xNyAxMiAxMCAxMiA3LjVjLTEuMSAwLTItLjktMi0yczAuOS0yIDItMnpNMTIgMTRjLTIuMjEgMC00IDEuNzktNCA0djJoOHYtMmMwLTIuMjEtMS43OS00LTQtNHoiLz48L3N2Zz4=';
    previewPic.src = picUrlInput.value || previewPic.src || defaultPic;

    // --- Definitive Theme and Color Logic ---
    const selectedTheme = themeSelector.value;
    const themeObject = THEMES[selectedTheme];

    // 1. Handle Card Colors (the `.preview-content` element)
    previewContent.style.removeProperty('--bg-color');
    previewContent.style.removeProperty('--text-color');
    previewContent.style.removeProperty('--button-color');
    
    if (selectedTheme !== 'custom' && themeObject) {
        // A real theme is selected. Apply its class.
        previewContent.className = `preview-content ${cardShadowSelector.value} ${selectedTheme}`;
        
        // Update the color pickers to reflect the theme's values.
        bgColorInput.value = themeObject.bg;
        textColorInput.value = themeObject.text;
        btnColorInput.value = themeObject.btn;
    } else {
        // Custom theme is selected. Apply colors from pickers as inline styles.
        previewContent.className = `preview-content ${cardShadowSelector.value}`;
        previewContent.style.setProperty('--bg-color', bgColorInput.value);
        previewContent.style.setProperty('--text-color', textColorInput.value);
        previewContent.style.setProperty('--button-color', btnColorInput.value);
    }
    
    // 2. Handle Page Background (the `.preview-wrapper` element)
    // This happens *after* the theme might have changed the input's value.
    const pageBgColor = pageBgColorInput.value;
    previewWrapper.style.backgroundColor = pageBgColor;

    if (pageBgImageUrlInput.value) {
        let bgImageStyle = `url('${pageBgImageUrlInput.value}')`;
        if (overlayEnableCheckbox.checked) {
            const overlayGradient = `linear-gradient(${pageBgOverlayColorInput.value}80, ${pageBgOverlayColorInput.value}80)`;
            bgImageStyle = `${overlayGradient}, ${bgImageStyle}`;
        }
        previewWrapper.style.backgroundImage = bgImageStyle;
        previewWrapper.style.backgroundSize = 'cover';
        previewWrapper.style.backgroundPosition = 'center';
    } else {
        previewWrapper.style.backgroundImage = 'none';
    }

    // 3. Update UI labels
    currentThemeName.textContent = themeObject ? (selectedTheme === 'custom' ? 'Custom Colors' : selectedTheme.replace('theme-', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())) : 'Custom Colors';
    const selectedFont = fontSelector.value;
    currentFontName.textContent = selectedFont;
    if (selectedFont !== 'System Default') {
        loadGoogleFont(selectedFont);
        previewContent.style.setProperty('--font-family', `'${selectedFont}', sans-serif`);
    } else {
        previewContent.style.setProperty('--font-family', 'sans-serif');
    }

    // Update the dynamic content block
    updateContentPreview();
}


function updateContentPreview() {
    previewLinks.innerHTML = '';
    document.querySelectorAll('.content-field').forEach(field => {
        const type = field.dataset.fieldType;
        if (type === 'link') {
            const title = field.querySelector('.link-title-input').value;
            const url = field.querySelector('.link-url-input').value;
            const icon = field.querySelector('.icon-select-hidden').value;
            if (title && url) {
                const linkElement = document.createElement('a');
                linkElement.href = formatUrl(url);
                linkElement.target = '_blank';
                linkElement.className = 'animated-button';
                linkElement.innerHTML = `<i class="${icon}"></i><span>${title}</span>`;
                previewLinks.appendChild(linkElement);
            }
        } else if (type === 'image') {
            const url = field.querySelector('.image-url-input').value;
            const alt = field.querySelector('.image-alt-input').value;
            if (url) {
                const linkElement = document.createElement('a');
                linkElement.href = formatUrl(url);
                linkElement.target = '_blank';
                linkElement.innerHTML = `<img src="${url}" alt="${alt}" style="max-width: 100%; border-radius: 12px; margin: 1rem 0; display: block;">`;
                previewLinks.appendChild(linkElement);
            }
        } else if (type === 'gallery') {
            const galleryContainer = document.createElement('div');
            galleryContainer.className = 'gallery-scroll-container';
            field.querySelectorAll('.gallery-image-control').forEach(control => {
                const url = control.querySelector('.gallery-image-url-input').value;
                const alt = control.querySelector('.gallery-image-alt-input').value;
                if (url) {
                    const linkElement = document.createElement('a');
                    linkElement.href = formatUrl(url);
                    linkElement.target = '_blank';
                    linkElement.className = 'gallery-image-link';
                    linkElement.innerHTML = `<img src="${url}" alt="${alt}" class="clickable-image">`;
                    galleryContainer.appendChild(linkElement);
                }
            });
            if (galleryContainer.hasChildNodes()) {
                 previewLinks.appendChild(galleryContainer);
            }
        } else if (type === 'video') {
            const url = field.querySelector('.video-url-input').value;
            const videoId = getYouTubeId(url);
            if (videoId) {
                const embedContainer = document.createElement('div');
                embedContainer.className = 'youtube-embed';
                embedContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                previewLinks.appendChild(embedContainer);
            }
        } else if (type === 'header') {
            const text = field.querySelector('.header-input').value;
            if (text) {
                const headerElement = document.createElement('h4');
                headerElement.textContent = text;
                previewLinks.appendChild(headerElement);
            }
        } else if (type === 'spotify') {
            const url = field.querySelector('.spotify-url-input').value;
            const isCompact = field.querySelector('.spotify-compact-check').checked;
            const embedUrl = getSpotifyEmbedUrl(url);
            if (embedUrl) {
                const embedContainer = document.createElement('div');
                embedContainer.className = 'spotify-embed';
                const embedHeight = isCompact ? '80' : (url.includes('/episode') || url.includes('/show') ? '232' : '352');
                embedContainer.innerHTML = `<iframe style="border-radius:12px" src="${embedUrl}" width="100%" height="${embedHeight}" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
                previewLinks.appendChild(embedContainer);
            }
        } else if (type === 'mail') {
            const url = field.querySelector('.mail-url-input').value;
            const buttonText = field.querySelector('.mail-btn-text-input').value;
            if (url) {
                const formContainer = document.createElement('div');
                formContainer.className = 'mail-form';
                formContainer.innerHTML = `
                    <form action="${formatUrl(url)}" method="POST">
                        <input type="email" name="email" placeholder="Enter your email" required>
                        <button type="submit" class="animated-button">${buttonText || 'Subscribe'}</button>
                    </form>
                `;
                previewLinks.appendChild(formContainer);
            }
        } else if (type === 'divider') {
            const dividerElement = document.createElement('hr');
            dividerElement.style.margin = '1.5rem 0';
            dividerElement.style.border = 'none';
            dividerElement.style.borderTop = '1px solid rgba(0,0,0,0.1)';
            previewLinks.appendChild(dividerElement);
        } else if (type === 'countdown') {
            const title = field.querySelector('.countdown-title-input').value;
            const datetime = field.querySelector('.countdown-datetime-input').value;
            if (datetime) {
                const countdownElement = document.createElement('div');
                countdownElement.className = 'countdown-container';
                countdownElement.dataset.datetime = datetime;
                countdownElement.innerHTML = `
                    <div class="countdown-title">${title}</div>
                    <div class="countdown-timer">
                        <div class="countdown-block"><span class="countdown-number days">0</span><span class="countdown-label">Days</span></div>
                        <div class="countdown-block"><span class="countdown-number hours">0</span><span class="countdown-label">Hours</span></div>
                        <div class="countdown-block"><span class="countdown-number minutes">0</span><span class="countdown-label">Mins</span></div>
                        <div class="countdown-block"><span class="countdown-number seconds">0</span><span class="countdown-label">Secs</span></div>
                    </div>
                `;
                previewLinks.appendChild(countdownElement);
            }
        }
    });
}

// ────────────────────────────────────────────────────────────────
// 6) FIELD CREATION & SORTABLE
// ────────────────────────────────────────────────────────────────

function createGalleryImageControl(url = '', alt = '') {
  const controlWrapper = document.createElement('div');
  controlWrapper.className = 'gallery-image-control';
  const uniqueId = `gallery-image-upload-${Date.now()}`;
  controlWrapper.innerHTML = `
    <input type="url" class="gallery-image-url-input" placeholder="Image URL" value="${url}">
    <label for="${uniqueId}" class="file-upload-label">Upload</label>
    <input type="file" id="${uniqueId}" class="image-upload-input" accept="image/*" style="display: none;">
    <input type="text" class="gallery-image-alt-input" placeholder="Alt Text" value="${alt}">
    <button type="button" class="delete-gallery-image-btn">×</button>
  `;
  return controlWrapper;
}

function addLinkField(title = '', url = '', iconClass = 'fa-solid fa-globe') {
  const newField = document.createElement('div');
  newField.className = 'content-field';
  newField.dataset.fieldType = 'link';
  newField.innerHTML = `
    <div class="link-field">
      <button class="icon-picker-btn" type="button"><i class="${iconClass}"></i></button>
      <input type="hidden" class="icon-select-hidden" value="${iconClass}">
      <input type="text" class="link-title-input" placeholder="Link Title" value="${title}">
      <input type="url" class="link-url-input" placeholder="Link URL" value="${url}">
    </div>
    <button class="delete-btn">×</button>
  `;
  linksContainer.appendChild(newField);
}

function addImageField(url = '', altText = '') {
  const newField = document.createElement('div');
  newField.className = 'content-field';
  newField.dataset.fieldType = 'image';
  const uniqueId = `image-upload-${Date.now()}`;
  newField.innerHTML = `
    <p><i class="fa-solid fa-image"></i> Image</p>
    <input type="url" class="image-url-input" placeholder="Image URL" value="${url}">
    <label for="${uniqueId}" class="file-upload-label">Or Upload</label>
    <input type="file" id="${uniqueId}" class="image-upload-input" accept="image/*" style="display: none;">
    <input type="text" class="image-alt-input" placeholder="Alt Text" value="${altText}">
    <button class="delete-btn">×</button>
  `;
  linksContainer.appendChild(newField);
}

function addGalleryField(images = [{url: '', alt: ''}]) {
  const newField = document.createElement('div');
  newField.className = 'content-field';
  newField.dataset.fieldType = 'gallery';
  newField.innerHTML = `
    <p><i class="fa-solid fa-images"></i> Gallery</p>
    <div class="gallery-images-container"></div>
    <button type="button" class="add-image-to-gallery-btn"><i class="fa-solid fa-plus"></i> Add Image to Gallery</button>
    <button class="delete-btn">×</button>
  `;
  const container = newField.querySelector('.gallery-images-container');
  images.forEach(img => {
      container.appendChild(createGalleryImageControl(img.url, img.alt));
  });
  linksContainer.appendChild(newField);
}

function addVideoField(url = '') {
  const newField = document.createElement('div');
  newField.className = 'content-field';
  newField.dataset.fieldType = 'video';
  newField.innerHTML = `
    <p><i class="fa-brands fa-youtube"></i> YouTube Video</p>
    <input type="url" class="video-url-input" placeholder="Paste YouTube Video URL" value="${url}">
    <button class="delete-btn">×</button>
  `;
  linksContainer.appendChild(newField);
}

function addHeaderField(text = '') {
  const newField = document.createElement('div');
  newField.className = 'content-field header-field';
  newField.dataset.fieldType = 'header';
  newField.innerHTML = `
    <p><i class="fa-solid fa-heading"></i> Header</p>
    <input type="text" class="header-input" placeholder="Your Header Text" value="${text}">
    <button class="delete-btn">×</button>
  `;
  linksContainer.appendChild(newField);
}

function addDividerField() {
  const newField = document.createElement('div');
  newField.className = 'content-field header-field';
  newField.dataset.fieldType = 'divider';
  newField.innerHTML = `
    <p><i class="fa-solid fa-minus"></i> Divider</p>
    <button class="delete-btn">×</button>
  `;
  linksContainer.appendChild(newField);
}

function addSpotifyField(url = '', isCompact = false) {
  const newField = document.createElement('div');
  newField.className = 'content-field';
  newField.dataset.fieldType = 'spotify';
  const uniqueId = `spotify-compact-${Date.now()}`;
  newField.innerHTML = `
    <p><i class="fa-brands fa-spotify"></i> Spotify</p>
    <input type="url" class="spotify-url-input" placeholder="Paste Spotify URL" value="${url}">
    <div class="spotify-options">
      <input type="checkbox" class="spotify-compact-check" id="${uniqueId}" ${isCompact ? 'checked' : ''}>
      <label for="${uniqueId}">Use Compact Layout</label>
    </div>
    <button class="delete-btn">×</button>
  `;
  linksContainer.appendChild(newField);
}

function addMailField(url = '', buttonText = 'Subscribe') {
  const newField = document.createElement('div');
  newField.className = 'content-field';
  newField.dataset.fieldType = 'mail';
  newField.innerHTML = `
    <p><i class="fa-solid fa-envelope-open-text"></i> Signup Form</p>
    <input type="url" class="mail-url-input" placeholder="Formspree URL" value="${url}">
    <input type="text" class="mail-btn-text-input" placeholder="Button Text" value="${buttonText}">
    <button class="delete-btn">×</button>
  `;
  linksContainer.appendChild(newField);
}

function addCountdownField(title = '', datetime = '') {
  const newField = document.createElement('div');
  newField.className = 'content-field';
  newField.dataset.fieldType = 'countdown';
  newField.innerHTML = `
    <p><i class="fa-solid fa-clock"></i> Countdown Timer</p>
    <input type="text" class="countdown-title-input" placeholder="Countdown Title" value="${title}">
    <input type="datetime-local" class="countdown-datetime-input" value="${datetime}">
    <button class="delete-btn">×</button>
  `;
  linksContainer.appendChild(newField);
}

function initializeSortable() {
  if (typeof Sortable !== 'undefined') {
    new Sortable(linksContainer, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      onEnd: debouncedUpdate,
    });
  }
}

// ────────────────────────────────────────────────────────────────
// 7) HELPERS
// ────────────────────────────────────────────────────────────────

function formatUrl(url) {
    if (!url) return '';
    const trimmedUrl = url.trim();
    if (/^[a-z][a-z0-9+.-]*:/.test(trimmedUrl)) {
        return trimmedUrl;
    }
    return `https://${trimmedUrl}`;
}

function getYouTubeId(url) {
  if (!url) return null;
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function getSpotifyEmbedUrl(url) {
    if (!url) return null;
    const match = url.match(/open\.spotify\.com\/(track|album|playlist|artist|episode|show)\/([A-Za-z0-9]+)/);
    // FIX: Corrected the template literal for the embed URL
    return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}` : null;
}

function toggleOverlayControls() {
  document.getElementById('overlay-controls-wrapper').style.display =
    pageBgImageUrlInput.value ? 'flex' : 'none';
}

function updateAllCountdownPreviews() {
  document.querySelectorAll('.countdown-container').forEach(countdown => {
    const target = new Date(countdown.dataset.datetime).getTime();
    const now = Date.now();
    const diff = target - now;
    const days = Math.max(0, Math.floor(diff / (1000*60*60*24)));
    const hours = Math.max(0, Math.floor((diff % (1000*60*60*24)) / (1000*60*60)));
    const minutes = Math.max(0, Math.floor((diff % (1000*60*60)) / (1000*60)));
    const seconds = Math.max(0, Math.floor((diff % (1000*60)) / 1000));
    countdown.querySelector('.days').textContent = days;
    countdown.querySelector('.hours').textContent = hours;
    countdown.querySelector('.minutes').textContent = minutes;
    countdown.querySelector('.seconds').textContent = seconds;
  });
}

const loadGoogleFont = (fontName) => {
    const fontId = `google-font-${fontName.replace(/\s/g, '-')}`;
    if (fontName === 'System Default' || document.getElementById(fontId)) return;
    const link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s/g, '+')}:wght@400;500;600;700&display=swap`;
    document.head.appendChild(link);
};


// ────────────────────────────────────────────────────────────────
// 8) EVENT LISTENERS: inputs, buttons, file uploads
// ────────────────────────────────────────────────────────────────

[nameInput, bioInput, picUrlInput,
 bgColorInput, textColorInput, btnColorInput,
 pageBgColorInput, pageBgOverlayColorInput, cardShadowSelector
].forEach(el => el.addEventListener('input', debouncedUpdate));

overlayEnableCheckbox.addEventListener('change', debouncedUpdate);

[seoTitleInput, seoDescriptionInput,
 seoImageUrlInput, analyticsScriptInput
].forEach(el => el.addEventListener('input', saveState));

pageBgImageUrlInput.addEventListener('input', () => {
    debouncedUpdate();
    toggleOverlayControls();
});


// Event delegation for dynamic content
linksContainer.addEventListener('input', debouncedUpdate);

linksContainer.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.closest('.content-field').remove();
    debouncedUpdate();
  } else if (e.target.matches('.add-image-to-gallery-btn, .add-image-to-gallery-btn *')) {
    const container = e.target.closest('.content-field').querySelector('.gallery-images-container');
    container.appendChild(createGalleryImageControl());
    updateAccordionHeights();
    debouncedUpdate();
  } else if (e.target.matches('.delete-gallery-image-btn, .delete-gallery-image-btn *')) {
    e.target.closest('.gallery-image-control').remove();
    debouncedUpdate();
  }
});

linksContainer.addEventListener('change', e => {
  if (e.target.classList.contains('image-upload-input')) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = evt => {
        const parent = e.target.closest('.gallery-image-control') || e.target.closest('.content-field');
        const urlIn = parent.querySelector('.image-url-input, .gallery-image-url-input');
        if (urlIn) {
            urlIn.value = evt.target.result;
            debouncedUpdate();
        }
      };
      reader.readAsDataURL(file);
    }
  }
});

// Static buttons
addLinkBtn.addEventListener('click',   () => { addLinkField();   updateAccordionHeights(); debouncedUpdate(); });
addVideoBtn.addEventListener('click',  () => { addVideoField();  updateAccordionHeights(); debouncedUpdate(); });
addHeaderBtn.addEventListener('click', () => { addHeaderField(); updateAccordionHeights(); debouncedUpdate(); });
addSpotifyBtn.addEventListener('click',() => { addSpotifyField();updateAccordionHeights(); debouncedUpdate(); });
addMailBtn.addEventListener('click',   () => { addMailField();   updateAccordionHeights(); debouncedUpdate(); });
addDividerBtn.addEventListener('click',() => { addDividerField();updateAccordionHeights(); debouncedUpdate(); });
addImageBtn.addEventListener('click',  () => { addImageField();  updateAccordionHeights(); debouncedUpdate(); });
addGalleryBtn.addEventListener('click',() => { addGalleryField();updateAccordionHeights(); debouncedUpdate(); });
addCountdownBtn.addEventListener('click',() =>{ addCountdownField();updateAccordionHeights();debouncedUpdate(); });

resetBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to reset all settings? This cannot be undone.')) {
    localStorage.clear();
    location.reload();
  }
});

picUploadInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = evt => {
      previewPic.src = evt.target.result;
      picUrlInput.value = ''; // Clear URL input if file is uploaded
      debouncedUpdate();
    };
    reader.readAsDataURL(file);
  }
});

pageBgUploadInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = evt => {
      pageBgImageUrlInput.value = evt.target.result;
      debouncedUpdate();
      toggleOverlayControls();
    };
    reader.readAsDataURL(file);
  }
});

// ────────────────────────────────────────────────────────────────
// 9) MODAL OPEN/CLOSE LOGIC
// ────────────────────────────────────────────────────────────────

function openModal(modalEl) {
    modalEl.style.display = 'block';
}
function closeModal(modalEl) {
    modalEl.style.display = 'none';
}

[modal, iconModal, themeModal, fontModal, animationModal, shadowModal].forEach(m => {
    if (m) {
        const close = m.querySelector('.close-btn');
        if (close) close.addEventListener('click', () => closeModal(m));
        m.addEventListener('click', (e) => {
            if (e.target === m) closeModal(m);
        });
    }
});

// Icon picker open/select
let currentIconPickerBtn = null;
linksContainer.addEventListener('click', e => {
  const btn = e.target.closest('.icon-picker-btn');
  if (btn) {
    currentIconPickerBtn = btn;
    populateIconGrid();
    openModal(iconModal);
    iconSearch.focus();
  }
});

iconSearch.addEventListener('input', () => populateIconGrid(iconSearch.value));

iconGrid.addEventListener('click', e => {
  const item = e.target.closest('.icon-grid-item');
  if (item && currentIconPickerBtn) {
    const iconClass = item.dataset.iconClass;
    currentIconPickerBtn.innerHTML = `<i class="${iconClass}"></i>`;
    currentIconPickerBtn.nextElementSibling.value = iconClass;
    closeModal(iconModal);
    debouncedUpdate();
  }
});

// Theme, Font, Animation, Shadow pickers
themePickerBtn.addEventListener('click', () => { populateThemeGrid(); openModal(themeModal); });
fontPickerBtn.addEventListener('click', () => { populateFontGrid(); openModal(fontModal); });
animationPickerBtn.addEventListener('click', () => { populateAnimationGrid(); openModal(animationModal); });
shadowPickerBtn.addEventListener('click', () => { populateShadowGrid(); openModal(shadowModal); });

themeGrid.addEventListener('click', e => {
  const swatch = e.target.closest('.theme-swatch');
  if (swatch) {
    const themeKey = swatch.dataset.themeKey;
    const themeObject = THEMES[themeKey];

    // This is the "override" step. It now happens only when a theme is clicked.
    if (themeObject) {
        themeSelector.value = themeKey;
        // Set all the color inputs, including the page background
        bgColorInput.value = themeObject.bg;
        textColorInput.value = themeObject.text;
        btnColorInput.value = themeObject.btn;
        pageBgColorInput.value = themeObject.pageBg || '#F4F4F9';
    }

    closeModal(themeModal);
    debouncedUpdate(); // Update the preview with the new colors
  }
});
fontGrid.addEventListener('click', e => {
  const swatch = e.target.closest('.font-swatch');
  if (swatch) {
    fontSelector.value = swatch.dataset.fontName;
    closeModal(fontModal);
    debouncedUpdate();
  }
});
animationGrid.addEventListener('click', e => {
  const swatch = e.target.closest('.animation-swatch');
  if (swatch) {
    animationSelector.value = swatch.dataset.animationName;
    closeModal(animationModal);
    debouncedUpdate();
  }
});
shadowGrid.addEventListener('click', (e) => {
    const swatch = e.target.closest('.shadow-swatch');
    if (swatch) {
        cardShadowSelector.value = swatch.dataset.shadowValue;
        currentShadowName.textContent = swatch.dataset.shadowName;
        closeModal(shadowModal);
        debouncedUpdate();
    }
});

// ────────────────────────────────────────────────────────────────
// 10) MODAL POPULATION & GENERATE HTML
// ────────────────────────────────────────────────────────────────

function populateIconGrid(filter = '') {
    iconGrid.innerHTML = '';
    const filtered = ICONS.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()));
    filtered.forEach(icon => {
        const item = document.createElement('div');
        item.className = 'icon-grid-item';
        item.dataset.iconClass = icon.class;
        item.innerHTML = `<i class="${icon.class}"></i>`;
        iconGrid.appendChild(item);
    });
}

function populateThemeGrid() {
    themeGrid.innerHTML = '';
    Object.keys(THEMES).filter(k => k !== 'custom').forEach(key => {
        const theme = THEMES[key];
        const name = key.replace('theme-', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const swatch = document.createElement('div');
        swatch.className = 'theme-swatch';
        swatch.dataset.themeKey = key;
        swatch.innerHTML = `
            <div class="theme-swatch-colors">
                <div class="theme-swatch-bg" style="background-color: ${theme.bg};"></div>
                <div class="theme-swatch-text" style="background-color: ${theme.text};"></div>
                <div class="theme-swatch-btn" style="background-color: ${theme.btn};"></div>
            </div>
            <div class="theme-swatch-name">${name}</div>`;
        themeGrid.appendChild(swatch);
    });
}

function populateFontGrid() {
    fontGrid.innerHTML = '';
    FONTS.forEach(font => {
        loadGoogleFont(font);
        const swatch = document.createElement('div');
        swatch.className = 'font-swatch';
        swatch.dataset.fontName = font;
        swatch.textContent = font;
        swatch.style.fontFamily = font === 'System Default' ? 'sans-serif' : `'${font}', sans-serif`;
        fontGrid.appendChild(swatch);
    });
}

function populateAnimationGrid() {
    animationGrid.innerHTML = '';
    let previewAnimationStyleTag = document.getElementById('animation-preview-styles');
    if (!previewAnimationStyleTag) {
        previewAnimationStyleTag = document.createElement('style');
        previewAnimationStyleTag.id = 'animation-preview-styles';
        document.head.appendChild(previewAnimationStyleTag);
    }
    
    let allAnimationStyles = '';
    ANIMATIONS.forEach(anim => {
        if (anim.value !== 'none') {
            let animClass = anim.class || '';
            if (anim.value === 'glow') {
                 animClass = animClass.replace('var(--button-color)', '#333');
            }
            allAnimationStyles += (anim.keyframes || '') + ' ' + animClass;
        }
    });
    previewAnimationStyleTag.innerHTML = allAnimationStyles;

    ANIMATIONS.forEach(anim => {
        const swatch = document.createElement('div');
        swatch.className = 'animation-swatch';
        swatch.dataset.animationName = anim.value;
        swatch.innerHTML = `
            <div class="animation-swatch-preview ${anim.value !== 'none' ? `animate-${anim.value}`: ''}">
                <div class="animated-button animation-swatch-button">Preview</div>
            </div>
            <div class="animation-swatch-name">${anim.name}</div>`;
        animationGrid.appendChild(swatch);
    });
}

function populateShadowGrid() {
    shadowGrid.innerHTML = '';
    const options = [
        { name: 'Soft', value: 'shadow-soft' },
        { name: 'Hard', value: 'shadow-hard' },
        { name: 'None', value: 'shadow-none' }
    ];

    options.forEach(opt => {
        const swatch = document.createElement('div');
        swatch.className = 'shadow-swatch';
        swatch.dataset.shadowValue = opt.value;
        swatch.dataset.shadowName = opt.name;
        swatch.innerHTML = `
            <span>${opt.name}</span>
            <div class="shadow-swatch-preview ${opt.value}"></div>
        `;
        shadowGrid.appendChild(swatch);
    });
}

generateBtn.addEventListener('click', () => {
    const escapeHTML = str => {
        if (!str) return '';
        // FIX: Correctly escape single quotes
        return str.replace(/[&<>"']/g, m => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m]));
    };

    const name = nameInput.value || 'Your Name';
    const bio = bioInput.value || 'A little about yourself...';
    const finalPicUrl = previewPic.src;
    
    let bgColor, textColor, btnColor;
    const selectedTheme = themeSelector.value;
    const themeObject = THEMES[selectedTheme];
    if (selectedTheme !== 'custom' && themeObject) {
        bgColor = themeObject.bg;
        textColor = themeObject.text;
        btnColor = themeObject.btn;
    } else {
        bgColor = bgColorInput.value;
        textColor = textColorInput.value;
        btnColor = btnColorInput.value;
    }

    const pageBgColor = pageBgColorInput.value;
    const pageBgImageUrl = pageBgImageUrlInput.value;
    const pageBgOverlay = pageBgOverlayColorInput.value;
    const useOverlay = overlayEnableCheckbox.checked;
    const seoTitle = seoTitleInput.value || name;
    const seoDesc = seoDescriptionInput.value || bio;
    const seoImage = seoImageUrlInput.value || finalPicUrl;
    const analytics = analyticsScriptInput.value;
    const shadowCls = cardShadowSelector.value;
    const selectedFont = fontSelector.value;
    const fontLink = selectedFont !== 'System Default'
        ? `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${selectedFont.replace(/\s/g, '+')}:wght@400;500;600;700&display=swap">`
        : '';
    const fontFamily = selectedFont !== 'System Default'
        ? `'${selectedFont}', sans-serif`
        : 'sans-serif';
    const animValue = animationSelector.value;
    const animDef = ANIMATIONS.find(a => a.value === animValue);
    let animStyles = '';
    if (animDef && animDef.value !== 'none') {
        let cls = animDef.class;
        if (animDef.value === 'glow') {
            cls = cls.replace('var(--button-color)', btnColor);
        }
        animStyles = (animDef.keyframes || '') + ' ' + (cls || '');
    }

    const contentHtml = Array.from(document.querySelectorAll('.content-field')).map(field => {
        const type = field.dataset.fieldType;
        switch (type) {
            case 'link': {
                const title = field.querySelector('.link-title-input').value;
                const url = field.querySelector('.link-url-input').value;
                const icon = field.querySelector('.icon-select-hidden').value;
                if (title && url) return `<a href="${escapeHTML(formatUrl(url))}" target="_blank" rel="noopener noreferrer" class="animated-button"><i class="${escapeHTML(icon)}"></i><span>${escapeHTML(title)}</span></a>`;
                break;
            }
            case 'image': {
                const url = field.querySelector('.image-url-input').value;
                const alt = field.querySelector('.image-alt-input').value;
                if (url) return `<a href="${escapeHTML(formatUrl(url))}" target="_blank" rel="noopener noreferrer" class="image-link-wrapper"><img src="${escapeHTML(url)}" alt="${escapeHTML(alt)}" class="clickable-image" style="max-width:100%;border-radius:12px;margin:1rem 0;display:block;"></a>`;
                break;
            }
            case 'gallery': {
                const imgs = Array.from(field.querySelectorAll('.gallery-image-control')).map(ctrl => {
                    const u = ctrl.querySelector('.gallery-image-url-input').value;
                    const a = ctrl.querySelector('.gallery-image-alt-input').value;
                    if (u) return `<a href="${escapeHTML(formatUrl(u))}" target="_blank" rel="noopener noreferrer" class="gallery-image-link"><img src="${escapeHTML(u)}" alt="${escapeHTML(a)}" class="clickable-image"></a>`;
                    return '';
                }).join('');
                if (imgs) return `<div class="gallery-scroll-container">${imgs}</div>`;
                break;
            }
            case 'header': {
                const t = field.querySelector('.header-input').value;
                if (t) return `<h4>${escapeHTML(t)}</h4>`;
                break;
            }
            case 'video': {
                const u = field.querySelector('.video-url-input').value;
                const id = getYouTubeId(u);
                if (id) return `<div class="youtube-embed"><iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
                break;
            }
            case 'spotify': {
                const u = field.querySelector('.spotify-url-input').value;
                const compact = field.querySelector('.spotify-compact-check').checked;
                const embed = getSpotifyEmbedUrl(u);
                if (embed) {
                    const h = compact ? '80' : (u.includes('/show') || u.includes('/episode') ? '232' : '352');
                    return `<div class="spotify-embed"><iframe style="border-radius:12px" src="${escapeHTML(embed)}" width="100%" height="${h}" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>`;
                }
                break;
            }
            case 'mail': {
                const f = field.querySelector('.mail-url-input').value;
                const bt = field.querySelector('.mail-btn-text-input').value || 'Subscribe';
                if (f) return `<div class="mail-form"><form action="${escapeHTML(formatUrl(f))}" method="POST" target="_blank"><input type="email" name="email" placeholder="Enter your email" required><button type="submit" class="animated-button">${escapeHTML(bt)}</button></form></div>`;
                break;
            }
            case 'divider': return `<hr style="margin:1.5rem 0;border:none;border-top:1px solid rgba(0,0,0,0.1);">`;
            case 'countdown': {
                const ttl = field.querySelector('.countdown-title-input').value;
                const dt = field.querySelector('.countdown-datetime-input').value;
                if (dt) return `<div class="countdown-container" data-datetime="${escapeHTML(dt)}"><div class="countdown-title">${escapeHTML(ttl)}</div><div class="countdown-timer"><div class="countdown-block"><span class="countdown-number days">0</span><span class="countdown-label">Days</span></div><div class="countdown-block"><span class="countdown-number hours">0</span><span class="countdown-label">Hours</span></div><div class="countdown-block"><span class="countdown-number minutes">0</span><span class="countdown-label">Mins</span></div><div class="countdown-block"><span class="countdown-number seconds">0</span><span class="countdown-label">Secs</span></div></div></div>`;
                break;
            }
        }
        return '';
    }).join('\n');

    const bgImgStyle = pageBgImageUrl
        ? `background-image:${useOverlay ? `linear-gradient(${escapeHTML(pageBgOverlay)}80,${escapeHTML(pageBgOverlay)}80),url(${escapeHTML(pageBgImageUrl)})` : `url(${escapeHTML(pageBgImageUrl)})`};`
        : 'background-image:none;';

    const finalPageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHTML(seoTitle)}</title>
    <meta name="description" content="${escapeHTML(seoDesc)}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHTML(seoTitle)}">
    <meta property="og:description" content="${escapeHTML(seoDesc)}">
    <meta property="og:image" content="${escapeHTML(seoImage)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHTML(seoTitle)}">
    <meta name="twitter:description" content="${escapeHTML(seoDesc)}">
    <meta name="twitter:image" content="${escapeHTML(seoImage)}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    ${fontLink}
    <style>
        body { font-family: ${fontFamily}; background-color: ${pageBgColor}; color: ${textColor}; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; margin: 0; padding: 2rem 1rem; box-sizing: border-box; background-size: cover; background-position: center; ${bgImgStyle} }
        .content-wrapper { background: ${bgColor}; border-radius: 24px; max-width: 680px; width: 100%; padding: 2.5rem; text-align: center; box-sizing: border-box; }
        .shadow-soft { box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
        .shadow-hard { box-shadow: 0 8px 16px rgba(0,0,0,0.2); }
        .shadow-none { box-shadow: none; }
        img#profile-pic { border-radius: 50%; width: 100px; height: 100px; object-fit: cover; border: 4px solid ${btnColor}; margin-bottom: 1rem; }
        h1 { margin: 1rem 0 0.5rem 0; font-size: 1.75rem; font-weight: 700; color: ${textColor}; }
        p#bio { opacity: 0.8; font-size: 1rem; color: ${textColor}; margin-bottom: 1.5rem; }
        h4 { margin: 1.5rem 0 0.5rem 0; color: ${textColor}; font-weight: 600; }
        .links-container { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .image-link-wrapper { text-decoration: none; cursor: pointer; }
        .animated-button { display: flex; align-items: center; justify-content: center; background: ${btnColor}; color: #fff; text-decoration: none; padding: 1rem; margin: 0 auto; transition: transform 0.2s, box-shadow 0.2s; border: none; font-size: 1rem; font-family: inherit; width: 100%; max-width: 480px; box-sizing: border-box; cursor: pointer; text-align: center; border-radius: 12px; font-weight: 600; }
        .animated-button:hover { transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .animated-button i { margin-right: 0.75rem; }
        .youtube-embed, .spotify-embed, .mail-form { margin: 1rem auto; max-width: 480px; }
        .youtube-embed { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000; border-radius: 12px; }
        .youtube-embed iframe, .spotify-embed iframe { border-radius:12px; border: 0; }
        .youtube-embed iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .mail-form input { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 8px; box-sizing: border-box; margin-bottom: 0.5rem; }
        .countdown-container { margin: 1.5rem auto; max-width: 480px; }
        .countdown-title { margin-bottom: 0.5rem; font-size: 1.1rem; font-weight: bold; color: ${textColor}; }
        .countdown-timer { display: flex; justify-content: center; gap: 1rem; padding: 1rem; background-color: rgba(0,0,0,0.05); border-radius: 12px; }
        .countdown-block { display: flex; flex-direction: column; align-items: center; min-width: 50px; }
        .countdown-number { font-size: 2rem; font-weight: bold; color: ${btnColor}; }
        .countdown-label { font-size: 0.75rem; text-transform: uppercase; opacity: 0.7; }
        ${animStyles}
        .gallery-scroll-container { display: flex; gap: 10px; overflow-x: auto; padding: 10px 0; scrollbar-width: thin; scrollbar-color: ${btnColor} ${bgColor}; margin: 0; }
        .gallery-scroll-container::-webkit-scrollbar { height: 8px; }
        .gallery-scroll-container::-webkit-scrollbar-track { background: ${bgColor}; border-radius: 10px; }
        .gallery-scroll-container::-webkit-scrollbar-thumb { background-color: ${btnColor}; border-radius: 10px; border: 2px solid ${bgColor}; }
        .gallery-image-link { flex-shrink: 0; width: 150px; height: 150px; border-radius: 12px; overflow: hidden; cursor: pointer; }
        .gallery-image-link img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.2s; }
        .gallery-image-link:hover img { transform: scale(1.05); }
    </style>
    ${analytics}
</head>
<body class="${animValue !== 'none' ? `animate-${animValue}` : ''}">
    <div class="content-wrapper ${shadowCls}">
        <img src="${escapeHTML(finalPicUrl)}" alt="Profile Picture" id="profile-pic">
        <h1>${escapeHTML(name)}</h1>
        <p id="bio">${escapeHTML(bio)}</p>
        <div class="links-container">
            ${contentHtml}
        </div>
    </div>
    <script>
      if (document.querySelector('.countdown-container')) {
        setInterval(function() {
            document.querySelectorAll('.countdown-container').forEach(c => {
                const target = new Date(c.dataset.datetime).getTime();
                const now = new Date().getTime();
                const dist = target - now;
                c.querySelector('.days').textContent = Math.max(0, Math.floor(dist/(1000*60*60*24)));
                c.querySelector('.hours').textContent = Math.max(0, Math.floor((dist%(1000*60*60*24))/(1000*60*60)));
                c.querySelector('.minutes').textContent = Math.max(0, Math.floor((dist%(1000*60*60))/(1000*60)));
                c.querySelector('.seconds').textContent = Math.max(0, Math.floor((dist%(1000*60))/1000));
            });
        }, 1000);
      }
    </script>
</body>
</html>`;

    htmlOutput.value = finalPageHtml;
    modal.style.display = 'block';
});

// ────────────────────────────────────────────────────────────────
// 12) INITIALIZATION
// ────────────────────────────────────────────────────────────────

function initializeApp() {
    // Dynamically populate the hidden selectors
    ANIMATIONS.forEach(anim => {
        const option = document.createElement('option');
        option.value = anim.value;
        option.textContent = anim.name;
        animationSelector.appendChild(option);
    });

    Object.keys(THEMES).forEach(themeKey => {
        const option = document.createElement('option');
        option.value = themeKey;
        option.textContent = themeKey;
        themeSelector.appendChild(option);
    });

    FONTS.forEach(font => {
        const option = document.createElement('option');
        option.value = font;
        option.textContent = font;
        fontSelector.appendChild(option);
    });

    // Load state from localStorage and start timers
    loadState();
    setInterval(updateAllCountdownPreviews, 1000);
}

if (previewToggleBtn) {
    // This function adds/removes the .visible class based on scroll position
    const handleScrollVisibility = () => {
        // Only run this logic on mobile screen widths
        if (window.innerWidth < 800) {
            if (window.scrollY > 50) {
                previewToggleBtn.classList.add('visible');
            } else {
                previewToggleBtn.classList.remove('visible');
            }
        } else {
            // On desktop, ensure the button is never visible
            previewToggleBtn.classList.remove('visible');
        }
    };
    
    // Add event listeners for scroll and resize
    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    window.addEventListener('resize', handleScrollVisibility, { passive: true });

    // This function handles the click action to toggle the preview pane
    previewToggleBtn.addEventListener('click', () => {
        const isVisible = appContainer.classList.toggle('preview-visible');
        previewToggleBtn.textContent = isVisible ? 'Back to Editor' : 'View Preview';
    });
    
    // Run the check once on load to set the correct initial state
    handleScrollVisibility();
}

resetPageBgBtn.addEventListener('click', () => {
    const currentThemeKey = themeSelector.value;
    const currentTheme = THEMES[currentThemeKey];

    // This finds the current theme's default page background and applies it
    if (currentTheme && currentTheme.pageBg) {
        pageBgColorInput.value = currentTheme.pageBg;
        debouncedUpdate(); // This updates the preview and saves the state
    }
});

initializeApp();