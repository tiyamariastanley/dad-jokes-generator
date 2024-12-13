# **Documentation & Assumptions**

This section outlines the thought process, design decisions, and assumptions made during the development of the app.

1. **Setup Process:**

- Clone the git repo - it containes both frontend and backend codebase.
- "npm install" - Installs all necessary packages used in both frontend and backend.
- "npm start" - Starts both frontend and backend concurrently.

2. **Features Implemented:**

- Built a web app where users can speak a query and get dad jokes in response.
- Used https://jokeapi.dev/ for Dad jokes API.
- Implemented voice input using MediaRecorder browser API.
- Transcribed the voice input to text using the [Good Tape API](https://api.goodtape.io/docs).
- Designed and implemented a responsive themed UI for the app.
- Add a feature that allows users to filter jokes by category, search term and number of jokes.
- Implemented voice output for the jokes using Speech Synthesis API.

3. **Technology Stack:**

React, TypeScript, Node.js, Tailwind CSS, MaterialUI, Speech Synthesis API, Media Recorder, Google Fonts.

4. **Component Design:**

- Context API: To manage global states.
- Custom Hooks: To resuse logic for fetching jokes.
- Responsive Design: Used Tailwind's responsive utilities (md:, lg:).
- Styling: Used MaterialUI and Tailwind CSS.

5. **Assumptions:**

- The user has a modern browser that supports the Speech Recognition and Speech Synthesis APIs.
- Users will have an active internet connection to fetch jokes from the API.
- The primary use case involves users searching for dad jokes either via voice or using filter search.
- Error messages and fallback behaviors will guide users effectively.

6. **Approach:**

- Designed components modularly to ensure reusability.
- Integrated with Dad Joke API using REST calls from the frontend.
- Integrated with the Good Tape API using Node.js in the backend.
- Implemented error handling for edge cases.
- Tested across Chrome and Safari browsers to ensure compatibility and responsiveness.

7. **Future Improvements:**

- Implement auto stop recording when user stops speaking.
- Improve joke filtering functionality.
- Implement joke fetching based on the user query.
- Add unit and intergration tests.
