const express = require("express");
const {getAllLists,getList,createList,deleteList,updateList,} = require("../controllers/jobs");

const router = express.Router();

router.route("/").post(createList).get(getAllLists);
router.route("/:id").patch(updateList).get(getList).delete(deleteList);

module.exports = router;