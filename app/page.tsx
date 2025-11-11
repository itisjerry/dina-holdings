"use client";

import React, { useEffect, useState } from "react";

// Single-file React site for Dina Holdings LLC
// - Clean JSX (no stray backslashes), fully closed tags
// - Tech-only Unsplash imagery (no people)
// - Newsletter sits ABOVE Legal + Contact in footer (inline row)
// - Legal pages are links in footer only
// - Accessible, responsive, sales-oriented copy

const baseCSS = `
:root{--bg:#ffffff;--fg:#0f172a;--muted:#5b6b7c;--primary:#0F4C81;--secondary:#38B6FF;--card:#ffffff;--ring:rgba(15,76,129,.28)}
.dark{--bg:#0b1220;--fg:#e5ecf5;--muted:#a4b0be;--card:#0f172a;--primary:#6C8DB5;--secondary:#66CCFF;--ring:rgba(102,204,255,.35)}
*{box-sizing:border-box}
html,body,#root{height:100%}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--fg);font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial}
.container{max-width:1200px;margin:0 auto;padding:0 20px}
.header{position:sticky;top:0;z-index:50;backdrop-filter:blur(8px);background:color-mix(in oklab, var(--bg) 88%, transparent);border-bottom:1px solid rgba(2,6,23,.06)}
.nav a{color:inherit;text-decoration:none;padding:10px 12px;border-radius:12px}
.nav a.active{background:rgba(15,76,129,.10);color:var(--primary);font-weight:700}
.btn{display:inline-flex;align-items:center;justify-content:center;border-radius:14px;padding:12px 18px;font-weight:800;border:2px solid var(--primary);cursor:pointer;background:var(--primary);color:#fff;transition:transform .15s ease, box-shadow .15s ease}
.btn.secondary{background:transparent;color:var(--primary)}
.btn:focus{outline:4px solid var(--ring)}
.hero{position:relative;overflow:hidden;border-radius:20px;background:linear-gradient(135deg,#eaf4ff,#f7fbff)}
.h1{font-family:Poppins,Inter,system-ui,sans-serif;font-size:48px;line-height:1.05;margin:10px 0}
.h2{font-family:Poppins,Inter,system-ui,sans-serif;font-size:32px;line-height:1.15;margin:10px 0}
.kicker{letter-spacing:.18em;text-transform:uppercase;color:var(--primary);font-weight:800;font-size:12px}
.small{color:var(--muted);font-size:14px}
.section{margin-top:40px}
.card{background:var(--card);border:1px solid rgba(2,6,23,.06);border-radius:16px;padding:18px;transition:transform .2s ease, box-shadow .2s ease}
.card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(2,6,23,.08)}
.grid{display:grid;gap:16px}
.input,select,textarea{width:100%;border-radius:12px;border:1px solid rgba(2,6,23,.12);padding:12px 12px;background:#fff;color:var(--fg)}
.input:focus,select:focus,textarea:focus{outline:4px solid var(--ring)}
.badge{display:inline-block;padding:4px 8px;border-radius:999px;background:#e9f3ff;color:#0f4c81;font-weight:700;font-size:12px}
.stat{font-size:32px;font-weight:900;color:#0f4c81}
.label{font-size:12px;color:var(--muted)}
.img{width:100%;height:260px;object-fit:cover;border-radius:12px;border:1px solid rgba(2,6,23,.06)}
.figure{display:grid;gap:10px}
.footer{margin-top:64px;border-top:1px solid rgba(2,6,23,.08);padding:32px 0}
.backToTop{position:fixed;right:16px;bottom:16px}
.cookie{position:fixed;left:50%;transform:translateX(-50%);bottom:16px;z-index:60;max-width:720px;width:95%}
@media (max-width:1024px){.hero .grid2{grid-template-columns:1fr!important}}
@media (max-width:720px){.h1{font-size:36px}.img{height:200px}}
.chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
.chip{font-size:12px;border-radius:999px;padding:4px 8px;background:rgba(15,76,129,.08);color:#0f4c81;font-weight:700}
.modal{position:fixed;inset:0;background:rgba(2,6,23,.5);display:flex;align-items:center;justify-content:center;padding:20px;z-index:80}
.modal-card{background:var(--card);border:1px solid rgba(2,6,23,.12);border-radius:16px;max-width:860px;width:100%;padding:18px;}
`;

function useTheme(){
  const [dark,setDark]=useState(false);
  useEffect(()=>{document.documentElement.classList.toggle('dark',dark);},[dark]);
  return {dark,setDark};
}

