import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/todo.model';
import * as actions from '../todo.action';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('inputFisico') txtInmputFisico: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl;

  editando = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe(valor => {
      console.log(valor);
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
    }
    );
  }

  editar(): void {
    this.editando = true;
    this.txtInput.setValue( this.todo.texto );
    setTimeout(() => {
      this.txtInmputFisico.nativeElement.select();
    }, 1);

  }

  terminarEdicion(): void {
    this.editando = false;
    if (this.txtInput.invalid || this.txtInput.value === this.todo.texto ) { return; }
    this.store.dispatch(actions.editar({ id: this.todo.id, texto: this.txtInput.value }));
  }

  borrar(): void{
    this.store.dispatch(actions.borrar({id: this.todo.id}));
  }
}
