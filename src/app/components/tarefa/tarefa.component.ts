import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {

  @Input() tarefa: any;
  @Output() onConcluir = new EventEmitter();
  @Output() onExcluir = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  concluir(tarefa){
    console.log('Emitindo evento...');
    this.onConcluir.emit(tarefa);
  }

  excluir(tarefa){
    this.onExcluir.emit(tarefa);
  }

}
