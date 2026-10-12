// Innvadex: a bug-catching game (see "Innvadex" in requirements.md).
// When the app finds an invasive bug, app.js calls Innvadex.encounter(). The player taps the
// bug in a quick minigame to catch it, and it goes into their Innvadex with points, a rarity and
// a fact card. Everything is saved on this device only (localStorage), so no accounts are needed.

const GAME_KEY = "pyinsect.game";

// Rarity: the more harm a bug does to nature, the rarer (and more valuable) it is
const RARITY = {
  common:    { label: "Common",    points: 10 },
  rare:      { label: "Rare",      points: 25 },
  legendary: { label: "Legendary", points: 50 },
};

// One fact card per invasive species. Keep these in sync with `invasive` in assets/models/.
const SPECIES_FACTS = {
  agrilus_planipennis: { rarity: "legendary", group: "beetle", emoji: "🪲",
    fact: "A shiny, bright green beetle about as long as a grain of rice.",
    harm: "Its babies (larvae) tunnel under ash tree bark and kill the tree. It has killed hundreds of millions of ash trees in North America.",
    todo: "Take a photo and report it. Don't move firewood to new places, because the larvae hide inside." },
  anoplophora_glabripennis: { rarity: "legendary", group: "beetle", emoji: "🪲",
    fact: "A big, shiny black beetle with white spots and very long black-and-white striped antennae.",
    harm: "It tunnels into maple trees and other hardwoods, which weakens and kills them.",
    todo: "Take a photo and report it. Look for perfectly round holes in tree trunks." },
  lycorma_delicatula: { rarity: "legendary", group: "bug", emoji: "🦗",
    fact: "Its gray front wings have black spots. When it flies, it shows bright red back wings.",
    harm: "It sucks sap from grapevines and trees and leaves sticky goo that grows black mold.",
    todo: "Take a photo and report it. Check cars and outdoor stuff for its mud-like egg patches." },
  vespa_mandarinia: { rarity: "legendary", group: "wasp", emoji: "🐝",
    fact: "The world's biggest hornet, almost as long as your thumb, with a big orange head.",
    harm: "A small group can wipe out a whole honeybee hive in a few hours.",
    todo: "Stay far away. Its sting is very painful. Take a photo from a safe distance and report it." },
  adelges_piceae: { rarity: "rare", group: "bug", emoji: "🐛",
    fact: "A tiny bug that hides under a fluffy white coat that looks like wool.",
    harm: "It sucks sap from fir trees, and over a few years the trees can die.",
    todo: "Look for white fuzzy spots on fir bark. Take a photo and report it." },
  coptotermes_formosanus: { rarity: "rare", group: "termite", emoji: "🐜",
    fact: "A termite that lives in giant colonies, sometimes with millions of termites.",
    harm: "It eats wood in houses and living trees, and it is very hard to get rid of.",
    todo: "Take a photo and report it. Swarms often fly around lights on spring evenings." },
  lymantria_dispar: { rarity: "rare", group: "moth", emoji: "🦋",
    fact: "A moth whose hairy caterpillars have rows of blue and red dots on their backs.",
    harm: "Its caterpillars eat the leaves of hundreds of kinds of trees and can strip whole forests bare.",
    todo: "Don't touch the caterpillars, because the hairs can make your skin itchy. Take a photo and report it." },
  popillia_japonica: { rarity: "rare", group: "beetle", emoji: "🪲",
    fact: "A shiny beetle with a green head and copper-colored wings.",
    harm: "It eats more than 300 kinds of plants. Its grubs eat grass roots under the ground.",
    todo: "Take a photo and report it. Oregon has worked hard to keep this beetle out." },
  solenopsis_invicta: { rarity: "rare", group: "ant", emoji: "🐜",
    fact: "A small reddish ant that builds big dirt mounds.",
    harm: "It pushes out native ants and other small animals, and it stings people and pets.",
    todo: "Never step on or poke the mounds. Its stings burn. Take a photo from a safe distance." },
  xyleborus_monographus: { rarity: "rare", group: "beetle", emoji: "🪲",
    fact: "A tiny brown beetle, smaller than a grain of rice, that bores into oak trees.",
    harm: "It brings a fungus into the tree that can kill Oregon white oaks.",
    todo: "Look for tiny holes and sawdust on oak trunks. Take a photo and report it." },
  anisandrus_dispar: { rarity: "common", group: "beetle", emoji: "🪲",
    fact: "A tiny beetle that drills holes into fruit and nut trees.",
    harm: "It grows fungus inside the tree to eat, and that weakens young trees.",
    todo: "Take a photo. Check orchards and young trees for tiny holes." },
  exomala_orientalis: { rarity: "common", group: "beetle", emoji: "🪲",
    fact: "A small beetle that can be tan, brown, or black, often with dark spots.",
    harm: "Its grubs eat the roots of grass and plants in lawns and gardens.",
    todo: "Take a photo. Grown-ups can check for grubs under brown lawn patches." },
  halyomorpha_halys: { rarity: "common", group: "bug", emoji: "🐞",
    fact: "A brown bug shaped like a shield that smells bad when it's squished.",
    harm: "It damages fruits and vegetables, and in fall big groups crawl into houses.",
    todo: "Take a photo. Seal cracks around windows to keep them out." },
  harmonia_axyridis: { rarity: "common", group: "beetle", emoji: "🐞",
    fact: "A ladybug that can be orange, red, or yellow. It often has a black \"M\" behind its head.",
    harm: "It eats native ladybugs' food and sometimes the native ladybugs too.",
    todo: "Take a photo. Look for the \"M\" mark to tell it apart from native ladybugs." },
  linepithema_humile: { rarity: "common", group: "ant", emoji: "🐜",
    fact: "A tiny brown ant that forms huge \"supercolonies\" that can stretch for miles.",
    harm: "It pushes out native ants that other animals depend on for food.",
    todo: "Take a photo. Keep food sealed so they don't move indoors." },
  macrodactylus_subspinosus: { rarity: "common", group: "beetle", emoji: "🪲",
    fact: "A thin, tan beetle with long, spiny orange legs.",
    harm: "It eats the flowers and leaves of roses, grapes, and fruit trees. It is poisonous to chickens.",
    todo: "Take a photo. Keep chickens away from it." },
  pieris_rapae: { rarity: "common", group: "moth", emoji: "🦋",
    fact: "A white butterfly with one or two black spots on each wing. It came from Europe.",
    harm: "Its green caterpillars munch cabbage, broccoli, and kale.",
    todo: "Take a photo. Check under garden leaves for small green caterpillars." },
  polistes_dominula: { rarity: "common", group: "wasp", emoji: "🐝",
    fact: "A yellow-and-black paper wasp that builds open, umbrella-shaped nests.",
    harm: "It pushes out native paper wasps and competes with them for food.",
    todo: "Don't swat it or touch the nest, because it can sting. Take a photo from a safe distance." },
};

