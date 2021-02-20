import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { SettingComponent } from '../user/setting/setting.component';

@Injectable({
  providedIn: 'root'
})
export class ExitFormGuard implements CanDeactivate<SettingComponent> {
  canDeactivate(component: SettingComponent): boolean {
    if (component.settingForm.dirty){
      return confirm('You have some unsaved change, do you want to exit');
    }
    return true;
  }
}
