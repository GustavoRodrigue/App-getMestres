import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { QuestionModel } from 'src/app/model/QuestionModel';
import { QuestionService } from 'src/app/services/question.service';
import { Constants } from 'src/app/shared/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  columns: string[] = ['Pergunta', 'Tipo', 'SubCategoria', 'uid'];
  dataSource: MatTableDataSource<QuestionModel>;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(
    private questionSrv: QuestionService
  ) { }

  ngOnInit() {
    this.bind();
  }
  async bind(): Promise<void>{
    const questions = await this.questionSrv.GetAll();
    this.dataSource = new MatTableDataSource(questions.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(model: QuestionModel):Promise<void>{
    const options: any = {
      ...Constants.confirm_swal_options, text: `Deseja realmente excluir a pergunta ${model.question}`
    }
    const { value } = await Swal.fire(options);
    if(value){
      const result = await this.questionSrv.delete(model.uid);
      if(result.success){
        this.bind();
      }
    }
  }

}