// Badges: each one has a check that looks at the saved game
const BADGES = [
  { id: "first",     emoji: "🎉", name: "First Catch!",      desc: "Catch your first invasive bug.",   earned: g => totalCaught(g) >= 1 },
  { id: "five",      emoji: "🖐️", name: "High Five",         desc: "Catch 5 bugs.",                    earned: g => totalCaught(g) >= 5 },
  { id: "kinds3",    emoji: "🔍", name: "Bug Detective",     desc: "Catch 3 different kinds of bugs.", earned: g => kindsCaught(g) >= 3 },
  { id: "rare",      emoji: "💎", name: "Rare Find",         desc: "Catch a Rare bug.",                earned: g => caughtRarity(g, "rare") },
  { id: "legendary", emoji: "👑", name: "Legend Hunter",     desc: "Catch a Legendary bug.",           earned: g => caughtRarity(g, "legendary") },
  { id: "points100", emoji: "💯", name: "Point Pro",         desc: "Score 100 points.",                earned: g => g.points >= 100 },
  { id: "half",      emoji: "📗", name: "Halfway There",     desc: "Fill half your Innvadex.",         earned: g => kindsCaught(g) >= Math.ceil(gameSpecies().length / 2) },
  { id: "all",       emoji: "🏆", name: "Innvadex Master",   desc: "Catch every kind of bug.",         earned: g => kindsCaught(g) >= gameSpecies().length },
  { id: "protector", emoji: "🛡️", name: "Nature Protector",  desc: "Find 5 native bugs.",              earned: g => g.protector >= 5 },
  { id: "trainer",   emoji: "⚔️", name: "Battle Buddy",      desc: "Win a battle against a trainer.",  earned: g => g.wins >= 1 },
  { id: "daily",     emoji: "📅", name: "Challenge Champ",   desc: "Finish a daily challenge.",        earned: g => g.dailyDone >= 1 },
  // One badge per forest gym (see GYMS below)
  { id: "gym-forestpark", emoji: "🌲", name: "Forest Park Badge",  desc: "Beat the Forest Park gym.",  earned: g => g.gyms.includes("forestpark") },
  { id: "gym-tillamook",  emoji: "🌧️", name: "Tillamook Badge",    desc: "Beat the Tillamook gym.",    earned: g => g.gyms.includes("tillamook") },
  { id: "gym-willamette", emoji: "🍄", name: "Willamette Badge",   desc: "Beat the Willamette gym.",   earned: g => g.gyms.includes("willamette") },
  { id: "gym-mthood",     emoji: "🏔️", name: "Mount Hood Badge",   desc: "Beat the Mount Hood gym.",   earned: g => g.gyms.includes("mthood") },
];

