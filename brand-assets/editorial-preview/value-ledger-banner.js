const path=require('path');
const sharp=require('D:/nimrod-digitals-web/node_modules/.pnpm/sharp@0.35.4_@types+node@22.20.1/node_modules/sharp');
const W=1600,H=900, cx=170, cy=560;
const a1=62,a2=17,b1=30,b2=44,hz=60;
const P=(x,y,z)=>[cx+x*a1+y*b1, cy-x*a2+y*b2-z*hz];
const M={bone:['#F6F3EE','#DCD8D1','#C3BFB8'],blue:['#3A7BFF','#0A57FF','#0743C4'],dark:['#20242C','#0B0B0D','#15181E'],stone:['#BEC2C6','#8F9398','#767A7F'],navy:['#12307A','#08215C','#0A1A45']};
const boxes=[];const B=(x0,x1,y0,y1,z0,z1,m,op=1,L=1)=>boxes.push({x0,x1,y0,y1,z0,z1,m,op,L});
// seeded rng
let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;
// base
B(-4,24,0,3.4,-6,0,'dark',1,0); B(-4,24,0,3.4,0,0.8,'bone',1,0);
// activity cubes (left), dense
for(let gx=0;gx<9;gx++)for(let gy=0;gy<4;gy++){ if(r()<0.25)continue;
 const x=-2.6+gx*1.15+r()*0.3, y=0.25+gy*0.78+r()*0.15, sz=0.38+r()*0.28;
 B(x,x+sz,y,y+sz,0.8,0.8+sz,'blue');
 if(r()<0.35){const s2=sz*0.75;B(x+0.05,x+0.05+s2,y+0.05,y+0.05+s2,0.8+sz,0.8+sz+s2,'blue');}}
// gate
const gx=8.6;B(gx,gx+0.7,-0.4,0.35,0.8,5.0,'bone');B(gx,gx+0.7,3.05,3.8,0.8,5.0,'bone');B(gx,gx+0.7,0.35,3.05,4.1,5.0,'bone');
// glass-ish panels before gate
for(let i=0;i<3;i++)B(gx-1.4+i*0.3,gx-1.36+i*0.3,0.5,2.9,0.8,3.6,'stone',0.18);
// single cube in the gate
B(gx+0.05,gx+0.6,1.4,1.95,0.8,1.35,'blue');
// path line after gate
B(gx+0.7,21.5,1.6,1.75,0.8,0.83,'blue',1,0.5);
// ledger: five tablets stepping up
for(let i=0;i<5;i++){const x=10.3+i*1.45;B(x,x+1.05,0.5,2.9,0.8,1.05+i*0.38,i%2?'stone':'bone');}
// result cube on top of last tablet
B(16.3,17.0,1.35,2.05,2.57,3.27,'blue',1,2);
// far dark wall end
B(18.6,19.4,-0.4,3.8,0.8,4.4,'dark');
// sort: far first
boxes.sort((p,q)=>(p.L-q.L)||((p.y0+p.y1)/2-(p.x0+p.x1)/2*0.9)-((q.y0+q.y1)/2-(q.x0+q.x1)/2*0.9) || p.z0-q.z0);
const poly=(pts,f,op)=>`<polygon points="${pts.map(p=>P(...p).map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="${f}" fill-opacity="${op}" ${op<1?'stroke="#F6F3EE" stroke-opacity="0.5" stroke-width="1.2"':''}/>`;
let g='';
for(const b of boxes){const {x0,x1,y0,y1,z0,z1}=b,[t,f,l]=M[b.m];
 g+=poly([[x0,y0,z0],[x0,y1,z0],[x0,y1,z1],[x0,y0,z1]],l,b.op);
 g+=poly([[x0,y1,z0],[x1,y1,z0],[x1,y1,z1],[x0,y1,z1]],f,b.op);
 g+=poly([[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]],t,b.op);}
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B0B0D"/><stop offset="0.45" stop-color="#08215C"/><stop offset="1" stop-color="#0B1E4E"/></linearGradient>
<radialGradient id="glow" cx="0.62" cy="0.35" r="0.6"><stop offset="0" stop-color="#0A57FF" stop-opacity="0.22"/><stop offset="1" stop-color="#0A57FF" stop-opacity="0"/></radialGradient>
<linearGradient id="vig" x1="0" y1="0" x2="0" y2="1"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.45"/></linearGradient></defs>
<rect width="100%" height="100%" fill="url(#bg)"/><rect width="100%" height="100%" fill="url(#glow)"/>
<polygon points="0,0 360,0 360,330 0,520" fill="#0B0B0D" opacity="0.75"/>
<polygon points="1180,900 1600,700 1600,900" fill="#08215C" opacity="0.9"/>
${g}<rect width="100%" height="100%" fill="url(#vig)"/></svg>`;
const out='D:/nimrod-digitals-web/public/insights';const n='value-ledger';
(async()=>{const buf=await sharp(Buffer.from(svg),{density:144}).resize(W,H).png().toBuffer();
await sharp(buf).jpeg({quality:84,mozjpeg:true}).toFile(`${out}/${n}.jpg`);
await sharp(buf).resize(1200,675).jpeg({quality:80,mozjpeg:true}).toFile(`${out}/responsive/${n}-1200.jpg`);
await sharp(buf).resize(768,432).jpeg({quality:78,mozjpeg:true}).toFile(`${out}/responsive/${n}-768.jpg`);
await sharp(buf).resize(1200,630,{fit:'cover',position:'centre'}).jpeg({quality:80,mozjpeg:true}).toFile(`${out}/social/${n}.jpg`);
console.log('ok');})();
