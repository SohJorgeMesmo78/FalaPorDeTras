# Documentação técnica e funcional — Fala por de Trás

> Análise do estado atual do repositório. Este documento descreve o comportamento implementado, inclusive quando ele difere da descrição comercial dos jogos. A única alteração realizada durante a análise foi a criação deste arquivo Markdown.

## 1. Visão geral

O **Fala por de Trás** é uma aplicação web de jogos sociais presenciais. Ela foi desenhada para ser usada principalmente em um único celular, passado de pessoa para pessoa. O aplicativo funciona como facilitador: apresenta o catálogo, permite algumas configurações, sorteia palavras, temas, números, perguntas e papéis secretos, controla revelações e, em um dos jogos, o tempo.

O aplicativo não é uma plataforma multijogador conectada. Não há salas, contas, sincronização entre aparelhos, placar persistente nem servidor de partidas. Em quase todos os jogos, conversa, respostas, votação, pontuação, validação e decisão de vencedor acontecem entre os participantes, fora do software.

Hoje o catálogo principal contém **11 jogos**:

1. Quem sou eu?
2. Chá ou Café?
3. Ito
4. Batata Quente
5. Pergunta do Impostor
6. Contato
7. Impostor
8. Adivinhe a Palavra
9. Qual é a Nota?
10. Jogo da Lista
11. Onde estou?

## 2. Tecnologias utilizadas

- **Angular 19.1** com componentes standalone.
- **TypeScript 5.7**.
- **Angular Router** para catálogo, configuração e telas dos jogos.
- **Angular Forms** (`ngModel`) apenas na personalização dos participantes.
- **RxJS 7.8**, usado indiretamente pelo Angular e nas inscrições em `queryParams`.
- **SCSS** global e por componente.
- **Angular SSR 19 / Express 4** para renderização no servidor e prerenderização.
- **Angular hydration** com event replay.
- **Zone.js** e detecção de mudanças com `eventCoalescing`.
- **ngx-toastr**, configurado globalmente e usado somente como fallback para jogo não implementado.
- **Web Audio API** para bipes sintetizados no navegador.
- **Vibration API** para feedback tátil em dispositivos compatíveis.
- **Google Fonts**, carregando Inter por `@import` remoto.
- **Karma/Jasmine** configurados como infraestrutura de teste, mas sem arquivos de teste no código analisado.

Não há banco de dados, API própria, autenticação, analytics, PWA/service worker ou biblioteca formal de gerenciamento de estado.

## 3. Estrutura de pastas e arquitetura

```text
.
├── public/
│   ├── favicon.ico
│   └── images/                  # uma imagem de capa por jogo
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── header/          # cabeçalho compartilhado nas telas de jogo
│   │   ├── data/                # bancos locais de palavras, temas, locais e perguntas
│   │   ├── models/              # interfaces Game, PlayerProfile e tipos de impostor
│   │   ├── pages/
│   │   │   ├── home/            # catálogo
│   │   │   ├── game/            # detalhes/configuração genérica
│   │   │   └── play/            # um componente independente para cada jogo
│   │   ├── services/            # catálogo, estado global simples e sorteadores
│   │   ├── app.routes.ts
│   │   ├── app.routes.server.ts
│   │   └── app.config*.ts
│   ├── assets/data/games.json   # catálogo antigo/incompleto e aparentemente não utilizado
│   ├── index.html
│   ├── main.ts / main.server.ts
│   ├── server.ts                # servidor Express para o bundle SSR
│   └── styles.scss              # tema e estilos compartilhados
├── angular.json
├── package.json
└── tsconfig*.json
```

### Arquitetura atual

A arquitetura é uma SPA Angular em três camadas informais:

1. **Navegação e apresentação:** `HomeComponent`, `GameComponent` e os 11 componentes em `pages/play`.
2. **Serviços locais:** serviços injetáveis escolhem itens aleatórios de arquivos JSON. `GameService` também guarda preferências e perfis temporários.
3. **Conteúdo estático:** listas JSON importadas no bundle e imagens em `public/images`.