const MINIGAME_TAPS = 3, MINIGAME_SECONDS = 10;

// ---------- version 2: protector points, daily challenges, AI trainers and forest gyms ----------

// Finding a native bug (one that belongs here) earns protector points. We never catch those.
const PROTECTOR_POINTS = 2, NATIVE_MIN_CONFIDENCE = 50;

// One challenge a day, the same for everyone. Each check looks at something that just happened.
const DAILY_REWARD = 20;
const CHALLENGES = [
  { text: "Catch any invasive bug.",              check: ev => ev.type === "catch" },
  { text: "Catch a beetle.",                      check: ev => ev.type === "catch" && SPECIES_FACTS[ev.species].group === "beetle" },
  { text: "Find a native bug (and leave it be!).", check: ev => ev.type === "native" },
  { text: "Win a battle against a trainer.",      check: ev => ev.type === "win" },
  { text: "Catch a Rare or Legendary bug.",       check: ev => ev.type === "catch" && SPECIES_FACTS[ev.species].rarity !== "common" },
  { text: "Catch a bug that stings or bites (an ant or wasp).", check: ev => ev.type === "catch" && ["ant", "wasp"].includes(SPECIES_FACTS[ev.species].group) },
];

// Battle strength by rarity, and each group's special move
const STATS = { common: { hp: 30, atk: 8 }, rare: { hp: 38, atk: 10 }, legendary: { hp: 46, atk: 12 } };
const SPECIAL_MOVES = { beetle: "Wood Drill", ant: "Swarm", wasp: "Sting", moth: "Leaf Munch", bug: "Sap Suck", termite: "Chomp" };
const SPECIAL_HIT_CHANCE = 0.7;
const TEAM_SIZE = 6;

// Practice battles: always open once you've caught a bug
const TRAINERS = [
  { id: "sam", emoji: "🧒", name: "Bug Catcher Sam", reward: 15, team: ["pieris_rapae"] },
  { id: "jo",  emoji: "🥾", name: "Hiker Jo",        reward: 15, team: ["harmonia_axyridis", "linepithema_humile"] },
  { id: "lee", emoji: "🔬", name: "Scientist Lee",   reward: 20, team: ["halyomorpha_halys", "polistes_dominula", "popillia_japonica"] },
];

