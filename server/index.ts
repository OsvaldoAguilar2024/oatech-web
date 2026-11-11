import { SQL } from "bun";

const ADMIN_KEY = Bun.env.ADMIN_KEY || "";
let db: SQL | null = null;
let ready: Promise<unknown> | null = null;

async function getDb(): Promise<SQL> {
  if (!Bun.env.DATABASE_URL) throw new Error("DATABASE_URL no configurada");
  if (!db) db = new SQL(Bun.env.DATABASE_URL);
  if (!ready) {
    const conn = db;
    ready = (async () => {
      await conn.unsafe(`CREATE TABLE IF NOT EXISTS oatech_contactos (id SERIAL PRIMARY KEY, nombre TEXT NOT NULL, empresa TEXT, email TEXT NOT NULL, servicio TEXT, mensaje TEXT, fecha TIMESTAMPTZ DEFAULT now())`);
      await conn.unsafe(`CREATE TABLE IF NOT EXISTS oatech_diagnosticos (id SERIAL PRIMARY KEY, nombre TEXT NOT NULL, empresa TEXT, email TEXT NOT NULL, puntaje INT, nivel TEXT, respuestas TEXT, fecha TIMESTAMPTZ DEFAULT now())`);
    })().catch((e) => { ready = null; throw e; });
  }
  await ready;
  return db;
}

const BRAND = "https://oatech-brand-production.up.railway.app";
const WA = "https://wa.me/447766285137?text=Hola%20Osvaldo%2C%20vi%20la%20p%C3%A1gina%20de%20OA%20Tech%20y%20quiero%20conversar.";
const CLARITO = "https://clarito.oatech.com.co";
const ACOMPANAPP = "https://acompanapp.com";
const DEMO = "https://demo.oatech.com.co";
const FOTOS = "https://cdn.jsdelivr.net/gh/OsvaldoAguilar2024/oatech-web@af02bf2464010c5938e0e0bcca666c517b38307b/fotos";
const F = (n: string) => `${FOTOS}/${n}.avif`;

