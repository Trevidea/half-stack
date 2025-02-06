import { Component } from '@angular/core';
import { PortBindingConfigComponent } from "./components/port-binding-config/port-binding-config.component";
import { ModuleConfigurationComponent } from "./components/module-configuration/module-configuration.component";
import { ApplicationComponent } from "./components/application/application.component";
import { VirtualHostComponent } from "./components/virtual-host/virtual-host.component";
import { ServerConfigurationComponent } from "./components/server-configuration/server-configuration.component";
import { ApplicationPresernter } from "./components/application/application.presenter";

@Component({
  selector: 'app-media-server',
  standalone: true,
  imports: [PortBindingConfigComponent, ModuleConfigurationComponent, ApplicationComponent, VirtualHostComponent, ServerConfigurationComponent, ApplicationPresernter],
  templateUrl: './media-server.component.html',
  styleUrl: './media-server.component.scss'
})
export class MediaServerComponent {

}
