import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import * as PouchDB from 'pouchdb';

@Injectable()
export class TarefasService {

  dbChange : EventEmitter<any> = new EventEmitter();

  data: any;
  db: any;
  remote: any;

  constructor(private http: Http) {

    this.db = new PouchDB('tarefas');
    this.remote = 'http://localhost:5984/tarefas';

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options);

  }

  getTarefas(){

    if(this.data){
      return Promise.resolve(this.data);
    }

    return new Promise(resolve=>{
      this.db.allDocs({
        include_docs: true
      }).then((result)=>{
        this.data = [];

        let docs = result.rows.map((row)=>{
          this.data.push(row.doc);
        });

        resolve(this.data);

        this.db.changes({
          live: true,
          since: 'now',
          include_docs: true
        }).on('change', (change)=>{
          this.handleChange(change);
        });

      }).catch((error)=>{
        console.log(error);
      });


    });

  }

  emitChange(){
    return this.dbChange;
  }

  handleChange(change){

  
    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index)=>{
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex  = index;
      }
    });

    if(change.deleted){
      this.data.splice(changedIndex, 1);
    }else{
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      }else{
        this.data.push(change.doc);
      }
    }

    this.dbChange.emit(this.data);

  }

  createTarefa(tarefa){
    this.db.post(tarefa);
  }

  updateTarefa(tarefa){
    this.db.put(tarefa).catch((err)=>{
        console.log(err);
    });
  }

  deleteTarefa(tarefa){
    this.db.remove(tarefa).catch((err)=>{
      console.log(err);
    })
  }

}
