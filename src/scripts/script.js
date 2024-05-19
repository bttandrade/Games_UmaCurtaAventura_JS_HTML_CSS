const advance = document.getElementById('advance');
const prologue = document.getElementById('prologue');
const text = document.getElementById('text');

const nameLocation = document.getElementById('location');
const currentDay = document.getElementById('days');
const currentObjctive = document.getElementById('mission');
const description = document.getElementById('description');
const btns = document.getElementsByClassName('btn');

const levelTxt = document.getElementById('lvl');
const healthTxt = document.getElementById('health');
const staminaTxt = document.getElementById('stamina');
const goldTxt = document.getElementById('gold');
const invBtn = document.getElementById('invBtn');

function template() {};

const hero = {
    level: 1,
    health: 100,
    maxHealth: 100,
    stamina: 0,
    maxStamina: 100,
    xp: 0,
    nextLevel: 100,
    gold: 150,
    daysPlaying: 1,
    armor: 'Roupa de Couro (def: 2)',
    def: 2,
    damage: 4,
    bow: false,
    arrowDmg: 30,
    chanceToShoot: 4,
    dodgeBuff: false,
    dodgeChance: 3,
    protection: false,
}

const locationMap = [
    {
        location: "Floresta",
        objective: 'Missão: Destrua o covil dos Lobos',
        places: [
            {
                name: 'Vila próxima a Floresta.',
                buttons: [
                    { btntxt: 'Ir a entrada do covil', btnfunc: moveToCovil },
                    { btntxt: 'Treinar', btnfunc: training },
                    { btntxt: 'Dormir', btnfunc: recover },
                    { btntxt: 'Ir a loja', btnfunc: moveToShopA },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Ir a taverna', btnfunc: moveToTavernA },
                ],
            },
            {
                name: 'Entrada do covil.',
                buttons: [
                    { btntxt: 'Entrar no covil', btnfunc: covilFight },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageA },
                ],
            },
            {
                name: 'Loja de Suprimentos.',
                buttons: [
                    { btntxt: 'Comprar poção', btnfunc: buyPotion },
                    { btntxt: 'Vender poção', btnfunc: sellPotion },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Comprar Livro Sobre Espada II', btnfunc: buyBookSword2 },
                    { btntxt: 'Voltar', btnfunc: moveToVillageA },
                ]
            },
            {
                name: 'Covil dos lobos selvagens.',
                buttons: [
                    { btntxt: 'Continuar', btnfunc: fightingCovil },
                    { btntxt: 'Usar poção', btnfunc: usePotion },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Sair', btnfunc: moveToCovil },
                ]
            },
            {
                name: 'Em combate.',
                buttons: [
                    { btntxt: 'Atacar', btnfunc: attack },
                    { btntxt: 'Usar poção', btnfunc: usePotion },
                    { btntxt: 'Esquivar', btnfunc: dodge },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Fugir', btnfunc: flee },
                ]
            },
            {
                name: '',
                buttons: [
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                ]
            },
            {
                name: 'Taverna',
                buttons: [
                    { btntxt: 'Pedir cerveja', btnfunc: buyBeer },
                    { btntxt: 'Escutar conversas', btnfunc: listenTavernA },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageA },
                ]
            },
            {
                name: 'Fundo do covil.',
                buttons: [
                    { btntxt: 'Enfrentar o Lobo Selvagem Gigante', btnfunc: fighting },
                    { btntxt: 'Usar poção', btnfunc: usePotion },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageA },
                ]
            },
            {
                name: 'Vila próxima a Floresta.',
                buttons: [
                    { btntxt: 'Dormir no relento', btnfunc: recover },
                    { btntxt: 'Pagar um quarto', btnfunc: recoverHeal },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageA },
                ],
            },
        ]
    },
    {
        location: "Montanha",
        objective: 'Missão: Mate todos os Trolls 0/4',
        places: [
            {
                name: 'Vila próxima a Montanha.',
                buttons: [
                    { btntxt: 'Explorar os arredores', btnfunc: exploreMontain },
                    { btntxt: 'Treinar', btnfunc: training },
                    { btntxt: 'Dormir', btnfunc: recover },
                    { btntxt: 'Ir a loja', btnfunc: moveToShopB },
                    { btntxt: 'Ir ao ferreiro', btnfunc: moveToSmithB },
                    { btntxt: 'Ir a taverna', btnfunc: moveToTavernB },
                ],
            },
            {
                name: 'Loja de Suprimentos.',
                buttons: [
                    { btntxt: 'Comprar poção', btnfunc: buyPotion },
                    { btntxt: 'Vender poção', btnfunc: sellPotion },
                    { btntxt: 'Comprar Arco e Flechas', btnfunc: buyBow },
                    { btntxt: 'Comprar Livro Sobre Espada III', btnfunc: buyBookSword3 },
                    { btntxt: 'Comprar Livro Sobre Arco I', btnfunc: buyBookBow1 },
                    { btntxt: 'Voltar', btnfunc: moveToVillageB },
                ]
            },
            {
                name: 'Taverna',
                buttons: [
                    { btntxt: 'Pedir cerveja', btnfunc: buyBeer },
                    { btntxt: 'Escutar conversas', btnfunc: listenTavernB },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageB },
                ]
            },
            {
                name: 'Arredores da Montanha.',
                buttons: [
                    { btntxt: 'Explorar', btnfunc: fightingMontain },
                    { btntxt: 'Usar poção', btnfunc: usePotion },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageB },
                ],
            },
            {
                name: 'Em combate.',
                buttons: [
                    { btntxt: 'Atacar', btnfunc: attack },
                    { btntxt: 'Usar poção', btnfunc: usePotion },
                    { btntxt: 'Esquivar', btnfunc: dodge },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Fugir', btnfunc: flee },
                ]
            },
            {
                name: '',
                buttons: [
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                ]
            },
            {
                name: 'Ferreiro',
                buttons: [
                    { btntxt: 'Armadura de Ferro', btnfunc: buyArmor1 },
                    { btntxt: 'Armadura de Ferro Completa', btnfunc: buyArmor2 },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageB },
                ]
            },
            {
                name: 'Vila próxima a Montanha.',
                buttons: [
                    { btntxt: 'Dormir no relento', btnfunc: recover },
                    { btntxt: 'Pagar um quarto', btnfunc: recoverHeal },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageA },
                ],
            },
        ]
    },
    {
        location: "Tumba",
        objective: 'Missão: Mate o Bruxo',
        places: [
            {
                name: 'Vila próxima a Tumba.',
                buttons: [
                    { btntxt: 'Ir a entrada da tumba', btnfunc: moveToTumb },
                    { btntxt: 'Treinar', btnfunc: training },
                    { btntxt: 'Dormir', btnfunc: recover },
                    { btntxt: 'Ir a loja', btnfunc: moveToShopC },
                    { btntxt: 'Ir ao ferreiro', btnfunc: moveToSmithC },
                    { btntxt: 'Ir a taverna', btnfunc: moveToTavernC },
                ],
            },
            {
                name: 'Loja de Suprimentos.',
                buttons: [
                    { btntxt: 'Comprar poção', btnfunc: buyPotion },
                    { btntxt: 'Vender poção', btnfunc: sellPotion },
                    { btntxt: 'Comprar Livro Sobre Espada IV', btnfunc: buyBookSword4 },
                    { btntxt: 'Comprar Livro Sobre Arco II', btnfunc: buyBookBow2 },
                    { btntxt: 'Comprar Livro Sobre Esquiva I', btnfunc: buyBookDodge },
                    { btntxt: 'Voltar', btnfunc: moveToVillageC },
                ]
            },
            {
                name: 'Taverna',
                buttons: [
                    { btntxt: 'Pedir cerveja', btnfunc: buyBeer },
                    { btntxt: 'Escutar conversas', btnfunc: listenTavernC },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageC },
                ]
            },
            {
                name: 'Tumba',
                buttons: [
                    { btntxt: 'Continuar', btnfunc: exploreTumb },
                    { btntxt: 'Usar poção', btnfunc: usePotion },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageC },
                ]
            },
            {
                name: 'Em combate.',
                buttons: [
                    { btntxt: 'Atacar', btnfunc: attack },
                    { btntxt: 'Usar poção', btnfunc: usePotion },
                    { btntxt: 'Esquivar', btnfunc: dodge },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Fugir', btnfunc: flee },
                ]
            },
            {
                name: '',
                buttons: [
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                ]
            },
            {
                name: 'Ferreiro',
                buttons: [
                    { btntxt: 'Armadura de Platina', btnfunc: buyArmor3 },
                    { btntxt: 'Armadura de Platina Completa', btnfunc: buyArmor4 },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageC },
                ]
            },
            {
                name: 'Entrada da Tumba.',
                buttons: [
                    { btntxt: 'Entrar', btnfunc: exploreTumb },
                    { btntxt: 'Usar poção', btnfunc: usePotion },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageC },
                ],
            },
            {
                name: 'Tumba',
                buttons: [
                    { btntxt: 'Esquerda', btnfunc: moveLeft },
                    { btntxt: 'Usar poção', btnfunc: usePotion },
                    { btntxt: 'Direita', btnfunc: moveRight },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageC },
                ]
            },
            {
                name: 'Tumba',
                buttons: [
                    { btntxt: 'Destruir altar', btnfunc: destroyAltar },
                    { btntxt: 'Pegar livro', btnfunc: getBook },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageC },
                ]
            },
            {
                name: 'Entrada do Grande Salão',
                buttons: [
                    { btntxt: 'Enfrentar o Bruxo', btnfunc: tumbBoss },
                    { btntxt: 'Usar poção', btnfunc: usePotion },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageC },
                ]
            },
            {
                name: 'Beco Sem Saída',
                buttons: [
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageC },
                ]
            },
            {
                name: 'Vila próxima a Tumba.',
                buttons: [
                    { btntxt: 'Dormir no relento', btnfunc: recover },
                    { btntxt: 'Pagar um quarto', btnfunc: recoverHeal },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageA },
                ],
            },
        ]
    },
];

