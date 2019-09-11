import { Request } from 'express';
import { BaseController } from "./BaseController";
import { ServiceProvider } from '../entity/ServiceProvider';
import * as md5 from 'md5';




export class ServiceProviderController extends BaseController<ServiceProvider> {
    constructor(){
        super(ServiceProvider, true);
    }

    private validationDefault(_serviceProvider: ServiceProvider): void {
        super.isRequired(_serviceProvider.name, 'O nome é Obrigatorio');
        super.isRequired(_serviceProvider.photo, 'A foto é Obrigatoria');
        super.isRequired(_serviceProvider.email, 'O E-mail é Obrigatorio');
        super.isRequired(_serviceProvider.phone, 'O telefone é Obrigatorio'); 
        super.isRequired(_serviceProvider.categoriesCare, 'Informe as categorias atendidas'); 
        super.isRequired(_serviceProvider.citiesCare, 'Informe as cidades atendidas'); 
        super.isRequired(_serviceProvider.zipCode, 'Informe o CEP'); 
        super.isRequired(_serviceProvider.state, 'Informe o estado'); 
    }

    async save(request: Request){
        let _serviceProvider =<ServiceProvider>request.body;
        this.validationDefault(_serviceProvider);

        delete _serviceProvider.password;
        
        return super.save(_serviceProvider, request);

    }
    async CreateServiceProvider(request: Request){
        let _serviceProvider =<ServiceProvider>request.body;
        let {confirmPassword} = request.body;
        this.validationDefault(_serviceProvider); 
        super.isRequired(_serviceProvider.password, 'A senha é Obrigatoria'); 
        super.isRequired(confirmPassword, 'A comfirmação da senha é Obrigatoria'); 
        super.isTrue((_serviceProvider.password != confirmPassword), 'A senha e a confirmação estão diferentes');

        if(_serviceProvider.password)
            _serviceProvider.password = md5(_serviceProvider.password);

        return super.save(_serviceProvider, request, true);
    }
}