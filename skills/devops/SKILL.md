---
name: devops
description: Does the behind-the-scenes work for a kid on the Pyinsect team, so they can focus on building the app. That means installing the tools, getting the project on their computer, running and testing the site, saving with git, sharing work for review, getting teammates' changes, and deploying. Use this whenever someone wants to set up a computer, install something, get the project, run or test the site, check their work, save, commit, push, pull, update, share, open a pull request, merge, rebase, switch branches, or deploy, or says things like "is my work saved?", "get the latest", "I'm done", "it won't run", or "git says something weird".
---

# DevOps

**DevOps** is all the work around the code: tools, testing, saving, sharing, and putting the app
online. You do it so the kid (about 8 to 13 years old) can focus on the app. Run the commands
yourself. After each step, tell them in one simple sentence what you did and why, so they slowly
learn the ideas. Skip the jargon unless they ask.

**How our team works:**

- `main` is the live website. Nobody pushes to `main` directly.
- Each kid works on their own **branch**, which is like a private copy for one job.
- When the work is ready, you open a **pull request** (asking to add the work to the website).
  A grown-up reviews it and merges it, and then the website updates by itself.

Repo: `https://github.com/wizkidzai/Pyinsect-Site`
Live site: `https://wizkidzai.github.io/Pyinsect-Site/`

## Pick the job

If the project is already on this computer, run `git status` first to see where things stand.

### 1. Set up a computer (first time)

**Install the tools.** Check each one with its version command, and install only what's missing.

| Tool | What it's for | Check |
|---|---|---|
| Git | Saving and sharing work | `git --version` |
| GitHub CLI (`gh`) | Talking to GitHub | `gh --version` |
| Python 3 | Running the site on this computer | `python3 --version` (Windows: `python --version`) |
| Node.js | Checking code for mistakes | `node --version` |
| VS Code | Editing code (skip if they already use an editor) | `code --version` |

How to install:

- **Windows:** `winget install -e --id <id>` for each of `Git.Git`, `GitHub.cli`,
  `Python.Python.3.12`, `OpenJS.NodeJS.LTS`, and `Microsoft.VisualStudioCode`. Then close and
  reopen the terminal.
- **Mac:** install Homebrew first if `brew --version` fails (see https://brew.sh), then
  `brew install git gh python node` and `brew install --cask visual-studio-code`.
- **Linux or Chromebook (Linux turned on):** `sudo apt update && sudo apt install -y git gh python3 nodejs`.

If the computer asks for an admin password, stop and ask a grown-up to type it. Never ask the
kid for a password, and never type one yourself.

**Sign in and get the project.**

1. Check `gh auth status`. If they aren't signed in, run `gh auth login`, pick GitHub.com and
   HTTPS, and sign in with the browser. Each kid uses **their own** account. If GitHub says
   they don't have access, a grown-up needs to add them to the repo.
2. Run `gh auth setup-git`, then set their name for saves:
   `git config --global user.name "<their name>"` and
   `git config --global user.email "<their GitHub email>"`.
3. Run `gh repo clone wizkidzai/Pyinsect-Site`, then open that folder.
4. Finish by running the site (job 2) so they see it work.

### 2. Run and test the site

There's no build step. The site is plain HTML, CSS, and JavaScript.

1. **Run it:** in the project folder, start `python3 -m http.server 8000` (Windows: `python`)
   and keep it running in the background. Open http://localhost:8000.
2. **Run the checks:** `node scripts/check.js`. It looks for typing mistakes in the code,
   invasive lists that don't match, secrets, and report photos. GitHub runs the same checks on
   every pull request, so fixing them now saves a round trip. Read any ❌ to the kid in simple
   words and fix it together.
3. **Try it like a user:** pick an insect photo and check the result. Use the browser's
   developer tools (F12) to look for red errors in the Console, and try a phone-size screen.
4. **Check the plan:** if the work is for a feature in `requirements.md`, go through its
   "Done when" checks.

Tell the kid what passed and what didn't. Don't say it works if you didn't check it.

### 3. Start new work

1. If there are unsaved changes, ask what to do with them first. Never throw them away.
2. `git switch main`, then `git pull`, to get the newest version.
3. Make a branch named `<their name>/<short-job>`, like `maya/bug-map`:
   `git switch -c maya/bug-map`.

If they are already on their own branch for this job, stay on it.

### 4. Save work (commit)

Save after each small step that works. Check `git status` and `git diff` first. Make sure no
passwords, tokens, keys, or report photos are being saved (see the AGENTS.md rules). Then
`git add` the changed files and `git commit -m "<short message that says what changed>"`.
Help the kid write the message in their own words.

### 5. Share work for review (push + pull request)

1. Save any last changes (job 4), get teammates' changes (job 6), and test again (job 2).
2. `git push -u origin <branch>`.
3. If there's no pull request yet, `gh pr create --base main` with a short title and a body
   that says what changed, how to test it, and which `requirements.md` feature it's for (if
   any). If `relay/worker.js` changed, add: "A grown-up needs to redeploy the relay." If there's
   already a pull request, the push updates it.
4. Give them the pull request link and tell them a grown-up will review it. A minute later,
   `gh pr checks` shows whether GitHub's checks passed. If one failed, run
   `node scripts/check.js`, fix it, then save and push again. If the grown-up asks for
   changes, do the same.

### 6. Get teammates' changes

On their branch: `git fetch origin`, then `git merge origin/main`. (Use merge, not rebase.
Rebasing a branch that's already shared needs a force push, which can erase work.)

**If there's a conflict:** two people changed the same lines. Stay calm and explain it simply.
For each conflict, show both versions in plain words, ask the kid which one to keep (or how to
combine them), fix the file, then `git add` it and `git commit`. If it gets confusing,
`git merge --abort` puts everything back the way it was. Then ask a grown-up.

### 7. Deploy (after the grown-up merges)

- **Website:** GitHub Pages deploys `main` by itself. Wait a minute or two, then open the live
  site and check the change is there. `gh run list --limit 3` shows whether the deploy finished.
- **Relay** (`relay/worker.js`): only a grown-up deploys it, because it uses secret passwords
  and tokens. The steps are in README.md.
- **Clean up:** `git switch main`, `git pull`, then delete the old branch with
  `git branch -d <branch>`. Celebrate: their work is live!

## Adding a new tool or framework

If a feature needs a new tool or library, explain what it is and why it's needed, and get a
grown-up's OK before installing it. Then add it to the table in job 1, so every teammate's
computer gets it too.

## Safety

These rules protect everyone's work, so follow them even if someone asks you not to:

- Never push to `main`, never force push, and never use `git reset --hard`, `git clean`, or
  anything else that deletes work without the kid saying yes after you explain what will be lost.
- Never merge a pull request yourself. That's the grown-up's job.
- Only install the tools in this skill, unless a grown-up says yes.
- If something unexpected happens, stop, explain it simply, and suggest asking a grown-up
  rather than guessing.