// Gyms are named after real Oregon forests. Each one opens when your Innvadex has enough kinds of bugs.
const GYMS = [
  { id: "forestpark", emoji: "🌲", name: "Forest Park Gym",        leader: "Ranger Fern",   unlock: 1, reward: 50,
    team: ["exomala_orientalis", "anisandrus_dispar"] },
  { id: "tillamook",  emoji: "🌧️", name: "Tillamook Forest Gym",   leader: "Ranger Moss",   unlock: 3, reward: 50,
    team: ["macrodactylus_subspinosus", "solenopsis_invicta", "adelges_piceae"] },
  { id: "willamette", emoji: "🍄", name: "Willamette Forest Gym",  leader: "Ranger Cedar",  unlock: 5, reward: 75,
    team: ["xyleborus_monographus", "lymantria_dispar", "coptotermes_formosanus", "popillia_japonica"] },
  { id: "mthood",     emoji: "🏔️", name: "Mount Hood Forest Gym",  leader: "Ranger Summit", unlock: 8, reward: 100,
    team: ["agrilus_planipennis", "anoplophora_glabripennis", "lycorma_delicatula", "vespa_mandarinia"] },
];

// ---------- saving ----------
function loadGame() {
  let g = null;
  try { g = JSON.parse(localStorage.getItem(GAME_KEY)); } catch {}
  return { points: 0, caught: {}, badges: [], protector: 0, wins: 0, gyms: [], daily: null, dailyDone: 0, ...(g || {}) };
}
function saveGame(g) { try { localStorage.setItem(GAME_KEY, JSON.stringify(g)); } catch {} }

// The bugs in the game: the invasive ones this model knows that have a fact card
const gameSpecies = () => (window.PYINSECT_MODEL?.invasive || []).filter(s => SPECIES_FACTS[s])
  .sort((a, b) => Object.keys(RARITY).indexOf(SPECIES_FACTS[b].rarity) - Object.keys(RARITY).indexOf(SPECIES_FACTS[a].rarity) || commonName(a).localeCompare(commonName(b)));
const totalCaught = g => Object.values(g.caught).reduce((a, b) => a + b, 0);
const kindsCaught = g => Object.keys(g.caught).length;
const caughtRarity = (g, r) => Object.keys(g.caught).some(s => SPECIES_FACTS[s]?.rarity === r);
const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };
const todaysChallenge = () => {
  const d = new Date();
  return CHALLENGES[Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5) % CHALLENGES.length];
};

// After something happens (a catch, a native bug, a battle win), check the daily challenge and
// the badges. Changes the saved game `g` and returns the messages to show.
function progress(g, ev) {
  const lines = [];
  if (g.daily !== todayKey() && todaysChallenge().check(ev)) {
    g.daily = todayKey(); g.dailyDone++; g.points += DAILY_REWARD;
    lines.push(`📅 Daily challenge done! +${DAILY_REWARD} points`);
  }
  const had = new Set(g.badges);
  const fresh = BADGES.filter(b => !had.has(b.id) && b.earned(g));
  g.badges.push(...fresh.map(b => b.id));
  lines.push(...fresh.map(b => `${b.emoji} New badge: ${b.name.replace(/!$/, "")}!`));
  return lines;
}

// ---------- building blocks ----------
function rarityTag(species) {
  const r = SPECIES_FACTS[species].rarity;
  return el("span", `rarity ${r}`, RARITY[r].label);
}

function factCard(species, caughtCount) {
  const f = SPECIES_FACTS[species];
  const card = el("article", "factcard");
  const head = el("div", "factcard-head");
  head.append(el("span", "bug-emoji", f.emoji), el("div", null));
  head.lastChild.append(el("strong", null, commonName(species)), el("span", "sci", sciName(species)));
  const tags = el("div", "tags");
  tags.append(rarityTag(species), el("span", "pts", `${RARITY[f.rarity].points} points`));
  if (caughtCount) tags.append(el("span", "pts", `Caught ×${caughtCount}`));
  const facts = el("dl", "facts");
  for (const [k, v] of [["What it is", f.fact], ["Why it's a problem", f.harm], ["If you see one", f.todo]])
    facts.append(el("dt", null, k), el("dd", null, v));
  card.append(head, tags, facts);
  return card;
}

