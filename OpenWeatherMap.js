const axios = require('axios');

async function getNearestCity(latitude, longitude) {
    const apiKey = '4ae30ec13c65cf7d994f133534d253e7';
    const apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
  
    try {
      const response = await axios.get(apiUrl);
      const { name, country } = response.data[0];
      const city = `${name}, ${country}`;
      return city;
    } catch (error) {
      console.error('Error retrieving nearest city:', error);
      return null;
    }
  }

  module.exports = {
    getNearestCity
  };
  