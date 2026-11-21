import { SQL } from "bun";

const PROFESION = "contadores";
const TABLAS: Record<string, string> = {
  contadores: "waitlist",
  abogados: "waitlist_abogados",
  inmobiliarios: "waitlist_inmobiliarios",
  odontologos: "waitlist_odontologos",
  emprendedores: "waitlist_mamas",
};
const TABLA = TABLAS[PROFESION];
const ADMIN_KEY = Bun.env.ADMIN_KEY || "";
let db: SQL | null = null;
let ready: Promise<unknown> | null = null;

async function getDb(): Promise<SQL> {
  if (!Bun.env.DATABASE_URL) throw new Error("DATABASE_URL no configurada");
  if (!db) db = new SQL(Bun.env.DATABASE_URL);
  if (!ready) {
    const conn = db;
    ready = (async () => {
      for (const t of Object.values(TABLAS)) {
        await conn.unsafe(`CREATE TABLE IF NOT EXISTS ${t} (id SERIAL PRIMARY KEY, nombre TEXT NOT NULL, email TEXT NOT NULL, pais TEXT, fecha TIMESTAMPTZ DEFAULT now())`);
      }
    })().catch((e) => { ready = null; throw e; });
  }
  await ready;
  return db;
}

const HTML = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>IA para Contadores</title>
<meta name="description" content="Programa en vivo de 6 semanas para contadores hispanohablantes: automatiza conciliaciones, informes y atención a clientes con inteligencia artificial.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--bg:#f7f5ef;--surface:#ffffff;--ink:#14201b;--muted:#5b6660;--accent:#0f6b4f;--accent-2:#e8b931;--line:#e3dfd3;--soft:#eaf3ee;--on-accent:#ffffff;--warn:#b45309}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#0f1512;--surface:#18201c;--ink:#eef2ef;--muted:#9aa8a1;--accent:#4fc597;--accent-2:#f0c64a;--line:#26302b;--soft:#16261f;--on-accent:#0f1512;--warn:#f59e0b}}
:root[data-theme="dark"]{--bg:#0f1512;--surface:#18201c;--ink:#eef2ef;--muted:#9aa8a1;--accent:#4fc597;--accent-2:#f0c64a;--line:#26302b;--soft:#16261f;--on-accent:#0f1512;--warn:#f59e0b}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--ink);font-family:Inter,system-ui,sans-serif;line-height:1.6;font-size:17px}
h1,h2,h3{font-family:Fraunces,Georgia,serif;line-height:1.15;letter-spacing:-.01em}
a{color:inherit}
.wrap{max-width:1080px;margin:0 auto;padding:0 16px}
nav{display:flex;justify-content:space-between;align-items:center;padding:20px 0}
.logo{font-family:Fraunces,serif;font-weight:700;font-size:20px}
.logo span{color:var(--accent)}
.btn{display:inline-block;background:var(--accent);color:var(--on-accent);text-decoration:none;font-weight:600;padding:14px 26px;border-radius:10px;border:0;cursor:pointer;font-size:16px;font-family:inherit;transition:transform .15s}
.btn:hover{transform:translateY(-2px)}
.btn.ghost{background:transparent;color:var(--ink);border:1.5px solid var(--line)}
.nav-cta{padding:10px 18px;font-size:15px}
.hero{padding:56px 0 72px;display:grid;grid-template-columns:1.25fr 1fr;gap:48px;align-items:center}
.tag{display:inline-block;background:var(--soft);color:var(--accent);font-weight:600;font-size:14px;padding:6px 12px;border-radius:99px;margin-bottom:20px}
.hero h1{font-size:clamp(36px,5.5vw,60px);margin-bottom:20px}
.hero h1 em{font-style:normal;background:linear-gradient(transparent 62%,var(--accent-2) 62%)}
.hero p.lead{font-size:19px;color:var(--muted);margin-bottom:28px;max-width:540px}
.hero-ctas{display:flex;gap:12px;flex-wrap:wrap}
.facts{display:flex;gap:24px;margin-top:28px;flex-wrap:wrap;color:var(--muted);font-size:15px}
.facts b{color:var(--ink)}
.card-demo{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:24px;box-shadow:0 20px 50px -30px rgba(0,0,0,.35)}
.card-demo .row{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px dashed var(--line);font-size:15px}
.card-demo .row:last-child{border:0}
.card-demo .before{color:var(--muted);text-decoration:line-through}
.card-demo .after{color:var(--accent);font-weight:600}
.card-demo h3{font-size:18px;margin-bottom:8px}
.card-demo small{color:var(--muted);display:block;margin-top:12px;font-size:13px}
section{padding:72px 0;border-top:1px solid var(--line)}
.sec-head{max-width:640px;margin-bottom:40px}
.sec-head h2{font-size:clamp(28px,4vw,40px);margin-bottom:12px}
.sec-head p{color:var(--muted)}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.pain{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:24px}
.pain .n{font-family:Fraunces,serif;font-size:32px;color:var(--accent)}
.pain h3{font-size:19px;margin:6px 0 8px}
.pain p{color:var(--muted);font-size:15px}
.demo{display:grid;grid-template-columns:1fr 1.15fr;gap:48px;align-items:center}
.demo .sec-head{margin-bottom:0}
.demo .note{font-size:13px;color:var(--muted);margin-top:16px}
.mock{background:var(--surface);border:1px solid var(--line);border-radius:20px;box-shadow:0 20px 50px -30px rgba(0,0,0,.35);overflow:hidden}
.mock-bar{display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid var(--line);font-size:13px;color:var(--muted);font-weight:600}
.mock-bar i{width:10px;height:10px;border-radius:50%;background:var(--line);display:inline-block}
.mock-body{padding:20px;display:flex;flex-direction:column;gap:12px;font-size:15px}
.bubble{max-width:88%;padding:12px 14px;border-radius:14px;line-height:1.45}
.bubble.me{align-self:flex-end;background:var(--accent);color:var(--on-accent);border-bottom-right-radius:4px}
.bubble.ai{align-self:flex-start;background:var(--soft);color:var(--ink);border-bottom-left-radius:4px}
.who{display:block;font-size:12px;font-weight:700;opacity:.75;margin-bottom:4px}
.mock table{width:100%;border-collapse:collapse;font-size:13px;margin-top:4px}
.mock th,.mock td{padding:7px 6px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}
.mock th{color:var(--muted);font-weight:600}
.st-ok{color:var(--accent);font-weight:600}
.st-warn{color:var(--warn);font-weight:600}
.modules{display:grid;gap:12px}
.mod{display:grid;grid-template-columns:90px 1fr;gap:20px;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:22px 24px}
.mod .wk{font-weight:600;color:var(--accent);font-size:14px;text-transform:uppercase;letter-spacing:.05em}
.mod h3{font-size:20px;margin-bottom:6px}
.mod p{color:var(--muted);font-size:15px}
.mod .out{margin-top:10px;font-size:14px;font-weight:500}
.mod .out::before{content:"Entregable: ";color:var(--accent)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.list{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:28px}
.list h3{font-size:20px;margin-bottom:14px}
.list li{list-style:none;padding:8px 0 8px 30px;position:relative;font-size:16px}
.list li::before{position:absolute;left:0;top:8px;font-weight:700}
.list.yes li::before{content:"✓";color:var(--accent)}
.list.no li::before{content:"✕";color:#c0563f}
.teacher{display:grid;grid-template-columns:220px 1fr;gap:48px;align-items:start}
.teacher img{width:220px;height:220px;border-radius:50%;object-fit:cover;border:4px solid var(--surface);box-shadow:0 12px 32px -16px rgba(0,0,0,.45)}
.teacher h2{font-size:clamp(28px,4vw,40px);margin-bottom:6px}
.teacher .role{color:var(--accent);font-weight:600;margin-bottom:16px}
.teacher p{color:var(--muted);margin-bottom:12px}
.teacher p b{color:var(--ink)}
.creds{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:18px}
.creds div{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:12px 14px;font-size:15px;font-weight:500}
.pricing{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.plan{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:32px 28px;display:flex;flex-direction:column}
.plan.featured{border:2px solid var(--accent);position:relative}
.plan.featured::after{content:"Recomendado";position:absolute;top:-13px;left:24px;background:var(--accent);color:var(--on-accent);font-size:13px;font-weight:600;padding:4px 10px;border-radius:99px}
.plan h3{font-size:22px}
.price{font-family:Fraunces,serif;font-size:44px;margin:12px 0 4px}
.price small{font-size:16px;color:var(--muted);font-family:Inter,sans-serif}
.plan .sub{color:var(--muted);font-size:14px;margin-bottom:18px}
.plan ul{margin:0 0 24px;flex:1}
.plan li{list-style:none;padding:6px 0 6px 26px;position:relative;font-size:15px}
.plan li::before{content:"✓";position:absolute;left:0;color:var(--accent);font-weight:700}
.plan .btn{text-align:center}
.plan .wa{font-size:13px;color:var(--muted);margin-top:10px;text-align:center}
.plan .wa b{color:var(--ink)}
details{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:18px 22px;margin-bottom:10px}
summary{font-weight:600;cursor:pointer;list-style:none;display:flex;justify-content:space-between;gap:12px}
summary::after{content:"+";color:var(--accent);font-size:22px;line-height:1}
details[open] summary::after{content:"–"}
details p{color:var(--muted);margin-top:10px;font-size:15px}
.cta-final{background:var(--accent);color:var(--on-accent);border-radius:22px;padding:48px 32px;text-align:center;margin:72px 0}
.cta-final h2{font-size:clamp(28px,4vw,40px);margin-bottom:12px}
.cta-final p{opacity:.9;margin-bottom:28px}
form{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;max-width:620px;margin:0 auto}
input,select{padding:14px 16px;border-radius:10px;border:0;font-size:16px;font-family:inherit;flex:1;min-width:180px;background:#fff;color:#14201b}
form .btn{background:var(--accent-2);color:#14201b}
.ok{display:none;font-weight:600;margin-top:16px}
footer{padding:32px 0 48px;color:var(--muted);font-size:14px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
@media (max-width:900px){.pricing{grid-template-columns:1fr;max-width:520px}}
@media (max-width:820px){.hero,.two,.grid3,.demo,.teacher{grid-template-columns:1fr}.mod{grid-template-columns:1fr;gap:6px}.hero{padding:32px 0 56px}section{padding:56px 0}.cta-final{padding:40px 20px}.teacher img{width:160px;height:160px}.creds{grid-template-columns:1fr}.demo{gap:28px}}
</style>
</head>
<body>
<div class="wrap">
<nav>
  <div class="logo">IA para <span>Contadores</span></div>
  <a href="#lista" class="btn nav-cta">Reservar cupo</a>
</nav>

<header class="hero">
  <div>
    <span class="tag">Curso en vivo · 100% en español</span>
    <h1>Haz en <em>2 horas</em> lo que hoy te toma 2 días.</h1>
    <p class="lead">Un programa práctico de 6 semanas para contadores que quieren usar inteligencia artificial en conciliaciones, informes, cierres y atención a clientes, sin saber programar.</p>
    <div class="hero-ctas">
      <a href="#lista" class="btn">Unirme a la lista de espera</a>
      <a href="#temario" class="btn ghost">Ver temario</a>
    </div>
    <div class="facts">
      <div><b>6 semanas</b> en vivo</div>
      <div><b>Grupos</b> pequeños</div>
      <div><b>Plantillas</b> listas para usar</div>
    </div>
  </div>
  <div class="card-demo" aria-label="Ejemplo de ahorro de tiempo">
    <h3>Tu semana, antes y después</h3>
    <div class="row"><span>Conciliación bancaria</span><span><span class="before">6 h</span> → <span class="after">45 min</span></span></div>
    <div class="row"><span>Informe mensual al cliente</span><span><span class="before">4 h</span> → <span class="after">30 min</span></span></div>
    <div class="row"><span>Responder dudas tributarias</span><span><span class="before">5 h</span> → <span class="after">1 h</span></span></div>
    <div class="row"><span>Clasificar facturas y soportes</span><span><span class="before">8 h</span> → <span class="after">1 h</span></span></div>
    <small>Tiempos ilustrativos. El ahorro real depende de tu volumen y tus herramientas.</small>
  </div>
</header>

<section>
  <div class="sec-head">
    <h2>El problema no es la IA. Es que nadie la explica para tu trabajo.</h2>
    <p>Los cursos de IA son genéricos y en inglés. Tú necesitas casos con tu software contable, tus formatos y tus clientes.</p>
  </div>
  <div class="grid3">
    <div class="pain"><div class="n">01</div><h3>Cierres eternos</h3><p>Fin de mes significa noches largas copiando datos entre extractos, hojas de cálculo y el sistema contable.</p></div>
    <div class="pain"><div class="n">02</div><h3>Clientes que preguntan lo mismo</h3><p>El mismo mensaje de WhatsApp diez veces por semana: "¿cuánto debo pagar?", "¿qué documentos te mando?".</p></div>
    <div class="pain"><div class="n">03</div><h3>Miedo a quedarte atrás</h3><p>Ves que la IA está cambiando la profesión, pero no sabes por dónde empezar ni qué es seguro usar.</p></div>
  </div>
</section>

<section>
  <div class="demo">
    <div class="sec-head">
      <h2>Así se ve en la práctica</h2>
      <p>Le pides a la IA, con tus propias palabras, que cruce el extracto del banco con tus registros. En segundos te muestra qué cuadra y qué no, y tú revisas solo las diferencias.</p>
      <p class="note">Ejemplo ilustrativo con datos ficticios.</p>
    </div>
    <div class="mock" aria-label="Ejemplo de conciliación bancaria con IA">
      <div class="mock-bar"><i></i><i></i><i></i><span>Asistente de IA</span></div>
      <div class="mock-body">
        <div class="bubble me"><span class="who">Tú</span>Concilia el extracto de septiembre con mis registros y márcame las diferencias.</div>
        <div class="bubble ai"><span class="who">IA</span>Revisé 48 movimientos: 46 cuadran y encontré 2 diferencias.
          <table>
            <tr><th>Fecha</th><th>Concepto</th><th>Banco</th><th>Estado</th></tr>
            <tr><td>05/09</td><td>Pago proveedor</td><td>2.450.000</td><td class="st-ok">Cuadra</td></tr>
            <tr><td>12/09</td><td>Comisión bancaria</td><td>18.400</td><td class="st-warn">Falta registrar</td></tr>
            <tr><td>27/09</td><td>Consignación cliente</td><td>1.200.000</td><td class="st-warn">Diferencia de 80.000</td></tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="temario">
  <div class="sec-head">
    <h2>Temario: 6 semanas, 6 entregables</h2>
    <p>Cada semana sales con algo funcionando en tu propia práctica, no solo con teoría.</p>
  </div>
  <div class="modules">
    <div class="mod"><div class="wk">Semana 1</div><div><h3>Fundamentos y uso seguro</h3><p>Cómo funcionan los asistentes de IA, qué datos de clientes nunca debes subir y cómo anonimizar información.</p><div class="out">Tu política personal de uso de IA y confidencialidad.</div></div></div>
    <div class="mod"><div class="wk">Semana 2</div><div><h3>Excel + IA</h3><p>Fórmulas, limpieza de datos y conciliaciones asistidas. Convierte extractos en PDF a tablas utilizables.</p><div class="out">Plantilla de conciliación bancaria semiautomática.</div></div></div>
    <div class="mod"><div class="wk">Semana 3</div><div><h3>Clasificación de documentos</h3><p>Lectura de facturas, recibos y soportes; extracción de datos y control de errores.</p><div class="out">Flujo para clasificar soportes del mes en minutos.</div></div></div>
    <div class="mod"><div class="wk">Semana 4</div><div><h3>Informes que el cliente entiende</h3><p>De estados financieros a un resumen claro con gráficos y recomendaciones en lenguaje simple.</p><div class="out">Plantilla de informe mensual para clientes.</div></div></div>
    <div class="mod"><div class="wk">Semana 5</div><div><h3>Atención a clientes por WhatsApp</h3><p>Respuestas a preguntas frecuentes, recordatorios de vencimientos y solicitud de documentos.</p><div class="out">Biblioteca de respuestas y recordatorios automáticos.</div></div></div>
    <div class="mod"><div class="wk">Semana 6</div><div><h3>Investigación tributaria y nuevos servicios</h3><p>Cómo consultar normativa con IA verificando fuentes, y cómo empaquetar nuevos servicios para cobrar más.</p><div class="out">Tu nueva oferta de servicio "contador aumentado".</div></div></div>
  </div>
</section>

<section>
  <div class="two">
    <div class="list yes">
      <h3>Es para ti si…</h3>
      <ul>
        <li>Eres contador independiente o tienes una firma pequeña</li>
        <li>Manejas varios clientes y te falta tiempo</li>
        <li>Usas Excel a diario</li>
        <li>Quieres resultados prácticos, no teoría</li>
      </ul>
    </div>
    <div class="list no">
      <h3>No es para ti si…</h3>
      <ul>
        <li>Buscas aprender a programar</li>
        <li>Esperas que la IA firme por ti o reemplace tu criterio</li>
        <li>No puedes dedicar unas 3 horas por semana</li>
      </ul>
    </div>
  </div>
</section>

<section id="instructor">
  <div class="teacher">
    <img src="https://oatech-assets.up.railway.app/osvaldo.webp" alt="Osvaldo Aguilar, instructor del curso" width="220" height="220" loading="lazy">
    <div>
      <span class="tag">Quién te enseña</span>
      <h2>Hola, soy Osvaldo Aguilar.</h2>
      <div class="role">Ingeniero de sistemas · 30 años en tecnología</div>
      <p>Trabajé 30 años en tecnología y transformación digital en una multinacional farmacéutica francesa, donde lideré proyectos digitales en toda Latinoamérica.</p>
      <p>En mi día a día uso <b>Python, R e inteligencia artificial</b> para analizar datos, automatizar procesos y convertir información en decisiones. Este curso nace de esa experiencia: llevar esas herramientas a tu trabajo, sin tecnicismos, para que la IA trabaje para ti y no al revés.</p>
      <div class="creds">
        <div>30 años en tecnología y transformación digital</div>
        <div>Python y R para análisis de datos</div>
        <div>Cursos certificados en IA: Cloudera y O'Reilly</div>
        <div>Líder de proyectos regionales en Latinoamérica</div>
      </div>
    </div>
  </div>
</section>

<section id="precios">
  <div class="sec-head">
    <h2>Inversión</h2>
    <p>Si recuperas 5 horas al mes, el programa se paga solo en poco tiempo.</p>
  </div>
  <div class="pricing">
    <div class="plan">
      <h3>Grabado</h3>
      <div class="price">$97 <small>USD</small></div>
      <div class="sub">Pago único</div>
      <ul>
        <li>Las 6 sesiones grabadas</li>
        <li>Todas las plantillas y flujos</li>
        <li>Acceso por 12 meses</li>
      </ul>
      <a href="#lista" class="btn ghost">Me interesa</a>
    </div>
    <div class="plan featured">
      <h3>Clases en vivo</h3>
      <div class="price">$397 <small>USD</small></div>
      <div class="sub">Pago único o 3 cuotas</div>
      <ul>
        <li>6 sesiones en vivo con preguntas</li>
        <li>Revisión de tus casos reales</li>
        <li>Comunidad privada de contadores</li>
        <li>Todas las plantillas y grabaciones</li>
        <li>Certificado de finalización</li>
      </ul>
      <a href="#lista" class="btn">Reservar cupo</a>
    </div>
    <div class="plan">
      <h3>Para tu firma contable</h3>
      <div class="price"><small>desde</small> $1.200 <small>USD</small></div>
      <div class="sub">Para equipos de 3 a 15 personas</div>
      <ul>
        <li>Capacitación en vivo para todo tu equipo</li>
        <li>Plantillas configuradas con tus formatos</li>
        <li>Protocolo de uso de IA para tu firma</li>
        <li>Sesión de seguimiento a los 30 días</li>
      </ul>
      <a href="mailto:contacto@oatech.com.co?subject=IA%20para%20mi%20firma%20contable" class="btn ghost">Agendar una llamada</a>
      <p class="wa">o escríbeme por WhatsApp: <b>@oatechco</b></p>
    </div>
  </div>
</section>

<section>
  <div class="sec-head"><h2>Preguntas frecuentes</h2></div>
  <details><summary>¿Necesito saber programar?</summary><p>No. Todo se hace con herramientas visuales, Excel y asistentes de IA de uso común.</p></details>
  <details><summary>¿Es seguro usar IA con información de mis clientes?</summary><p>La primera semana está dedicada a eso: qué herramientas usar, cómo anonimizar datos y qué nunca debes compartir.</p></details>
  <details><summary>¿Puedo capacitar a todo mi equipo?</summary><p>Sí. El plan para firmas adapta el programa a tus formatos y tu forma de trabajar. Escríbeme y lo conversamos.</p></details>
  <details><summary>¿Sirve para mi país?</summary><p>Los flujos funcionan en cualquier país hispanohablante. Los ejemplos tributarios se adaptan según los países de los participantes.</p></details>
  <details><summary>¿Cuándo empieza el próximo grupo?</summary><p>Avisamos primero a la lista de espera, con precio de fundador para los primeros inscritos.</p></details>
  <details><summary>¿Hay garantía?</summary><p>Sí. Si después de las dos primeras semanas sientes que no es para ti, te devolvemos el dinero.</p></details>
</section>

<div class="cta-final" id="lista">
  <h2>Únete a la lista de espera</h2>
  <p>Precio de fundador y acceso prioritario para el primer grupo.</p>
  <form id="waitlist">
    <input type="text" name="nombre" placeholder="Tu nombre" required>
    <input type="email" name="email" placeholder="Tu correo" required>
    <select name="pais" required>
      <option value="">País</option>
      <option>Colombia</option><option>México</option><option>Argentina</option><option>Chile</option>
      <option>Perú</option><option>Ecuador</option><option>España</option><option>Estados Unidos</option><option>Otro</option>
    </select>
    <button class="btn" type="submit">Quiero mi cupo</button>
  </form>
  <div class="ok" id="ok">¡Listo! Te avisaremos antes que a nadie.</div>
</div>

<footer>
  <div>© 2026 IA para Contadores</div>
  <div>Contacto: <a href="mailto:contacto@oatech.com.co">contacto@oatech.com.co</a> · WhatsApp: @oatechco</div>
</footer>
</div>
<script>
document.getElementById('waitlist').addEventListener('submit', async function(e){
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this));
  try{
    await fetch('/api/waitlist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  }catch(err){}
  this.style.display='none';
  document.getElementById('ok').style.display='block';
});
</script>
</body>
</html>
`;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body, null, 2), { status, headers: { "Content-Type": "application/json" } });

Bun.serve({
  port: Number(Bun.env.PORT || 3000),
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/waitlist" && req.method === "POST") {
      try {
        const b = (await req.json()) as Record<string, unknown>;
        const nombre = String(b.nombre ?? "").slice(0, 100);
        const email = String(b.email ?? "").slice(0, 200);
        const pais = String(b.pais ?? "").slice(0, 50);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false }, 400);
        const sql = await getDb();
        await sql.unsafe(`INSERT INTO ${TABLA} (nombre, email, pais) VALUES ($1, $2, $3)`, [nombre, email, pais]);
        console.log("Nuevo registro:", PROFESION, email, pais);
        return json({ ok: true }, 201);
      } catch (e) {
        console.error("Error guardando registro:", e);
        return json({ ok: false }, 500);
      }
    }

    if (url.pathname === "/api/waitlist" && req.method === "GET") {
      if (!ADMIN_KEY || url.searchParams.get("key") !== ADMIN_KEY) return new Response("No autorizado", { status: 401 });
      const sql = await getDb();
      const todas = url.searchParams.get("vista") === "todas";
      const query = todas
        ? Object.entries(TABLAS).map(([p, t]) => `SELECT '${p}' AS profesion, nombre, email, pais, fecha FROM ${t}`).join(" UNION ALL ") + " ORDER BY fecha DESC"
        : `SELECT '${PROFESION}' AS profesion, nombre, email, pais, fecha FROM ${TABLA} ORDER BY fecha DESC`;
      const rows: any[] = await sql.unsafe(query);
      if (url.searchParams.get("format") === "csv") {
        const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
        const csv = "profesion,nombre,email,pais,fecha\n" + rows.map((r) => [r.profesion, r.nombre, r.email, r.pais, new Date(r.fecha).toISOString()].map(esc).join(",")).join("\n");
        return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8" } });
      }
      return json(rows);
    }

    if (url.pathname === "/health") return new Response("ok");

    return new Response(HTML, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  },
});

console.log("Escuchando:", PROFESION, Bun.env.PORT || 3000);
