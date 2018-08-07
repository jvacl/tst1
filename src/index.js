const config = require("./config");
const express = require("express");
var mongoose = require("mongoose");
var Promise = require("bluebird");

// globalne a mongoose knihovne nastavi Bluebird promisy - prozatim jsou lepsi nez nativni NodeJS Promisy
global.Promise = Promise;
mongoose.Promise = Promise;

// Nejaka nastaveni pro lepsi debugovani
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
  Promise.longStackTraces();
}

var db = mongoose.connection;

// pokud se podari pripojit do db tak muzem nakopnout a nakonfigurovat Express
db.once("connected", function() {
  console.log("DB is connected");

  const app = express();

  app.listen(config.port, () => {
    console.log(`Web server listening on port ${config.port}`);
  });
  
  app.get("/", (req, res) => {
    res.send("\n\nHello, world!\n\n");
  });
});

// Handle the DB errors
db.on("error", err =>
  console.error(`Failed to connect to DB ${config.db} on startup `, err)
);
db.on("disconnected", () =>
  console.log(`Mongoose default connection to DB : ${config.db} disconnected`)
);

// pripojit do db
try {
  mongoose.connect(
    config.dbConnectionString,
    {
      user: config.dbUser,
      pass: config.dbPassword,
      useNewUrlParser: true
    }
  );

  console.log(`Trying to connect to DB ${config.dbConnectionString}`);
} catch (err) {
  console.log("Sever initialization failed ", err.message);
}
