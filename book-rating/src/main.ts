import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


/////////////




export class Customer {
  /*id: number;

  constructor(id: number) {
    this.id = id;
  }*/

  constructor(public id: number) {}

  fooBar(arg: string): number {
    setTimeout(() => {
      console.log('HALLO Customer ' + this.id);
    }, 2000);

    return 0;
  }

}






const myCustomer = new Customer(3);
myCustomer.fooBar('')


////

/*
const bar = function (arg) {
  return arg + 1;
}

const bar2 = arg => arg + 1;
*/
