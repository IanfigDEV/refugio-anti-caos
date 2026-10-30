# Refúgio Anti-Caos 💛

Site-presente: React + Vite + Tailwind CSS + Framer Motion + Lucide React.

## Rodar no computador

```bash
npm install
npm run dev      # abre em http://localhost:5173
```

Para testar no celular (mesma rede Wi-Fi): `npm run dev -- --host` e abra o endereço de rede que aparecer.

## Personalizar (tudo em `src/config.js`)

| O quê | Onde |
| --- | --- |
| Nome dela / seu nome | `herName`, `yourName` |
| Música | coloque o arquivo em `public/audio/musica.mp3` (e ajuste `song.title`) |
| Lulu | coloque `public/images/lulu.png` e mude `luluImage` para `"/images/lulu.png"` |
| Fotos das polaroids | coloque em `public/images/` e preencha `image` de cada foto |
| Trechos de música | cole em `lyric` (e o nome da música em `song`) de cada polaroid |
| Legendas | `caption` de cada polaroid |
| Cartas | `capsules.letters` (use `{name}` para o nome dela) |
| Travar envelope até uma data | `unlockAt: "2026-11-08T00:00:00"` |

## Publicar (grátis)

```bash
npm run build    # gera a pasta dist/
```

Suba a pasta `dist/` na Netlify (arrastar e soltar em app.netlify.com/drop), Vercel ou GitHub Pages.

## Estrutura

```
src/
  App.jsx                    # junta tudo
  config.js                  # textos, fotos, áudio
  components/
    Hero.jsx                 # boas-vindas + gradiente animado
    AudioPlayer.jsx          # player minimalista (autoplay se o navegador deixar)
    LuluIllustration.jsx     # coelhinha placeholder
    SosButton.jsx            # respiração guiada
    FutureClinic.jsx         # cartão glassmorphism + modal
    Moodboard.jsx            # polaroids que viram
    TimeCapsules.jsx         # envelopes + cartas
  hooks/useModalBehavior.js  # ESC + trava de scroll
```
