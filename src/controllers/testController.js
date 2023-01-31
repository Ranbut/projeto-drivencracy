import {testCollection} from '../config/db.js';

export async function Test (req, res) {

    const test = await testCollection.find().toArray();

    try{
        return res.send(test.reverse());
    }
    
    catch(err){
        return res.status(404).send("Não achado!");
    }

}