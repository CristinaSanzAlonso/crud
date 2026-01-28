import { Routes } from '@angular/router';
import { PostListComponent } from './pages/post-list/post-list';
import { PostDetailComponent } from './pages/post-detail/post-detail';
import { PostFormComponent } from './pages/post-form/post-form';

/*El orden de las rutas SÍ importa:
-Angular evalúa las rutas de arriba hacia abajo, y se queda con la primera que coincida.
-Las rutas más específicas deben ir antes que las más genéricas.
-Las rutas con parámetros (:id) deben ir después de las rutas fijas como 'new'.
-La ruta comodín ('**') debe ir al final, siempre.*/ 

export const routes: Routes = [
    {path: '', redirectTo: 'posts', pathMatch: 'full'},
    {path: 'posts', component: PostListComponent},
    {path: 'posts/new', component: PostFormComponent},
    {path: 'posts/:id', component: PostDetailComponent},
    {path: '**', redirectTo: 'posts'},
];
