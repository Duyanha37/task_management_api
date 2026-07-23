const Router = require("express").Router();
const { getAllCategories, getCatagoriesByID, createCategory, updateCategory, deleteCategory } = require("../controllers/catagoriesControllers");

Router.get("/", getAllCategories);

Router.get("/:id", getCatagoriesByID);

Router.post("/", createCategory);

Router.put("/:id", updateCategory);

Router.delete("/:id", deleteCategory);

module.exports = Router();