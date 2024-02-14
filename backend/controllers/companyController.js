import Company from "../models/companyModel";
import mongoose from "mongoose";

// get all companies
const getCompanies = async (req, res) => {
	const companies = await Company.find({}).sort({ createdAt: -1 });

	res.status(200).json(companies);
};

// get a single Company
const getCompany = async (req, res) => {
	const {
		query: { id },
	} = req;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such Company" });
	}

	const company = await Company.findById(id);

	if (!company) {
		return res.status(404).json({ error: "No such Company" });
	}

	res.status(200).json(company);
};

// create a new Company
const createCompany = async (req, res) => {
	const { title } = req.body;

	let emptyFields = [];

	if (!title) {
		emptyFields.push("title");
	}
	// if (!load) {
	// 	emptyFields.push("load");
	// }
	// if (!reps) {
	// 	emptyFields.push("reps");
	// }
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: "Please fill in all fields", emptyFields });
	}

	// add to the database
	try {
		const company = await Company.create({
			title,
			...req.body,
			// load, reps
		});
		res.status(200).json({ result: company, status: "success" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a Company
const deleteCompany = async (req, res) => {
	const { id } = req.query;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such Company" });
	}

	const company = await Company.findOneAndDelete({ _id: id });

	if (!company) {
		return res.status(400).json({ error: "No such Company" });
	}

	res.status(200).json(company);
};

// update a Company
const updateCompany = async (req, res) => {
	const { id } = req.query;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such Company" });
	}

	const company = await Company.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		},
	);

	if (!company) {
		return res.status(400).json({ error: "No such Company" });
	}

	res.status(200).json(company);
};

module.exports = {
	getCompanies,
	getCompany,
	createCompany,
	deleteCompany,
	updateCompany,
};