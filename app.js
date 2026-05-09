import mqtt from "mqtt";

const client = mqtt.connect("mqtt://192.168.1.80:1883");

client.on("connect", () => {
  client.publish("esp32/presence", "Hello From NodeJS!");
  client.end();
  // client.subscribe("presence", (err) => {
  //   if (!err) {
  //     client.publish("presence", "Hello mqtt");
  //   }
  // });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
