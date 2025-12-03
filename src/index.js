import express from "express"
import cors from "cors"
import persons from "./persons.js"
import mysql from "mysql2"

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

// GET, POST, PATCH, PUT, DELETE
app.get("/", (request, response) => {
  response.json(persons)
})

app.post("/cadastrar", (request, response) => {
  const { name, email, age, nickname, password } = request.body.user

  // cadastrar o usuário no banco de dados
  const insertCommand = `
  INSERT INTO marciomarcal_02ma(name, email, age, nickname, password)
  VALUES (?, ?, ?, ?, ?)
`

database.query(insertCommand, [name, email, age, nickname, password])
if(error){
console.log(erro)
    return
}

  response.status(201).json({ message: "Usuário cadastrado com sucesso!" })
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}!`)
})

const database = mysql.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "web_02ma",
    connectionLimit: 10
  })