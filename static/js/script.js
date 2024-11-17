const chatBox = document.getElementById('chat-box');
const userMessageInput = document.getElementById('user-message');

function displayUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('user-message');
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
}

function displayBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('bot-message');
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
}

function sendMessage() {
    const message = userMessageInput.value;
    
    if (message.trim() === "") return;  

    displayUserMessage(message);  
    
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify({ message: message })  
    })
    .then(response => response.json())  
    .then(data => {
        const botResponse = data.response;
        displayBotMessage(botResponse);  
    })
    .catch(error => {
        console.error('Error:', error);
        displayBotMessage('Sorry, there was an error processing your message.');
    });

    userMessageInput.value = '';  
}

// Event listener to send message on pressing Enter key
document.getElementById('user-message').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();  
        sendMessage();  
    }
});