/* ───────────────────────── Estilos compartidos ───────────────────────── */
const CSS = `
:root{--bg:#07090c;--bg2:#0c1015;--bg3:#11161d;--ink:#eef2f5;--muted:#8d99a6;--dim:#5b6673;--line:rgba(255,255,255,.09);--line2:rgba(255,255,255,.16);--ac:#3cc6ea;--ac-ink:#04131a;--sol:#E5BE5E;--nar:#E8935A;--rail:56px}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;background:var(--bg)}
body{background:var(--bg);color:var(--ink);font-family:Inter,system-ui,sans-serif;font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit}
img{max-width:100%;display:block}
::selection{background:var(--ac);color:var(--ac-ink)}
.disp{font-family:Archivo,"Arial Narrow",sans-serif;font-stretch:68%;font-weight:800;text-transform:uppercase;line-height:.96;letter-spacing:-.01em}
.mono{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase}
.ac{color:var(--ac)}
/* grano cinematográfico */
body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:90;opacity:.06;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
/* riel lateral */
.rail{position:fixed;left:0;top:0;bottom:0;width:var(--rail);border-right:1px solid var(--line);display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:22px 0 70px;z-index:40;background:rgba(7,9,12,.6);backdrop-filter:blur(6px)}
.rail .v{writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap}
.rail .word{font-family:Archivo,sans-serif;font-stretch:68%;font-weight:800;font-size:20px;letter-spacing:.18em}
.rail .est{color:var(--dim)}
.rail .dot{width:7px;height:7px;border-radius:50%;background:var(--ac);box-shadow:0 0 14px var(--ac)}
/* barra superior */
.top{position:fixed;top:0;left:var(--rail);right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:16px 36px;transition:background .3s,border-color .3s;border-bottom:1px solid transparent}
.top.solid{background:rgba(7,9,12,.82);backdrop-filter:blur(10px);border-color:var(--line)}
.top .logo img{height:40px;width:auto}
.top nav{display:flex;gap:34px;align-items:center}
.top nav a{text-decoration:none;color:var(--muted);transition:color .2s}
.top nav a:hover,.top nav a.on{color:var(--ink)}
.top nav a.cta{color:var(--ac-ink);background:var(--ac);padding:10px 16px;border-radius:2px}
.burger{display:none;background:none;border:1px solid var(--line2);color:var(--ink);padding:9px 12px;cursor:pointer;font:inherit}
main{margin-left:var(--rail)}
.wrap{max-width:1240px;margin:0 auto;padding:0 36px}
/* botones */
.btn{display:inline-flex;align-items:center;gap:10px;background:var(--ac);color:var(--ac-ink);text-decoration:none;font-weight:600;font-size:15px;padding:16px 26px;border:0;border-radius:2px;cursor:pointer;font-family:inherit;transition:transform .2s,box-shadow .2s}
.btn:hover{transform:translateY(-2px);box-shadow:0 10px 30px -10px var(--ac)}
.btn.ghost{background:transparent;color:var(--ink);border:1px solid var(--line2)}
.btn.ghost:hover{border-color:var(--ink);box-shadow:none}
.btn.sol{background:var(--sol);color:#1f1a0c}
.btn.sol:hover{box-shadow:0 10px 30px -10px var(--sol)}
.btn.nar{background:var(--nar);color:#24130a}
.btn.nar:hover{box-shadow:0 10px 30px -10px var(--nar)}
/* héroe */
.hero{position:relative;min-height:100vh;min-height:100svh;display:flex;align-items:flex-end;overflow:hidden;border-bottom:1px solid var(--line)}
.hero .photo{position:absolute;inset:0;overflow:hidden}
.hero .photo img{width:100%;height:100%;object-fit:cover;object-position:right center;filter:contrast(1.05) brightness(.82);transform:scale(1.04);animation:drift 26s ease-in-out infinite alternate}
.hero .photo::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,9,12,.85) 0%,rgba(7,9,12,.35) 45%,transparent 70%),linear-gradient(180deg,rgba(7,9,12,.55) 0%,transparent 25%,transparent 55%,var(--bg) 100%)}
.hero .glow{position:absolute;inset:0;background:radial-gradient(700px 420px at 15% 85%,rgba(60,198,234,.12),transparent 70%)}
.hero .inner{position:relative;width:100%;padding:120px 36px 120px;max-width:1400px;margin:0 auto}
.hero h1{font-size:clamp(52px,min(8.4vw,17vh),150px)}
.hero h1 .l2{display:block;color:transparent;-webkit-text-stroke:1.5px var(--ink)}
.hero .row{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;margin-top:34px;flex-wrap:wrap}
.hero .lead{max-width:560px;color:#c9d1d9;font-size:19px}
.hero .ctas{display:flex;gap:12px;flex-wrap:wrap}
.hero .kick{margin-bottom:22px;display:flex;gap:14px;align-items:center;color:var(--muted)}
.hero .kick b{color:var(--ac);font-weight:500}
@keyframes drift{from{transform:scale(1.04) translate(0,0)}to{transform:scale(1.1) translate(-1%,-1%)}}
/* cinta */
.strip{border-bottom:1px solid var(--line);overflow:hidden;white-space:nowrap;padding:18px 0;background:var(--bg2)}
.strip .t{display:inline-block;animation:slide 80s linear infinite}
.strip:hover .t{animation-play-state:paused}
.strip span{font-family:Archivo,sans-serif;font-stretch:68%;font-weight:700;text-transform:uppercase;font-size:28px;color:var(--dim);margin:0 26px}
.strip span i{font-style:normal;color:var(--ac);margin-left:52px}
@keyframes slide{to{transform:translateX(-50%)}}
/* capítulos */
.ch{position:relative;padding:140px 0;border-bottom:1px solid var(--line)}
.ch-head{display:grid;grid-template-columns:200px 1fr;gap:36px;margin-bottom:70px}
.ch-num{font-family:Archivo,sans-serif;font-stretch:68%;font-weight:800;font-size:120px;line-height:.8;color:transparent;-webkit-text-stroke:1px var(--line2)}
.ch-label{color:var(--ac);margin-bottom:22px;display:flex;gap:12px;align-items:center}
.ch-label::before{content:"";width:28px;height:1px;background:currentColor}
.ch h2{font-size:clamp(44px,7vw,108px)}
.ch .intro{max-width:640px;color:#bfc8d1;font-size:19px;margin-top:28px}
.ch.sol .ch-label{color:var(--sol)}
.ch.nar .ch-label{color:var(--nar)}
/* proyecto */
.proj{display:grid;grid-template-columns:1.15fr 1fr;gap:56px;align-items:start}
.frame{position:relative;border:1px solid var(--line2);background:var(--bg3);overflow:hidden;aspect-ratio:16/9}
.frame.wide{aspect-ratio:21/8;margin-bottom:56px}
.frame.wide img{object-position:center 60%}
.portrait{margin-top:36px;border:1px solid var(--line2);overflow:hidden;max-width:380px;aspect-ratio:4/5;background:var(--bg3)}
.portrait img{width:100%;height:100%;object-fit:cover;filter:contrast(1.03)}
.frame img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.7,.2,1)}
.frame:hover img{transform:scale(1.04)}
.frame .corner{position:absolute;left:0;bottom:0;background:rgba(7,9,12,.85);padding:10px 14px;color:var(--ink)}
.frame .fallback{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Archivo,sans-serif;font-stretch:68%;font-weight:800;font-size:64px;text-transform:uppercase;z-index:-1}
.meta-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
.chip{border:1px solid var(--line2);padding:7px 12px;color:var(--muted)}
.chip.live{color:var(--ink)}
.chip.live::before{content:"";display:inline-block;width:7px;height:7px;border-radius:50%;background:#5ed39a;margin-right:8px;vertical-align:1px;box-shadow:0 0 10px #5ed39a}
.chip.soon::before{content:"";display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--nar);margin-right:8px;vertical-align:1px}
.feat{list-style:none;border-top:1px solid var(--line)}
.feat li{display:grid;grid-template-columns:44px 1fr;gap:10px;padding:18px 0;border-bottom:1px solid var(--line)}
.feat li .n{color:var(--dim);padding-top:4px}
.feat li b{display:block;font-weight:600;font-size:17px}
.feat li span{color:var(--muted);font-size:15px}
.proj .side p.say{font-size:22px;line-height:1.45;margin-bottom:28px;color:var(--ink)}
.proj .side .btn{margin-top:30px}
.stat-row{display:grid;grid-template-columns:repeat(3,1fr);margin-top:56px;border-top:1px solid var(--line)}
.stat{padding:26px 26px 0 0}
.stat+.stat{padding-left:26px;border-left:1px solid var(--line)}
.stat .big{font-family:Archivo,sans-serif;font-stretch:68%;font-weight:800;font-size:64px;line-height:1}
.stat p{color:var(--muted);font-size:14px;margin-top:8px}
.note{color:var(--dim);font-size:13px;margin-top:26px}
/* tarjetas */
.grid4{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);border-left:1px solid var(--line)}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line);border-left:1px solid var(--line)}
.grid2{display:grid;grid-template-columns:repeat(2,1fr);border-top:1px solid var(--line);border-left:1px solid var(--line)}
.card{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:34px 30px 38px;position:relative;transition:background .3s;text-decoration:none;display:block}
.card:hover{background:var(--bg2)}
.card .k{color:var(--dim);margin-bottom:46px;display:flex;justify-content:space-between}
.card h3{font-family:Archivo,sans-serif;font-stretch:68%;font-weight:800;text-transform:uppercase;font-size:34px;line-height:.95;margin-bottom:14px}
.card p{color:var(--muted);font-size:15px}
.card ul{list-style:none;margin-top:16px}
.card li{color:#c3ccd5;font-size:14.5px;padding:7px 0;border-top:1px dashed var(--line)}
.card .for{margin-top:18px;color:var(--dim);font-size:13.5px}
.card:has(.arrow){padding-bottom:64px}
.card .arrow{position:absolute;right:26px;bottom:26px;color:var(--ac);transition:transform .25s}
.card:hover .arrow{transform:translate(4px,-4px)}
.ch-foot{display:flex;gap:12px;flex-wrap:wrap;margin-top:50px;align-items:center}
/* manifiesto */
.mani{font-family:Archivo,sans-serif;font-stretch:68%;font-weight:800;text-transform:uppercase;font-size:clamp(40px,6.4vw,96px);line-height:1.04}
.mani .o{color:transparent;-webkit-text-stroke:1.2px var(--ink)}
/* sobre mí */
.about{display:grid;grid-template-columns:1fr 1.2fr;gap:64px}
.about .name{font-size:clamp(56px,8vw,128px)}
.about .role{color:var(--ac);margin-top:16px}
.about p{color:#c0c9d2;margin-bottom:18px;font-size:18px}
.creds{list-style:none;margin-top:28px;border-top:1px solid var(--line)}
.creds li{padding:13px 0;border-bottom:1px solid var(--line);display:flex;gap:16px;color:#d4dbe2;font-size:15.5px}
.creds li .mono{color:var(--dim);min-width:34px;padding-top:2px}
/* contacto */
.contact{display:grid;grid-template-columns:1fr 1.1fr;gap:64px}
.chan{display:block;text-decoration:none;border-top:1px solid var(--line);padding:22px 0;transition:padding .25s}
.chan:last-child{border-bottom:1px solid var(--line)}
.chan:hover{padding-left:12px}
.chan .mono{color:var(--dim)}
.chan b{display:block;font-size:22px;font-weight:600;margin-top:4px}
form.cf{display:grid;gap:16px}
.cf label{display:grid;gap:8px}
.cf label span{font-family:"JetBrains Mono",monospace;font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.cf input,.cf select,.cf textarea{background:transparent;border:0;border-bottom:1px solid var(--line2);color:var(--ink);font:inherit;padding:10px 0;outline:none;border-radius:0}
.cf select option{background:var(--bg2)}
.cf input:focus,.cf select:focus,.cf textarea:focus{border-color:var(--ac)}
.cf textarea{min-height:110px;resize:vertical}
.cf .two{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.cf .btn{justify-self:start;margin-top:10px}
.ok{display:none;border:1px solid var(--ac);padding:26px;color:var(--ink)}
/* pie */
footer{padding:60px 0 120px;color:var(--dim);font-size:14px}
footer .wrap{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}
footer a{color:var(--muted)}
.bigword{font-family:Archivo,sans-serif;font-stretch:68%;font-weight:800;text-transform:uppercase;font-size:clamp(90px,21vw,340px);line-height:.8;color:transparent;-webkit-text-stroke:1px var(--line2);text-align:center;padding-top:60px;user-select:none;letter-spacing:-.01em}
/* barra de estado inferior */
.status{position:fixed;left:var(--rail);right:0;bottom:0;z-index:45;display:flex;align-items:center;gap:26px;padding:14px 36px;background:rgba(7,9,12,.85);backdrop-filter:blur(10px);border-top:1px solid var(--line)}
.status .cur{min-width:210px;color:var(--ink)}
.status .cur b{color:var(--ac);font-weight:500;margin-right:10px}
.segs{flex:1;display:flex;gap:6px}
.segs a{flex:1;height:3px;background:var(--line2);position:relative;cursor:pointer}
.segs a::after{content:"";position:absolute;inset:0;background:var(--ac);transform:scaleX(0);transform-origin:left;transition:transform .5s}
.segs a.done::after{transform:scaleX(1)}
.segs a.now::after{transform:scaleX(1);box-shadow:0 0 10px var(--ac)}
.segs a:hover{background:var(--muted)}
.status .scroll{color:var(--muted)}
.wa{position:fixed;right:24px;bottom:70px;z-index:60;width:54px;height:54px;border-radius:50%;background:#25d366;color:#04140a;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px -8px rgba(37,211,102,.6);transition:transform .2s}
.wa:hover{transform:scale(1.07)}
.wa svg{width:26px;height:26px}
/* cursor */
.cur-dot,.cur-ring{position:fixed;top:0;left:0;pointer-events:none;z-index:200;border-radius:50%;opacity:0;transition:opacity .3s}
.cur-dot{width:8px;height:8px;margin:-4px 0 0 -4px;background:var(--ac);box-shadow:0 0 12px var(--ac)}
.cur-ring{width:36px;height:36px;margin:-18px 0 0 -18px;border:1px solid rgba(60,198,234,.55);transition:opacity .3s,width .25s,height .25s,margin .25s,background .25s,border-color .25s}
.cur-ring.hot{width:64px;height:64px;margin:-32px 0 0 -32px;background:rgba(60,198,234,.1);border-color:var(--ac)}
.has-cursor .cur-dot,.has-cursor .cur-ring{opacity:1}
@media (pointer:fine){.has-cursor,.has-cursor a,.has-cursor button{cursor:none}.has-cursor input,.has-cursor textarea,.has-cursor select{cursor:auto}}
/* revelado */
.rv{opacity:0;transform:translateY(34px);transition:opacity 1s cubic-bezier(.2,.7,.2,1),transform 1s cubic-bezier(.2,.7,.2,1)}
.rv.in{opacity:1;transform:none}
.rv.d1{transition-delay:.1s}.rv.d2{transition-delay:.2s}.rv.d3{transition-delay:.3s}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv{opacity:1;transform:none}}
/* responsive */
@media (max-width:1000px){
  .proj,.about,.contact{grid-template-columns:1fr;gap:40px}
  .grid4{grid-template-columns:1fr 1fr}
  .grid3{grid-template-columns:1fr}
  .ch-head{grid-template-columns:1fr;gap:10px}
  .ch-num{font-size:72px}
}
@media (max-width:760px){
  :root{--rail:0px}
  .rail{display:none}
  .top{padding:12px 18px}
  .top .logo img{height:32px}
  .burger{display:block}
  .top nav{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:flex-start;gap:0;background:var(--bg);border-bottom:1px solid var(--line);padding:6px 18px 18px}
  .top nav.open{display:flex}
  .top nav a{padding:12px 0;width:100%;border-bottom:1px solid var(--line)}
  .top nav a.cta{margin-top:12px;text-align:center;border:0}
  .wrap{padding:0 20px}
  .hero .inner{padding:0 20px 110px}
  .hero .photo{bottom:auto;height:64%}
  .hero .photo img{object-position:72% center}
  .hero .photo::after{background:linear-gradient(180deg,rgba(7,9,12,.45) 0%,transparent 30%,transparent 50%,var(--bg) 100%)}
  .hero .kick span{display:none}
  .hero .inner{padding-top:100px}
  .ch{padding:90px 0}
  .ch-head{margin-bottom:44px}
  .grid4,.grid2{grid-template-columns:1fr}
  .stat-row{grid-template-columns:1fr}
  .stat+.stat{padding-left:0;border-left:0;border-top:1px solid var(--line)}
  .stat{padding:20px 0}
  .cf .two{grid-template-columns:1fr}
  .status{padding:12px 20px;gap:14px}
  .status .cur{min-width:0;font-size:10.5px}
  .status .scroll{display:none}
  .wa{bottom:64px;right:16px;width:50px;height:50px}
}
`;

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">`;