function useScrollSpy(ids:string[]){
  const [active,setActive]=useState('#'+ids[0]);
  const key = Array.isArray(ids) ? ids.join(',') : String(ids); // stable dep key
  useEffect(()=>{
    const obs=new IntersectionObserver((entries)=>{
      const vis=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
      if(vis[0]) setActive('#'+(vis[0].target as HTMLElement).id);
    },{rootMargin:"-45% 0% -50% 0%",threshold:[0,0.25,0.5,0.75,1]});
    ids.forEach(id=>{const el=document.getElementById(id); if(el) obs.observe(el);});
    return ()=>obs.disconnect();
  },[key]);
  return active;
}

// Tech-only images (no people)
const IMGS={
  hero:"https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=1600&q=80",
  services:"https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1400&q=80",
  results:"https://images.unsplash.com/photo-1551281044-8a6b5995f0d4?auto=format&fit=crop&w=1400&q=80",
  process:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
  cs1:"https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80",
  cs2:"https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80",
  cs3:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
};

const CASES=[
  {title:"Apex Logistics - Ops Portal",cat:"Web App",img:IMGS.cs1,summary:"Replaced 17 spreadsheets with one source of truth.",metrics:["Admin hours -47%","Invoice errors -32%","On time +11%"],stack:['Next.js','Node','Postgres','Auth','S3'],challenge:'Manual ops across sheets and emails created delays and errors.',solution:'Consolidated workflows into a role based portal with approvals, exports, and alerts.',impact:'Reduced admin work and improved on time rate.'},
  {title:"Sola Commerce - Headless Storefront",cat:"Ecommerce",img:IMGS.cs2,summary:"Sub 2s LCP on mobile with edge caching and optimized media.",metrics:["Checkout +23%","AOV +18%","Bounce -21%"],stack:['Next.js','Stripe','Headless CMS','Cloudflare'],challenge:'Legacy theme was slow and hard to iterate.',solution:'Headless storefront with server components, image CDNs, and checkout optimizations.',impact:'Faster pages increased conversion and AOV.'},
  {title:"Evergreen Health - Patient Onboarding",cat:"Website",img:IMGS.cs3,summary:"WCAG AA redesign with clear IA and referral flows.",metrics:["Task success +34%","Bounce -28%","Session +41%"],stack:['React','Accessibility','Analytics'],challenge:'Patients struggled to find intake, leading to phone support load.',solution:'Clear IA, forms, and content structure meeting WCAG AA.',impact:'Higher completion and lower support volume.'},
];

const FAQS=[
  {q:"How do we reduce risk up front?",a:"We do scope mapping, identify unknowns, set KPI targets, and define success criteria before code begins. No hidden work. No silent assumptions."},
  {q:"What makes your delivery different?",a:"Weekly demo loops. Every slice ships behind feature flags so you never wait 3 weeks for a reveal. You always see progress and you always control direction."},
  {q:"Can you plug into our internal dev team?",a:"Yes. We regularly ship side by side with in house teams. We align to your infra, branching model, ticketing, and engineering rituals so it feels native."},
  {q:"How do you price if scope is not fully defined?",a:"We price per outcome slice. You never pay for non value producing work. Scope is broken into milestones so nothing is vague and everything is measurable."},
  {q:"How do you handle security and data privacy?",a:"Least privilege. Zero trust mindset. Encrypted secrets. Audit trails. Dependency scan in CI. We align to your policies and hand over everything documented."},
];

function Header(){
  const {dark,setDark}=useTheme();
  const ids=['home','services','results','work','process','faqs','contact'];
  const active=useScrollSpy(ids);
  const nav=[{href:'#home',label:'Home'},{href:'#services',label:'Services'},{href:'#results',label:'Results'},{href:'#work',label:'Work'},{href:'#process',label:'Process'},{href:'#faqs',label:'FAQs'},{href:'#contact',label:'Contact'}];
  return (
    <header className="header">
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 0'}}>
        <a href="#home" style={{textDecoration:'none',color:'inherit',fontFamily:'Poppins,Inter',fontWeight:900,fontSize:22}}>Dina <span style={{color:'var(--primary)'}}>Holdings</span></a>
        <nav className="nav" aria-label="Primary" style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          {nav.map(n=> <a key={n.href} href={n.href} className={active===n.href?"active":""}>{n.label}</a>)}
        </nav>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <a href="#contact" className="btn">Start your project</a>
          <button className="btn secondary" aria-label="Toggle dark mode" onClick={()=>setDark(v=>!v)}>{dark?'☀️':'🌙'}</button>
        </div>
      </div>
    </header>
  );
}

