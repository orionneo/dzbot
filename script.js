
(() => {
  const cfg = window.DZBOT_CONFIG || {};
  const waText = encodeURIComponent("Olá! Conheci o DZbot pelo site e quero um orçamento personalizado para minha guild/PT no RubinOT.");
  const wa = `https://wa.me/${cfg.whatsapp || "5519997988952"}?text=${waText}`;
  document.querySelectorAll("[data-contact]").forEach(a => {
    a.href = wa; a.target = "_blank"; a.rel = "noopener noreferrer";
  });

  const featureData = {
    player:{tag:"PLAYER TRACKER",title:"Saiba quando o player entra — e o que isso significa.",text:"Veja atividade, sessão, level e contexto de PT sem precisar ficar atualizando páginas.",points:["Alertas de entrada e saída","Contexto de vocação e level","Friend / Enemy / Watch"],img:"assets/screens/friend-online.webp"},
    guild:{tag:"GUILD WATCH",title:"Transforme uma guild inteira em radar operacional.",text:"Centralize a movimentação de vários personagens e acompanhe a atividade no Discord.",points:["Visão de grupo","Atividade centralizada","Contexto por servidor"],img:"assets/screens/daily.webp"},
    boss:{tag:"BOSS INTELLIGENCE",title:"Descubra onde vale colocar sua atenção.",text:"Use radar, histórico e níveis de atenção para priorizar bosses importantes sem fabricar certeza.",points:["Radar operacional","Níveis de atenção","Contexto histórico"],img:"assets/art/boss.webp"},
    bazaar:{tag:"BAZAAR INTELLIGENCE",title:"Pare de varrer leilão no braço.",text:"Top 10, filtros, watch e interesse ajudam a destacar oportunidades do Bazaar RubinOT.",points:["Top por vocação","Watch de oportunidade","Acesso rápido ao leilão"],img:"assets/screens/bazaar.webp"},
    death:{tag:"DEATH INTELLIGENCE",title:"Uma morte vira informação, não só notificação.",text:"Classifique PvE/PvP, veja responsável e histórico recente do personagem.",points:["PvE / PvP","Responsável","Histórico recente"],img:"assets/screens/death.webp"},
    skills:{tag:"SKILL WATCH",title:"Acompanhe as skills que realmente importam.",text:"Ranking observado por categoria com atualização automática quando a fonte oferece cobertura.",points:["Distance / ML / Shield","Top observado","Mudanças automáticas"],img:"assets/screens/skills.webp"},
    dna:{tag:"PLAYER DNA",title:"Entenda o padrão do player ao longo do tempo.",text:"Ritmo, consistência, grinder e sobrevivência transformam histórico em perfil operacional.",points:["Ritmo","Consistência","Padrões observados"],img:"assets/screens/dna.webp"},
    daily:{tag:"DZ DAILY",title:"Comece o dia sabendo o que aconteceu.",text:"Resumo com aliados online, evolução, mortes e eventos observados em um único card.",points:["Online agora","Evolução 24h","Mortes e eventos"],img:"assets/screens/daily.webp"},
    war:{tag:"WAR ROOM",title:"Organize sinais antes da decisão.",text:"Friends, enemies e watch ficam prontos para leitura rápida da PT.",points:["Enemy activity","Watch","PT online"],img:"assets/screens/enemy-offline.webp"},
    rank:{tag:"RANKINGS",title:"Veja quem evoluiu, quem jogou e onde houve pressão.",text:"Rankings por período deixam performance e atividade legíveis.",points:["Evolução","Mais ativos","Mortes / pressão"],img:"assets/screens/closing.webp"},
    alerts:{tag:"SMART ALERTS",title:"O importante chega no canal certo.",text:"Reduza a dependência de consultas manuais com alertas de mudanças relevantes.",points:["Entrada / saída","Level e morte","Contexto de PT"],img:"assets/screens/player-offline.webp"},
    custom:{tag:"SERVIDOR SOB MEDIDA",title:"Cada cliente recebe sua própria composição.",text:"Módulos, canais e experiência podem ser ajustados ao jeito que a guild ou PT opera.",points:["Isolamento por servidor","Canais definidos","Composição personalizada"],img:"assets/screens/player-card.webp"}
  };

  function activateFeature(key, scroll=false){
    const d=featureData[key]; if(!d) return;
    document.querySelectorAll(".feature-card").forEach(b=>b.classList.toggle("active",b.dataset.feature===key));
    document.getElementById("stageTag").textContent=d.tag;
    document.getElementById("stageTitle").textContent=d.title;
    document.getElementById("stageText").textContent=d.text;
    document.getElementById("stagePoints").innerHTML=d.points.map(x=>`<span>✓ ${x}</span>`).join("");
    const img=document.getElementById("stageImage"); img.src=d.img; img.alt=d.tag;
    if(scroll) document.getElementById("featureStage").scrollIntoView({behavior:"smooth",block:"center"});
  }
  document.querySelectorAll(".feature-card").forEach(b=>b.addEventListener("click",()=>activateFeature(b.dataset.feature)));
  document.querySelectorAll("[data-open-feature]").forEach(a=>a.addEventListener("click",()=>setTimeout(()=>activateFeature(a.dataset.openFeature,true),350)));
  activateFeature("player");

  const cards=[...document.querySelectorAll(".gallery-card")], gallery=document.getElementById("gallery");
  let gi=0;
  function goGallery(i){
    gi=(i+cards.length)%cards.length;
    cards[gi].scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"});
    document.getElementById("galleryTitle").textContent=cards[gi].querySelector("b").textContent;
    document.getElementById("galleryCounter").textContent=String(gi+1).padStart(2,"0")+" / "+String(cards.length).padStart(2,"0");
  }
  document.querySelector("[data-gallery-prev]").addEventListener("click",()=>goGallery(gi-1));
  document.querySelector("[data-gallery-next]").addEventListener("click",()=>goGallery(gi+1));

  const lb=document.getElementById("lightbox"), lbImg=lb.querySelector("img"), lbLabel=document.getElementById("lightboxLabel");
  document.querySelectorAll("[data-shot]").forEach(b=>b.addEventListener("click",()=>{
    lbImg.src=`assets/screens/${b.dataset.shot}.webp`;
    lbLabel.textContent=b.querySelector("b")?.textContent || "DZbot";
    lb.classList.add("open"); lb.setAttribute("aria-hidden","false");
  }));
  function closeLb(){lb.classList.remove("open");lb.setAttribute("aria-hidden","true")}
  document.querySelector(".lightbox-close").addEventListener("click",closeLb);
  lb.addEventListener("click",e=>{if(e.target===lb)closeLb()});
  window.addEventListener("keydown",e=>{if(e.key==="Escape")closeLb()});

  const menuBtn=document.querySelector(".mobile-menu"), nav=document.querySelector(".nav-links");
  menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  const sections=[...document.querySelectorAll("main section[id]")];
  const navAs=[...nav.querySelectorAll("a[href^='#']")];
  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        navAs.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id));
      }
    })
  },{rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(s=>sectionObserver.observe(s));

  const revealObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");revealObs.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll(".reveal").forEach(el=>revealObs.observe(el));

  const glow=document.querySelector(".cursor-light");
  if(matchMedia("(pointer:fine)").matches) addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"},{passive:true});
})();


