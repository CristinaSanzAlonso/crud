import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule],
  templateUrl: './post-form.html',
  styleUrl: './post-form.css',
})
export class PostFormComponent {

  //traemos un formulario
  form = new FormGroup({
    //metemos los campos del formulario
    title: new FormControl('', {nonNullable:true}), //lo dejamos vacio y le obligamos a que meta un valor
    body: new FormControl('', {nonNullable:true})
  })

  //Construimos el formulario y guardamos los datos



}
