import express from "express";
import { db, firestore } from "../banco_de_dados/firebase";
import cors from "cors";

const app = express();

// TODO: Inserir no código para utilização do json na requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.get("/", (req, res) => {
  return res.json("Bem vindo a minha primeira API");
});

app.post("/formulario", async (req, res) => {
  const nome = req.body.nome;
  const telefone = req.body.telefone;
  const email = req.body.email;
  const descricao = req.body.descricao;

  console.log(req.body);
  try {
    const docRef = await firestore.addDoc(
      firestore.collection(db, "formulario"),
      {
        nome: nome,
        telefone: telefone,
        email: email,
        descricao: descricao,
      }
    );

    res.send("Resposta enviada com sucesso: " + docRef.id);
  } catch (e) {
    console.log("Erro ao enviar resposta: ", e);
    res.status(500).send(e);
  }
});

app.get("/listarFormulario", async (req, res) => {
  try {
    const formulario = await firestore.getDocs(
      firestore.collection(db, "formulario")
    );

    const formularioLista = formulario.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.send(formularioLista);
  } catch (e) {
    console.log("Erro ao listar formulário: " + e);

    res.status(500).send("Erro ao listar formulário: " + e);
  }
});

app.put("/atualizarFormulario/:id", async (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;

  try {
    await firestore.updateDoc(firestore.doc(db, "formulario", id), {
      nome: nome,
    });
    res.send("Formulário atualizado com sucesso!");
  } catch (e) {
    console.log("Erro ao atualizar formulário: " + e);

    res.status(500).send("Erro ao atualizar formulário: " + e);
  }
});

app.delete("/deletarFormulario/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await firestore.deleteDoc(firestore.doc(db, "formulario", id));

    res.send("Formulário deletado com sucesso!");
  } catch (e) {
    console.log("Erro ao deletar formulário: " + e);

    res.status(500).send("Erro ao deletar formulário: " + e);
  }
});

app.listen(3000, function () {
  console.log("Servidor rodando em http://localhost:3000");
});
