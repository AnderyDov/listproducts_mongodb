import express from "express";
import mongodb from "mongodb";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

let __dirname = dirname(fileURLToPath(import.meta.url));
__dirname = __dirname.split("back")[0];

let server = express();

const mongoClient = new mongodb.MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true,
});

server.use(bodyParser.json());

server.use(express.static(path.resolve(__dirname, "front/build")));

mongoClient.connect(async (err, mongo) => {
  if (!err) {
    let coll = mongo.db("userlistprod").collection("users");
    console.log("connect");

    server.get("/", async (req, res) => {
      res.sendFile(__dirname + "front/build/index.html");
    });

    server.post("/registration", async (req, res) => {
      let user = await coll.findOne({ name: req.body.name });

      if (user !== null) {
        res.send(JSON.stringify("этот логин занят"));
      } else {
        await coll.insertOne({
          name: req.body.name,
          pass: req.body.pass,
          list: {},
        });
        res.send({ name: req.body.name, pass: req.body.pass, list: {} });
      }
    });

    server.post("/login", async (req, res) => {
      let user = await coll.findOne({ name: req.body.name });

      if (user !== null) {
        if (user.pass === req.body.pass) {
          res.send(user);
        } else {
          res.send(JSON.stringify("неверный пароль"));
        }
      } else {
        res.send(JSON.stringify("нет такого юзера"));
      }
    });

    server.post("/add", async (req, res) => {
      await coll.updateOne(
        { name: req.body.name },
        { $set: { list: req.body.list } }
      );
    });

    server.post("/del", async (req, res) => {
      await coll.updateOne(
        { name: req.body.name },
        { $set: { list: req.body.list } }
      );
    });

    server.use((req, res) => {
      res.send("error");
    });
  } else {
  }
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
