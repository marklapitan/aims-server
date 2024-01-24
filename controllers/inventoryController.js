import Inventory from "../models/Inventory.js";
import { create_inventory, get_inventory, update_inventory, delete_inventory } from "../utils/payloadVerifier.js";

async function create(req, res, next) {
  console.log(req.body)
  const isRequestValid = create_inventory(req, res, next)
  if(!isRequestValid) return res.status(400).send()
  const newInventory = await Inventory.create(req.body)
  res.status(201).send(newInventory)
}

async function get(req, res, next) {
  if(!get_inventory(req.params.id)) return res.status(400).send()
  const inventory = await Inventory.findById(req.params.id)
  res.status(200).send(inventory)
}

async function list(req, res, next) {
  const inventories = await Inventory.find({}).lean()
  res.status(200).send(inventories)
}

async function update(req, res, next) {
  const {id, payload } = req.body
if(!update_inventory(id)) return res.status(400).send()
  const updated_inventory = await Inventory.findOneAndUpdate({_id: id}, {...payload}, {new: true})
  res.status(200).send(updated_inventory)
}

async function _delete(req, res, next) {
  if(!delete_inventory(req.params.id)) return res.status(400).send()
  await Inventory.findOneAndDelete({_id: req.params.id})
  res.status(200).send()
}

export default {
  create,
  get,
  list,
  update,
  _delete
}