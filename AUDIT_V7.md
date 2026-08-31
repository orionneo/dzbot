# DZbot V7 — auditoria e regras de design

## Problemas detectados na V6
- densidade excessiva: hero, cards, recursos, provas e contato comprimidos em poucos viewports;
- tipografia pequena e baixa legibilidade no desktop largo;
- hierarquia visual fraca: quase tudo competia pela mesma atenção;
- seção de recursos tratada como grade minúscula, não como conteúdo explorável;
- screenshots reais pequenas demais;
- navegação tecnicamente por âncora, porém a experiência não reforçava em qual seção o usuário estava;
- logo publicado havia perdido a leitura visual do logo original;
- pouca progressão narrativa: parecia dashboard, não landing page comercial premium;
- interatividade concentrada em carrossel/lightbox, sem exploração real do produto;
- mobile adaptava tamanho, mas não reorganizava suficientemente a jornada.

## Direção V7
1. Hero com uma única promessa forte + prova real do produto acima da dobra.
2. Logo original do proprietário usado como PNG, não redesenhado.
3. Seções verticais amplas com respiro; página longa é intencional.
4. Tipografia maior e contraste superior.
5. Recursos interativos: clique no módulo atualiza uma demonstração lateral.
6. Galeria real horizontal com navegação, swipe e lightbox.
7. Três blocos visuais Player / Boss / Bazaar para apelo de jogo.
8. Jornada comercial: problema → solução → produto → prova → inteligência → implantação → FAQ → CTA.
9. Navbar sticky, menu mobile e highlight automático da seção atual.
10. Efeitos premium discretos: glow, reveal, live pulse e transições.
11. CTAs funcionais para WhatsApp e e-mail.
12. Responsividade específica para desktop/tablet/mobile.
13. Assets locais; sem dependência de CDN para o layout.
14. Screenshots reais preservados e exibidos em tamanho legível.
15. Teste automático de âncoras, JS e viewport antes de empacotar.
