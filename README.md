
---

#  PUZZLES

## Inspiration

When we thought about residential college life, we realized something interesting. Even though students live in the same space and are surrounded by hundreds of people, it can still feel surprisingly disconnected.

We’ve all experienced moments where we wanted to meet new people, find something fun to do, or simply discover what was happening around campus — but everything felt scattered across different group chats, notice boards, and social media platforms.

Sometimes people want to join a gaming session, share music, or just start an interesting conversation, but there isn’t a single space that makes this easy. At the same time, everyday things like finding a quiet study spot or checking if laundry machines are available can become small but constant frustrations.

This made us think: **what if residential life could feel more connected, interactive, and effortless?**

That’s what inspired us to create **PUZZLES** — a platform that brings together communities, activities, and campus tools into one place, helping students feel more connected to the people and experiences around them.

Just like pieces of a puzzle, every student, interest, and activity becomes part of a larger, more vibrant community.

---

# What it does

PUZZLES is an **AI-powered platform designed to enhance residential college life** by combining social interaction, community discovery, and smart campus tools into one unified system.

The platform helps students:

* connect with new people who share similar interests
* discover communities and activities around campus
* collaborate through gaming and music experiences
* access smart tools that make everyday residential life easier

### Community Hub

The Community Hub is the social core of PUZZLES where students can connect and interact.

Students can:

* create and join gaming servers
* host multiplayer gaming sessions
* stream gameplay
* organize gaming tournaments within the campus community

### Music Jam Rooms

Music Jam Rooms allow students to share music and discover new sounds together.

Students can:

* create collaborative playlists
* host live listening sessions
* share music recommendations
* interact through music-based communities

### Friend Circles

Friend Circles are designed to make meeting new people more natural and engaging.

Students can:

* create friend groups
* participate in icebreaker games
* explore shared interests with others
* start deeper and more meaningful conversations

### AI Social Matching

During onboarding, users answer a short quiz about their interests, hobbies, and personality.

The AI system then recommends:

* people with similar interests
* communities they might enjoy
* activities happening around campus

This helps students find their community much faster.

### AI Residential Assistant

PUZZLES includes an AI assistant that helps students navigate residential life.

Students can ask questions like:

* “Where is a quiet study space right now?”
* “What events are happening tonight?”
* “How can I report a maintenance issue?”

The assistant helps make campus information easier to access.

### Smart Study Finder

The platform helps students discover quiet study locations by recommending spaces based on usage patterns and availability.

### Smart Laundry Tracker

Students can check laundry machine availability and estimated wait times, making shared facilities easier to use.

### MoodMap

MoodMap allows students to anonymously check in with their daily mood.

The system then analyzes campus-wide trends and suggests activities or resources that may help improve student wellbeing.

---

# How we built it

PUZZLES was designed using a modern full-stack architecture that supports real-time interaction and AI-powered recommendations.

### Frontend

The frontend was built using **React and Next.js**, allowing us to create a responsive and dynamic user interface.

We used **Tailwind CSS** and animation libraries to design a visually engaging interface with smooth navigation.

### Backend

The backend was developed using **Node.js and Express**, which manages authentication, community interactions, and application logic.

### Database

User profiles, communities, and activity data are stored using **MongoDB / Firebase**, allowing scalable data management.

### AI Components

AI is integrated into several features including:

* social matching recommendations
* the AI residential assistant
* activity suggestions
* sentiment analysis for mood tracking

### Real-Time Interaction

Real-time communication within communities is enabled using **WebSockets / Firebase Realtime Database**, allowing students to interact instantly within gaming rooms, music jams, and group discussions.

---

# Technical Architecture

### System Architecture

```
Users
  │
  ▼
Frontend (React / Next.js)
  │
  ▼
API Layer (Node.js / Express)
  │
  ├── Authentication System
  ├── Community Services
  ├── Activity Recommendation Engine
  ├── AI Assistant Integration
  │
  ▼
Database (MongoDB / Firebase)
  │
  ▼
AI Services
  ├── Social Matching Algorithm
  ├── Chatbot Assistant
  ├── Mood Sentiment Analysis
  └── Recommendation System
```

---

# System Flowchart

```
User Opens PUZZLES
        │
        ▼
Login / Registration
        │
        ▼
Onboarding Quiz (Interests & Personality)
        │
        ▼
AI Social Matching Engine
        │
        ▼
User Dashboard
 │       │        │
 ▼       ▼        ▼
Community   Smart Tools   AI Assistant
 │           │
 ▼           ▼
Gaming      Study Finder
Servers     Laundry Tracker
 │
 ▼
Social Interaction & Activities
```

---

# Challenges we ran into

One of the biggest challenges was designing a platform that combines multiple features — social communities, AI tools, and campus utilities — without making the interface confusing or overwhelming.

We also had to carefully think about how AI could be integrated in a way that genuinely improves the student experience rather than feeling unnecessary.

Another challenge was balancing **innovation with practicality**, ensuring that the platform could realistically be implemented within residential colleges.

---

# Accomplishments that we're proud of

We are proud that PUZZLES addresses both **social and practical aspects of residential life**.

Some highlights include:

* designing a unified platform that combines community interaction and campus utilities
* creating an AI-powered social matching system that helps students discover communities
* building a concept that could realistically scale across residential colleges
* designing an engaging and modern user experience

---

# What we learned

Through this project, we learned how important **community design** is when building technology.

We also explored how AI can be used not just for automation, but to **help people discover meaningful connections and experiences**.

The project also helped us understand how to design systems that integrate **social interaction, real-time communication, and AI recommendations**.

---

# What's next for PUZZLES

In the future, PUZZLES could expand into a full residential ecosystem used across universities.

Future improvements could include:

* smart campus maps showing real-time activity
* deeper AI-powered community recommendations
* integration with university event systems
* IoT integration for real-time facility monitoring

Our long-term goal is for PUZZLES to become the **central platform that connects residential communities**, making campus life more engaging, interactive, and supportive.

---


