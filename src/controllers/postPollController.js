import {pollsCollection} from '../config/db.js';
import dayjs from 'dayjs';

export async function PostPoll (req, res) {

    const { title, expireAt } = req.body;

    const dateFormat = 'YYYY-MM-DD HH:mm'
    let pollDate = expireAt;
    
    if (!title) return res.status(422).send("Título da enquete não pode ser vazio.");

    if (!expireAt){
        const today = new Date();
        const priorDate = new Date(new Date().setDate(today.getDate() + 30));
        pollDate = dayjs(priorDate).format(dateFormat);
    } 

    const dateIsOld = (date) => {
        return dayjs().isAfter(dayjs(date));
      }

    const dateFormatIsValid = (date) => {
        return dayjs(date, dateFormat).format(dateFormat) === date;
      }

    if(!dateFormatIsValid(expireAt) && !pollDate) return res.status(422).send("Data de expiração da enquete não é valido.");

    if(dateIsOld(expireAt)) return res.status(422).send("Data de expiração da enquete é antiga.");

    const newPoll = { title: title, expireAt: pollDate };

    try{
        await pollsCollection.insertOne(newPoll);    
        res.sendStatus(201);
    }
    catch(err){
        res.status(500).send("Algo deu errado no servidor,\ntente novamente mais tarde");
    }

}