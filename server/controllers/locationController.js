import { pool } from "../config/database.js";

// Fetch all locations
const getLocations = async (req, res) => {
  const query = "SELECT * FROM locations";
  try {
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch location by ID
const getLocationById = async (req, res) => {
  const { location_id } = req.params;
  const query = "SELECT * FROM locations WHERE id = $1";
  
  const parsedId = parseInt(location_id, 10);
  if (isNaN(parsedId)) {
    return res.status(400).json({ error: "Invalid location ID" });
  }

  try {
    const { rows } = await pool.query(query, [parsedId]);
    if (!rows.length) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getLocations, getLocationById };
