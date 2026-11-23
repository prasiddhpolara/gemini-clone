# Gemini Clone

A chatbot web app inspired by Google Gemini, built with React and Vite. It talks to the Gemini API, remembers the conversation, and saves your chats in the browser.

> Screenshot: add one here (take a screenshot of the app and save it as `screenshot.png`, then use `![App screenshot](screenshot.png)`).

## Features
- Chat with Gemini using the official `@google/genai` SDK
- Conversation memory: earlier messages are sent with every new prompt
- Answers rendered as markdown (bold text, lists, code blocks)
- Recent chats in the sidebar, click to reopen, New chat button, Clear history
- Chats are saved in the browser (localStorage) and stay after refresh
- Press Enter or click send, click a suggestion card to start quickly
- Loading animation and friendly error message if the API fails

## Tech Stack
React 19, Vite, JavaScript, Context API, CSS, `@google/genai`, `react-markdown`

## Run it on your computer
1. Clone the project and install packages
   ```bash
   git clone https://github.com/YOUR-USERNAME/gemini-clone.git
   cd gemini-clone
   npm install
   ```
2. Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey)
3. Copy `.env.example` to `.env` and paste your key
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. Start the app
   ```bash
   npm run dev
   ```

## Project structure
```
src/
  Config/gemini.js        calls the Gemini API
  Context/Context.jsx     all chat state (messages, chats, loading)
  components/Main         chat screen
  components/Sidebar      recent chats and new chat
```

## What I learned
- Using React Context API to share state between components
- Calling an AI API and sending conversation history so the model remembers
- Keeping secret keys in `.env` and out of GitHub
- Rendering markdown safely instead of using `dangerouslySetInnerHTML`

## Known limitation
Because this is a frontend-only project, the API key is bundled into the browser code. That is fine for learning on your own computer, but a public website needs a small backend server that keeps the key private. I plan to add this next.

## Future improvements
- Backend (Node/FastAPI) to hide the API key, then deploy online
- Streaming responses (text appearing word by word)
- Delete a single chat, dark mode