Não existe uma camada de domínio separada. As máquinas de estado, regras, temporizadores e sorteios mais complexos ficam diretamente nos componentes. Cada jogo foi implementado como uma página isolada; há pouca composição entre jogos, mesmo quando os fluxos são quase iguais.

O componente raiz contém somente um `router-outlet`. Os serviços usam `providedIn: 'root'`, portanto são singletons enquanto a aplicação permanece carregada.

## 4. Páginas e rotas

| Rota | Página | Função |
|---|---|---|
| `/` | `HomeComponent` | Mostra cards dos 11 jogos a partir de `GameService`. |
| `/game/:id` | `GameComponent` | Exibe capa, descrição e configuração específica do jogo. |
| `/play/quem-sou-eu` | `QuemSouEuComponent` | Sorteio de identidade. |
| `/play/cha-ou-cafe` | `ChaOuCafeComponent` | Sorteio da palavra secreta. |
| `/play/ito` | `ItoComponent` | Distribuição de números e tema. |
| `/play/batata-quente` | `BatataQuenteComponent` | Tema, turnos e cronômetro. |
| `/play/pergunta-do-impostor` | `PerguntaDoImpostorComponent` | Distribuição de duas perguntas parecidas. |
| `/play/contato` | `ContatoComponent` | Sorteio da palavra do mestre. |
| `/play/impostor` | `ImpostorComponent` | Distribuição da palavra e papel de impostor. |
| `/play/adivinhe-a-palavra` | `AdivinheAPalavraComponent` | Sorteio da letra inicial. |
| `/play/qual-e-a-nota` | `QualEANotaComponent` | Tema e distribuição de notas. |
| `/play/jogo-da-lista` | `JogoDaListaComponent` | Geração de lista de palavras. |
| `/play/onde-estou` | `OndeEstouComponent` | Distribuição do local e papel de impostor. |
| qualquer outra | redirecionamento | Volta para `/`. |

### Parâmetros de URL

- Ito e Batata Quente: `players`.
- Pergunta do Impostor: `players` e `imposters`.
- Impostor e Onde estou?: `players`, `imposters` e `hints`.
- Qual é a Nota?: `pairs` e `mode` (`duplas` ou `1xtodos`).
- Jogo da Lista: `count`.

O `GameComponent` é um configurador central, mas usa uma longa sequência de condicionais por ID para decidir controles e navegação. IDs inválidos deixam a tela indefinidamente em “Carregando jogo...”; somente rotas inexistentes, e não IDs inexistentes, caem no wildcard.

### SSR e prerenderização

O build está em `outputMode: server`, com um servidor Express que serve arquivos estáticos e encaminha as demais requisições ao mecanismo SSR do Angular. Todas as rotas são marcadas para prerenderização pelo wildcard. Entretanto, os parâmetros explícitos de `/game/:id` contêm apenas `quem-sou-eu` e `cha-ou-cafe`, apesar de o catálogo conter 11 IDs. Essa configuração merece validação em build/deploy: ela não representa todo o catálogo dinâmico.

## 5. Fluxo comum antes dos jogos

1. O usuário abre `/` e escolhe um card.
2. Vai para `/game/:id`, vê imagem e texto explicativo.
3. Dependendo do jogo, escolhe quantidade de participantes, impostores, duplas, palavras, modo ou uso de dica.
4. Jogos que precisam identificar participantes abrem uma segunda etapa para nomes e cores. Nomes vazios são aceitos e recebem rótulos genéricos.
5. O configurador grava perfis no singleton `GameService` e navega para `/play/...`, passando quantidades na query string.
6. Durante jogos secretos, o mesmo aparelho é passado em sequência; cada pessoa revela e depois oculta sua informação.

Quem sou eu?, Chá ou Café?, Contato, Adivinhe a Palavra e Jogo da Lista pulam a personalização. “Qual é a Nota?” também a pula no modo 1 x Todos.

## 6. Jogos: regras e fluxo implementado

### 6.1 Quem sou eu?

**Regra comunicada:** uma pessoa, personagem ou animal deve ser adivinhado com perguntas respondidas por “sim” ou “não”.

