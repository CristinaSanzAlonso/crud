import { HttpClient } from '@angular/common/http'; //Importa HttpClient, el servicio de Angular que permite hacer peticiones HTTP (GET, POST, PUT, DELETE…).
import { Injectable } from '@angular/core'; //Importa el decorador @Injectable, necesario para que Angular pueda inyectar este servicio en otros componentes o servicios.
import { Observable } from 'rxjs'; //Importa Observable, el tipo que usa Angular para manejar datos asíncronos.
import { Post } from '../models/post'; //Importa la interfaz o clase Post, que define la estructura de los datos que devuelve la API.

@Injectable({providedIn: 'root',}) //Hace que este servicio este disponiblde desde toda la app/root
export class PostService {
  
  //le decimos donde esta la url donde estan los datos del json
  private readonly url= 'https://jsonplaceholder.typicode.com/posts';

  //Inyecta HttpClient en el servicio y crea una propiedad interna(http), no hace falta isntancias, angular las crea
  //solo gracias al provider del main.ts
  constructor(private http: HttpClient) {}

  //Métodods que se van ahcer en este servicio:
  //Devuelve un Observable<Post[]>, es decir, un flujo de datos que emitirá un array de posts.
  //Devuelve datos de tipo post[] que asegura que los datos que llegan son como los que hemos definido ene l modelo
  getAll(): Observable<Post[]> {
    //Realiza una petición GET a la URL definida. 
    //Devuelve directamente el observable para que el componente lo consuma.
    return this.http.get<Post[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<Post>(`${this.url}/${id}`)
  }
  //borramos segun el id, lo vamos a poner en detalle de post
  delete(id: number) {
  return this.http.delete<void>(`${this.url}/${id}`);
  }

  create(post: Post){
    return this.http.post<Post>(this.url, post);
  }

  update(id: number, post: Post){
    return this.http.put<Post>(`${this.url}/${id}`, post);
  }

}
