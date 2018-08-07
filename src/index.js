const config = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const Promise = require("bluebird");
const router = require("./router/index");

// globalne a mongoose knihovne nastavi Bluebird promisy - prozatim jsou lepsi nez nativni NodeJS Promisy
global.Promise = Promise;
mongoose.Promise = Promise;

// Nejaka nastaveni pro lepsi debugovani
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
  Promise.longStackTraces();
}

var db = mongoose.connection;

// pokud se podari pripojit do db tak muzem nakonfigurovat a nakopnout Express
db.once("connected", function() {
  console.log("DB is connected");

  const app = express();

  // express middleware a router viz https://expressjs.com/en/4x/api.html#router
  // misto app.get("/" ...) pouziju router - flexibilnejsi pouziti, router je umisten v router/index
  app.use("/api", router);

  app.listen(config.port, () => {
    console.log(`Web server listening on port ${config.port}`);
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
