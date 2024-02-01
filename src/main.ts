import express from "express";
import { db, firestore } from "../banco_de_dados/firebase";

const app = express();

// TODO: Inserir no código para utilização do json na requisição
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bem vindo a minha primeira API");
});

app.post("/usuario", async (req, res) => {
  const nome = req.body.nome;

  try {
    const docRef = await firestore.addDoc(
      firestore.collection(db, "usuarios"),
      {
        nome: nome,
      }
    );
    //TODO: Adicionar textos de apoio para a melhor leitura das  respostas
    res.send("Usuario adicionado com sucesso: " + docRef.id);
  } catch (e) {
    console.log("Erro ao adicionar usuário: ", e);

    res.status(500).send(e);
  }
});

app.listen(3000, function () {
  console.log("Servidor rodando em http://localhost:3000");
});
