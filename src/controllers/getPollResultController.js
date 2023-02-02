import { pollsCollection, choicesCollection, votesCollection } from '../config/db.js';

export async function GetResult (req, res) {

    try{
        const reqID = req.params.id;

        const poll = await pollsCollection.findOne({ _id: reqID });

        if (!poll) return res.status(404).send("Enquete não encontrada.");
    
        const choices = await choicesCollection.find({ pollId: poll._id }).toArray();
    
        const countVotes = []
    
        for (let i = 0; i < choices.length; i++) {
    
            const votes = await votesCollection.find({ choiceId: choices[i]._id }).toArray();
    
            countVotes.push(votes.length);
        }
    
        const objRes = Object.assign({},poll,{ 	result : {
            title: choices[countVotes.indexOf(Math.max(...countVotes))].title,
            votes: Math.max(...countVotes)
        } });

        res.status(200).send(objRes); 
    }
    catch(err){
        res.status(500).send("Algo deu errado no servidor,\ntente novamente mais tarde", err);
    }
}