const inventory = {
    poção: 2,
    livros: [ 
        'Livro Sobre Espada I',
    ]
}

const monsters = [
    {
        name: 'Lobo Selvagem',
        atk: 5,
        vida: 40,
        xp: 18,
        gold: 13,
    },
    {
        name: 'Lobo Selvagem Gigante',
        atk: 20,
        vida: 150,
        xp: 58,
        gold: 78,
    },
    {
        name: 'Goblin',
        atk: 12,
        vida: 60,
        xp: 28,
        gold: 23,
    },
    {
        name: 'Orc',
        atk: 20,
        vida: 100,
        xp: 48,
        gold: 38,
    },
    {
        name: 'Troll',
        atk: 38,
        vida: 260,
        xp: 148,
        gold: 98,
    },
    {
        name: 'Esqueleto Guerreiro',
        atk: 23,
        vida: 130,
        xp: 62,
        gold: 57,
    },
    {
        name: 'Esqueleto Arqueiro',
        atk: 32,
        vida: 90,
        xp: 74,
        gold: 78,
    },
    {
        name: 'Bruxo',
        atk: 72,
        vida: 600,
        xp: 500,
        gold: 500,
    },
    {
        name: 'Bruxo Enfraquecido',
        atk: 48,
        vida: 300,
        xp: 500,
        gold: 500,
    },
];

