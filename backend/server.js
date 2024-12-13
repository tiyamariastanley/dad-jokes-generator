const express = require("express");
const axios = require("axios");
const multer = require("multer");
const formData = require("form-data");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors()); // Allow requests from all origins for dev mode

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    console.log("audioFile", req.file.buffer, process.env.API_KEY);

    const form = new formData();
    form.append("audio", req.file.buffer, "audio.wav");

    const headers = {
      ...form.getHeaders(),
      Authorization: process.env.API_KEY,
    };

    const response = await axios.post(
      "https://api.goodtape.io/transcribe/sync",
      form,
      { headers }
    );

    console.log("transcribed data", response.data);

    const transcription = response.data.text;

    res.status(200).send({ transcription });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    res.status(500).send("Error transcribing audio");
  }
});

app.listen(5001, () => {
  console.log(`Server is running on http://localhost:5001`);
});
