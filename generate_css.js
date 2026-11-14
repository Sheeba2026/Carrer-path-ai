const fs = require('fs');

const colors = {
  'surface-container-lowest': '#07090F',
  'surface-container-low': '#0E121E',
  'surface-container': '#111522',
  'surface-container-high': '#161C2C',
  'surface-container-highest': '#1D2438',
  'surface': '#111522',
  'surface-variant': '#1B2236',
  'surface-bright': '#252E47',
  'surface-dim': '#0B0E17',
  'on-surface': '#F1F5F9',
  'on-surface-variant': '#94A3B8',
  'outline': '#64748B',
  'outline-variant': '#334155',

  'primary': '#6366F1',
  'primary-container': '#4F46E5',
  'primary-fixed': '#818CF8',
  'on-primary': '#FFFFFF',
  'on-primary-container': '#E0E7FF',

  'secondary': '#38BDF8',
  'secondary-container': '#0284C7',
  'secondary-fixed-dim': '#7DD3FC',
  'on-secondary': '#FFFFFF',
  'on-secondary-container': '#E0F2FE',

  'tertiary': '#34D399',
  'tertiary-container': '#059669',
  'on-tertiary': '#FFFFFF',
  'on-tertiary-container': '#D1FAE5',

  'zen-bg': '#0B0E17',
  'zen-surface': '#111522',
  'zen-card': '#151A29',
  'zen-border': '#1F263B',
  'zen-border-subtle': '#171D2F',
  'zen-indigo': '#6366F1',
  'zen-indigo-light': '#818CF8',
  'zen-cyan': '#38BDF8',
  'zen-emerald': '#34D399',
  'zen-text-main': '#F1F5F9',
  'zen-text-muted': '#94A3B8',
  'zen-text-faint': '#64748B'
};

function hexToRgba(hex, alpha) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

let cssRules = [];

// Base utilities
for (const [name, hex] of Object.entries(colors)) {
  cssRules.push(`.bg-${name} { background-color: ${hex} !important; }`);
  cssRules.push(`.text-${name} { color: ${hex} !important; }`);
  cssRules.push(`.border-${name} { border-color: ${hex} !important; }`);
  cssRules.push(`.hover\\:bg-${name}:hover { background-color: ${hex} !important; }`);
  cssRules.push(`.hover\\:text-${name}:hover { color: ${hex} !important; }`);
  cssRules.push(`.hover\\:border-${name}:hover { border-color: ${hex} !important; }`);
  cssRules.push(`.group:hover .group-hover\\:border-${name} { border-color: ${hex} !important; }`);
  cssRules.push(`.group:hover .group-hover\\:text-${name} { color: ${hex} !important; }`);
  cssRules.push(`.from-${name} { --tw-gradient-from: ${hex} !important; --tw-gradient-to: rgb(0 0 0 / 0) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }`);
  cssRules.push(`.to-${name} { --tw-gradient-to: ${hex} !important; }`);
  cssRules.push(`.via-${name} { --tw-gradient-to: rgb(0 0 0 / 0) !important; --tw-gradient-stops: var(--tw-gradient-from), ${hex}, var(--tw-gradient-to) !important; }`);

  // Opacities
  const opacities = [10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90];
  for (const op of opacities) {
    const rgba = hexToRgba(hex, op / 100);
    cssRules.push(`.bg-${name}\\/${op} { background-color: ${rgba} !important; }`);
    cssRules.push(`.text-${name}\\/${op} { color: ${rgba} !important; }`);
    cssRules.push(`.border-${name}\\/${op} { border-color: ${rgba} !important; }`);
    cssRules.push(`.hover\\:bg-${name}\\/${op}:hover { background-color: ${rgba} !important; }`);
    cssRules.push(`.hover\\:border-${name}\\/${op}:hover { border-color: ${rgba} !important; }`);
  }
}

const baseCss = `
body {
  background-color: #0B0E17 !important;
  color: #F1F5F9 !important;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
  overflow-x: hidden;
  margin: 0;
}

::selection {
  background: #6366F1 !important;
  color: #FFFFFF !important;
}

/* Typography scale */
.font-headline-xl, .text-headline-xl {
  font-size: 2.25rem !important;
  line-height: 2.6rem !important;
  font-weight: 700 !important;
  letter-spacing: -0.025em !important;
}

.font-headline-lg, .text-headline-lg {
  font-size: 1.875rem !important;
  line-height: 2.25rem !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
}

.font-headline-md, .text-headline-md {
  font-size: 1.5rem !important;
  line-height: 2rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.015em !important;
}

.font-headline-sm, .text-headline-sm {
  font-size: 1.15rem !important;
  line-height: 1.6rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.01em !important;
}

.font-body-lg, .text-body-lg {
  font-size: 1rem !important;
  line-height: 1.65rem !important;
  font-weight: 400 !important;
}

.font-body-md, .text-body-md {
  font-size: 0.875rem !important;
  line-height: 1.45rem !important;
  font-weight: 400 !important;
}

.font-body-sm, .text-body-sm {
  font-size: 0.8125rem !important;
  line-height: 1.25rem !important;
  font-weight: 400 !important;
}

.font-label-lg, .text-label-lg {
  font-size: 0.875rem !important;
  line-height: 1.25rem !important;
  font-weight: 600 !important;
}

.font-label-md, .text-label-md {
  font-size: 0.75rem !important;
  line-height: 1rem !important;
  font-weight: 600 !important;
}

.font-label-sm, .text-label-sm {
  font-size: 0.6875rem !important;
  line-height: 0.95rem !important;
  font-weight: 600 !important;
}

.font-data-metric, .text-data-metric {
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 1.25rem !important;
  font-weight: 700 !important;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace !important;
}

.font-sans {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
}

.zen-tab-active {
  background: #1E253A !important;
  color: #FFFFFF !important;
  border-color: #313B59 !important;
}

.skill-chip {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.skill-chip.active {
  background: rgba(99, 102, 241, 0.16) !important;
  border-color: #6366F1 !important;
  color: #FFFFFF !important;
  box-shadow: 0 0 16px rgba(99, 102, 241, 0.22);
}

.skill-chip.active .chip-icon {
  color: #818CF8 !important;
}

.skill-chip.active .chip-badge {
  background: rgba(99, 102, 241, 0.3) !important;
  color: #C7D2FE !important;
}

@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.9;
    transform: scale(1);
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.92);
    box-shadow: 0 0 2px rgba(56, 189, 248, 0.2);
  }
}

.cyan-live-pulse {
  animation: pulseGlow 2s infinite ease-in-out;
}

.milestone-done {
  text-decoration: line-through;
  opacity: 0.55;
}

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined' !important;
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  vertical-align: middle;
}
`;

const fullCss = `@import "tailwindcss";\n\n` + baseCss + '\n\n/* Generated Stitch Token Classes */\n' + cssRules.join('\n');
fs.writeFileSync('c:/Users/Sirisha.B/Downloads/hackathon/career_match/src/app/globals.css', fullCss);
console.log('Successfully wrote globals.css with all', cssRules.length, 'token rules!');
