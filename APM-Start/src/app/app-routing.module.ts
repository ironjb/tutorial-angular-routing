import { NgModule } from '@angular/core';
import { RouterModule/* , PreloadAllModules */ } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth-guard.service';
import { SelectiveStrategy } from './selective-strategy.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            {
                path: 'products',
                // canLoad: [AuthGuard],   // disables any preloading
                canActivate: [AuthGuard],
                data: { preload: true },
                loadChildren: 'app/products/product.module#ProductModule'
            },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ], {
            enableTracing: false,
            // preloadingStrategy: PreloadAllModules
            preloadingStrategy: SelectiveStrategy
        })
    ],
    providers: [ SelectiveStrategy ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
