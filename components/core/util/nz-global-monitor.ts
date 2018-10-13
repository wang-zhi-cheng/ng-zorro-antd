import { EventEmitter, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface Position {
  x: number;
  y: number;
}

@Injectable({providedIn: 'root'})
export class NzGlobalMonitorService {
  counter = 0;
  lastClickPos: Position = {
    x: 0,
    y: 0
  };

  _navItemSource: EventEmitter<string> = new EventEmitter();

  getGlobalCount(): number {
    return ++this.counter;
  }

  setDocumentOverflowHidden(status: boolean): void {
    this.document.body.style.overflow = status ? 'hidden' : '';
  }

  _observeGlobalEvents(): void {
    // 监听document的点击事件，记录点击坐标，并抛出 documentClick 事件
    this.document.addEventListener('click', (e) => {
      this.lastClickPos = {
        x: e.clientX,
        y: e.clientY
      };
      this._navItemSource.emit('documentClick');
    });
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
    this._observeGlobalEvents();
  }
}
