import express from "express";
import inventoryController from "../controllers/inventoryController.js";

const inventoryRouter = express.Router();

inventoryRouter.post('/create', inventoryController.create)
inventoryRouter.get('/list', inventoryController.list)
inventoryRouter.get('/:id', inventoryController.get)
inventoryRouter.patch('/update', inventoryController.update)
inventoryRouter.delete('/delete/:id', inventoryController._delete)

export default inventoryRouter;
