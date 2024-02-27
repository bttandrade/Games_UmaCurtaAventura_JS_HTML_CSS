const advance = document.getElementById('advance');
const prologue = document.getElementById('prologue');

const nameLocation = document.getElementById('location');
const currentDay = document.getElementById('days');
const currentObjctive = document.getElementById('mission');
const description = document.getElementById('description');

const levelTxt = document.getElementById('lvl');
const healthTxt = document.getElementById('health');
const staminaTxt = document.getElementById('stamina');
const goldTxt = document.getElementById('gold');

const hero = {
    level: 1,
    health: 100,
    maxHealth: 100,
    stamina: 0,
    maxStamina: 100,
    xp: 0,
    gold: 50,
    daysPlaying: 2,
    atualArmor: 'couro',
    nextLevel: 100,
}

function template() {};

const locationMap = [
    {
        name: 'vila numero 1',
        objective: 'Destrua o covil de goblins',
        buttons: [
            { btntxt: 'Ir ao covil', btnfunc: moveToCovil },
            { btntxt: 'Treinar', btnfunc: training },
            { btntxt: 'Descansar', btnfunc: recover },
            { btntxt: 'Visitar a loja', btnfunc: moveToShop },
            { btntxt: 'Ver o inventario', btnfunc: seeInventory },
            { btntxt: 'Ir a taverna', btnfunc: template },
        ],
    },
    {
        name: 'Entrada do covil de goblins',
        objective: 'Destrua o covil de goblins',
        buttons: [
            { btntxt: 'Entrar covil', btnfunc: template },
            { btntxt: 'Examinar', btnfunc: template },
            { btntxt: '. . .', btnfunc: template },
            { btntxt: '. . .', btnfunc: template },
            { btntxt: '. . .', btnfunc: template },
            { btntxt: 'Voltar', btnfunc: moveToVillageA },
        ],
    },
    {
        name: 'loja de suprimentos',
        objective: 'Destrua o covil de goblins',
        buttons: [
            { btntxt: 'Comprar poção', btnfunc: buyPotion },
            { btntxt: 'Vender poção', btnfunc: sellPotion },
            { btntxt: 'Comprar treino de espada 2', btnfunc: template },
            { btntxt: '. . .', btnfunc: template },
            { btntxt: '. . .', btnfunc: template },
            { btntxt: 'Voltar', btnfunc: moveToVillageA },
        ]
    },
    {
        name: 'Covil dos Goblins',
        objective: 'Destrua o covil de goblins',
        buttons: [
            { btntxt: 'Continuar', btnfunc: startCombat },
            { btntxt: 'Usar poção', btnfunc: usePotion },
            { btntxt: '. . .', btnfunc: dodge },
            { btntxt: '. . .', btnfunc: usePotion },
            { btntxt: '. . .', btnfunc: template },
            { btntxt: 'Sair', btnfunc: flee },
        ]
    },
    {
        name: 'combate',
        objective: 'Destrua o covil de goblins',
        buttons: [
            { btntxt: 'Atacar', btnfunc: ataque },
            { btntxt: 'Defender', btnfunc: defense },
            { btntxt: 'Esquivar', btnfunc: dodge },
            { btntxt: 'Usar poção', btnfunc: usePotion },
            { btntxt: '. . .', btnfunc: template },
            { btntxt: 'Fugir', btnfunc: flee },
        ]
    },
];

let currentLocation = 0;

const btns = document.getElementsByClassName('btn');

advance.addEventListener('click', () => {
    prologue.style.display = 'none';
    //alert('funciona');
    startGame();
    updtHeroStats();
});

function startGame() {
    moveToVillageA();
    updtHeroStats();
}

function moveToVillageA() {
    updateLocation(0);
}

function moveToCovil() {
    updateLocation(1);
}

function moveToShop() {
    updateLocation(2);
}

function updateLocation(location) {
    description.innerText = `Você esta em: ${locationMap[location].name}.`
    setTxt(location);
    changeButtons(location);
}

function setTxt (currentLocation) {
    nameLocation.innerText = locationMap[currentLocation].name;
    currentObjctive.innerText = locationMap[currentLocation].objective;
    changeButtons(currentLocation);
}

function changeButtons(currentLocation) {
    for (let i = 0; i < 6; i++) {
        btns[i].textContent = locationMap[currentLocation].buttons[i].btntxt;
        btns[i].onclick = locationMap[currentLocation].buttons[i].btnfunc;
    }
}

function updtHeroStats() {
    levelTxt.innerText = `Level: ${hero.level}`;
    healthTxt.innerText = `Vida: ${hero.health}/${hero.maxHealth}`;
    staminaTxt.innerText = `Cansaço: ${hero.stamina}/${hero.maxStamina}`;
    goldTxt.innerText = `Ouro: ${hero.gold}`;
}

function training() {
    if (hero.stamina + 30 >= 100) {
        description.innerHTML += '<br>Você esta cansado demais.';
    } else {
        hero.stamina += 30;
        hero.xp += 50;
        description.innerHTML += '<br>Você ganhou 50xp.';
        lookForLevelUp()
    }
}

function lookForLevelUp() {
    if (hero.xp >= hero.nextLevel) {
        hero.level++;
        hero.xp = 0;
        hero.nextLevel += 50;
        description.innerHTML += '<br>Você ganhou 1 level.'
        updtHeroStats();
    } else {
        updtHeroStats();
    }
}

function recover() {
    if (hero.stamina <= 0) {
        description.innerHTML += '<br>Você não esta cansado.';
    } else {
        description.innerHTML += '<br>Você decide dormir por hoje.';
        hero.stamina = 0;
        currentDay.innerText = `${hero.daysPlaying++} days`;
        updtHeroStats();
    }
}

const inventory = {
    poção: 0,
    armaduras: [
        {
            name: 'couro',
            def: 10,
        }
    ],
    livros: [ 
        'treino de espada',
        'treino de arco',
    ]
}

function showInventory() {
    return '<br>' + inventory.poção + ' poções.' + 
    '<br>Esta usando armadura de ' + hero.atualArmor +
    '<br>Livros: ' + inventory.livros;
}

function seeInventory() {
    description.innerHTML += '<br>Você possui:' + showInventory();
}

function buyPotion() {
    if (hero.gold < 50) {
        description.innerHTML += '<br>Voce nao tem dinheiro suficiente.'
    } else {
        hero.gold -= 50;
        inventory.poção++;
        description.innerHTML += '<br>Voce comprou uma poção.'
        updtHeroStats();
    }
}

function sellPotion() {
    if (inventory.poção <= 0) {
        description.innerHTML += '<br>Voce nao tem poções para vender.'
    } else {
        hero.gold += 50;
        inventory.poção--;
        description.innerHTML += '<br>Voce vendeu uma poção.'
        updtHeroStats();
    }
}

const monsters = [
    {
        name: 'goblin',
        atk: 10,
        vida: 30,
    },
    {
        name: 'goblin boss',
        atk: 40,
        vida: 100,
    },
];

function startCombat() {
    description.innerHTML = 'Voce esta enfrentano um ' + monsters[enemy].name + '.';
    updateLocation(3);
}

function ataque() {

}

function defense() {

}

function usePotion() {
    if (inventory.poção <= 0) {
        description.innerHTML = '<br>Voce nao possui poções'
    } else {
        inventory.poção--;
        hero.health >= 70 ? hero.health = 100 : hero.health + 30;
        updtHeroStats();
    }
}

function dodge() {

}

function flee() {

}