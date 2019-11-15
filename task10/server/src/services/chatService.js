import models from '../models/index';
import Logger from '../logger/Logger';
import logToDB from '../logger/logToDB'; //eslint-disable-line import/no-cycle
import Sequelize from 'sequelize';

const model = models.chatHistory;

const error = (err) => {
    Logger.error(err);
    return {
        success: false,
        err: err.message
    }
};

export default class ChatService {

    getUsers = () => (
        models.users.findAll({
            attributes: ['username']
        })
            .then(result => {
                logToDB('get users');
                const users = result.map(user => user.username);
                return users;
            })
            .catch(error)
    );

    getHistory = (user1, user2) => (
        model.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { from: user1, to: user2 },
                    { from: user2, to: user1 }
                ],
            }
        })
            .then(result => result)
            .catch(error)
    );

    saveMessage = (message) => {
        const { from, to, text } = message;
        model.create({
            from,
            to,
            text
        })
    };

}
