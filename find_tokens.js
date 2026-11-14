const fs = require('fs');
const files = [
  'c:/Users/Sirisha.B/Downloads/hackathon/career_match/stitch_screen1_raw.html',
  'c:/Users/Sirisha.B/Downloads/hackathon/career_match/stitch_screen2_raw.html',
  'c:/Users/Sirisha.B/Downloads/hackathon/career_match/stitch_screen3_raw.html',
  'c:/Users/Sirisha.B/Downloads/hackathon/career_match/stitch_screen4_raw.html'
];
const allClasses = new Set();
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/class="([^"]+)"/g) || [];
  for (const m of matches) {
    const classVal = m.replace('class="', '').replace('"', '');
    classVal.split(/\s+/).forEach(c => { if(c) allClasses.add(c); });
  }
}
const customTokens = Array.from(allClasses).filter(c => 
  c.includes('surface') || c.includes('primary') || c.includes('secondary') || 
  c.includes('tertiary') || c.includes('outline') || c.includes('headline') || 
  c.includes('label') || c.includes('body-') || c.includes('data-metric') || c.includes('zen')
);
console.log('Total custom token classes found in Stitch:', customTokens.length);
console.log(customTokens.sort().join('\n'));
