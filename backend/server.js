const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const app = express();
const PORT = 3001;
const DEV_MODE = process.env.DEV_MODE === "true";
const HOST = DEV_MODE ? "localhost" : "0.0.0.0";

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
try {
  fs.writeFileSync(
    path.join(__dirname, "database/state.json"),
    JSON.stringify(defaultState, null, 2)
  );
  console.log("Default state written to state.json");
} catch (err) {
  console.error("Error writing state.json:", err);
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
  if (typeof imageId !== "string" || !imageId.trim()) {
    return res.status(400).json({ error: "Invalid imageId" });
  }
  const statePath = path.join(__dirname, "database/state.json");
  const gifsPath = path.join(__dirname, "database/gifs.json");
  let imageInfo;
  try {
    const gifs = JSON.parse(fs.readFileSync(gifsPath, "utf8"));
    imageInfo = gifs.find((gif) => gif.id === imageId);
    if (!imageInfo) {
      return res.status(400).json({ error: "Image ID not found in gifs.json" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Could not read gifs.json" });
  }
  const newState = {
    title,
    subtitle,
    image: {
      id: imageInfo.id,
      url: imageInfo.url,
      label: imageInfo.label,
    },
  };
  try {
    fs.writeFileSync(statePath, JSON.stringify(newState, null, 2));
    res.json({ success: true, state: newState });
  } catch (err) {
    res.status(500).json({ error: "Could not write to state.json" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
