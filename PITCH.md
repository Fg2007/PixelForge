# Apresentacao Final - Pitch

## Quem sou eu e como desenvolvi

Meu nome é Henrique . Eu desenvolvi a landing page da PixelForge Studios para praticar a criacao de uma pagina moderna usando HTML, CSS e JavaScript. Primeiro organizei as secoes obrigatorias, depois defini a identidade visual gamer, atualizei o catalogo com jogos reais e finalizei com interacoes como carrossel, filtro, validacao e troca de tema.

## Elementos principais do site

- Home com nome do estudio, slogan, banner gamer e botoes de chamada
- Catalogo com 5 jogos reais
- Trailer da Temporada com Honkai: Star Rail Version 4.2
- Comunidade com comentarios realistas de jogadores
- Formulario de contato para mensagens e parcerias
- Rodape com redes sociais, contato e direitos autorais

## Interacoes implementadas

- Rolagem suave entre secoes
- Menu hamburguer no mobile
- Carrossel de jogos
- Filtro por genero
- Validacao do formulario
- Modo claro e modo escuro com Local Storage
- Tela de loading inicial
- Botao de musica de fundo

## Destaque tecnico

Uma area importante do projeto e a secao Jogos da Forja. No HTML, cada jogo foi organizado em um `article` com imagem real, genero, plataforma, nome e descricao curta. No CSS, usei Grid para o carrossel horizontal e transicoes para criar o efeito de elevacao no hover. No JavaScript, os botoes de filtro leem o genero de cada card pelo atributo `data-genre` e escondem ou exibem os jogos de acordo com a escolha do usuario.

## Cores, layout e referencia visual

A identidade visual foi inspirada em interfaces gamer com neon, brilho e fundo escuro. A paleta principal usa roxo escuro `#3D348B`, neon blue `#00F5FF`, preto e branco. Tambem usei magenta, amarelo e verde como cores de apoio para evitar que o visual ficasse monotono.

## Dificuldades, solucoes e aprendizados

A parte mais desafiadora foi trocar conteudo inventado por jogos reais sem quebrar filtros, carrossel e layout responsivo. Resolvi mantendo as classes do HTML, atualizando os atributos `data-genre` e testando os assets usados nos cards. Aprendi a organizar melhor arquivos web, aplicar interatividade com JavaScript e cuidar para que imagens e textos do catalogo sejam coerentes.
