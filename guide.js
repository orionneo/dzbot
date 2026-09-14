(() => {
  const root = document.getElementById('guia');
  if (!root) return;

  // SOURCE OF TRUTH: Raspberry production audit 2026-09-14.
  // Admin/restricted commands intentionally excluded from the player guide.
  const commands = [
  {
    "c": "/bans",
    "cat": "Guild & Radar",
    "t": "Bans ativos e histórico observado pelo bot",
    "d": "Bans ativos e histórico observado pelo bot. Personagem para consultar o histórico",
    "when": "Use quando você quiser: bans ativos e histórico observado pelo bot.",
    "ex": "/bans"
  },
  {
    "c": "/bazar",
    "cat": "Bazaar",
    "t": "Bazaar Intelligence de Malveria",
    "d": "Bazaar Intelligence de Malveria. Ação: Agora — Top 10, Monitorar, Meus monitores, Remover monitor, Detalhe do leilão. Vocação: Royal Paladin, Elite Knight, Elder Druid, Master Sorcerer, Exalted Monk. Level mínimo Teto de lance em Rubini Coins",
    "when": "Use quando você quiser: bazaar Intelligence de Malveria.",
    "ex": "/bazar acao:agora"
  },
  {
    "c": "/player add",
    "cat": "Player",
    "t": "Adiciona um personagem",
    "d": "Adiciona um personagem. Nome",
    "when": "Use quando você quiser: adiciona um personagem.",
    "ex": "/player add character:Nome do Player"
  },
  {
    "c": "/player remove",
    "cat": "Player",
    "t": "Remove um personagem",
    "d": "Remove um personagem. Nome",
    "when": "Use quando você quiser: remove um personagem.",
    "ex": "/player remove character:Nome do Player"
  },
  {
    "c": "/player list",
    "cat": "Player",
    "t": "Lista personagens",
    "d": "Lista personagens",
    "when": "Use quando você quiser: lista personagens.",
    "ex": "/player list"
  },
  {
    "c": "/player info",
    "cat": "Player",
    "t": "Consulta um personagem",
    "d": "Consulta um personagem. Nome",
    "when": "Use quando você quiser: consulta um personagem.",
    "ex": "/player info character:Nome do Player"
  },
  {
    "c": "/player online",
    "cat": "Player",
    "t": "Lista quem está online",
    "d": "Lista quem está online",
    "when": "Use quando você quiser: lista quem está online.",
    "ex": "/player online"
  },
  {
    "c": "/player history",
    "cat": "Player",
    "t": "Histórico",
    "d": "Histórico. Nome",
    "when": "Use quando você quiser: histórico.",
    "ex": "/player history character:Nome do Player"
  },
  {
    "c": "/track add",
    "cat": "Guild & Radar",
    "t": "Adiciona um player ao radar",
    "d": "Adiciona um player ao radar. Nome do player",
    "when": "Use quando você quiser: adiciona um player ao radar.",
    "ex": "/track add player:Nome do Player"
  },
  {
    "c": "/track remove",
    "cat": "Guild & Radar",
    "t": "Remove um player do radar",
    "d": "Remove um player do radar. Nome do player",
    "when": "Use quando você quiser: remove um player do radar.",
    "ex": "/track remove player:Nome do Player"
  },
  {
    "c": "/track list",
    "cat": "Guild & Radar",
    "t": "Lista o radar",
    "d": "Lista o radar",
    "when": "Use quando você quiser: lista o radar.",
    "ex": "/track list"
  },
  {
    "c": "/track info",
    "cat": "Guild & Radar",
    "t": "Mostra um player monitorado",
    "d": "Mostra um player monitorado. Nome do player",
    "when": "Use quando você quiser: mostra um player monitorado.",
    "ex": "/track info player:Nome do Player"
  },
  {
    "c": "/track alerts",
    "cat": "Guild & Radar",
    "t": "Liga ou desliga os alertas",
    "d": "Liga ou desliga os alertas. Nome do player Estado: Ligados, Desligados.",
    "when": "Use quando você quiser: liga ou desliga os alertas.",
    "ex": "/track alerts player:Nome do Player state:on"
  },
  {
    "c": "/radar status",
    "cat": "Guild & Radar",
    "t": "Saúde do radar",
    "d": "Saúde do radar",
    "when": "Use quando você quiser: saúde do radar.",
    "ex": "/radar status"
  },
  {
    "c": "/radar channel",
    "cat": "Guild & Radar",
    "t": "Define o canal de alertas",
    "d": "Define o canal de alertas. Canal",
    "when": "Use quando você quiser: define o canal de alertas.",
    "ex": "/radar channel channel:#dz-radar"
  },
  {
    "c": "/radar timeline",
    "cat": "Guild & Radar",
    "t": "Últimos eventos do radar",
    "d": "Últimos eventos do radar",
    "when": "Use quando você quiser: últimos eventos do radar.",
    "ex": "/radar timeline"
  },
  {
    "c": "/ranking",
    "cat": "Ranking & Skills",
    "t": "Ranking interno",
    "d": "Ranking interno. Período: Hoje, 7 dias, 30 dias. Critério: Levels ganhos, Deaths, Tempo online, Maior sessão, 🌎 Top 20 Level Malveria, 🌎 Top 10 EXP Malveria, 🌎 Top 20 Magic, 🌎 Top 20 Distance +17.",
    "when": "Use quando você quiser: ranking interno.",
    "ex": "/ranking"
  },
  {
    "c": "/musica painel",
    "cat": "Social",
    "t": "Abre a central",
    "d": "Abre a central",
    "when": "Use quando você quiser: abre a central.",
    "ex": "/musica painel"
  },
  {
    "c": "/musica pedir",
    "cat": "Social",
    "t": "Adiciona um pedido",
    "d": "Adiciona um pedido. URL ou nome",
    "when": "Use quando você quiser: adiciona um pedido.",
    "ex": "/musica pedir musica:Nome ou URL"
  },
  {
    "c": "/musica pedidos",
    "cat": "Social",
    "t": "Mostra pedidos",
    "d": "Mostra pedidos",
    "when": "Use quando você quiser: mostra pedidos.",
    "ex": "/musica pedidos"
  },
  {
    "c": "/pt",
    "cat": "PT & Organização",
    "t": "Painel interativo da PT",
    "d": "Painel interativo da PT",
    "when": "Use quando você quiser: painel interativo da PT.",
    "ex": "/pt"
  },
  {
    "c": "/trial",
    "cat": "Começar",
    "t": "Mostra licença ou tempo restante do trial deste servidor",
    "d": "Mostra licença ou tempo restante do trial deste servidor",
    "when": "Use quando você quiser: mostra licença ou tempo restante do trial deste servidor.",
    "ex": "/trial"
  },
  {
    "c": "/respawn bind",
    "cat": "PT & Organização",
    "t": "Define seu personagem padrão",
    "d": "Define seu personagem padrão. Seu char",
    "when": "Use quando você quiser: define seu personagem padrão.",
    "ex": "/respawn bind character:Nome do Player"
  },
  {
    "c": "/respawn add",
    "cat": "PT & Organização",
    "t": "Cadastra/atualiza um respawn",
    "d": "Cadastra/atualiza um respawn. Código curto, ex. ingol-5 Nome do respawn Limite em minutos Grace do próximo da fila",
    "when": "Use quando você quiser: cadastra/atualiza um respawn.",
    "ex": "/respawn add code:ingol-5 name:Nome"
  },
  {
    "c": "/respawn list",
    "cat": "PT & Organização",
    "t": "Lista respawns e ocupação",
    "d": "Lista respawns e ocupação",
    "when": "Use quando você quiser: lista respawns e ocupação.",
    "ex": "/respawn list"
  },
  {
    "c": "/respawn claim",
    "cat": "PT & Organização",
    "t": "Assume um respawn",
    "d": "Assume um respawn. Código Char; opcional se já usou bind Tempo desejado",
    "when": "Use quando você quiser: assume um respawn.",
    "ex": "/respawn claim code:ingol-5"
  },
  {
    "c": "/respawn queue",
    "cat": "PT & Organização",
    "t": "Entra na fila",
    "d": "Entra na fila. Código Char; opcional se já usou bind",
    "when": "Use quando você quiser: entra na fila.",
    "ex": "/respawn queue code:ingol-5"
  },
  {
    "c": "/respawn leave",
    "cat": "PT & Organização",
    "t": "Sai da fila",
    "d": "Sai da fila. Código",
    "when": "Use quando você quiser: sai da fila.",
    "ex": "/respawn leave code:ingol-5"
  },
  {
    "c": "/respawn release",
    "cat": "PT & Organização",
    "t": "Libera o respawn",
    "d": "Libera o respawn. Código",
    "when": "Use quando você quiser: libera o respawn.",
    "ex": "/respawn release code:ingol-5"
  },
  {
    "c": "/respawn info",
    "cat": "PT & Organização",
    "t": "Mostra ocupação e fila",
    "d": "Mostra ocupação e fila. Código",
    "when": "Use quando você quiser: mostra ocupação e fila.",
    "ex": "/respawn info code:ingol-5"
  },
  {
    "c": "/respawn history",
    "cat": "PT & Organização",
    "t": "Histórico recente",
    "d": "Histórico recente. Código",
    "when": "Use quando você quiser: histórico recente.",
    "ex": "/respawn history code:ingol-5"
  },
  {
    "c": "/respawn pause",
    "cat": "PT & Organização",
    "t": "Pausa/reativa um respawn",
    "d": "Pausa/reativa um respawn. Código true=pausar",
    "when": "Use quando você quiser: pausa/reativa um respawn.",
    "ex": "/respawn pause code:ingol-5 state:on"
  },
  {
    "c": "/guildwatch add",
    "cat": "Guild & Radar",
    "t": "Monitora uma guild",
    "d": "Monitora uma guild. Nome da guild Classificação: Enemy, Neutral, Ally.",
    "when": "Use quando você quiser: monitora uma guild.",
    "ex": "/guildwatch add guild:Nome da Guild"
  },
  {
    "c": "/guildwatch remove",
    "cat": "Guild & Radar",
    "t": "Remove uma guild",
    "d": "Remove uma guild. Nome da guild",
    "when": "Use quando você quiser: remove uma guild.",
    "ex": "/guildwatch remove guild:Nome da Guild"
  },
  {
    "c": "/guildwatch list",
    "cat": "Guild & Radar",
    "t": "Lista guilds monitoradas",
    "d": "Lista guilds monitoradas",
    "when": "Use quando você quiser: lista guilds monitoradas.",
    "ex": "/guildwatch list"
  },
  {
    "c": "/guildwatch status",
    "cat": "Guild & Radar",
    "t": "Status de uma guild",
    "d": "Status de uma guild. Nome da guild",
    "when": "Use quando você quiser: status de uma guild.",
    "ex": "/guildwatch status guild:Nome da Guild"
  },
  {
    "c": "/guildwatch refresh",
    "cat": "Guild & Radar",
    "t": "Força descoberta de membros públicos",
    "d": "Força descoberta de membros públicos. Nome da guild",
    "when": "Use quando você quiser: força descoberta de membros públicos.",
    "ex": "/guildwatch refresh guild:Nome da Guild"
  },
  {
    "c": "/charintel",
    "cat": "Player",
    "t": "DZ Character Intelligence",
    "d": "DZ Character Intelligence. Personagem",
    "when": "Use quando você quiser: dZ Character Intelligence.",
    "ex": "/charintel character:Nome do Player"
  },
  {
    "c": "/team create",
    "cat": "PT & Organização",
    "t": "Cria um evento/PT",
    "d": "Cria um evento/PT. Código curto Nome do evento HH:MM ou ISO com -03:00 Máximo de players",
    "when": "Use quando você quiser: cria um evento/PT.",
    "ex": "/team create code:ingol-5 title:Hunt da PT when:20:00"
  },
  {
    "c": "/team list",
    "cat": "PT & Organização",
    "t": "Lista eventos abertos",
    "d": "Lista eventos abertos",
    "when": "Use quando você quiser: lista eventos abertos.",
    "ex": "/team list"
  },
  {
    "c": "/team info",
    "cat": "PT & Organização",
    "t": "Detalhes",
    "d": "Detalhes. Código",
    "when": "Use quando você quiser: detalhes.",
    "ex": "/team info code:ingol-5"
  },
  {
    "c": "/team join",
    "cat": "PT & Organização",
    "t": "Entra no evento",
    "d": "Entra no evento. Código Seu char Vocação: EK, RP, ED, MS, EM.",
    "when": "Use quando você quiser: entra no evento.",
    "ex": "/team join code:ingol-5"
  },
  {
    "c": "/team leave",
    "cat": "PT & Organização",
    "t": "Sai do evento",
    "d": "Sai do evento. Código",
    "when": "Use quando você quiser: sai do evento.",
    "ex": "/team leave code:ingol-5"
  },
  {
    "c": "/team start",
    "cat": "PT & Organização",
    "t": "Inicia o evento",
    "d": "Inicia o evento. Código",
    "when": "Use quando você quiser: inicia o evento.",
    "ex": "/team start code:ingol-5"
  },
  {
    "c": "/team cancel",
    "cat": "PT & Organização",
    "t": "Cancela o evento",
    "d": "Cancela o evento. Código",
    "when": "Use quando você quiser: cancela o evento.",
    "ex": "/team cancel code:ingol-5"
  },
  {
    "c": "/war",
    "cat": "Guild & Radar",
    "t": "DZ War Room de Malveria",
    "d": "DZ War Room de Malveria",
    "when": "Use quando você quiser: dZ War Room de Malveria.",
    "ex": "/war"
  },
  {
    "c": "/masslog",
    "cat": "Guild & Radar",
    "t": "Últimos sinais de masslog",
    "d": "Últimos sinais de masslog",
    "when": "Use quando você quiser: últimos sinais de masslog.",
    "ex": "/masslog"
  },
  {
    "c": "/linkchar",
    "cat": "Player",
    "t": "Vincula um personagem do Tibia a um usuário do Discord",
    "d": "Vincula um personagem do Tibia a um usuário do Discord. Nome exato do personagem Usuário do Discord; admins podem vincular outra pessoa",
    "when": "Use quando você quiser: vincula um personagem do Tibia a um usuário do Discord.",
    "ex": "/linkchar character:Nome do Player"
  },
  {
    "c": "/poke",
    "cat": "PT & Organização",
    "t": "Chama a PT com um alerta estilo TeamSpeak",
    "d": "Chama a PT com um alerta estilo TeamSpeak. Quem receberá o poke: Todos os FRIENDs vinculados, FRIENDs online vinculados. Motivo curto: boss, hunt, castelo, ajuda...",
    "when": "Use quando você quiser: chama a PT com um alerta estilo TeamSpeak.",
    "ex": "/poke"
  },
  {
    "c": "/dz agora",
    "cat": "Player",
    "t": "Leitura inteligente do que está acontecendo agora",
    "d": "Leitura inteligente do que está acontecendo agora",
    "when": "Use quando você quiser: leitura inteligente do que está acontecendo agora.",
    "ex": "/dz agora"
  },
  {
    "c": "/dz pt",
    "cat": "Player",
    "t": "Monta as melhores PTs disponíveis agora",
    "d": "Monta as melhores PTs disponíveis agora",
    "when": "Use quando você quiser: monta as melhores PTs disponíveis agora.",
    "ex": "/dz pt"
  },
  {
    "c": "/dz daily",
    "cat": "Player",
    "t": "Resumo premium do dia",
    "d": "Resumo premium do dia",
    "when": "Use quando você quiser: resumo premium do dia.",
    "ex": "/dz daily"
  },
  {
    "c": "/dz dna",
    "cat": "Player",
    "t": "Player DNA completo",
    "d": "Player DNA completo. Personagem; vazio = seu /linkchar",
    "when": "Use quando você quiser: player DNA completo.",
    "ex": "/dz dna"
  },
  {
    "c": "/dz conquistas",
    "cat": "Player",
    "t": "Conquistas observadas",
    "d": "Conquistas observadas. Personagem; vazio = seu /linkchar",
    "when": "Use quando você quiser: conquistas observadas.",
    "ex": "/dz conquistas"
  },
  {
    "c": "/eu",
    "cat": "Player",
    "t": "Seu DZ ID, DNA, evolução e conquistas",
    "d": "Seu DZ ID, DNA, evolução e conquistas",
    "when": "Use quando você quiser: seu DZ ID, DNA, evolução e conquistas.",
    "ex": "/eu"
  },
  {
    "c": "/watchme add",
    "cat": "Player",
    "t": "Avise quando esse personagem entrar",
    "d": "Avise quando esse personagem entrar. Personagem monitorado",
    "when": "Use quando você quiser: avise quando esse personagem entrar.",
    "ex": "/watchme add character:Nome do Player"
  },
  {
    "c": "/watchme remove",
    "cat": "Player",
    "t": "Remove seu alerta pessoal",
    "d": "Remove seu alerta pessoal. Personagem",
    "when": "Use quando você quiser: remove seu alerta pessoal.",
    "ex": "/watchme remove character:Nome do Player"
  },
  {
    "c": "/watchme list",
    "cat": "Player",
    "t": "Lista seus alertas pessoais",
    "d": "Lista seus alertas pessoais",
    "when": "Use quando você quiser: lista seus alertas pessoais.",
    "ex": "/watchme list"
  },
  {
    "c": "/poll",
    "cat": "Social",
    "t": "Enquete rápida com botões",
    "d": "Enquete rápida com botões. Pergunta Opção 1 Opção 2 Opção 3",
    "when": "Use quando você quiser: enquete rápida com botões.",
    "ex": "/poll question:Vamos castelo? option1:Sim option2:Não"
  },
  {
    "c": "/lottery",
    "cat": "Social",
    "t": "Sorteio rápido",
    "d": "Sorteio rápido. Nomes separados por vírgula; vazio = membros em cache",
    "when": "Use quando você quiser: sorteio rápido.",
    "ex": "/lottery"
  },
  {
    "c": "/share",
    "cat": "PT & Organização",
    "t": "Faixa aproximada para shared XP",
    "d": "Faixa aproximada para shared XP. Seu level",
    "when": "Use quando você quiser: faixa aproximada para shared XP.",
    "ex": "/share level:800"
  },
  {
    "c": "/rashid",
    "cat": "Utilidades",
    "t": "Localização do Rashid hoje",
    "d": "Localização do Rashid hoje",
    "when": "Use quando você quiser: localização do Rashid hoje.",
    "ex": "/rashid"
  },
  {
    "c": "/roll",
    "cat": "Utilidades",
    "t": "Rola um número",
    "d": "Rola um número. Mínimo Máximo",
    "when": "Use quando você quiser: rola um número.",
    "ex": "/roll"
  },
  {
    "c": "/quest info",
    "cat": "Game Database",
    "t": "Consulta uma quest",
    "d": "Consulta uma quest. Quest",
    "when": "Use quando você quiser: consulta uma quest.",
    "ex": "/quest info name:Nome"
  },
  {
    "c": "/quest start",
    "cat": "Game Database",
    "t": "Inicia o guia",
    "d": "Inicia o guia. Quest",
    "when": "Use quando você quiser: inicia o guia.",
    "ex": "/quest start name:Nome"
  },
  {
    "c": "/quest next",
    "cat": "Game Database",
    "t": "Próximo passo",
    "d": "Próximo passo",
    "when": "Use quando você quiser: próximo passo.",
    "ex": "/quest next"
  },
  {
    "c": "/quest previous",
    "cat": "Game Database",
    "t": "Passo anterior",
    "d": "Passo anterior",
    "when": "Use quando você quiser: passo anterior.",
    "ex": "/quest previous"
  },
  {
    "c": "/quest reset",
    "cat": "Game Database",
    "t": "Reinicia progresso",
    "d": "Reinicia progresso",
    "when": "Use quando você quiser: reinicia progresso.",
    "ex": "/quest reset"
  },
  {
    "c": "/quest requirements",
    "cat": "Game Database",
    "t": "Mostra requisitos",
    "d": "Mostra requisitos. Quest",
    "when": "Use quando você quiser: mostra requisitos.",
    "ex": "/quest requirements name:Nome"
  },
  {
    "c": "/quest sources",
    "cat": "Game Database",
    "t": "Mostra fonte",
    "d": "Mostra fonte. Quest",
    "when": "Use quando você quiser: mostra fonte.",
    "ex": "/quest sources name:Nome"
  },
  {
    "c": "/access",
    "cat": "Game Database",
    "t": "Consulta access",
    "d": "Consulta access. Nome",
    "when": "Use quando você quiser: consulta access.",
    "ex": "/access name:Nome"
  },
  {
    "c": "/creature",
    "cat": "Game Database",
    "t": "Consulta creature",
    "d": "Consulta creature. Nome",
    "when": "Use quando você quiser: consulta creature.",
    "ex": "/creature name:Nome"
  },
  {
    "c": "/loot",
    "cat": "Game Database",
    "t": "Consulta loot",
    "d": "Consulta loot. Nome",
    "when": "Use quando você quiser: consulta loot.",
    "ex": "/loot name:Nome"
  },
  {
    "c": "/rare",
    "cat": "Game Database",
    "t": "Consulta rare",
    "d": "Consulta rare. Nome",
    "when": "Use quando você quiser: consulta rare.",
    "ex": "/rare name:Nome"
  },
  {
    "c": "/drops",
    "cat": "Game Database",
    "t": "Consulta drops",
    "d": "Consulta drops. Nome",
    "when": "Use quando você quiser: consulta drops.",
    "ex": "/drops name:Nome"
  },
  {
    "c": "/item",
    "cat": "Game Database",
    "t": "Consulta item",
    "d": "Consulta item. Nome",
    "when": "Use quando você quiser: consulta item.",
    "ex": "/item name:Nome"
  },
  {
    "c": "/boss",
    "cat": "Bosses & Eventos",
    "t": "Boss Intelligence de Malveria",
    "d": "Boss Intelligence de Malveria. Boss, upcoming, hot, watch ou \"history Nome\" Categoria canônica: Nemesis, Archfoe, Bane, Sem categoria. World Change monitorado: Raging Mage / Yielothax. Ação do monitor: Acompanhar, Status, Parar.",
    "when": "Use quando você quiser: boss Intelligence de Malveria.",
    "ex": "/boss"
  },
  {
    "c": "/events",
    "cat": "Bosses & Eventos",
    "t": "Eventos confirmados",
    "d": "Eventos confirmados",
    "when": "Use quando você quiser: eventos confirmados.",
    "ex": "/events"
  },
  {
    "c": "/calendar",
    "cat": "Bosses & Eventos",
    "t": "Calendário de eventos",
    "d": "Calendário de eventos",
    "when": "Use quando você quiser: calendário de eventos.",
    "ex": "/calendar"
  },
  {
    "c": "/boosted",
    "cat": "Bosses & Eventos",
    "t": "Boosted confirmado",
    "d": "Boosted confirmado",
    "when": "Use quando você quiser: boosted confirmado.",
    "ex": "/boosted"
  },
  {
    "c": "/npc",
    "cat": "Game Database",
    "t": "Consulta npc",
    "d": "Consulta npc. Nome",
    "when": "Use quando você quiser: consulta npc.",
    "ex": "/npc name:Nome"
  },
  {
    "c": "/hunt",
    "cat": "Game Database",
    "t": "Consulta hunt",
    "d": "Consulta hunt. Nome",
    "when": "Use quando você quiser: consulta hunt.",
    "ex": "/hunt name:Nome"
  },
  {
    "c": "/charm",
    "cat": "Game Database",
    "t": "Consulta charm",
    "d": "Consulta charm. Nome",
    "when": "Use quando você quiser: consulta charm.",
    "ex": "/charm name:Nome"
  },
  {
    "c": "/outfit",
    "cat": "Game Database",
    "t": "Consulta outfit",
    "d": "Consulta outfit. Nome",
    "when": "Use quando você quiser: consulta outfit.",
    "ex": "/outfit name:Nome"
  },
  {
    "c": "/mount",
    "cat": "Game Database",
    "t": "Consulta mount",
    "d": "Consulta mount. Nome",
    "when": "Use quando você quiser: consulta mount.",
    "ex": "/mount name:Nome"
  },
  {
    "c": "/malveria",
    "cat": "Guild & Radar",
    "t": "Abre a Malveria HQ",
    "d": "Abre a Malveria HQ",
    "when": "Use quando você quiser: abre a Malveria HQ.",
    "ex": "/malveria"
  },
  {
    "c": "/vergonha",
    "cat": "Social",
    "t": "Hall de mortes dos últimos 7 dias",
    "d": "Hall de mortes dos últimos 7 dias",
    "when": "Use quando você quiser: hall de mortes dos últimos 7 dias.",
    "ex": "/vergonha"
  },
  {
    "c": "/bagre",
    "cat": "Social",
    "t": "Mede a bagrice por 24h",
    "d": "Mede a bagrice por 24h. Vítima",
    "when": "Use quando você quiser: mede a bagrice por 24h.",
    "ex": "/bagre user:@player"
  },
  {
    "c": "/zoeira",
    "cat": "Social",
    "t": "Zoeira leve e consentida com alguém",
    "d": "Zoeira leve e consentida com alguém. Pessoa Ao escolher você mesmo, liga/desliga sua zoeira",
    "when": "Use quando você quiser: zoeira leve e consentida com alguém.",
    "ex": "/zoeira user:@player"
  },
  {
    "c": "/resumo",
    "cat": "Social",
    "t": "Resumo social de Malveria",
    "d": "Resumo social de Malveria",
    "when": "Use quando você quiser: resumo social de Malveria.",
    "ex": "/resumo"
  },
  {
    "c": "/quemtaon",
    "cat": "Guild & Radar",
    "t": "Mostra rapidamente quem está online",
    "d": "Mostra rapidamente quem está online",
    "when": "Use quando você quiser: mostra rapidamente quem está online.",
    "ex": "/quemtaon"
  },
  {
    "c": "/help",
    "cat": "Começar",
    "t": "Ajuda por categorias",
    "d": "Ajuda por categorias",
    "when": "Use quando você quiser: ajuda por categorias.",
    "ex": "/help"
  },
  {
    "c": "/status",
    "cat": "Começar",
    "t": "Status dos serviços",
    "d": "Status dos serviços",
    "when": "Use quando você quiser: status dos serviços.",
    "ex": "/status"
  },
  {
    "c": "/ping",
    "cat": "Começar",
    "t": "Mede a latência",
    "d": "Mede a latência",
    "when": "Use quando você quiser: mede a latência.",
    "ex": "/ping"
  },
  {
    "c": "/friend add",
    "cat": "Guild & Radar",
    "t": "Adiciona personagem",
    "d": "Adiciona personagem. Nome",
    "when": "Use quando você quiser: adiciona personagem.",
    "ex": "/friend add character:Nome do Player"
  },
  {
    "c": "/friend remove",
    "cat": "Guild & Radar",
    "t": "Remove personagem",
    "d": "Remove personagem. Nome",
    "when": "Use quando você quiser: remove personagem.",
    "ex": "/friend remove character:Nome do Player"
  },
  {
    "c": "/friend list",
    "cat": "Guild & Radar",
    "t": "Lista personagens",
    "d": "Lista personagens",
    "when": "Use quando você quiser: lista personagens.",
    "ex": "/friend list"
  },
  {
    "c": "/friend online",
    "cat": "Guild & Radar",
    "t": "Lista online",
    "d": "Lista online",
    "when": "Use quando você quiser: lista online.",
    "ex": "/friend online"
  },
  {
    "c": "/friend history",
    "cat": "Guild & Radar",
    "t": "Histórico",
    "d": "Histórico. Nome",
    "when": "Use quando você quiser: histórico.",
    "ex": "/friend history character:Nome do Player"
  },
  {
    "c": "/enemy add",
    "cat": "Guild & Radar",
    "t": "Adiciona personagem",
    "d": "Adiciona personagem. Nome",
    "when": "Use quando você quiser: adiciona personagem.",
    "ex": "/enemy add character:Nome do Player"
  },
  {
    "c": "/enemy remove",
    "cat": "Guild & Radar",
    "t": "Remove personagem",
    "d": "Remove personagem. Nome",
    "when": "Use quando você quiser: remove personagem.",
    "ex": "/enemy remove character:Nome do Player"
  },
  {
    "c": "/enemy list",
    "cat": "Guild & Radar",
    "t": "Lista personagens",
    "d": "Lista personagens",
    "when": "Use quando você quiser: lista personagens.",
    "ex": "/enemy list"
  },
  {
    "c": "/enemy online",
    "cat": "Guild & Radar",
    "t": "Lista online",
    "d": "Lista online",
    "when": "Use quando você quiser: lista online.",
    "ex": "/enemy online"
  },
  {
    "c": "/enemy history",
    "cat": "Guild & Radar",
    "t": "Histórico",
    "d": "Histórico. Nome",
    "when": "Use quando você quiser: histórico.",
    "ex": "/enemy history character:Nome do Player"
  },
  {
    "c": "/watch add",
    "cat": "Guild & Radar",
    "t": "Adiciona personagem",
    "d": "Adiciona personagem. Nome",
    "when": "Use quando você quiser: adiciona personagem.",
    "ex": "/watch add character:Nome do Player"
  },
  {
    "c": "/watch remove",
    "cat": "Guild & Radar",
    "t": "Remove personagem",
    "d": "Remove personagem. Nome",
    "when": "Use quando você quiser: remove personagem.",
    "ex": "/watch remove character:Nome do Player"
  },
  {
    "c": "/watch list",
    "cat": "Guild & Radar",
    "t": "Lista personagens",
    "d": "Lista personagens",
    "when": "Use quando você quiser: lista personagens.",
    "ex": "/watch list"
  },
  {
    "c": "/watch online",
    "cat": "Guild & Radar",
    "t": "Lista online",
    "d": "Lista online",
    "when": "Use quando você quiser: lista online.",
    "ex": "/watch online"
  },
  {
    "c": "/watch history",
    "cat": "Guild & Radar",
    "t": "Histórico",
    "d": "Histórico. Nome",
    "when": "Use quando você quiser: histórico.",
    "ex": "/watch history character:Nome do Player"
  },
  {
    "c": "/online",
    "cat": "Guild & Radar",
    "t": "Radar de jogadores online",
    "d": "Radar de jogadores online",
    "when": "Use quando você quiser: radar de jogadores online.",
    "ex": "/online"
  },
  {
    "c": "/imbuement guia",
    "cat": "Game Database",
    "t": "Mostra exemplos e ensina a usar o assistente",
    "d": "Mostra exemplos e ensina a usar o assistente",
    "when": "Use quando você quiser: mostra exemplos e ensina a usar o assistente.",
    "ex": "/imbuement guia"
  },
  {
    "c": "/imbuement buscar",
    "cat": "Game Database",
    "t": "Diga do seu jeito: proteção gelo armor, mana, crit, bp cap...",
    "d": "Diga do seu jeito: proteção gelo armor, mana, crit, bp cap. Ex.: proteção gelo armor | mana helmet | crit bow | bp cap",
    "when": "Use quando você quiser: diga do seu jeito: proteção gelo armor, mana, crit, bp cap....",
    "ex": "/imbuement buscar termo:crit bow"
  },
  {
    "c": "/imbuement receita",
    "cat": "Game Database",
    "t": "Mostra materiais, efeito e custo do nível escolhido",
    "d": "Mostra materiais, efeito e custo do nível escolhido. Qual imbuement?: Bash, Blockade, Chop, Epiphany, Precision, Punch, Slash, Electrify +16. Qual nível?: Basic, Intricate, Powerful.",
    "when": "Use quando você quiser: mostra materiais, efeito e custo do nível escolhido.",
    "ex": "/imbuement receita tipo:bash nivel:basic"
  },
  {
    "c": "/imbuement item",
    "cat": "Game Database",
    "t": "Lista os imbuements compatíveis com um tipo de equipamento",
    "d": "Lista os imbuements compatíveis com um tipo de equipamento. Escolha o tipo do item: Armor / Armadura, Helmet / Capacete, Shield / Escudo, Spellbook, Backpack / BP, Boots / Botas, Bow / Arco, Crossbow +5.",
    "when": "Use quando você quiser: lista os imbuements compatíveis com um tipo de equipamento.",
    "ex": "/imbuement item equipamento:armor"
  },
  {
    "c": "/dzbot status",
    "cat": "Começar",
    "t": "Confirma se o DZbot está online",
    "d": "Confirma se o DZbot está online",
    "when": "Use quando você quiser: confirma se o DZbot está online.",
    "ex": "/dzbot status"
  },
  {
    "c": "/dzbot novidades",
    "cat": "Começar",
    "t": "Mostra a release atual e novos recursos",
    "d": "Mostra a release atual e novos recursos",
    "when": "Use quando você quiser: mostra a release atual e novos recursos.",
    "ex": "/dzbot novidades"
  },
  {
    "c": "/dzbot assinatura",
    "cat": "Começar",
    "t": "Consulta a assinatura desta guild (somente leitura)",
    "d": "Consulta a assinatura desta guild (somente leitura)",
    "when": "Use quando você quiser: consulta a assinatura desta guild (somente leitura).",
    "ex": "/dzbot assinatura"
  },
  {
    "c": "/dzbot ajuda",
    "cat": "Começar",
    "t": "Explica a central do DZbot",
    "d": "Explica a central do DZbot",
    "when": "Use quando você quiser: explica a central do DZbot.",
    "ex": "/dzbot ajuda"
  }
];

  const automations = [
  [
    "📅",
    "Event Engine",
    "Timer ativo a cada minuto para processar o motor de eventos do DZbot."
  ],
  [
    "⏰",
    "Event Reminder",
    "Timer ativo a cada minuto para entregar lembretes de eventos materializados."
  ],
  [
    "🏰",
    "Castle Result Intelligence",
    "Poller ativo a cada minuto para processar o resultado do Castle quando aplicável."
  ],
  [
    "🛡️",
    "Watchdog",
    "Health check automático do DZbot a cada 2 minutos, com recuperação operacional."
  ],
  [
    "💚",
    "Health Watch",
    "Verificação interna de saúde a cada 5 minutos e publicação de transições de estado."
  ],
  [
    "💰",
    "Bazaar Watches",
    "O ambiente possui cache do Bazaar de Malveria e arquivo de watches; /bazar monitor gerencia esses monitores."
  ],
  [
    "📈",
    "Player/Event Pipeline",
    "O código de produção inclui pipeline de eventos de player, radar notifier, skill edge e ranking por vocação."
  ],
  [
    "👥",
    "PT / Social Pulse",
    "O build de produção inclui commercial-pt-pulse, guild-daily-xp e social-pulse como serviços ativos do produto."
  ]
];

  const playbooks = [
  [
    "Primeiro contato",
    "/help → /linkchar → /eu → /online",
    "Descubra os recursos, vincule seu personagem e veja rapidamente o contexto atual."
  ],
  [
    "Montar PT",
    "/online → /quemtaon → /dz pt → /team create → /poke",
    "Use presença, sugestão de PT, evento e chamada da galera em sequência."
  ],
  [
    "Acompanhar hostil",
    "/enemy add → /enemy online → /radar timeline → /masslog → /war",
    "Transforme uma lista de inimigos em leitura operacional."
  ],
  [
    "Bazaar",
    "/bazar acao:agora → /bazar acao:detalhe leilao:12345 → /bazar acao:monitor vocacao:RP",
    "Pesquise, veja detalhe e crie monitor usando ações que existem na produção."
  ],
  [
    "Respawn",
    "/respawn bind → /respawn list → /respawn claim code:ingol-5 → /respawn release code:ingol-5",
    "Organize ocupação, fila e liberação de respawn."
  ],
  [
    "Bosses",
    "/boss → /events → /calendar → /boosted",
    "Consulte inteligência de boss e contexto de eventos sem inventar comandos extras."
  ],
  [
    "Pesquisa de jogo",
    "/quest info name:Nome → /item name:Nome → /creature name:Nome → /hunt name:Nome → /imbuement guia",
    "Use a base local do DZbot para pesquisar conteúdo dentro do Discord."
  ],
  [
    "Evolução",
    "/eu → /dz dna → /ranking",
    "Combine identidade, Player DNA e ranking real disponível no bot."
  ]
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
        <div class="guide-block"><span>Exemplo real</span><div class="guide-example"><code>${esc(x.ex)}</code><button type="button" class="guide-copy" data-copy="${esc(x.ex)}">COPIAR</button></div></div>
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
    renderFilters();
    render();
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
      if (toast) {
        toast.textContent = 'Comando copiado';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1300);
      }
    } catch (_) {}
  });
})();
