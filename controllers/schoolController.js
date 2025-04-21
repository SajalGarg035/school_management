const { pool } = require("../config/db");
const {
  validateSchoolInput,
  validateCoordinates,
} = require("../utils/validation");


// This function calculates the distance between 
// two geographical points using the Haversine formula.
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};

// This function adds a 
// new school to the database.
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const validation = validateSchoolInput({
      name,
      address,
      latitude,
      longitude,
    });

    if (!validation.isValid) {
      return res
        .status(400)
        .json({ success: false, errors: validation.errors });
    }
    const [existingSchoolByName] = await pool.query(
      "SELECT * FROM schools WHERE name = ?",
      [name]
    );

    if (existingSchoolByName.length > 0) {
      return res.status(400).json({
        success: false,
        message: "A school with this name already exists",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, parseFloat(latitude), parseFloat(longitude)]
    );

    res.status(201).json({
      success: true,
      message: "School added successfully",
      schoolId: result.insertId,
    });
  } 
  catch (error) {
    console.error("Error adding school:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// This function lists all schools and 
// calculates their distance from the user's location.


// It sorts the schools by distance 
// and returns them in the response.

const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const validation = validateCoordinates(latitude, longitude);
    if (!validation.isValid) {
      return res
        .status(400)
        .json({ success: false, errors: validation.errors });
    }

    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);

    const [schools] = await pool.query("SELECT * FROM schools");
    const schoolsWithDistance = schools.map((school) => {
      const distance = calculateDistance(
        userLat,
        userLng,
        school.latitude,
        school.longitude
      );
      return { ...school, distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      count: schoolsWithDistance.length,
      schools: schoolsWithDistance,
    });
  }
  catch (error) {
    console.error("Error listing schools:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { addSchool, listSchools };
