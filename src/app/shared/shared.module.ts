import { ModuleWithProviders, NgModule } from '@angular/core';
import { ServicesModule } from './services/services.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    ServicesModule,
  ],
  exports: [
    ServicesModule,
    ComponentsModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
