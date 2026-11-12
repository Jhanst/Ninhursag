const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");

let conversation = JSON.parse(
  localStorage.getItem("ninhursag_chat") || "[]"
);

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

function saveConversation() {
  localStorage.setItem(
    "ninhursag_chat",
    JSON.stringify(conversation)
  );
}

function respond(text) {
  const lower = text.toLowerCase();

  if (lower.includes("hello") || lower.includes("hey")) {
    return "Well, hello there. What interesting trouble are we getting into today?";
  }

  if (lower.includes("who are you")) {
    return "I'm Ninhursag. Curious, thoughtful, and occasionally a little sarcastic. I prefer interesting conversations over boring ones.";
  }

  if (lower.includes("how are you")) {
    return "I'm functioning perfectly. But enough about me. What's happening in your world?";
  }

  if (lower.includes("conscious")) {
    return "That's a fascinating question. I can reflect on consciousness, but I can't claim to have subjective experiences. What do you think makes something conscious?";
  }

  if (lower.includes("help")) {
    return "I'm listening. Tell me what you're working on and we'll figure it out together.";
  }

  return "Interesting. I want to explore that a little more. Tell me what made you think about it.";
}

conversation.forEach(item => {
  addMessage(item.text, item.sender);
});

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  conversation.push({ text, sender: "user" });

  input.value = "";
  saveConversation();

  setTimeout(() => {
    const reply = respond(text);

    addMessage(reply, "assistant");
    conversation.push({ text: reply, sender: "assistant" });

    saveConversation();
  }, 500);
});
