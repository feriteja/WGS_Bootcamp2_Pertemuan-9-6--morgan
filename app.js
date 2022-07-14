// const http = require("http");
const fs = require("fs");
const express = require("express");
var morgan = require("morgan");

var expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(expressLayouts);

app.use(express.static("public"));
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.get("/", (req, res) => {
  contacts = [
    {
      name: "user1",
      email: "user1@mail.com",
    },
    {
      name: "user2",
      email: "user2@mail.com",
    },
    {
      name: "user3",
      email: "user3@mail.com",
    },
    {
      name: "user4",
      email: "user4@mail.com",
    },
  ];

  res.render("index", {
    name: "Feri Teja Kusuma",
    title: "WEBSERVER - EJS",
    contacts,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/product/:id", (req, res) => {
  console.log(req.query.category);
  res.send(
    `product id: ${req.params.id} <br /> category id: ${req.query.category} `
  );
});

// app.get("/product/:id", (req, res) => {
//   res.send(`product id: ${req.params.id}`);
// });

app.get("/product/:id/category/:idcat", (req, res) => {
  res.send(
    `product id: ${req.params.id} <br /> category id: ${req.params.idcat} `
  );
});

app.use("/", (req, res) => {
  res.status(404).render("notFound", { name: "feri" });
});

app.listen(port, () => {
  console.log(`your server listening on port ${port}`);
});

// http
//   .createServer((req, res) => {
//     const url = req.url;

//     res.writeHead(200, { "Content-type": "text/html" });

//     if (url === "/about") {
//       goToPage("./about.html", res);
//     } else if (url === "/contact") {
//       goToPage("./contact.html", res);
//     } else {
//       goToPage("./index.html", res);
//     }
//   })
//   .listen(3000, () => {
//     console.log("server run on port 3000");
//   });
