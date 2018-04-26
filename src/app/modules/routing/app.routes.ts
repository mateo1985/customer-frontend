import {Routes} from '@angular/router';
import {HomeComponent} from '../../home/home.component';
import {PageNotFoundComponent} from '../../page-not-found/page-not-found.component';
import {CustomerListComponent} from '../customer/customer-list/customer-list.component';

export let routes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'customers', component: CustomerListComponent},

  {path: '**', component: PageNotFoundComponent}
]
