import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PostService } from '../../service/post';
import { Post } from '../../models/post';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink, AsyncPipe], //importamos loq ue vayamos a usar en la platnilla
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetailComponent {
  // 1) Escucho cambios en la URL
  // 2) saco el id
  // 3) hago getById(id)
   post$!: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router : Router
  ) {
    this.post$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.postService.getById(id);
      })
    );
  }
  deletePost(id: number) {
    const ok = confirm('¿Seguro que quieres borrar este post?');
    if (!ok) return;
    this.postService.delete(id).subscribe({
      next: () => this.router.navigate(['/posts']),
      error: (e) => console.error('Error borrando:', e),
    })
  }
}