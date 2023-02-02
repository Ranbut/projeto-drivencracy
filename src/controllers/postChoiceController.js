import { pollsCollection, choicesCollection } from '../config/db.js';
import { v4 as v4uuid } from 'uuid';
import dayjs from 'dayjs';

export async function PostChoice (req, res) {
    
    const { title, pollID } = req.body;

    try{
    if (!title) return res.status(422).send("Título não pode ser uma string vazia.");

    const pollVerify = await pollsCollection.findOne({ _id: pollID});

    if (!pollVerify) return res.status(404).send("Enquete não encontrada.");

    const choiceVerify = await choicesCollection.findOne({ title: title});

    if(choiceVerify)
        if (title === choiceVerify.title) return res.status(409).send("Já existe escolha com o mesmo título.");

    if (dayjs().isAfter(dayjs(pollVerify.expireAt))) return res.status(403).send("Enquete expirada.");

    const id = v4uuid().replaceAll('-', '');
    const choice = {
        _id: id,
        title: title,
        pollId: pollID
    }

    await choicesCollection.insertOne(choice);    
    res.sendStatus(201);

    }
    catch(err){
        res.status(500).send("Algo deu errado no servidor,\ntente novamente mais tarde", err);
    }

}