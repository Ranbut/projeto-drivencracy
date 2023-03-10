import { choicesCollection, votesCollection } from '../config/db.js';
import dayjs from 'dayjs';
import { v4 as v4uuid } from 'uuid';

export async function PostVote (req, res) {

    try{
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
        
        await votesCollection.insertOne(objVote);    
        res.sendStatus(201);
    }
    catch(err){
        res.status(500).send(err);
    }

}