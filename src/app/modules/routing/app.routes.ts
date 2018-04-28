import {Routes} from '@angular/router';
import {HomeComponent} from '../../home/home.component';
import {PageNotFoundComponent} from '../../page-not-found/page-not-found.component';
import {CustomerMainComponent} from '../customer/customer-main/customer-main.component';

export let routes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'customers', component: CustomerMainComponent},

  {path: '**', component: PageNotFoundComponent}
]
