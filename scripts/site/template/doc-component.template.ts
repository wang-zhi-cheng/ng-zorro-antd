import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector     : 'nz-doc-{{component}}-{{language}}',
  templateUrl  : './{{component}}-{{language}}.html',
  preserveWhitespaces: false
})
export class NzDoc{{componentName}}Component {
  constructor(private location: Location) {
  }
  goLink(link: string) {
    this.location.go(`#${link}`);
  }
}
