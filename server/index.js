const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1010",
  database: "banco",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
        db.query(
          "INSERT INTO usuarios (email, password) VALUE (?,?)",
          [email, password],
          (error, response) => {
            if (err) {
              res.send(err);
            }

            res.send({ msg: "Cadastrado com sucesso"})
          }
        );
    } else {
      res.send({ msg: "Usuário já cadastrado"})
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ? AND password = ?", 
  [email, password], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
          res.send({msg: "Usuário logado"});
      } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});

/* app.get('/', (req, res) =>{
  db.query(
    "INSERT INTO usuarios (email, password) VALUES ('jose@gmail.com', '12345678')", (err, result) => {
      if(err){
        console.log(err)
      }
    }
    );
});

app.get('/', (req, res) =>{
  res.send("Hellooo")
}) */

app.listen(3001, () => {
    console.log("rodando na porta 3001");
  });