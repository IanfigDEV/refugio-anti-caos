/**
 * ============================================================
 *  ARQUIVO DE PERSONALIZAÇÃO  —  mexa SÓ AQUI para personalizar
 * ============================================================
 *
 *  1) Troque `herName` e `yourName`.
 *  2) ÁUDIO:   coloque o seu .mp3 em  public/audio/musica.mp3
 *              (ou mude o caminho em `song.src`).
 *  3) FOTOS:   coloque as imagens em  public/images/
 *              e preencha o campo `image` de cada polaroid
 *              (ex.: "/images/foto1.jpg"). Se deixar `null`,
 *              aparece um placeholder elegante.
 *  4) LULU:    coloque a ilustração/foto da Lulu em
 *              public/images/lulu.png e mude `luluImage`
 *              para "/images/lulu.png". Se deixar `null`,
 *              aparece a ilustração vetorial placeholder.
 *  5) TRECHOS: no Moodboard, cole em `lyric` o trecho da música
 *              que VOCÊ escolheu (deixei um aviso no lugar).
 *
 *  Dentro dos textos, {name} vira o nome dela automaticamente.
 */

export const config = {
  herName: "Isabelly (Minha Princesa)", // <-- TROQUE AQUI
  yourName: "Ian", // <-- TROQUE AQUI (assina o bilhete)

  // ---------- ÁUDIO ----------
  song: {
    title: "Dia, Lugar e Hora", // <-- nome da música que vai tocar
    artist: "Luan Santana",
    // 👉 COLOQUE O ARQUIVO DE ÁUDIO EM: public/audio/musica.mp3
    src: "/audio/musica.mp3",
  },

  // ---------- LULU ----------
  // 👉 Para usar uma imagem sua: coloque em public/images/lulu.png
  //    e troque null por "/images/lulu.png"
  luluImage: "/images/luluu.jpg",

  // ---------- HERO ----------
  hero: {
    title: "Respire fundo, {name}",
    subtitle:
      "Esqueça o gabarito e a nota de corte por um minuto. Esse cantinho é o seu refúgio.",
  },

  // ---------- SOS ----------
  sos: {
    buttonLabel: "Aperte se o peito apertar",
    cycles: 3, // quantos ciclos de respiração (3 ciclos = 36s)
    seconds: 4, // duração de cada fase
    afterMessage:
      "Uma prova nunca vai medir o tamanho do seu coração ou a profissional brilhante que você já é.",
  },

  // ---------- CONSULTÓRIO DO FUTURO ----------
  clinic: {
    title: "Dra. {name}",
    subtitle: "Psicóloga Clínica",
    registry: "CRP 00/00000 · em breve",
    modalTitle: "Consulta confirmada",
    note: "Já deixei minha consulta vitalícia agendada. Eu acredito no seu dom de curar as pessoas. Você vai ser incrível.",
  },

  // ---------- MOODBOARD ----------
  moodboard: {
    title: "Luan Santana & Nós",
    subtitle: "Pequenos pedaços da nossa trilha sonora.",
    // `image`: caminho da foto em public/images/ (ou null para placeholder)
    // `lyric`: cole aqui o trecho da música que VOCÊ escolheu
    // `song`:  nome da música de onde veio o trecho
    // `caption`: sua legenda curtinha
    // `rotate`/`offset`: deixam as polaroids "espalhadas" de forma assimétrica
    photos: [
      {
        image: "/images/11.jpeg", // 👉 ex.: "/images/foto1.jpg"
        label: "Foto 1",
        lyric: "E esse sorrisão de orelha a orelha. Vai me faltando o ar. Se esse sorriso for pra mim. Eu sou o cara que tem mais sorte no mundo.",
        song: "Cantada",
        caption: "Sorriso bonito do carai",
        rotate: -4,
        offset: 0,
      },
      {
        image: "/images/12.jpeg", // 👉 ex.: "/images/foto2.jpg"
        label: "Foto 2",
        lyric: "Saiba que eu te vejo linda, de cabelo solto, amarrado / E fica mais linda ainda, quando cola do meu lado",
        song: "Te vejo linda",
        caption: "Num tem jeito, é linda de qualquer jeito.",
        rotate: 3,
        offset: 28,
      },
      {
        image: "/images/13.jpeg", // 👉 ex.: "/images/foto3.jpg"
        label: "Foto 3",
        lyric: "Não mudo uma vírgula em você pra me agradar. Se Deus te fez assim, garota, eu só tenho que agradecer.",
        song: "Chuva de Arroz",
        caption: "Sem palavras...",
        rotate: 5,
        offset: 8,
      },
      {
        image: "/images/14.jpeg", // 👉 ex.: "/images/foto4.jpg"
        label: "Foto 4",
        lyric: "Eita muié bonita! Eu sei que o mundo tá de olho em você, mas o meu olho tá maior.",
        song: "Cantada",
        caption: "Espero que o meu esteja maior do que um outro aí realmente kkkk",
        rotate: -3,
        offset: 34,
      },
      {
        image: "/images/15.jpeg", // 👉 ex.: "/images/foto5.jpg"
        label: "Foto 5",
        lyric: "Mesmo que você não caia na minha cantada, mesmo que você conheça outro cara... Eu vou estar te esperando.",
        song: "Te Esperando",
        caption: "Obrigado por ser quem você é",
        rotate: 2,
        offset: 4,
      },
      {
        image: "/images/16.jpeg", // 👉 ex.: "/images/foto6.jpg"
        label: "Foto 6",
        lyric: "Eu vou subir às nuvens para desenhar o teu sorriso, e no azul do céu vou ver os seus olhos brilhando.",
        song: "Incondicional",
        caption: "Só pra tu saber que eu gosto muitão do c (mesmo tu não gostando de mim KKKKKKKK)",
        rotate: -5,
        offset: 26,
      },
    ],
  },

  // ---------- CÁPSULAS DO TEMPO ----------
  capsules: {
    title: "Cápsulas do Tempo",
    subtitle: "Pílulas de confiança, seladas com carinho. Abra só no momento certo.",
    // `unlockAt`: opcional. Ex.: "2026-11-08T00:00:00" trava o envelope até essa data.
    // Deixe null para o envelope poder ser aberto a qualquer hora.
    letters: [
      {
        id: "enem",
        trigger: "Abra na véspera do ENEM",
        icon: "calendar",
        unlockAt: null,
        letterTitle: "Pra véspera de tudo",
        body: [
          "{name}, se você está lendo isso, o dia está chegando — e eu quero que você saiba de uma coisa: você já fez a parte mais difícil. Você estudou, insistiu e acordou em dias em que não tinha vontade nenhuma.",
          "Amanhã, ninguém ali dentro vai saber o tamanho do seu esforço. Mas eu sei. E o seu esforço não desaparece só porque uma folha de papel não sabe contar a sua história.",
          "Hoje não é dia de estudar mais um pouco. É dia de comer bem, dormir cedo e confiar em você. Respira, separa o documento, a caneta, e deixa o resto com a gente.",
          "Eu estou torcendo por você daqui, de cada lugar. Você é muito inteligente, esperta e uma prova não diz nada sobre você. Você sabe que sou seu fã, princesa.",
        ],
        sign: "Com todo o meu carinho,",
      },
      {
        id: "ansiedade",
        trigger: "Abra quando a ansiedade bater",
        icon: "wind",
        unlockAt: null,
        letterTitle: "Pra quando o peito apertar",
        body: [
          "Primeiro: você não está em perigo. É só a ansiedade falando alto demais, e ela costuma exagerar.",
          "Então vamos devagar. Solte os ombros. Olhe em volta e encontre cinco coisas que você consegue ver. Agora respire — inspira em quatro tempos, segura em quatro, solta em quatro. Se quiser, volte lá em cima e aperte o botão do refúgio.",
          "Esse sentimento é desconfortável, mas ele passa. Ele sempre passou. Você já atravessou todos os dias difíceis que teve até aqui, e esse também não vai ser o último que você vence.",
          "Eu estou aqui. Pode me chamar a qualquer hora.",
        ],
        sign: "Sempre do seu lado,",
      },
      {
        id: "capaz",
        trigger: "Abra quando achar que não é capaz",
        icon: "sparkles",
        unlockAt: null,
        letterTitle: "Pra quando a dúvida vier",
        body: [
          "Eu conheço o jeito como você se importa com as pessoas, como escuta, como percebe o que os outros não dizem. Isso não se aprende em cursinho nenhum.",
          "A dúvida é uma visita barulhenta, mas ela não manda na casa. Você não precisa ter certeza de tudo hoje. Só precisa dar o próximo passo pequeno — uma questão, uma página, um copo de água.",
          "Pensa na {name} de daqui a alguns anos, atendendo alguém que precisava exatamente de você. Essa pessoa existe, e ela está torcendo pra você não desistir agora.",
          "Você é capaz. Eu não falo isso por falar: eu falo porque eu vejo.",
        ],
        sign: "Acreditando em você,",
      },
      {
        id: "fim",
        trigger: "Abra depois da última prova",
        icon: "heart",
        unlockAt: null,
        letterTitle: "Pra quando acabar",
        body: [
          "Acabou. Seja qual for o resultado, você chegou até o final — e muita gente nem sabe o quanto isso custa.",
          "Agora é a hora de descansar de verdade, sem culpa. Dormir até tarde, rir à toa, ouvir a música que você mais gosta bem alto.",
          "Quando as notas saírem, a gente comemora ou a gente se reorganiza. Mas, de um jeito ou de outro, a gente faz isso juntos. Combinado?",
        ],
        sign: "Te esperando com um abraço,",
      },
    ],
  },

  footer: "Feito com muito carinho, para quem vai cuidar de muita gente. E que eu espero poder cuidar muito ainda.",
};

/** Substitui {name} pelo nome dela em qualquer texto. */
export const withName = (text) => text.replaceAll("{name}", config.herName);
