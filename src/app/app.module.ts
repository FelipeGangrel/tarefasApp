import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TarefasComponent } from './components/tarefas/tarefas.component';
import { TarefaComponent } from './components/tarefa/tarefa.component';

@NgModule({
  declarations: [
    AppComponent,
    TarefasComponent,
    TarefaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
