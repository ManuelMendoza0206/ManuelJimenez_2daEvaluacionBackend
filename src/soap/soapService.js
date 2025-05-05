const express = require("express");
const soap = require("soap");
const axios = require("axios");
const fs = require("fs");
require('dotenv').config();

const app = express();
const PORT_SOAP = process.env.SOAP_PORT || 3002;


const wsdlPath = "./src/soap/actor.wsdl";
const wsdlXml = fs.readFileSync(wsdlPath, "utf8");


const serviceObject = {
  ActorService: {
    ActorPort: {

      getAllActors: async function (args, callback) {
        try {

          const response = await axios.get("http://localhost:3001/api/actors");
          const actors = response.data;

          callback(null, { response: { actor: actors } });
        } catch (error) {
          console.error("Error en getAllActors:", error.message);
          callback(error);
        }
      },

      getActorStats: async function (args, callback) {
        try {

          const response = await axios.get("http://localhost:3001/api/actors");
          const actors = response.data;
          if (!actors || actors.length === 0) {
            return callback(null, { response: { total: 0, minActorId: 0, maxActorId: 0, avgActorId: 0.0 } });
          }
     
          const total = actors.length;
          const actorIds = actors.map(actor => actor.actor_id);
          const minActorId = Math.min(...actorIds);
          const maxActorId = Math.max(...actorIds);
          const avgActorId = actorIds.reduce((acc, cur) => acc + cur, 0) / total;
          callback(null, { response: { total, minActorId, maxActorId, avgActorId: parseFloat(avgActorId.toFixed(2)) } });
        } catch (error) {
          console.error("Error en getActorStats:", error.message);
          callback(error);
        }
      }
    }
  }
};


app.listen(PORT_SOAP, () => {
  console.log(`Servicio SOAP corriendo en http://localhost:${PORT_SOAP}/wsdl`);
});

soap.listen(app, "/wsdl", serviceObject, wsdlXml);