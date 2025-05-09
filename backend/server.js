const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 3001;
const DEV_MODE = process.env.DEV_MODE === "true";
const HOST = DEV_MODE ? "localhost" : "3.17.187.202";

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
  console.log("get state is getting hit");
  const statePath = path.join(__dirname, "database/state.json");
  try {
    const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: "Could not read state.json" });
  }
});

// Endpoint to update the title field in state.json
app.post("/update-title", (req, res) => {
  console.log("updating title");
  const { title } = req.body;
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "Invalid title" });
  }
  const statePath = path.join(__dirname, "database/state.json");
  console.log(statePath);
  let state;
  try {
    state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  } catch (err) {
    return res.status(500).json({ error: "Could not read state.json" });
  }
  state.title = title;
  try {
    fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
    res.json({ success: true, title });
  } catch (err) {
    res.status(500).json({ error: "Could not write to state.json" });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
