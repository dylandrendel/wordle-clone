import { Component, Input, OnInit } from '@angular/core';
import { Highlight } from '../wordle/wordle.component';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() letter = '';
  @Input() highlight: Highlight = 'none';

  constructor() { }

  ngOnInit(): void {
  }

}