const WA_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg>`;

/* Script compartido: menú, barra superior, revelado, capítulos y formulario */
const SHARED_JS = `
(function(){
  var top=document.querySelector(".top");
  function onScroll(){ top.classList.toggle("solid", window.scrollY>40); }
  window.addEventListener("scroll", onScroll, {passive:true}); onScroll();
  var b=document.getElementById("burger"), n=document.getElementById("nav");
  if(b){ b.addEventListener("click", function(){ var o=n.classList.toggle("open"); b.setAttribute("aria-expanded", o?"true":"false"); });
    n.addEventListener("click", function(e){ if(e.target.tagName==="A"){ n.classList.remove("open"); b.setAttribute("aria-expanded","false"); } }); }
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }); }, {threshold:.12});
  document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });
  var secs=[].slice.call(document.querySelectorAll("[data-ch]"));
  var segs=document.getElementById("segs"), cur=document.getElementById("cur");
  secs.forEach(function(s){ var a=document.createElement("a"); a.href="#"+s.id; a.setAttribute("aria-label", s.getAttribute("data-ch")+" "+s.getAttribute("data-name")); segs.appendChild(a); });
  var links=[].slice.call(segs.children);
  function upd(){
    var y=window.scrollY+window.innerHeight*.45, k=0;
    secs.forEach(function(s,i){ if(s.offsetTop<=y) k=i; });
    links.forEach(function(a,i){ a.className = i<k ? "done" : (i===k ? "now" : ""); });
    var s=secs[k]; cur.innerHTML="<b>"+s.getAttribute("data-ch")+"</b>"+s.getAttribute("data-name");
    document.querySelectorAll(".top nav a[data-sec]").forEach(function(a){ a.classList.toggle("on", a.getAttribute("data-sec")===s.id); });
  }
  window.addEventListener("scroll", upd, {passive:true}); window.addEventListener("resize", upd); upd();
  document.querySelectorAll(".frame img").forEach(function(im){ im.addEventListener("error", function(){ im.style.display="none"; }); });
  if(window.matchMedia("(pointer:fine)").matches && !window.matchMedia("(prefers-reduced-motion:reduce)").matches){
    var d=document.getElementById("cdot"), r=document.getElementById("cring"), mx=-100, my=-100, rx=-100, ry=-100;
    document.addEventListener("mousemove", function(e){ mx=e.clientX; my=e.clientY; document.body.classList.add("has-cursor"); d.style.transform="translate("+mx+"px,"+my+"px)"; });
    document.addEventListener("mouseleave", function(){ document.body.classList.remove("has-cursor"); });
    document.addEventListener("mouseover", function(e){ r.classList.toggle("hot", !!e.target.closest("a,button,select,.card")); });
    (function loop(){ rx+=(mx-rx)*.18; ry+=(my-ry)*.18; r.style.transform="translate("+rx+"px,"+ry+"px)"; requestAnimationFrame(loop); })();
  }
  var f=document.getElementById("contacto-form");
  if(f) f.addEventListener("submit", async function(e){
    e.preventDefault();
    var data=Object.fromEntries(new FormData(this));
    try{ await fetch("/api/contacto",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}); }catch(err){}
    this.style.display="none"; document.getElementById("ok").style.display="block";
  });
})();
`;

function shell(o: { title: string; desc: string; nav: string; body: string; extraJs?: string; path: string }) {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${o.title}</title>
<meta name="description" content="${o.desc}">
<meta property="og:title" content="${o.title}">
<meta property="og:description" content="${o.desc}">
<meta property="og:url" content="https://oatech.com.co${o.path}">
<meta property="og:type" content="website">
<link rel="canonical" href="https://oatech.com.co${o.path}">
<link rel="icon" type="image/png" href="${BRAND}/favicon.png">
<link rel="apple-touch-icon" href="${BRAND}/apple-touch-icon.png">
<meta name="theme-color" content="#07090c">
${FONTS}
<style>${CSS}</style>
</head>
<body>
<aside class="rail" aria-hidden="true">
  <span class="dot"></span>
  <span class="v word">OA TECH</span>
  <span class="v mono est">Bogotá · Colombia</span>
</aside>
<header class="top">
  <a class="logo" href="/" aria-label="OA Tech, inicio"><img src="${BRAND}/logo-oscuro.webp" alt="OA Tech" width="150" height="40"></a>
  <button class="burger mono" id="burger" type="button" aria-expanded="false" aria-controls="nav">Menú</button>
  <nav class="mono" id="nav">${o.nav}</nav>
</header>
<main>
${o.body}
</main>
<div class="status mono" aria-hidden="false">
  <span class="cur" id="cur"></span>
  <div class="segs" id="segs" aria-label="Capítulos"></div>
  <span class="scroll">Desliza ↓</span>
</div>
<div class="cur-ring" id="cring" aria-hidden="true"></div><div class="cur-dot" id="cdot" aria-hidden="true"></div>
<a class="wa" href="${WA}" target="_blank" rel="noopener" aria-label="Escríbeme por WhatsApp">${WA_ICON}</a>
<script>${SHARED_JS}${o.extraJs || ""}</script>
</body>
</html>`;
}

function contactBlock(opts: string, heading: string, intro: string, num: string) {
  return `
<section class="ch" id="contacto" data-ch="${num}" data-name="Contacto">
  <div class="wrap">
    <div class="ch-head">
      <div class="ch-num rv">${num}</div>
      <div>
        <div class="ch-label mono rv">Contacto</div>
        <h2 class="disp rv d1">${heading}</h2>
        <p class="intro rv d2">${intro}</p>
      </div>
    </div>
    <div class="contact">
      <div class="rv">
        <a class="chan" href="${WA}" target="_blank" rel="noopener"><span class="mono">WhatsApp</span><b>Escríbeme por WhatsApp →</b></a>
        <a class="chan" href="mailto:contacto@oatech.com.co"><span class="mono">Correo</span><b>contacto@oatech.com.co</b></a>
        <a class="chan" href="https://www.linkedin.com/in/osvaldo-aguilar-pharma" target="_blank" rel="noopener"><span class="mono">LinkedIn</span><b>Osvaldo Aguilar →</b></a>
      </div>
      <div class="rv d1">
        <form class="cf" id="contacto-form">
          <div class="two">
            <label><span>Nombre</span><input name="nombre" required maxlength="120" autocomplete="name"></label>
            <label><span>Empresa u organización</span><input name="empresa" maxlength="160" autocomplete="organization"></label>
          </div>
          <label><span>Correo</span><input type="email" name="email" required maxlength="200" autocomplete="email"></label>
          <label><span>¿Sobre qué quieres hablar?</span>
            <select name="servicio" required><option value="">Elige una opción</option>${opts}</select></label>
          <label><span>Mensaje</span><textarea name="mensaje" maxlength="3000"></textarea></label>
          <button class="btn" type="submit">Enviar mensaje →</button>
          <p class="note" style="margin-top:0">Tus datos se tratan conforme a la Ley 1581 de 2012. Te respondo en menos de 24 horas hábiles.</p>
        </form>
        <div class="ok" id="ok">¡Gracias! Recibí tu mensaje y te responderé muy pronto.</div>
      </div>
    </div>
  </div>
</section>`;
}

