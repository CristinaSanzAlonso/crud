import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../../service/post';
import { Post } from '../../models/post';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-list', //nombre de la etiqueta HTML con la que podrías usar este componente (<app-post-list>).
  imports: [RouterLink, AsyncPipe],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostListComponent {
  //$ significa que es un observable, un flujo que emitirta arrays de post 
  // la ! signfica que se iniciara mas tarde
  posts$!: Observable<Post[]>;

  constructor(private postService: PostService) {
    this.posts$ = this.postService.getAll();
  }

}
