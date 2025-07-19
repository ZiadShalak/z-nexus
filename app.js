// --- Element References ---
const nameInput = document.getElementById('name');
const bioInput = document.getElementById('bio');
const linksContainer = document.getElementById('links-container');
const addLinkBtn = document.getElementById('add-link-btn');
const picUrlInput = document.getElementById('pic-url');
const bgColorInput = document.getElementById('bg-color');
const textColorInput = document.getElementById('text-color');
const btnColorInput = document.getElementById('btn-color');
const themeSelector = document.getElementById('theme-selector');
const animationSelector = document.getElementById('animation-selector');
const fontSelector = document.getElementById('font-selector');
const previewWrapper = document.getElementById('preview-wrapper');
const previewContent = document.getElementById('preview-content');
const previewName = document.getElementById('preview-name');
const previewBio = document.getElementById('preview-bio');
const previewPic = document.getElementById('preview-pic');
const previewLinks = document.getElementById('preview-links');
const generateBtn = document.getElementById('generate-btn');
const modal = document.getElementById('modal');
const addVideoBtn = document.getElementById('add-video-btn');
const addHeaderBtn = document.getElementById('add-header-btn');
const addSpotifyBtn = document.getElementById('add-spotify-btn');
const addMailBtn = document.getElementById('add-mail-btn');
const addImageBtn = document.getElementById('add-image-btn');
const addGalleryBtn = document.getElementById('add-gallery-btn');
const pageBgColorInput = document.getElementById('page-bg-color');
const pageBgImageUrlInput = document.getElementById('page-bg-image-url');
const pageBgOverlayColorInput = document.getElementById('page-bg-overlay-color');
const seoTitleInput = document.getElementById('seo-title');
const seoDescriptionInput = document.getElementById('seo-description');
const seoImageUrlInput = document.getElementById('seo-image-url');
const resetBtn = document.getElementById('reset-btn');
const closeBtn = document.getElementById('close-btn');
const htmlOutput = document.getElementById('html-output');
const picUploadInput = document.getElementById('pic-upload');
const analyticsScriptInput = document.getElementById('analytics-script');
const addDividerBtn = document.getElementById('add-divider-btn');
const cardShadowSelector = document.getElementById('card-shadow-selector');
const pageBgUploadInput = document.getElementById('page-bg-upload');
const overlayEnableCheckbox = document.getElementById('overlay-enable');
const addCountdownBtn = document.getElementById('add-countdown-btn');
const themePickerBtn = document.getElementById('theme-picker-btn');
const currentThemeName = document.getElementById('current-theme-name');
const themeModal = document.getElementById('theme-modal');
const themeGrid = document.getElementById('theme-grid');
const themeCloseBtn = document.getElementById('theme-close-btn');
const fontPickerBtn = document.getElementById('font-picker-btn');
const currentFontName = document.getElementById('current-font-name');
const fontModal = document.getElementById('font-modal');
const fontGrid = document.getElementById('font-grid');
const fontCloseBtn = document.getElementById('font-close-btn');
const animationPickerBtn = document.getElementById('animation-picker-btn');
const currentAnimationName = document.getElementById('current-animation-name');
const animationModal = document.getElementById('animation-modal');
const animationGrid = document.getElementById('animation-grid');
const animationCloseBtn = document.getElementById('animation-close-btn');


// --- Debounce function ---
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function updateAccordionHeights() {
  document.querySelectorAll('.accordion-header.active').forEach(header => {
    const panel = header.nextElementSibling;
    panel.style.maxHeight = panel.scrollHeight + 'px';
  });
}

