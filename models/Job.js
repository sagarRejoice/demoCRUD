const { default: mongoose } = require("mongoose");

const JobSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			trim: true,
			required: [true, "Please provide company name."],
			maxlength: 50,
		},
		position: {
			type: String,
			trim: true,
			required: [true, "Please provide position."],
			maxlength: 100,
		},
		status: {
			type: String,
			trim: true,
			enum: ["interview", "declined", "pending"],
			default: "pending",
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide user"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
