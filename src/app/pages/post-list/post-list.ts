import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../service/post';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [AsyncPipe,RouterLink, ReactiveFormsModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostListComponent {
  posts$!: Observable<Post[]>;

  searchControl = new FormControl('', { nonNullable: true });
  userIdControl = new FormControl<number | null>(null);
  sortControl = new FormControl<'id-asc' | 'id-desc' | 'title-asc' | 'title-desc'>(
    'id-asc',
    { nonNullable: true }
  );

  filteredPosts$!: Observable<Post[]>;

 constructor(private postService: PostService) {
    //  Inicialización segura
    this.posts$ = this.postService.getAll();

    this.filteredPosts$ = combineLatest([
      this.posts$,
      this.searchControl.valueChanges.pipe(startWith(this.searchControl.value)),
      this.userIdControl.valueChanges.pipe(startWith(this.userIdControl.value)),
      this.sortControl.valueChanges.pipe(startWith(this.sortControl.value)),
    ]).pipe(
      map(([posts, term, userId, sort]) => {
        const q = term.trim().toLowerCase();

        const filtered = posts.filter(p => {
          const matchesText =
            !q || (p.title + ' ' + p.body).toLowerCase().includes(q);

          const matchesUser =
            userId === null || p.userId === userId;

          return matchesText && matchesUser;
        });

        const sorted = [...filtered];
        sorted.sort((a, b) => {
          switch (sort) {
            case 'title-asc':
              return a.title.localeCompare(b.title);
            case 'title-desc':
              return b.title.localeCompare(a.title);
            case 'id-desc':
              return b.id - a.id;
            default:
              return a.id - b.id;
          }
        });

        return sorted;
      })
    );
}
  clear() {
    this.searchControl.setValue('');
    this.userIdControl.setValue(null);
    this.sortControl.setValue('id-asc');
  }
}