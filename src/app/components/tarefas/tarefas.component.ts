import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TarefasService } from '../../services/tarefas.service';
import { TarefaComponent } from '../tarefa/tarefa.component';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css'],
  providers: [TarefasService]
})
export class TarefasComponent implements OnInit {

  tarefas: any;
  subscription: any;
  zone: NgZone;

  constructor(private tarefasServ: TarefasService) {
    this.zone = new NgZone({enableLongStackTrace: false});
  }

  ngOnInit() {
   this.atualizarTarefas();
   this.subscription = this.tarefasServ.emitChange()
    .subscribe((data) => {
      let tarefas = data;
      this.zone.run(()=>{
        this.tarefas = tarefas;
      });
    });
  }


  atualizarTarefas(){
    this.tarefasServ.getTarefas().then((data)=>{
      this.tarefas = data;
    });
  }

  criarTarefa(f:NgForm){
    let titulo = f.value.titulo;
    let valid = f.valid;
    if(valid){
      let tarefa = {titulo: titulo, status: 'pendente'};
      f.reset();
      this.tarefasServ.createTarefa(tarefa);
    }
  }

  concluir(event: any){
    console.log('Evento recebido!');
    let tarefa = event;
    tarefa.status = tarefa.status === 'pendente' ? 'concluida' : 'pendente';
    this.tarefasServ.updateTarefa(tarefa);
  }

  excluir(event: any){
    let tarefa = event;
    this.tarefasServ.deleteTarefa(tarefa);
  }


}
