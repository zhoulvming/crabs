import { Routes, RouterModule } from '@angular/router';
import { Home } from './pages/home';
import { NoContent } from './pages/no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: '**',    component: NoContent },
];
