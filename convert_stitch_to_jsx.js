const fs = require('fs');

function htmlToJsx(html) {
  let jsx = html;

  // Comments
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

  // class to className
  jsx = jsx.replace(/\bclass="/g, 'className="');

  // for to htmlFor
  jsx = jsx.replace(/\bfor="/g, 'htmlFor="');

  // SVG attributes
  jsx = jsx.replace(/\bviewbox="/gi, 'viewBox="');
  jsx = jsx.replace(/\bstroke-width="/gi, 'strokeWidth="');
  jsx = jsx.replace(/\bstroke-dasharray="/gi, 'strokeDasharray="');
  jsx = jsx.replace(/\bstroke-dashoffset="/gi, 'strokeDashoffset="');
  jsx = jsx.replace(/\bstroke-linecap="/gi, 'strokeLinecap="');
  jsx = jsx.replace(/\bfill-rule="/gi, 'fillRule="');
  jsx = jsx.replace(/\bclip-rule="/gi, 'clipRule="');

  // Self closing tags
  jsx = jsx.replace(/<input([^>]*[^\/])>/gi, '<input$1 />');
  jsx = jsx.replace(/<img([^>]*[^\/])>/gi, '<img$1 />');
  jsx = jsx.replace(/<br>/gi, '<br />');
  jsx = jsx.replace(/<hr([^>]*[^\/])>/gi, '<hr$1 />');

  // Style attributes
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => {
    const rules = styleStr.split(';').filter(Boolean);
    const obj = {};
    for (const r of rules) {
      const [k, ...vParts] = r.split(':');
      if (!k || vParts.length === 0) continue;
      const key = k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      const val = vParts.join(':').trim();
      obj[key] = val;
    }
    return `style={${JSON.stringify(obj)}}`;
  });

  // Common events cleanup
  jsx = jsx.replace(/\bonclick="[^"]*"/gi, '');
  jsx = jsx.replace(/\bonchange="[^"]*"/gi, '');
  jsx = jsx.replace(/\bonkeydown="[^"]*"/gi, '');

  return jsx;
}

// Extract main for each
const s1 = fs.readFileSync('c:/Users/Sirisha.B/Downloads/hackathon/career_match/stitch_screen1_raw.html', 'utf8');
const s2 = fs.readFileSync('c:/Users/Sirisha.B/Downloads/hackathon/career_match/stitch_screen2_raw.html', 'utf8');
const s3 = fs.readFileSync('c:/Users/Sirisha.B/Downloads/hackathon/career_match/stitch_screen3_raw.html', 'utf8');
const s4 = fs.readFileSync('c:/Users/Sirisha.B/Downloads/hackathon/career_match/stitch_screen4_raw.html', 'utf8');

function extractMain(content) {
  const m1 = content.indexOf('<main');
  const m2 = content.indexOf('</main>');
  return content.substring(m1, m2 + 7);
}

fs.writeFileSync('c:/Users/Sirisha.B/Downloads/hackathon/career_match/s1_main.jsx.txt', htmlToJsx(extractMain(s1)));
fs.writeFileSync('c:/Users/Sirisha.B/Downloads/hackathon/career_match/s2_main.jsx.txt', htmlToJsx(extractMain(s2)));
fs.writeFileSync('c:/Users/Sirisha.B/Downloads/hackathon/career_match/s3_main.jsx.txt', htmlToJsx(extractMain(s3)));
fs.writeFileSync('c:/Users/Sirisha.B/Downloads/hackathon/career_match/s4_main.jsx.txt', htmlToJsx(extractMain(s4)));

console.log('Successfully generated JSX files for all 4 screens');
