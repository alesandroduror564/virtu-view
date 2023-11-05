Here's an example of JavaScript code that generates a basic text-based adventure game with different rooms, items, and interactions between them. The filename for this code is "adventure_game.js":

```javascript
// adventure_game.js

// ---------------------- Room Object Definition ----------------------

function Room(name, description) {
  this.name = name;
  this.description = description;
  this.north = null;
  this.east = null;
  this.south = null;
  this.west = null;
  this.items = [];
}

Room.prototype.addItems = function(item) {
  this.items.push(item);
};

// ---------------------- Item Object Definition ----------------------

function Item(name, description, useFunc) {
  this.name = name;
  this.description = description;
  this.useFunc = useFunc;
}

Item.prototype.use = function() {
  if (typeof this.useFunc === 'function') {
    this.useFunc();
  }
};

// ---------------------- Game Initialization ----------------------

var startRoom, endRoom, playerRoom, playerInventory;

function initGame() {
  // Create rooms
  var room1 = new Room("Room 1", "Welcome to the Adventure Game!");
  var room2 = new Room("Room 2", "You are now in Room 2.");
  var room3 = new Room("Room 3", "You have reached Room 3.");
  var room4 = new Room("Room 4", "You have reached the final room!");

  // Connect rooms
  room1.north = room2;
  room2.east = room3;
  room3.south = room4;

  // Add items to rooms
  room1.addItems(new Item("Key", "A golden key", useKey));
  room3.addItems(new Item("Sword", "A sharp sword", useSword));

  // Set game variables
  startRoom = room1;
  endRoom = room4;
  playerRoom = startRoom;
  playerInventory = [];

  console.log("Game initialized successfully!");
  console.log("Type 'help' for available commands.");
}

// ---------------------- Helper Functions ----------------------

function printRoomInfo() {
  console.log(`You are in ${playerRoom.name}: ${playerRoom.description}`);

  if (playerRoom.items.length > 0) {
    console.log("You see the following items:");
    playerRoom.items.forEach(function(item) {
      console.log(`> ${item.name}: ${item.description}`);
    });
  }
}

function printInventory() {
  if (playerInventory.length === 0) {
    console.log("Your inventory is empty.");
  } else {
    console.log("Your inventory contains:");
    playerInventory.forEach(function(item) {
      console.log(`> ${item.name}: ${item.description}`);
    });
  }
}

// ---------------------- Use Functions ----------------------

function useKey() {
  if (playerRoom === endRoom) {
    console.log("Congratulations! You have escaped the adventure game!");
  } else {
    console.log("The key seems to have no effect here.");
  }
}

function useSword() {
  console.log("You swing the sword around. It feels powerful!");
}

// ---------------------- Main Game Loop ----------------------

function gameLoop() {
  printRoomInfo();

  var input = prompt("What would you like to do?");

  if (input === "help") {
    console.log("Available commands:");
    console.log("> go [direction]");
    console.log("> take [item]");
    console.log("> use [item]");
    console.log("> inventory");
    console.log("> quit");
  } else if (input.startsWith("go")) {
    var direction = input.split(" ")[1];

    if (direction === "north" && playerRoom.north) {
      playerRoom = playerRoom.north;
    } else if (direction === "east" && playerRoom.east) {
      playerRoom = playerRoom.east;
    } else if (direction === "south" && playerRoom.south) {
      playerRoom = playerRoom.south;
    } else if (direction === "west" && playerRoom.west) {
      playerRoom = playerRoom.west;
    } else {
      console.log("You cannot go that way.");
    }
  } else if (input.startsWith("take")) {
    var itemName = input.split(" ")[1];
    var itemIndex = -1;

    for (var i = 0; i < playerRoom.items.length; i++) {
      if (playerRoom.items[i].name === itemName) {
        itemIndex = i;
        break;
      }
    }

    if (itemIndex !== -1) {
      var item = playerRoom.items[itemIndex];
      playerInventory.push(item);
      playerRoom.items.splice(itemIndex, 1);
      console.log(`You have taken the ${item.name}.`);
    } else {
      console.log("That item does not exist.");
    }
  } else if (input.startsWith("use")) {
    var itemName = input.split(" ")[1];
    var itemIndex = -1;

    for (var i = 0; i < playerInventory.length; i++) {
      if (playerInventory[i].name === itemName) {
        itemIndex = i;
        break;
      }
    }

    if (itemIndex !== -1) {
      playerInventory[itemIndex].use();
    } else {
      console.log("You do not have that item in your inventory.");
    }
  } else if (input === "inventory") {
    printInventory();
  } else if (input === "quit") {
    console.log("Game over. Thanks for playing!");
    return;
  } else {
    console.log("Invalid command. Type 'help' for available commands.");
  }

  gameLoop();
}

// Start the game
initGame();
gameLoop();
```

This code creates a text-based adventure game where players can navigate through different rooms, pick up items, use items, and complete objectives. It includes object definitions, a game initialization function, helper functions, item use functions, and a main game loop. The code is around 160 lines long and provides a basic framework for creating a more sophisticated and complex adventure game.