let currentLocation;
let currentMonsterFight;
let currentMonsterLife;
let wolfKilled = 0;
let trollsKilled = 0;
let moveCount = 0;
let right = false;
let left = false;

invBtn.onclick = seeInventory;
advance.onclick = startGame;

// GLOBAL
function updtHeroStats() {
    levelTxt.innerText = hero.level;
    healthTxt.innerText = `${hero.health}/${hero.maxHealth}`;
    staminaTxt.innerText = `${hero.stamina}/${hero.maxStamina}`;
    goldTxt.innerText = `${hero.gold}g`;
}

function resetTxt() {
    description.innerHTML = "";
}

function updateLocation(location, place) {
    description.innerText += `Você está em: ${locationMap[location].places[place].name}`
    //description.innerText = '';
    setTxt(location, place);
    changeButtons(location, place);
}

function setTxt (currentLocation) {
    nameLocation.innerText = locationMap[currentLocation].location;
    currentDay.innerText = `- Dia ${hero.daysPlaying}`;
    currentObjctive.innerText = locationMap[currentLocation].objective;
    //changeButtons(currentPlace, currentPlace);
}

function changeButtons(currentLocation, currentPlace) {
    for (let i = 0; i < 6; i++) {
        btns[i].textContent = locationMap[currentLocation].places[currentPlace].buttons[i].btntxt;
        btns[i].onclick = locationMap[currentLocation].places[currentPlace].buttons[i].btnfunc;
    }
}

function training() {
    let getXp = 20 - hero.level * 2;
    if (hero.stamina + 30 >= hero.maxStamina) {
        description.innerHTML += '<br>Você está cansado demais.';
    } else if (hero.level >= 10) {
        description.innerHTML += '<br>Você não consegue mais evoluir apenas treinando.';
    } else {
        hero.stamina += 30;
        hero.xp += getXp;
        description.innerHTML += `<br>Você ganhou ${getXp} de xp.`;
        lookForLevelUp()
    }
}

function lookForLevelUp() {
    if (hero.xp >= hero.nextLevel) {
        hero.level++;
        hero.xp = 0;
        hero.nextLevel += 50;
        description.innerHTML += '<br>Você ganhou 1 level.';
        hero.damage += 5;
        hero.arrowDmg += 5;
        hero.maxHealth += 10;
        hero.maxStamina += 5;
        updtHeroStats();
    } else {
        updtHeroStats();
    }
}

function sleep() {
    resetTxt();
    description.innerHTML += '<br>Você procura um lugar para dormir.';
    if (currentLocation == 0) {
        updateLocation(0, 8);
    } else if (currentLocation == 1) {
        updateLocation(1, 7);
    } else {
        updateLocation(2, 12);
    }
}

function recover() {
    if (hero.stamina <= 0) {
        description.innerHTML += '<br>Você não esta cansado.';
    } else {
        description.innerHTML += '<br>Você decide dormir no relento por hoje.';
        hero.stamina = 0;
        hero.daysPlaying++;
        currentDay.innerText = `- Dia ${hero.daysPlaying}`;
        updtHeroStats();
    }
}

