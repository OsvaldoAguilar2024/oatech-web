// OA Tech · Decide: diagnóstico de IA para empresas (decide.oatech.com.co)
const BRAND = "https://oatech-brand-production.up.railway.app";
const PHOTO = "https://oatech-assets.up.railway.app/osvaldo.webp";
const EMAIL = "contacto@oatech.com.co";
const WA = "https://wa.me/447766285137?text=Hola%20Osvaldo%2C%20vi%20decide.oatech.com.co%20y%20quiero%20saber%20si%20la%20IA%20le%20sirve%20a%20mi%20empresa.";

const HTML = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Decide · Diagnóstico de IA para empresas · OA Tech</title>
<meta name="description" content="Antes de comprar IA, decide con números. Diagnóstico independiente: dónde sí sirve un agente de IA, dónde basta una automatización y cuánto cuesta de verdad. Calculadora de punto de equilibrio.">
<link rel="icon" type="image/png" href="${BRAND}/favicon.png">
<link rel="apple-touch-icon" href="${BRAND}/apple-touch-icon.png">
<meta name="theme-color" content="#0b2540">
<meta property="og:title" content="Antes de comprar IA, decide con números · OA Tech">
<meta property="og:description" content="Dónde sí, dónde no y cuánto cuesta. Diagnóstico de IA para empresas, sin humo.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#f5f7f9;--surface:#fff;--ink:#0b2540;--muted:#56616d;--accent:#0a7593;--accent-ink:#fff;--gold:#14b4dc;--line:#dfe5ea;--soft:#e4f4f9;--navy:#0b2540;--navy-2:#123456;--warn:#b4441c;--ok:#0f7a52;--amber:#9a6a00}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#08131f;--surface:#0f1f30;--ink:#eef3f8;--muted:#9fb0c0;--accent:#4cc6e6;--accent-ink:#08131f;--gold:#3cc6ea;--line:#1e3349;--soft:#0f2b3d;--navy:#061220;--navy-2:#0d2135;--warn:#f08a5d;--ok:#4fd39a;--amber:#f2c35d}}
:root[data-theme="dark"]{--bg:#08131f;--surface:#0f1f30;--ink:#eef3f8;--muted:#9fb0c0;--accent:#4cc6e6;--accent-ink:#08131f;--gold:#3cc6ea;--line:#1e3349;--soft:#0f2b3d;--navy:#061220;--navy-2:#0d2135;--warn:#f08a5d;--ok:#4fd39a;--amber:#f2c35d}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font-family:Inter,system-ui,sans-serif;line-height:1.6;font-size:17px}
h1,h2,h3{font-family:Fraunces,Georgia,serif;line-height:1.15;letter-spacing:-.01em;text-wrap:balance}
a{color:inherit}
.wrap{max-width:1120px;margin:0 auto;padding:0 16px}
.top{background:var(--navy);color:#fff;position:relative;overflow:hidden}
.top::before{content:"";position:absolute;inset:0;background:radial-gradient(600px 300px at 85% 20%,rgba(20,180,220,.22),transparent 70%),radial-gradient(500px 260px at 10% 90%,rgba(60,230,160,.14),transparent 70%);pointer-events:none}
nav{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 0;flex-wrap:wrap;position:relative}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none;line-height:0}
.brand img{height:46px;width:auto}
.brand span{line-height:1.2;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);border-left:1px solid rgba(255,255,255,.3);padding-left:12px}
.menu{display:flex;gap:22px;flex-wrap:wrap;font-size:15px;align-items:center}
.menu a{text-decoration:none;opacity:.85}
.menu a:hover{opacity:1}
.menu .cta{border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:6px 14px;opacity:1}
.hero{padding:44px 0 64px;position:relative;display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center}
.hero>*{min-width:0}
.kicker{display:inline-block;color:var(--gold);font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px}
.hero h1{font-size:clamp(34px,5vw,56px);margin-bottom:18px}
.hero h1 em{font-style:normal;color:var(--gold)}
.hero p{font-size:19px;color:rgba(255,255,255,.82);margin-bottom:28px;max-width:600px}
.ctas{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-block;background:var(--gold);color:#0b2540;text-decoration:none;font-weight:700;padding:14px 24px;border-radius:10px;font-size:16px;transition:transform .15s}
.btn:hover{transform:translateY(-2px)}
.btn.line{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.4)}
.btn.teal{background:var(--accent);color:var(--accent-ink)}
.verdicts{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:18px;padding:22px}
.verdicts h3{font-family:Inter,sans-serif;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:14px}
.vd{display:flex;gap:12px;align-items:flex-start;padding:11px 0;border-top:1px solid rgba(255,255,255,.1)}
.vd:first-of-type{border-top:0}
.vd i{flex:none;width:12px;height:12px;border-radius:50%;margin-top:7px}
.vd b{display:block;font-size:16px}
.vd span{font-size:14px;color:rgba(255,255,255,.72)}
.hero .vnote{font-size:12.5px;color:rgba(255,255,255,.6);margin:10px 0 0;max-width:none}
.strip{background:var(--navy-2);color:rgba(255,255,255,.85);position:relative}
.strip .wrap{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:20px 16px}
.strip b{display:block;font-family:Fraunces,serif;font-size:21px;color:var(--gold);line-height:1.2}
.strip div{font-size:14px}
section{padding:76px 0}
section+section{border-top:1px solid var(--line)}
.head{max-width:740px;margin-bottom:36px}
.head .kick{color:var(--accent);font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase;display:block;margin-bottom:10px}
.head h2{font-size:clamp(28px,4vw,42px);margin-bottom:12px}
.head p{color:var(--muted)}
.rules{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}
.rule{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:22px;display:flex;flex-direction:column}
.rule .if{font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
.rule h3{font-size:20px;margin-bottom:8px}
.rule p{font-size:15px;color:var(--muted);flex:1}
.rule .then{margin-top:14px;font-weight:700;font-size:15px}
.rule.ai{border:2px solid var(--accent);grid-column:1/-1}
.then.no{color:var(--warn)}.then.auto{color:var(--amber)}.then.tool{color:var(--accent)}.then.agent{color:var(--ok)}
.cost{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}
.cost>*{min-width:0}
.ex{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:24px}
.ex h3{font-size:21px;margin-bottom:14px}
.row{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-top:1px solid var(--line);font-size:15.5px}
.row:first-of-type{border-top:0}
.row b{font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap}
.ex .small{margin-top:12px}
.list{list-style:none}
.list li{padding:10px 0 10px 30px;position:relative;border-top:1px solid var(--line);font-size:15.5px}
.list li:first-child{border-top:0}
.list li::before{content:"!";position:absolute;left:0;top:11px;width:20px;height:20px;border-radius:50%;background:var(--soft);color:var(--accent);font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center}
.list b{color:var(--ink)}
.list span{color:var(--muted)}
.calc{display:grid;grid-template-columns:1fr 1fr;gap:28px;background:var(--surface);border:1px solid var(--line);border-radius:20px;padding:28px}
.calc>*{min-width:0}
.calc label{display:block;font-size:14px;font-weight:600;margin:0 0 4px}
.calc .hint{display:block;font-size:12.5px;color:var(--muted);font-weight:400;margin-bottom:6px}
.calc input{width:100%;font:inherit;font-size:16px;padding:11px 12px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink);margin-bottom:16px}
.calc input:focus{outline:2px solid var(--accent);outline-offset:1px}
.res{display:flex;flex-direction:column;gap:12px}
.res div{border-radius:14px;padding:14px 18px;background:var(--soft)}
.res span{display:block;font-size:12.5px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;font-weight:600}
.res b{font-family:Fraunces,serif;font-size:28px;line-height:1.2;font-variant-numeric:tabular-nums}
.res .verdict{background:var(--navy);color:#fff}
.res .verdict span{color:rgba(255,255,255,.7)}
.res .verdict b{font-size:22px;font-family:Inter,sans-serif;font-weight:700}
.small{font-size:13px;color:var(--muted)}
.offers{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.offer{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:26px;display:flex;flex-direction:column}
.offer.main{border:2px solid var(--accent)}
.offer .tag{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:8px}
.offer h3{font-size:23px;margin-bottom:6px}
.offer .price{font-weight:700;margin-bottom:12px}
.offer .price small{font-weight:500;color:var(--muted)}
.offer ul{list-style:none;flex:1;margin-bottom:18px}
.offer li{padding:5px 0 5px 24px;position:relative;font-size:15px}
.offer li::before{content:"✓";position:absolute;left:0;color:var(--accent);font-weight:700}
.about{display:grid;grid-template-columns:200px 1fr;gap:36px;align-items:center}
.about img{width:200px;height:200px;border-radius:50%;object-fit:cover;border:5px solid var(--surface)}
.about h2{font-size:clamp(26px,3.6vw,36px);margin-bottom:4px}
.about .role{color:var(--accent);font-weight:600;margin-bottom:12px}
.about p{color:var(--muted);margin-bottom:10px}
.about a{color:var(--accent);font-weight:600}
.faq{display:grid;grid-template-columns:1fr 1fr;gap:12px 28px}
details{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px 18px}
summary{font-weight:600;cursor:pointer}
details p{color:var(--muted);font-size:15px;margin-top:8px}
.contact{background:var(--navy);color:#fff;border-radius:24px;padding:44px;display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap}
.contact h2{font-size:clamp(26px,3.6vw,36px);margin-bottom:8px}
.contact p{color:rgba(255,255,255,.8)}
.contact .mail{display:block;margin-top:10px;font-size:15px;color:rgba(255,255,255,.8)}
footer{padding:32px 0 48px;color:var(--muted);font-size:14px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
footer a{color:var(--accent)}
.btn:focus-visible,.menu a:focus-visible,summary:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
@media (max-width:900px){.hero,.about,.calc,.faq,.cost{grid-template-columns:1fr}.offers{grid-template-columns:1fr}.strip .wrap{grid-template-columns:1fr 1fr}}
@media (max-width:640px){.menu a:not(.cta){display:none}.contact{padding:28px 20px}.brand img{height:36px}section{padding:56px 0}.about img{width:150px;height:150px}.calc{padding:20px}}
@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
</style>
</head>
<body>
<div class="top">
  <div class="wrap">
    <nav>
      <a href="/" class="brand"><img src="${BRAND}/logo-oscuro.webp" alt="OA Tech" width="184" height="46"><span>Decide · IA sin humo</span></a>
      <div class="menu">
        <a href="#cuando">¿Agente o no?</a>
        <a href="#costo">El costo real</a>
        <a href="#calculadora">Calculadora</a>
        <a href="#diagnostico">Diagnóstico</a>
        <a class="cta" href="#contacto">Hablemos</a>
      </div>
    </nav>
    <header class="hero">
      <div>
        <span class="kicker">OA Tech · Diagnóstico de IA para empresas</span>
        <h1>Antes de comprar IA, <em>decide con números.</em></h1>
        <p>Todos hablan de agentes de IA. Nosotros te decimos dónde sí sirven, dónde no y cuánto cuestan de verdad. Muchas veces la respuesta no es un agente: es una automatización sencilla, la herramienta que ya pagas o, primero, ordenar tus datos.</p>
        <div class="ctas">
          <a href="#calculadora" class="btn">Calcular si me conviene</a>
          <a href="#diagnostico" class="btn line">Ver el diagnóstico</a>
        </div>
      </div>
      <div class="verdicts" aria-label="Los cuatro veredictos posibles del diagnóstico">
        <h3>Cuatro respuestas posibles para cada proceso</h3>
        <div class="vd"><i style="background:#f08a5d"></i><div><b>No hacer nada (todavía)</b><span>Poco volumen o datos en desorden: primero lo primero.</span></div></div>
        <div class="vd"><i style="background:#f2c35d"></i><div><b>Automatización clásica</b><span>Reglas fijas: más barata y más confiable que un agente.</span></div></div>
        <div class="vd"><i style="background:#14b4dc"></i><div><b>La herramienta que ya pagas</b><span>Tu ERP, CRM o suite de oficina ya trae IA. Actívala.</span></div></div>
        <div class="vd"><i style="background:#3ce6a0"></i><div><b>Agente de IA</b><span>Entrada variable, objetivo claro y revisión humana de excepciones.</span></div></div>
        <p class="vnote">Cada veredicto va con su costo, su ahorro y en cuántos meses se paga.</p>
      </div>
    </header>
  </div>
  <div class="strip">
    <div class="wrap">
      <div><b>Independientes</b>no vendemos licencias</div>
      <div><b>Con números</b>costo, ahorro y retorno</div>
      <div><b>Datos primero</b>basura entra, basura sale</div>
      <div><b>En español</b>para empresas de Latinoamérica</div>
    </div>
  </div>
</div>

<main class="wrap">
  <section id="cuando">
    <div class="head">
      <span class="kick">¿Agente, automatización o nada?</span>
      <h2>No todo se resuelve con un agente de IA</h2>
      <p>Estas son las preguntas que hacemos antes de recomendar cualquier tecnología. La moda no está en la lista.</p>
    </div>
    <div class="rules">
      <div class="rule"><span class="if">Si el proceso sigue reglas fijas</span><h3>Siempre los mismos pasos, los mismos campos</h3><p>Un agente ahí es caro y menos predecible. Una automatización tradicional hace lo mismo por menos y sin sorpresas.</p><span class="then auto">→ Automatización clásica</span></div>
      <div class="rule"><span class="if">Si los datos están en desorden</span><h3>Duplicados, códigos que cambian, cifras que no cuadran</h3><p>Con datos malos un bot responde mal y un agente actúa mal. Con IA, la basura sale mejor redactada, y eso es más peligroso porque convence.</p><span class="then no">→ Primero ordenar los datos</span></div>
      <div class="rule"><span class="if">Si ya pagas el software</span><h3>Tu ERP, CRM o suite ya trae funciones de IA</h3><p>Antes de construir algo a la medida, vale la pena activar y medir lo que ya está incluido en lo que pagas cada mes.</p><span class="then tool">→ Usar lo que ya tienes</span></div>
      <div class="rule"><span class="if">Si el volumen es bajo</span><h3>Unas pocas tareas al mes</h3><p>Si el trabajo ocupa una fracción del tiempo de alguien, automatizarlo no libera un sueldo. La implementación nunca se recupera.</p><span class="then no">→ No hacer nada (todavía)</span></div>
      <div class="rule ai"><span class="if">Si la entrada varía y el objetivo es claro</span><h3>Correos, PDF y documentos distintos, con una meta fija</h3><p>Aquí un agente sí brilla: lee, compara, decide en los casos normales y pasa las excepciones a una persona.</p><span class="then agent">→ Agente de IA, con revisión humana</span></div>
    </div>
  </section>

  <section id="costo">
    <div class="head">
      <span class="kick">El costo real</span>
      <h2>Los tokens casi nunca son el problema</h2>
      <p>La discusión suele quedarse en cuánto cuesta la IA por uso. En una empresa mediana ese valor suele ser pequeño. Lo que define si se paga es todo lo demás.</p>
    </div>
    <div class="cost">
      <div class="ex">
        <h3>Ejemplo: revisión de facturas de proveedores</h3>
        <div class="row"><span>Analista con salario mínimo (Colombia 2026, con auxilio de transporte)</span><b>$2.000.000</b></div>
        <div class="row"><span>Costo total para la empresa, con prestaciones y seguridad social</span><b>≈ $2,7–3,0 M / mes</b></div>
        <div class="row"><span>Operar un agente: 1.000 facturas al mes (IA + plataforma de automatización)</span><b>≈ US$70 / mes</b></div>
        <p class="small">Ejemplo ilustrativo con supuestos, no es el caso de un cliente. El costo de operar depende del modelo, del tamaño de los documentos y del número de pasos; en un diagnóstico lo medimos con casos reales.</p>
      </div>
      <div class="ex">
        <h3>Lo que sí decide si se paga</h3>
        <ul class="list">
          <li><b>La implementación.</b> <span>Construir, conectar al ERP y probar es una inversión que hay que recuperar.</span></li>
          <li><b>El mantenimiento.</b> <span>Cambian los formatos, se actualiza el sistema, algo falla: alguien tiene que atenderlo.</span></li>
          <li><b>El porcentaje automatizable.</b> <span>Las excepciones siguen yendo a una persona. Si se automatiza el 70%, se ahorra el 70%.</span></li>
          <li><b>El volumen real.</b> <span>Sin volumen suficiente no hay ahorro que justifique nada.</span></li>
          <li><b>El costo de equivocarse.</b> <span>Un error caro obliga a revisar todo, y entonces no se ahorra nada.</span></li>
        </ul>
      </div>
    </div>
  </section>

  <section id="calculadora">
    <div class="head">
      <span class="kick">Calculadora</span>
      <h2>¿En cuántos meses se paga?</h2>
      <p>Pon tus números y mira el punto de equilibrio. Los valores de ejemplo corresponden al caso de las facturas.</p>
    </div>
    <div class="calc">
      <div>
        <label for="c1">Costo mensual del cargo para la empresa (COP)</label><span class="hint">Salario más prestaciones y seguridad social.</span>
        <input id="c1" type="number" min="0" step="50000" value="2850000" inputmode="numeric">
        <label for="c2">Porcentaje del trabajo que se puede automatizar (%)</label><span class="hint">Lo que queda son excepciones que revisa una persona.</span>
        <input id="c2" type="number" min="0" max="100" step="5" value="70" inputmode="numeric">
        <label for="c3">Costo mensual de operar la solución (COP)</label><span class="hint">IA, plataforma y soporte o mantenimiento.</span>
        <input id="c3" type="number" min="0" step="50000" value="650000" inputmode="numeric">
        <label for="c4">Inversión de implementación (COP)</label><span class="hint">Pago único para construir, integrar y probar.</span>
        <input id="c4" type="number" min="0" step="500000" value="10000000" inputmode="numeric">
      </div>
      <div class="res" aria-live="polite">
        <div><span>Ahorro bruto al mes</span><b id="o1">–</b></div>
        <div><span>Ahorro neto al mes</span><b id="o2">–</b></div>
        <div><span>Se recupera la inversión en</span><b id="o3">–</b></div>
        <div class="verdict"><span>Lectura rápida</span><b id="o4">–</b></div>
        <p class="small">Cálculo simple, sin impuestos, inflación ni costo del dinero. Sirve para saber si vale la pena estudiar el caso, no para aprobar una inversión.</p>
      </div>
    </div>
  </section>

  <section id="diagnostico">
    <div class="head">
      <span class="kick">El servicio</span>
      <h2>Diagnóstico de IA: dónde sí, dónde no y cuánto cuesta</h2>
      <p>Un análisis independiente de tus procesos para que inviertas en tecnología con números, no con titulares.</p>
    </div>
    <div class="offers">
      <div class="offer">
        <span class="tag">Para empezar</span>
        <h3>Conversación inicial</h3>
        <div class="price">Sin costo <small>· 30 minutos</small></div>
        <ul>
          <li>Qué procesos te preocupan y cuánto cuestan hoy</li>
          <li>Revisión rápida de la calculadora con tus cifras</li>
          <li>Te decimos si un diagnóstico vale la pena</li>
        </ul>
        <a href="#contacto" class="btn teal">Agendar</a>
      </div>
      <div class="offer main">
        <span class="tag">El corazón del servicio</span>
        <h3>Diagnóstico de IA</h3>
        <div class="price">Precio fijo <small>· 2 a 3 semanas</small></div>
        <ul>
          <li>Entrevistas con las áreas y mapa de procesos</li>
          <li>Revisión de la calidad de tus datos</li>
          <li>Los 3 a 5 casos con mejor retorno</li>
          <li>Veredicto por caso: nada, automatización, herramienta existente o agente</li>
          <li>Costo, ahorro y meses de recuperación de cada uno</li>
          <li>Presentación de resultados a la gerencia</li>
        </ul>
        <a href="#contacto" class="btn teal">Cotizar diagnóstico</a>
      </div>
      <div class="offer">
        <span class="tag">Si el caso lo justifica</span>
        <h3>Piloto e implementación</h3>
        <div class="price">Por proyecto</div>
        <ul>
          <li>Piloto del mejor caso, medido uno o dos meses</li>
          <li>Implementación con revisión humana de excepciones</li>
          <li>Capacitación del equipo para usar la solución</li>
        </ul>
        <a href="#contacto" class="btn teal">Hablemos</a>
      </div>
    </div>
  </section>

  <section id="quien">
    <div class="about">
      <img src="${PHOTO}" alt="Osvaldo Aguilar" width="200" height="200" loading="lazy">
      <div>
        <h2>Osvaldo Aguilar</h2>
        <div class="role">Ingeniero de sistemas · Fundador de OA Tech</div>
        <p>30 años liderando proyectos de tecnología, datos y transformación digital en una multinacional farmacéutica, una de las industrias más reguladas del mundo. He visto muchas modas tecnológicas llegar y pasar; las que funcionan siempre empiezan por datos confiables y un caso de negocio claro.</p>
        <p>Por eso este diagnóstico puede terminar en "todavía no necesitas IA". ¿Buscas datos e IA para la industria farmacéutica? Visita <a href="https://oatech.com.co" target="_blank" rel="noopener">oatech.com.co</a>.</p>
      </div>
    </div>
  </section>

  <section id="preguntas">
    <div class="head">
      <span class="kick">Preguntas frecuentes</span>
      <h2>Lo que nos suelen preguntar</h2>
    </div>
    <div class="faq">
      <details><summary>¿Ustedes venden agentes de IA?</summary><p>Podemos implementarlos si el diagnóstico lo justifica, pero el diagnóstico es independiente: si la mejor respuesta es una automatización sencilla o no hacer nada, eso es lo que te recomendamos.</p></details>
      <details><summary>¿Necesitan acceso a mis datos?</summary><p>Basta con muestras, idealmente anonimizadas. Firmamos acuerdo de confidencialidad y tratamos la información según la Ley 1581 de protección de datos.</p></details>
      <details><summary>¿Cuánto cuesta el diagnóstico?</summary><p>Tiene precio fijo según el tamaño de la empresa y el número de áreas. Lo cotizamos después de la conversación inicial, antes de empezar.</p></details>
      <details><summary>¿Y si ya tengo un proveedor que me ofrece agentes?</summary><p>Mejor aún: el diagnóstico te da una segunda opinión con números para evaluar su propuesta antes de firmar.</p></details>
      <details><summary>¿Sirve para empresas pequeñas?</summary><p>Sí, sobre todo para ellas: son las que menos pueden darse el lujo de invertir en tecnología que no se paga.</p></details>
      <details><summary>¿Qué recibo al final?</summary><p>Un informe con los casos analizados, el veredicto de cada uno, sus números y un plan priorizado, más una presentación a la gerencia.</p></details>
    </div>
  </section>

  <section id="contacto">
    <div class="contact">
      <div>
        <h2>¿La IA le sirve a tu empresa?</h2>
        <p>Cuéntanos qué proceso te preocupa y lo revisamos juntos en 30 minutos, sin costo.</p>
        <span class="mail">${EMAIL}</span>
      </div>
      <div class="ctas">
        <a href="${WA}" class="btn" target="_blank" rel="noopener">Escribir por WhatsApp</a>
        <a href="mailto:${EMAIL}?subject=Diagn%C3%B3stico%20de%20IA" class="btn line">Enviar correo</a>
      </div>
    </div>
  </section>
</main>

<div class="wrap">
  <footer>
    <div>© 2026 OA Tech · <a href="https://oatech.com.co">oatech.com.co</a></div>
    <div>IA sin humo: dónde sí, dónde no y cuánto cuesta.</div>
  </footer>
</div>
<script>
(function(){
  var ids=['c1','c2','c3','c4'];
  function v(id){var x=parseFloat(document.getElementById(id).value);return isFinite(x)&&x>0?x:0}
  function cop(n){var s=Math.round(Math.abs(n)).toLocaleString('es-CO');return (n<0?'-$':'$')+s}
  function calc(){
    var costo=v('c1'), pct=Math.min(v('c2'),100)/100, op=v('c3'), inv=v('c4');
    var bruto=costo*pct, neto=bruto-op;
    document.getElementById('o1').textContent=cop(bruto);
    document.getElementById('o2').textContent=cop(neto);
    var m=neto>0?inv/neto:Infinity, t3, t4;
    if(neto<=0){t3='No se recupera';t4='El costo mensual supera el ahorro: así no es viable.'}
    else{
      t3=(m<1?'menos de 1':m.toLocaleString('es-CO',{maximumFractionDigits:1}))+' meses';
      if(m<=12)t4='Se paga en menos de un año: vale la pena estudiarlo.';
      else if(m<=24)t4='Se paga, pero despacio: revisa volumen e implementación.';
      else t4='Tarda más de dos años: probablemente no conviene así.';
    }
    document.getElementById('o3').textContent=t3;
    document.getElementById('o4').textContent=t4;
  }
  ids.forEach(function(id){document.getElementById(id).addEventListener('input',calc)});
  calc();
})();
</script>
</body>
</html>
`;

Bun.serve({
  port: Number(Bun.env.PORT || 3000),
  fetch(req) {
    const p = new URL(req.url).pathname;
    if (p === "/health") return new Response("ok");
    if (p !== "/" && p !== "/index.html") return Response.redirect(new URL("/", req.url).toString(), 302);
    return new Response(HTML, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  },
});
console.log("Escuchando: oatech-decide", Bun.env.PORT || 3000);