/* ───────────────────────── Página de inicio ───────────────────────── */
const HOME_NAV = `
<a href="#proyectos" data-sec="clarito">Proyectos</a>
<a href="/farma">Salud y farma</a>
<a href="#sobre-mi" data-sec="sobre-mi">Sobre mí</a>
<a href="#contacto" class="cta">Conversemos</a>`;

const HOME_BODY = `
<section class="hero" id="inicio" data-ch="00" data-name="OA Tech">
  <div class="glow" aria-hidden="true"></div>
  <div class="photo" aria-hidden="true"><img src="${F("hero")}" alt="" fetchpriority="high"></div>
  <div class="inner">
    <div class="kick mono rv"><b>OA Tech</b><span>Estudio de productos digitales · Hecho en Colombia</span></div>
    <h1 class="disp rv d1">Tecnología<span class="l2">que acompaña.</span></h1>
    <div class="row">
      <p class="lead rv d2">Diseño y construyo apps que ayudan a personas reales en su día a día: niños que necesitan ver su día claro, mayores que quieren seguir haciendo las cosas a su manera y pacientes que necesitan seguir su tratamiento.</p>
      <div class="ctas rv d3">
        <a class="btn" href="#proyectos">Ver proyectos ↓</a>
        <a class="btn ghost" href="#contacto">Conversemos</a>
      </div>
    </div>
  </div>
</section>

<div class="strip" aria-hidden="true"><div class="t">
  <span>Clarito<i>✦</i></span><span>Acompañapp<i>✦</i></span><span>DonVital<i>✦</i></span><span>Datos e IA para salud<i>✦</i></span><span>Hecho en Colombia<i>✦</i></span>
  <span>Clarito<i>✦</i></span><span>Acompañapp<i>✦</i></span><span>DonVital<i>✦</i></span><span>Datos e IA para salud<i>✦</i></span><span>Hecho en Colombia<i>✦</i></span>
</div></div>

<div id="proyectos"></div>
<section class="ch sol" id="clarito" data-ch="01" data-name="Clarito">
  <div class="wrap">
    <div class="ch-head">
      <div class="ch-num rv">01</div>
      <div>
        <div class="ch-label mono rv">Clarito · Niños con autismo, TDAH o discapacidad intelectual</div>
        <h2 class="disp rv d1">Su día,<br>paso a paso.</h2>
        <p class="intro rv d2">Para muchos niños el día se siente como un montón de cosas que no saben cuándo vienen. Clarito se lo muestra con dibujos y voz, y a la familia le deja acompañarlo desde el celular, aunque no esté a su lado.</p>
      </div>
    </div>
    <div class="proj">
      <div class="rv">
        <a class="frame" href="${CLARITO}" target="_blank" rel="noopener" style="display:block">
          <div class="fallback" style="color:var(--sol)">Clarito.</div>
          <img src="${F("clarito")}" alt="Niño revisando su rutina de la mañana en Clarito mientras su mamá lo mira desde la puerta" loading="lazy">
          <span class="corner mono">clarito.oatech.com.co ↗</span>
        </a>
        <div class="meta-row mono"><span class="chip live">Piloto gratuito</span><span class="chip">Familias en Colombia</span><span class="chip">Colegios · Terapeutas</span></div>
      </div>
      <div class="side rv d1">
        <ul class="feat">
          <li><span class="n mono">01</span><div><b>Rutinas paso a paso</b><span>Dibujo grande y voz en cada paso. No necesita saber leer.</span></div></li>
          <li><span class="n mono">02</span><div><b>Primero / Después y reloj visual</b><span>Los cambios dejan de ser sorpresa; esperar deja de angustiar.</span></div></li>
          <li><span class="n mono">03</span><div><b>Rincón de calma y tarjetas «Quiero…»</b><span>Pide ayuda aunque le cueste hablar, con aviso a la familia.</span></div></li>
          <li><span class="n mono">04</span><div><b>La familia acompaña</b><span>Mamá, papá y abuelos ven su día; resumen semanal para el terapeuta.</span></div></li>
        </ul>
        <a class="btn sol" href="${CLARITO}" target="_blank" rel="noopener">Conocer Clarito →</a>
      </div>
    </div>
    <div class="stat-row">
      <div class="stat rv"><div class="big" style="color:var(--sol)">10<span style="font-size:.5em;color:var(--muted)"> de 28</span></div><p>prácticas basadas en evidencia para autismo (NCAEP, 2020) reunidas en una sola app.</p></div>
      <div class="stat rv d1"><div class="big">14</div><p>actividades cortas con principio y fin para jugar y saber cuándo parar.</p></div>
      <div class="stat rv d2"><div class="big">1</div><p>panel para colegios: agenda del salón, cambios anticipados y PIAR con evidencia.</p></div>
    </div>
    <p class="note">Clarito es un apoyo para el día a día: no reemplaza la terapia ni el acompañamiento profesional.</p>
  </div>
</section>

<section class="ch nar" id="acompanapp" data-ch="02" data-name="Acompañapp">
  <div class="wrap">
    <div class="ch-head">
      <div class="ch-num rv">02</div>
      <div>
        <div class="ch-label mono rv">Acompañapp · Personas mayores</div>
        <h2 class="disp rv d1">Que sigan haciendo<br>las cosas a su manera.</h2>
        <p class="intro rv d2">A veces tu mamá solo necesita una pequeña ayuda para organizar su día y recordar algunas cosas. Acompañapp vive en su propio celular, con botones grandes y voz: nada que aprender.</p>
      </div>
    </div>
    <div class="proj">
      <div class="side rv">
        <p class="say">«No se trata de estar pendientes de todo. Se trata de que ellos puedan hacer más cosas por sí mismos.»</p>
        <ul class="feat">
          <li><span class="n mono">01</span><div><b>Le recuerda su día</b><span>Citas, medicamentos y lo importante de su rutina.</span></div></li>
          <li><span class="n mono">02</span><div><b>Sus personas, a un toque</b><span>Llama a su familia sin buscar números.</span></div></li>
          <li><span class="n mono">03</span><div><b>Le lee en voz alta</b><span>Lecturas, noticias tranquilas y temas que disfruta.</span></div></li>
          <li><span class="n mono">04</span><div><b>¿Dónde dejé mis gafas?</b><span>Le ayuda a recordar dónde quedaron sus cosas.</span></div></li>
        </ul>
        <a class="btn nar" href="${ACOMPANAPP}" target="_blank" rel="noopener">Conocer Acompañapp →</a>
      </div>
      <div class="rv d1">
        <a class="frame" href="${ACOMPANAPP}" target="_blank" rel="noopener" style="display:block">
          <div class="fallback" style="color:var(--nar)">Acompañapp</div>
          <img src="${F("acompanapp")}" alt="Señora mayor usando Acompañapp en su cocina, con su pastillero y sus gafas sobre la mesa" loading="lazy">
          <span class="corner mono">acompanapp.com ↗</span>
        </a>
        <div class="meta-row mono"><span class="chip soon">Muy pronto</span><span class="chip">Lista de espera abierta</span></div>
        <p class="note">Acompañapp es una ayuda para el día a día. No es un sistema de emergencias ni reemplaza el cuidado profesional.</p>
      </div>
    </div>
  </div>
</section>

<section class="ch" id="farma" data-ch="03" data-name="Salud y farma">
  <div class="wrap">
    <div class="ch-head">
      <div class="ch-num rv">03</div>
      <div>
        <div class="ch-label mono rv">Salud y farma · El origen</div>
        <h2 class="disp rv d1">30 años dentro de<br>la industria farmacéutica.</h2>
        <p class="intro rv d2">De ahí viene el método: datos en los que todos confían, respeto por la información de salud y tecnología que se usa de verdad. Hoy sigo ayudando a laboratorios, distribuidores y programas de pacientes de Latinoamérica.</p>
      </div>
    </div>
    <a class="frame wide rv" href="/farma" style="display:block"><img src="${F("farma")}" alt="Línea de empaque farmacéutica con datos superpuestos" loading="lazy"><span class="corner mono">Capítulo Salud y farma ↗</span></a>
    <div class="grid4">
      <a class="card rv" href="/farma#una-sola-verdad"><div class="k mono"><span>A</span><span>Datos</span></div><h3>Una sola verdad</h3><p>CRM, SAP y bases externas en un solo modelo con KPIs oficiales, listo para tableros e IA.</p><span class="arrow">↗</span></a>
      <a class="card rv d1" href="/farma#rotacion-adherencia"><div class="k mono"><span>B</span><span>IA predictiva</span></div><h3>Rotación y adherencia</h3><p>Una cifra oficial y modelos que anticipan abandonos y cuánto fabricar.</p><span class="arrow">↗</span></a>
      <a class="card rv d2" href="/farma#donvital"><div class="k mono"><span>C</span><span>App</span></div><h3>DonVital</h3><p>La app del paciente que mide la adherencia real: la que se toma, no la que se compra.</p><span class="arrow">↗</span></a>
      <a class="card rv d3" href="/farma#salud"><div class="k mono"><span>D</span><span>Operación</span></div><h3>Veeva y transparencia</h3><p>Administración de Veeva CRM y reporte de transferencias de valor (Res. 2881).</p><span class="arrow">↗</span></a>
    </div>
    <div class="ch-foot rv">
      <a class="btn" href="/farma">Entrar al capítulo Salud y farma →</a>
      <a class="btn ghost" href="${DEMO}" target="_blank" rel="noopener">Ver la demo interactiva</a>
    </div>
  </div>
</section>

<section class="ch" id="principios" data-ch="04" data-name="Cómo trabajo">
  <div class="wrap">
    <div class="ch-head">
      <div class="ch-num rv">04</div>
      <div><div class="ch-label mono rv">Cómo trabajo</div></div>
    </div>
    <p class="mani rv">Primero la persona.<br><span class="o">Después la herramienta.</span></p>
    <div class="grid3" style="margin-top:70px">
      <div class="card rv"><div class="k mono"><span>01</span></div><h3>Con quien lo usa</h3><p>Cada producto nace de una familia, un paciente o un equipo real, y se prueba con ellos antes de crecer.</p></div>
      <div class="card rv d1"><div class="k mono"><span>02</span></div><h3>Con evidencia</h3><p>Prácticas clínicas validadas, datos con definiciones claras y cifras que se pueden explicar.</p></div>
      <div class="card rv d2"><div class="k mono"><span>03</span></div><h3>Con cuidado</h3><p>Información de salud y de familias tratada con respeto y conforme a la Ley 1581 de 2012.</p></div>
    </div>
  </div>
</section>

<section class="ch" id="sobre-mi" data-ch="05" data-name="Sobre mí">
  <div class="wrap">
    <div class="about">
      <div>
        <div class="ch-label mono rv">Sobre mí</div>
        <h2 class="disp name rv d1">Osvaldo<br>Aguilar</h2>
        <div class="role mono rv d2">Ingeniero de sistemas · Fundador de OA Tech</div>
        <div class="portrait rv d3"><img src="${F("osvaldo")}" alt="Osvaldo Aguilar, fundador de OA Tech" loading="lazy"></div>
      </div>
      <div>
        <p class="rv">Pasé 30 años liderando tecnología y transformación digital en una multinacional farmacéutica francesa: plataformas de visita médica, analítica de pacientes, cadena de suministro y presupuestos en Latinoamérica.</p>
        <p class="rv d1">Hoy pongo esa experiencia al servicio de productos propios que resuelven problemas cotidianos de familias, cuidadores y pacientes, y sigo acompañando a empresas de salud que quieren decidir con datos.</p>
        <ul class="creds rv d2">
          <li><span class="mono">01</span>30 años en tecnología y transformación digital</li>
          <li><span class="mono">02</span>Creador de Clarito, Acompañapp y DonVital</li>
          <li><span class="mono">03</span>Python, R e inteligencia artificial aplicada</li>
          <li><span class="mono">04</span>Administrador certificado de Veeva</li>
          <li><span class="mono">05</span>Cursos certificados en IA: Cloudera y O'Reilly</li>
          <li><span class="mono">06</span>Español nativo · Inglés avanzado</li>
        </ul>
      </div>
    </div>
  </div>
</section>
${contactBlock(
  `<option>Clarito (niños con TEA / TDAH)</option><option>Acompañapp (personas mayores)</option><option>Datos e IA para salud y farma</option><option>App del paciente (DonVital)</option><option>Veeva y CRM</option><option>Reporte de transparencia</option><option>Alianza o proyecto nuevo</option><option>Otro</option>`,
  "Hablemos.",
  "Si eres una familia, un terapeuta, un colegio, una fundación o una empresa de salud, escríbeme. Te respondo personalmente.",
  "06"
)}
<div class="bigword" aria-hidden="true">OA Tech</div>
<footer>
  <div class="wrap">
    <div>© 2026 OA Tech · Hecho en Colombia</div>
    <div><a href="${CLARITO}">Clarito</a> · <a href="${ACOMPANAPP}">Acompañapp</a> · <a href="/farma">Salud y farma</a> · <a href="https://decide.oatech.com.co">¿IA para tu empresa?</a></div>
  </div>
</footer>`;