**Fluxo:** ao entrar, o app inicia contagem de 3 segundos com som/vibração e revela uma identidade aleatória. O usuário pode sortear novamente, com nova contagem, e ativar/desativar globalmente a contagem. A partida propriamente dita ocorre oralmente; o app não registra perguntas, tempo, acertos ou vencedor.

### 6.2 Chá ou Café?

**Regra comunicada:** um jogador conhece uma palavra secreta. Os demais propõem pares de escolhas, começando por “chá ou café?”, e a resposta escolhida deve aproximá-los do segredo até alguém adivinhar.

**Fluxo:** é praticamente o mesmo de Quem sou eu?: contagem de 3 segundos, som/vibração e revelação de uma palavra aleatória. É possível sortear novamente e alterar a preferência global da contagem. Comparações, tentativas e acerto não são modelados.

### 6.3 Ito

**Regra comunicada:** cada participante recebe um número secreto de 1 a 100 e dá uma dica dentro de um tema de escala. O grupo tenta ordenar as dicas crescentemente sem ver os números.

**Configuração:** 2 a 100 jogadores, com nome e cor para cada um.

**Fluxo:** o app embaralha 1–100 sem repetição; pede que o aparelho seja entregue ao participante atual; revela o número; ao ocultá-lo, avança para o seguinte. Depois do último participante, sorteia e mostra um tema. A discussão, ordenação, revelação final dos números, conferência e pontuação não existem na interface. “Trocar tema” troca apenas o tema mantendo os números; “Jogar novamente” redistribui números, mas o tema só aparece ao fim da nova distribuição.

### 6.4 Batata Quente

**Regra comunicada:** sob um tema, jogadores dizem itens válidos sem repetição e passam a “bomba”; quem a segura quando o tempo acaba perde.

**Configuração:** 2 a 100 jogadores, nomes e cores.

**Fluxo:** o app sorteia um tema e permite trocar o tema. O tempo começa em 60 segundos e pode variar entre 30 e 180 em passos de 30. Ao iniciar, o jogador 1 recebe a vez. Cada toque no grande botão passa para o próximo, em ciclo. O contador emite bipes, acelera visual/sonoramente nos 10 segundos finais e, ao zerar, mostra qual jogador “explodiu”, com vibração. Não há validação do item dito nem histórico contra repetições. “Jogar novamente” sempre restaura 60 segundos, mesmo que outro tempo tenha sido escolhido.

### 6.5 Pergunta do Impostor

**Regra comunicada:** a maioria recebe uma pergunta; impostores recebem outra pergunta semelhante, capaz de produzir respostas compatíveis. Após todos responderem, o grupo identifica quem recebeu a pergunta diferente.

**Configuração:** 3 a 100 jogadores; de 1 até `floor((jogadores - 1) / 2)` impostores; nomes e cores.

**Fluxo:** o app escolhe um par de perguntas e sorteia qual será normal e qual será a dos impostores. Também sorteia índices únicos de impostores. Cada participante recebe o aparelho, revela sua pergunta e a oculta antes de passar. Ao final, a tela mostra somente a pergunta normal e oferece nova rodada. O software não coleta respostas, não conduz votação e não revela explicitamente quem eram os impostores nem qual pergunta eles receberam.

### 6.6 Contato

**Regra comunicada:** o mestre conhece uma palavra e revela a primeira letra. Outros jogadores dão definições de palavras com o prefixo conhecido; quando dois fazem “contato” e dizem a mesma palavra, o mestre revela mais uma letra, salvo se bloquear a dica antes. O objetivo é chegar à palavra do mestre.

**Fluxo:** após contagem opcional de 3 segundos, o app mostra ao mestre uma palavra aleatória e instrui que somente a primeira letra seja dita. Pode sortear outra palavra. Todo o mecanismo de prefixo progressivo, dicas, contato, bloqueio e vitória acontece fora do app.

### 6.7 Impostor

**Regra comunicada:** jogadores comuns recebem uma palavra; impostores recebem uma dica genérica ou apenas seu papel. Cada pessoa diz uma associação, tentando expor ou esconder o infiltrado.

**Configuração:** 3 a 100 jogadores, quantidade limitada de impostores, nomes/cores e dica ligada ou desligada.

