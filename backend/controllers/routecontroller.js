const resistrationform = require("../models/resistrationform.js");

// Create Company
const createCompany = async (req, res) => {
  try {
    const company = await TransportCompany.create(req.body);

    res.status(201).json({
      success: true,
      message: "Company Registered Successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCompany,
};