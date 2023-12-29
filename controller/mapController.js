const axios = require("axios");
const error = require('../middleware/errorHandling')
const dotenv = require("dotenv").config();
const geo = async (req, res) => {
  try {
    const apikey = process.env.GMAPI;
    const { latitude, longitude } = req.body;
    if (!apikey) {
      res.status(500).json({ message: "api key not working good!" });
    }
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "lat and lon not found" });
    }
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apikey}`;

    const response = await axios.get(apiUrl);
    if (response.data.status === "OK") {
      const address = response.data.result[0].formatted_address;
      res.json({ address });
    } else {
      res.status(400).json({ message: "address not found" });
    }
  } catch (err) {
    res.status(500).json({ err: "server error", err });
  }
};

module.exports = geo;
