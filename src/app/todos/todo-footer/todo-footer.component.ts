import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actionsFiltro from 'src/app/filtro/filtro.action';
import * as actionsTodos from 'src/app/todos/todo.action';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  filtroActual: actionsFiltro.filtrosValidos = 'todos';
  filtros: actionsFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes']
  pendientes: number = 0;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('filtro').subscribe(filtro => this.filtroActual = filtro);
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    });
  }

  cambiarFiltro(filtro: actionsFiltro.filtrosValidos): void {
    this.store.dispatch(actionsFiltro.setFiltro({ filtro: filtro }));
  }

  limpiarCompletados(): void {
    this.store.dispatch(actionsTodos.limpiarCompletados());
  }

}