function recoverHeal() {
    if (hero.stamina <= 0) {
        description.innerHTML += '<br>Você não esta cansado.';
    } else if (hero.gold < 50) {
        description.innerHTML += '<br>Você não tem ouro suficiente.';
    } else {
        description.innerHTML += '<br>Você decide pagar um quarto e dormir por hoje.';
        hero.stamina = 0;
        if (hero.health + 70 >= hero.maxHealth) {
            hero.health = hero.maxHealth;
        } else {
            hero.health += 70;
        }
        hero.gold -= 50;
        hero.daysPlaying++;
        currentDay.innerText = `- Dia ${hero.daysPlaying}`;
        updtHeroStats();
    }
}

function getRandNumb() {
    let random = Math.floor(Math.random() * 10); 
    return random;
}

// VILLAGE A
function moveToVillageA() {
    resetTxt();
    updateLocation(0, 0);
    currentLocation = 0;
}

function moveToCovil() {
    resetTxt();
    updateLocation(0, 1);
}

function moveToShopA() {
    resetTxt();
    updateLocation(0, 2);
    description.innerHTML += '<br>Você olha a loja e vê:<br>Um estoque de Poções.'
    lookForStuff(0);
}

function moveToTavernA() {
    resetTxt();
    updateLocation(0, 6);
}

function covilFight() {
    wolfKilled = 0;
    resetTxt();
    updateLocation(0, 3);
}

function covilBoss() {
    resetTxt();
    updateLocation(0, 7);
    description.innerHTML += '<br>Você chegou no fundo do Covil e sente' +
    ' uma presença poderosa mais a frente.';
}

function fightingCovil() {
    if (wolfKilled > 4) {
        currentMonsterFight = 1;
        covilBoss();
    } else {
        currentMonsterFight = 0;
        fighting();
    }
}

// VILLAGE B
function moveToVillageB() {
    resetTxt();
    updateLocation(1, 0);
    currentLocation = 1;
}

function exploreMontain() {
    resetTxt();
    updateLocation(1, 3);
}

function moveToShopB() {
    resetTxt();
    updateLocation(1, 1);
    description.innerHTML += '<br>Você olha a loja e vê:<br>Um estoque de Poções.';
    lookForStuff(1);
}

function moveToSmithB() {
    resetTxt();
    updateLocation(1, 6);
    lookForArmor();
    if (hero.armor.includes('8')) {
        description.innerHTML += '<br>Você não vê armaduras melhores.';
    } else {
        description.innerHTML += '<br>Você vê uma variedade de armaduras a venda.';
    }
}

function moveToTavernB() {
    resetTxt();
    updateLocation(1, 2);
}

function fightingMontain() {
    let random = Math.floor(Math.random() * 7);
    if (random == 0) {
        currentMonsterFight = 4
        fighting();
    } else if (random > 0 && random < 3) {
        currentMonsterFight = 2
        fighting();
    } else {
        currentMonsterFight = 3
        fighting();
    }
}

// VILLAGE C
function moveToVillageC() {
    resetTxt();
    updateLocation(2, 0);
    currentLocation = 2;
    left = false;
    right = false;
    moveCount = 0;
}

function moveToShopC() {
    resetTxt();
    updateLocation(2, 1);
    description.innerHTML += '<br>Você olha a loja e vê:<br>Um estoque de Poções.';
    lookForStuff(2);
}

function moveToSmithC() {
    resetTxt();
    updateLocation(2, 6);
    lookForArmor();
    if (hero.armor.includes('14')) {
        description.innerHTML += '<br>Você não vê armaduras melhores.';
    } else {
        description.innerHTML += '<br>Você vê uma variedade de armaduras a venda.';
    }
}

function moveToTavernC() {
    resetTxt();
    updateLocation(2, 2);
}

function moveToTumb() {
    resetTxt();
    updateLocation(2, 7);
}

function startTumb() {
    moveCount++;
    resetTxt();
    updateLocation(2, 3);
}

function exploreTumb() {
    if (moveCount == 4) {
        resetTxt();
        updateLocation(2, 8);
        description.innerHTML += '<br>O caminho se divide a frente.';
    } else if (right && moveCount == 8) {
        resetTxt();
        updateLocation(2, 10);
    } else if (left && moveCount == 10) {
        left = false;
        resetTxt();
        updateLocation(2, 8);
        description.innerHTML += '<br>O caminho se divide a frente.';
    } else if (left && moveCount == 17) {
        resetTxt();
        updateLocation(2, 11);
    } else if (right && moveCount == 14) {
        resetTxt();
        updateLocation(2, 9);
        if (hero.protection) {
            btns[0].textContent = '. . .';
            btns[0].onclick = template;
        }
        if (inventory.livros.indexOf('Livro Sobre Esquiva II') != -1) {
            btns[1].textContent = '. . .';
            btns[1].onclick = template;
        }
    } else {
        let random = Math.floor(Math.random() * 3);
        if (random == 0) {
            moveCount++
            fightingTumb();
        } else {
            startTumb();
            description.innerHTML += '<br>Você decide ir em frente.';
        }
    }
}

function moveLeft() {
    left = true;
    startTumb();
    description.innerHTML += '<br>Você decide virar a esquerda.';
}

function moveRight() {
    right = true;
    startTumb();
    description.innerHTML += '<br>Você decide virar a direita.';
}

