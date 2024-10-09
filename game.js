// Import the readline module for user input
const readline = require('readline');

// Create an interface to handle input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Game state object to store player progress or data
let gameState = {
    playerName: '',
    health: 100,
    level: 1,
    inventory: [],
};

// Function to display the main menu
function showMainMenu() {
    console.log('\n=== Main Menu ===');
    console.log('1. Start Game');
    console.log('2. View Inventory');
    console.log('3. Exit');
    
    rl.question('Choose an option: ', handleMainMenu);
}

// Function to handle the main menu selection
function handleMainMenu(choice) {
    switch (choice) {
        case '1':
            startGame();
            break;
        case '2':
            viewInventory();
            break;
        case '3':
            exitGame();
            break;
        default:
            console.log('Invalid option, please try again.');
            showMainMenu();
    }
}

// Function to start the game
function startGame() {
    console.log('\nStarting the game...');
    if (!gameState.playerName) {
        rl.question('Enter your character name: ', name => {
            gameState.playerName = name;
            console.log(`\nWelcome, ${gameState.playerName}! Your adventure begins...`);
            encounter();
        });
    } else {
        encounter();
    }
}

// Function to simulate a game encounter
function encounter() {
    console.log('\nYou encounter a wild creature!');
    console.log('1. Fight');
    console.log('2. Run');
    
    rl.question('What will you do? ', (choice) => {
        if (choice === '1') {
            fight();
        } else if (choice === '2') {
            console.log('You run away safely!');
            showMainMenu();
        } else {
            console.log('Invalid choice, try again.');
            encounter();
        }
    });
}

// Function to handle fighting an enemy
function fight() {
    console.log('\nYou engage in battle...');
    const damage = Math.floor(Math.random() * 20);
    gameState.health -= damage;
    console.log(`You took ${damage} damage. Your health is now ${gameState.health}.`);
    
    if (gameState.health > 0) {
        console.log('You defeated the creature!');
        gameState.inventory.push('Creature Loot');
        showMainMenu();
    } else {
        console.log('You have been defeated! Game Over.');
        exitGame();
    }
}

// Function to view the player's inventory
function viewInventory() {
    console.log('\n=== Inventory ===');
    if (gameState.inventory.length === 0) {
        console.log('Your inventory is empty.');
    } else {
        gameState.inventory.forEach((item, index) => {
            console.log(`${index + 1}. ${item}`);
        });
    }
    showMainMenu();
}

// Function to exit the game
function exitGame() {
    console.log('Thanks for playing! Goodbye.');
    rl.close();
}

// Start by showing the main menu
showMainMenu();