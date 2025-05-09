const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const app = express();
const PORT = 3001;
const DEV_MODE = process.env.DEV_MODE === "true";

// Reset state.json with default state on server startup
const defaultState = {
  title: "$2 start single or lot",
  subtitle: "Condition on sleeve if not NM",
  image: {
    id: "default-image-id",
    url: "",
    label: "Default Image",
  },
};
const statePath = path.join(__dirname, "database/state.json");
if (!fs.existsSync(statePath)) {
  try {
    fs.writeFileSync(statePath, JSON.stringify(defaultState, null, 2));
    console.log("Default state written to state.json");
  } catch (err) {
    console.error("Error writing state.json:", err);
  }
}

app.use(cors({ origin: "*" }));
app.use(express.json());

// Serve static gifs
app.use("/gifs", express.static(path.join(__dirname, "database/gifs")));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/get-state", (req, res) => {
  const statePath = path.join(__dirname, "database/state.json");
  try {
    const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: "Could not read state.json" });
  }
});

// Remove /update-title endpoint and add /set-state endpoint
app.post("/set-state", (req, res) => {
  const { title, subtitle, imageId } = req.body;
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "Invalid title" });
  }
  if (typeof subtitle !== "string") {
    return res.status(400).json({ error: "Invalid subtitle" });
  }

  const statePath = path.join(__dirname, "database/state.json");
  const gifsPath = path.join(__dirname, "database/gifs.json");

  let imageInfo = null;
  if (imageId && imageId.trim() !== "") {
    try {
      const gifs = JSON.parse(fs.readFileSync(gifsPath, "utf8"));
      imageInfo = gifs.find((gif) => gif.id === imageId);
      if (!imageInfo) {
        return res
          .status(400)
          .json({ error: "Image ID not found in gifs.json" });
      }
    } catch (err) {
      return res.status(500).json({ error: "Could not read gifs.json" });
    }
  }

  const newState = {
    title,
    subtitle,
    image: imageInfo
      ? { id: imageInfo.id, url: imageInfo.url, label: imageInfo.label }
      : { id: "", url: "", label: "" },
  };

  try {
    fs.writeFileSync(statePath, JSON.stringify(newState, null, 2));
    res.json({ success: true, state: newState });
  } catch (err) {
    res.status(500).json({ error: "Could not write to state.json" });
  }
});

// Endpoint to get image options from gifs.json
app.get("/get-image-options", (req, res) => {
  const gifsPath = path.join(__dirname, "database/gifs.json");
  try {
    const gifs = JSON.parse(fs.readFileSync(gifsPath, "utf8"));
    res.json(gifs);
  } catch (err) {
    res.status(500).json({ error: "Could not read gifs.json" });
  }
});

// Endpoint to get preset titles from titles.js
app.get("/get-preset-titles", (req, res) => {
  const titlesPath = path.join(__dirname, "database/titles.js");
  try {
    // titles.js should export an array of strings
    const titles = require(titlesPath);
    res.json(titles);
  } catch (err) {
    res.status(500).json({ error: "Could not read titles.js" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