function getBook() {
    inventory.livros.push('Livro Sobre Esquiva II');
    hero.dodgeChance--;
    btns[1].textContent = '. . .';
    btns[1].onclick = template;
    description.innerHTML += '<br>Você pegou o Livro Sobre Esquiva II.<br>Ficou mais fácil esquivar.'
    updtHeroStats();
}

function destroyAltar() {
    hero.protection = true;
    btns[0].textContent = '. . .';
    btns[0].onclick = template;
    description.innerHTML += '<br>Você destruiu o altar que fortalecia o Bruxo.'
}

function fightingTumb() {
    let random = Math.floor(Math.random() * 3);
    if (random == 0) {
        currentMonsterFight = 6;
        fighting();
    } else {
        currentMonsterFight = 5;
        fighting();
    }
}

function tumbBoss() {
    if (hero.protection) {
        currentMonsterFight = 8;
        fighting();
    } else {
        currentMonsterFight = 7;
        fighting();
    }
}

// SHOP
function buyPotion() {
    if (hero.gold < 50) {
        description.innerHTML += '<br>Você não tem ouro suficiente.'
    } else {
        hero.gold -= 50;
        inventory.poção++;
        description.innerHTML += '<br>Você comprou uma poção.'
        updtHeroStats();
    }
}

function sellPotion() {
    if (inventory.poção <= 0) {
        description.innerHTML += '<br>Você não tem poções para vender.'
    } else {
        hero.gold += 50;
        inventory.poção--;
        description.innerHTML += '<br>Você vendeu uma poção.'
        updtHeroStats();
    }
}

function lookForStuff(shop) {
    if (shop == 0) {
        if (inventory.livros.indexOf('Livro Sobre Espada II') != -1) {
            btns[4].textContent = '. . .';
            btns[4].onclick = template;
        } else {
            description.innerHTML += '<br>Livro Sobre Espada II.';
        }
    } else if(shop == 1) {
        if (hero.bow) {
            btns[2].textContent = '. . .';
            btns[2].onclick = template;
        } else {
            description.innerHTML += '<br>Arco com flechas.';
        }
        if (inventory.livros.indexOf('Livro Sobre Espada III') != -1) {
            btns[3].textContent = '. . .';
            btns[3].onclick = template;
        } else {
            description.innerHTML += '<br>Livro Sobre Espada III.';
        }
        if (inventory.livros.indexOf('Livro Sobre Arco I') != -1) {
            btns[4].textContent = '. . .';
            btns[4].onclick = template;
        } else {
            description.innerHTML += '<br>Livro Sobre Arco I.';
        }
    } else {
        if (inventory.livros.indexOf('Livro Sobre Espada IV') != -1) {
            btns[2].textContent = '. . .';
            btns[2].onclick = template;
        } else {
            description.innerHTML += '<br>Livro Sobre Espada IV.';
        }
        if (inventory.livros.indexOf('Livro Sobre Arco II') != -1) {
            btns[3].textContent = '. . .';
            btns[3].onclick = template;
        } else {
            description.innerHTML += '<br>Livro Sobre Arco II.';
        }
        if (inventory.livros.indexOf('Livro Sobre Esquiva I') != -1) {
            btns[4].textContent = '. . .';
            btns[4].onclick = template;
        } else {
            description.innerHTML += '<br>Livro Sobre Esquiva I.';
        }
    }
}

function buyBow() {
    if (hero.gold >= 100) {
        description.innerHTML += '<br>Você comprou um arco com flechas.';
        btns[2].textContent = '. . .';
        btns[2].onclick = template;
        hero.gold -= 100;
        hero.bow = true;
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.';
    }
}

function buyBook(name, button) {
    inventory.livros.push(name);
    if (name == 'Livro Sobre Esquiva I') {
        description.innerHTML += `<br>Você comprou o ${name}.<br>Ficou mais fácil esquivar.`
    } else {
        description.innerHTML += `<br>Você comprou o ${name}.<br>Seu dano aumentou.`
    }
    btns[button].textContent = '. . .';
    btns[button].onclick = template;
}

function buyBookSword2() {
    if (hero.gold >= 150) {
        buyBook('Livro Sobre Espada II', 4);
        hero.gold -= 150;
        hero.damage += 6;
        updtHeroStats();
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.';
    }
}

function buyBookSword3() {
    if (hero.gold >= 150) {
        buyBook('Livro Sobre Espada III', 3);
        hero.gold -= 150;
        hero.damage += 6;
        updtHeroStats();
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.';
    }
}

function buyBookSword4() {
    if (hero.gold >= 150) {
        buyBook('Livro Sobre Espada IV', 2);
        hero.gold -= 150;
        hero.damage += 6;
        updtHeroStats();
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.';
    }
}

function buyBookBow1() {
    if (hero.gold >= 150) {
        buyBook('Livro Sobre Arco I', 4);
        hero.gold -= 150;
        hero.arrowDmg += 6;
        hero.chanceToShoot--;
        updtHeroStats();
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.';
    }
}

