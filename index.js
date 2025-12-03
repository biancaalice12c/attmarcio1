import express from "express"
import cors from "cors"
import mysql from "mysql2"

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } = process.env

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
    const selectCommand = "SELECT (name, email, age) FROM marciomarcal_02mc"

    database.query(selectCommand, (error, users) => {
        if (error) {
            console.log(error)
            return
        }
        response.json(users)
    })

   // (people)
})


app.post("/login", (request, response) => {

    // pegar as informações que vem do frontend
    const { email, password } = request.body.user
  
    // buscar no banco o usuário pelo email
    const selectCommand = "SELECT * FROM marciomarcal_02ma WHERE email = ?"
    database.query(selectCommand, [email], (error, user) => {
      if (error) {
        console.log(error)
        return
      }
  
      if (user.length === 0 || user[0].password !== password) {
        response.json("Usuário ou senha incorretos!")
        return
      }

      response.json({ id: user[0].id, name: user[0].name })

    })
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