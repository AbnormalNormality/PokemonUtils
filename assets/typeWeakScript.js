const toggleButtons = document.querySelectorAll(".toggle-button");

toggleButtons.forEach((button) => {
  const input = button.querySelector("input");
  const span = button.querySelector("span");

  input.addEventListener("change", () => {
    const parentBg = window.getComputedStyle(button).backgroundColor;
    const parentColour = window.getComputedStyle(button).color;

    if (input.checked) {
      span.style.backgroundColor = parentColour;
      span.style.color = parentBg;
      span.style.borderColor = parentBg;
    } else {
      span.style.backgroundColor = parentBg;
      span.style.color = parentColour;
      span.style.borderColor = parentColour;
    }
  });
});

const buttonColours = {
  normal: ["#ddd", "#444"],
  fighting: ["#f50", "#500"],
  flying: ["#ddf", "#002"],
  poison: ["#e5e", "#505"],

  ground: ["#da0", "#630"],
  rock: ["#fc5", "#530"],
  bug: ["#af0", "#070"],
  ghost: ["#b6b", "#303"],

  steel: ["#eef", "#445"],
  fire: ["#f90", "#700"],
  water: ["#0cf", "#009"],
  grass: ["#2f2", "#060"],

  electric: ["#ff0", "#550"],
  psychic: ["#f7e", "#625"],
  dragon: ["#a6f", "#005"],
  ice: ["#9ff", "#066"],

  dark: ["#b99", "#422"],
  fairy: ["#f9f", "#606"],
};

function updateTypeColours() {
  for (const [type, colours] of Object.entries(buttonColours)) {
    let [backgroundColour, foregroundColour] = colours;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      [backgroundColour, foregroundColour] = [
        foregroundColour,
        backgroundColour,
      ];
    }

    const button = document.getElementById(type);

    const parent = button.parentElement;
    parent.style.backgroundColor = backgroundColour;
    parent.style.color = foregroundColour;

    const span = parent.querySelector("span");
    span.style.backgroundColor = backgroundColour;
    span.style.color = foregroundColour;
    span.style.borderColor = foregroundColour;

    button.addEventListener("change", updateWeaknesses);

    const div = document.getElementById(type + "-header");
    div.style.backgroundColor = backgroundColour;
    div.style.color = foregroundColour;
    div.style.borderColor = foregroundColour;
  }
}

updateTypeColours();

const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
darkModeQuery.addEventListener("change", updateTypeColours);

const typeWeaknesses = {
  normal: { fighting: 2, ghost: 0 },
  fighting: { flying: 2, psychic: 2, fairy: 2, rock: 0.5, bug: 0.5 },
  flying: { rock: 2, electric: 2, ice: 2, fighting: 0.5, bug: 0.5, grass: 0.5 },
  poison: {
    ground: 2,
    psychic: 2,
    fighting: 0.5,
    poison: 0.5,
    bug: 0.5,
    grass: 0.5,
    fairy: 0.5,
  },

  ground: { water: 2, grass: 2, ice: 2, electric: 0, poison: 0.5, rock: 0.5 },
  rock: {
    fighting: 2,
    ground: 2,
    steel: 2,
    water: 2,
    grass: 2,
    normal: 0.5,
    flying: 0.5,
    poison: 0.5,
    fire: 0.5,
  },
  bug: { flying: 2, rock: 2, fire: 2, fighting: 0.5, ground: 0.5, grass: 0.5 },
  ghost: { ghost: 2, dark: 2, normal: 0, fighting: 0, poison: 0.5, bug: 0.5 },

  steel: {
    fighting: 2,
    ground: 2,
    fire: 2,
    normal: 0.5,
    flying: 0.5,
    rock: 0.5,
    bug: 0.5,
    steel: 0.5,
    grass: 0.5,
    psychic: 0.5,
    ice: 0.5,
    dragon: 0.5,
    fairy: 0.5,
    poison: 0,
  },
  fire: {
    water: 2,
    rock: 2,
    ground: 2,
    bug: 0.5,
    steel: 0.5,
    fire: 0.5,
    grass: 0.5,
    ice: 0.5,
    fairy: 0.5,
  },
  water: { electric: 2, grass: 2, steel: 0.5, fire: 0.5, water: 0.5, ice: 0.5 },
  grass: {
    flying: 2,
    poison: 2,
    bug: 2,
    fire: 2,
    ice: 2,
    ground: 0.5,
    water: 0.5,
    grass: 0.5,
    electric: 0.5,
  },

  electric: { ground: 2, flying: 0.5, steel: 0.5, electric: 0.5 },
  psychic: { bug: 2, ghost: 2, dark: 2, fighting: 0.5, psychic: 0.5 },
  dragon: {
    ice: 2,
    dragon: 2,
    fairy: 2,
    fire: 0.5,
    water: 0.5,
    grass: 0.5,
    electric: 0.5,
  },
  ice: { fighting: 2, rock: 2, steel: 2, fire: 2, ice: 0.5 },

  dark: { fighting: 2, bug: 2, fairy: 2, ghost: 0.5, dark: 0.5, psychic: 0 },
  fairy: { poison: 2, steel: 2, fighting: 0.5, bug: 0.5, dark: 0.5, dragon: 0 },
};

function updateWeaknesses() {
  let selectedTypes = [];
  let weaknesses = {};

  for (const type in typeWeaknesses) {
    weaknesses[type] = 1;

    const checkbox = document.getElementById(type);

    if (checkbox.checked) {
      selectedTypes.push(type);
    }
  }

  for (const key of selectedTypes) {
    for (const [type, value] of Object.entries(typeWeaknesses[key])) {
      weaknesses[type] *= value;
    }
  }

  for (const [type, value] of Object.entries(weaknesses)) {
    const div = document.getElementById(type + "-weakness");
    div.textContent = value + "x";
  }
}

updateWeaknesses();
