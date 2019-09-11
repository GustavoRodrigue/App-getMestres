import { Request } from 'express';
import { BaseController } from "./BaseController";
import { Question } from '../entity/Question';
import { QuestionType } from '../entity/enum/QuestionType';


export class QuestionController extends BaseController<Question> {
    constructor(){
        super(Question);
    }

    async save(request: Request){
        let _question =<Question>request.body;
        super.isRequired(_question.question, 'A pergunta é Obrigatorio');
        super.isRequired(_question.type, 'O tipo de pergunta {é Obrigatorio');
        super.isRequired(_question.subCategory, 'Informe a sub categoria da questão');
        
        if(_question.type && parseInt(_question.type.toString()) === QuestionType.Select){
            super.isRequired(_question.options, 'Para o tipo selecione você deve informar quais são as opcões');
        }

        return super.save(_question, request);

    }

}