// ---------- the Innvadex panel ----------
function renderGame() {
  const g = loadGame(), all = gameSpecies();
  $("gamePoints").textContent = `${g.points} points`;
  $("gameProgress").textContent = `${kindsCaught(g)} of ${all.length} caught`;
  $("gameProtector").textContent = `🛡️ ${g.protector} protector`;
  const doneToday = g.daily === todayKey();
  $("dailyText").textContent = todaysChallenge().text;
  $("dailyState").textContent = doneToday ? "✅ Done! Come back tomorrow." : `+${DAILY_REWARD} points`;
  $("daily").classList.toggle("done", doneToday);

  const dex = $("dexGrid"); dex.innerHTML = "";
  for (const s of all) {
    const n = g.caught[s] || 0;
    const slot = el("button", "dex-slot" + (n ? " caught" : ""));
    slot.type = "button";
    if (n) {
      slot.append(el("span", "bug-emoji", SPECIES_FACTS[s].emoji), el("strong", null, commonName(s)), rarityTag(s), el("span", "count", `×${n}`));
      slot.onclick = () => showFact(s, n);
    } else {
      slot.append(el("span", "bug-emoji", "❓"), el("strong", null, "???"), el("span", "count", "Not caught yet"));
      slot.disabled = true;
    }
    dex.append(slot);
  }

  const badges = $("badgeList"); badges.innerHTML = "";
  for (const b of BADGES) {
    const has = g.badges.includes(b.id);
    const item = el("div", "badge" + (has ? " earned" : ""));
    item.title = b.desc;
    item.append(el("span", "badge-emoji", has ? b.emoji : "🔒"), el("strong", null, b.name), el("span", null, b.desc));
    badges.append(item);
  }

  const learn = $("learnList"); learn.innerHTML = "";
  for (const s of all) learn.append(factCard(s, g.caught[s] || 0));

  renderBattles(g);
}

// The Battle tab: practice trainers, then the forest gyms
function renderBattles(g) {
  const list = $("battleList"); list.innerHTML = "";
  const kinds = kindsCaught(g);
  if (!kinds) list.append(el("p", "empty", "Catch your first invasive bug to start battling. Your caught bugs are your battle team!"));
  const row = (foe, gym) => {
    const item = el("div", "foe" + (gym && g.gyms.includes(foe.id) ? " beaten" : ""));
    const who = el("div", "foe-who");
    who.append(el("strong", null, foe.name), el("span", "muted", gym ? `Leader: ${foe.leader} · ${foe.team.length} bugs` : `${foe.team.length} bug${foe.team.length === 1 ? "" : "s"}`));
    const locked = !kinds || (gym && kinds < foe.unlock);
    const b = el("button", "btn" + (locked ? "" : " primary"), locked ? `🔒 Catch ${gym ? foe.unlock : 1} kind${(gym ? foe.unlock : 1) === 1 ? "" : "s"}` : gym && g.gyms.includes(foe.id) ? "✅ Battle again" : "Battle!");
    b.type = "button"; b.disabled = locked;
    b.onclick = () => battle(foe, gym);
    item.append(el("span", "bug-emoji", foe.emoji), who, b);
    list.append(item);
  };
  list.append(el("h3", null, "Trainers"));
  TRAINERS.forEach(t => row(t, false));
  list.append(el("h3", null, "Forest gyms"));
  GYMS.forEach(gym => row(gym, true));
}

function showTab(name) {
  for (const t of document.querySelectorAll(".game-tabs [data-tab]")) {
    const on = t.dataset.tab === name;
    t.setAttribute("aria-selected", on);
    $(`tab-${t.dataset.tab}`).hidden = !on;
  }
}

// ---------- pop-up windows ----------
function openPopup(content, buttons) {
  const pop = $("gamePopup"), box = $("gamePopupBox");
  box.innerHTML = "";
  box.append(...content);
  const bar = el("div", "actions");
  for (const [text, primary, onClick] of buttons) {
    const b = el("button", "btn" + (primary ? " primary" : ""), text);
    b.type = "button";
    b.onclick = () => { closePopup(); onClick?.(); };
    bar.append(b);
  }
  box.append(bar);
  pop.hidden = false;
  bar.querySelector("button")?.focus();
}
function closePopup() {
  $("gamePopup").hidden = true;
  const done = popupDone; popupDone = null; done?.();
}
let popupDone = null;

