import { pool } from "../config/database.js";
import { format, differenceInYears, differenceInMonths, differenceInDays } from "date-fns";

// Helper function to calculate remaining time
const getRemaining = (inputDate) => {
  const startDate = new Date();
  const endDate = new Date(inputDate);

  return {
    years: differenceInYears(endDate, startDate),
    months: differenceInMonths(endDate, startDate) % 12,
    days: differenceInDays(endDate, startDate) % 30,
  };
};

// Helper function to format dates
const formatDate = (date) => format(date, "MMM dd, yyyy");

// Helper function to format time by removing colons
const formatTime = (time) => parseInt(time.replace(/:/g, "").slice(0, 4));

// Get all events
const getEvents = async (req, res) => {
  const query = `SELECT id, title, date, time, location, image FROM events;`;

  try {
    const results = await pool.query(query);
    const data = results.rows.map((row) => ({
      ...row,
      time: formatTime(row.time),
      date: formatDate(row.date),
      remaining: getRemaining(row.date),
    }));

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  const { event_id } = req.params;
  const query = `SELECT id, title, date, time, location, image FROM events WHERE id = $1;`;

  try {
    const result = await pool.query(query, [event_id]);
    const row = result.rows[0];

    const data = {
      ...row,
      time: formatTime(row.time),
      date: formatDate(row.date),
      remaining: getRemaining(row.date),
    };

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get events by location ID
const getEventsByLocationId = async (req, res) => {
  const { location_id } = req.params;
  const query = `SELECT * FROM events WHERE location = $1;`;

  try {
    const results = await pool.query(query, [parseInt(location_id)]);
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getEvents,
  getEventById,
  getEventsByLocationId,
};