function Hero(){
  return (
    <section id="home" className="container section hero" style={{padding:'56px 20px'}}>
      <div className="grid grid2" style={{gridTemplateColumns:'1.1fr .9fr',gap:20,alignItems:'center'}}>
        <div>
          <div className="kicker">US and Global · Web Development · Custom Apps</div>
          <h1 className="h1">Websites and apps that win more work</h1>
          <p style={{opacity:.95,maxWidth:760}}>We design and build high speed, accessible experiences that increase conversions, cut manual work, and connect cleanly to your stack. Strategy in. Code out. Results tracked.</p>
          <div style={{display:'flex',gap:12,marginTop:16,flexWrap:'wrap'}}>
            <a className="btn" href="#contact">Get a Proposal</a>
            <a className="btn secondary" href="#work">See Selected Work</a>
            <a className="btn secondary" href="#services">Explore Services</a>
          </div>
          <div className="small" style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:10}}>
            <span className="badge">Core Web Vitals in green</span>
            <span className="badge">WCAG AA</span>
            <span className="badge">Edge cached</span>
            <span className="badge">Secure and observable</span>
          </div>
        </div>
        <figure className="figure">
          <img className="img" loading="lazy" decoding="async" src={IMGS.hero} alt="Modern analytics dashboard and code on screens"/>
        </figure>
      </div>
    </section>
  );
}

