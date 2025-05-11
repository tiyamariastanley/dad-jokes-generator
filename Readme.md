# **Documentation & Assumptions**


1. **Setup Process:**

- Clone the git repo - it containes both frontend and backend codebase.
- In the backend folder, create a .env file with:
 ```env
   API_KEY=<your-api-key-here>
 ```
-	**npm install** - Installs all necessary packages used in both frontend and backend.
-	**npm start** - Starts both frontend and backend concurrently.

2. **Features Implemented:**

	- Built a web app where users can speak a query and get dad jokes in response.
	- Used https://jokeapi.dev/ for Dad jokes API.
	- Implemented voice input using MediaRecorder browser API.
	- Transcribed the voice input to text using the [Good Tape API](https://api.goodtape.io/docs).
	- Designed and implemented a responsive themed UI for the app.
	- Added a feature that allows users to filter jokes by category, search term and number of jokes.
	- Implemented voice output for the jokes using Speech Synthesis API.

3. **Technology Stack:**

		React, TypeScript, Node.js, Tailwind CSS, MaterialUI, Speech Synthesis API, Media Recorder, Google Fonts.

