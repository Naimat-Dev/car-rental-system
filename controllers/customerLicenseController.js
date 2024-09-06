import db from "../config/db.js"; // Import database configuration

// Function to create a new customer license
export const createCustomerLicense = async (req, res) => {
  try {
    const { customerId, drivingLicenseNumber, licenseExpiryDate } = req.body;

    if (!customerId || !drivingLicenseNumber || !licenseExpiryDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [id] = await db("customerLicense")
      .insert({
        customerId,
        drivingLicenseNumber,
        licenseExpiryDate,
      })
      .returning("id");

    res.status(201).json({
      message: "Customer license created successfully",
      id,
      customerId,
      drivingLicenseNumber,
      licenseExpiryDate,
    });
  } catch (error) {
    console.error("Error creating customer license:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Function to get all customer licenses
export const getCustomerLicenses = async (req, res) => {
  try {
    const licenses = await db("customerLicense").select("*");

    res.status(200).json({
      message: "Customer licenses fetched successfully",
      data: licenses,
    });
  } catch (error) {
    console.error("Error fetching customer licenses:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Function to get a customer license by ID
export const getCustomerLicenseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const license = await db("customerLicense").where({ id }).first();

    if (!license) {
      return res.status(404).json({ error: "Customer license not found" });
    }

    res.status(200).json({
      message: "Customer license fetched successfully",
      data: license,
    });
  } catch (error) {
    console.error("Error fetching customer license by ID:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Function to update a customer license by ID
export const updateCustomerLicenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, drivingLicenseNumber, licenseExpiryDate } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    if (!customerId && !drivingLicenseNumber && !licenseExpiryDate) {
      return res.status(400).json({ error: "At least one field is required for update" });
    }

    const updatedRows = await db("customerLicense")
      .where({ id })
      .update({
        customerId,
        drivingLicenseNumber,
        licenseExpiryDate,
      })
      .returning("*");

    if (updatedRows.length === 0) {
      return res.status(404).json({ error: "Customer license not found" });
    }

    res.status(200).json({
      message: "Customer license updated successfully",
      data: updatedRows[0],
    });
  } catch (error) {
    console.error("Error updating customer license:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Function to delete a customer license by ID
export const deleteCustomerLicenseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const deletedRows = await db("customerLicense").where({ id }).del();

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Customer license not found" });
    }

    res.status(200).json({ message: "Customer license deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer license:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
