import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

export type Highlight = 'green' | 'yellow' | 'gray' | 'none';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss'],
})
export class WordleComponent implements OnInit {
  apiUrlAllWords = 'https://random-word-api.herokuapp.com/all';
  apiUrlRandomWord = 'https://random-word-api.herokuapp.com/word?length=5';
  solution = '';
  loading = false;
  guesses = Array<string>(6).fill('');
  checkWordList: string[] = [];
  currentGuessWordIndex = 0;
  solved = false;
  failed = false;
  highlights = Array.from({ length: 6 }, () =>
    Array<Highlight>(5).fill('none')
  );

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.solved || this.failed) {
      return;
    }

    let currWord = this.guesses[this.currentGuessWordIndex];
    let newWord = '';

    if (event.key === 'Backspace' && currWord.length > 0) {
      newWord = currWord.substring(0, currWord.length - 1);
      this.guesses[this.currentGuessWordIndex] = newWord;
      return;
    }

    if (
      event.key === 'Enter' &&
      currWord.length === 5
    ) {
      if (!this.checkWordList.some(w => w === currWord)) {
        alert('Not a valid word');
        return;
      }
      [...currWord].forEach(
        (l, i) =>
          (this.highlights[this.currentGuessWordIndex][i] =
            this.getHighlightStatus(l, i))
      );
      this.solved = currWord === this.solution;
      if (!this.solved && this.currentGuessWordIndex === 5) {
        this.failed = true;
      }
      if (!this.solved && this.currentGuessWordIndex < 5) {
        this.currentGuessWordIndex++;
      }
      return;
    }

    if (/^[a-z]$/.test(event.key) && currWord.length <= 4) {
      newWord = currWord + event.key;
      this.guesses[this.currentGuessWordIndex] = newWord;
    }
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.setCheckWordList();
    this.setSolution();
  }

  getHighlightStatus(letter: string, index: number): Highlight {
    let highlight: Highlight = 'gray';
    if (letter === this.solution.charAt(index)) {
      highlight = 'green';
    } else if ([...this.solution].some((l) => l === letter)) {
      highlight = 'yellow';
    }
    return highlight;
  }

  setCheckWordList = () => {
    this.loading = true;
    const req = this.http.get<string[]>(this.apiUrlAllWords);
    req
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (list) => (this.checkWordList = list.filter((w) => w.length === 5))
      );
  };

  setSolution = () => {
    const req = this.http.get<string[]>(this.apiUrlRandomWord);
    req.subscribe((words) => (this.solution = words[0]));
  };

  reset = () => {
    this.setSolution();
    this.guesses = Array<string>(6).fill('');
    this.solved = false;
    this.failed = false;
    this.currentGuessWordIndex = 0;
    this.highlights = Array.from({ length: 6 }, () =>
      Array<Highlight>(5).fill('none')
    );
  }
}
