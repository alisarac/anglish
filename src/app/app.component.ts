import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works oo!';
  hw ="subtitle";
  count: number = 0
  public hwClass = 'special';

  sayHello() {
      console.log('Hi!');
      this.count++;
  }
}