function buyBookBow2() {
    if (hero.gold >= 150) {
        buyBook('Livro Sobre Arco II', 3);
        hero.gold -= 150;
        hero.arrowDmg += 6;
        hero.chanceToShoot--;
        updtHeroStats();
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.';
    }
}

function buyBookDodge() {
    if (hero.gold >= 150) {
        buyBook('Livro Sobre Esquiva I', 4);
        hero.gold -= 150;
        hero.dodgeChance--;
        updtHeroStats();
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.';
    }
}

// COMBAT
function fighting() {
    let staminaUsed = 20 - hero.level * 2 + (currentLocation * 2);
    staminaUsed < 0 ? staminaUsed = 0 : staminaUsed; 
    currentMonsterLife = monsters[currentMonsterFight].vida;
    if (hero.stamina <= hero.maxStamina - staminaUsed) {
        hero.stamina += staminaUsed;
        updtHeroStats();
        battle();
    } else {
        description.innerHTML += "<br>Você está muito cansado.";
    }
}

function battle() {
    if (currentMonsterLife <= 0) {
        let getGold = monsters[currentMonsterFight].gold + getRandNumb();
        let getXp = (monsters[currentMonsterFight].xp - hero.level*4) + getRandNumb();
        getXp < 0 ? getXp = 0 : getXp;
        if (currentMonsterFight == 1 || currentMonsterFight == 7 || currentMonsterFight == 8) {
            description.innerHTML += '<br>Você derrotou o ' + monsters[currentMonsterFight].name + '.';
            description.innerHTML += `<br>Você ganhou ${getXp} de xp e ${getGold} de ouro.`;
        } else {
            description.innerHTML += '<br>Você derrotou um ' + monsters[currentMonsterFight].name + '.';
            description.innerHTML += `<br>Você ganhou ${getXp} de xp e ${getGold} de ouro.`;
        }
        changeButtons(currentLocation, 5);
        setTimeout(() => {
            resetTxt();
            updateLocation(currentLocation, 3);
        }, 1500);
        hero.xp += getXp;
        hero.gold += getGold;
        lookForLevelUp();
        monsterDead(currentLocation);
    } else {
        updateLocation(currentLocation, 4);
        addBowButton(hero.bow);
        resetTxt();
        if (currentMonsterFight == 1 || currentMonsterFight == 7 || currentMonsterFight == 8) {
            description.innerHTML += 'Você está enfrentando o ' + monsters[currentMonsterFight].name + '.';
        } else {
            description.innerHTML += 'Você está enfrentando um ' + monsters[currentMonsterFight].name + '.';
        }
        addMonster();
    }
}

function attack() {
    let heroAtk = hero.damage + getRandNumb();
    if (hero.dodgeBuff) {
        description.innerHTML += `<br>Você causou ${heroAtk*2} de dano.`;
        currentMonsterLife -= heroAtk*2;
        hero.dodgeBuff = false;
    } else {
        description.innerHTML += `<br>Você causou ${heroAtk} de dano.`
        currentMonsterLife -= heroAtk;
    }
    if (currentMonsterLife > 0) {
        monsterTurn();
    } else {
        battle();
    }
}

function usePotion() {
    if (inventory.poção <= 0) {
        description.innerHTML += '<br>Você não possui poções.'
    } else {
        inventory.poção--;
        hero.health >= hero.maxHealth - 30 ? hero.health = hero.maxHealth : hero.health += 30;
        hero.health == hero.maxHealth ? description.innerHTML += '<br>Você ficou com a Vida cheia.' : description.innerHTML += '<br>Você recuperou 30 de Vida.';
        updtHeroStats();
    }
}

function dodge() {
    let random = Math.floor(Math.random() * hero.dodgeChance);
    console.log(random);
    if (random !== 0) {
        description.innerHTML += `<br>Você não consegue esquivar.`;
        monsterTurn();
    } else {
        hero.dodgeBuff = true;
        description.innerHTML += `<br>Você esquivou e seu próximo ataque será crítico.`;
    }
}

function addBowButton(bow) {
    if (bow) {
        btns[4].textContent = 'Atirar um flecha';
        btns[4].onclick = shoot;
    }
}

function shoot() {
    let heroAtk = hero.arrowDmg + getRandNumb();
    let random = Math.floor(Math.random() * hero.chanceToShoot);
    if (random == 0) {
        description.innerHTML += `<br>Você causou ${heroAtk} de dano.`
        currentMonsterLife -= heroAtk;
    } else {
        description.innerHTML += `<br>Você errou.`
    }
    if (currentMonsterLife > 0) {
        monsterTurn();
    } else {
        battle();
    }
}

function flee() {
    let random = Math.floor(Math.random() * 2);
    if (random === 0) {
        resetTxt();
        updateLocation(currentLocation, 3);
    } else {
        description.innerHTML += `<br>Você não consegue fugir.`;
        monsterTurn();
    }
}

