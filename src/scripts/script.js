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
    daysPlaying: 1,
    atualArmor: 'Couro(def+2)',
    nextLevel: 100,
    damage: 10,
    arco: false,
    dodgeBuff: false,
}

let trainingXp = 20;

function template() {};

const locationMap = [
    {
        location: "Floresta",
        objective: 'Missão: Destrua o covil de goblins',
        places: [
            {
                name: 'Vila da Floresta.',
                buttons: [
                    { btntxt: 'Ir ao covil', btnfunc: moveToCovil },
                    { btntxt: 'Treinar', btnfunc: training },
                    { btntxt: 'Dormir', btnfunc: recover },
                    { btntxt: 'Ir a loja', btnfunc: moveToShopA },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Ir a taverna', btnfunc: template },
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
                    { btntxt: 'Comprar Livro Sobre Espada II', btnfunc: buyBook1 },
                    { btntxt: 'Voltar', btnfunc: moveToVillageA },
                ]
            },
            {
                name: 'Covil dos Goblins.',
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
                name: 'Em combate.',
                buttons: [
                    { btntxt: 'Atacar', btnfunc: attack },
                    { btntxt: 'Esquivar', btnfunc: dodge },
                    { btntxt: 'Usar poção', btnfunc: usePotion },
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
        ]
    },
    {
        location: "Montanha",
        objective: 'Missão: Destrua o Acampamento Orc',
        places: [
            {
                name: 'Vila das Montanhas.',
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

function buyBook1() {
    inventory.livros.push('Livro Sobre Espada II');
    console.log(inventory.livros);
    hero.damage *= 1.1;
    description.innerHTML += '<br>Você comprou o Livro Sobre Espada II.<br>Seu dano aumentou.'
    btns[4].textContent = '. . .';
    btns[4].onclick = template;
    hero.gold -= 150;
    updtHeroStats();
}

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

function resetTxt() {
    description.innerHTML = "";
}

function moveToVillageA() {
    resetTxt();
    updateLocation(0, 0);
}

function moveToCovil() {
    resetTxt();
    updateLocation(0, 1);
}

function moveToShopA() {
    resetTxt();
    updateLocation(0, 2);
    console.log(!inventory.livros.indexOf('Livro Sobre Espada II') != -1);
    if (inventory.livros.indexOf('Livro Sobre Espada II') != -1) {
        description.innerHTML += '<br>Você olha a loja e vê:<br>Um estoque de Poções.'
        btns[4].textContent = '. . .';
        btns[4].onclick = template;
        console.log(inventory.livros);
    } else {
        description.innerHTML += '<br>Você olha a loja e vê:<br>Um estoque de Poções.'
        description.innerHTML += '<br>Livro Sobre Espada II.';
        console.log(inventory.livros);
    }
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
        console.log(btns[i].textContent = locationMap[currentLocation].places[currentPlace].buttons[i].btntxt);
        btns[i].onclick = locationMap[currentLocation].places[currentPlace].buttons[i].btnfunc;
    }
}

function updtHeroStats() {
    levelTxt.innerText = hero.level;
    healthTxt.innerText = `${hero.health}/${hero.maxHealth}`;
    staminaTxt.innerText = `${hero.stamina}/${hero.maxStamina}`;
    goldTxt.innerText = hero.gold;
}

function training() {
    if (hero.stamina + 30 >= 100) {
        description.innerHTML += '<br>Você está cansado demais.';
    } else {
        hero.stamina += 30;
        hero.xp += 20;
        description.innerHTML += `<br>Você ganhou ${trainingXp}xp.`;
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
        hero.daysPlaying++;
        currentDay.innerText = `- Dia ${hero.daysPlaying}`;
        updtHeroStats();
    }
}

const inventory = {
    poção: 2,
    armaduras: [
        {
            name: 'couro',
            def: 2,
        }
    ],
    livros: [ 
        'Livro Sobre Espada I',
    ]
}

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
    description.innerHTML += `<br>Você está usando uma Armadura de ${hero.atualArmor}.`
    description.innerHTML += '<br>Você abre a mochila e vê:' + showInventory();
}

invBtn.onclick = seeInventory;

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

const monsters = [
    {
        name: 'Goblin',
        atk: 10,
        vida: 30,
    },
    {
        name: 'Goblin Chefe',
        atk: 40,
        vida: 100,
    },
];

let currentMonsterFight;
let currentMonsterLife;
let goblinsKilled;

function covilFight() {
    goblinsKilled = 0;
    resetTxt();
    updateLocation(0, 3);
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
        battle();
    } else {
        description.innerHTML += "<br>Você está muito cansado.";
    }
}

function battle() {
    //console.log(hero.damage);
    if (currentMonsterLife <= 0) {
        description.innerHTML += '<br>Você derrotou um ' + monsters[currentMonsterFight].name + '.';
        changeButtons(0, 5);
        setTimeout(() => {
            resetTxt();
            updateLocation(0, 3);
        }, 1000);
        //updateLocation(0, 3);
        if (currentMonsterFight == 1) {
            alert('Você terminou a parte 1');
            resetTxt();
            updateLocation(1, 0);
            return;
        }
        goblinsKilled++;
        console.log(goblinsKilled);
        hero.xp += 30;
        lookForLevelUp();
    } else {
        updateLocation(0, 4);
        resetTxt();
        description.innerHTML += 'Você está enfrentando um ' + monsters[currentMonsterFight].name + '.';
        addMonster();
    }
}

function attack() {
    if (hero.dodgeBuff) {
        description.innerHTML += `<br>Você causou ${hero.damage*2} de dano.`;
        currentMonsterLife -= hero.damage*2;
        hero.dodgeBuff = false;
    } else {
        description.innerHTML += `<br>Você causou ${hero.damage} de dano.`
        currentMonsterLife -= hero.damage;
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
        description.innerHTML += '<br>Você recuperou 30 de Vida.'
        inventory.poção--;
        hero.health >= 70 ? hero.health = 100 : hero.health += 30;
        updtHeroStats();
    }
}

function dodge() {
    let random = Math.floor(Math.random() * 2);
    //console.log(random);
    if (random === 0) {
        description.innerHTML += `<br>Você não consegue esquivar.`;
        monsterTurn();
    } else {
        hero.dodgeBuff = true;
        description.innerHTML += `<br>Você esquivou e seu próximo ataque será crítico.`;
    }
}

function flee() {
    let random = Math.floor(Math.random() * 2);
    if (random === 0) {
        resetTxt();
        updateLocation(0, 3);
    } else {
        description.innerHTML += `<br>Você não consegue fugir.`;
        monsterTurn();
    }
}

function gameOver() {
    alert('derrota');
}

function addMonster() {
    description.innerHTML += `<br>Vida: ${currentMonsterLife}.` 
}

function monsterTurn() {
    let random = Math.floor(Math.random() * 4);
    random === 1 ? monsterSpecial() : monsterAtk();
}

function monsterSpecial() {
    changeButtons(0, 5);
    setTimeout(() => {
        description.innerHTML += `<br>${monsters[currentMonsterFight].name} lhe acerta na cabeça.`;
        description.innerHTML += `<br>Você recebeu ${monsters[currentMonsterFight].atk*2} de dano.`;
        setTimeout(() => {
            hero.health -= monsters[currentMonsterFight].atk*2;
                //resetTxt();
                battle();
                updtHeroStats();
                if (hero.health <= 0) {
                    alert('derrota');
                    window.location.href = '/./index.html'
                }
            }, 1000);
    }, 1000);
    //battle();
}

function monsterAtk() {
    changeButtons(0, 5);
    setTimeout(() => {
        description.innerHTML += `<br>${monsters[currentMonsterFight].name} lhe ataca.`;
        description.innerHTML += `<br>Você recebeu ${monsters[currentMonsterFight].atk} de dano.`;
        setTimeout(() => {
            hero.health -= monsters[currentMonsterFight].atk;
                //resetTxt();
                battle();
                updtHeroStats();
                if (hero.health <= 0) {
                    alert('derrota');
                    window.location.href = '/./index.html'
                }
            }, 1000);
    }, 1000);
    //battle();
}