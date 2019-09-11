import { Request } from 'express';
import { BaseController } from "./BaseController";
import { SubCategory } from '../entity/SubCategory';

export class SubCategoryController extends BaseController<SubCategory> {
    constructor(){
        super(SubCategory);
    }

    async save(request: Request){
        let _subCategory =<SubCategory>request.body;
        super.isRequired(_subCategory.name, 'O nome da SubCategoria é Obrigatorio');
        super.isRequired(_subCategory.category, 'A Categoria é Obrigatoria');
        super.isRequired(_subCategory.cost, 'O Custo é Obrigatorio');
        super.isTrue(isNaN(_subCategory.cost), 'O Custo deve ser um numero');
        super.isTrue(_subCategory.cost < 0, 'O custo deve ser maior que Zero');
    
        return super.save(_subCategory, request);

    }

}