import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit(): void {
    let body = this._document.body;
    let script = this._renderer2.createElement('script');
    script.type = 'application/javascript';
    script.src = 'assets/js/scripts.js';
    this._renderer2.appendChild(body, script);
  }

}
