
(() => {
  const cfg = window.DZBOT_CONFIG || {};
  const wa = cfg.whatsapp || "5519997988952";
  const email = cfg.email || "diogofzanon@gmail.com";
  const msg = encodeURIComponent("Olá! Conheci o DZbot pelo site e quero um orçamento personalizado para minha guild/PT no RubinOT.");
  document.querySelectorAll(".js-whatsapp").forEach(a => a.href = `https://wa.me/${wa}?text=${msg}`);
  document.querySelectorAll(".js-email").forEach(a => a.href = `mailto:${email}?subject=${encodeURIComponent("DZbot — orçamento RubinOT")}`);

  const topbar = document.getElementById("topbar");
  const progress = document.getElementById("scrollProgress");
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const onScroll = () => {
    topbar?.classList.toggle("scrolled", scrollY > 24);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max > 0 ? scrollY / max * 100 : 0) + "%";
    let active = sections[0]?.id;
    sections.forEach(s => { if (s.getBoundingClientRect().top < 150) active = s.id; });
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + active));
  };
  addEventListener("scroll", onScroll, {passive:true}); onScroll();

  const menu = document.getElementById("nav");
  document.getElementById("menuToggle")?.addEventListener("click", () => menu.classList.toggle("open"));
  navLinks.forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

  const revealObs = new IntersectionObserver(entries => entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add("visible"); revealObs.unobserve(e.target); }
  }), {threshold:.08});
  document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

  const data = {
    player:{label:"PLAYER TRACKER",title:"Saiba quem entrou, saiu e está pronto para PT.",text:"Acompanhe status, sessão, level, vocação e contexto operacional sem depender de consulta manual.",points:["Status online/offline","Sessão e tempo online","Friend / Enemy / Watch"],img:"assets/screens/bazaar.webp",cap:"Player Tracker"},
    guild:{label:"GUILD WATCH",title:"Transforme sua guild inteira em radar operacional.",text:"Acompanhe o grupo como um conjunto: atividade, aliados, pressão e sinais que ajudam a organizar decisões.",points:["Visão da guild/PT","Atividade observada","Contexto compartilhado"],img:"assets/screens/closing.webp",cap:"Guild Watch"},
    boss:{label:"BOSS INTELLIGENCE",title:"Saiba quando realmente vale ficar de olho.",text:"Radar de bosses com contexto e nível de atenção para reduzir consulta repetitiva e priorizar o que importa.",points:["Radar de atenção","Janelas prováveis","Alertas no Discord"],img:"assets/screens/daily.webp",cap:"Boss Intelligence"},
    bazaar:{label:"BAZAAR INTELLIGENCE",title:"Pare de caçar oportunidade em várias telas.",text:"Top por vocação, filtros, watch e acesso rápido ao leilão para destacar o que merece sua atenção.",points:["Top por vocação","Watch personalizado","Interest score"],img:"assets/screens/death.webp",cap:"Bazaar Intelligence"},
    skills:{label:"SKILL WATCH",title:"Veja evolução sem acompanhar manualmente.",text:"Rankings de skills e mudanças relevantes aparecem organizados para leitura rápida dentro do Discord.",points:["Top skills","Mudanças observadas","Digest automático"],img:"assets/screens/dna.webp",cap:"Skill Watch"},
    death:{label:"DEATH INTELLIGENCE",title:"Uma morte deixa de ser só uma mensagem.",text:"Classificação PvE/PvP, responsável e histórico observado dão contexto imediato ao evento.",points:["PvE / PvP","Responsável","Histórico do player"],img:"assets/screens/enemy-offline.webp",cap:"Death Intelligence"},
    dna:{label:"PLAYER DNA",title:"Transforme histórico em padrão de comportamento.",text:"Ritmo, consistência, grinder, sobrevivência e marcos ajudam a entender o perfil observado do personagem.",points:["Ritmo observado","Consistência","Marcos e conquistas"],img:"assets/screens/friend-online.webp",cap:"Player DNA"},
    daily:{label:"DZ DAILY",title:"Comece e termine o dia sabendo o que aconteceu.",text:"Resumo de online, evolução, mortes, atividade e eventos observados para sua guild ou PT.",points:["Resumo operacional","Evolução e atividade","Pressão / mortes"],img:"assets/screens/player-card.webp",cap:"DZ Daily"}
  };
  const tabs = [...document.querySelectorAll(".module-tab")];
  const preview = document.getElementById("discordPreview");
  function selectModule(key){
    const d=data[key]; if(!d) return;
    tabs.forEach(t=>t.classList.toggle("active",t.dataset.module===key));
    preview.classList.add("switching");
    setTimeout(()=>{
      document.getElementById("stageLabel").textContent=d.label;
      document.getElementById("stageTitle").textContent=d.title;
      document.getElementById("stageText").textContent=d.text;
      document.getElementById("stagePoints").innerHTML=d.points.map(x=>`<span>● ${x}</span>`).join("");
      document.getElementById("stageImage").src=d.img;
      document.getElementById("previewCaption").textContent=d.cap;
      preview.classList.remove("switching");
    },150);
  }
  tabs.forEach(t=>{t.addEventListener("click",()=>selectModule(t.dataset.module)); t.addEventListener("mouseenter",()=>{if(matchMedia("(pointer:fine)").matches) selectModule(t.dataset.module)});});

  const track=document.getElementById("carouselTrack");
  const cards=[...track.children];
  const dots=document.getElementById("carouselDots");
  let slide=0,timer;
  cards.forEach((_,i)=>{const b=document.createElement("button");b.setAttribute("aria-label",`Slide ${i+1}`);b.addEventListener("click",()=>go(i,true));dots.appendChild(b)});
  const dotBtns=[...dots.children];
  function go(i,user=false){slide=(i+cards.length)%cards.length;const cardW=cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(cards[0]).marginRight);track.style.transform=`translate3d(${-slide*cardW}px,0,0)`;dotBtns.forEach((d,j)=>d.classList.toggle("active",j===slide));if(user) restart();}
  function restart(){clearInterval(timer);timer=setInterval(()=>go(slide+1),4500)}
  document.getElementById("prevSlide").addEventListener("click",()=>go(slide-1,true));
  document.getElementById("nextSlide").addEventListener("click",()=>go(slide+1,true));
  let sx=0;track.addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});track.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)go(slide+(dx<0?1:-1),true)},{passive:true});
  addEventListener("resize",()=>go(slide));go(0);restart();

  const lb=document.getElementById("lightbox"), lbi=document.getElementById("lightboxImage");
  document.querySelectorAll("[data-lightbox]").forEach(b=>b.addEventListener("click",()=>{lbi.src=b.dataset.lightbox;lb.classList.add("open");lb.setAttribute("aria-hidden","false")}));
  const close=()=>{lb.classList.remove("open");lb.setAttribute("aria-hidden","true")};
  document.getElementById("lightboxClose").addEventListener("click",close);lb.addEventListener("click",e=>{if(e.target===lb)close()});addEventListener("keydown",e=>{if(e.key==="Escape")close()});
})();
