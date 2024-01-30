import express from 'express';
import { db, firestore } from '../banco_de_dados/firebase';

const app = express();

app.listen(3000, function(){
 console.log("Servidor rodando na porta http://localhost:3000")
});