// --- State Management ---
const saveState = () => {
    const content = [];
    const contentFields = document.querySelectorAll('.content-field');
    contentFields.forEach(field => {
        const type = field.dataset.fieldType;
        if (type === 'link') {
            content.push({ type: 'link', title: field.querySelector('.link-title-input').value, url: field.querySelector('.link-url-input').value, icon: field.querySelector('.icon-select-hidden').value });
        } else if (type === 'image') {
            content.push({ type: 'image', url: field.querySelector('.image-url-input').value, alt: field.querySelector('.image-alt-input').value });
        } else if (type === 'gallery') {
            const images = [];
            const imageControls = field.querySelectorAll('.gallery-image-control');
            imageControls.forEach(control => {
                const urlInput = control.querySelector('.gallery-image-url-input');
                const altInput = control.querySelector('.gallery-image-alt-input');
                if (urlInput && altInput) {
                    images.push({
                        url: urlInput.value,
                        alt: altInput.value
                    });
                }
            });
            content.push({ type: 'gallery', images: images });
        } else if (type === 'video') {
            content.push({ type: 'video', url: field.querySelector('.video-url-input').value });
        } else if (type === 'header') {
            content.push({ type: 'header', text: field.querySelector('.header-input').value });
        } else if (type === 'spotify') {
            content.push({ type: 'spotify', url: field.querySelector('.spotify-url-input').value, compact: field.querySelector('.spotify-compact-check').checked });
        } else if (type === 'mail') {
            content.push({ type: 'mail', url: field.querySelector('.mail-url-input').value, buttonText: field.querySelector('.mail-btn-text-input').value });
        } else if (type === 'divider') {
            content.push({ type: 'divider' });
        } else if (type === 'countdown') {
        content.push({ type: 'countdown', title: field.querySelector('.countdown-title-input').value, datetime: field.querySelector('.countdown-datetime-input').value });
        }
    });

    const state = {
        name: nameInput.value,
        bio: bioInput.value,
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

const loadState = () => {
    const state = JSON.parse(localStorage.getItem('linkPageState'));
    if (!state) {
        addLinkField();
        initializeSortable();
        return;
    }

    nameInput.value = state.name || '';
    bioInput.value = state.bio || '';
    if (state.picSrc) {
        previewPic.src = state.picSrc;
    }
    bgColorInput.value = state.bgColor || '#FFFFFF';
    textColorInput.value = state.textColor || '#000000';
    btnColorInput.value = state.btnColor || '#333333';
    themeSelector.value = state.theme || 'custom';
    currentThemeName.textContent = THEMES[themeSelector.value] ? (themeSelector.value === 'custom' ? 'Custom Colors' : themeSelector.value.replace('theme-', '').charAt(0).toUpperCase() + themeSelector.value.slice(7)) : 'Custom Colors';
    animationSelector.value = state.animation || 'none';
    currentAnimationName.textContent = ANIMATIONS.find(a => a.value === animationSelector.value)?.name || 'None';
    fontSelector.value = state.font || 'System Default';
    currentFontName.textContent = fontSelector.value;
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
    
    updateAllPreviews();
    initializeSortable();
    toggleOverlayControls();
};

// --- Preview Updates ---
const updateAllPreviews = () => {
    previewName.textContent = nameInput.value || 'Your Name';
    previewBio.textContent = bioInput.value || 'A little about yourself...';

    const defaultPic = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NiIgaGVpZHRoPSI5NiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjY2RjZWNkIj48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MxLjY2IDAgMyAxLjM0IDMgMyAwIDEuMDktLjU5IDIuMDQtMS4yNSAyLjU2QzE0LjUgMTAuMDkgMTYgMTEuOTEgMTYgMTR2MWgtOGMtLjAxLTUuMzQgNS4zMy02IDggLTYgMS4wNiAwIDIuMDYtLjI1NSYyLjkyLS42OUMxNC4zNyAxMC4xNyAxMiAxMCAxMiA3LjVjLTEuMSAwLTItLjktMi0yczAuOS0yIDItMnpNMTIgMTRjLTIuMjEgMC00IDEuNzktNCA0djJoOHYtMmMwLTIuMjEtMS4zOS00LTQtNHoiLz48L3N2Zz4=';
    previewPic.src = picUrlInput.value || previewPic.src || defaultPic;

    const selectedTheme = themeSelector.value;
    currentThemeName.textContent = THEMES[selectedTheme] ? (selectedTheme === 'custom' ? 'Custom Colors' : selectedTheme.replace('theme-', '').charAt(0).toUpperCase() + selectedTheme.slice(7)) : 'Custom Colors';
    const cardClasses = ['preview-content', cardShadowSelector.value];
    if (selectedTheme !== 'custom' && THEMES[selectedTheme]) {
        cardClasses.push(selectedTheme);
        const themeColors = THEMES[selectedTheme];
        bgColorInput.value = themeColors.bg;
        textColorInput.value = themeColors.text;
        btnColorInput.value = themeColors.btn;
    }
    previewContent.className = cardClasses.join(' ');

    const selectedAnimationValue = animationSelector.value;
    currentAnimationName.textContent = ANIMATIONS.find(a => a.value === selectedAnimationValue)?.name || 'None';
    const linkClasses = [];
    if (selectedAnimationValue !== 'none') {
        linkClasses.push(`animate-${selectedAnimationValue}`);
    }
    previewLinks.className = linkClasses.join(' ');

    previewContent.style.setProperty('--bg-color', bgColorInput.value);
    previewContent.style.setProperty('--text-color', textColorInput.value);
    previewContent.style.setProperty('--button-color', btnColorInput.value);
    
    const selectedFont = fontSelector.value;
    currentFontName.textContent = selectedFont;
    if (selectedFont !== 'System Default') {
        loadGoogleFont(selectedFont);
        previewContent.style.setProperty('--font-family', `'${selectedFont}'`);
    } else {
        previewContent.style.setProperty('--font-family', `sans-serif`);
    }

    const selectedAnimation = ANIMATIONS.find(a => a.value === selectedAnimationValue);
    let animationStyleTag = document.getElementById('animation-styles');
    if (!animationStyleTag) {
        animationStyleTag = document.createElement('style');
        animationStyleTag.id = 'animation-styles';
        document.head.appendChild(animationStyleTag);
    }
    animationStyleTag.innerHTML = (selectedAnimation && selectedAnimation.value !== 'none') ? selectedAnimation.keyframes + ' ' + selectedAnimation.class : '';

    const pageBgColor = pageBgColorInput.value;
    const pageBgImageUrl = pageBgImageUrlInput.value;
    
    previewWrapper.style.backgroundColor = pageBgColor;
    if (pageBgImageUrl) {
        if (overlayEnableCheckbox.checked) {
            const pageBgOverlayColor = pageBgOverlayColorInput.value;
            const overlayGradient = `linear-gradient(${pageBgOverlayColor}80, ${pageBgOverlayColor}80)`;
            previewWrapper.style.backgroundImage = `${overlayGradient}, url('${pageBgImageUrl}')`;
        } else {
             previewWrapper.style.backgroundImage = `url('${pageBgImageUrl}')`;
        }
        previewWrapper.style.backgroundSize = 'cover';
        previewWrapper.style.backgroundPosition = 'center';
    } else {
        previewWrapper.style.backgroundImage = 'none';
    }
    
    updateContentPreview();
};

// --- Field Creation & Manipulation ---
const createGalleryImageControl = (url = '', alt = '') => {
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
};

const addLinkField = (title = '', url = '', iconClass = 'fa-solid fa-globe') => {
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
};

const addImageField = (url = '', altText = '') => {
    const newField = document.createElement('div');
    newField.className = 'content-field';
    newField.dataset.fieldType = 'image';
    const uniqueId = `image-upload-${Date.now()}`;
    newField.innerHTML = `
        <p><i class="fa-solid fa-image"></i> Image</p>
        <input type="url" class="image-url-input" placeholder="Image URL" value="${url}">
        <label for="${uniqueId}" class="file-upload-label">Or Upload</label>
        <input type="file" id="${uniqueId}" class="image-upload-input" accept="image/*" style="display: none;">
        <input type="text" class="image-alt-input" placeholder="Alt Text (for accessibility)" value="${altText}">
        <button class="delete-btn">×</button>
    `;
    linksContainer.appendChild(newField);
};

const addGalleryField = (images = []) => {
    const newField = document.createElement('div');
    newField.className = 'content-field';
    newField.dataset.fieldType = 'gallery';
    newField.innerHTML = `
        <p style="margin-bottom: 0.5rem;"><i class="fa-solid fa-images"></i> Gallery</p>
        <div class="gallery-images-container"></div>
        <button type="button" class="add-image-to-gallery-btn"><i class="fa-solid fa-plus"></i> Add Image to Gallery</button>
        <button class="delete-btn">×</button>
    `;
    
    const galleryImagesContainer = newField.querySelector('.gallery-images-container');
    if (images && images.length > 0) {
        images.forEach(image => {
            galleryImagesContainer.appendChild(createGalleryImageControl(image.url, image.alt));
        });
    }

    linksContainer.appendChild(newField);
};

const addVideoField = (url = '') => {
    const newField = document.createElement('div');
    newField.className = 'content-field';
    newField.dataset.fieldType = 'video';
    newField.innerHTML = `
        <p><i class="fa-brands fa-youtube"></i> YouTube Video</p>
        <input type="url" class="video-url-input" placeholder="Paste YouTube Video URL" value="${url}">
        <button class="delete-btn">×</button>
    `;
    linksContainer.appendChild(newField);
};

const addHeaderField = (text = '') => {
    const newField = document.createElement('div');
    newField.className = 'content-field header-field';
    newField.dataset.fieldType = 'header';
    newField.innerHTML = `
        <p><i class="fa-solid fa-heading"></i> Header</p>
        <input type="text" class="header-input" placeholder="Your Header Text" value="${text}">
        <button class="delete-btn">×</button>
    `;
    linksContainer.appendChild(newField);
};

const addDividerField = () => {
    const newField = document.createElement('div');
    newField.className = 'content-field header-field';
    newField.dataset.fieldType = 'divider';
    newField.innerHTML = `
        <p><i class="fa-solid fa-minus"></i> Divider</p>
        <button class="delete-btn">×</button>
    `;
    linksContainer.appendChild(newField);
};

const addSpotifyField = (url = '', isCompact = false) => {
    const newField = document.createElement('div');
    newField.className = 'content-field';
    newField.dataset.fieldType = 'spotify';
    const checked = isCompact ? 'checked' : '';
    const uniqueId = `spotify-compact-${Date.now()}`;
    newField.innerHTML = `
        <p><i class="fa-brands fa-spotify"></i> Spotify</p>
        <input type="url" class="spotify-url-input" placeholder="Paste Spotify Song/Album/Playlist URL" value="${url}">
        <div class="spotify-options">
            <input type="checkbox" class="spotify-compact-check" id="${uniqueId}" ${checked}>
            <label for="${uniqueId}">Use Compact Layout</label>
        </div>
        <button class="delete-btn">×</button>
    `;
    linksContainer.appendChild(newField);
};

const addMailField = (url = '', buttonText = 'Subscribe') => {
    const newField = document.createElement('div');
    newField.className = 'content-field';
    newField.dataset.fieldType = 'mail';
    newField.innerHTML = `
        <p><i class="fa-solid fa-envelope-open-text"></i> Signup Form</p>
        <input type="url" class="mail-url-input" placeholder="Your Formspree URL" value="${url}">
        <input type="text" class="mail-btn-text-input" placeholder="Button Text" value="${buttonText}">
        <button class="delete-btn">×</button>
    `;
    linksContainer.appendChild(newField);
};

const addCountdownField = (title = '', datetime = '') => {
    const newField = document.createElement('div');
    newField.className = 'content-field';
    newField.dataset.fieldType = 'countdown';
    newField.innerHTML = `
        <p><i class="fa-solid fa-clock"></i> Countdown Timer</p>
        <input type="text" class="countdown-title-input" placeholder="Countdown Title (e.g., Launch Day!)" value="${title}">
        <input type="datetime-local" class="countdown-datetime-input" value="${datetime}">
        <button class="delete-btn">×</button>
    `;
    linksContainer.appendChild(newField);
};

const initializeSortable = () => {
    if (typeof Sortable !== 'undefined') {
        new Sortable(linksContainer, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            onEnd: () => {
                updateAllPreviews();
                saveState();
            }
        });
    } else {
        console.error("SortableJS library is not loaded. Drag and drop will not work.");
    }
};

function updateContentPreview() {
    previewLinks.innerHTML = '';
    const contentFields = document.querySelectorAll('.content-field');
    contentFields.forEach(field => {
        const type = field.dataset.fieldType;
        if (type === 'link') {
            const title = field.querySelector('.link-title-input').value;
            const url = field.querySelector('.link-url-input').value;
            const icon = field.querySelector('.icon-select-hidden').value;
            if (title && url) {
                const linkElement = document.createElement('a');
                linkElement.href = url;
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
                linkElement.href = url;
                linkElement.target = '_blank';
                linkElement.innerHTML = `<img src="${url}" alt="${alt}" style="max-width: 100%; border-radius: 12px; margin: 1rem 0; display: block;">`;
                previewLinks.appendChild(linkElement);
            }
        } else if (type === 'gallery') {
            const galleryContainer = document.createElement('div');
            galleryContainer.className = 'gallery-scroll-container';
            const imageControls = field.querySelectorAll('.gallery-image-control');
            imageControls.forEach(control => {
                const url = control.querySelector('.gallery-image-url-input').value;
                const alt = control.querySelector('.gallery-image-alt-input').value;
                if (url) {
                    const linkElement = document.createElement('a');
                    linkElement.href = url;
                    linkElement.target = '_blank';
                    linkElement.className = 'gallery-image-link';
                    linkElement.innerHTML = `<img src="${url}" alt="${alt}" class="clickable-image">`;
                    galleryContainer.appendChild(linkElement);
                }
            });
            previewLinks.appendChild(galleryContainer);
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
                    <form action="${url}" method="POST">
                        <input type="email" name="email" placeholder="Enter your email" required>
                        <button type="submit" class="animated-button">${buttonText || 'Subscribe'}</button>
                    </form>
                `;
                previewLinks.appendChild(formContainer);
            }
        } else if (type === 'divider') {
            const dividerElement = document.createElement('hr');
            dividerElement.style.margin = '1.5rem 0';
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

// --- FIX START: Corrected functions to handle real YouTube and Spotify URLs ---
function getYouTubeId(url) {
    if (!url) return null;
    let ID = '';
    // This regex handles standard, shortened, and embed YouTube URLs
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    } else {
        ID = url.toString();
    }
    return ID.length === 11 ? ID : null;
}

function getSpotifyEmbedUrl(url) {
    if (!url) return null;
    // This regex extracts the type (track, album, etc.) and ID from a standard Spotify URL
    const match = url.match(/open\.spotify\.com\/(track|album|playlist|artist|episode|show)\/([a-zA-Z0-9]+)/);
    if (match && match[1] && match[2]) {
        return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
    }
    return null;
}


function toggleOverlayControls() {
    const overlayControls = document.getElementById('overlay-controls-wrapper');
    if (pageBgImageUrlInput.value) {
        overlayControls.style.display = 'flex';
    } else {
        overlayControls.style.display = 'none';
    }
}

function updateAllCountdownPreviews() {
    const countdowns = previewLinks.querySelectorAll('.countdown-container');
    countdowns.forEach(countdown => {
        const targetDate = new Date(countdown.dataset.datetime).getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdown.querySelector('.days').textContent = days < 0 ? 0 : days;
        countdown.querySelector('.hours').textContent = hours < 0 ? 0 : hours;
        countdown.querySelector('.minutes').textContent = minutes < 0 ? 0 : minutes;
        countdown.querySelector('.seconds').textContent = seconds < 0 ? 0 : seconds;
    });
}

// --- Event Listeners ---
const debouncedUpdate = debounce(() => {
    updateAllPreviews();
    saveState();
}, 300);

document.querySelector('.controls').addEventListener('click', (event) => {
    const header = event.target.closest('.accordion-header');
    if (header) {
        header.classList.toggle('active');
        const panel = header.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }
});

nameInput.addEventListener('input', debouncedUpdate);
bioInput.addEventListener('input', debouncedUpdate);
picUrlInput.addEventListener('input', debouncedUpdate);
linksContainer.addEventListener('input', debouncedUpdate);
pageBgColorInput.addEventListener('input', debouncedUpdate);
pageBgImageUrlInput.addEventListener('input', () => {
    debouncedUpdate();
    toggleOverlayControls();
});
pageBgOverlayColorInput.addEventListener('input', debouncedUpdate);
overlayEnableCheckbox.addEventListener('change', debouncedUpdate);

seoTitleInput.addEventListener('input', saveState);
seoDescriptionInput.addEventListener('input', saveState);
seoImageUrlInput.addEventListener('input', saveState);
analyticsScriptInput.addEventListener('input', saveState);

bgColorInput.addEventListener('input', () => { themeSelector.value = 'custom'; debouncedUpdate(); });
textColorInput.addEventListener('input', () => { themeSelector.value = 'custom'; debouncedUpdate(); });
btnColorInput.addEventListener('input', () => { themeSelector.value = 'custom'; debouncedUpdate(); });

cardShadowSelector.addEventListener('change', () => { updateAllPreviews(); saveState(); });

addLinkBtn.addEventListener('click', () => { addLinkField();updateAccordionHeights(); updateAllPreviews(); saveState(); });
addImageBtn.addEventListener('click', () => { addImageField(); updateAccordionHeights();updateAllPreviews(); saveState(); });
addGalleryBtn.addEventListener('click', () => { addGalleryField(); updateAccordionHeights();updateAllPreviews(); saveState(); });
addVideoBtn.addEventListener('click', () => { addVideoField(); updateAccordionHeights();updateAllPreviews(); saveState(); });
addHeaderBtn.addEventListener('click', () => { addHeaderField();updateAccordionHeights(); updateAllPreviews(); saveState(); });
addSpotifyBtn.addEventListener('click', () => { addSpotifyField();updateAccordionHeights(); updateAllPreviews(); saveState(); });
addMailBtn.addEventListener('click', () => { addMailField();updateAccordionHeights(); updateAllPreviews(); saveState(); });
addDividerBtn.addEventListener('click', () => { addDividerField(); updateAccordionHeights();updateAllPreviews(); saveState(); });
addCountdownBtn.addEventListener('click', () => { addCountdownField(); updateAccordionHeights();updateAllPreviews(); saveState(); });

linksContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        event.target.closest('.content-field').remove();
        updateAllPreviews();
        saveState();
    } 
    else if (event.target.classList.contains('add-image-to-gallery-btn')) {
        const galleryImagesContainer = event.target.previousElementSibling;
        galleryImagesContainer.appendChild(createGalleryImageControl());
        saveState();
    } 
    else if (event.target.classList.contains('delete-gallery-image-btn')) {
        event.target.closest('.gallery-image-control').remove();
        updateAllPreviews();
        saveState();
    }
});

linksContainer.addEventListener('change', (event) => {
    if (event.target.classList.contains('image-upload-input')) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const parentControl = event.target.closest('.gallery-image-control') || event.target.closest('.content-field');
                const urlInput = parentControl.querySelector('.image-url-input, .gallery-image-url-input');
                if (urlInput) {
                    urlInput.value = e.target.result;
                    debouncedUpdate();
                }
            };
            reader.readAsDataURL(file);
        }
    }
});

resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all settings? This cannot be undone.')) {
        picUrlInput.value = '';
        picUploadInput.value = '';
        pageBgImageUrlInput.value = '';
        localStorage.clear();
        location.reload();
    }
});

picUploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewPic.src = e.target.result;
            picUrlInput.value = '';
            saveState();
        };
        reader.readAsDataURL(file);
    }
});

pageBgUploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            pageBgImageUrlInput.value = e.target.result;
            debouncedUpdate();
            toggleOverlayControls();
        };
        reader.readAsDataURL(file);
    }
});

// --- Icon Picker Modal Logic ---
const iconModal = document.getElementById('icon-modal');
const iconGrid = document.getElementById('icon-grid');
const iconSearch = document.getElementById('icon-search');
const iconCloseBtn = document.getElementById('icon-close-btn');
let currentIconPickerBtn = null;

const populateIconGrid = (filter = '') => {
    iconGrid.innerHTML = '';
    const filteredIcons = ICONS.filter(icon => icon.name.toLowerCase().includes(filter.toLowerCase()));

    filteredIcons.forEach(icon => {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'icon-grid-item';
        iconDiv.dataset.iconClass = icon.class;
        iconDiv.innerHTML = `<i class="${icon.class}"></i>`;
        iconGrid.appendChild(iconDiv);
    });
};

linksContainer.addEventListener('click', (event) => {
    const target = event.target.closest('.icon-picker-btn');
    if (target) {
        currentIconPickerBtn = target;
        populateIconGrid();
        iconModal.style.display = 'block';
        iconSearch.focus();
    }
});

iconGrid.addEventListener('click', (event) => {
    const target = event.target.closest('.icon-grid-item');
    if (target && currentIconPickerBtn) {
        const iconClass = target.dataset.iconClass;
        
        currentIconPickerBtn.innerHTML = `<i class="${iconClass}"></i>`;
        
        const hiddenInput = currentIconPickerBtn.nextElementSibling;
        if (hiddenInput && hiddenInput.classList.contains('icon-select-hidden')) {
            hiddenInput.value = iconClass;
        }
        
        iconModal.style.display = 'none';
        currentIconPickerBtn = null;
        updateAllPreviews(); 
        saveState();
    }
});

iconSearch.addEventListener('input', () => {
    populateIconGrid(iconSearch.value);
});

iconCloseBtn.addEventListener('click', () => {
    iconModal.style.display = 'none';
});

// --- Theme Picker Modal Logic ---
const populateThemeGrid = () => {
    themeGrid.innerHTML = '';
    Object.keys(THEMES).forEach(themeKey => {
        if (themeKey === 'custom') return;

        const theme = THEMES[themeKey];
        const swatch = document.createElement('div');
        swatch.className = 'theme-swatch';
        swatch.dataset.themeKey = themeKey;

        let themeName = themeKey.replace('theme-', '');
        themeName = themeName.charAt(0).toUpperCase() + themeName.slice(1);

        swatch.innerHTML = `
            <div class="theme-swatch-colors">
                <div class="theme-swatch-bg" style="background-color: ${theme.bg};"></div>
                <div class="theme-swatch-text" style="background-color: ${theme.text};"></div>
                <div class="theme-swatch-btn" style="background-color: ${theme.btn};"></div>
            </div>
            <div class="theme-swatch-name">${themeName}</div>
        `;
        themeGrid.appendChild(swatch);
    });
};

themePickerBtn.addEventListener('click', () => {
    populateThemeGrid();
    themeModal.style.display = 'block';
});

themeCloseBtn.addEventListener('click', () => {
    themeModal.style.display = 'none';
});

themeGrid.addEventListener('click', (event) => {
    const swatch = event.target.closest('.theme-swatch');
    if (swatch) {
        const themeKey = swatch.dataset.themeKey;
        themeSelector.value = themeKey;
        
        updateAllPreviews();
        saveState();
        
        themeModal.style.display = 'none';
    }
});

// --- Font Picker Modal Logic ---
const loadGoogleFont = (fontName) => {
    if (fontName === 'System Default') return;
    const fontId = `google-font-${fontName.replace(/\s/g, '-')}`;
    if (!document.getElementById(fontId)) {
        const link = document.createElement('link');
        link.id = fontId;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s/g, '+')}&display=swap`;
        document.head.appendChild(link);
    }
};

const populateFontGrid = () => {
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
};

fontPickerBtn.addEventListener('click', () => {
    populateFontGrid();
    fontModal.style.display = 'block';
});

fontCloseBtn.addEventListener('click', () => {
    fontModal.style.display = 'none';
});

fontGrid.addEventListener('click', (event) => {
    const swatch = event.target.closest('.font-swatch');
    if (swatch) {
        const fontName = swatch.dataset.fontName;
        fontSelector.value = fontName;
        
        updateAllPreviews();
        saveState();
        
        fontModal.style.display = 'none';
    }
});

// --- Animation Picker Modal Logic ---
const populateAnimationGrid = () => {
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
            const keyframes = anim.keyframes || '';
            let animClass = anim.class || '';
            if (anim.value === 'glow') {
                 animClass = animClass.replace('var(--button-color)', '#333');
            }
            allAnimationStyles += keyframes + ' ' + animClass;
        }
    });
    previewAnimationStyleTag.innerHTML = allAnimationStyles;

    ANIMATIONS.forEach(anim => {
        const swatch = document.createElement('div');
        swatch.className = 'animation-swatch';
        if (anim.value !== 'none') {
            swatch.classList.add(`animate-${anim.value}`);
        }
        swatch.dataset.animationName = anim.value;

        swatch.innerHTML = `
            <div class="animation-swatch-preview">
                <div class="animated-button animation-swatch-button">Preview</div>
            </div>
            <div class="animation-swatch-name">${anim.name}</div>
        `;
        animationGrid.appendChild(swatch);
    });
};