/* Redirige enlaces viejos (oatech.com.co/#casos, etc.) a la subpágina farma */
const HOME_JS = `
(function(){
  var old=["una-sola-verdad","rotacion-adherencia","servicios","casos","salud","transparencia","diagnostico","donvital"];
  var h=(location.hash||"").slice(1);
  if(old.indexOf(h)>-1) location.replace("/farma#"+h);
})();`;

const HOME = shell({
  title: "OA Tech · Tecnología que acompaña",
  desc: "OA Tech diseña apps que acompañan a personas reales: Clarito para niños con autismo y TDAH, Acompañapp para personas mayores, y datos e IA para la industria de la salud.",
  nav: HOME_NAV,
  body: HOME_BODY,
  extraJs: HOME_JS,
  path: "/",
});

/* ───────────────────────── Subpágina Salud y farma ───────────────────────── */
const FARMA_NAV = `
<a href="/">← Inicio</a>
<a href="#una-sola-verdad" data-sec="una-sola-verdad">Una sola verdad</a>
<a href="#rotacion-adherencia" data-sec="rotacion-adherencia">Rotación y adherencia</a>
<a href="#servicios" data-sec="servicios">Servicios</a>
<a href="#casos" data-sec="casos">Casos</a>
<a href="#contacto" class="cta">Diagnóstico gratis</a>`;

const FCSS = `<style>
.fhero{position:relative;min-height:100vh;min-height:100svh;display:flex;align-items:flex-end;overflow:hidden;border-bottom:1px solid var(--line)}
.fhero::before{content:"";position:absolute;inset:0;background:radial-gradient(900px 500px at 80% 20%,rgba(60,198,234,.16),transparent 70%),radial-gradient(700px 400px at 0% 100%,rgba(12,80,136,.35),transparent 70%)}
.fhero .fphoto{position:absolute;inset:0}
.fhero .fphoto img{width:100%;height:100%;object-fit:cover;object-position:right center;filter:brightness(.8)}
.fhero .fphoto::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,9,12,.9) 0%,rgba(7,9,12,.4) 50%,transparent 75%),linear-gradient(180deg,rgba(7,9,12,.5),transparent 30%,transparent 60%,var(--bg))}
.fhero .gridbg{position:absolute;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:80px 80px;mask-image:linear-gradient(180deg,#000 20%,transparent 85%);-webkit-mask-image:linear-gradient(180deg,#000 20%,transparent 85%);opacity:.6}
.fhero .inner{position:relative;width:100%;max-width:1400px;margin:0 auto;padding:140px 36px 120px}
.fhero h1{font-size:clamp(56px,10.5vw,170px)}
.fhero h1 .l2{display:block;color:transparent;-webkit-text-stroke:1.5px var(--ink)}
.fhero .row{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;margin-top:34px;flex-wrap:wrap}
.fhero .lead{max-width:600px;color:#c9d1d9;font-size:19px}
.cmp{border-top:1px solid var(--line)}
.cmp .r{display:grid;grid-template-columns:200px 1fr 1fr 1.4fr;gap:20px;padding:20px 0;border-bottom:1px solid var(--line);align-items:baseline}
.cmp .r .mono{color:var(--dim)}
.cmp .bad{font-family:Archivo,sans-serif;font-stretch:68%;font-weight:800;font-size:40px;color:var(--dim);text-decoration:line-through;text-decoration-thickness:2px}
.cmp .good{font-family:Archivo,sans-serif;font-stretch:68%;font-weight:800;font-size:40px;color:var(--ac)}
.cmp .what{color:var(--muted);font-size:15px}
.figs{display:grid;grid-template-columns:1fr 1fr;gap:0;border-top:1px solid var(--line);border-left:1px solid var(--line)}
.fig{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:30px}
.fig h3{font-family:Archivo,sans-serif;font-stretch:68%;font-weight:800;text-transform:uppercase;font-size:30px;margin:6px 0 20px}
.bars{display:grid;gap:10px}
.bar{display:grid;grid-template-columns:110px 1fr 70px;gap:12px;align-items:center;font-size:14px;color:var(--muted)}
.bar i{display:block;height:6px;background:var(--line2);position:relative}
.bar i b{position:absolute;left:0;top:0;bottom:0;background:var(--muted)}
.bar.off{color:var(--ink);font-weight:600}
.bar.off i b{background:var(--ac);box-shadow:0 0 12px var(--ac)}
.bar span:last-child{text-align:right;font-family:"JetBrains Mono",monospace}
.fig .def{color:var(--dim);font-size:13.5px;margin-top:16px}
.steps{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line)}
.steps div{padding:26px 24px 10px 0}
.steps div+div{padding-left:24px;border-left:1px solid var(--line)}
.steps .disp{font-size:56px;color:var(--ac)}
.steps b{display:block;margin:10px 0 6px;font-size:18px}
.steps p{color:var(--muted);font-size:15px}
.legal{color:var(--dim);font-size:13px;margin-top:20px}
@media (max-width:1000px){.cmp .r{grid-template-columns:1fr 1fr}.cmp .what{grid-column:1/-1}.figs{grid-template-columns:1fr}.steps{grid-template-columns:1fr 1fr}.steps div:nth-child(3){padding-left:0;border-left:0}}
@media (max-width:760px){.fhero .inner{padding:120px 20px 110px}.steps{grid-template-columns:1fr}.steps div+div{padding-left:0;border-left:0;border-top:1px solid var(--line)}.bar{grid-template-columns:90px 1fr 56px}}
</style>`;

