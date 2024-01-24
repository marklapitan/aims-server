import User from "../models/User.js";

async function list(req, res) {
  const users = await User.find({}).populate("inventory", {
    content: 1,
    important: 1,
  });
  return res.json(users);
}

export default {
  list,
};
