const express = require("express");
const app = express();
const mongoose = require("mongoose");
const model = require("./model/product.model");
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ name: "Arjun" });
});
app.get("/api/product", async (req, res) => {
  try {
    const product = await model.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/api/product/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const product = await model.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// now we are going to update the product!!
app.put("/api/product/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const product = await model.findByIdAndUpdate(id, req.body);
    // product.name = name;
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// now we are going to delete a product

app.delete("/api/product/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const product = await model.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/api/product", async (req, res) => {
  try {
    const product = await model.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
mongoose
  .connect(
    "mongodb+srv://arjung7751:k80DbSMy5ycc0r2h@backenddb.tuyv5vk.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("connected to the database");
    app.listen(5000, () => {
      console.log("server listning at port 5000");
    });
  })
  .catch(() => {
    console.log("connection failed");
  });
