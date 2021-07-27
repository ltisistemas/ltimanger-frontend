import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'GITEM SYS - Gestão integrada de empresa (by LTI Sistemas)';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