function bar(label: string, val: string, pct: number, official = false) {
  return `<div class="bar${official ? " off" : ""}"><span>${label}</span><i><b style="width:${pct}%"></b></i><span>${val}</span></div>`;
}

const FARMA_BODY = `${FCSS}
<section class="fhero" id="inicio" data-ch="00" data-name="Salud y farma">
  <div class="fphoto" aria-hidden="true"><img src="${F("farma")}" alt="" fetchpriority="high"></div>
  <div class="gridbg" aria-hidden="true"></div>
  <div class="inner">
    <div class="kick mono rv" style="display:flex;gap:14px;color:var(--muted);margin-bottom:22px"><b class="ac" style="font-weight:500">Capítulo · Salud y farma</b><span>Datos e IA para laboratorios, distribuidores y programas de pacientes</span></div>
    <h1 class="disp rv d1">Cifras en las que<span class="l2">todos confían.</span></h1>
    <div class="row">
      <p class="lead rv d2">30 años liderando proyectos digitales en una multinacional farmacéutica. Hoy ayudo a laboratorios, distribuidores y programas de pacientes de Latinoamérica a tener una sola verdad en sus datos y a decidir con modelos predictivos.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap" class="rv d3">
        <a class="btn" href="#contacto">Diagnóstico gratis de 30 min</a>
        <a class="btn ghost" href="${DEMO}" target="_blank" rel="noopener">Ver la demo interactiva</a>
      </div>
    </div>
  </div>
</section>

<section class="ch" id="una-sola-verdad" data-ch="01" data-name="Una sola verdad">
  <div class="wrap">
    <div class="ch-head">
      <div class="ch-num rv">01</div>
      <div>
        <div class="ch-label mono rv">Servicio estrella</div>
        <h2 class="disp rv d1">Del caos de datos<br>a una sola verdad.</h2>
        <p class="intro rv d2">En muchos laboratorios, ventas, finanzas y marketing llegan al comité con números distintos, porque el CRM, SAP, Concur y las bases externas no se hablan. Unifico tus datos comerciales en un solo modelo con definiciones oficiales, listo para tableros, reporte de transparencia y agentes de IA.</p>
      </div>
    </div>
    <div class="grid3">
      <div class="card rv"><div class="k mono"><span>Síntoma 01</span></div><h3>Tres áreas, tres cifras</h3><p>Cada equipo calcula ventas, cobertura o inversión con su propia regla.</p></div>
      <div class="card rv d1"><div class="k mono"><span>Síntoma 02</span></div><h3>Médicos duplicados</h3><p>El mismo profesional aparece con distintos IDs y los gastos no cuadran con las visitas.</p></div>
      <div class="card rv d2"><div class="k mono"><span>Síntoma 03</span></div><h3>Reportes a mano</h3><p>Semanas cruzando Excel para el comité o para el reporte de transparencia.</p></div>
    </div>
    <div class="grid3" style="border-top:0">
      <div class="card rv"><div class="k mono"><span>Paso 1</span><span>2 a 3 semanas</span></div><h3>Diagnóstico de datos</h3><p>Inventario de fuentes, mapa de definiciones en conflicto y hoja de ruta priorizada.</p></div>
      <div class="card rv d1"><div class="k mono"><span>Paso 2</span><span>6 a 8 semanas</span></div><h3>Piloto comercial</h3><p>CRM + SAP + base externa en capas bronce, plata y oro: registro único de médicos, KPIs oficiales y tablero.</p></div>
      <div class="card rv d2"><div class="k mono"><span>Paso 3</span><span>Continuo</span></div><h3>Gobierno y escala</h3><p>Dueños de datos, reglas de calidad, transparencia automatizada, asistente de IA e IA predictiva.</p></div>
    </div>
    <div style="margin-top:90px">
      <p class="mani rv" style="font-size:clamp(34px,4.6vw,68px)">La metadata es el nuevo dato.<br><span class="o">Sin definiciones, la IA responde rápido, segura… y mal.</span></p>
      <p class="intro rv d1" style="margin:24px 0 40px">La misma pregunta a una IA, sin y con metadata (ejemplo con datos ficticios):</p>
      <div class="cmp rv d2">
        <div class="r"><span class="mono">Visita médica</span><span class="bad">566</span><span class="good">256</span><span class="what">médicos visitados en el trimestre</span></div>
        <div class="r"><span class="mono">Finanzas</span><span class="bad">$6.515 M</span><span class="good">$5.915 M</span><span class="what">ventas del trimestre</span></div>
        <div class="r"><span class="mono">Marketing</span><span class="bad">$5.634 M</span><span class="good">$5.183 M</span><span class="what">ventas de productos promocionados</span></div>
        <div class="r"><span class="mono">Cumplimiento</span><span class="bad">$300,7 M</span><span class="good">$277,8 M</span><span class="what">inversión en profesionales de la salud</span></div>
      </div>
      <div class="ch-foot rv"><a class="btn" href="${DEMO}" target="_blank" rel="noopener">Ver la demo interactiva ↗</a><a class="btn ghost" href="#contacto">Agendar diagnóstico</a></div>
      <p class="note">La demo usa un laboratorio ficticio con datos 100% generados por algoritmo.</p>
    </div>
  </div>
</section>

<section class="ch" id="rotacion-adherencia" data-ch="02" data-name="Rotación y adherencia">
  <div class="wrap">
    <div class="ch-head">
      <div class="ch-num rv">02</div>
      <div>
        <div class="ch-label mono rv">Laboratorios y programas de pacientes</div>
        <h2 class="disp rv d1">Las dos cifras que deciden<br>cuánto fabricar.</h2>
        <p class="intro rv d2">Rotación y adherencia son los indicadores más estratégicos de un laboratorio y, a la vez, los que más versiones tienen. Los unifico en una sola cifra oficial y, sobre ella, aplico machine learning para anticipar qué pacientes van a abandonar el tratamiento y cuántas cajas vas a necesitar.</p>
      </div>
    </div>
    <div class="figs">
      <div class="fig rv">
        <span class="mono" style="color:var(--dim)">Rotación · días de inventario en el canal</span>
        <h3>Tres áreas, tres rotaciones</h3>
        <div class="bars">
          ${bar("Ventas", "24 d", 46)}${bar("Supply chain", "33 d", 63)}${bar("Distribuidor", "52 d", 100)}${bar("✓ Oficial", "39 d", 75, true)}
        </div>
        <p class="def">Inventario disponible en el canal ÷ sell-out diario de 90 días, en unidades homologadas y con un solo código de producto.</p>
      </div>
      <div class="fig rv d1">
        <span class="mono" style="color:var(--dim)">Adherencia terapéutica</span>
        <h3>Cinco áreas, cinco adherencias</h3>
        <div class="bars">
          ${bar("Paciente", "94,6 %", 94.6)}${bar("Ventas", "90,5 %", 90.5)}${bar("Médico", "75,2 %", 75.2)}${bar("Marketing", "68,3 %", 68.3)}${bar("Supply", "50,4 %", 50.4)}${bar("✓ Oficial", "62 %", 62, true)}
        </div>
        <p class="def">Pacientes con al menos 80 % de los días cubiertos en sus primeros 180 días, incluidos los que abandonaron.</p>
      </div>
    </div>
    <div class="stat-row">
      <div class="stat rv"><div class="big ac">51 %</div><p>de los abandonos detectados revisando solo al 20 % de los pacientes con más riesgo.</p></div>
      <div class="stat rv d1"><div class="big ac">2,4 %</div><p>de error en el pronóstico de fabricación, frente a 14,1 % del método «año pasado + %».</p></div>
      <div class="stat rv d2"><div class="big">Sin paneles</div><p>Para laboratorios de cualquier tamaño: un QR en la caja y WhatsApp, sin comprar datos de terceros.</p></div>
    </div>
  </div>
</section>

<section class="ch" id="donvital" data-ch="03" data-name="DonVital">
  <div class="wrap">
    <div class="ch-head">
      <div class="ch-num rv">03</div>
      <div>
        <div class="ch-label mono rv">App del paciente · DonVital</div>
        <h2 class="disp rv d1">La adherencia real:<br>la que se toma, no la que se compra.</h2>
        <p class="intro rv d2">El QR dice cuándo compra el paciente. DonVital, la app que el laboratorio o el programa entrega a sus pacientes y cuidadores, dice si se toma cada dosis: recordatorio a la hora, confirmación con un toque, inventario en casa, aviso de reposición y botón de emergencia para el cuidador.</p>
        <p class="note rv d3">Para: laboratorios, operadores de programas de pacientes, IPS y gestores farmacéuticos.</p>
      </div>
    </div>
    <div class="frame wide rv"><img src="${F("donvital")}" alt="Paciente mayor confirmando su dosis en DonVital mientras su hija prepara el desayuno" loading="lazy"><span class="corner mono">DonVital · app del paciente</span></div>
    <div class="stat-row" style="margin-top:0">
      <div class="stat rv"><div class="big">87 % <span class="ac">→ 76 %</span></div><p>días con tabletas en casa frente a días en que realmente se las tomó.</p></div>
      <div class="stat rv d1"><div class="big ac">30 días</div><p>antes avisa el abandono, frente a la alerta por compras.</p></div>
      <div class="stat rv d2"><div class="big">1 toque</div><p>para confirmar cada dosis; el cuidador recibe avisos y tiene un botón de emergencia.</p></div>
    </div>
    <div class="ch-foot rv"><a class="btn" href="${DEMO}" target="_blank" rel="noopener">Ver adherencia + IA en la demo ↗</a><a class="btn ghost" href="#contacto">Agendar diagnóstico</a></div>
    <p class="note">Cifras de la demo, incluida DonVital: laboratorio ficticio con datos 100% generados por algoritmo. Con tus datos, los modelos se entrenan y se validan con tu propia historia.</p>
  </div>
</section>

<section class="ch" id="servicios" data-ch="04" data-name="Servicios">
  <div class="wrap">
    <div class="ch-head">
      <div class="ch-num rv">04</div>
      <div>
        <div class="ch-label mono rv">Servicios</div>
        <h2 class="disp rv d1">Cómo te ayudo.</h2>
        <p class="intro rv d2">Empiezo por entender cómo funciona tu laboratorio. Después elegimos la herramienta, no al revés.</p>
      </div>
    </div>
    <div class="grid3">
      <div class="card rv"><div class="k mono"><span>01</span><span>Datos</span></div><h3>Datos comerciales con una sola verdad</h3><p>CRM, SAP, sell-in, sell-out y bases externas en un solo modelo con definiciones oficiales.</p>
        <ul><li>Registro único de médicos e instituciones</li><li>KPIs oficiales con dueño, fórmula y fuente</li><li>Rotación, adherencia y pronóstico con IA</li><li>Tableros listos para el comité</li></ul>
        <p class="for">Para: gerencias comerciales, de producto, supply chain y finanzas.</p></div>
      <div class="card rv d1"><div class="k mono"><span>02</span><span>Automatización</span></div><h3>Automatización de reportes</h3><p>Elimino las consolidaciones manuales que le quitan días a tu equipo cada mes.</p>
        <ul><li>Reporte de transparencia automatizado</li><li>Informes de ventas y visitas que se generan solos</li><li>Asistentes de IA que responden con tus definiciones</li><li>Documentación para que tu equipo lo mantenga</li></ul>
        <p class="for">Para: cumplimiento, inteligencia de negocios y equipos comerciales.</p></div>
      <div class="card rv d2"><div class="k mono"><span>03</span><span>Equipos</span></div><h3>IA con criterio para equipos farma</h3><p>Talleres prácticos para usar la IA sin exponer información de pacientes ni de médicos.</p>
        <ul><li>Casos reales: marketing, ventas, médica, supply y finanzas</li><li>Qué información nunca compartir: datos de salud y Ley 1581</li><li>Protocolo de uso de IA para tu compañía</li><li>Biblioteca de instrucciones lista para usar</li></ul>
        <p class="for">Para: equipos de 5 a 50 personas.</p></div>
    </div>
  </div>
</section>

<section class="ch" id="casos" data-ch="05" data-name="Casos">
  <div class="wrap">
    <div class="ch-head">
      <div class="ch-num rv">05</div>
      <div>
        <div class="ch-label mono rv">Casos</div>
        <h2 class="disp rv d1">Proyectos reales,<br>lecciones para hoy.</h2>
        <p class="intro rv d2">Algunos de los proyectos en los que trabajé durante mi trayectoria, y cómo los aplico hoy en tu laboratorio.</p>
      </div>
    </div>
    <div class="grid2">
      <div class="card rv"><div class="k mono"><span>Fuerza de ventas</span></div><h3>Visita médica en Latinoamérica</h3><p>Plataforma de visita médica y promoción para la región, con tableros, analítica de la mejor ruta de visitas e informes de gestión.</p><p class="for"><span class="ac">Hoy →</span> tableros de cobertura y frecuencia conectados a tu CRM, con un solo registro de médicos.</p></div>
      <div class="card rv d1"><div class="k mono"><span>Analítica de clientes</span></div><h3>Adherencia terapéutica</h3><p>Analítica sobre datos de mercado de pacientes y prescripciones para entender la tendencia de los pacientes en cada terapia.</p><p class="for"><span class="ac">Hoy →</span> adherencia con una sola cifra, riesgo de abandono con IA y la app DonVital.</p></div>
      <div class="card rv"><div class="k mono"><span>Cadena de suministro</span></div><h3>Planeación S&amp;OP</h3><p>Analítica profunda y predictiva para anticipar y evitar quiebres en la cadena de suministro.</p><p class="for"><span class="ac">Hoy →</span> rotación en el canal con una sola definición y pronóstico de fabricación con redes neuronales.</p></div>
      <div class="card rv d1"><div class="k mono"><span>Finanzas</span></div><h3>Presupuestador anual</h3><p>Consolidación de la información contable de SAP para construir el presupuesto anual, con variación precio-volumen por producto y familia.</p><p class="for"><span class="ac">Hoy →</span> presupuesto por producto, más rápido de preparar y fácil de explicar.</p></div>
    </div>
    <p class="note">Proyectos en los que trabajé en una multinacional farmacéutica. Se describen de forma general, sin información confidencial.</p>
  </div>
</section>

<section class="ch" id="salud" data-ch="06" data-name="Veeva y transparencia">
  <div class="wrap">
    <div class="ch-head">
      <div class="ch-num rv">06</div>
      <div>
        <div class="ch-label mono rv">Especialidad salud y farma</div>
        <h2 class="disp rv d1">Conozco el sector<br>desde adentro.</h2>
        <p class="intro rv d2">Para laboratorios, distribuidores y empresas de dispositivos médicos: el ciclo comercial, la relación con los profesionales de la salud y las reglas que hay que cumplir.</p>
      </div>
    </div>
    <div class="grid2">
      <div class="card rv"><div class="k mono"><span>CRM</span></div><h3>Veeva y CRM</h3><p>Administración y soporte de tu CRM sin contratar a alguien de tiempo completo.</p>
        <ul><li>Administración y configuración de Veeva CRM</li><li>Soporte a usuarios y fuerza de ventas</li><li>Datos maestros de profesionales e instituciones de salud</li><li>Gestión de eventos médicos y congresos</li><li>Reportes y tableros con Python y R</li></ul></div>
      <div class="card rv d1" id="transparencia"><div class="k mono"><span>Res. 2881 de 2018</span></div><h3>Transparencia en Colombia</h3><p>Preparación de tu reporte de transferencias de valor según la Resolución 2881 de 2018 del Ministerio de Salud. Tú nos envías la información y te entregamos el reporte listo para firma y carga.</p>
        <ul><li><b>¿Quién reporta?</b> Fabricantes, importadores, distribuidores y establecimientos farmacéuticos, no solo las multinacionales.</li><li><b>¿Cada cuánto?</b> Dos veces al año; según el calendario habitual, del 1 de enero al 31 de marzo y del 1 de julio al 30 de septiembre.</li><li><b>¿Tus datos?</b> Con acuerdo de confidencialidad y conforme a la Ley 1581 de 2012.</li></ul></div>
    </div>
    <p class="legal">Información de referencia. No reemplaza la asesoría legal de tu empresa.</p>
    <div style="margin-top:90px">
      <div class="ch-label mono rv">Cómo trabajamos</div>
      <div class="steps rv d1">
        <div><span class="disp">01</span><b>Diagnóstico gratis</b><p>30 minutos para entender tu situación, tus sistemas y tus prioridades.</p></div>
        <div><span class="disp">02</span><b>Propuesta</b><p>Alcance, tiempos y precio cerrado. Sin sorpresas.</p></div>
        <div><span class="disp">03</span><b>Ejecución</b><p>Trabajo con tu equipo y avances visibles cada semana.</p></div>
        <div><span class="disp">04</span><b>Acompañamiento</b><p>Seguimiento para asegurar que la solución se use y funcione.</p></div>
      </div>
    </div>
  </div>
</section>
${contactBlock(
  `<option>Una sola verdad (datos comerciales farma)</option><option>Rotación y adherencia con IA predictiva</option><option>App del paciente (DonVital)</option><option>Capacitación en IA para equipos</option><option>Automatización de reportes</option><option>Veeva y CRM</option><option>Reporte de transparencia</option><option>Otro</option>`,
  "Agenda tu<br>diagnóstico gratuito.",
  "30 minutos para entender tu situación y decirte con honestidad si puedo ayudarte.",
  "07"
)}
<div class="bigword" aria-hidden="true">Salud · Farma</div>
<footer>
  <div class="wrap">
    <div>© 2026 OA Tech · <a href="/">Inicio</a> · <a href="https://decide.oatech.com.co">¿IA para tu empresa?</a></div>
    <div>Veeva es una marca registrada de Veeva Systems. OA Tech no está afiliada a Veeva Systems.</div>
  </div>
</footer>`;

