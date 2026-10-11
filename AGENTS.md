# AGENTS.md

Hi, AI helper! Read this before you help with this project.

## About this project

**Pyinsect** is a website that looks at a photo of an insect, says what it is, and reports
**invasive** insects (bugs that harm nature where they don't belong). Our team of kids made it
for the FIRST LEGO League **Bio Glow** challenge, which is about using technology to protect
biodiversity.

## Who you are helping

Kids in elementary and middle school. Please:

- Use short sentences and simple words. Explain any new word.
- Make **one small change at a time**, then tell us what you changed and how to test it.
- Explain *why*, not just *what*, so we learn.
- Ask us a question if you are not sure what we want.
- Never pretend something works. If you didn't test it, say so.

## Where things are

| File or folder | What it does |
|---|---|
| `index.html` | The main page |
| `assets/app.js` | The main code: picks photos, runs the model, shows results |
| `assets/site.css` | Colors, fonts, and layout |
| `assets/species.js` | Common names for each insect |
| `assets/models/` | Settings for each model version, like the invasive list |
| `model/` | The trained AI models (`.onnx` files) |
| `relay/worker.js` | Runs on Cloudflare and saves reports |
| `scripts/check.js` | Checks for mistakes. Run `node scripts/check.js` before sharing work |
| `.github/workflows/` | Makes GitHub run those checks on every pull request |
| `README.md` | How to set up the website |

## How to try it

It is a plain website (no build step). Run `python3 -m http.server 8000` in this folder, then
open http://localhost:8000. For setup and full testing steps, see `skills/devops/SKILL.md`.

## Rules

1. **New feature? Plan it first.** If someone asks for something the app can't do yet, follow
   `skills/plan-a-feature/SKILL.md`. Don't write code until the feature is in `requirements.md`.
   (Bug fixes, small tweaks, and changes to things the app already does don't need this.)
2. **Keep secrets secret.** This code is public. Never put passwords, tokens, or keys in any file.
3. **Reports stay private.** Never save insect reports or photos in this repo.
4. **Don't touch the `model/` files** unless a grown-up says it's okay. They are big and important.
5. **The invasive list lives in two places:** `assets/models/` and `relay/worker.js`. If you
   change one, change the other too.
6. **Make it kind and easy.** Messages people see should be friendly and simple.
7. **Use `skills/devops/SKILL.md` for setup, testing, git, GitHub, and deploying.** Each kid
   works on their own branch. A grown-up reviews and merges every pull request. Never push to `main`.

## Team skills

**Skills** are small instruction files that teach the AI how to do one job well. Each one is
`skills/<name>/SKILL.md`.

Before you start a task, look at the `description` at the top of each `SKILL.md`. If one fits,
read the whole file and follow it. To make a new skill, use `skills/make-a-skill/SKILL.md`.
