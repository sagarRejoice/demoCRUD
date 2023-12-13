const express = require("express");
const {
	createJob,
	getAllJobs,
	deleteJob,
	getJob,
	updateJob,
} = require("../controllers/jobs");
const auth = require("../middleware/authentication");

const router = express.Router();

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
