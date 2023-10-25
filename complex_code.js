/* 
Filename: complex_code.js

This code is a complex JavaScript implementation of a chat application.
It includes advanced features like user authentication, real-time messaging, and dynamic UI updates.

*/

// Constants
const API_URL = 'https://api.example.com';
const WS_URL = 'wss://ws.example.com';

// Global variables
let currentUser;
let chatMessages;

// Functions

// Authenticate the user
function authenticateUser(username, password) {
  // Send a POST request to the API for authentication
  fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
      currentUser = data.user;
      console.log(`User ${currentUser.username} logged in successfully!`);
      initChatApp();
    })
    .catch(error => {
      console.error('Authentication failed:', error);
    });
}

// Initialize the chat application
function initChatApp() {
  // Connect to the WebSocket server
  const socket = new WebSocket(`${WS_URL}/chat`);

  // Listen for messages from the server
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.type === 'newMessage') {
      addNewMessage(message);
    }
  });

  // Send a message to the server
  function sendMessage(content) {
    const message = {
      type: 'sendMessage',
      content,
      user: currentUser
    };
    socket.send(JSON.stringify(message));
  }

  // UI functions

  function addNewMessage(message) {
    chatMessages.push(message);

    // Update the DOM with the new message
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.user.username}: ${message.content}`;
    document.querySelector('#chatContainer').appendChild(messageElement);
  }

  function renderUI() {
    // Clear the chat container
    document.querySelector('#chatContainer').innerHTML = '';

    // Render the chat messages
    chatMessages.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.textContent = `${message.user.username}: ${message.content}`;
      document.querySelector('#chatContainer').appendChild(messageElement);
    });
  }

  function setupEventListeners() {
    // Handle form submit event
    document.querySelector('#chatForm').addEventListener('submit', event => {
      event.preventDefault();
      const messageContent = document.querySelector('#messageInput').value;
      sendMessage(messageContent);
      document.querySelector('#messageInput').value = '';
    });

    // Handle logout button click event
    document.querySelector('#logoutButton').addEventListener('click', event => {
      currentUser = null;
      chatMessages = [];
      console.log('User logged out successfully!');
    });
  }

  // Retrieve initial chat messages from the server
  fetch(`${API_URL}/messages`)
    .then(response => response.json())
    .then(data => {
      chatMessages = data.messages;
      renderUI();
      setupEventListeners();
    })
    .catch(error => {
      console.error('Failed to retrieve chat messages:', error);
    });
}

// Usage

authenticateUser('john_doe', 'password123');