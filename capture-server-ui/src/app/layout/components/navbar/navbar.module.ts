import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
} from "ngx-perfect-scrollbar";

import { CoreCommonModule } from "@core/common.module";
import { CoreTouchspinModule } from "@core/components/core-touchspin/core-touchspin.module";

import { NavbarComponent } from "app/layout/components/navbar/navbar.component";
import { NavbarBookmarkComponent } from "app/layout/components/navbar/navbar-bookmark/navbar-bookmark.component";
import { NavbarSearchComponent } from "app/layout/components/navbar/navbar-search/navbar-search.component";
import { NavbarCartComponent } from "app/layout/components/navbar/navbar-cart/navbar-cart.component";
import { NavbarNotificationComponent } from "app/layout/components/navbar/navbar-notification/navbar-notification.component";
import { CoreSidebarModule } from "@core/components/core-sidebar/core-sidebar.module";
import { UserProfileComponent } from "app/user-profile/user-profile.component";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

@NgModule({
  declarations: [
    NavbarComponent,
    NavbarSearchComponent,
    NavbarBookmarkComponent,
    NavbarCartComponent,
    NavbarNotificationComponent,
    UserProfileComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  exports: [NavbarComponent],
  imports: [
    RouterModule,
    NgbModule,
    CoreCommonModule,
    PerfectScrollbarModule,
    CoreTouchspinModule,
    CoreSidebarModule,
  ],
})
export class NavbarModule {}
