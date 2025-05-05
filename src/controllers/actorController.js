const db = require('../config/db');

const getAllActors = (req, res) => {
  db.query('SELECT actor_id, first_name, last_name FROM actor', (err, results) => {
    if (err) {
      console.error("Error al obtener actores:", err.message);
      res.status(500).json({ error: 'Error en el servidor' });
      return;
    }
    res.json(results);
  });
};

module.exports = {
  getAllActors,
};