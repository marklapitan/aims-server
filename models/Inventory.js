import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true
  }, 
  threshold: {
    type: Number,
    required: true
  },
  expiration: {
    type: Date,
    required: true,
  },
  // status: {
  //   type: String,
  //   enum: ['--', 'low-stock' , 'out-of-stock' , 'in-stock'],
  //   required: true
  // } 
});

// inventorySchema.set("toJSON", {
//   transform: (_document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;
