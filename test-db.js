const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "dbappdevg2pasyente"
});

connection.connect(err => {
  if (err) {
    console.error("Connection failed:", err);
  } else {
    console.log("Connected to MySQL!");
  }
  connection.end();
});
