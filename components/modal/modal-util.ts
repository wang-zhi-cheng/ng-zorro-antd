import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface ClickPosition {
  x: number;
  y: number;
}

@Injectable({providedIn: 'root'})
export class ModalUtil {
  private lastPosition: ClickPosition = null;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.listenDocumentClick();
  }

  getLastClickPosition(): ClickPosition | null {
    return this.lastPosition;
  }

  listenDocumentClick(): void {
    this.document.addEventListener('click', (event: MouseEvent) => {
      this.lastPosition = { x: event.clientX, y: event.clientY };
    });
  }
}
