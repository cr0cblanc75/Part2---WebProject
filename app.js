import express from "express";
import topics from "./data/topics.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Try /item, /item/next, /item/prev, /item/id");
});

let currentIndex = 0;

// GET /item – return current item
app.get("/item", (req, res) => {
    res.json(topics[currentIndex]);
});

// GET /item/next – next item (loop)
app.get("/item/next", (req, res) => {
    currentIndex = (currentIndex + 1) % topics.length;
    res.json(topics[currentIndex]);
});

// GET /item/prev – previous item (loop)
app.get("/item/prev", (req, res) => {
    currentIndex = (currentIndex - 1 + topics.length) % topics.length;
    res.json(topics[currentIndex]);
});

// GET /item/id – return an item by index
app.get("/item/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 0 || id >= topics.length) {
        return res.status(404).json({ error: "Index invalide" });
    }

    currentIndex = id;
    res.json(topics[id]);
});

app.listen(port, () => {
    console.log(`Ready on http://localhost:${port}`);
});
