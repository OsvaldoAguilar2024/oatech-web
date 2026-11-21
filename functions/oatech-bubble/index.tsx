// OA Tech · Bubble Workload Optimization (bubble.oatech.com.co)
const BRAND = "https://oatech-brand-production.up.railway.app";
const PHOTO = "https://oatech-assets.up.railway.app/osvaldo.webp";
const EMAIL = "osvaldo.aguilar@oatech.com.co";
const WA = "https://wa.me/447766285137?text=Hi%20Osvaldo%2C%20I%20saw%20your%20Bubble%20exit%20page%20and%20I%27d%20like%20to%20talk%20about%20my%20app.";
const MAIL = `mailto:${EMAIL}?subject=Bubble%20Exit%20Audit&body=Hi%20Osvaldo%2C%0A%0AApp%20URL%3A%0ACurrent%20plan%3A%0AApprox.%20monthly%20WU%20usage%3A%0AWhat%20worries%20you%20most%3A%0A`;

const HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Leave Bubble, Own Your App · OA Tech</title>
<meta name="description" content="Phased migrations off Bubble.io: own your code, your data and your costs. Exit audits, hybrid backends and WU optimization for teams running production apps. Independent consultancy, not affiliated with Bubble.">
<link rel="icon" type="image/png" href="${BRAND}/favicon.png">
<link rel="apple-touch-icon" href="${BRAND}/apple-touch-icon.png">
<meta name="theme-color" content="#0b2540">
<meta property="og:title" content="Own your app. Own your costs. Phased migrations off Bubble.">
<meta property="og:description" content="Exit audits and phased migrations for production Bubble apps, without a big-bang rewrite.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#f5f7f9;--surface:#fff;--ink:#0b2540;--muted:#56616d;--accent:#0a7593;--accent-ink:#fff;--gold:#14b4dc;--line:#dfe5ea;--soft:#e4f4f9;--navy:#0b2540;--navy-2:#123456;--warn:#b4441c;--ok:#0f7a52}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#08131f;--surface:#0f1f30;--ink:#eef3f8;--muted:#9fb0c0;--accent:#4cc6e6;--accent-ink:#08131f;--gold:#3cc6ea;--line:#1e3349;--soft:#0f2b3d;--navy:#061220;--navy-2:#0d2135;--warn:#f08a5d;--ok:#4fd39a}}
:root[data-theme="dark"]{--bg:#08131f;--surface:#0f1f30;--ink:#eef3f8;--muted:#9fb0c0;--accent:#4cc6e6;--accent-ink:#08131f;--gold:#3cc6ea;--line:#1e3349;--soft:#0f2b3d;--navy:#061220;--navy-2:#0d2135;--warn:#f08a5d;--ok:#4fd39a}
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
.hero{padding:48px 0 64px;position:relative;display:grid;grid-template-columns:1.25fr .95fr;gap:40px;align-items:center}
.hero>*{min-width:0}
.kicker{display:inline-block;color:var(--gold);font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px}
.hero h1{font-size:clamp(34px,5vw,56px);margin-bottom:18px}
.hero h1 em{font-style:normal;color:var(--gold)}
.hero p{font-size:19px;color:rgba(255,255,255,.82);margin-bottom:28px;max-width:600px}
.ctas{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-block;background:var(--gold);color:#0b2540;text-decoration:none;font-weight:700;padding:14px 24px;border-radius:10px;font-size:16px;transition:transform .15s;border:0;cursor:pointer;font-family:inherit}
.btn:hover{transform:translateY(-2px)}
.btn.line{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.4)}
.btn.teal{background:var(--accent);color:var(--accent-ink)}
.meter{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:18px;padding:22px}
.meter h3{font-family:Inter,sans-serif;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:14px}
.mrow{display:grid;grid-template-columns:1fr auto;gap:6px 12px;font-size:14px;color:rgba(255,255,255,.8);margin-bottom:12px}
.bar{grid-column:1/-1;height:10px;border-radius:999px;background:rgba(255,255,255,.12);overflow:hidden}
.bar i{display:block;height:100%;border-radius:999px}
.mv{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;margin-bottom:10px;font-size:14.5px}.mv span{min-width:0}.mv .from{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:10px;padding:10px 12px;color:rgba(255,255,255,.8)}.mv .to{background:rgba(20,180,220,.16);border:1px solid rgba(20,180,220,.5);border-radius:10px;padding:10px 12px;color:#fff;font-weight:600}.mv .ar{color:var(--gold);font-weight:700}
.why{display:grid;grid-template-columns:1fr 1fr;gap:16px}.why>div{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:26px}.why h3{font-size:24px;margin-bottom:8px}.why p{color:var(--muted);font-size:15.5px;margin-bottom:8px}.why .big{font-family:Fraunces,serif;font-size:34px;color:var(--accent);line-height:1.1;display:block;margin-bottom:6px}
.hero .mnote{font-size:12.5px;margin-bottom:0;max-width:none;color:rgba(255,255,255,.6);margin-top:6px}
.strip{background:var(--navy-2);color:rgba(255,255,255,.85);position:relative}
.strip .wrap{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:20px 16px}
.strip b{display:block;font-family:Fraunces,serif;font-size:21px;color:var(--gold);line-height:1.2}
.strip div{font-size:14px}
section{padding:76px 0}
section+section{border-top:1px solid var(--line)}
.head{max-width:720px;margin-bottom:36px}
.head .kick{color:var(--accent);font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase;display:block;margin-bottom:10px}
.head h2{font-size:clamp(28px,4vw,42px);margin-bottom:12px}
.head p{color:var(--muted)}
.leaks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.leak{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:20px}
.leak h3{font-size:18px;margin-bottom:6px}
.leak p{font-size:15px;color:var(--muted)}
.leak code{font-family:ui-monospace,Menlo,monospace;font-size:13px;background:var(--soft);padding:1px 6px;border-radius:5px;color:var(--ink)}
.calc{display:grid;grid-template-columns:1fr 1fr;gap:28px;background:var(--surface);border:1px solid var(--line);border-radius:20px;padding:28px}
.calc>*{min-width:0}
.calc label{display:block;font-size:14px;font-weight:600;margin:0 0 6px}
.calc input{width:100%;font:inherit;font-size:16px;padding:11px 12px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink);margin-bottom:16px}
.calc input:focus{outline:2px solid var(--accent);outline-offset:1px}
.res{display:flex;flex-direction:column;gap:14px}
.res div{border-radius:14px;padding:16px 18px;background:var(--soft)}
.res span{display:block;font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;font-weight:600}
.res b{font-family:Fraunces,serif;font-size:30px;line-height:1.2;font-variant-numeric:tabular-nums}
.res .bad b{color:var(--warn)}
.res .good b{color:var(--ok)}
.small{font-size:13px;color:var(--muted)}
.offer.mig{border:2px solid var(--accent)}.offers{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.offer{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:26px;display:flex;flex-direction:column}
.offer.main{border:2px solid var(--accent)}
.offer .tag{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:8px}
.offer h3{font-size:23px;margin-bottom:6px}
.offer .price{font-weight:700;margin-bottom:12px}
.offer .price small{font-weight:500;color:var(--muted)}
.offer ul{list-style:none;flex:1;margin-bottom:18px}
.offer li{padding:5px 0 5px 24px;position:relative;font-size:15px}
.offer li::before{content:"✓";position:absolute;left:0;color:var(--accent);font-weight:700}
.steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.step{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:22px}
.step b{display:inline-flex;width:34px;height:34px;border-radius:50%;background:var(--accent);color:var(--accent-ink);align-items:center;justify-content:center;font-size:15px;margin-bottom:12px}
.step h3{font-size:19px;margin-bottom:6px}
.step p{font-size:15px;color:var(--muted)}
.about{display:grid;grid-template-columns:200px 1fr;gap:36px;align-items:center}
.about img{width:200px;height:200px;border-radius:50%;object-fit:cover;border:5px solid var(--surface)}
.about h2{font-size:clamp(26px,3.6vw,36px);margin-bottom:4px}
.about .role{color:var(--accent);font-weight:600;margin-bottom:12px}
.about p{color:var(--muted);margin-bottom:10px}
.faq{display:grid;grid-template-columns:1fr 1fr;gap:12px 28px}
details{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px 18px}
summary{font-weight:600;cursor:pointer}
details p{color:var(--muted);font-size:15px;margin-top:8px}
.contact{background:var(--navy);color:#fff;border-radius:24px;padding:44px;display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap}
.contact h2{font-size:clamp(26px,3.6vw,36px);margin-bottom:8px}
.contact p{color:rgba(255,255,255,.8)}
.contact .mail{display:block;margin-top:10px;font-size:15px;color:rgba(255,255,255,.8)}
footer{padding:32px 0 48px;color:var(--muted);font-size:13.5px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
footer a{color:var(--accent)}
.btn:focus-visible,.menu a:focus-visible,summary:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
@media (max-width:900px){.hero,.about,.calc,.faq,.why{grid-template-columns:1fr}.leaks,.offers{grid-template-columns:1fr}.steps{grid-template-columns:1fr 1fr}.strip .wrap{grid-template-columns:1fr 1fr}}
@media (max-width:640px){.menu a:not(.cta){display:none}.steps{grid-template-columns:1fr}.contact{padding:28px 20px}.brand img{height:36px}section{padding:56px 0}.about img{width:150px;height:150px}.calc{padding:20px}}
@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
</style>
</head>
<body>
<div class="top">
  <div class="wrap">
    <nav>
      <a href="/" class="brand"><img src="${BRAND}/logo-oscuro.webp" alt="OA Tech" width="184" height="46"><span>Bubble Exit</span></a>
      <div class="menu">
        <a href="#why">Why teams leave</a>
        <a href="#migration">Migration</a>
        <a href="#calculator">Calculator</a>
        <a href="#faq">FAQ</a>
        <a class="cta" href="#contact">Book a free call</a>
      </div>
    </nav>
    <header class="hero">
      <div>
        <span class="kicker">Phased migrations off Bubble.io</span>
        <h1>Own your app. <em>Own your costs.</em></h1>
        <p>Bubble got you to market fast. But workload bills grow with every user, and Bubble does not export your code. We move production apps off Bubble in phases (data, logic, then screens) without a big-bang rewrite. Not ready to leave? We start by cutting your WU bill.</p>
        <div class="ctas">
          <a href="#contact" class="btn">Plan my exit</a>
          <a href="#calculator" class="btn line">Estimate your overage</a>
        </div>
      </div>
      <div class="meter" aria-label="What moves where in a migration off Bubble">
        <h3>What moves where</h3>
        <div class="mv"><span class="from">Bubble database</span><span class="ar">→</span><span class="to">PostgreSQL you own</span></div>
        <div class="mv"><span class="from">Backend workflows</span><span class="ar">→</span><span class="to">Your own API</span></div>
        <div class="mv"><span class="from">Pages &amp; reusables</span><span class="ar">→</span><span class="to">Modern web front end</span></div>
        <div class="mv"><span class="from">Users &amp; privacy rules</span><span class="ar">→</span><span class="to">Your auth &amp; permissions</span></div>
        <p class="mnote">Typical target stack. We choose it with you, based on your team and your budget.</p>
      </div>
    </header>
  </div>
  <div class="strip">
    <div class="wrap">
      <div><b>Phased</b>no big-bang rewrite</div>
      <div><b>Your code</b>your repo, your cloud</div>
      <div><b>US Eastern hours</b>remote, English &amp; Spanish</div>
      <div><b>Your control</b>collaborator access, no passwords</div>
    </div>
  </div>
</div>

<main class="wrap">
  <section id="why">
    <div class="head">
      <span class="kick">Why teams leave Bubble</span>
      <h2>Two problems that grow with your success</h2>
      <p>Bubble is great to launch. The trouble starts when the app works and the business depends on it.</p>
    </div>
    <div class="why">
      <div>
        <span class="big">The bill</span>
        <h3>Costs scale with usage, not value</h3>
        <p>Bubble charges by workload units. Every page load, search and workflow adds up, so the bill can grow faster than your users or your revenue.</p>
        <p>One founder on the Bubble forum reported using an entire 175,000 WU monthly plan in about 2.5 hours after launch.</p>
      </div>
      <div>
        <span class="big">The lock-in</span>
        <h3>You can take your data, not your app</h3>
        <p>Your data can leave Bubble (CSV exports and the Data API). Your workflows, privacy rules and pages cannot: there is no code to export.</p>
        <p>That is why a migration has to be planned. We map every data type, workflow, plugin and API first, so nothing is lost on the way out.</p>
      </div>
    </div>
  </section>

  <section id="leaks">
    <div class="head">
      <span class="kick">Not ready to leave yet?</span>
      <h2>Stop the bleeding first: most WU waste comes from a handful of patterns</h2>
      <p>While you plan the exit, these are the leaks we fix first to buy you time and money.</p>
    </div>
    <div class="leaks">
      <div class="leak"><h3>Heavy page loads</h3><p>Searches and workflows that run on every <code>Page is loaded</code>, repeated for each visitor and each refresh.</p></div>
      <div class="leak"><h3>Searches without limits</h3><p>Pulling whole tables and filtering them with <code>:filtered</code> or advanced constraints instead of narrowing on the server.</p></div>
      <div class="leak"><h3>Chatty conditions</h3><p><code>Do when condition is true</code> events and dynamic expressions that re-evaluate far more often than needed.</p></div>
      <div class="leak"><h3>Recurring backend jobs</h3><p>Scheduled workflows that touch every record every day, even when nothing has changed.</p></div>
      <div class="leak"><h3>API calls in loops</h3><p>External calls fired per item in a list, instead of batched or cached once.</p></div>
      <div class="leak"><h3>Data model debt</h3><p>Lists on things, nested searches and missing fields that force Bubble to do expensive joins at runtime.</p></div>
    </div>
  </section>

  <section id="calculator">
    <div class="head">
      <span class="kick">Quick estimate</span>
      <h2>What is a heavy page costing you?</h2>
      <p>Enter your numbers. Bubble shows WU per page load in its workload logs. The overage rate is editable: check the current rate for your plan on Bubble's pricing page.</p>
    </div>
    <div class="calc">
      <div>
        <label for="wu">WU per page load (heaviest page)</label>
        <input id="wu" type="number" min="0" step="10" value="2000" inputmode="numeric">
        <label for="loads">Page loads per month</label>
        <input id="loads" type="number" min="0" step="100" value="20000" inputmode="numeric">
        <label for="incl">WU included in your plan</label>
        <input id="incl" type="number" min="0" step="1000" value="250000" inputmode="numeric">
        <label for="rate">Overage rate (USD per 1,000 WU)</label>
        <input id="rate" type="number" min="0" step="0.01" value="0.30" inputmode="decimal">
        <label for="cut">Expected reduction after optimization (%)</label>
        <input id="cut" type="number" min="0" max="95" step="5" value="60" inputmode="numeric">
      </div>
      <div class="res" aria-live="polite">
        <div><span>WU used by this page / month</span><b id="r1">–</b></div>
        <div class="bad"><span>Estimated overage today</span><b id="r2">–</b></div>
        <div class="good"><span>Estimated overage after optimization</span><b id="r3">–</b></div>
        <p class="small">A rough estimate for one page. It ignores the rest of your app and assumes the plan's included WU are available for this page. Reductions vary by app; the audit gives you a real figure before you spend anything on fixes.</p>
      </div>
    </div>
  </section>

  <section id="services">
    <div class="head">
      <span class="kick">Services</span>
      <h2>Start with an exit audit. Decide with numbers.</h2>
      <p>Every engagement is scoped and priced before it starts.</p>
    </div>
    <div class="offers">
      <div class="offer main">
        <span class="tag">Start here</span>
        <h3>Exit &amp; WU Audit</h3>
        <div class="price">From US$490 <small>· fixed price</small></div>
        <ul>
          <li>Inventory of data types, workflows, plugins and APIs</li>
          <li>Map of WU by page, workflow and search</li>
          <li>Cost of staying vs. hybrid vs. migrating</li>
          <li>Phased migration plan with effort and timeline</li>
          <li>60-minute walkthrough call</li>
        </ul>
        <a href="#contact" class="btn teal">Request an audit</a>
      </div>
      <div class="offer">
        <span class="tag">If you stay for now</span>
        <h3>Optimization sprint</h3>
        <div class="price">Quoted per audit <small>· 1–3 weeks</small></div>
        <ul>
          <li>We implement the fixes in a dev branch</li>
          <li>Data model and workflow refactors</li>
          <li>Before/after WU measurement</li>
          <li>Handover notes for your team</li>
        </ul>
        <a href="#contact" class="btn teal">Talk about a sprint</a>
      </div>
      <div class="offer mig">
        <span class="tag">When you are ready</span>
        <h3>Phased migration</h3>
        <div class="price">Project-based</div>
        <ul>
          <li>Data first: PostgreSQL in sync with Bubble</li>
          <li>Logic next: workflows rebuilt as your own API</li>
          <li>Screens last, or keep Bubble as front end (hybrid)</li>
          <li>Parallel run and planned cutover</li>
          <li>Code in your repository, on your cloud</li>
        </ul>
        <a href="#contact" class="btn teal">Plan my migration</a>
      </div>
    </div>
  </section>

  <section id="migration">
    <div class="head">
      <span class="kick">How a phased migration works</span>
      <h2>Leave Bubble without stopping your business</h2>
      <p>No big-bang rewrite. Your users keep working while the app moves piece by piece.</p>
    </div>
    <div class="steps">
      <div class="step"><b>1</b><h3>Free 20-min call</h3><p>Your app, your plan, your pain. We tell you honestly if leaving makes sense.</p></div>
      <div class="step"><b>2</b><h3>Exit audit</h3><p>Collaborator access, no passwords. Full inventory and the cost of each path in 5 business days.</p></div>
      <div class="step"><b>3</b><h3>Move in phases</h3><p>Data, then backend logic, then screens. Bubble and the new system run side by side.</p></div>
      <div class="step"><b>4</b><h3>Cut over</h3><p>When everything checks out, you switch. Your code, your repo, your cloud.</p></div>
    </div>
  </section>

  <section id="about">
    <div class="about">
      <img src="${PHOTO}" alt="Osvaldo Aguilar" width="200" height="200" loading="lazy">
      <div>
        <h2>Osvaldo Aguilar</h2>
        <div class="role">Systems engineer · Founder of OA Tech · Bubble developer</div>
        <p>A long career leading software, data and delivery for a French multinational pharmaceutical company across Latin America, the US, Europe and Asia, in one of the most regulated industries in the world.</p>
        <p>I build with Bubble and with code, so I can optimize inside Bubble and also tell you when part of the workload belongs on a proper backend. OA Tech is based in Bogotá, Colombia, and works remotely on US Eastern hours.</p>
      </div>
    </div>
  </section>

  <section id="faq">
    <div class="head">
      <span class="kick">FAQ</span>
      <h2>Common questions</h2>
    </div>
    <div class="faq">
      <details><summary>Can I export my app from Bubble?</summary><p>Your data, yes: CSV exports and the Data API. Your workflows, privacy rules and pages, no. Those are rebuilt, which is why we inventory them first.</p></details>
      <details><summary>Will my users notice the migration?</summary><p>The goal is that they do not. Data stays in sync and both systems run in parallel until the planned cutover.</p></details>
      <details><summary>Do you need my Bubble password?</summary><p>No. You add us as a collaborator from your app's settings, with the permissions you choose, and remove us when we finish.</p></details>
      <details><summary>Will you touch my live app?</summary><p>Not during the audit: it is read-only. Fixes are made in a development version and you decide when to deploy.</p></details>
      <details><summary>Can you guarantee savings?</summary><p>No one honest can. The audit gives you an estimate per fix, so you only pay to implement what is worth it.</p></details>
      <details><summary>Can you sign an NDA?</summary><p>Yes. We sign your NDA or provide ours before getting access.</p></details>
      <details><summary>What if staying on Bubble is cheaper?</summary><p>Then we will tell you, and help you optimize instead. The audit compares staying, going hybrid and migrating with real numbers.</p></details>
      <details><summary>Where are you based?</summary><p>Bogotá, Colombia (GMT-5, same as US Eastern in winter). Invoicing in USD.</p></details>
    </div>
  </section>

  <section id="contact">
    <div class="contact">
      <div>
        <h2>Ready to own your app?</h2>
        <p>Send your app URL, current plan and what worries you most. We reply within one business day.</p>
        <span class="mail">${EMAIL}</span>
      </div>
      <div class="ctas">
        <a href="${MAIL}" class="btn">Email us</a>
        <a href="${WA}" class="btn line" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
  </section>
</main>

<div class="wrap">
  <footer>
    <div>© 2026 OA Tech · <a href="https://oatech.com.co">oatech.com.co</a></div>
    <div>OA Tech is an independent consultancy, not affiliated with or endorsed by Bubble Group, Inc. Bubble is a trademark of its owner.</div>
  </footer>
</div>
<script>
(function(){
  var ids=['wu','loads','incl','rate','cut'];
  var fmt=function(n){return Math.round(n).toLocaleString('en-US')};
  var usd=function(n){return 'US$'+Math.round(n).toLocaleString('en-US')};
  function v(id){var x=parseFloat(document.getElementById(id).value);return isFinite(x)&&x>0?x:0}
  function calc(){
    var used=v('wu')*v('loads'), incl=v('incl'), rate=v('rate'), cut=Math.min(v('cut'),95)/100;
    var over=Math.max(0,used-incl)/1000*rate;
    var after=Math.max(0,used*(1-cut)-incl)/1000*rate;
    document.getElementById('r1').textContent=fmt(used)+' WU';
    document.getElementById('r2').textContent=usd(over)+' / mo';
    document.getElementById('r3').textContent=usd(after)+' / mo';
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
console.log("Listening: oatech-bubble v2", Bun.env.PORT || 3000);
