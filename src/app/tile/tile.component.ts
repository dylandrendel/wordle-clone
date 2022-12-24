import { Component, Input } from '@angular/core';
import { Highlight } from '../wordle/wordle.component';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent {
  @Input() letter = '';
  @Input() highlight: Highlight = 'none';
  @Input() isInCurrentRow: boolean = false;

  constructor() {}
}
