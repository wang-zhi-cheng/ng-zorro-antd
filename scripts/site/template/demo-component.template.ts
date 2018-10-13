import { Component, QueryList, ViewChildren } from '@angular/core';
import { NzCodeBoxComponent } from '../share/nz-codebox/nz-codebox.component';
import { Location } from '@angular/common';

@Component({
  selector     : 'nz-demo-{{component}}',
  preserveWhitespaces: false,
  templateUrl  : './{{language}}.html'
})
export class {{componentName}} {
  expanded = false;
  @ViewChildren(NzCodeBoxComponent) codeBoxes: QueryList<NzCodeBoxComponent>;

  constructor(private location: Location) {
  }
  goLink(link: string) {
    this.location.go(`#${link}`);
  }

  expandAllCode(): void {
    this.expanded = !this.expanded;
    this.codeBoxes.forEach(code => {
      code.nzExpanded = this.expanded;
    });
  }
{{code}}
{{rawCode}}
}