**Fluxo:** o app sorteia uma palavra com uma lista de dicas, escolhe uma dica e sorteia impostores únicos. Cada participante revela sua informação em privado: a palavra para pessoas comuns; a dica ou “você é o impostor” para infiltrados. Depois de todos, aparece uma tela de debate. “Revelar resposta” mostra palavra e dica, mas não mostra os nomes/índices dos impostores. Não há captura das associações, votação ou placar.

### 6.8 Adivinhe a Palavra

**Regra comunicada no catálogo:** participantes acrescentam letras alternadamente, tentando não completar uma palavra; é possível desafiar com “Duvido” quando o prefixo parece impossível.

**Fluxo realmente implementado:** o app apenas sorteia uma letra A–Z e instrui os participantes a começar a soletrar. Pode sortear nova letra. Não armazena a sequência construída, turnos, dicionário, palavras completas ou desafio “Duvido”. O texto da tela acrescenta que perde quem completa a palavra **ou não consegue pensar em uma nova**, uma regra não detalhada da mesma forma no catálogo.

### 6.9 Qual é a Nota?

**Regra comunicada:** alguém recebe uma nota secreta de 1 a 10 e dá uma pista dentro de uma escala temática; seu parceiro ou o grupo tenta inferir a nota.

**Configuração:** modo “Duplas x Duplas”, com 1 a 100 duplas e nome/cor por dupla, ou “1 x Todos”, sem perfis.

**Fluxo em duplas:** sorteia uma nota independente para cada dupla e reutiliza os temas do Ito. Mostra o tema; para cada dupla, pede que o aparelho seja entregue a quem dará a dica, revela sua nota e avança. Ao final, mostra instrução para todos adivinharem e permite nova rodada. Não registra palpites, proximidade ou pontuação.

**Fluxo em 1 x Todos:** gera apenas uma nota, mas `nextPair()` continua comparando o índice atual com `pairsCount` (que normalmente permanece 2). Assim, depois de ocultar a primeira nota, o fluxo avança para uma segunda etapa sem uma segunda nota (`grades[1]` é indefinida). É um defeito funcional atual.

### 6.10 Jogo da Lista

**Regra comunicada:** duplas disputam uma lista de palavras; um mestre dá dicas, erros permitem roubo e vence quem completar primeiro.

**Configuração:** o controle rotulado “Quantidade de Palavras” varia de 2 a 100 e usa internamente a propriedade genérica `players`.

**Fluxo:** a tela mostra uma lista aleatória formada pela união sem duplicatas dos bancos de Chá ou Café, Contato e palavras do Impostor. Cada item ou toda a lista pode ser trocado. Não há ocultação para quem adivinha, equipes, turnos, acerto/erro, roubo, pontuação ou conclusão. Se a quantidade solicitada exceder o pool único disponível, a lista simplesmente terá menos itens.

### 6.11 Onde estou?

**Regra comunicada:** todos, exceto impostores, conhecem um local. Os participantes fazem perguntas para detectar quem não sabe; o impostor tenta deduzir o lugar.

**Configuração:** igual à de Impostor, incluindo quantidade e opção de dica.

**Fluxo:** o app sorteia um local e uma dica, escolhe impostores e distribui informações privadamente. Pessoas comuns veem o local; impostores veem a dica ou seu papel. Após a distribuição, a tela orienta perguntas e debate; o resultado revela local e dica, mas não quem era impostor. Perguntas, respostas, acusação e vitória são externas ao app.

## 7. Componentes e comportamentos compartilhados

### `HeaderComponent`

Usado nas 11 páginas `/play`. Recebe `backUrl`, mostra voltar, home, marca e links sociais. A página genérica `/game/:id` mantém uma implementação própria e duplicada do cabeçalho.

### Estilos globais

`styles.scss` define tokens CSS (ciano, fundo escuro, vidro, textos e bordas), containers, cabeçalhos, botões, cards de jogo, estados de contagem/revelação, animações e estilos da Batata Quente. Há SCSS adicional em Home, Game, Header e somente três páginas de jogo; grande parte dos templates usa estilos inline.

