// Import the readline module for user input and chalk for colored text
const readline = require('readline');
const chalk = require('chalk');  // Importing chalk for colored output

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
    console.log(chalk.green('\n=== Main Menu ==='));
    console.log(chalk.cyan('1. Start Game'));
    console.log(chalk.cyan('2. View Inventory'));
    console.log(chalk.cyan('3. Exit'));
    console.log(chalk.yellow('Use number keys to select an option.'));

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
            console.log(chalk.red('Invalid option, please try again.'));
            showMainMenu();
    }
}

// Function to start the game
function startGame() {
    console.clear();
    console.log(chalk.blue('\nStarting the game...'));
    if (!gameState.playerName) {
        rl.question(chalk.magenta('Enter your character name: '), name => {
            gameState.playerName = name;
            console.log(chalk.green(`\nWelcome, ${gameState.playerName}! Your adventure begins...`));
            encounter();
        });
    } else {
        encounter();
    }
}

// Function to simulate a game encounter
function encounter() {
    console.clear();
    console.log(chalk.red('\nYou encounter a wild creature!'));
    console.log(chalk.cyan('1. Fight'));
    console.log(chalk.cyan('2. Run'));
    console.log(chalk.yellow('Use number keys to make your choice.'));

    process.stdin.once('keypress', (str, key) => {
        if (key.name === '1') {
            fight();
        } else if (key.name === '2') {
            console.log(chalk.green('You run away safely!'));
            setTimeout(showMainMenu, 2000); // Return to menu after a short delay
        } else {
            console.log(chalk.red('Invalid choice, try again.'));
            encounter();
        }
    });
}

// Function to handle fighting an enemy
function fight() {
    console.clear();
    console.log(chalk.red('\nYou engage in battle...'));
    const damage = Math.floor(Math.random() * 20);
    gameState.health -= damage;
    console.log(chalk.yellow(`You took ${damage} damage. Your health is now ${gameState.health}.`));

    if (gameState.health > 0) {
        console.log(chalk.green('You defeated the creature!'));
        gameState.inventory.push(chalk.green('Creature Loot'));
        setTimeout(showMainMenu, 2000); // Return to menu after a short delay
    } else {
        console.log(chalk.red('You have been defeated! Game Over.'));
        setTimeout(exitGame, 2000); // Exit after a short delay
    }
}

// Function to view the player's inventory
function viewInventory() {
    console.clear();
    console.log(chalk.green('\n=== Inventory ==='));
    if (gameState.inventory.length === 0) {
        console.log(chalk.red('Your inventory is empty.'));
    } else {
        gameState.inventory.forEach((item, index) => {
            console.log(chalk.cyan(`${index + 1}. ${item}`));
        });
    }
    setTimeout(showMainMenu, 2000); // Return to menu after a short delay
}

// Function to exit the game
function exitGame() {
    console.log(chalk.blue('Thanks for playing! Goodbye.'));
    process.exit(); // Exit the process
}

// Start by showing the main menu
showMainMenu();
