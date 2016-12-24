import { Component } from '@angular/core';
import { TarefasComponent } from './components/tarefas/tarefas.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gerenciador de tarefas';
}