### Serviços de conteúdo

- `QuemSouEuService`, `ChaOuCafeService`, `ContatoService`, `ItoService` e `BatataQuenteService`: escolhem um item aleatório.
- `ImpostorService`: escolhe palavra+dicas ou par de perguntas.
- `OndeEstouService`: escolhe local+dicas usando o mesmo formato `ImpostorWord`.
- `AdivinheAPalavraService`: sorteia uma letra A–Z.
- `WordPoolService`: agrega três bancos, remove duplicatas e serve o Jogo da Lista.

### Padrões duplicados

Quem sou eu? e Chá ou Café? repetem quase integralmente contagem, áudio, vibração e revelação. Impostor e Onde estou? repetem a máquina de estados e distribuição de papéis. A criação manual de `AudioContext` também aparece em vários componentes. Esses são candidatos diretos a componentes/serviços reutilizáveis.

## 8. Estado e dados

### Estado em memória

`GameService` mantém:

- `showCountdown`, preferência global de contagem, inicialmente `true`;
- `customPlayers`, perfis `{ id, name, color }` criados no configurador;
- geração de cores HSL aleatórias.

Esse estado dura somente enquanto a SPA continua aberta. Atualizar a página, abrir o link em nova aba ou acessar diretamente `/play/...` elimina os perfis. Vários templates presumem que `customPlayers` existe e acessam `.color` sem navegação segura; portanto deep links/refresh podem produzir erro de template em Ito, Pergunta do Impostor e Onde estou?. Outros jogos usam `?.` e degradam para nomes genéricos.

Cada componente guarda localmente sua máquina de estados e dados da rodada. Query params preservam algumas quantidades, mas não palavras, papéis, perfis nem partida. Não há `localStorage`, `sessionStorage`, cookies, banco, API ou store reativo.

### Conteúdo estático

Os arquivos em `src/app/data` são importados diretamente pelos serviços e empacotados no JavaScript. O conteúdo inclui:

- palavras de Quem sou eu?;
- palavras de Chá ou Café?;
- temas de Ito;
- temas de Batata Quente;
- pares de perguntas do Impostor;
- palavras e dicas do Impostor;
- palavras do Contato;
- locais e dicas de Onde estou?.

`src/assets/data/games.json` contém apenas dois jogos, usa caminhos antigos `assets/images/...` e não é lido por nenhum serviço ou componente. O catálogo real está duplicado como constante TypeScript em `GameService`.

Os sorteios usam `Math.random()`. Em geral não há proteção contra repetir imediatamente o último item; o comentário de `changeTheme()` no Ito sugere essa intenção, mas a variável `backup` não é usada.

## 9. Integrações externas

- Links externos para Instagram e TikTok da marca; não há uso de API dessas plataformas.
- Fonte Inter obtida de `fonts.googleapis.com`, o que cria dependência de rede e implicações de privacidade/CSP.
- APIs nativas do navegador: Web Audio e vibração.
- Express é infraestrutura de hospedagem SSR, não uma integração de negócio.

Não foram encontradas chamadas HTTP do aplicativo, webhooks, SDKs externos de dados, pagamentos, login ou telemetria.

## 10. Acoplamento à marca “Fala por de Trás”

### Fortemente ligado

- Nome em `package.json`, projeto do `angular.json`, script SSR e diretório de build.
- `AppComponent.title` e `<title>` do HTML.
- Texto de marca na Home, no `HeaderComponent` e no cabeçalho duplicado de `GameComponent`.
- URLs `@falapordetras` de Instagram/TikTok, duplicadas em componentes e templates.
- Imagens específicas em `public/images` e o catálogo `GAMES_DATA` com nomes/descrições editoriais.
- Tema visual global (ciano, fundo escuro, glassmorphism), que funciona como identidade atual mesmo sem um design system nomeado.
- Regras ocultas de cor para nomes pessoais: Jorge/Jooj, Marina/Mari, Matheus/Theu/Theus e Gabriela/Gabi. Esse easter egg é conteúdo altamente específico do grupo/marca e está dentro do configurador genérico.

### Pouco ligado e potencialmente reutilizável

