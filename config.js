// config_main.js

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
    'custom': { bg: '#ffffff', text: '#000000', btn: '#333333' },
    'theme-dark': { bg: '#121212', text: '#ffffff', btn: '#bb86fc' },
    'theme-forest': { bg: '#f0f4f0', text: '#2c3e50', btn: '#27ae60' },
    'theme-sunset': { bg: '#4a4e69', text: '#f2e9e4', btn: '#f28482' },
    'theme-ocean': { bg: '#eef7ff', text: '#0d3b66', btn: '#3a86ff' },
    'theme-sakura': { bg: '#fff0f5', text: '#5c374c', btn: '#ff8fab' },
    'theme-latte': { bg: '#f5e6d3', text: '#4a403a', btn: '#a68a64' },
    'theme-mono': { bg: '#f4f4f4', text: '#111111', btn: '#333333' },
    'theme-matrix': { bg: '#0d0208', text: '#00ff41', btn: '#008f11' },
    'theme-graphite': { bg: '#212529', text: '#f8f9fa', btn: '#6c757d' },
    'theme-royal': { bg: '#4c2a85', text: '#fada5e', btn: '#361066' },
    'theme-coral': { bg: '#fff0f3', text: '#582c36', btn: '#ff6b6b' },
    'theme-mint': { bg: '#f1fcf7', text: '#0a3d24', btn: '#20c997' },
    'theme-dusk': { bg: '#3d405b', text: '#f4f1de', btn: '#e07a5f' },
    'theme-dracula': { bg: '#282a36', text: '#f8f82', btn: '#bd93f9' },
    'theme-cotton-candy': { bg: '#fdeff9', text: '#7f5a83', btn: '#a1c4fd' },
    'theme-retro': { bg: '#fdf0d5', text: '#343a40', btn: '#c1121f' },
    'theme-beach': { bg: '#eae2b7', text: '#003049', btn: '#d62828' },
    'theme-meadow': { bg: '#f0fff0', text: '#3c403d', btn: '#9d6b53' },
    'theme-ice': { bg: '#f0f8ff', text: '#1b263b', btn: '#415a77' },
    'theme-mocha': { bg: '#efebe9', text: '#4e342e', btn: '#795548' },
    'theme-honey': { bg: '#fffde7', text: '#424242', btn: '#ffab00' },
    'theme-lavender': { bg: '#e6e6fa', text: '#483d8b', btn: '#9370db' },
    'theme-slate': { bg: '#2c3e50', text: '#ecf0f1', btn: '#3498db' }
};

const FONTS = [
    'System Default',
    'Roboto',
    'Montserrat',
    'Lora',
    'Playfair Display',
    'Oswald',
    'Nunito',
    'Merriweather',
    'Poppins',
    'Lato',
    'Inter',
    'Bebas Neue',
    'Lobster',
    'Inconsolata'
];

const ANIMATIONS = [
  { name: 'None',  value: 'none',  keyframes: '', class: '' },
  {
    name: 'Pulse',
    value: 'pulse',
    keyframes: `@keyframes pulse { 0% {transform: scale(1);} 50% {transform: scale(1.05);} 100% {transform: scale(1);} }`,
    class: `.animate-pulse .animated-button { animation: pulse 2s infinite; }`
  },
  {
    name: 'Shake on Hover',
    value: 'shake',
    keyframes: `@keyframes shake { 0%,100% {transform: translateX(0);} 50% {transform: translateX(-2px);} 75% {transform: translateX(2px);} }`,
    class: `.animate-shake .animated-button:hover { animation: shake 0.2s 2; }`
  },
  {
    name: 'Float on Hover',
    value: 'float',
    keyframes: `@keyframes float { 0%,100% {transform: translateY(0);} 50% {transform: translateY(-4px);} }`,
    class: `.animate-float .animated-button:hover { animation: float 0.6s infinite; }`
  },
  {
    name: 'Wobble on Hover',
    value: 'wobble',
    keyframes: `@keyframes wobble { 0% {transform: translateX(0);} 15% {transform: translateX(-25%) rotate(-5deg);} 30% {transform: translateX(20%) rotate(3deg);} 45% {transform: translateX(-15%) rotate(-3deg);} 60% {transform: translateX(10%) rotate(2deg);} 75% {transform: translateX(-5%) rotate(-1deg);} 100% {transform: translateX(0);} }`,
    class: `.animate-wobble .animated-button:hover { animation: wobble 1s both; }`
  },
  {
    name: 'Glow on Hover',
    value: 'glow',
    keyframes: ``,
    class: `
      .animate-glow .animated-button { transition: box-shadow 0.3s ease; }
      .animate-glow .animated-button:hover { box-shadow: 0 0 15px var(--button-color); }
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