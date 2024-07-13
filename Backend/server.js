const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Dish = require("./models/dishModel");
const cors = require("cors");
const http = require('http');
require("dotenv").config();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.URI)
  .then((res) => {
    console.log("connected");
  })
  .catch((e) => {
    console.log(e.message);
  });

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//create api

app.post("/dishes", async (req, res) => {
  const { dishName, imageUrl, isPublished } = req.body;
  try {
    const { dishName, imageUrl, isPublished } = req.body;

    const newDish = await Dish.create({ dishName, imageUrl, isPublished });

    res.json(newDish);
  } catch (e) {
    console.log(e.message);
  }
});

//update isPublished api

app.patch("/dishes/:id", async (req, res) => {
  const dishId = req.params.id;
  
  try {
    // Check if the provided ID is a valid ObjectId
    if (!mongoose.isValidObjectId(dishId)) {
      return res.status(400).json({ error: "Invalid dish ID" });
    }

    const dish = await Dish.findById(dishId);

    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    dish.isPublished = !dish.isPublished;

    const updatedDish = await dish.save();
    io.emit('dishUpdated', updatedDish);
    res.status(200).json(updatedDish);
  } catch (error) {
    console.error("Error toggling isPublished status:", error);
    res.status(500).json({ error: "Server error" });
  }

});

//get dishes api
app.get("/dishes", async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(process.env.PORT || 8000, () => {
  console.log("server started");
});
