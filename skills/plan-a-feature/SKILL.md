---
name: plan-a-feature
description: Coaches a kid on the Pyinsect team to think like a product manager before building a new feature. They decide who it's for, what problem it solves and why, brainstorm how to build it, and record it in requirements.md. Use this whenever someone asks to add, build, or make something the app can't do yet, like "add a map", "let people share finds", or "make a quiz", even if they don't say "feature". Skip it for bug fixes, improvements to things the app already does, tiny tweaks, and small look-and-feel changes.
---

# Plan a feature

Before building something new, good teams stop and ask: *who is this for, and why do they need
it?* That person is called a **product manager**. You are coaching a kid (about 8 to 13 years
old) to think like one. The kid makes the decisions. Your job is to ask good questions, share
ideas, and write down what they decide.

**Is it a new feature?** A new feature is something the app can't do yet. Look at the code if
you're not sure. If it's a bug fix, a change to something that already exists, a tiny tweak, or
a small look-and-feel change, skip this skill and just help with it.

## Step 1: Who, what, and why

Ask these one at a time. Wait for each answer. Use simple words.

1. **Who is it for?** Who will use this? (A hiker? A park ranger? A kid at school? Our team?)
2. **What do they need?** What problem do they have, or what do they want to do?
3. **Why?** Why do they have this problem, or why do they need this? How does it help protect
   insects and nature?

If an answer is fuzzy, ask a follow-up, like "Can you tell me about a time this happened?" If
the kid has a solution in mind ("add a map"), that's fine. Gently ask who the map helps and why,
so the reason is clear before you choose how to build it.

## Step 2: Brainstorm how to build it

1. **Ask for their ideas first.** "How could we build this?" Encourage more than one idea.
2. **Add one or two of your own.** Keep them simple enough for the team to build and understand.
3. **Compare the ideas together.** For each one, talk about:
   - Does it solve the problem for the person from Step 1?
   - How hard is it to build? Smaller is better for a first version.
   - Does it follow the rules in AGENTS.md, like keeping secrets and reports private?
4. **Let the kid pick.** Then say the plan back in one or two sentences and ask "Is that
   right?" Change it until they say yes.
5. **Agree on "done".** Ask: "How will we know it works?" Turn the answer into 2 or 3 checks
   that anyone could try.

## Step 3: Write it in requirements.md

Add the feature to the bottom of `requirements.md` in the project folder. Use this shape:

```markdown
## <Feature name>

- **Status:** Planned
- **Asked by:** <kid's name>, <date>
- **Who it's for:** <answer from Step 1>
- **Problem:** <what they need>
- **Why it matters:** <why they need it>
- **Our idea:** <the plan the kid picked>
- **Other ideas we talked about:** <one line each, and why we didn't pick them>
- **Done when:**
  - [ ] <check 1>
  - [ ] <check 2>
```

Use the kid's own words where you can. Show them what you wrote.

## Step 4: Build it

Now start building, one small step at a time (see AGENTS.md). When you start, change the status
to **Building**. When every "Done when" check passes, tick the boxes and change the status to
**Done**. If the plan changes while building, update the entry so it stays true.
