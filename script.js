
(() => {
  const cfg=window.DZBOT_CONFIG||{}, phone=cfg.whatsapp||"5519997988952";
  const msg=encodeURIComponent("Olá! Conheci o DZbot pelo site e quero um orçamento personalizado para minha guild/PT no RubinOT.");
  document.querySelectorAll(".js-whatsapp").forEach(a=>{a.href=`https://wa.me/${phone}?text=${msg}`;a.target="_blank";a.rel="noopener"});

  const progress=document.getElementById("scrollProgress");
  const links=[...document.querySelectorAll('#nav a[href^="#"]')];
  const sections=links.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
  function scrollState(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+"%";let cur=sections[0]?.id;sections.forEach(s=>{if(s.getBoundingClientRect().top<120)cur=s.id});links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+cur))}
  addEventListener("scroll",scrollState,{passive:true});scrollState();
  const nav=document.getElementById("nav");document.getElementById("menuToggle").onclick=()=>nav.classList.toggle("open");links.forEach(a=>a.onclick=()=>nav.classList.remove("open"));

  const slides=[...document.querySelectorAll(".hslide")], dots=document.getElementById("heroDots");let idx=0,timer;
  slides.forEach((_,i)=>{const b=document.createElement("button");b.onclick=()=>go(i,true);dots.appendChild(b)});
  const dotBtns=[...dots.children];
  function go(i,user=false){idx=(i+slides.length)%slides.length;slides.forEach((s,j)=>s.classList.toggle("active",j===idx));dotBtns.forEach((d,j)=>d.classList.toggle("active",j===idx));if(user)restart()}
  function restart(){clearInterval(timer);if(!matchMedia("(prefers-reduced-motion: reduce)").matches)timer=setInterval(()=>go(idx+1),4200)}
  document.getElementById("heroPrev").onclick=()=>go(idx-1,true);document.getElementById("heroNext").onclick=()=>go(idx+1,true);go(0);restart();

  const data={
    player:{tag:"PLAYER TRACKER",title:"Saiba quem entrou, saiu e está pronto para PT.",text:"Status, sessão, level e contexto operacional no Discord.",list:["Status online/offline","Sessão observada","Friend / Enemy / Watch"],img:"assets/screens/friend-online.webp"},
    guild:{tag:"GUILD WATCH",title:"Veja a guild como um radar vivo.",text:"Atividade coletiva, contexto de PT e sinais operacionais em um só lugar.",list:["Visão coletiva","Guild activity","Contexto de PT"],img:"assets/screens/daily.webp"},
    boss:{tag:"BOSS INTELLIGENCE",title:"Saiba onde vale colocar atenção.",text:"Histórico e sinais ajudam a priorizar bosses relevantes.",list:["Radar de atenção","Janelas e sinais","Contexto estratégico"],img:"assets/art/boss.webp"},
    bazaar:{tag:"BAZAAR INTELLIGENCE",title:"Pare de caçar oportunidade no braço.",text:"Top, watch e interesse destacam chars que merecem atenção.",list:["Top por vocação","Watch","Interest score"],img:"assets/screens/bazaar.webp"},
    skills:{tag:"SKILL WATCH",title:"Veja evolução sem abrir ranking toda hora.",text:"Skills observadas e digest organizados para leitura rápida.",list:["Top skills","Mudanças observadas","Digest"],img:"assets/screens/skills.webp"},
    death:{tag:"DEATH INTELLIGENCE",title:"Uma morte passa a ter contexto.",text:"PvE/PvP, responsável e histórico do player.",list:["PvE / PvP","Responsável","Histórico recente"],img:"assets/screens/death.webp"},
    dna:{tag:"PLAYER DNA",title:"Transforme histórico em padrão.",text:"Ritmo, consistência e comportamento observado viram contexto.",list:["Ritmo","Consistência","Marcos"],img:"assets/screens/dna.webp"},
    daily:{tag:"DZ DAILY",title:"Acorde sabendo o que aconteceu.",text:"Online, evolução, mortes e pressão em um resumo operacional.",list:["Online agora","Evolução","Mortes e pressão"],img:"assets/screens/daily.webp"}
  };
  const mods=[...document.querySelectorAll(".module")];
  function setModule(key){const d=data[key];if(!d)return;mods.forEach(b=>b.classList.toggle("active",b.dataset.module===key));document.getElementById("previewTag").textContent=d.tag;document.getElementById("previewTitle").textContent=d.title;document.getElementById("previewText").textContent=d.text;document.getElementById("previewList").innerHTML=d.list.map(x=>`<li>${x}</li>`).join("");document.getElementById("previewImage").src=d.img}
  mods.forEach(b=>{b.onclick=()=>{setModule(b.dataset.module);document.querySelector(".interactive").scrollIntoView({behavior:"smooth",block:"center"})};b.onmouseenter=()=>{if(matchMedia("(pointer:fine)").matches)setModule(b.dataset.module)}});

  document.querySelectorAll(".faq-item").forEach(item=>item.querySelector("button").onclick=()=>{const open=!item.classList.contains("open");document.querySelectorAll(".faq-item.open").forEach(x=>x.classList.remove("open"));item.classList.toggle("open",open)});
})();
