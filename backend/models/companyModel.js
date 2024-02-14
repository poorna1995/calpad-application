const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const companySchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		website: {
			type: String,
		},
		description: { type: String },
		short_description: { type: String },
		products: {
			type: Array,
		},
	},
	{ timestamps: true },
);

module.exports =
	mongoose.models.Company || mongoose.model("Company", companySchema);