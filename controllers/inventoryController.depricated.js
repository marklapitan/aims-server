import Inventory from "../models/Inventory.js";
import jwt from "jsonwebtoken";
// import getTokenFrom from "../utils/getTokenFrom.js";
import config from "../utils/config.js";
import User from "../models/User.js";

async function getInventory(req, res, next) {
  try {
    // Temporarily using a mock user ID for testing
    const decodedToken = { id: "65abd8269681895bc2f29664" };
    console.log("Decoded Token:", decodedToken); // Add this line for debugging

    const inventory = await Inventory.find({
      userId: decodedToken.id,
    }).populate("userId", { username: 1, name: 1 });
    console.log("Fetched Inventory:", inventory); // Add this line for debugging

    return res.status(200).json(inventory);
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    return res.status(500).json({ error: "Failed to fetch inventory data" });
  }
}

async function getInventoryInfo(_, res, next) {
  try {
    const inventory = await Inventory.find({});
    const inventoryCount = await inventory.length;
    return res.send(`<p>inventory App have ${inventoryCount} inventory</p>`);
  } catch (error) {
    next(error);
  }
}

async function getInventories(req, res, next) {
  const id = req.params.id;

  try {
    const inventory = await Inventory.findById(id);
    if (!inventory)
      return res.status(404).json({ message: " Inventory not found!" });
    return res.json(inventory);
  } catch (error) {
    next(error);
  }
}

async function deleteInventory(req, res, next) {
  const id = req.params.id;
  const decodedToken = jwt.verify(getTokenFrom(req), config.JWT_SECRET);

  try {
    const user = await User.findById(decodedToken.id);
    const inventory = await Inventory.findByIdAndDelete(id);

    user.inventory = user.inventories.filter(
      (inventoryId) => inventoryId.toString() !== inventory._id.toString()
    );
    await user.save();
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function createInventory(req, res, next) {
  const body = req.body;

  try {
    const decodedToken = jwt.verify(getTokenFrom(req), config.JWT_SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);
    if (
      !body.product ||
      !body.price ||
      !body.qty ||
      !body.threshold ||
      !body.expiryDate
    ) {
      return res
        .status(400)
        .json({ error: "One or more required fields are missing" });
    }
    if (
      !body.product ||
      !body.price ||
      !body.qty ||
      !body.threshold ||
      !body.expiryDate
    ) {
      return res
        .status(400)
        .json({ error: "One or more required fields are missing" });
    }
    if (!body.product) {
      return res.status(400).json({ error: "Product field is missing" });
    }
    if (!body.price) {
      return res.status(400).json({ error: "Price field is missing" });
    }
    if (!body.qty) {
      return res.status(400).json({ error: "Qty field is missing" });
    }
    if (!body.threshold) {
      return res.status(400).json({ error: "Threshold field is missing" });
    }
    if (!body.expiryDate) {
      return res.status(400).json({ error: "Expiry date field is missing" });
    }

    const inventory = new Inventory({
      product: body.product,
      price: body.price,
      qty: body.qty,
      threshold: body.threshold,
      userId: user.id,
    });

    const savedInventory = await inventory.save();

    user.inventory = user.inventory.concat(savedInventory._id);
    await user.save();

    return res.status(201).json(savedInventory);
  } catch (error) {
    next(error);
  }
}

async function updateInventory(req, res, next) {
  const id = req.params.id;
  const { product, price, qty, threshold, expiryDate } = req.body;
  const inventory = {
    product,
    price,
    qty,
    threshold,
    expiryDate,
  };

  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(id, inventory, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!updatedInventory)
      return res.status(404).json({ error: "Inventory not found!" });

    return res.status(200).json(updatedInventory);
  } catch (error) {
    next(error);
  }
}


export default {
  getInventoryInfo,
  getInventories,
  getInventory,
  deleteInventory,
  createInventory,
  updateInventory,
};
