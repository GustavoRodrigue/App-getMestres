import { Request } from 'express';
import { Repository, getRepository } from 'typeorm';
import { BaseNotification } from '../entity/BaseNotification';
import { RequestOptions } from 'https';

export abstract class BaseController<T> extends BaseNotification {

  private _repository: Repository<T>;
  private _onluRootController: boolean = false;
  public errorRoot: any = {
    status: 401,
    errors: ['Você não está atualizado a execultar essa funcionalidade']
  }
  

  constructor(entity: any, onlyRoot: boolean = false) {
    super();
    this._repository = getRepository<T>(entity);
    this._onluRootController = onlyRoot;
  }

  public checkNotPermission(request: Request){
    return(this._onluRootController && !request.IsRoot);
  }

  async all(request: Request) {
    if (this.checkNotPermission(request)) return this.errorRoot;
    return this._repository.find({
      where: {
        deleted: false
      }
    });
  }

  async one(request: Request) {
    if (this.checkNotPermission(request)) return this.errorRoot;
    return this._repository.findOne(request.params.id);
  }

  async save(model: any, request: Request, ignorePermissions: boolean = false) {
    if(!ignorePermissions)
      if (this.checkNotPermission(request)) return this.errorRoot;
    if (model.uid) {
      delete model['deleted'];
      delete model['uid'];
      delete model['createAt'];
      delete model['upadateAt'];


      let _modelInDB = await this._repository.findOne(model.uid);
      if (_modelInDB) {
        Object.assign(_modelInDB, model);
      }
    }

    if (this.valid())
      return await this._repository.save(model);
    else
      return {
        status: 400,
        errors: this.allNotifications
      }
  }

  async remove(request: Request) {
    if (this.checkNotPermission(request)) return this.errorRoot;
    let uid = request.params.id;
    let model: any = await this._repository.findOne(uid);
    if (model) {
      model.deleted = true;
      return this._repository.save(model);
    }else{
      return {
        status: 404,
        errors: [
          'Item não encontrado no bando de Dados!'
        ]
      }
    }
    
  }

  get repository():Repository<T>{
    return this._repository;
  }
 
}
