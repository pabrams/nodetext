// Import the readline module for user input
const readline = require('readline');

// Create an interface to handle input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

// Enable keypress detection
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

// Game state object to store player progress or data
let gameState = {
    playerName: '',
    health: 100,
    level: 1,
    inventory: [],
};

// Function to display the main menu
function showMainMenu() {
    console.clear();
    console.log('\n=== Main Menu ===');
    console.log('1. Start Game');
    console.log('2. View Inventory');
    console.log('3. Exit');
    console.log('Use number keys to select an option.');

    // Wait for keypress and handle the choice
    process.stdin.once('keypress', handleMainMenu);
}

// Function to handle the main menu selection based on keypress
function handleMainMenu(str, key) {
    switch (key.name) {
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
    console.clear();
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
    console.clear();
    console.log('\nYou encounter a wild creature!');
    console.log('1. Fight');
    console.log('2. Run');
    console.log('Use number keys to make your choice.');

    process.stdin.once('keypress', (str, key) => {
        if (key.name === '1') {
            fight();
        } else if (key.name === '2') {
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
    console.clear();
    console.log('\nYou engage in battle...');
    const damage = Math.floor(Math.random() * 20);
    gameState.health -= damage;
    console.log(`You took ${damage} damage. Your health is now ${gameState.health}.`);

    if (gameState.health > 0) {
        console.log('You defeated the creature!');
        gameState.inventory.push('Creature Loot');
        setTimeout(showMainMenu, 2000); // Return to menu after a short delay
    } else {
        console.log('You have been defeated! Game Over.');
        setTimeout(exitGame, 2000); // Exit after a short delay
    }
}

// Function to view the player's inventory
function viewInventory() {
    console.clear();
    console.log('\n=== Inventory ===');
    if (gameState.inventory.length === 0) {
        console.log('Your inventory is empty.');
    } else {
        gameState.inventory.forEach((item, index) => {
            console.log(`${index + 1}. ${item}`);
        });
    }
    setTimeout(showMainMenu, 2000); // Return to menu after a short delay
}

// Function to exit the game
function exitGame() {
    console.log('Thanks for playing! Goodbye.');
    process.exit(); // Exit the process
}

// Start by showing the main menu
showMainMenu();
