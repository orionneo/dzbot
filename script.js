
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
