import { Routes, RouterModule } from '@angular/router';
import { Home } from './pages/home';
import { BlogList } from './pages/blogList';
import { NoContent } from './pages/no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'blogs/v2ex', component: BlogList },
  { path: 'blogs/cnode', component: BlogList },
  { path: '**',    component: NoContent },
];
