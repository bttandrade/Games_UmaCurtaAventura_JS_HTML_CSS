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
const invBtn = document.getElementById('invBtn');

const hero = {
    level: 1,
    health: 100,
    maxHealth: 100,
    stamina: 0,
    maxStamina: 100,
    xp: 0,
    gold: 150,
    daysPlaying: 2,
    atualArmor: 'couro',
    nextLevel: 100,
    damage: 10,
    dodgeBuff: false,
}

function template() {};

const locationMap = [
    {
        location: "arredores de A",
        objective: 'Destrua o covil de goblins',
        places: [
            {
                name: 'vila numero 1',
                buttons: [
                    { btntxt: 'Ir ao covil', btnfunc: moveToCovil },
                    { btntxt: 'Treinar', btnfunc: training },
                    { btntxt: 'Descansar', btnfunc: recover },
                    { btntxt: 'Visitar a loja', btnfunc: moveToShop },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                ],
            },
            {
                name: 'Entrada do covil de goblins',
                buttons: [
                    { btntxt: 'Entrar covil', btnfunc: covilFight },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageA },
                ],
            },
            {
                name: 'loja de suprimentos',
                buttons: [
                    { btntxt: 'Comprar poção', btnfunc: buyPotion },
                    { btntxt: 'Vender poção', btnfunc: sellPotion },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageA },
                ]
            },
            {
                name: 'Covil dos Goblins',
                buttons: [
                    { btntxt: 'Continuar', btnfunc: fightingCovil },
                    { btntxt: 'Usar poção', btnfunc: usePotion },
                    { btntxt: '. . .', btnfunc: dodge },
                    { btntxt: '. . .', btnfunc: usePotion },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Sair', btnfunc: moveToCovil },
                ]
            },
            {
                name: 'combate',
                buttons: [
                    { btntxt: 'Atacar', btnfunc: atack },
                    { btntxt: 'Esquivar', btnfunc: dodge },
                    { btntxt: 'Usar poção', btnfunc: usePotion },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Fugir', btnfunc: flee },
                ]
            },
        ]
    },
    {
        location: "arredores de B",
        objective: 'Destrua o acampamento orc',
        places: [
            {
                name: 'vila numero 2',
                buttons: [
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                ],
            },
        ]
    },
];

//  let currentLocation = 0;

const btns = document.getElementsByClassName('btn');

// advance.addEventListener('click', () => {
//     prologue.style.display = 'none';
//     //alert('funciona');
//     startGame();
//     updtHeroStats();
// });

startGame();
updtHeroStats();

function startGame() {
    moveToVillageA();
    updtHeroStats();
}

function moveToVillageA() {
    updateLocation(0, 0);
}

function moveToCovil() {
    updateLocation(0, 1);
}

function moveToShop() {
    updateLocation(0, 2);
}

function updateLocation(location, place) {
    //description.innerText = `Você esta em: ${locationMap[location].name}.`
    description.innerText = '';
    setTxt(location, place);
    changeButtons(location, place);
}

function setTxt (currentLocation, currentPlace) {
    nameLocation.innerText = locationMap[currentLocation].location;
    currentObjctive.innerText = locationMap[currentLocation].objective;
    //changeButtons(currentPlace, currentPlace);
}

function changeButtons(currentLocation, currentPlace) {
    for (let i = 0; i < 6; i++) {
        btns[i].textContent = locationMap[currentLocation].places[currentPlace].buttons[i].btntxt;
        console.log(btns[i].textContent = locationMap[currentLocation].places[currentPlace].buttons[i].btntxt);
        btns[i].onclick = locationMap[currentLocation].places[currentPlace].buttons[i].btnfunc;
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
        hero.xp += 20;
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
        hero.damage = 10 * hero.level 
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
        if (hero.health > 50) {
            hero.health = 100;
        } else {
            hero.health += 50;
        }
        currentDay.innerText = `${hero.daysPlaying++} days`;
        updtHeroStats();
    }
}

const inventory = {
    poção: 2,
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

invBtn.onclick = seeInventory;

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

let dungeon;
let currentMonsterFight;
let currentMonsterLife;
let goblinsKilled;

function covilFight() {
    goblinsKilled = 0;
    updateLocation(0, 3);
    dungeon = 0;
}

function fightingCovil() {
    if (goblinsKilled > 10) {
        currentMonsterFight = 1;
        fighting();
    } else {
        currentMonsterFight = 0;
        fighting();
    }
}

function fighting() {
    currentMonsterLife = monsters[currentMonsterFight].vida;
    if (hero.stamina <= 80) {
        hero.stamina += 10 - hero.level;
        updtHeroStats();
        startCombat();
    } else {
        description.innerHTML = "<br>Voce esta muito cansado";
    }
}

function startCombat() {
    console.log(hero.damage);
    if (currentMonsterLife <= 0) {
        updateLocation(0, 3);
        description.innerHTML = 'Voce derrotou um ' + monsters[currentMonsterFight].name + '.';
        if (currentMonsterFight == 1) {
            alert('Voce terminou a parte 1');
            window.location.href = '/./index.html';
        }
        goblinsKilled++;
        console.log(goblinsKilled);
        hero.xp += 30;
        lookForLevelUp();
    } else {
        updateLocation(0, 4);
        description.innerHTML = 'Voce esta enfrentando um ' + monsters[currentMonsterFight].name + '.';
        addMonster();
    }
}

function atack() {
    if (hero.dodgeBuff) {
        currentMonsterLife -= hero.damage*2;
        hero.dodgeBuff = false;
    } else {
        currentMonsterLife -= hero.damage;
    }
    if (currentMonsterLife > 0) {
        monsterAtk();
        description.innerHTML += `<br>Voce recebeu ${monsters[currentMonsterFight].atk} de dano`;
    }
    startCombat();
}

function usePotion() {
    if (inventory.poção <= 0) {
        description.innerHTML += '<br>Voce nao possui poções'
    } else {
        inventory.poção--;
        hero.health >= 70 ? hero.health = 100 : hero.health += 30;
        updtHeroStats();
    }
}

function dodge() {
    let random = Math.floor(Math.random() * 2);
    //console.log(random);
    if (random === 0) {
        monsterAtk();
    } else {
        hero.dodgeBuff = true;
        description.innerHTML += `<br>Voce esquivou e seu proximo atk sera critico`;
    }
}

function flee() {
    let random = Math.floor(Math.random() * 2);
    if (random === 0) {
        updateLocation(0, 3);
    } else {
        monsterAtk();
        description.innerHTML += `<br>Voce recebeu ${monsters[currentMonsterFight].atk} de dano`;
    }
}

function gameOver() {
    alert('derrota');
}

function addMonster() {
    description.innerHTML += `<br>Vida: ${currentMonsterLife}.` 
}

function monsterAtk() {
    hero.health -= monsters[currentMonsterFight].atk;
    updtHeroStats();
    if (hero.health <= 0) {
        alert('derrota');
        window.location.href = '/./index.html'
    }
}