animationPickerBtn.addEventListener('click', () => {
    populateAnimationGrid();
    animationModal.style.display = 'block';
});

animationCloseBtn.addEventListener('click', () => {
    animationModal.style.display = 'none';
});

animationGrid.addEventListener('click', (event) => {
    const swatch = event.target.closest('.animation-swatch');
    if (swatch) {
        const animName = swatch.dataset.animationName;
        animationSelector.value = animName;
        
        updateAllPreviews();
        saveState();
        
        animationModal.style.display = 'none';
    }
});

// --- Generate HTML Button ---
generateBtn.addEventListener('click', () => {
    const name = nameInput.value || 'Your Name';
    const bio = bioInput.value || 'A little about yourself...';
    const finalPicUrl = previewPic.src;
    const theme = THEMES[themeSelector.value] || THEMES['custom'];
    const bgColor = bgColorInput.value || theme.bg;
    const textColor = textColorInput.value || theme.text;
    const btnColor = btnColorInput.value || theme.btn;
    const pageBgColor = pageBgColorInput.value;
    const pageBgImageUrl = pageBgImageUrlInput.value;
    const pageBgOverlayColor = pageBgOverlayColorInput.value;
    const isOverlayEnabled = overlayEnableCheckbox.checked;
    const seoTitle = seoTitleInput.value || name;
    const seoDescription = seoDescriptionInput.value || bio;
    const seoImageUrl = seoImageUrlInput.value || finalPicUrl;
    const selectedFont = fontSelector.value;
    const fontLink = selectedFont !== 'System Default' ? `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${selectedFont.replace(/\s/g, '+')}&display=swap">` : '';
    const fontFamilyStyle = selectedFont !== 'System Default' ? `'${selectedFont}', sans-serif` : 'sans-serif';
    const selectedAnimationValue = animationSelector.value;
    const selectedAnimation = ANIMATIONS.find(a => a.value === selectedAnimationValue);
    const analyticsScript = analyticsScriptInput.value;
    const cardShadow = cardShadowSelector.value;
    
    let finalAnimationStyles = '';
    if (selectedAnimation && selectedAnimation.value !== 'none') {
        let animationClass = selectedAnimation.class;
        if (selectedAnimation.value === 'glow') {
            animationClass = animationClass.replace('var(--button-color)', btnColor);
        }
        finalAnimationStyles = selectedAnimation.keyframes + ' ' + animationClass;
    }

    let contentHtml = '';
    const contentFields = document.querySelectorAll('.content-field');
    
    const escapeHTML = str => {
        if (!str) return '';
        return str.replace(/[&<>"']/g, match => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[match]));
    };

    contentFields.forEach(field => {
        const type = field.dataset.fieldType;
        switch (type) {
            case 'link': {
                const title = field.querySelector('.link-title-input').value;
                const url = field.querySelector('.link-url-input').value;
                const icon = field.querySelector('.icon-select-hidden').value;
                if (title && url) {
                    contentHtml += `<a href="${escapeHTML(url)}" target="_blank" class="animated-button"><i class="${escapeHTML(icon)}"></i><span>${escapeHTML(title)}</span></a>\n`;
                }
                break;
            }
            case 'image': {
                const url = field.querySelector('.image-url-input').value;
                const alt = field.querySelector('.image-alt-input').value;
                if (url) {
                    contentHtml += `<a href="${escapeHTML(url)}" target="_blank" class="image-link-wrapper"><img src="${escapeHTML(url)}" alt="${escapeHTML(alt)}" class="clickable-image" style="max-width: 100%; border-radius: 12px; margin: 1rem 0; display: block;"></a>\n`;
                }
                break;
            }
            case 'gallery': {
                let imagesHtml = '';
                const imageControls = field.querySelectorAll('.gallery-image-control');
                imageControls.forEach(control => {
                    const url = control.querySelector('.gallery-image-url-input').value;
                    const alt = control.querySelector('.gallery-image-alt-input').value;
                    if (url) {
                        imagesHtml += `<a href="${escapeHTML(url)}" target="_blank" class="gallery-image-link"><img src="${escapeHTML(url)}" alt="${escapeHTML(alt)}" class="clickable-image"></a>\n`;
                    }
                });
                if (imagesHtml) {
                    contentHtml += `<div class="gallery-scroll-container">${imagesHtml}</div>\n`;
                }
                break;
            }
            case 'header': {
                const text = field.querySelector('.header-input').value;
                if (text) {
                    contentHtml += `<h4>${escapeHTML(text)}</h4>\n`;
                }
                break;
            }
            case 'video': {
                const url = field.querySelector('.video-url-input').value;
                const videoId = getYouTubeId(url);
                if (videoId) {
                    contentHtml += `<div class="youtube-embed"><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>\n`;
                }
                break;
            }
            case 'spotify': {
                const url = field.querySelector('.spotify-url-input').value;
                const isCompact = field.querySelector('.spotify-compact-check').checked;
                const embedUrl = getSpotifyEmbedUrl(url);
                if (embedUrl) {
                    const embedHeight = isCompact ? '80' : (url.includes('/episode') || url.includes('/show') ? '232' : '352');
                    contentHtml += `<div class="spotify-embed"><iframe style="border-radius:12px" src="${embedUrl}" width="100%" height="${embedHeight}" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>\n`;
                }
                break;
            }
            case 'mail': {
                const formUrl = field.querySelector('.mail-url-input').value;
                const buttonText = field.querySelector('.mail-btn-text-input').value || 'Subscribe';
                if (formUrl) {
                    contentHtml += `<div class="mail-form">
                        <form action="${escapeHTML(formUrl)}" method="POST">
                            <input type="email" name="email" placeholder="Enter your email" required>
                            <button type="submit" class="animated-button">${escapeHTML(buttonText)}</button>
                        </form>
                    </div>\n`;
                }
                break;
            }
            case 'divider': {
                contentHtml += `<hr style="margin: 1.5rem 0; border: none; border-top: 1px solid rgba(0,0,0,0.1);">\n`;
                break;
            }
            case 'countdown': {
                const title = field.querySelector('.countdown-title-input').value;
                const datetime = field.querySelector('.countdown-datetime-input').value;
                if (datetime) {
                    contentHtml += `
                        <div class="countdown-container" data-datetime="${escapeHTML(datetime)}">
                            <div class="countdown-title">${escapeHTML(title)}</div>
                            <div class="countdown-timer">
                                <div class="countdown-block"><span class="countdown-number days">0</span><span class="countdown-label">Days</span></div>
                                <div class="countdown-block"><span class="countdown-number hours">0</span><span class="countdown-label">Hours</span></div>
                                <div class="countdown-block"><span class="countdown-number minutes">0</span><span class="countdown-label">Mins</span></div>
                                <div class="countdown-block"><span class="countdown-number seconds">0</span><span class="countdown-label">Secs</span></div>
                            </div>
                        </div>\n`;
                }
                break;
            }
        }
    });

    const bgImageStyle = pageBgImageUrl 
        ? `background-image: ${isOverlayEnabled ? `linear-gradient(${pageBgOverlayColor}80, ${pageBgOverlayColor}80), ` : ''}url(${escapeHTML(pageBgImageUrl)});`
        : 'background-image: none;';

    const finalPageHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHTML(seoTitle)}</title>
    <meta name="description" content="${escapeHTML(seoDescription)}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHTML(seoTitle)}">
    <meta property="og:description" content="${escapeHTML(seoDescription)}">
    <meta property="og:image" content="${escapeHTML(seoImageUrl)}">
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="${escapeHTML(seoTitle)}">
    <meta property="twitter:description" content="${escapeHTML(seoDescription)}">
    <meta property="twitter:image" content="${escapeHTML(seoImageUrl)}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    ${fontLink}
    <style>
        body { font-family: ${fontFamilyStyle}; background-color: ${pageBgColor}; color: ${textColor}; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; margin: 0; padding: 2rem 1rem; box-sizing: border-box; background-size: cover; background-position: center; ${bgImageStyle} }
        .content-wrapper { background: ${bgColor}; border-radius: 12px; max-width: 680px; width: 100%; padding: 2rem; text-align: center; box-sizing: border-box; }
        .shadow-soft { box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        .shadow-hard { box-shadow: 0 8px 16px rgba(0,0,0,0.3); }
        .shadow-none { box-shadow: none; }
        img#profile-pic { border-radius: 50%; width: 96px; height: 96px; object-fit: cover; border: 3px solid ${btnColor}; margin-bottom: 1rem; }
        h1 { margin: 0.5rem 0; color: ${textColor}; }
        p#bio { opacity: 0.8; font-size: 0.9rem; }
        h4 { margin: 1.5rem 0 0.5rem 0; color: ${textColor}; }
        .links-container { margin-top: 1.5rem; }
        .image-link-wrapper { text-decoration: none; cursor: pointer; }
        .animated-button { display: flex; align-items: center; justify-content: center; background: ${btnColor}; color: white; text-decoration: none; padding: 1rem; margin: 1rem auto; transition: transform 0.2s; border: none; font-size: inherit; font-family: inherit; width: 100%; max-width: 480px; box-sizing: border-box; cursor: pointer; text-align: center; border-radius: 8px; }
        .animated-button:hover { transform: scale(1.05); }
        .animated-button i { margin-right: 0.75rem; }
        .youtube-embed, .spotify-embed, .mail-form { margin: 1rem auto; max-width: 480px; }
        .youtube-embed { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000; border-radius: 12px; }
        .youtube-embed iframe, .spotify-embed iframe { border-radius:12px; border: 0; }
        .youtube-embed iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .mail-form input { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; margin-bottom: 0.5rem; }
        .countdown-container { margin: 1.5rem auto; max-width: 480px; }
        .countdown-title { margin-bottom: 0.5rem; font-size: 1.1rem; font-weight: bold; color: ${textColor}; }
        .countdown-timer { display: flex; justify-content: center; gap: 1rem; padding: 1rem; background-color: rgba(0,0,0,0.05); border-radius: 12px; }
        .countdown-block { display: flex; flex-direction: column; align-items: center; min-width: 50px; }
        .countdown-number { font-size: 2rem; font-weight: bold; color: ${btnColor}; }
        .countdown-label { font-size: 0.75rem; text-transform: uppercase; opacity: 0.7; }
        ${finalAnimationStyles}
        .gallery-scroll-container { display: flex; gap: 10px; overflow-x: auto; padding: 10px 0; scrollbar-width: thin; scrollbar-color: ${btnColor} ${bgColor}; margin: 1rem 0; }
        .gallery-scroll-container::-webkit-scrollbar { height: 8px; }
        .gallery-scroll-container::-webkit-scrollbar-track { background: ${bgColor}; border-radius: 10px; }
        .gallery-scroll-container::-webkit-scrollbar-thumb { background-color: ${btnColor}; border-radius: 10px; border: 2px solid ${bgColor}; }
        .gallery-image-link { flex-shrink: 0; width: 150px; height: 150px; border-radius: 12px; overflow: hidden; cursor: pointer; }
        .gallery-image-link img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.2s; }
        .gallery-image-link:hover img { transform: scale(1.05); }
        .lightbox { display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.85); justify-content: center; align-items: center; }
        .lightbox-content { max-width: 90vw; max-height: 90vh; }
        .lightbox-close { position: absolute; top: 20px; right: 35px; color: #fff; font-size: 40px; font-weight: bold; cursor: pointer; transition: 0.3s; }
        .lightbox-close:hover { color: #bbb; }
    </style>
    
    ${analyticsScript}
</head>
<body class="${selectedAnimationValue !== 'none' ? `animate-${selectedAnimationValue}` : ''}">
    <div class="content-wrapper ${cardShadow}">
        <img src="${escapeHTML(finalPicUrl)}" alt="Profile Picture" id="profile-pic">
        <h1>${escapeHTML(name)}</h1>
        <p id="bio">${escapeHTML(bio)}</p>
        <div class="links-container">
            ${contentHtml.trim()}
        </div>
    </div>

    <div id="imageLightbox" class="lightbox">
        <span class="lightbox-close">×</span>
        <img class="lightbox-content" id="lightboxImg">
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const lightbox = document.getElementById('imageLightbox');
            if (!lightbox) return;
            const lightboxImg = document.getElementById('lightboxImg');
            const closeBtn = lightbox.querySelector('.lightbox-close');
            document.querySelector('.content-wrapper').addEventListener('click', function(e) {
                if (e.target.classList.contains('clickable-image')) {
                    e.preventDefault();
                    lightbox.style.display = 'flex';
                    lightboxImg.src = e.target.src;
                }
            });
            function closeLightbox() {
                lightbox.style.display = 'none';
            }
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
        });
        setInterval(function() {
            const countdowns = document.querySelectorAll('.countdown-container');
            countdowns.forEach(countdown => {
                const targetDate = new Date(countdown.dataset.datetime).getTime();
                const now = new Date().getTime();
                const distance = targetDate - now;
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                countdown.querySelector('.days').textContent = days < 0 ? 0 : days;
                countdown.querySelector('.hours').textContent = hours < 0 ? 0 : hours;
                countdown.querySelector('.minutes').textContent = minutes < 0 ? 0 : minutes;
                countdown.querySelector('.seconds').textContent = seconds < 0 ? 0 : seconds;
            });
        }, 1000);
    </script>
</body>
</html>`;

    htmlOutput.value = finalPageHtml.trim();
    if(modal) modal.style.display = 'block';
});


// --- Modal Closing Logic ---
if (modal) {
    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.style.display = 'none');
    }
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

// --- Initial Setup ---
function initializeApp() {
    // Dynamically populate the hidden animation selector
    ANIMATIONS.forEach(anim => {
        const option = document.createElement('option');
        option.value = anim.value;
        option.textContent = anim.name;
        animationSelector.appendChild(option);
    });

    // Add all themes to the hidden theme selector
    Object.keys(THEMES).forEach(themeKey => {
        const option = document.createElement('option');
        option.value = themeKey;
        option.textContent = themeKey;
        themeSelector.appendChild(option);
    });

    // Add all fonts to the hidden font selector
    FONTS.forEach(font => {
        const option = document.createElement('option');
        option.value = font;
        option.textContent = font;
        fontSelector.appendChild(option);
    });

    loadState();
    setInterval(updateAllCountdownPreviews, 1000);
}

initializeApp();