import { Component, Input, OnInit } from '@angular/core';
import { Highlight } from '../wordle/wordle.component';

@Component({
  selector: 'app-guess-row',
  templateUrl: './guess-row.component.html',
  styleUrls: ['./guess-row.component.scss']
})
export class GuessRowComponent implements OnInit {

  @Input() guess = '';
  @Input() highlights: Highlight[] = [];
  letters: string[] = [];
  tiles = Array(5);

  constructor() { }

  ngOnInit(): void {
    this.letters = [...this.guess];
  }

}