- Modelos de jogo, participante, palavra+dicas e par de perguntas.
- Bancos de temas/palavras, desde que haja revisão editorial e de direitos.
- Algoritmos de seleção aleatória e distribuição de impostores.
- Conceitos de passagem segura do dispositivo, revelar/ocultar e estados de debate.
- Cronômetro, feedback sonoro/tátil e rotação circular de jogadores.
- Estrutura catálogo → configuração → partida.
- Regras conceituais dos 11 jogos.

Para reutilização real, esses elementos deveriam ser extraídos de componentes visuais para um núcleo de domínio independente da marca e do framework.

## 11. Problemas técnicos e decisões que eu mudaria

### Prioridade alta: comportamento e confiabilidade

1. **Corrigir o fluxo 1 x Todos de Qual é a Nota.** O número de rodadas deve ser 1 nesse modo; hoje é possível chegar a uma nota indefinida.
2. **Tornar URLs de jogo seguras e autossuficientes.** Validar/coagir query params e reconstruir perfis padrão quando o estado em memória faltar. Hoje refresh/deep link pode quebrar e parâmetros maliciosos podem causar casos graves — inclusive loop infinito ao pedir mais impostores do que jogadores.
3. **Alinhar descrição e implementação.** Jogo da Lista e Adivinhe a Palavra são especialmente incompletos em relação à promessa; os demais deixam pontuação/votação deliberadamente no mundo físico, o que deveria estar explícito.
4. **Revisar SSR/prerender e aleatoriedade.** Algumas páginas evitam APIs de navegador com `isPlatformBrowser`, outras sorteiam no servidor. Conteúdo aleatório renderizado no servidor pode divergir durante hidratação. O catálogo de parâmetros prerenderizados também está incompleto.
5. **Tratar ID inválido.** Exibir 404/estado de jogo inexistente em vez de loading permanente.

### Arquitetura e manutenção

6. Modelar cada partida com uma máquina de estados tipada/reducer em uma camada de domínio, separada do template.
7. Trocar a cascata de `if/else` por um registro declarativo de jogos: rota, limites, opções, requisitos de perfil, descrição, imagem e factory de regras.
8. Unificar os dois catálogos, removendo ou migrando o `games.json` obsoleto.
9. Extrair fluxos repetidos: revelação privada, distribuição de papel, contagem, áudio/vibração, resultado e navegação final.
10. Usar Signals ou store simples para sessão/configuração e persistência opcional/versionada; não expor arrays mutáveis públicos do serviço.
11. Encapsular timers e limpar todos em `ngOnDestroy`. Contato e os jogos de contagem não implementam cleanup completo, o que pode deixar callbacks vivos após navegação.
12. Reutilizar um único mecanismo de áudio ou fechar `AudioContext`; hoje um novo contexto é criado a cada bipe, especialmente custoso na Batata Quente.
13. Substituir `any`, `null as any`, parsing solto e propriedades genéricas (`players` significando duplas ou palavras) por tipos e configurações semânticas.
14. Remover logs de depuração e variáveis mortas (`backup`).
15. Reduzir estilos inline e handlers HTML nativos (`onmouseover`/`onmouseout`), usando componentes, classes e tokens de design.
16. Fazer lazy loading das páginas de jogo para reduzir o bundle inicial.

### Qualidade, UX e acessibilidade

17. Criar testes unitários do domínio (sorteio único, limites, transições) e testes de fluxo por jogo; o projeto deliberadamente gera artefatos com `skipTests` e não possui cobertura efetiva.
18. Validar por testes de build os budgets SCSS: há muito CSS global e inline, enquanto os limites por componente são baixos.
19. Melhorar acessibilidade: anúncio de mudanças secretas, foco entre estados, equivalentes a hover em touch/teclado, semântica de toggles, contraste e opção de reduzir movimento/som/vibração.
20. Evitar máximo arbitrário de 100 em configurações cuja fonte pode não comportar 100 itens; derivar limites do domínio/pool.
21. Mostrar os impostores no resultado quando essa for a intenção da rodada, ou explicar que a revelação deve ser verbal. Atualmente o “resultado” de Impostor/Onde estou? revela segredo e dica, não o papel sorteado.
22. Centralizar marca, redes, textos e tema em configuração substituível. Remover easter eggs pessoais da lógica central ou torná-los conteúdo opcional.
23. Hospedar fontes localmente ou documentar consentimento/CSP para a dependência do Google Fonts.
24. Escrever documentação de produto real. O README atual é o texto padrão do Angular CLI e até menciona `ng e2e`, embora nenhum runner E2E esteja configurado.