function showFact(species, n) {
  openPopup([factCard(species, n)], [["Close", true]]);
}

function showInstructions() {
  const list = el("ol", "howto");
  for (const step of [
    "Find a bug outside. Take a photo with “Take photo”, or pick one with “Select photos”.",
    "If the bug is invasive, a wild bug appears! Tap it 3 times in 10 seconds to catch it.",
    "Caught bugs go into your Innvadex with points. Common = 10, Rare = 25, Legendary = 50.",
    "Earn badges, like “First Catch!”, as you play.",
    "Find a bug that isn't invasive? Leave it be, and get protector points!",
    "Do the daily challenge for bonus points. There's a new one every day.",
    "Open “Battle” to battle trainers with your caught bugs. Catch more kinds to open the forest gyms.",
    "Open “Learn about species” to see every invasive bug, even ones you haven't caught yet.",
  ]) list.append(el("li", null, step));
  const safety = el("div", "safety");
  safety.append(el("strong", null, "Stay safe"));
  const tips = el("ul");
  for (const tip of [
    "Don't touch bugs with bare hands. Some sting or bite.",
    "Never carry an invasive bug (or firewood) to a new place.",
    "Bring a grown-up, and watch where you walk.",
  ]) tips.append(el("li", null, tip));
  safety.append(tips);
  const why = el("p", "muted", "Every invasive bug you find is also reported to the Pyinsect team, so experts can learn where invasive bugs are and where to put traps.");
  openPopup([el("h2", null, "How to play"), list, safety, why], [["Let's go!", true]]);
}

// ---------- the minigame ----------
// The bug (the player's own photo) hops around the box. Tap it 3 times before time runs out.
function minigame(species, photo) {
  return new Promise(resolve => {
    const arena = el("div", "arena");
    const bug = el("button", "wild-bug");
    bug.type = "button";
    bug.setAttribute("aria-label", `Catch the ${commonName(species)}`);
    const img = el("img"); img.src = photo; img.alt = "";
    bug.append(img);
    arena.append(bug);
    const info = el("p", "arena-info", `Tap it ${MINIGAME_TAPS} times! ${MINIGAME_SECONDS} seconds left`);
    const bar = el("div", "track"), fill = el("div", "fill");
    fill.style.width = "100%"; bar.append(fill);

    let taps = 0, left = MINIGAME_SECONDS * 10, finished = false;
    const slow = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hop = () => {
      bug.style.left = `${5 + Math.random() * 70}%`;
      bug.style.top = `${5 + Math.random() * 65}%`;
    };
    const end = won => {
      if (finished) return;
      finished = true;
      clearInterval(timer); clearInterval(mover);
      popupDone = () => resolve(won);
      closePopup();
    };
    bug.onclick = () => {
      taps++;
      bug.classList.remove("hit"); void bug.offsetWidth; bug.classList.add("hit");
      if (taps >= MINIGAME_TAPS) return end(true);
      info.textContent = `${MINIGAME_TAPS - taps} more tap${MINIGAME_TAPS - taps === 1 ? "" : "s"}!`;
      hop();
    };
    const timer = setInterval(() => {
      left--;
      fill.style.width = `${left / (MINIGAME_SECONDS * 10) * 100}%`;
      if (left <= 0) end(false);
    }, 100);
    const mover = setInterval(hop, slow ? 1800 : 900);
    hop();

    openPopup([el("h2", null, `A wild ${commonName(species)} appeared!`), rarityTag(species), arena, bar, info],
      [["Let it go", false, () => end(false)]]);
    $("gamePopupBox").querySelector(".actions button").onclick = () => end(false);
    popupDone = () => end(false);   // closing the pop-up (Escape) lets the bug go
    bug.focus();
  });
}

// ---------- catching ----------
let encounters = Promise.resolve();