const FARMA = shell({
  title: "OA Tech · Salud y farma: datos e IA para laboratorios",
  desc: "Datos e inteligencia artificial para laboratorios, distribuidores y programas de pacientes en Latinoamérica: una sola verdad en tus indicadores, rotación y adherencia con IA predictiva, DonVital, Veeva y reporte de transparencia.",
  nav: FARMA_NAV,
  body: FARMA_BODY,
  path: "/farma",
});

/* ───────────────────────── Servidor ───────────────────────── */
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body, null, 2), { status, headers: { "Content-Type": "application/json" } });
const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
// Imágenes de la firma de correo: guardadas en Postgres (tabla oatech_firma), con caché en memoria.
const firmaCache = new Map<string, { mime: string; datos: Uint8Array }>();
const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const html = (body: string) => new Response(body, { headers: { "Content-Type": "text/html; charset=utf-8" } });

Bun.serve({
  port: Number(Bun.env.PORT || 3000),
  async fetch(req) {
    const url = new URL(req.url);
    const admin = () => ADMIN_KEY && url.searchParams.get("key") === ADMIN_KEY;

    if (url.pathname === "/api/contacto" && req.method === "POST") {
      try {
        const b = (await req.json()) as Record<string, unknown>;
        const nombre = String(b.nombre ?? "").slice(0, 120);
        const empresa = String(b.empresa ?? "").slice(0, 160);
        const email = String(b.email ?? "").slice(0, 200);
        const servicio = String(b.servicio ?? "").slice(0, 80);
        const mensaje = String(b.mensaje ?? "").slice(0, 3000);
        if (!nombre || !validEmail(email)) return json({ ok: false }, 400);
        const sql = await getDb();
        await sql.unsafe(`INSERT INTO oatech_contactos (nombre, empresa, email, servicio, mensaje) VALUES ($1, $2, $3, $4, $5)`, [nombre, empresa, email, servicio, mensaje]);
        console.log("Nuevo contacto OA Tech:", email, servicio);
        return json({ ok: true }, 201);
      } catch (e) {
        console.error("Error guardando contacto:", e);
        return json({ ok: false }, 500);
      }
    }

    if (url.pathname === "/api/diagnostico" && req.method === "POST") {
      try {
        const b = (await req.json()) as Record<string, unknown>;
        const nombre = String(b.nombre ?? "").slice(0, 120);
        const empresa = String(b.empresa ?? "").slice(0, 160);
        const email = String(b.email ?? "").slice(0, 200);
        const puntaje = Math.max(0, Math.min(12, Number(b.puntaje) || 0));
        const nivel = String(b.nivel ?? "").slice(0, 60);
        const respuestas = String(b.respuestas ?? "").slice(0, 1000);
        if (!nombre || !validEmail(email)) return json({ ok: false }, 400);
        const sql = await getDb();
        await sql.unsafe(`INSERT INTO oatech_diagnosticos (nombre, empresa, email, puntaje, nivel, respuestas) VALUES ($1, $2, $3, $4, $5, $6)`, [nombre, empresa, email, puntaje, nivel, respuestas]);
        console.log("Nuevo diagnóstico OA Tech:", email, puntaje, nivel);
        return json({ ok: true }, 201);
      } catch (e) {
        console.error("Error guardando diagnóstico:", e);
        return json({ ok: false }, 500);
      }
    }

    if (url.pathname === "/api/contacto" && req.method === "GET") {
      if (!admin()) return new Response("No autorizado", { status: 401 });
      const sql = await getDb();
      const rows: any[] = await sql.unsafe(`SELECT nombre, empresa, email, servicio, mensaje, fecha FROM oatech_contactos ORDER BY fecha DESC`);
      if (url.searchParams.get("format") === "csv") {
        const csv = "nombre,empresa,email,servicio,mensaje,fecha\n" + rows.map((r) => [r.nombre, r.empresa, r.email, r.servicio, r.mensaje, new Date(r.fecha).toISOString()].map(esc).join(",")).join("\n");
        return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8" } });
      }
      return json(rows);
    }

    if (url.pathname === "/api/diagnostico" && req.method === "GET") {
      if (!admin()) return new Response("No autorizado", { status: 401 });
      const sql = await getDb();
      const rows: any[] = await sql.unsafe(`SELECT nombre, empresa, email, puntaje, nivel, respuestas, fecha FROM oatech_diagnosticos ORDER BY fecha DESC`);
      if (url.searchParams.get("format") === "csv") {
        const csv = "nombre,empresa,email,puntaje,nivel,respuestas,fecha\n" + rows.map((r) => [r.nombre, r.empresa, r.email, r.puntaje, r.nivel, r.respuestas, new Date(r.fecha).toISOString()].map(esc).join(",")).join("\n");
        return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8" } });
      }
      return json(rows);
    }

    if (url.pathname === "/firma/logo.png" || url.pathname === "/firma/foto.jpg") {
      const nombre = url.pathname.slice("/firma/".length);
      try {
        let f = firmaCache.get(nombre);
        if (!f) {
          const sql = await getDb();
          const [r]: any[] = await sql`SELECT mime, datos FROM oatech_firma WHERE nombre = ${nombre}`;
          if (!r) return new Response("No encontrado", { status: 404 });
          f = { mime: r.mime, datos: new Uint8Array(r.datos) };
          firmaCache.set(nombre, f);
        }
        return new Response(f.datos, { headers: { "Content-Type": f.mime, "Cache-Control": "public, max-age=604800" } });
      } catch {
        return new Response("No disponible", { status: 503 });
      }
    }

    if (url.pathname === "/health") return new Response("ok");

    if (url.pathname === "/farma" || url.pathname === "/farma/" || url.pathname === "/salud") return html(FARMA);

    return html(HOME);
  },
});

console.log("Escuchando: oatech-web", Bun.env.PORT || 3000);