(() => {
  // Scroll progress + nav state
  const progress = document.getElementById("scrollProgress");
  const nav = document.querySelector(".site-nav");
  function onScroll(){
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? (scrollY / max) * 100 : 0;
    if(progress) progress.style.width = pct + "%";
    nav?.classList.toggle("scrolled", scrollY > 20);
  }
  addEventListener("scroll", onScroll, {passive:true}); onScroll();

  // Decorative particles (low-cost)
  const pf = document.getElementById("particleField");
  if(pf && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    for(let i=0;i<26;i++){
      const dot=document.createElement("i");
      dot.style.left=(Math.random()*100)+"%";
      dot.style.top=(Math.random()*100)+"%";
      dot.style.animationDuration=(10+Math.random()*18)+"s";
      dot.style.animationDelay=(-Math.random()*18)+"s";
      dot.style.opacity=(.08+Math.random()*.18);
      pf.appendChild(dot);
    }
  }

  // Magnetic CTAs on fine pointer only
  if(matchMedia("(pointer:fine)").matches){
    document.querySelectorAll(".magnetic").forEach(el=>{
      el.addEventListener("pointermove",e=>{
        const r=el.getBoundingClientRect();
        const x=(e.clientX-r.left-r.width/2)*.10;
        const y=(e.clientY-r.top-r.height/2)*.10;
        el.style.transform=`translate(${x}px,${y}px)`;
      });
      el.addEventListener("pointerleave",()=>el.style.transform="");
    });

    // Subtle 3D tilt hero monitor
    const root=document.querySelector("[data-tilt-root]");
    const win=root?.querySelector(".main-window");
    root?.addEventListener("pointermove",e=>{
      const r=root.getBoundingClientRect();
      const rx=((e.clientY-r.top)/r.height-.5)*-5;
      const ry=((e.clientX-r.left)/r.width-.5)*7;
      if(win) win.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    root?.addEventListener("pointerleave",()=>{ if(win) win.style.transform=""; });

    // Feature card mouse tilt
    document.querySelectorAll(".feature-card").forEach(card=>{
      card.addEventListener("pointermove",e=>{
        const r=card.getBoundingClientRect();
        const rx=((e.clientY-r.top)/r.height-.5)*-3;
        const ry=((e.clientX-r.left)/r.width-.5)*4;
        card.style.transform=`translateY(-3px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener("pointerleave",()=>card.style.transform="");
    });
  }

  // Kinetic rotating cards
  const track=document.getElementById("kineticTrack");
  if(track){
    const cards=[...track.querySelectorAll("[data-kc]")];
    const dots=document.getElementById("kineticDots");
    let idx=0, timer=null, paused=false;

    cards.forEach((_,i)=>{
      const b=document.createElement("button");
      b.setAttribute("aria-label",`Destaque ${i+1}`);
      b.addEventListener("click",()=>{idx=i;render();restart();});
      dots.appendChild(b);
    });

    function render(){
      cards.forEach((c,i)=>{
        c.classList.remove("active","prev-card","next-card");
        const prev=(idx-1+cards.length)%cards.length, next=(idx+1)%cards.length;
        if(i===idx)c.classList.add("active");
        else if(i===prev)c.classList.add("prev-card");
        else if(i===next)c.classList.add("next-card");
      });
      [...dots.children].forEach((d,i)=>d.classList.toggle("active",i===idx));
    }
    function next(){idx=(idx+1)%cards.length;render()}
    function prev(){idx=(idx-1+cards.length)%cards.length;render()}
    function restart(){
      clearInterval(timer);
      if(!paused && !matchMedia("(prefers-reduced-motion: reduce)").matches) timer=setInterval(next,4200);
    }
    document.querySelector("[data-kinetic-next]")?.addEventListener("click",()=>{next();restart()});
    document.querySelector("[data-kinetic-prev]")?.addEventListener("click",()=>{prev();restart()});
    track.addEventListener("mouseenter",()=>{paused=true;clearInterval(timer)});
    track.addEventListener("mouseleave",()=>{paused=false;restart()});

    // swipe
    let startX=null;
    track.addEventListener("pointerdown",e=>{startX=e.clientX});
    track.addEventListener("pointerup",e=>{
      if(startX===null)return;
      const dx=e.clientX-startX;
      if(Math.abs(dx)>45){dx<0?next():prev();restart()}
      startX=null;
    });
    render(); restart();
  }

  // Section reveal stagger
  document.querySelectorAll(".feature-list,.process-grid,.intelligence-grid").forEach(group=>{
    [...group.children].forEach((el,i)=>el.style.transitionDelay=(i%6)*55+"ms");
  });
})();


(() => {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer:fine)").matches;
  const root = document.documentElement;

  // Ambient gradients follow pointer and scroll with CSS variables.
  if(finePointer && !reduceMotion){
    addEventListener("pointermove", e => {
      root.style.setProperty("--mx", e.clientX + "px");
      root.style.setProperty("--my", e.clientY + "px");
    }, {passive:true});
  }
  addEventListener("scroll", () => root.style.setProperty("--scroll-y", Math.round(scrollY)), {passive:true});

  // Sliding active nav pill.
  const nav = document.getElementById("mainNav");
  const pill = document.getElementById("navActivePill");
  const navItems = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];

  function movePillTo(el, immediate=false){
    if(!pill || !el || innerWidth <= 720) return;
    const nr = nav.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if(immediate) pill.style.transition = "none";
    pill.style.width = r.width + "px";
    pill.style.transform = `translateX(${r.left - nr.left - 4}px)`;
    if(immediate) requestAnimationFrame(()=>pill.style.transition="");
  }

  function activeNavItem(){
    return navItems.find(a=>a.classList.contains("active")) || navItems[0];
  }
  requestAnimationFrame(()=>movePillTo(activeNavItem(), true));
  addEventListener("resize", ()=>movePillTo(activeNavItem(), true));

  const navWatch = new MutationObserver(()=>{
    const current=activeNavItem();
    if(current) movePillTo(current);
  });
  navItems.forEach(a=>navWatch.observe(a,{attributes:true,attributeFilter:["class"]}));
  navItems.forEach(a=>{
    a.addEventListener("mouseenter",()=>movePillTo(a));
    a.addEventListener("mouseleave",()=>movePillTo(activeNavItem()));
  });

  // Ripple / light burst on primary interactive controls.
  document.querySelectorAll(".ripple-target").forEach(btn=>{
    btn.addEventListener("click", e=>{
      const r=btn.getBoundingClientRect();
      const burst=document.createElement("i");
      burst.className="click-burst";
      burst.style.left=(e.clientX-r.left)+"px";
      burst.style.top=(e.clientY-r.top)+"px";
      btn.appendChild(burst);
      setTimeout(()=>burst.remove(),700);
    });
  });

  // Advanced 3D holographic tilt with requestAnimationFrame.
  if(finePointer && !reduceMotion){
    const cards=[...document.querySelectorAll(".feature-card,[data-holo-card],.process-card")];
    cards.forEach(card=>{
      let raf=0;
      card.addEventListener("pointermove", e=>{
        if(raf) cancelAnimationFrame(raf);
        raf=requestAnimationFrame(()=>{
          const r=card.getBoundingClientRect();
          const px=(e.clientX-r.left)/r.width;
          const py=(e.clientY-r.top)/r.height;
          const ry=(px-.5)*8;
          const rx=(py-.5)*-7;
          card.style.transform=`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
          card.style.setProperty("--card-x",(px*100)+"%");
          card.style.setProperty("--card-y",(py*100)+"%");
        });
      });
      card.addEventListener("pointerleave",()=>{
        if(raf) cancelAnimationFrame(raf);
        card.style.transform="";
      });
    });
  }

  // Stronger magnetic CTAs: attraction area follows pointer smoothly.
  if(finePointer && !reduceMotion){
    document.querySelectorAll(".magnetic").forEach(btn=>{
      let raf=0;
      btn.addEventListener("pointermove", e=>{
        if(raf) cancelAnimationFrame(raf);
        raf=requestAnimationFrame(()=>{
          const r=btn.getBoundingClientRect();
          const dx=e.clientX-(r.left+r.width/2);
          const dy=e.clientY-(r.top+r.height/2);
          btn.style.transform=`translate3d(${dx*.14}px,${dy*.16}px,0) scale(1.018)`;
        });
      });
      btn.addEventListener("pointerleave",()=>{
        if(raf) cancelAnimationFrame(raf);
        btn.style.transform="";
      });
    });
  }

  // Feature stage transition when a feature card is clicked.
  const stage=document.getElementById("featureStage");
  document.querySelectorAll(".feature-card").forEach(card=>{
    card.addEventListener("click",()=>{
      stage?.classList.add("is-switching");
      setTimeout(()=>stage?.classList.remove("is-switching"),210);
    });
  });

  // Animated FAQ accordion, one item open at a time.
  const faqItems=[...document.querySelectorAll(".faq-item")];
  faqItems.forEach(item=>{
    const q=item.querySelector(".faq-question");
    q?.addEventListener("click",()=>{
      const opening=!item.classList.contains("open");
      faqItems.forEach(other=>{
        if(other!==item){
          other.classList.remove("open");
          other.querySelector(".faq-question")?.setAttribute("aria-expanded","false");
        }
      });
      item.classList.toggle("open",opening);
      q.setAttribute("aria-expanded",opening?"true":"false");
    });
  });

  // CTA portal particles.
  const sparks=document.getElementById("portalSparks");
  if(sparks && !reduceMotion){
    for(let i=0;i<32;i++){
      const s=document.createElement("i");
      s.style.left=(12+Math.random()*76)+"%";
      s.style.top=(18+Math.random()*66)+"%";
      s.style.animationDelay=(-Math.random()*6)+"s";
      s.style.animationDuration=(4+Math.random()*5)+"s";
      s.style.opacity=(.15+Math.random()*.55);
      sparks.appendChild(s);
    }
  }

  // Keyboard: Enter/Space on cards still works naturally because cards are buttons.
})();
