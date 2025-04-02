const natures = {
  hardy: ["atk", "atk"],
  lonely: ["atk", "def"],
  adamant: ["atk", "spa"],
  naughty: ["atk", "spd"],
  brave: ["atk", "spe"],

  bold: ["def", "atk"],
  docile: ["def", "def"],
  impish: ["def", "spa"],
  lax: ["def", "spd"],
  relaxed: ["def", "spe"],

  modest: ["spa", "atk"],
  mild: ["spa", "def"],
  bashful: ["spa", "spa"],
  rash: ["spa", "spd"],
  quiet: ["spa", "spe"],

  calm: ["spd", "atk"],
  gentle: ["spd", "def"],
  careful: ["spd", "spa"],
  quirky: ["spd", "spd"],
  sassy: ["spd", "spe"],

  timid: ["spe", "atk"],
  hasty: ["spe", "def"],
  jolly: ["spe", "spa"],
  naive: ["spe", "spd"],
  serious: ["spe", "spe"],
};

function calcStat(
  stat,
  base,
  ev = 252,
  level = 100,
  iv = 20,
  nature = "hardy"
) {
  stat = stat.toLowerCase();

  nature = nature.toLowerCase();
  const pos = natures[nature][0] === stat;
  const neg = natures[nature][1] === stat;
  let natureBoost = 1.0;

  if (pos && !neg) {
    natureBoost = 1.1;
  } else if (neg && !pos) {
    natureBoost = 0.9;
  }

  let first = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100);

  if (stat == "hp") {
    return first + level + 10;
  } else {
    return Math.floor(first + 5 * natureBoost);
  }
}

const statLinkedIds = [
  "level",
  "nature",

  "hp-bas",
  "hp-evs",
  "hp-ivs",

  "atk-bas",
  "atk-evs",
  "atk-ivs",

  "def-bas",
  "def-evs",
  "def-ivs",

  "spa-bas",
  "spa-evs",
  "spa-ivs",

  "spd-bas",
  "spd-evs",
  "spd-ivs",

  "spe-bas",
  "spe-evs",
  "spe-ivs",
];

statLinkedIds.forEach((id) => {
  document.getElementById(id).addEventListener("change", (event) => {
    snapToBounds(event.target);
    updateStatCalcs();
  });
});

const statNames = ["hp", "atk", "def", "spa", "spd", "spe"];

function updateStatCalcs(event = null) {
  const level = parseInt(document.getElementById("level").value);
  const nature = document.getElementById("nature").value;

  statNames.forEach((stat) => {
    const base = parseInt(document.getElementById(stat + "-bas").value);
    const ev = parseInt(document.getElementById(stat + "-evs").value);
    const iv = parseInt(document.getElementById(stat + "-ivs").value);

    const result = Math.floor(calcStat(stat, base, ev, level, iv, nature));
    document.getElementById(stat + "-calc").textContent = result;
  });
}

function snapToBounds(inputElement) {
  let value = inputElement.value;
  const min = parseInt(inputElement.getAttribute("min"));
  const max = parseInt(inputElement.getAttribute("max"));
  console.log(min, max)

  if (min && value < min) {
    value = min
  } else if (max && value > max) {
    value = max
  }

  inputElement.value = value;
}

updateStatCalcs();
