PingUp - Real Time Chat Application

Hey there,
This is PingUp, a real-time chat application I built using the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO for live messaging.
The goal of this project was to learn real-time communication and how chat systems like WhatsApp or Messenger work behind the scenes.

How It Works
~ When a user logs in, their userId is sent to the Socket.IO server.
~ The backend keeps track of all connected users.
~ When one user sends a message, it’s stored in MongoDB and instantly sent to the receiver in real-time.
~ On the frontend, I use a custom hook (useGetSocketMessage.js) to listen for new messages and update the chat instantly.

Notification Feature
I also added a notification sound that plays when a new message arrives from another user.
The sound file is stored in src/assets/notification.wav.

Features
~User Authentication (Login & Signup using JWT)
~Instant Real-Time Messaging using Socket.IO
~Online/Offline Status indicator for users
~Messages are saved in MongoDB so chats stay even after refresh
~Notification sound plays when a new message is received
~State Management using Zustand (for selected conversation and messages)
~Built with React + Tailwind CSS for fast and modern UI

About Me
Name: Ritik Aryan
Email: ritikaryan17@gmail.com
LinkedIn: linkedin.com/in/ritik-aryan-0a7712297