function Services(){
  const featured=[
    {t:'Custom Enterprise Software',d:'We replace manual processes with secure web applications that scale and integrate with your stack.',icon:'app'},
    {t:'High Conversion Websites',d:'SEO structured, Core Web Vitals focused sites that help sales book more calls and close faster.',icon:'site'},
  ];
  const items=[
    {t:'Headless Ecommerce',d:'Storefronts focused on speed, CRO, and maintainability.',icon:'cart'},
    {t:'Systems Integration',d:'We wire CRM, ERP, auth, and payments into one source of truth.',icon:'plug'},
    {t:'Product UX Research',d:'Interviews, IA, prototypes, and A/B tests that de-risk decisions.',icon:'ux'},
    {t:'Cloud Ops',d:'Security, reliability, CI/CD, and real-time telemetry.',icon:'cloud'},
  ];
  const gets=['Technical discovery and scope','Design system and component library','Accessible UI · WCAG AA','API design and documentation','CI/CD with previews','Analytics and error tracking'];

  const Icon = ({name}:{name:string})=>{
    const common={width:24,height:24,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2};
    if(name==='app') return (<svg {...common}><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7 8h10M7 12h6M7 16h4"/></svg>);
    if(name==='site') return (<svg {...common}><path d="M3 5h18v14H3z"/><path d="M3 9h18"/><circle cx="7" cy="7" r="1"/><circle cx="11" cy="7" r="1"/><circle cx="15" cy="7" r="1"/></svg>);
    if(name==='cart') return (<svg {...common}><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/><path d="M5 6h2l2 9h8l2-6H8"/></svg>);
    if(name==='plug') return (<svg {...common}><path d="M8 3v6M16 3v6"/><path d="M6 9h12v3a6 6 0 1 1-12 0z"/></svg>);
    if(name==='ux') return (<svg {...common}><circle cx="12" cy="8" r="3"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>);
    if(name==='cloud') return (<svg {...common}><path d="M5 17a4 4 0 0 1 0-8 5 5 0 0 1 9.5-1.5A4 4 0 1 1 17 17H5z"/></svg>);
    if(name==='check') return (<svg {...common}><path d="M20 6L9 17l-5-5"/></svg>);
    if(name==='shield') return (<svg {...common}><path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7z"/></svg>);
    if(name==='speed') return (<svg {...common}><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/><path d="M12 12l5-3"/></svg>);
    return null;
  };

  return (
    <section id="services" className="container section">
      <div className="card" style={{background:'linear-gradient(135deg,#f6faff,transparent)'}}>
        <div style={{textAlign:'center',marginBottom:10}}>
          <div className="kicker">What We Build</div>
          <h2 className="h2">Web Products That Support Revenue Directly</h2>
          <p className="small">Choose a project or a product partnership. We scope to outcomes and prove value with measurable KPIs.</p>
        </div>

        {/* Featured */}
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',justifyItems:'center'}}>
          {featured.map((x,i)=> (
            <article key={i} className="card" style={{maxWidth:480,textAlign:'left',display:'grid',gap:8}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span className="badge" style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name={x.icon}/> {x.t}</span>
              </div>
              <p className="small">{x.d}</p>
              <ul className="small" style={{display:'grid',gap:6,paddingLeft:18}}>
                {i===0 && (<>
                  <li>Role based access, audit trails, and typed APIs</li>
                  <li>Workflow automation and exports your team needs</li>
                  <li>Observability baked in · logs, metrics, traces</li>
                </>)}
                {i===1 && (<>
                  <li>Search-optimized content structure and schema</li>
                  <li>Fast interactions with Core Web Vitals in green</li>
                  <li>Conversion-oriented IA that helps sales close</li>
                </>)}
              </ul>
            </article>
          ))}
        </div>

        {/* Support grid */}
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',marginTop:16}}>
          {items.map((x,i)=> (
            <article key={i} className="card" style={{display:'grid',gap:8}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span className="badge" style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name={x.icon}/> {x.t}</span>
              </div>
              <p className="small">{x.d}</p>
            </article>
          ))}
        </div>

        {/* What you get */}
        <div className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>Included in every build</h3>
          <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))'}}>
            {gets.map(g=> (
              <div key={g} className="small" style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{color:'var(--primary)'}}><Icon name="check"/></span> {g}
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',marginTop:16}}>
          <div className="card" style={{display:'flex',alignItems:'center',gap:10}}><span style={{color:'var(--primary)'}}><Icon name="speed"/></span><div><b>Performance</b><div className="label">Targets set for LCP, CLS, and TTFB</div></div></div>
          <div className="card" style={{display:'flex',alignItems:'center',gap:10}}><span style={{color:'var(--primary)'}}><Icon name="shield"/></span><div><b>Security</b><div className="label">Least privilege and dependency scanning</div></div></div>
          <div className="card" style={{display:'flex',alignItems:'center',gap:10}}><span style={{color:'var(--primary)'}}><Icon name="check"/></span><div><b>Accessibility</b><div className="label">WCAG AA checks in design and QA</div></div></div>
        </div>
      </div>
    </section>
  );
}

function Results(){
  const tabs=['Performance','Reliability','Security','DX & Ops'];
  const [tab,setTab]=useState('Performance');
  const data:{
    [k:string]: {v:string; l:string; spark:number[]}[];
  }={
    'Performance': [
      {v:'1.3 s',l:'Largest Contentful Paint (mobile)',spark:[650,610,590,540,510,520]},
      {v:'180 ms',l:'Time to First Byte (edge)',spark:[210,205,198,192,186,180]},
      {v:'0.01',l:'Cumulative Layout Shift',spark:[0.06,0.05,0.03,0.02,0.02,0.01]},
    ],
    'Reliability': [
      {v:'99.99%',l:'Uptime on managed hosting',spark:[99.9,99.92,99.95,99.97,99.99,99.99]},
      {v:'-55%',l:'Error rate after instrumentation',spark:[1.0,0.95,0.82,0.6,0.52,0.45]},
      {v:'< 5 min',l:'Mean time to acknowledge',spark:[14,10,9,7,6,5]},
    ],
    'Security': [
      {v:'0 critical',l:'Dependency vulns after scan',spark:[4,3,2,1,0,0]},
      {v:'SCA + SAST',l:'Checks in CI pipeline',spark:[1,2,3,3,3,4]},
      {v:'PII safe',l:'Secrets and access rotation',spark:[40,60,70,80,95,100]},
    ],
    'DX & Ops': [
      {v:'< 10 min',l:'Typical PR cycle time',spark:[35,28,20,16,12,9]},
      {v:'CI/CD',l:'Automated deploy with preview',spark:[20,40,60,80,90,100]},
      {v:'A/B ready',l:'Experiment hooks in place',spark:[10,20,35,55,70,85]},
    ]
  };

  const Spark = ({values}:{values:number[]})=>{
    const w=140,h=36,p=2; 
    const xs=values.map((_,i)=>i*(w-p*2)/(values.length-1)+p); 
    const ys=(()=>{const max=Math.max(...values),min=Math.min(...values);return values.map(v=>h-p-((v-min)/(max-min||1))*(h-p*2));})();
    const d=values.map((v,i)=>`${i?'L':'M'}${xs[i].toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
    return (<svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="spark" aria-hidden="true"><path d={d} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.8"/></svg>);
  };

  return (
    <section id="results" className="container section">
      <div style={{display:'grid',gap:12}}>
        <div>
          <div className="kicker">Engineering Proof & Business Impact</div>
          <h2 className="h2">Metrics That Move Revenue</h2>
          <p className="small">We ship for Core Web Vitals, reliability, and secure operations so your site and apps convert and stay healthy.</p>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          {tabs.map(t=> (
            <button key={t} className={`btn ${tab===t? '':'secondary'}`} onClick={()=>setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))'}}>
          {data[tab].map((kpi,idx)=> (
            <article key={idx} className="card" style={{display:'grid',gap:6}}>
              <div className="stat">{kpi.v}</div>
              <div className="label">{kpi.l}</div>
              <div style={{color:'var(--primary)'}}><Spark values={kpi.spark}/></div>
            </article>
          ))}
        </div>
        <div className="small" style={{opacity:.9}}>How we measure: Lighthouse lab plus real user monitoring, error tracking, uptime alerts, and CI security checks.</div>
      </div>
    </section>
  );
}

function Work(){
  const [filter,setFilter]=useState('All');
  const [open,setOpen]=useState<null | typeof CASES[number]>(null);
  const cats=['All','Website','Web App','Ecommerce'];
  const list=filter==='All'?CASES:CASES.filter(c=>c.cat===filter);
  return (
    <section id="work" className="container section">
      <h2 className="h2">Selected Work</h2>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',margin:'8px 0 16px'}}>
        {cats.map(c=> (
          <button key={c} className={`btn ${filter===c? '':'secondary'}`} onClick={()=>setFilter(c)}>{c}</button>
        ))}
      </div>
      <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))'}}>
        {list.map((c,i)=> (
          <article key={i} className="card" style={{display:'grid',gap:8}}>
            <img className="img" loading="lazy" decoding="async" src={c.img} alt={c.title}/>
            <div>
              <div className="badge">{c.cat}</div>
              <h3 style={{margin:'6px 0',fontWeight:900}}>{c.title}</h3>
              <p className="small">{c.summary}</p>
              {c.stack && <div className="chips">{c.stack.map(s=> <span className="chip" key={s}>{s}</span>)}</div>}
              <ul className="small" style={{display:'grid',gap:4,marginTop:6,paddingLeft:18}}>
                {c.metrics.map(m=> <li key={m}>{m}</li>)}
              </ul>
              <div style={{marginTop:8,display:'flex',gap:8}}>
                <button className="btn" onClick={()=>setOpen(c)}>View details</button>
                <a className="btn secondary" href="#contact">Request similar</a>
              </div>
            </div>
          </article>
        ))}
        {open && (
          <div className="modal" onClick={()=>setOpen(null)}>
            <div className="modal-card" onClick={e=>e.stopPropagation()}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,alignItems:'start'}}>
                <img className="img" loading="lazy" decoding="async" src={open.img} alt={open.title} />
                <div>
                  <div className="badge">{open.cat}</div>
                  <h3 style={{margin:'6px 0',fontWeight:900}}>{open.title}</h3>
                  <p className="small">{open.summary}</p>
                  {open.stack && <div className="chips">{open.stack.map(s=> <span className="chip" key={s}>{s}</span>)}</div>}
                  <div className="grid" style={{gridTemplateColumns:'1fr 1fr',marginTop:8}}>
                    <div className="card"><b>Challenge</b><p className="small">{open.challenge}</p></div>
                    <div className="card"><b>Solution</b><p className="small">{open.solution}</p></div>
                  </div>
                  <div className="card" style={{marginTop:8}}><b>Impact</b><p className="small">{open.impact}</p></div>
                  <div style={{display:'grid',gap:8,marginTop:8}}>
                    <a className="btn" href="#contact">Start a similar project</a>
                    <button className="btn secondary" onClick={()=>setOpen(null)}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Process(){
  const steps=[
    {t:'Discovery and Scope',d:'We agree on goals, risks, and success metrics. Clear SOW and timeline.'},
    {t:'Design and Validate',d:'Wireframes to prototypes to UI system. Test with users when needed.'},
    {t:'Build and Integrate',d:'Feature slices with CI/CD, telemetry, and security checks from day one.'},
    {t:'Launch and Optimize',d:'Ship, measure, and iterate to keep KPIs moving in the right direction.'},
  ];
  return (
    <section id="process" className="container section">
      <div className="card" style={{background:'linear-gradient(135deg,#f1fbff,transparent)'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,alignItems:'center'}}>
          <div>
            <div className="kicker">How We Work</div>
            <h2 className="h2">Delivery Method: Fast, Visible, Low Risk</h2>
            <p className="small">Four loops. Weekly demos. No guessing. Your KPIs and risk register stay visible the whole way.</p>
            <ol className="small" style={{display:'grid',gap:8,marginTop:8}}>
              {steps.map((s,i)=>(<li key={i}><b>{i+1}. {s.t}:</b> {s.d}</li>))}
            </ol>
          </div>
          <img className="img" loading="lazy" decoding="async" src={IMGS.process} alt="System architecture diagram on screen"/>
        </div>
      </div>
    </section>
  );
}

function FAQs(){
  const [open,setOpen]=useState<number[]>([]);
  const toggle=(i:number)=> setOpen(prev=> prev.includes(i)? prev.filter(x=>x!==i) : [...prev,i]);
  const toBullets=(text:string)=> text.split(". ").filter(Boolean).map(s=> s.replace(/\.$/, "")) .slice(0,6);
  const LAST = FAQS.length;
  return (
    <section id="faqs" className="container section" aria-labelledby="faqs-title">
      <div>
        <div className="kicker">Answers You Need</div>
        <h2 id="faqs-title" className="h2">Frequently Asked Questions</h2>
        <p className="small">Clear, practical details about scope, delivery, pricing, and security.</p>
      </div>

      <div className="grid" style={{gridTemplateColumns:'1fr 1fr',gap:16,marginTop:12}} role="list">
        {FAQS.map((f,i)=> {
          const isOpen=open.includes(i);
          const bullets=toBullets(f.a);
          return (
            <article key={i} className="card" role="listitem">
              <button onClick={()=>toggle(i)} className="btn secondary" style={{width:'100%',justifyContent:'space-between'}} aria-controls={`faq-panel-${i}`} aria-expanded={isOpen}>
                <span style={{fontWeight:800,textAlign:'left'}}>{f.q}</span>
                <span>{isOpen? "−" : "+"}</span>
              </button>
              <div id={`faq-panel-${i}`} style={{display:isOpen?'block':'none',marginTop:8}}>
                <ul className="small" style={{margin:0,paddingLeft:18,display:'grid',gap:6}}>
                  {bullets.map((b,idx)=> <li key={idx}>{b}</li>)}
                </ul>
                <div style={{marginTop:10}}>
                  <a href="#contact" className="btn">Get a tailored answer</a>
                </div>
              </div>
            </article>
          );
        })}
        {/* Last FAQ styled same as others */}
        <article className="card" role="listitem">
          <button onClick={()=>toggle(LAST)} className="btn secondary" style={{width:'100%',justifyContent:'space-between'}} aria-controls={`faq-panel-${LAST}`} aria-expanded={open.includes(LAST)}>
            <span style={{fontWeight:800,textAlign:'left'}}>Still have a question?</span>
            <span>{open.includes(LAST)? "−" : "+"}</span>
          </button>
          <div id={`faq-panel-${LAST}`} style={{display:open.includes(LAST)?'block':'none',marginTop:8}}>
            <div className="small">Tell us the context and we’ll reply with a precise answer.</div>
            <div style={{marginTop:10}}>
              <a className="btn" href="#contact">Get My Answer</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Contact(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [company,setCompany]=useState("");
  const [type,setType]=useState("Website");
  const [budget,setBudget]=useState(50); // thousands
  const [timeline,setTimeline]=useState("4-8 weeks");
  const [nda,setNda]=useState(false);
  const [message,setMessage]=useState("");
  const [files,setFiles]=useState<File[]>([]);
  const [link,setLink]=useState("");
  const [scopes,setScopes]=useState<{[k:string]:boolean}>({Login:false,Dashboard:false,CMS:false,Ecommerce:false,Payments:false,Reporting:false,Integrations:false,Multitenant:false,Other:false});

  const emailValid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const onSubmit=(e:React.FormEvent)=>{ e.preventDefault(); alert("Thanks. We will send a proposal outline shortly."); };

  const chosenScopes=Object.entries(scopes).filter(([,v])=>v).map(([k])=>k);
  const pkg=budget<=40?'Starter':budget<=120?'Growth':'Enterprise';

  return (
    <section id="contact" className="container section">
      <div className="card" style={{display:'grid',gap:16}}>
        <div style={{textAlign:'center'}}>
          <div className="kicker">Start Here</div>
          <h2 className="h2">Tell us about your project</h2>
          <p className="small">Get a quick scope, budget guidance, and timeline suggestion based on your inputs.</p>
        </div>
        <div className="grid" style={{gridTemplateColumns:'1.1fr .9fr',gap:16}}>
          <form onSubmit={onSubmit} className="card" style={{display:'grid',gap:12}}>
            <div>
              <label className="small">Name</label>
              <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
            </div>
            <div>
              <label className="small">Email</label>
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
              {!emailValid && email && <div className="label">Please enter a valid email</div>}
            </div>
            <div>
              <label className="small">Company</label>
              <input className="input" value={company} onChange={e=>setCompany(e.target.value)} />
            </div>
            <div>
              <label className="small">Project Type</label>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {["Website","Web App","Ecommerce","Other"].map(opt=> (
                  <label key={opt} className="small" style={{display:'inline-flex',gap:6,alignItems:'center',border:'1px solid rgba(2,6,23,.12)',padding:'8px 10px',borderRadius:12}}>
                    <input type="radio" name="ptype" value={opt} checked={type===opt} onChange={()=>setType(opt)} /> {opt}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="small">Budget (in USD thousands)</label>
              <input className="input" type="range" min={10} max={250} step={5} value={budget} onChange={e=>setBudget(Number(e.target.value))} />
              <div className="label">Selected: ${budget}k</div>
            </div>
            <div>
              <label className="small">Timeline</label>
              <select className="input" value={timeline} onChange={e=>setTimeline(e.target.value)}>
                <option>2-4 weeks</option>
                <option>4-8 weeks</option>
                <option>8-12 weeks</option>
                <option>Flexible</option>
              </select>
            </div>
            <div>
              <label className="small">Attach files or references</label>
              <input className="input" type="file" multiple onChange={e=>setFiles(Array.from(e.target.files||[]))} />
              <div className="label">{files.length} file(s) selected</div>
            </div>
            <div>
              <label className="small" style={{display:'inline-flex',gap:8,alignItems:'center'}}>
                <input type="checkbox" checked={nda} onChange={e=>setNda(e.target.checked)} /> NDA required
              </label>
            </div>
            <div>
              <label className="small">Scope checklist</label>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:8}}>
                {Object.keys(scopes).map(k=> (
                  <label key={k} className="small" style={{display:'inline-flex',gap:6,alignItems:'center'}}>
                    <input type="checkbox" checked={scopes[k]} onChange={e=>setScopes({...scopes,[k]:e.target.checked})} /> {k}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="small">Share Google Drive or Figma link</label>
              <input className="input" placeholder="https://drive.google.com/... or https://www.figma.com/file/..." value={link} onChange={e=>setLink(e.target.value)} />
            </div>
            <div>
              <label className="small">Message</label>
              <textarea className="input" rows={6} placeholder="Goals, users, key features" value={message} onChange={e=>setMessage(e.target.value)} />
            </div>
            <button className="btn" disabled={!emailValid || !name}>Request Proposal</button>
          </form>
          <aside className="card">
            <h3 style={{marginTop:0}}>Instant summary</h3>
            <ul className="small" style={{display:'grid',gap:6,paddingLeft:18}}>
              <li><b>Name:</b> {name || 'Not provided'}</li>
              <li><b>Email:</b> {email || 'Not provided'}</li>
              <li><b>Company:</b> {company || 'Not provided'}</li>
              <li><b>Type:</b> {type}</li>
              <li><b>Budget target:</b> ${budget}k</li>
              <li><b>Preferred timeline:</b> {timeline}</li>
              <li><b>NDA:</b> {nda? 'Yes' : 'No'}</li>
              <li><b>Files:</b> {files.length}</li>
              <li><b>Shared link:</b> {link || 'None'}</li>
              <li><b>Scope:</b> {chosenScopes.length? chosenScopes.join(', ') : 'Not selected'}</li>
            </ul>
            <p className="small" style={{marginTop:8}}>Recommended track: <b>{pkg}</b>. We will reply with milestones, risks, and a delivery schedule aligned to this profile.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer className="footer">
      <div className="container" style={{display:'grid',gap:20}}>
        <div className="card" style={{display:'grid',gridTemplateColumns:'1fr auto',gap:12,alignItems:'center'}}>
          <div>
            <h3 className="h2" style={{fontSize:22,margin:'6px 0'}}>Ready to move faster</h3>
            <p className="small">Get a proposal with timeline and budget guidance for your project.</p>
          </div>
          <a className="btn" href="#contact">Start your project</a>
        </div>
        {/* Newsletter (moved above legal + contact). Inline row layout */}
        <div style={{justifySelf:'end', width:'min(720px,100%)'}}>
          <h4 style={{margin:'4px 0'}}>Newsletter</h4>
          <form onSubmit={(e)=>{e.preventDefault();alert('Thanks. Please check your inbox.');}} style={{display:'flex',gap:8,marginTop:8}}>
            <input required type="email" placeholder="you@company.com" className="input" style={{flex:1}}/>
            <button className="btn" type="submit">Subscribe</button>
          </form>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:20}}>
          <div>
            <div style={{fontFamily:'Poppins,Inter',fontSize:22,fontWeight:900}}>Dina <span style={{color:'var(--primary)'}}>Holdings</span></div>
            <p className="small" style={{marginTop:8}}>Innovation · Integrity · Performance · Transparency · Partnership</p>
            <div className="small" style={{marginTop:8}}>
              <a className="link" href="https://www.dinaholdingsllc.net" aria-label="LinkedIn" style={{marginRight:10}}>LinkedIn</a>
              <a className="link" href="https://www.dinaholdingsllc.net" aria-label="GitHub">GitHub</a>
            </div>
            <div className="small" style={{marginTop:8}}>© {new Date().getFullYear()} Dina Holdings LLC. All rights reserved.</div>
          </div>
          <div>
            <h4 style={{margin:'4px 0'}}>Navigation</h4>
            <ul className="small" style={{listStyle:'none',padding:0,margin:0,display:'grid',gap:8}}>
              <li><a className="link" href="#home">Home</a></li>
              <li><a className="link" href="#services">Services</a></li>
              <li><a className="link" href="#results">Results</a></li>
              <li><a className="link" href="#work">Work</a></li>
              <li><a className="link" href="#process">Process</a></li>
              <li><a className="link" href="#faqs">FAQs</a></li>
              <li><a className="link" href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{margin:'4px 0'}}>Legal</h4>
            <ul className="small" style={{listStyle:'none',padding:0,margin:0,display:'grid',gap:8}}>
              <li><a className="link" href="https://www.dinaholdingsllc.net/privacy">Privacy Policy</a></li>
              <li><a className="link" href="https://www.dinaholdingsllc.net/terms">Terms and Conditions</a></li>
              <li><a className="link" href="https://www.dinaholdingsllc.net/refund">Refund and Cancellation Policy</a></li>
              <li><a className="link" href="https://www.dinaholdingsllc.net/cookie">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{margin:'4px 0'}}>Contact</h4>
            <address className="small" style={{fontStyle:'normal'}}>1209, Mountain Road PL NE STE N Albuquerque, NM 87110<br/>
              <a className="link" href="tel:+12342165249">+1 (234) 216-5153</a><br/>
              <a className="link" href="mailto:ceo@dinaholdingsllc.net">ceo@dinaholdingsllc.net</a>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BackToTop(){
  const [v,setV]=useState(false);
  useEffect(()=>{
    const on=()=> setV(window.scrollY>400);
    on(); window.addEventListener('scroll',on); return ()=>window.removeEventListener('scroll',on);
  },[]);
  if(!v) return null;
  return <a href="#home" className="btn backToTop">Top</a>;
}

function CookieConsent(){
  const [ok,setOk]=useState(()=> (typeof window!=="undefined" && localStorage.getItem('cookie-ok')==='1'));
  if(ok) return null;
  return (
    <div className="card cookie" role="dialog" aria-live="polite">
      <div className="small">We use necessary cookies and anonymous analytics. You can review details in our <a className="link" href="https://www.dinaholdingsllc.net/cookie">Cookie Policy</a>.</div>
      <div style={{marginTop:8,display:'flex',gap:8,justifyContent:'flex-end'}}>
        <button className="btn secondary" onClick={()=>{setOk(true);if(typeof window!=="undefined"){localStorage.setItem('cookie-ok','1');}}}>Dismiss</button>
        <button className="btn" onClick={()=>{setOk(true);if(typeof window!=="undefined"){localStorage.setItem('cookie-ok','1');}}}>Accept</button>
      </div>
    </div>
  );
}

export default function App(){
  // Inject base CSS once
  useEffect(()=>{
    const style=document.createElement('style');
    style.setAttribute('data-app','dina-css');
    style.innerHTML=baseCSS; document.head.appendChild(style);
    return ()=>{try{document.head.removeChild(style);}catch{}}
  },[]);

  return (
    <>
      <Header/>
      <Hero/>
      <Services/>
      <Results/>
      <Work/>
      <Process/>
      <FAQs/>
      <Contact/>
      <Footer/>
      <BackToTop/>
      <CookieConsent/>
    </>
  );
}