function addMonster() {
    description.innerHTML += `<br><img src="../images/icon001.png" alt="life"> ${currentMonsterLife}` 
}

function monsterTurn() {
    let random = Math.floor(Math.random() * 4);
    random === 1 ? monsterSpecial() : monsterAtk();
}

function monsterSpecial() {
    let monsterDmg = monsters[currentMonsterFight].atk + getRandNumb() - hero.def - hero.level;
    monsterDmg < 0 ? monsterDmg = 0 : monsterDmg;
    changeButtons(0, 5);
    setTimeout(() => {
        description.innerHTML += `<br>${monsters[currentMonsterFight].name} lhe atinge na cabeça.`;
        description.innerHTML += `<br>Você recebeu ${monsterDmg*2} de dano.`;
        setTimeout(() => {
            hero.health -= monsterDmg*2;
                battle();
                updtHeroStats();
                if (hero.health <= 0) {
                    gameOver();
                }
            }, 1500);
    }, 1000);
}

function monsterAtk() {
    let monsterDmg = monsters[currentMonsterFight].atk + getRandNumb() - hero.def - hero.level;
    monsterDmg < 0 ? monsterDmg = 0 : monsterDmg;
    changeButtons(0, 5);
    setTimeout(() => {
        description.innerHTML += `<br>${monsters[currentMonsterFight].name.replace('um', '')} lhe ataca.`;
        description.innerHTML += `<br>Você recebeu ${monsterDmg} de dano.`;
        setTimeout(() => {
            hero.health -= monsterDmg;
                battle();
                updtHeroStats();
                if (hero.health <= 0) {
                    gameOver();
                }
            }, 1500);
    }, 1000);
}

function monsterDead(location) {
    setTimeout(() => {
        if (location == 0) {
            wolfKilled++;
            if (currentMonsterFight == 1) {
                wolfKilled = 0;
                hero.daysPlaying++;
                hero.stamina = 0;
                toSecondPart();
            }
        } else {
            if (currentMonsterFight == 4) {
                trollsKilled++;
                locationMap[1].objective = `Missão: Mate todos os Trolls ${trollsKilled}/4`;
                if (trollsKilled == 4) {
                    hero.daysPlaying++;
                    hero.stamina = 0;
                    toFinalPart();
                }
            } else if (currentMonsterFight == 7 || currentMonsterFight == 8) {
                end();
            }
        }
    }, 1000);
}

// SMITH
function lookForArmor() {
    if (hero.armor.includes('6') || hero.armor.includes('12')) {
        btns[0].textContent = '. . .';
        btns[0].onclick = template;
    } else if (hero.armor.includes('8') || hero.armor.includes('14')) {
        btns[0].textContent = '. . .';
        btns[0].onclick = template;
        btns[1].textContent = '. . .';
        btns[1].onclick = template;
    }
}

function buyArmor1() {
    if (hero.gold >= 200) {
        description.innerHTML += '<br>Você comprou uma Armadura de Ferro.'
        btns[0].textContent = '. . .';
        btns[0].onclick = template;
        hero.armor = 'Armadura de Ferro (def: 6)';
        hero.def = 6;
        hero.gold -= 200;
        updtHeroStats();
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.'
    }
}

function buyArmor2() {
    if (hero.gold >= 300) {
        description.innerHTML += '<br>Você comprou uma Armadura de Ferro Completa.'
        btns[0].textContent = '. . .';
        btns[0].onclick = template;
        btns[1].textContent = '. . .';
        btns[1].onclick = template;
        hero.armor = 'Armadura de Ferro Completa (def: 8)';
        hero.def = 8;
        hero.gold -= 300;
        updtHeroStats();
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.'
    }
}

function buyArmor3() {
    if (hero.gold >= 500) {
        description.innerHTML += '<br>Você comprou uma Armadura de Platina.'
        btns[0].textContent = '. . .';
        btns[0].onclick = template;
        hero.armor = 'Armadura de Platina (def: 12)';
        hero.def = 12;
        hero.gold -= 500;
        updtHeroStats();
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.'
    }
}

function buyArmor4() {
    if (hero.gold >= 600) {
        description.innerHTML += '<br>Você comprou uma Armadura de Platina Completa.'
        btns[0].textContent = '. . .';
        btns[0].onclick = template;
        btns[1].textContent = '. . .';
        btns[1].onclick = template;
        hero.armor = 'Armadura de Platina Completa (def: 14)';
        hero.def = 14;
        hero.gold -= 600;
        updtHeroStats();
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.'
    }
}

// TAVERN
function buyBeer() {
    if (hero.stamina > 0) {
        if (hero.gold >= 30) {
            description.innerHTML += '<br>Você comprou uma cerveja e se sente revigorado.'
            hero.gold -= 30;
            if (hero.stamina < 20) {
                hero.stamina = 0;
                updtHeroStats();
            } else {
                hero.stamina -= 20;
                updtHeroStats();
            }
        } else {
            description.innerHTML += '<br>Você não tem ouro suficiente.'
        }
    } else {
        description.innerHTML += '<br>Você não precisa relaxar.'
    }
}

