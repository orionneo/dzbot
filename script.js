
(() => {
  const cfg=window.DZBOT_CONFIG||{}, phone=cfg.whatsapp||"5519997988952", email=cfg.email||"diogofzanon@gmail.com";
  const wmsg=encodeURIComponent("Olá! Conheci o DZbot pelo site e quero um orçamento personalizado para minha guild/PT no RubinOT.");
  document.querySelectorAll(".js-whatsapp").forEach(a=>{a.href=`https://wa.me/${phone}?text=${wmsg}`;a.target="_blank";a.rel="noopener"});
  document.querySelectorAll(".js-email").forEach(a=>a.href=`mailto:${email}?subject=${encodeURIComponent("DZbot — orçamento RubinOT")}`);

  const navbar=document.getElementById("navbar"), progress=document.getElementById("scrollProgress");
  const navLinks=[...document.querySelectorAll('#navMenu a[href^="#"]')], sections=navLinks.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
  function scrollState(){navbar.classList.toggle("scrolled",scrollY>20);const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+"%";let cur=sections[0]?.id;sections.forEach(s=>{if(s.getBoundingClientRect().top<160)cur=s.id});navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+cur))}
  addEventListener("scroll",scrollState,{passive:true});scrollState();
  const navMenu=document.getElementById("navMenu");document.getElementById("navToggle").onclick=()=>navMenu.classList.toggle("open");navLinks.forEach(a=>a.onclick=()=>navMenu.classList.remove("open"));

  if(!matchMedia("(prefers-reduced-motion: reduce)").matches){const pf=document.getElementById("particleField");for(let i=0;i<24;i++){const d=document.createElement("i");d.style.left=Math.random()*100+"%";d.style.top=Math.random()*100+"%";d.style.animationDuration=(11+Math.random()*17)+"s";d.style.animationDelay=(-Math.random()*18)+"s";pf.appendChild(d)}}

  // hero rotating highlights
  const hslides=[...document.querySelectorAll("[data-hero-slide]")], hdots=document.getElementById("heroDots"), hcounter=document.getElementById("heroRotatorCounter"); let hi=0,ht;
  hslides.forEach((_,i)=>{const b=document.createElement("button");b.setAttribute("aria-label","Highlight "+(i+1));b.onclick=()=>hgo(i,true);hdots.appendChild(b)});
  const hdb=[...hdots.children];
  function hgo(i,user=false){hi=(i+hslides.length)%hslides.length;hslides.forEach((s,j)=>s.classList.toggle("active",j===hi));hdb.forEach((d,j)=>d.classList.toggle("active",j===hi));hcounter.textContent=String(hi+1).padStart(2,"0")+" / "+String(hslides.length).padStart(2,"0");if(user)hrestart()}
  function hrestart(){clearInterval(ht);if(!matchMedia("(prefers-reduced-motion: reduce)").matches)ht=setInterval(()=>hgo(hi+1),4200)}
  document.getElementById("heroPrev").onclick=()=>hgo(hi-1,true);document.getElementById("heroNext").onclick=()=>hgo(hi+1,true);hgo(0);hrestart();

  // Hero tilt
  const hl=document.getElementById("heroLogoWrap");if(matchMedia("(pointer:fine)").matches&&!matchMedia("(prefers-reduced-motion: reduce)").matches){hl.addEventListener("pointermove",e=>{const r=hl.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;hl.style.animation="none";hl.style.transform=`perspective(1100px) rotateX(${(py-.5)*-7}deg) rotateY(${(px-.5)*9}deg) scale(1.025)`});hl.addEventListener("pointerleave",()=>{hl.style.transform="";hl.style.animation=""})}

  // module mapping — explicit + correct
  const mdata={
    player:{tag:"PLAYER TRACKER",title:"Saiba quem entrou, saiu e está pronto para PT.",text:"Status, sessão, level e contexto operacional chegam no Discord sem consulta manual.",points:["Status online/offline","Sessão observada","Friend / Enemy / Watch"],img:"assets/screens/friend-online.webp",cap:"Player Tracker",src:"Screenshot real do Discord",boss:false},
    guild:{tag:"GUILD WATCH",title:"Transforme a guild inteira em radar operacional.",text:"Resumo e atividade da guild ajudam sua PT a enxergar o coletivo sem ficar consultando personagem por personagem.",points:["Visão coletiva","Atividade observada","Resumo operacional"],img:"assets/screens/daily.webp",cap:"Guild Watch / DZ Daily",src:"Screenshot real do Discord",boss:false},
    boss:{tag:"BOSS INTELLIGENCE",title:"Saiba quando realmente vale ficar de olho.",text:"Como não foi fornecido um print real de boss nesta sessão, o preview usa arte de boss e contexto do módulo — nunca uma imagem errada.",points:["Radar de atenção","Janelas e sinais","Contexto estratégico"],img:"",cap:"Boss Intelligence",src:"Visual contextual do módulo",boss:true},
    bazaar:{tag:"BAZAAR INTELLIGENCE",title:"Pare de caçar oportunidade no braço.",text:"Top, watch, interesse e acesso rápido ao leilão reduzem ruído e trabalho manual.",points:["Top por vocação","Watch personalizado","Interest score"],img:"assets/screens/bazaar.webp",cap:"Bazaar Intelligence",src:"Screenshot real do Discord",boss:false},
    skills:{tag:"SKILL WATCH",title:"Veja evolução sem abrir ranking toda hora.",text:"Top skills e mudanças observadas aparecem organizados para leitura rápida.",points:["Top skills","Digest automático","Mudanças observadas"],img:"assets/screens/skills.webp",cap:"Skill Watch",src:"Screenshot real do Discord",boss:false},
    death:{tag:"DEATH INTELLIGENCE",title:"Uma morte passa a ter contexto.",text:"Screenshot real correta: PvE/PvP, responsável e histórico do player.",points:["PvE / PvP","Responsável pela morte","Histórico do player"],img:"assets/screens/death.webp",cap:"Death Intelligence",src:"Screenshot real do Discord",boss:false},
    dna:{tag:"PLAYER DNA",title:"Transforme histórico em padrão.",text:"Ritmo, consistência, grinder e sobrevivência ajudam a compreender comportamento observado.",points:["Ritmo","Consistência","Marcos"],img:"assets/screens/dna.webp",cap:"Player DNA",src:"Screenshot real do Discord",boss:false},
    daily:{tag:"DZ DAILY",title:"Comece o dia sabendo o que aconteceu.",text:"Online, evolução, mortes e pressão resumidos automaticamente.",points:["Online agora","Evolução","Mortes e pressão"],img:"assets/screens/daily.webp",cap:"DZ Daily",src:"Screenshot real do Discord",boss:false}
  };
  const tabs=[...document.querySelectorAll(".module-tab")], ps=document.getElementById("previewShell"), bossCtx=document.getElementById("bossContext"), img=document.getElementById("moduleImage");
  function setModule(key){const d=mdata[key];if(!d)return;tabs.forEach(t=>t.classList.toggle("active",t.dataset.module===key));ps.classList.add("switching");setTimeout(()=>{document.getElementById("moduleTag").textContent=d.tag;document.getElementById("moduleTitle").textContent=d.title;document.getElementById("moduleText").textContent=d.text;document.getElementById("modulePoints").innerHTML=d.points.map(x=>`<li>${x}</li>`).join("");document.getElementById("moduleCaption").textContent=d.cap;document.getElementById("moduleSource").textContent=d.src;if(d.boss){img.style.display="none";bossCtx.classList.remove("hidden")}else{bossCtx.classList.add("hidden");img.style.display="block";img.src=d.img}ps.classList.remove("switching")},130)}
  tabs.forEach(t=>{t.onclick=()=>setModule(t.dataset.module);t.onmouseenter=()=>{if(matchMedia("(pointer:fine)").matches)setModule(t.dataset.module)}});

  // robust showcase: absolute state-based, no translating track
  const sslides=[...document.querySelectorAll("[data-show-slide]")], sdots=document.getElementById("showDots"); let si=0,st,paused=false;
  sslides.forEach((_,i)=>{const b=document.createElement("button");b.setAttribute("aria-label","Slide "+(i+1));b.onclick=()=>sgo(i,true);sdots.appendChild(b)});
  const sdb=[...sdots.children];
  function sgo(i,user=false){si=(i+sslides.length)%sslides.length;sslides.forEach((s,j)=>s.classList.toggle("active",j===si));sdb.forEach((d,j)=>d.classList.toggle("active",j===si));if(user)srestart()}
  function srestart(){clearInterval(st);if(!paused&&!matchMedia("(prefers-reduced-motion: reduce)").matches)st=setInterval(()=>sgo(si+1),4700)}
  document.getElementById("showPrev").onclick=()=>sgo(si-1,true);document.getElementById("showNext").onclick=()=>sgo(si+1,true);
  const showcase=document.getElementById("showcase");showcase.onmouseenter=()=>{paused=true;clearInterval(st)};showcase.onmouseleave=()=>{paused=false;srestart()};
  let sx=0;showcase.addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});showcase.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)sgo(si+(dx<0?1:-1),true)},{passive:true});sgo(0);srestart();

  // FAQ
  document.querySelectorAll(".faq-item").forEach(item=>{item.querySelector(".faq-q").onclick=()=>{const open=!item.classList.contains("open");document.querySelectorAll(".faq-item.open").forEach(o=>o.classList.remove("open"));item.classList.toggle("open",open)}});

  // Lightbox
  const lb=document.getElementById("lightbox"),lbi=document.getElementById("lightboxImage");document.querySelectorAll("[data-lightbox]").forEach(b=>b.onclick=()=>{lbi.src=b.dataset.lightbox;lb.classList.add("open")});const close=()=>lb.classList.remove("open");document.getElementById("lightboxClose").onclick=close;lb.onclick=e=>{if(e.target===lb)close()};addEventListener("keydown",e=>{if(e.key==="Escape")close()});
})();
