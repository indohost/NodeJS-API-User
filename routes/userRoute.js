import express from "express";
import {
  create,
  fetch,
  update,
  destroy,
} from "../app/controller/userController.js";

const route = express.Router();

route.get("/fetch", fetch);
route.post("/create", create);
route.put("/update/:id", update);
route.delete("/destroy/:id", destroy);

export default route;