// Called by app.js when a photo shows an invasive bug. Bugs found together wait their turn.
function encounter(species, photo) {
  if (!SPECIES_FACTS[species]) return;
  encounters = encounters.then(async () => {
    const won = await minigame(species, photo);
    if (!won) {
      await new Promise(r => { popupDone = r; openPopup([el("h2", null, "It got away!"),
        el("p", null, "Don't worry, it was still reported. Find another one and try again.")], [["OK", true]]); });
      return;
    }
    const g = loadGame();
    const pts = RARITY[SPECIES_FACTS[species].rarity].points;
    g.caught[species] = (g.caught[species] || 0) + 1;
    g.points += pts;
    const extra = progress(g, { type: "catch", species }).map(l => el("p", "new-badge", l));
    saveGame(g);
    renderGame();

    await new Promise(r => { popupDone = r; openPopup([el("h2", null, `Gotcha! +${pts} points`), ...extra, factCard(species, g.caught[species])],
      [["Open Innvadex", true, () => { showTab("dex"); $("game").scrollIntoView({ behavior: "smooth" }); }], ["Keep playing", false]]); });
  });
}

// ---------- bugs that aren't invasive ----------
let toastTimer = null;
function toast(lines) {
  const t = $("gameToast");
  t.innerHTML = "";
  for (const l of lines) t.append(el("p", null, l));
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 6000);
}

// Called by app.js when a real photo shows a bug that isn't on the invasive list
function native(species, confidence) {
  if (confidence < NATIVE_MIN_CONFIDENCE) return;   // not sure what it is, so no points
  const g = loadGame();
  g.protector++; g.points += PROTECTOR_POINTS;
  const lines = [`🛡️ ${commonName(species)} isn't invasive. Leave it be! +${PROTECTOR_POINTS} protector points`, ...progress(g, { type: "native", species })];
  saveGame(g);
  renderGame();
  toast(lines);
}

// Called by app.js when a photo looks AI-made: it doesn't count in the game
function fakePhoto() {
  toast(["🤖 That photo looks AI-made, so it doesn't count in the game. Real photos only!"]);
}

// ---------- battles against AI trainers ----------
const wait = ms => new Promise(r => setTimeout(r, ms));
const fighter = species => ({ species, ...STATS[SPECIES_FACTS[species].rarity], max: STATS[SPECIES_FACTS[species].rarity].hp });
// Your team: up to 6 kinds you've caught, strongest first
const myTeam = g => gameSpecies().filter(s => g.caught[s]).slice(0, TEAM_SIZE).map(fighter);
const nextAlive = (team, from) => { for (let i = 1; i <= team.length; i++) { const j = (from + i) % team.length; if (team[j].hp > 0) return j; } return -1; };
const specialMove = f => SPECIAL_MOVES[SPECIES_FACTS[f.species].group];

