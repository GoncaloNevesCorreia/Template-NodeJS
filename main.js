import express from "express";
import mqtt from "mqtt";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const PORT = process.env.PORT || 8080;

const client = mqtt.connect("mqtt://192.168.1.80:1883");

let webClients = [];

client.on("connect", function () {
  console.log("Connected to MQTT broker");

  client.subscribe("virtual_pet/stats");
});

client.on("message", (topic, message) => {
  if (topic === "virtual_pet/stats") {
    // const statsData = {
    //   health: message.readUInt8(0),
    //   hunger: message.readUInt8(1),
    //   sleep: message.readUInt8(2),
    //   fun: message.readUInt8(3),
    // };

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
  // Keep the connection open with SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Add this browser connection to our list
  webClients.push(res);

  client.publish("virtual_pet/get_latest", "");

  // If the user closes the browser tab, remove them from the list
  req.on("close", () => {
    webClients = webClients.filter((client) => client !== res);
  });
});

app.post("/eat", (req, res) => {
  client.publish("virtual_pet/eat", "", (error, packet) => {
    if (!error) {
      console.log("Someone triggered the /eat endpoint!");

      res.status(200).send("Action received!");
    }

    res.status(500).send(JSON.stringify(error));
  });
});

app.post("/play", (req, res) => {
  client.publish("virtual_pet/play", "");

  console.log("Someone triggered the /play endpoint!");

  res.status(200).send("Action received!");
});

app.post("/sleep", (req, res) => {
  client.publish("virtual_pet/sleep", "");

  console.log("Someone triggered the /sleep endpoint!");

  res.status(200).send("Action received!");
});

app.listen(PORT, function () {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
