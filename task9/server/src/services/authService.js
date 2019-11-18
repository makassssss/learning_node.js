import models from '../models/index';
import Logger from '../logger/Logger';
import logToDB from '../logger/logToDB';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config"; //eslint-disable-line import/no-cycle

const model = models.users;

const error = (err) => {
    console.log(err);
    Logger.error(err);
    return {
        success: false,
        err: err.message ? err.message : err
    }
};

export default class AuthService {

    login = (username, password) => (
        model.findOne({
            where: {
                username,
            },
        }).then((usr) => {
            const user = {
                username,
                password: usr.password,
            };
            const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife });
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            return isPasswordValid ? { success: true, token } : error('unknown user');
        }).catch(error)
    );

    signup = (username, password) => (
        model.create({
            username,
            password: bcrypt.hashSync(password, 10),
        })
            .then(() => {
                logToDB('add user');
                return {
                    success: true
                }
            })
            .catch(err => (
                err.errors[0].message === 'username must be unique'
                    ? error('username must be unique')
                    : error(err.message)
            ))
    );

}
