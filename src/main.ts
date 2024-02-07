import express from "express";
import { db, firestore } from "../banco_de_dados/firebase";

const app = express();

// TODO: Inserir no código para utilização do json na requisição
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Bem vindo a minha primeira API");
});

app.post("/usuario", async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email
  const telefone = req.body.telefone

  try {
    const docRef = await firestore.addDoc(
      firestore.collection(db, "usuarios"),
      {
        nome: nome,
        email: email,
        telefone: telefone
      }
    );
    //TODO: Adicionar textos de apoio para a melhor leitura das  respostas
    res.send("Usuario adicionado com sucesso: " + docRef.id);
  } catch (e) {
    console.log("Erro ao adicionar usuário: ", e);

    res.status(500).send(e);
  }
});

app.get('/listarUsuarios', async (req, res) =>{
  try {
    const usuarios = await firestore.getDocs(firestore.collection(db, 'usuarios'))

    const usuariosLista  = usuarios.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),    
    }))
  
    res.send(usuariosLista) 
  } catch (e) {
    console.log("Erro ao listar usuários: " + e)

    res.status(500).send("Erro ao listar usuários: " + e)
  }
})

app.put('/atualizarUsuario/:id', async (req, res) => {
  const id = req.params.id
  const nome = req.body.nome

  try {
    await firestore.updateDoc(firestore.doc(db, 'usuarios', id), {
      nome: nome,
    })
    res.send('Usuário atualizado com sucesso!')
  } catch (e) {
    console.log('Erro ao atualizar usuário: ' + e)

    res.status(500).send('Erro ao atualizar usuário: ' + e)
  }
})

app.delete('/deletarUsuario/:id', async (req, res) =>{
  const id = req.params.id

  try {
    await firestore.deleteDoc(firestore.doc(db, 'usuarios', id))

    res.send('Usuário deletado com sucesso!')
  } catch (e) {
    console.log('Erro ao deletar usuario: ' + e)

    res.status(500).send('Erro ao deletar usuario: ' + e)
  }
})

app.listen(3000, function () {
  console.log("Servidor rodando em http://localhost:3000");
});
