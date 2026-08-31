
(() => {
  const cfg = window.DZBOT_CONFIG || {};
  const phone = cfg.whatsapp || "5519997988952";
  const email = cfg.email || "diogofzanon@gmail.com";
  const msg = encodeURIComponent("Olá! Conheci o DZbot pelo site e quero um orçamento personalizado para minha guild/PT no RubinOT.");
  document.querySelectorAll(".js-whatsapp").forEach(a => { a.href=`https://wa.me/${phone}?text=${msg}`; a.target="_blank"; a.rel="noopener"; });
  document.querySelectorAll(".js-email").forEach(a => a.href=`mailto:${email}?subject=${encodeURIComponent("DZbot — orçamento RubinOT")}`);

  const nav=document.getElementById("navbar"), progress=document.getElementById("scrollProgress");
  const navLinks=[...document.querySelectorAll('#navMenu a[href^="#"]')];
  const sections=navLinks.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
  function onScroll(){
    nav.classList.toggle("scrolled",scrollY>20);
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.width=(max>0?scrollY/max*100:0)+"%";
    let current=sections[0]?.id;
    sections.forEach(s=>{if(s.getBoundingClientRect().top<160)current=s.id});
    navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
  }
  addEventListener("scroll",onScroll,{passive:true});onScroll();
  const navMenu=document.getElementById("navMenu");
  document.getElementById("navToggle").onclick=()=>navMenu.classList.toggle("open");
  navLinks.forEach(a=>a.onclick=()=>navMenu.classList.remove("open"));

  // particles
  if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
    const pf=document.getElementById("particles");
    for(let i=0;i<26;i++){const d=document.createElement("i");d.style.left=Math.random()*100+"%";d.style.top=Math.random()*100+"%";d.style.animationDuration=(11+Math.random()*16)+"s";d.style.animationDelay=(-Math.random()*15)+"s";pf.appendChild(d)}
  }

  // Hero tilt, desktop only
  const heroCard=document.getElementById("heroCard");
  if(matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    heroCard.addEventListener("pointermove",e=>{
      const r=heroCard.getBoundingClientRect(), px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
      heroCard.style.animation="none";
      heroCard.style.transform=`perspective(1100px) rotateX(${(py-.5)*-7}deg) rotateY(${(px-.5)*9}deg) scale(1.025)`;
    });
    heroCard.addEventListener("pointerleave",()=>{heroCard.style.transform="";heroCard.style.animation=""});
  }

  const moduleData={
    player:{tag:"PLAYER TRACKER",title:"Saiba quem entrou, saiu e está pronto para PT.",text:"Status, sessão, level e contexto operacional chegam no Discord sem consulta manual.",points:["Status online/offline","Sessão observada","Friend / Enemy / Watch"],img:"assets/screens/friend-online.webp",cap:"Player Tracker"},
    guild:{tag:"GUILD WATCH",title:"Transforme a guild inteira em radar operacional.",text:"Acompanhe vários personagens com contexto centralizado para sua guild ou PT.",points:["Visão de grupo","Atividade observada","Contexto compartilhado"],img:"assets/screens/daily.webp",cap:"Guild Watch"},
    boss:{tag:"BOSS INTELLIGENCE",title:"Saiba quando realmente vale ficar de olho.",text:"Radar e sinais ajudam a priorizar bosses sem depender de consultas repetitivas.",points:["Radar de atenção","Janelas e sinais","Alertas no Discord"],img:"assets/screens/enemy-offline.webp",cap:"Boss / War Signal"},
    bazaar:{tag:"BAZAAR INTELLIGENCE",title:"Pare de caçar oportunidade no braço.",text:"Top, watch, interesse e acesso rápido ao leilão reduzem ruído e trabalho manual.",points:["Top por vocação","Watch personalizado","Interest score"],img:"assets/screens/bazaar.webp",cap:"Bazaar Intelligence"},
    skills:{tag:"SKILL WATCH",title:"Veja evolução sem abrir ranking toda hora.",text:"Mudanças e top skills aparecem organizados para leitura rápida.",points:["Top skills","Digest automático","Mudanças observadas"],img:"assets/screens/skills.webp",cap:"Skill Watch"},
    death:{tag:"DEATH INTELLIGENCE",title:"Uma morte passa a ter contexto.",text:"Esta é a screenshot real de morte do bot: PvE/PvP, responsável e histórico recente.",points:["PvE / PvP","Responsável pela morte","Histórico do player"],img:"assets/screens/death.webp",cap:"Death Intelligence"},
    dna:{tag:"PLAYER DNA",title:"Transforme histórico em padrão.",text:"Ritmo, consistência, grinder e sobrevivência ajudam a compreender o comportamento observado.",points:["Ritmo","Consistência","Marcos"],img:"assets/screens/dna.webp",cap:"Player DNA"},
    daily:{tag:"DZ DAILY",title:"Comece o dia sabendo o que aconteceu.",text:"Resumo de online, evolução, mortes e eventos observados em uma única mensagem.",points:["Online agora","Evolução","Mortes e pressão"],img:"assets/screens/daily.webp",cap:"DZ Daily"}
  };
  const tabs=[...document.querySelectorAll(".module-tab")], frame=document.getElementById("discordFrame");
  function setModule(key){
    const d=moduleData[key]; if(!d)return;
    tabs.forEach(t=>t.classList.toggle("active",t.dataset.module===key));
    frame.classList.add("switching");
    setTimeout(()=>{
      document.getElementById("moduleTag").textContent=d.tag;
      document.getElementById("moduleTitle").textContent=d.title;
      document.getElementById("moduleText").textContent=d.text;
      document.getElementById("modulePoints").innerHTML=d.points.map(x=>`<li>${x}</li>`).join("");
      document.getElementById("moduleImage").src=d.img;
      document.getElementById("moduleCaption").textContent=d.cap;
      frame.classList.remove("switching");
    },140);
  }
  tabs.forEach(t=>{t.onclick=()=>setModule(t.dataset.module);t.onmouseenter=()=>{if(matchMedia("(pointer:fine)").matches)setModule(t.dataset.module)}});

  // carousel
  const track=document.getElementById("liveTrack"), cards=[...track.children], dots=document.getElementById("liveDots");
  let idx=0,timer=null,paused=false;
  cards.forEach((_,i)=>{const b=document.createElement("button");b.setAttribute("aria-label","Slide "+(i+1));b.onclick=()=>go(i,true);dots.appendChild(b)});
  const dotBtns=[...dots.children];
  function cardStep(){return cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(cards[0]).marginRight)}
  function go(i,user=false){idx=(i+cards.length)%cards.length;track.style.transform=`translate3d(${-idx*cardStep()}px,0,0)`;dotBtns.forEach((d,j)=>d.classList.toggle("active",j===idx));if(user)restart()}
  function restart(){clearInterval(timer);if(!paused&&!matchMedia("(prefers-reduced-motion: reduce)").matches)timer=setInterval(()=>go(idx+1),4500)}
  document.getElementById("livePrev").onclick=()=>go(idx-1,true);
  document.getElementById("liveNext").onclick=()=>go(idx+1,true);
  track.onmouseenter=()=>{paused=true;clearInterval(timer)};track.onmouseleave=()=>{paused=false;restart()};
  let sx=0;track.addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});track.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)go(idx+(dx<0?1:-1),true)},{passive:true});
  addEventListener("resize",()=>go(idx));go(0);restart();

  // lightbox
  const lb=document.getElementById("lightbox"), lbi=document.getElementById("lightboxImage");
  document.querySelectorAll("[data-lightbox]").forEach(b=>b.onclick=()=>{lbi.src=b.dataset.lightbox;lb.classList.add("open");lb.setAttribute("aria-hidden","false")});
  const close=()=>{lb.classList.remove("open");lb.setAttribute("aria-hidden","true")};
  document.getElementById("lightboxClose").onclick=close;lb.onclick=e=>{if(e.target===lb)close()};addEventListener("keydown",e=>{if(e.key==="Escape")close()});
})();
