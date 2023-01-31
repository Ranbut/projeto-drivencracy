import {pollsCollection} from '../config/db.js';

export async function GetPoll (req, res) {

    const polls = await pollsCollection.find().toArray();

    try{
        return res.status(200).send(polls.reverse());
    }
    
    catch(err){
        return res.status(404).send("Nenhuma enquente achado.");
    }
}