## 12. Resumo para reconstrução

Eu reconstruiria o produto preservando **somente os conceitos e regras dos jogos e os bancos editoriais aprovados**, sem reaproveitar marca, imagens, textos promocionais, tema visual ou condicionais específicas do projeto atual.

### Arquitetura proposta

```text
apps/web
├── app-shell/                 # navegação, sessão, acessibilidade, tema novo
├── catalog/                   # metadados declarativos e páginas de apresentação
├── game-session/              # criação/restauração da sessão
└── games/                     # adapters de UI por jogo

packages/game-core
├── contracts/                 # GameDefinition, Player, Round, Action, Result
├── engines/                   # reducers/máquinas de estado puras
├── random/                    # RNG injetável e embaralhamento testável
└── content/                   # schemas, validação e bancos versionados

packages/ui
├── private-reveal/            # passe o aparelho → revelar → ocultar
├── countdown/
├── player-setup/
├── timer/
└── result/
```

Manteria Angular moderno caso a equipe já o domine, usando standalone components, Signals, lazy routes e SSR apenas nas páginas públicas estáveis. Uma alternativa igualmente adequada seria Next.js/React; a decisão de framework importa menos que isolar o `game-core` puro e testável.

### Modelo de produto

Cada jogo teria uma definição declarativa com:

- ID neutro, nome e conteúdo configuráveis;
- limites e opções de configuração;
- schema do conteúdo necessário;
- estado inicial;
- ações válidas e transições;
- regra de término e resultado;
- indicação explícita do que o app controla e do que o grupo arbitra presencialmente.

Fluxos compartilhados seriam componentes de primeira classe. Impostor e Onde estou? usariam o mesmo motor de “segredo da maioria + papel oculto + dica opcional”; Quem sou eu? e Chá ou Café? usariam um motor de sorteio/revelação; Ito e Qual é a Nota? compartilhariam escalas temáticas sem compartilhar acidentalmente estado visual.

### Sequência de reconstrução

1. Formalizar as regras atuais em testes de aceitação, resolvendo ambiguidades com o responsável pelo produto.
2. Definir nova marca, tom, design tokens e conteúdo sem referências a “Fala por de Trás”.
3. Construir o núcleo de domínio puro, com RNG injetável, validação de limites e máquinas de estado.
4. Criar uma sessão persistível e versionada. Para o modo de um aparelho, `sessionStorage` ou IndexedDB basta; adicionar backend somente se houver salas entre dispositivos, contas ou analytics consentido.
5. Implementar o shell e os componentes compartilhados de setup, revelação privada, contagem, timer, debate e resultado.
6. Migrar primeiro jogos simples; depois os de papéis secretos; por fim os que precisam de regras mais completas, como Jogo da Lista e Adivinhe a Palavra.
7. Decidir conscientemente, jogo a jogo, se votação, pontuação e validação continuam presenciais ou entram no software. A UI deve deixar essa fronteira clara.
8. Adicionar testes unitários do domínio, testes de componentes e E2E para catálogo → configuração → rodada → replay, incluindo refresh e deep links.
9. Publicar conteúdo em arquivos validados por schema ou CMS simples, separado do código, permitindo revisão editorial sem alterar motores.
10. Medir acessibilidade, performance mobile e funcionamento offline; uma PWA é particularmente coerente com jogos em grupo e conectividade instável.

O resultado ideal seria uma plataforma de minijogos orientada por definições: adicionar um jogo novo exigiria principalmente um motor de regras e conteúdo, e não novas condicionais espalhadas pelo configurador. A marca e a UI seriam camadas substituíveis; as regras seriam portáveis, testadas e independentes da apresentação.
