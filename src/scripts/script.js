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
    gold: 1000,
    daysPlaying: 1,
    armor: 'Roupa de Couro (def: 2)',
    def: 2,
    nextLevel: 100,
    damage: 400,
    arrowDmg: 30,
    chanceToShoot: 4,
    bow: false,
    dodgeBuff: false,
    dodgeChance: 3,
}

function template() {};

const locationMap = [
    {
        location: "Floresta",
        objective: 'Missão: Destrua o covil dos lobos selvagens',
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
                    { btntxt: 'Escutar conversas', btnfunc: listenTabernA },
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
        ]
    },
    {
        location: "Montanha",
        objective: 'Missão: Mate todos os Trolls 0/4',
        places: [
            {
                name: 'Vila da Montanha.',
                buttons: [
                    { btntxt: 'Explorar os arredores', btnfunc: exploreMontain },
                    { btntxt: 'Treinar', btnfunc: training },
                    { btntxt: 'Dormir', btnfunc: recover },
                    { btntxt: 'Ir a loja', btnfunc: moveToShopB },
                    { btntxt: 'Ir ao ferreiro', btnfunc: moveToSmithA },
                    { btntxt: 'Ir a taverna', btnfunc: moveToTabernB },
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
                    { btntxt: 'Escutar conversas', btnfunc: listenTabernB },
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
        ]
    },
    {
        location: "Tumba",
        objective: 'Missão: Mate o Lorde Vampiro',
        places: [
            {
                name: 'Vila próxima a Tumba.',
                buttons: [
                    { btntxt: 'Ir a tumba', btnfunc: exploreMontain },
                    { btntxt: 'Treinar', btnfunc: training },
                    { btntxt: 'Dormir', btnfunc: recover },
                    { btntxt: 'Ir a loja', btnfunc: moveToShopB },
                    { btntxt: 'Ir ao ferreiro', btnfunc: moveToSmithA },
                    { btntxt: 'Ir a taverna', btnfunc: moveToTabernB },
                ],
            },
            {
                name: 'Loja de Suprimentos.',
                buttons: [
                    { btntxt: 'Comprar poção', btnfunc: buyPotion },
                    { btntxt: 'Vender poção', btnfunc: sellPotion },
                    { btntxt: 'Comprar Livro Sobre Espada IV', btnfunc: buyBow },
                    { btntxt: 'Comprar Livro Sobre Arco II', btnfunc: buyBookSword3 },
                    { btntxt: 'Comprar Livro Sobre Esquiva I', btnfunc: buyBookBow1 },
                    { btntxt: 'Voltar', btnfunc: moveToVillageB },
                ]
            },
            {
                name: 'Taverna',
                buttons: [
                    { btntxt: 'Pedir cerveja', btnfunc: buyBeer },
                    { btntxt: 'Escutar conversas', btnfunc: listenTabernB },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageB },
                ]
            },
            {
                name: 'Entrada do Castelo.',
                buttons: [
                    { btntxt: 'Entrar', btnfunc: fightingMontain },
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
                name: 'Ferreiro',
                buttons: [
                    { btntxt: 'Armadura de Ferro', btnfunc: buyArmor1 },
                    { btntxt: 'Armadura de Platina', btnfunc: buyArmor2 },
                    { btntxt: 'Armadura de Platina Completa', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: '. . .', btnfunc: template },
                    { btntxt: 'Voltar', btnfunc: moveToVillageB },
                ]
            },
        ]
    },
];

function buyBookSword2() {
    if (hero.gold >= 150) {
        buyBook('Livro Sobre Espada II', 4);
        hero.gold -= 150;
        hero.damage += 10;
        updtHeroStats();
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.';
    }
}

function buyBookSword3() {
    if (hero.gold >= 150) {
        buyBook('Livro Sobre Espada III', 3);
        hero.gold -= 150;
        hero.damage += 10;
        updtHeroStats();
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.';
    }
}

function buyBookSword4() {
    
}

function buyBookBow1() {
    if (hero.gold >= 150) {
        buyBook('Livro Sobre Arco I', 4);
        hero.gold -= 150;
        hero.arrowDmg += 10;
        hero.chanceToShoot = 3;
        updtHeroStats();
    } else {
        description.innerHTML += '<br>Você não tem ouro suficiente.';
    }
}

function buyBookBow2() {
    
}

function buyBookDodge() {
    
}

function moveToSmithA() {
    resetTxt();
    updateLocation(1, 6);
    lookForArmor();
    if (hero.armor.includes('8')) {
        description.innerHTML += '<br>Você não vê armaduras melhores.';
    } else {
        description.innerHTML += '<br>Você vê uma variedade de armaduras a venda.';
    }
}

function lookForArmor() {
    if (hero.armor.includes('6')) {
        btns[0].textContent = '. . .';
        btns[0].onclick = template;
    } else if (hero.armor.includes('8')) {
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
        description.innerHTML += '<br>Você comprou uma Armadura de Ferro.'
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

function buyBook(name, button) {
    inventory.livros.push(name);
    //console.log(inventory.livros);
    description.innerHTML += `<br>Você comprou o ${name}.<br>Seu dano aumentou.`
    btns[button].textContent = '. . .';
    btns[button].onclick = template;
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

function listenTabernA() {
    resetTxt();
    updateLocation(0, 6)
    let random = Math.floor(Math.random() * 3);
    if (random === 1) {
        description.innerHTML += '<br>Você começa a escutar algumas conversas.' +
        '<br>Homem A: ... que há um Lobo Selvagem Gigante no fundo do covil.' +
        '<br>Homem B: Também ouvi falar nisso, mas parece que para chegar a ele, ' +  
        'tem que derrotar pelo menos 10 lobos selvagens.' +
        '<br>Homem A: Quem seria louco de ir tão fundo.'
    } else {
        description.innerHTML += '<br>Você começa a escutar algumas conversas.' +
        '<br>Homem A: ... que um lobo selvagem matou duas ovelhas de meu vizinho.' +
        '<br>Homem B: Até quando vamos sofrer com essas pragas.'
    }
}

function moveToShopB() {
    resetTxt();
    updateLocation(1, 1);
    description.innerHTML += '<br>Você olha a loja e vê:<br>Um estoque de Poções.';
    lookForStuff(1);
}

function listenTabernB() {
    resetTxt();
    updateLocation(1, 2)
    let random = Math.floor(Math.random() * 3);
    if (random === 1) {
        description.innerHTML += '<br>Homem A: ... que existem 4 Trolls nos Arredores da Montanha.' +
        '<br>Homem B: Só o que podemos fazer é rezar para que eles vão embora.';
    } else {
        description.innerHTML += '<br>Homem A: O inverno será bem difícil.' +
        '<br>Homem B: Claro, com Goblins e Orcs atacando nos arredores, como os suprimentos ' +
        'chegaram aqui.' +
        '<br>Homem A: Melhor começar a estocar agora.';
    }
}

function moveToTabernB() {
    resetTxt();
    updateLocation(1, 2);
}

function exploreMontain() {
    resetTxt();
    updateLocation(1, 3);
}

let currentLocation;

const btns = document.getElementsByClassName('btn');

// advance.addEventlistenTabernAer('click', () => {
//     prologue.style.display = 'none';
//     //alert('funciona');
//     startGame();
//     updtHeroStats();
// });

startGame();
updtHeroStats();

function startGame() {
    moveToVillageC();
    updtHeroStats();
}

function moveToVillageC() {
    resetTxt();
    updateLocation(2, 0);
    currentLocation = 2;
}

function moveToVillageB() {
    resetTxt();
    updateLocation(1, 0);
    currentLocation = 1;
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
    currentLocation = 0;
}

function moveToCovil() {
    resetTxt();
    updateLocation(0, 1);
}

function lookForStuff(shop) {
    if (shop == 0) {
        if (inventory.livros.indexOf('Livro Sobre Espada II') != -1) {
            btns[4].textContent = '. . .';
            btns[4].onclick = template;
            //console.log(inventory.livros);
        } else {
            description.innerHTML += '<br>Livro Sobre Espada II.';
            //console.log(inventory.livros);
        }
    } else if(shop == 1) {
        if (hero.bow) {
            btns[2].textContent = '. . .';
            btns[2].onclick = template;
            //console.log(inventory.livros);
        } else {
            description.innerHTML += '<br>Arco com flechas.';
            //console.log(inventory.livros);
        }
        if (inventory.livros.indexOf('Livro Sobre Espada III') != -1) {
            btns[3].textContent = '. . .';
            btns[3].onclick = template;
            //console.log(inventory.livros);
        } else {
            description.innerHTML += '<br>Livro Sobre Espada III.';
            //console.log(inventory.livros);
        }
        if (inventory.livros.indexOf('Livro Sobre Arco I') != -1) {
            btns[4].textContent = '. . .';
            btns[4].onclick = template;
            //console.log(inventory.livros);
        } else {
            description.innerHTML += '<br>Livro Sobre Arco I.';
            //console.log(inventory.livros);
        }
    }
}

function moveToShopA() {
    resetTxt();
    updateLocation(0, 2);
    description.innerHTML += '<br>Você olha a loja e vê:<br>Um estoque de Poções.'
    //console.log(!inventory.livros.indexOf('Livro Sobre Espada II') != -1);
    lookForStuff(0);
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
        //console.log(btns[i].textContent = locationMap[currentLocation].places[currentPlace].buttons[i].btntxt);
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
        description.innerHTML += `<br>Você ganhou 20 de xp.`;
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
    if (hero.bow) {
        description.innerHTML += `<br>Você possui Um Arco e Flechas (dano médio: ${hero.arrowDmg + 4}).`
    }
    description.innerHTML += `<br>Você está usando uma ${hero.armor}.`
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
        name: 'Lobo Selvagem',
        atk: 4,
        vida: 40,
        xp: 18,
        gold: 8,
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
        atk: 15,
        vida: 80,
        xp: 28,
        gold: 18,
    },
    {
        name: 'Orc',
        atk: 25,
        vida: 110,
        xp: 48,
        gold: 28,
    },
    {
        name: 'Troll',
        atk: 50,
        vida: 300,
        xp: 148,
        gold: 98,
    },
];

let currentMonsterFight;
let currentMonsterLife;
let wolfKilled = 0;
let trollsKilled = 0;

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

function covilFight() {
    wolfKilled = 9;
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
    if (wolfKilled > 9) {
        currentMonsterFight = 1;
        covilBoss();
    } else {
        currentMonsterFight = 0;
        fighting();
    }
}

function fightingMontain() {
    let random = Math.floor(Math.random() * 8);
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
        changeButtons(currentLocation, 5);
        setTimeout(() => {
            resetTxt();
            updateLocation(currentLocation, 3);
        }, 1500);
        monsterDead(currentLocation);
        //updateLocation(0, 3);
        //console.log(wolfKilled);
        hero.xp += getXp;
        hero.gold += getGold;
        lookForLevelUp();
        if (currentMonsterFight == 1) {
            wolfKilled = 0;
            alert('Você derrotou o Lobo Selvagem Gigante e decide seguir sua aventura.');
            resetTxt();
            moveToVillageB();
            //updateLocation(1, 0);
            return;
        }
    } else {
        updateLocation(currentLocation, 4);
        addBowButton(hero.bow);
        resetTxt();
        description.innerHTML += 'Você está enfrentando um ' + monsters[currentMonsterFight].name + '.';
        addMonster();
    }
}

function monsterDead(location) {
    if (location == 0) {
        wolfKilled++;
    } else {
        if (currentMonsterFight == 4) {
            trollsKilled++;
            locationMap[1].objective = `Missão: Mate todos os Trolls ${trollsKilled}/4`;
            if (trollsKilled == 4) {
                alert('Voce terminou a parte 2');
            }
        }
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

function gameOver() {
    alert('Você morreu!');
    window.location.href = '/./index.html';
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
        description.innerHTML += `<br>${monsters[currentMonsterFight].name} lhe ataca na cabeça.`;
        description.innerHTML += `<br>Você recebeu ${monsterDmg*2} de dano.`;
        setTimeout(() => {
            hero.health -= monsterDmg*2;
                //resetTxt();
                battle();
                updtHeroStats();
                if (hero.health <= 0) {
                    gameOver();
                }
            }, 1500);
    }, 1000);
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
                    gameOver();
                }
            }, 1500);
    }, 1000);
}