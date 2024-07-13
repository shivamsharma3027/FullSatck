const mongoose = require("mongoose");
const {v4:uuidv4}=require("uuid")
const dishSchema = new mongoose.Schema({
 dishId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  dishName: { type: String, required: true },
  imageUrl: { type: String },
  isPublished: { type: Boolean, required: true, default: false },
});

const Dish=mongoose.model('Dish',dishSchema)
module.exports=Dish;
