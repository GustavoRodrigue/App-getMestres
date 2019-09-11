import { Request } from 'express';
import {User} from "../entity/User";
import { BaseController } from "./BaseController";
import { sign } from 'jsonwebtoken';
import config from '../configuration/config';
import * as md5 from 'md5';

export class UserController extends BaseController<User> {
    constructor(){
        super(User);
    }

    async auth(request: Request){
        let {email, password} = request.body;

        if(!email || !password)
            return {status: 400, message: 'informe o email e a senha para efetuar login'};
        
        let user = await this.repository.findOne({email: email, password: md5(password)});
        if(user){
            let _payload = {
                uid: user.uid,
                name: user.name,
                photo: user.photo,
                email: user.email
            }
            return {
                status: 200,
                message:{
                    user: _payload,
                    token: sign({
                        ..._payload,
                        tm: new Date().getTime()
                    }, config.secretyKey)
                }
            }
        }else
            return {status: 404, message: 'E-mail ou senha inválidos'};
        
       
    }

    async createUser(request: Request){
        let {name, photo, email, isRoot, password, confirmPassword} = request.body;
        super.isRequired(name, 'Informe o nome');
        super.isRequired(photo, 'Informe a foto');
        super.isRequired(email, 'Informe o email');
        super.isRequired(password, 'Informe a senha');
        super.isRequired(confirmPassword, 'Informe a confimacao da senha');

        let _user = new User();
        _user.name = name;
        _user.photo = photo;
        _user.email = email;

        if(password != confirmPassword)
            return {status: 400, errors: ['A senha ea confirmacao diferentes']}

        if(password)
            _user.password = md5(password);
        
        _user.isRoot = isRoot;
        return super.save(_user, request, true);

    }

    async save(request: Request){
        let _user =<User>request.body;
        super.isRequired(_user.name, 'O nome do Usuario é Obrigatorio');
        super.isRequired(_user.photo, 'A foto do Usuario é Obrigatoria');
        super.isRequired(_user.password, 'A senha do Usuario é Obrigatorio');

        return super.save(_user, request);

    }
}