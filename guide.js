(() => {
  const root = document.getElementById('guia');
  if (!root) return;

  const commands = [
    {c:'/dashboard',cat:'Começar',t:'Guild Command Center',d:'Abre o painel visual do DZbot com botões para Party, Hunts, Bosses, Intelligence, Guild & Radar, Rankings, Game Database e Social.',when:'Use quando você não quer decorar comandos e prefere navegar visualmente pelas áreas do bot.',ex:'/dashboard'},
    {c:'/help',cat:'Começar',t:'Ajuda por categorias',d:'Mostra os recursos disponíveis e ajuda a descobrir o próximo comando.',when:'Primeiro contato com o bot ou quando você sabe o que quer fazer, mas não lembra o comando.',ex:'/help'},
    {c:'/linkchar',cat:'Player',t:'Vincule seu personagem ao Discord',d:'Liga seu personagem do Tibia ao seu usuário do Discord para que recursos pessoais saibam quem é você.',when:'Faça uma vez no início. Depois /eu, /dz dna e outros recursos pessoais ficam muito mais úteis.',ex:'/linkchar character:Gandalf Power Gray'},
    {c:'/eu',cat:'Player',t:'Seu DZ ID',d:'Visão pessoal consolidada de DNA, evolução e conquistas observadas.',when:'Para acompanhar seu próprio personagem sem precisar informar o nome toda vez.',ex:'/eu'},
    {c:'/dz agora',cat:'Player',t:'O que está acontecendo agora',d:'Leitura tática do momento com sinais relevantes da guild/PT.',when:'Quando você entra no Discord e quer entender rapidamente o cenário atual.',ex:'/dz agora'},
    {c:'/dz pt',cat:'PT',t:'Sugestão de PT',d:'Usa o contexto disponível para ajudar a formar as melhores parties com quem está disponível.',when:'Antes de uma hunt, boss ou atividade em grupo.',ex:'/dz pt'},
    {c:'/dz daily',cat:'Player',t:'Resumo premium do dia',d:'Consolida atividade e evolução observadas em um resumo do dia.',when:'Para revisar o que aconteceu sem navegar por várias telas.',ex:'/dz daily'},
    {c:'/dz dna',cat:'Player',t:'Player DNA completo',d:'Dossiê do personagem com evolução, skills e contexto observado.',when:'Para conhecer seu próprio perfil ou analisar outro personagem.',ex:'/dz dna character:Gandalf Power Gray'},
    {c:'/dz conquistas',cat:'Player',t:'Conquistas observadas',d:'Mostra conquistas e marcos que o DZbot conseguiu observar.',when:'Para acompanhar evolução além de level e skill.',ex:'/dz conquistas character:Gandalf Power Gray'},
    {c:'/playerinfo',cat:'Player',t:'Player Info rápido',d:'Abre a ficha operacional do personagem para consultar status, level, vocação, guild e contexto disponível.',when:'Quando você quer uma consulta rápida de um personagem diretamente pelo comando de ficha.',ex:'/playerinfo character:Gandalf Power Gray'},
    {c:'/player info',cat:'Player',t:'Ficha completa do player',d:'Consulta perfil, status e histórico do personagem acompanhado pelo DZbot.',when:'Quando você quer uma visão detalhada de um personagem monitorado.',ex:'/player info character:Gandalf Power Gray'},
    {c:'/player online',cat:'Player',t:'Status online do player',d:'Mostra o estado atual do personagem e contexto de presença.',when:'Para checar rapidamente se alguém está online.',ex:'/player online character:Gandalf Power Gray'},
    {c:'/player history',cat:'Player',t:'Histórico do personagem',d:'Consulta histórico observado de atividade do player.',when:'Para entender padrão de presença e acontecimentos recentes.',ex:'/player history character:Gandalf Power Gray'},
    {c:'/charintel',cat:'Player',t:'Character Intelligence',d:'Abre a inteligência de personagem diretamente com autocomplete.',when:'Quando você quer análise rápida de um char sem passar por menus.',ex:'/charintel character:Gandalf Power Gray'},
    {c:'/watchme add',cat:'Player',t:'Alerta pessoal de login',d:'Pede ao bot para avisar você quando um personagem específico entrar.',when:'Para acompanhar amigo, alvo ou alguém importante sem vigiar a lista online.',ex:'/watchme add character:Nome do Player'},
    {c:'/watchme list',cat:'Player',t:'Seus alertas pessoais',d:'Lista os personagens que você pediu para acompanhar pessoalmente.',when:'Para revisar ou organizar seus watches pessoais.',ex:'/watchme list'},

    {c:'/friend add',cat:'Guild & Radar',t:'Cadastrar aliado',d:'Classifica um personagem como FRIEND para alimentar radar, presença, evolução e outras leituras.',when:'Cadastre membros reais da sua PT/guild para o DZbot ganhar contexto.',ex:'/friend add character:Nome do Player'},
    {c:'/friend online',cat:'Guild & Radar',t:'Friends online',d:'Mostra quais FRIENDs estão online agora.',when:'Ótimo para montar PT rapidamente.',ex:'/friend online'},
    {c:'/friend history',cat:'Guild & Radar',t:'Histórico de FRIEND',d:'Mostra atividade observada de aliados.',when:'Para entender presença e comportamento recente da PT.',ex:'/friend history character:Nome do Player'},
    {c:'/enemy add',cat:'Guild & Radar',t:'Cadastrar hostil',d:'Classifica um personagem como ENEMY e passa a tratá-lo como alvo operacional.',when:'Para hostis que precisam aparecer com destaque no radar.',ex:'/enemy add character:Nome do Player'},
    {c:'/enemy online',cat:'Guild & Radar',t:'Hostis online',d:'Mostra inimigos monitorados que estão online agora.',when:'Antes de sair para hunt ou quando existe risco de conflito.',ex:'/enemy online'},
    {c:'/watch add',cat:'Guild & Radar',t:'Watch neutro',d:'Acompanha um personagem sem classificá-lo necessariamente como friend ou enemy.',when:'Para players de interesse, scouts ou alvos que você quer observar.',ex:'/watch add character:Nome do Player'},
    {c:'/watch history',cat:'Guild & Radar',t:'Histórico da Watch List',d:'Mostra o histórico observado de um personagem em WATCH.',when:'Para investigar padrão de atividade.',ex:'/watch history character:Nome do Player'},
    {c:'/online',cat:'Guild & Radar',t:'Radar de jogadores online',d:'Visão rápida de presença dos personagens relevantes para a guild/PT.',when:'Um dos melhores comandos para iniciar uma sessão de jogo.',ex:'/online'},
    {c:'/quemtaon',cat:'Guild & Radar',t:'Quem está on?',d:'Resumo rápido e social de quem está online.',when:'Quando você quer uma resposta curta antes de chamar a galera.',ex:'/quemtaon'},
    {c:'/track add',cat:'Guild & Radar',t:'Radar individual',d:'Adiciona um personagem ao radar e permite controlar alertas.',when:'Para acompanhar alguém de forma mais focada.',ex:'/track add character:Nome do Player'},
    {c:'/track info',cat:'Guild & Radar',t:'Informações do tracking',d:'Mostra o estado do acompanhamento de um personagem.',when:'Para revisar como um alvo está sendo acompanhado.',ex:'/track info character:Nome do Player'},
    {c:'/radar timeline',cat:'Guild & Radar',t:'Timeline do radar',d:'Lista sinais recentes observados pelo radar.',when:'Use depois de ficar um tempo fora para entender o que mudou.',ex:'/radar timeline'},
    {c:'/guildwatch add',cat:'Guild & Radar',t:'Monitorar uma guild',d:'Adiciona guild para acompanhamento com classificação Ally, Neutral ou Enemy.',when:'Para acompanhar guild rival, aliada ou de interesse.',ex:'/guildwatch add guild:Nome da Guild'},
    {c:'/guildwatch status',cat:'Guild & Radar',t:'Status da guild monitorada',d:'Mostra a visão consolidada de uma guild acompanhada.',when:'Para checar presença e contexto coletivo.',ex:'/guildwatch status guild:Nome da Guild'},
    {c:'/guildwatch refresh',cat:'Guild & Radar',t:'Atualizar membros públicos',d:'Atualiza a descoberta pública de membros da guild monitorada.',when:'Quando a composição da guild mudou ou a lista parece desatualizada.',ex:'/guildwatch refresh guild:Nome da Guild'},
    {c:'/masslog',cat:'PvP & War',t:'Sinais de masslog',d:'Mostra os últimos sinais de entrada/saída coletiva relevantes para operação.',when:'Útil para perceber mobilização de guild ou movimento anormal.',ex:'/masslog'},
    {c:'/war',cat:'PvP & War',t:'War Room',d:'Visão operacional voltada a conflito, presença e sinais de Malveria.',when:'Durante guerra, perseguição ou períodos de tensão.',ex:'/war'},
    {c:'/pvp',cat:'PvP & War',t:'PvP Intelligence',d:'Consulta inteligência de mortes PvP coletada pelo DZbot, com contexto de jogadores monitorados.',when:'Para entender quem matou quem, movimentação hostil e sinais recentes de PvP.',ex:'/pvp'},
    {c:'/bans',cat:'PvP & War',t:'Bans Intelligence',d:'Consulta bans ativos e histórico observado; pode ser filtrado por personagem.',when:'Para checar situação disciplinar observada de um player.',ex:'/bans player:Nome do Player'},

    {c:'/ranking',cat:'Rankings',t:'Rankings completos',d:'Compara evolução, EXP, online, mortes, sessão e skills — inclusive PT e filtros por vocação.',when:'Para entender quem está evoluindo e comparar players com contexto real.',ex:'/ranking'},
    {c:'/ranking voc:RP',cat:'Rankings',t:'Ranking de Royal Paladins',d:'Mostra posições observadas de RP em skills relevantes sem inventar posição quando o char está fora da faixa coletada.',when:'Para comparar Distance, Magic e outros indicadores de RP.',ex:'/ranking voc:RP'},
    {c:'/ranking voc:EK',cat:'Rankings',t:'Ranking de Elite Knights',d:'Contexto competitivo de EK com melee, shielding e magic conforme dados disponíveis.',when:'Para comparar evolução de knights.',ex:'/ranking voc:EK'},
    {c:'/ranking voc:EM',cat:'Rankings',t:'Ranking de Exalted Monks',d:'Contexto competitivo de EM nas skills observadas.',when:'Para comparar monks dentro da base coletada.',ex:'/ranking voc:EM'},
    {c:'/ranking voc:MAGE',cat:'Rankings',t:'Ranking de Mages',d:'Agrupa contexto de vocações mágicas com foco nos indicadores disponíveis.',when:'Para comparar ED/MS em progressão e magic.',ex:'/ranking voc:MAGE'},

    {c:'/pt',cat:'PT',t:'Painel da party',d:'Visão consolidada de party e composição.',when:'Para montar grupo e enxergar disponibilidade da PT.',ex:'/pt'},
    {c:'/team create',cat:'PT',t:'Criar evento/PT',d:'Cria uma hunt, quest, boss ou evento com código, título, horário e limite de jogadores.',when:'Quando você quer organizar compromisso de grupo dentro do Discord.',ex:'/team create code:FERU title:Ferumbras when:20:30 max:15'},
    {c:'/team join',cat:'PT',t:'Entrar no evento',d:'Entra em um Team Event informando opcionalmente personagem e vocação.',when:'Para confirmar sua vaga e ajudar o organizador a enxergar composição.',ex:'/team join code:FERU character:Gandalf Power Gray vocation:RP'},
    {c:'/team list',cat:'PT',t:'Eventos abertos',d:'Lista os eventos/PTs atualmente abertos.',when:'Para descobrir o que a guild está organizando.',ex:'/team list'},
    {c:'/poke',cat:'PT',t:'Chamar a PT',d:'Dispara uma chamada rápida para todos os FRIENDs vinculados ou apenas os online.',when:'Boss, hunt, castelo ou ajuda urgente.',ex:'/poke scope:online message:Bora boss agora'},
    {c:'/share',cat:'PT',t:'Faixa de Shared XP',d:'Calcula a faixa aproximada de levels compatíveis com shared experience.',when:'Antes de montar uma hunt para evitar incompatibilidade de level.',ex:'/share level:849'},
    {c:'/respawn bind',cat:'PT',t:'Definir seu char padrão',d:'Vincula seu personagem padrão ao Respawn Manager.',when:'Faça uma vez para agilizar claims e filas.',ex:'/respawn bind'},
    {c:'/respawn list',cat:'PT',t:'Ocupação dos respawns',d:'Lista os respawns cadastrados e sua situação.',when:'Antes de ir para uma hunt concorrida.',ex:'/respawn list'},
    {c:'/respawn claim',cat:'PT',t:'Assumir respawn',d:'Reserva um respawn por um período conforme regras configuradas.',when:'Quando sua PT vai começar uma hunt.',ex:'/respawn claim'},
    {c:'/respawn queue',cat:'PT',t:'Entrar na fila',d:'Coloca você na fila de um respawn ocupado.',when:'Para organizar disputa sem discussão manual.',ex:'/respawn queue'},
    {c:'/respawn release',cat:'PT',t:'Liberar respawn',d:'Libera a reserva e permite seguir a fila.',when:'Ao terminar a hunt.',ex:'/respawn release'},
    {c:'/respawn info',cat:'PT',t:'Detalhe e fila do respawn',d:'Mostra ocupação, tempo e fila de um respawn.',when:'Para saber quem está usando e quem é o próximo.',ex:'/respawn info'},

    {c:'/boss',cat:'Bosses',t:'Boss Intelligence',d:'Abre o radar estratégico de bosses com estados, confiança e contexto observado.',when:'Para priorizar bosses e entender onde vale prestar atenção.',ex:'/boss'},
    {c:'/boss name:upcoming',cat:'Bosses',t:'Bosses em janela',d:'Mostra bosses que merecem atenção pela janela/inteligência disponível.',when:'Antes de organizar checks de boss.',ex:'/boss name:upcoming'},
    {c:'/boss name:hot',cat:'Bosses',t:'Bosses com sinal forte',d:'Mostra sinais mais quentes sem transformar falta de evidência em certeza.',when:'Para focar esforço do time onde há maior sinal.',ex:'/boss name:hot'},
    {c:'/boss name:history Ferumbras',cat:'Bosses',t:'Histórico de boss',d:'Consulta contexto histórico observado para um boss específico.',when:'Para entender frequência e histórico antes de tomar decisão.',ex:'/boss name:"history Ferumbras"'},
    {c:'/boss monitor:RAGING_MAGE',cat:'Bosses',t:'Raging Mage / Yielothax',d:'Acompanha o World Change suportado com status e contribuição pessoal informada.',when:'Para monitorar progresso do Raging Mage/Yielothax.',ex:'/boss monitor:RAGING_MAGE monitor_mode:status'},

    {c:'/bazar acao:agora',cat:'Bazaar',t:'Top 10 do Bazaar',d:'Consulta o Bazaar Intelligence de Malveria e retorna oportunidades conforme filtros.',when:'Para procurar personagem por vocação, level e teto de Rubini Coins.',ex:'/bazar acao:agora vocacao:RP nivel_min:700 valor_max:120000'},
    {c:'/bazar acao:monitor',cat:'Bazaar',t:'Criar monitor de oportunidade',d:'Cria um watch de Bazaar com filtros e janela de alerta antes do fechamento.',when:'Quando você quer que a oportunidade venha até você, sem ficar atualizando o site.',ex:'/bazar acao:monitor vocacao:RP nivel_min:700 valor_max:120000 alerta_min:60'},
    {c:'/bazar acao:meus',cat:'Bazaar',t:'Seus monitores do Bazaar',d:'Lista os watches que você já configurou.',when:'Para revisar seus filtros ativos.',ex:'/bazar acao:meus'},
    {c:'/bazar acao:detalhe',cat:'Bazaar',t:'Detalhe do leilão',d:'Abre o detalhe de um leilão específico pelo ID observado.',when:'Quando um resultado chamou sua atenção e você quer examinar melhor.',ex:'/bazar acao:detalhe leilao:12345'},

    {c:'/events',cat:'Eventos',t:'Eventos confirmados',d:'Mostra eventos conhecidos/confirmados pelo DZbot.',when:'Para ver o que está marcado sem procurar mensagens antigas.',ex:'/events'},
    {c:'/calendar',cat:'Eventos',t:'Calendário da guild',d:'Exibe o calendário de eventos materializados pelo DZbot.',when:'Para planejar a semana e lembrar Castle, eventos fixos e outras ocorrências.',ex:'/calendar'},
    {c:'/boosted',cat:'Eventos',t:'Boosted confirmado',d:'Consulta o boosted registrado/confirmado na camada de inteligência.',when:'Para uma checagem rápida antes de decidir a hunt.',ex:'/boosted'},
    {c:'/poll',cat:'Eventos',t:'Enquete rápida',d:'Cria votação com 2 a 4 opções usando botões.',when:'Escolha de hunt, horário, boss, atividade ou qualquer decisão de grupo.',ex:'/poll question:"Onde vamos?" option1:Ingol option2:DT Seal option3:Dragons'},
    {c:'/lottery',cat:'Eventos',t:'Sorteio',d:'Sorteia entre nomes informados ou membros disponíveis em cache.',when:'Para loot, prêmio, ordem ou brincadeira interna.',ex:'/lottery entries:Diogo,Victor,Joao'},

    {c:'/quest info',cat:'Game Database',t:'Consultar quest',d:'Consulta uma quest na base local.',when:'Para descobrir requisitos e contexto sem sair do Discord.',ex:'/quest info name:"Nome da Quest"'},
    {c:'/quest start',cat:'Game Database',t:'Guia passo a passo',d:'Inicia a navegação guiada da quest com next/previous/reset.',when:'Quando você quer seguir a quest diretamente pelo Discord.',ex:'/quest start name:"Nome da Quest"'},
    {c:'/access',cat:'Game Database',t:'Consultar acesso',d:'Pesquisa acessos cadastrados na base de conhecimento.',when:'Para descobrir pré-requisitos de áreas e conteúdos.',ex:'/access name:"Nome do acesso"'},
    {c:'/creature',cat:'Game Database',t:'Consultar criatura',d:'Pesquisa uma criatura na base local.',when:'Para informações rápidas de monstros.',ex:'/creature name:Vexclaw'},
    {c:'/loot',cat:'Game Database',t:'Consultar loot',d:'Pesquisa loot na base local.',when:'Para hunt, avaliação de drop e planejamento.',ex:'/loot name:"Nome do item"'},
    {c:'/rare',cat:'Game Database',t:'Itens raros',d:'Consulta raridades indexadas pelo DZbot.',when:'Quando você quer informação de conteúdo raro.',ex:'/rare name:"Nome"'},
    {c:'/drops',cat:'Game Database',t:'Pesquisar drops',d:'Consulta a relação de drops cadastrados.',when:'Para descobrir onde determinado item aparece na base.',ex:'/drops name:"Nome"'},
    {c:'/item',cat:'Game Database',t:'Consultar item',d:'Busca informações de item na base local.',when:'Para checar item sem trocar de janela.',ex:'/item name:"Nome do item"'},
    {c:'/npc',cat:'Game Database',t:'Consultar NPC',d:'Pesquisa NPCs na base de conhecimento.',when:'Para localização/contexto cadastrado de NPC.',ex:'/npc name:Rashid'},
    {c:'/hunt',cat:'Game Database',t:'Consultar hunt',d:'Pesquisa hunts cadastradas e contexto disponível.',when:'Para escolher ou planejar uma hunt.',ex:'/hunt name:"Nome da hunt"'},
    {c:'/charm',cat:'Game Database',t:'Consultar charm',d:'Pesquisa charms e informações disponíveis.',when:'Para apoiar decisões de progressão.',ex:'/charm name:Freeze'},
    {c:'/outfit',cat:'Game Database',t:'Consultar outfit',d:'Pesquisa outfit e requisitos disponíveis na base.',when:'Para completar outfits sem procurar em várias páginas.',ex:'/outfit name:"Nome do outfit"'},
    {c:'/mount',cat:'Game Database',t:'Consultar mount',d:'Pesquisa mounts e requisitos disponíveis na base.',when:'Para descobrir como obter uma montaria.',ex:'/mount name:"Nome da mount"'},
    {c:'/imbuement guia',cat:'Game Database',t:'Aprender o Imbuement Advisor',d:'Mostra exemplos de uso e ensina a consultar o assistente de imbuements.',when:'Use primeiro se você ainda não conhece a sintaxe.',ex:'/imbuement guia'},
    {c:'/imbuement buscar',cat:'Game Database',t:'Buscar imbuement em linguagem natural',d:'Você descreve o objetivo — mana helmet, proteção gelo armor, crit bow, bp cap — e o bot encontra opções.',when:'Quando você sabe o que quer melhorar, mas não lembra o nome do imbuement.',ex:'/imbuement buscar termo:"proteção gelo armor"'},
    {c:'/imbuement receita',cat:'Game Database',t:'Receita e custo do imbuement',d:'Mostra materiais, efeito e custo do nível Basic, Intricate ou Powerful.',when:'Antes de comprar materiais ou ir ao shrine.',ex:'/imbuement receita tipo:void nivel:powerful'},
    {c:'/imbuement item',cat:'Game Database',t:'Imbuements por equipamento',d:'Lista imbuements compatíveis com o tipo de item escolhido.',when:'Quando você quer saber o que cabe em armor, helmet, shield, spellbook etc.',ex:'/imbuement item equipamento:armor'},

    {c:'/malveria',cat:'Social',t:'Malveria HQ',d:'Abre o ponto de entrada temático do DZbot para o mundo Malveria.',when:'Atalho central para a experiência do servidor.',ex:'/malveria'},
    {c:'/vergonha',cat:'Social',t:'Hall de mortes',d:'Ranking social das mortes observadas nos últimos 7 dias.',when:'Para zoeira e leitura rápida de quem mais morreu.',ex:'/vergonha'},
    {c:'/bagre',cat:'Social',t:'Bagrice 24h',d:'Mede a "bagrice" recente de um usuário/personagem conforme sinais sociais do bot.',when:'Para brincar com a galera sem perder o contexto do jogo.',ex:'/bagre user:@alguem'},
    {c:'/zoeira',cat:'Social',t:'Zoeira consentida',d:'Gera interação social leve respeitando a lógica de consentimento do recurso.',when:'Para entretenimento dentro da guild.',ex:'/zoeira user:@alguem'},
    {c:'/resumo',cat:'Social',t:'Resumo social',d:'Entrega um pulso social de Malveria com destaques observados.',when:'Para pegar o clima do servidor/guild rapidamente.',ex:'/resumo'},
    {c:'/musica',cat:'Social',t:'Música e pedidos',d:'Abre painel e recursos de pedidos de música integrados à experiência da guild.',when:'Para social e entretenimento.',ex:'/musica'},
    {c:'/rashid',cat:'Utilidades',t:'Rashid hoje',d:'Mostra onde o Rashid está no dia.',when:'Consulta diária rápida.',ex:'/rashid'},
    {c:'/roll',cat:'Utilidades',t:'Número aleatório',d:'Rola um número entre mínimo e máximo opcionais.',when:'Decisões rápidas, loot ou brincadeiras.',ex:'/roll min:1 max:100'}
  ];

  const automations = [
    ['🟢','Presence Intelligence','Online/offline de FRIEND, ENEMY e WATCH alimenta alertas, histórico e leitura da PT.'],
    ['⚔️','PvP Intelligence','Mortes PvP observadas entram na camada de inteligência e podem destacar envolvidos monitorados.'],
    ['📈','Skill Watch','Skills observadas são acompanhadas e mudanças relevantes podem gerar alertas/digests.'],
    ['🚀','EXP / Level Watch','Progressão de level e experiência alimenta rankings, evolução e resumos.'],
    ['👥','PT Pulse','Resumo operacional da PT com presença, hostis, evolução, mortes e skills em horários programados.'],
    ['💰','Bazaar Watch','Coleção periódica do Bazaar de Malveria e alertas para monitores configurados antes do fechamento.'],
    ['👹','Boss Intelligence','Snapshots, histórico e sinais alimentam estados como LEARNING/HOT sem transformar ausência de evidência em certeza.'],
    ['🏰','Castle Result','Após o Castelo, o DZbot pode detectar vencedor, placar, destaques e Legendary Chest e cruzar nomes monitorados.'],
    ['📅','Event Reminders','Eventos materializados podem gerar lembretes próximos do horário configurado.'],
    ['🚨','Enemy / Watch Radar','Alvos importantes ganham prioridade visual quando entram, saem ou aparecem em sinais relevantes.'],
    ['☠️','Death Intelligence','Mortes alimentam histórico, ranking social e contexto operacional.'],
    ['🧠','Player DNA Memory','Sessões, eventos, evolução e skills acumulam contexto para dossiês e análises futuras.']
  ];

  const playbooks = [
    ['Montar hunt agora','/online → /quemtaon → /dz pt → /team create → /poke','Transforma disponibilidade em uma PT organizada.'],
    ['Acompanhar inimigo','/enemy add → /enemy online → /radar timeline → /masslog → /war','Sai da lista estática e vira leitura operacional.'],
    ['Analisar um player','/charintel → /player info → /ranking → /watch history','Une ficha, histórico e contexto competitivo.'],
    ['Comprar char no Bazaar','/bazar acao:agora → /bazar acao:detalhe → /bazar acao:monitor','Filtra oportunidade e deixa o monitor cuidar do fechamento.'],
    ['Checar bosses','/boss → /boss name:upcoming → /boss name:hot → /boss name:"history Nome"','Prioriza atenção sem confundir sinal com certeza.'],
    ['Organizar respawn','/respawn bind → /respawn list → /respawn claim ou queue → /respawn release','Organiza ocupação e fila sem discussão manual.'],
    ['Planejar evento','/calendar → /events → /poll → /team create → /poke','Vai do planejamento à mobilização dentro do Discord.'],
    ['Evolução pessoal','/eu → /dz dna → /ranking → Skill/EXP Watch','Acompanha evolução sem planilha.'],
    ['Pesquisar conteúdo','/quest → /access → /item → /creature → /hunt → /imbuement','Mantém a pesquisa dentro do Discord.'],
    ['Entrou agora no DZbot','/dashboard → /linkchar → /eu → /online → /help','Roteiro simples para descobrir valor em poucos minutos.']
  ];

  const categories = ['Todos', ...new Set(commands.map(x => x.cat))];
  const grid = root.querySelector('#guideGrid');
  const filters = root.querySelector('#guideFilters');
  const search = root.querySelector('#guideSearch');
  const count = root.querySelector('#guideCount');
  const empty = root.querySelector('#guideEmpty');
  const autoGrid = root.querySelector('#guideAutoGrid');
  const playbookGrid = root.querySelector('#guidePlaybooks');
  let active = 'Todos';

  const esc = s => String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

  function renderFilters(){
    filters.innerHTML = categories.map(cat => `<button type="button" class="guide-filter ${cat===active?'active':''}" data-guide-cat="${esc(cat)}">${esc(cat)}</button>`).join('');
  }

  function card(x){
    return `<details class="guide-card">
      <summary>
        <div class="guide-card-top"><span class="guide-command">${esc(x.c)}</span><span class="guide-category">${esc(x.cat)}</span></div>
        <h4>${esc(x.t)}</h4><p>${esc(x.d)}</p><span class="guide-open">ABRIR EXEMPLO +</span>
      </summary>
      <div class="guide-card-body">
        <div class="guide-block"><span>Quando usar</span><p>${esc(x.when)}</p></div>
        <div class="guide-block"><span>Exemplo</span><div class="guide-example"><code>${esc(x.ex)}</code><button type="button" class="guide-copy" data-copy="${esc(x.ex)}">COPIAR</button></div></div>
      </div>
    </details>`;
  }

  function render(){
    const q = normalize(search.value.trim());
    const rows = commands.filter(x => {
      if (active !== 'Todos' && x.cat !== active) return false;
      if (!q) return true;
      return normalize([x.c,x.cat,x.t,x.d,x.when,x.ex].join(' ')).includes(q);
    });
    grid.innerHTML = rows.map(card).join('');
    count.textContent = `${rows.length} recurso${rows.length===1?'':'s'} encontrado${rows.length===1?'':'s'}`;
    empty.style.display = rows.length ? 'none' : 'block';
  }

  renderFilters();
  render();
  root.querySelector('#guideCommandTotal').textContent = commands.length;
  autoGrid.innerHTML = automations.map(x => `<article class="guide-auto"><i>${x[0]}</i><b>${esc(x[1])}</b><p>${esc(x[2])}</p></article>`).join('');
  playbookGrid.innerHTML = playbooks.map(x => `<article class="guide-playbook"><header><b>${esc(x[0])}</b><span>PLAYBOOK</span></header><code class="guide-flow">${esc(x[1])}</code><p>${esc(x[2])}</p></article>`).join('');

  filters.addEventListener('click', e => {
    const b = e.target.closest('[data-guide-cat]');
    if (!b) return;
    active = b.dataset.guideCat;
    renderFilters(); render();
  });
  search.addEventListener('input', render);
  root.querySelector('#guideExpand').addEventListener('click', () => {
    root.querySelectorAll('.guide-card').forEach(d => d.open = true);
  });
  root.addEventListener('click', async e => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
      const toast = document.querySelector('.guide-copy-toast');
      toast.textContent = 'Comando copiado';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 1300);
    } catch (_) {}
  });
})();
