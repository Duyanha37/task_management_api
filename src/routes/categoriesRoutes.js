const router = require("express").Router();
const auth = require("../middlewares/authorization");
const { getCategories, getCategoriesByID, createCategory, updateCategory, deleteCategory } = require("../controllers/categoriesControllers");

router.get("/", auth, getCategories);

router.get("/:id", auth, getCategoriesByID);

router.post("/", auth, createCategory);

router.put("/:id", auth, updateCategory);

router.delete("/:id", auth, deleteCategory);

module.exports = router;