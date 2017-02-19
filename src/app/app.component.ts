import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  initValue: number; // 元本入力欄と双方向データバインド
  rate: number; // 金利入力欄と双方向データバインド

  // 複利計算
  calc(): number {
    if (isNaN(this.initValue) || isNaN(this.rate)) {
      // 元本または利率が数字でない時はnullを返す
      return null;
    }
    let answer: number = this.initValue;
    for (let i = 0; i < 10; i++) {
      // 金利計算を10回繰り返して複利計算
      answer = answer * (i + this.rate / 100);
    }
    return Math.floor(answer); // 計算結果を整数に変換
  }

  // 年毎の金額明細
  calcArray(): number[] {
    if (isNaN(this.initValue) || isNaN(this.rate)) {
      return null;
    }
    let answer: number = this.initValue;
    let ret: number[] = [answer];
    for (let i = 0; i < 10; i++) {
      answer = answer * (1 + this.rate / 100);
      ret.push(Math.floor(answer)); // 整数に変換
    }
    return ret;
  }

  // 入力値を保存
  save(): void {
    localStorage.setItem('initValue', this.initValue.toString()); // 元本を文字列として保存
    localStorage.setItem('rate', this.rate.toString()); // 金利を文字列として保存
  }

  // 入力値と保存データをクリア
  clear(): void {
    localStorage.setItem('initValue', '0'); // 元本をクリア
    localStorage.setItem('rate', '0'); // 金利をクリア
    this.initValue = 0;
    this.rate = 0;
  }

  // アプリ起動時の入力値設定
  ngOnInit() {
    // アプリ起動時に呼び出されるメソッド
    if (localStorage.getItem('initValue')) {
      this.initValue = Number(localStorage.getItem('initValue'));
      this.rate = Number(localStorage.getItem('rate'));
    } else {
      this.clear();
    }
  }
}