function listenTavernA() {
    resetTxt();
    updateLocation(0, 6)
    let random = Math.floor(Math.random() * 3);
    if (random === 1) {
        description.innerHTML += '<br>Você começa a escutar algumas conversas.' +
        '<br>Homem A: ... que há um Lobo Selvagem Gigante no fundo do covil.' +
        '<br>Homem B: Também ouvi falar nisso, mas parece que para chegar a ele, ' +  
        'tem que derrotar vários lobos selvagens.' +
        '<br>Homem A: Quem seria louco de ir tão fundo.'
    } else {
        description.innerHTML += '<br>Você começa a escutar algumas conversas.' +
        '<br>Homem A: ... que um lobo selvagem matou duas ovelhas de meu vizinho.' +
        '<br>Homem B: Até quando vamos sofrer com essas pragas.'
    }
}

function listenTavernB() {
    resetTxt();
    updateLocation(1, 2)
    let random = Math.floor(Math.random() * 3);
    if (random === 1) {
        description.innerHTML += '<br>Homem A: ... quem iria explorar os arredores, se a qualquer ' +
        'momento um Troll pode aparecer?'
        '<br>Homem B: So contando com a sorte para não encontrá-los.';
    } else {
        description.innerHTML += '<br>Homem A: O inverno será bem difícil.' +
        '<br>Homem B: Claro, com Goblins e Orcs atacando nos arredores, como os suprimentos ' +
        'chegaram aqui.' +
        '<br>Homem A: Melhor começar a estocar agora.';
    }
}

function listenTavernC() {
    resetTxt();
    updateLocation(2, 2)
    let random = Math.floor(Math.random() * 3);
    if (random == 1) {
        description.innerHTML += '<br>Homem A:Ouviu os boatos sobre o Bruxo na Tumba?' +
        '<br>Homem B: Ouvi sim, também ouvi que há um altar dentro da tumba que fortalece qualquer ' +
        'um que consiga tomá-lo.' +
        '<br>Homem A: Caso o Bruxo tenha enfeitiçado o altar, ele ficará quase invencível.'
        '<br>Homem B: Prefiro nem imaginar isso.';
    } else {
        description.innerHTML += '<br>Homem A:... falar que um Bruxo tomou aquela velha Tumba?' +
        '<br>Homem B: Ouvi boatos, mas prefiro acreditar que não sejam verdade.';
    }
}

// INVENTORY
function showInventory() {
    if (inventory.poção === 1) {
        return `<br>${inventory.poção} Poção.${showBooks()}`
    } else {
        return `<br>${inventory.poção} Poções.${showBooks()}`;
    }
}

function showBooks() {
    let booksList = '';
    for (let i = 0; i < inventory.livros.length; i++) {
        booksList += `<br>${inventory.livros[i]}.`;
    }
    return booksList;
}

function seeInventory() {
    description.innerHTML += `<br>Você possui a Espada Sagrada (dano médio: ${hero.damage + 4}).`
    if (hero.bow) {
        description.innerHTML += `<br>Você possui Um Arco e Flechas (dano médio: ${hero.arrowDmg + 4}).`
    }
    description.innerHTML += `<br>Você está usando uma ${hero.armor}.`
    description.innerHTML += '<br>Você abre a mochila e vê:' + showInventory();
}

// PLAY
function startGame() {
    prologue.style.display = 'none';
    moveToVillageA();
    updtHeroStats();
}

function gameOver() {
    setTimeout(() => {
        prologue.style.display = 'flex';
        text.innerText = 'Você morreu!';
        advance.innerText = 'Voltar'
        advance.onclick = toStartAgain;
    }, 1000);
}

function toSecondPart() {
    prologue.style.display = 'flex';
    text.textContent = 'Você derrotou o Lobo Selvagem Gigante fazendo com que ' +
    'os demais fugissem. Após uma noite de descanso você decide continuar sua jornada ' +
    'chegando a Vila da Montanha que está em constante medo de Trolls nos arredores. ' +
    'Acabe com todos os Trolls.';
    advance.onclick = startSecondPart;
}

function startSecondPart() {
    prologue.style.display = 'none';
    moveToVillageB();
    updtHeroStats();
}

function toFinalPart() {
    prologue.style.display = 'flex';
    text.textContent = 'Você matou todos os Trolls que viviam nos arredores. ' +
    'Após uma noite de descanso você decide continuar sua jornada chegando a Vila próxima a ' +
    'Tumba onde o Bruxo está tentando realizar seu ritual. O momento de enfrentá-lo está perto.';
    advance.onclick = startFinalPart;
}

function startFinalPart() {
    prologue.style.display = 'none';
    moveToVillageC();
    updtHeroStats();
}

function toStartAgain() {
    window.location.href = '../../index.html';
}

function end() {
    prologue.style.display = 'flex';
    text.textContent = 'Parabéns por completar o Jogo.';
    advance.innerText = 'Finalizar';
    advance.onclick = toStartAgain;
}
