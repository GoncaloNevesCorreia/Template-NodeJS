import express from "express";
import mqtt from "mqtt";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const TOPIC_EAT = "virtual_pet/eat";
const TOPIC_SLEEP = "virtual_pet/sleep";
const TOPIC_PLAY = "virtual_pet/play";

const TOPIC_GET_LATEST = "virtual_pet/get_latest";
const TOPIC_STATS = "virtual_pet/stats";

const app = express();
const PORT = process.env.PORT || 8080;

const client = mqtt.connect("mqtt://localhost:1883");

let webClients = [];

client.on("connect", function () {
  console.log("Connected to MQTT broker");

  client.subscribe(TOPIC_STATS);
});

client.on("message", (topic, message) => {
  if (topic === TOPIC_STATS) {
    console.log("Stats received:", message);

    webClients.forEach((res) => {
      res.write(`event: stats\n`);
      res.write(`data: ${message.toString("base64")}\n\n`);
    });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, "public")));

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  webClients.push(res);

  client.publish(TOPIC_GET_LATEST, "");

  req.on("close", () => {
    webClients = webClients.filter((client) => client !== res);
  });
});

RegisterAction("/eat", TOPIC_EAT);
RegisterAction("/play", TOPIC_PLAY);
RegisterAction("/sleep", TOPIC_SLEEP);

app.listen(PORT, function () {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

function RegisterAction(endpoint, topic) {
  app.post(endpoint, (req, res) => {
    client.publish(topic, "", (error, packet) => {
      if (!error) {
        res.status(200).send(`Action {${topic}} received!`);
      }

      res.status(500).send(JSON.stringify(error));
    });
  });
}
