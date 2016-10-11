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
  public form: any = {};
  myLabel = 'Select a number';
  myValue = '4';
  myItems = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  sayHello() {
      console.log('Hi!');
      this.count++;
  }
  kmChanged(){
    console.log("km:",this.form.km);
  }
}
