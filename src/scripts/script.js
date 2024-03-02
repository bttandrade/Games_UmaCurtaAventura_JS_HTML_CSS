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
    gold: 50,
    daysPlaying: 1,
    armor: 'Couro (def: 2)',
    def: 2,
    nextLevel: 100,
    damage: 4,
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
                    { btntxt: 'Ir a taverna', btnfunc: moveToTabernA },
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
            {
                name: 'Taverna',
                buttons: [
                    { btntxt: 'Pedir cerveja', btnfunc: buyBeer },
                    { btntxt: 'Escutar conversas', btnfunc: listen },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageA },
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

function buyBookSword2() {
    if (hero.gold >= 150) {
        inventory.livros.push('Livro Sobre Espada II');
        //console.log(inventory.livros);
        hero.damage += 10;
        description.innerHTML += '<br>Você comprou o Livro Sobre Espada II.<br>Seu dano aumentou.'
        btns[4].textContent = '. . .';
        btns[4].onclick = template;
        hero.gold -= 150;
        updtHeroStats();
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.'
    }
}

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

function listen() {
    resetTxt();
    updateLocation(0, 6)
    let random = Math.floor(Math.random() * 3);
    if (random === 1) {
        description.innerHTML += '<br>Você começa a escutar algumas conversas.' +
        '<br>Homem A: ... que há um Goblin Chefe no fundo do covil.' +
        '<br>Homem B: Também ouvi falar nisso, mas parece que para chamar a atenção dele, ' +  
        'tem que derrotar pelo menos 10 goblins.' +
        '<br>Homem A: Quem seria louco de ir tão fundo.'
    } else {
        description.innerHTML += '<br>Você começa a escutar algumas conversas.' +
        '<br>Homem A: ... que um goblin matou duas ovelhas de meu vizinho.' +
        '<br>Homem B: Até quando vamos sofrer com essas pragas.'
    }
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

function getRandNumb() {
    let random = Math.floor(Math.random() * 10); 
    return random;
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

function moveToTabernA() {
    resetTxt();
    updateLocation(0, 6);
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
    goldTxt.innerText = `${hero.gold}g`;
}

function training() {
    if (hero.stamina + 30 >= hero.maxStamina) {
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
        description.innerHTML += '<br>Você ganhou 1 level.';
        hero.damage += 5;
        hero.maxHealth += 10;
        hero.maxStamina += 5;
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
        if (hero.health + 50 >= hero.maxHealth) {
            hero.health = hero.maxHealth;
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
    description.innerHTML += `<br>Você possui a Espada Sagrada (dano médio: ${hero.damage + 4}).`
    description.innerHTML += `<br>Você está usando uma Armadura de ${hero.armor}.`
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
        atk: 4,
        vida: 40,
        xp: 20,
        gold: 10,
    },
    {
        name: 'Goblin Chefe',
        atk: 30,
        vida: 150,
        xp: 60,
        gold: 80,
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
    if (goblinsKilled > 9) {
        currentMonsterFight = 1;
        fighting();
    } else {
        currentMonsterFight = 0;
        fighting();
    }
}

function fighting() {
    currentMonsterLife = monsters[currentMonsterFight].vida;
    if (hero.stamina <= hero.maxStamina - 20) {
        hero.stamina += 20;
        updtHeroStats();
        battle();
    } else {
        description.innerHTML += "<br>Você está muito cansado.";
    }
}

function battle() {
    //console.log(hero.damage);
    if (currentMonsterLife <= 0) {
        let getGold = monsters[currentMonsterFight].gold + getRandNumb();
        let getXp = (monsters[currentMonsterFight].xp - hero.level*4) + getRandNumb();
        getXp < 0 ? getXp = 0 : getXp;
        description.innerHTML += '<br>Você derrotou um ' + monsters[currentMonsterFight].name + '.';
        description.innerHTML += `<br>Você ganhou ${getXp} de xp e ${getGold} de ouro.`;
        changeButtons(0, 5);
        setTimeout(() => {
            resetTxt();
            updateLocation(0, 3);
        }, 1500);
        //updateLocation(0, 3);
        if (currentMonsterFight == 1) {
            alert('Você terminou a parte 1');
            resetTxt();
            updateLocation(1, 0);
            return;
        }
        goblinsKilled++;
        //console.log(goblinsKilled);
        hero.xp += getXp;
        hero.gold += getGold;
        lookForLevelUp();
    } else {
        updateLocation(0, 4);
        resetTxt();
        description.innerHTML += 'Você está enfrentando um ' + monsters[currentMonsterFight].name + '.';
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
    alert('Você morreu!');
}

function addMonster() {
    description.innerHTML += `<br><img src="../images/icon001.png" alt="life"> ${currentMonsterLife}` 
}

function monsterTurn() {
    let random = Math.floor(Math.random() * 4);
    random === 1 ? monsterSpecial() : monsterAtk();
}

function monsterSpecial() {
    let monsterDmg = monsters[currentMonsterFight].atk + getRandNumb() - hero.def;
    changeButtons(0, 5);
    setTimeout(() => {
        description.innerHTML += `<br>${monsters[currentMonsterFight].name} lhe acerta na cabeça.`;
        description.innerHTML += `<br>Você recebeu ${monsterDmg*2} de dano.`;
        setTimeout(() => {
            hero.health -= monsterDmg*2;
                //resetTxt();
                battle();
                updtHeroStats();
                if (hero.health <= 0) {
                    alert('derrota');
                    window.location.href = '/./index.html'
                }
            }, 1500);
    }, 1000);
    //battle();
}

function monsterAtk() {
    let monsterDmg = monsters[currentMonsterFight].atk + getRandNumb() - hero.def;
    changeButtons(0, 5);
    setTimeout(() => {
        description.innerHTML += `<br>${monsters[currentMonsterFight].name} lhe ataca.`;
        description.innerHTML += `<br>Você recebeu ${monsterDmg} de dano.`;
        setTimeout(() => {
            hero.health -= monsterDmg;
                //resetTxt();
                battle();
                updtHeroStats();
                if (hero.health <= 0) {
                    alert('derrota');
                    window.location.href = '/./index.html'
                }
            }, 1500);
    }, 1000);
    //battle();
}