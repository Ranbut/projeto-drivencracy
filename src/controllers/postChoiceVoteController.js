import { choicesCollection, votesCollection } from '../config/db.js';
import dayjs from 'dayjs';
import { v4 as v4uuid } from 'uuid';

export async function PostVote (req, res) {

    const reqID = req.params.id;

    const date = dayjs().format('YYYY-MM-DD HH:mm')

    const choice = await choicesCollection.findOne({ _id: reqID });

    if (!choice) return res.status(404).send("Escolha da enquente não foi encontrada.");

    const id = v4uuid().replaceAll('-', '');
    const objVote = {
        _id: id,
        createdAt: date, 
        choiceId: choice._id
    }

    try{
        await votesCollection.insertOne(objVote);    
        res.sendStatus(201);
    }
    catch(err){
        res.status(500).send("Algo deu errado no servidor,\ntente novamente mais tarde");
    }

}