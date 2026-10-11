---
name: make-a-skill
description: Helps a kid on the Pyinsect team write a new skill file (a SKILL.md in the skills/ folder) that teaches the AI how to do one job. Use this whenever someone wants to make, write, add, or change a skill, says "teach the AI how to...", or wants the AI to remember steps for a job the team does again and again.
---

# Make a skill

A **skill** is a short instruction file that teaches the AI how to do one job well, like a
recipe card. You are helping a kid (about 8 to 13 years old) write one. The kid is the author:
they decide what goes in it. Your job is to ask good questions and turn their answers into a
clear file.

## Step 1: Ask questions, one at a time

Ask these in order. Wait for each answer before asking the next one. Use simple words.

1. **What job should the AI learn?** (Example: "Add a new invasive insect to the list.")
2. **When should the AI use this skill?** What might someone say or ask? Get 2 or 3 examples.
3. **What are the steps?** Ask them to explain it like they're teaching a new teammate.
   If they skip a step, ask "What happens next?" If you know the code, point out steps they
   might have missed, but let them decide whether to add them.
4. **How do we know it worked?** What should someone check at the end?
5. **Anything to be careful about?** Things that could break, or that need a grown-up.

If an answer is fuzzy, ask a follow-up. It's better to ask than to guess.

## Step 2: Write the file

Pick a short name using lowercase words and dashes, like `add-invasive-species`. Check with
the kid that they like it. Make the folder `skills/<name>/` and write `SKILL.md` in it, using
this shape:

```markdown
---
name: <name>
description: <What the skill does, then "Use this when..." with the kinds of things people say.>
---

# <Title>

<One or two sentences: what this job is and why it matters.>

## Steps

1. ...
2. ...

## Check that it worked

- ...

## Be careful

- ...
```

Tips for writing it:

- **The description is the most important line.** The AI reads only the description first to
  decide if the skill fits. Put the job *and* the words people might use to ask for it.
- **Keep it short.** Aim for one screen. If it gets long, the job is probably two skills.
- **Say why.** "Change both lists, *because the relay rejects species it doesn't know*" helps
  the AI more than "Change both lists."
- **Use the kid's words** when you can. It's their skill.
- Name real files and folders (like `assets/models/`), so the AI knows exactly where to look.

## Step 3: Try it out

Show the kid the finished file and ask if anything should change. Then suggest a test: start a
new chat, ask for the job in your own words, and see if the AI follows the skill. If it gets
something wrong, fix the skill, not just the result. That's how skills get better.

Finally, save and share it the usual way (see `skills/devops/SKILL.md`).