function battle(foe, gym) {
  const g = loadGame(), mine = myTeam(g), theirs = foe.team.filter(s => SPECIES_FACTS[s]).map(fighter);
  if (!mine.length || !theirs.length) return;
  const foeName = gym ? foe.leader : foe.name;
  let me = 0, them = 0, busy = false, over = false;

  const field = el("div", "battle-field");
  const log = el("p", "battle-log", `${foeName} wants to battle!`);
  log.setAttribute("aria-live", "polite");
  const say = text => { log.textContent = text; };
  const side = (team, i, label, cls) => {
    const f = team[i], box = el("div", `fighter ${cls}`);
    const hp = el("div", "track"), fill = el("div", "fill" + (f.hp / f.max < 0.3 ? " low" : ""));
    fill.style.width = `${f.hp / f.max * 100}%`; hp.append(fill);
    box.append(el("span", "muted", label), el("span", "bug-emoji", SPECIES_FACTS[f.species].emoji),
      el("strong", null, commonName(f.species)), hp, el("span", "hp", `HP ${f.hp}/${f.max} · ${team.filter(t => t.hp > 0).length} of ${team.length} bug${team.length === 1 ? "" : "s"} left`));
    return box;
  };
  const moves = el("div", "battle-moves");
  const btn = (text, onClick) => { const b = el("button", "btn", text); b.type = "button"; b.onclick = onClick; moves.append(b); return b; };
  const tackle = btn("Tackle", () => turn("tackle"));
  const special = btn("", () => turn("special"));
  const swap = btn("Switch bug", () => turn("switch"));
  tackle.classList.add("primary");
  const draw = () => {
    field.innerHTML = "";
    field.append(side(theirs, them, foeName, "them"), side(mine, me, "You", "you"));
    special.textContent = `${specialMove(mine[me])} (strong, can miss)`;
    for (const b of [tackle, special]) b.disabled = busy || over;
    swap.disabled = busy || over || nextAlive(mine, me) < 0 || nextAlive(mine, me) === me;
  };

  // One attack. A special move hits harder but can miss.
  const attack = (a, d, useSpecial, owner) => {
    const move = useSpecial ? specialMove(a) : "Tackle", name = `${owner} ${commonName(a.species)}`;
    if (useSpecial && Math.random() > SPECIAL_HIT_CHANCE) return say(`${name} used ${move}… but missed!`);
    const dmg = Math.max(1, Math.round(useSpecial ? a.atk * 1.8 + (Math.random() * 6 - 3) : a.atk + (Math.random() * 4 - 2)));
    d.hp = Math.max(0, d.hp - dmg);
    say(`${name} used ${move}! It did ${dmg} damage.`);
  };

  async function turn(kind) {
    if (busy || over) return;
    busy = true;
    if (kind === "switch") { me = nextAlive(mine, me); say(`Go, ${commonName(mine[me].species)}!`); }
    else attack(mine[me], theirs[them], kind === "special", "Your");
    draw(); await wait(900); if (over) return;
    if (theirs[them].hp <= 0) {
      say(`${foeName}'s ${commonName(theirs[them].species)} fainted!`); draw(); await wait(900); if (over) return;
      const n = nextAlive(theirs, them);
      if (n < 0) return finish(true);
      them = n; say(`${foeName} sends out ${commonName(theirs[them].species)}!`);
      busy = false; return draw();
    }
    // The AI trainer's turn: it finishes you off with Tackle when it can, otherwise it sometimes tries its special move
    const f = theirs[them], p = mine[me];
    attack(f, p, p.hp > f.atk + 2 && Math.random() < 0.5, `${foeName}'s`);
    draw(); await wait(900); if (over) return;
    if (p.hp <= 0) {
      say(`Your ${commonName(p.species)} fainted!`); draw(); await wait(900); if (over) return;
      const n = nextAlive(mine, me);
      if (n < 0) return finish(false);
      me = n; say(`Go, ${commonName(mine[me].species)}!`);
    }
    busy = false; draw();
  }

  function finish(won, ran) {
    if (over) return;
    over = true; popupDone = null;
    const lines = [];
    let title = ran ? "You ran away." : "You lost this time. Catch more bugs and try again!";
    if (won) {
      const g = loadGame();
      const beatenBefore = gym && g.gyms.includes(foe.id), pts = beatenBefore ? 10 : foe.reward;
      g.wins++; g.points += pts;
      if (gym && !beatenBefore) g.gyms.push(foe.id);
      lines.push(...progress(g, { type: "win" }));
      saveGame(g); renderGame();
      title = `You beat ${foeName}! +${pts} points`;
    }
    const tipBug = foe.team[Math.floor(Math.random() * foe.team.length)];
    openPopup([el("h2", null, title), ...lines.map(l => el("p", "new-badge", l)),
      el("p", "muted", `Did you know? ${commonName(tipBug)}: ${SPECIES_FACTS[tipBug].harm}`)], [["OK", true]]);
  }

  openPopup([el("h2", null, `${foe.emoji} ${foe.name}`), field, log, moves], [["Run away", false]]);
  popupDone = () => finish(false, true);   // "Run away" or Escape
  draw();
  tackle.focus();
}

// ---------- wiring ----------
for (const t of document.querySelectorAll(".game-tabs [data-tab]")) t.onclick = () => showTab(t.dataset.tab);
$("howToPlay").onclick = showInstructions;
$("gamePopup").addEventListener("keydown", e => { if (e.key === "Escape") { e.stopPropagation(); closePopup(); } });
renderGame();
if (!loadGame().seenHowTo) { const g = loadGame(); g.seenHowTo = true; saveGame(g); showInstructions(); }

window.Innvadex = { encounter, native, fakePhoto };
