// dashboard-routing.module.ts
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'details/:id', component: BookingDetailsComponent }
    ]
  }
];
