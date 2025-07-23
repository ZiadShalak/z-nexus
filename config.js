// config.js

const ICONS = [
    { name: 'Website', class: 'fa-solid fa-globe' },
    { name: 'Email', class: 'fa-solid fa-envelope' },
    { name: 'Twitter', class: 'fa-brands fa-twitter' },
    { name: 'Instagram', class: 'fa-brands fa-instagram' },
    { name: 'LinkedIn', class: 'fa-brands fa-linkedin' },
    { name: 'GitHub', class: 'fa-brands fa-github' },
    { name: 'YouTube', class: 'fa-brands fa-youtube' },
    { name: 'Facebook', class: 'fa-brands fa-facebook' },
    { name: 'TikTok', class: 'fa-brands fa-tiktok' },
    { name: 'Spotify', class: 'fa-brands fa-spotify' },
    { name: 'Pinterest', class: 'fa-brands fa-pinterest' },
    { name: 'Twitch', class: 'fa-brands fa-twitch' },
    { name: 'Discord', class: 'fa-brands fa-discord' },
    { name: 'Reddit', class: 'fa-brands fa-reddit-alien' },
    { name: 'Snapchat', class: 'fa-brands fa-snapchat' },
    { name: 'Telegram', class: 'fa-brands fa-telegram' },
    { name: 'WhatsApp', class: 'fa-brands fa-whatsapp' },
    { name: 'Patreon', class: 'fa-brands fa-patreon' }
];

const THEMES = {
  custom: {
    bg: "#ffffff", text: "#000000", btn: "#333333", pageBg: "#f4f4f9"
  },

  'theme-dark': {
    bg: "#1e1e1e", text: "#f5f5f5", btn: "#bb86fc", pageBg: "#0d0d0d"
  },

  'theme-forest': {
    bg: "#e6f1eb", text: "#2f4f4f", btn: "#2e8b57", pageBg: "#d0e7db"
  },

  'theme-sunset': {
    bg: "#4a4e69", text: "#f2e9e4", btn: "#f28482", pageBg: "#2e2f4a"
  },

  'theme-ocean': {
    bg: "#e0f4ff", text: "#0d3b66", btn: "#3a86ff", pageBg: "#c2e1ff"
  },

  'theme-sakura': {
    bg: "#fff0f5", text: "#5c374c", btn: "#ff8fab", pageBg: "#ffe9f0"
  },

  'theme-latte': {
    bg: "#f6ebda", text: "#4a403a", btn: "#a68a64", pageBg: "#ece0ce"
  },

  'theme-mono': {
    bg: "#f5f5f5", text: "#1a1a1a", btn: "#333333", pageBg: "#e2e2e2"
  },

  'theme-matrix': {
    bg: "#0d0208", text: "#00ff41", btn: "#00cc33", pageBg: "#000000"
  },

  'theme-graphite': {
    bg: "#2a2d34", text: "#f8f9fa", btn: "#6c757d", pageBg: "#1a1b1f"
  },

  'theme-royal': {
    bg: "#4c2a85", text: "#fada5e", btn: "#361066", pageBg: "#2b1850"
  },

  'theme-coral': {
    bg: "#fff0f3", text: "#582c36", btn: "#ff6b6b", pageBg: "#ffe7ea"
  },

  'theme-mint': {
    bg: "#f1fcf7", text: "#0a3d24", btn: "#20c997", pageBg: "#d9f4e7"
  },

  'theme-dusk': {
    bg: "#3d405b", text: "#f4f1de", btn: "#e07a5f", pageBg: "#2d2f4a"
  },

  'theme-dracula': {
    bg: "#282a36", text: "#f8f8f2", btn: "#bd93f9", pageBg: "#1f202a"
  }
};


const FONTS = [
    'System Default',
    'Inter',
    'Roboto',
    'Montserrat',
    'Lora',
    'Playfair Display',
    'Oswald',
    'Nunito',
    'Merriweather',
    'Poppins',
    'Lato',
    'Bebas Neue',
    'Lobster',
    'Inconsolata'
];

const ANIMATIONS = [
  { name: 'None',  value: 'none',  keyframes: '', class: '' },
  {
    name: 'Pulse',
    value: 'pulse',
    keyframes: `@keyframes pulse { 0% {transform: scale(1);} 50% {transform: scale(1.03);} 100% {transform: scale(1);} }`,
    class: `.animate-pulse .animated-button { animation: pulse 2s infinite ease-in-out; }`
  },
  {
    name: 'Shake on Hover',
    value: 'shake',
    keyframes: `@keyframes shake { 0%,100% {transform: translateX(0) translateY(-3px);} 50% {transform: translateX(-2px) translateY(-3px);} 75% {transform: translateX(2px) translateY(-3px);} }`,
    class: `.animate-shake .animated-button:hover { animation: shake 0.2s 2; }`
  },
  {
    name: 'Float on Hover',
    value: 'float',
    keyframes: `@keyframes float { 0%,100% {transform: translateY(-3px);} 50% {transform: translateY(-7px);} }`,
    class: `.animate-float .animated-button:hover { animation: float 0.6s infinite; }`
  },
  {
    name: 'Wobble on Hover',
    value: 'wobble',
    keyframes: `@keyframes wobble { 0% {transform:translateX(0) translateY(-3px);} 15% {transform:translateX(-5px) rotate(-3deg) translateY(-3px);} 30% {transform:translateX(4px) rotate(2deg) translateY(-3px);} 45% {transform:translateX(-3px) rotate(-2deg) translateY(-3px);} 60% {transform:translateX(2px) rotate(1deg) translateY(-3px);} 75% {transform:translateX(-1px) rotate(0) translateY(-3px);} 100% {transform:translateX(0) translateY(-3px);} }`,
    class: `.animate-wobble .animated-button:hover { animation: wobble 1s both; }`
  },
  {
    name: 'Glow on Hover',
    value: 'glow',
    keyframes: ``,
    class: `
      .animate-glow .animated-button { transition: box-shadow 0.3s ease, transform 0.2s; }
      .animate-glow .animated-button:hover { box-shadow: 0 0 20px var(--button-color); }
    `
  },
  {
    name: 'Shine on Hover',
    value: 'shine',
    keyframes: ``,
    class: `
      .animate-shine .animated-button { position: relative; overflow: hidden; }
      .animate-shine .animated-button::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: left 0.6s ease-in-out;
      }
      .animate-shine .animated-button:hover::before { left: 100%; }
    `
  }
];