import { Request } from 'express';
import { BaseController } from "./BaseController";
import { Customer } from '../entity/Customer';
import * as md5 from 'md5';



export class CustomerController extends BaseController<Customer> {
    constructor(){
        super(Customer, true);
    }

    async save(request: Request){
        let _customer =<Customer>request.body;
        super.isRequired(_customer.name, 'O nome é Obrigatorio');
        super.isRequired(_customer.photo, 'A foto é Obrigatoria');
        super.isRequired(_customer.email, 'O E-mail é Obrigatorio');
        super.isRequired(_customer.phone, 'O telefone é Obrigatorio'); 

        delete _customer.password;
        
        return super.save(_customer, request);

    }
    async CreateCustomer(request: Request){
        let _customer =<Customer>request.body;
        let {confirmPassword} = request.body;
        super.isRequired(_customer.name, 'O nome é Obrigatorio');
        super.isRequired(_customer.photo, 'A foto é Obrigatoria');
        super.isRequired(_customer.email, 'O E-mail é Obrigatorio');
        super.isRequired(_customer.phone, 'O telefone é Obrigatorio'); 
        super.isRequired(_customer.password, 'A senha é Obrigatoria'); 
        super.isRequired(confirmPassword, 'A comfirmação da senha é Obrigatoria'); 
        super.isTrue((_customer.password != confirmPassword), 'A senha e a confirmação estão diferentes');

        if(_customer.password)
            _customer.password = md5(_customer.password);

        return super.save(_customer, request, true);
    }
}