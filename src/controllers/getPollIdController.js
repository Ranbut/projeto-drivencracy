import { choicesCollection } from '../config/db.js';

export async function GetPollIDChoice (req, res) {
    try{
        const reqID = req.params.id;
        
        const choicesPoll = await choicesCollection.find({ pollId: reqID }).toArray();

        if (choicesPoll && choicesPoll.length > 0)
            return res.status(200).send(choicesPoll.reverse());
        else if (choicesPoll && !choicesPoll.length > 0)
            return res.status(404).send("Enquete não existe.");
        }
    catch(err){
            res.status(500).send(err);
    }

}