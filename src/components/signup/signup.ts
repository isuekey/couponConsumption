import { Component } from '@angular/core';

/**
 * Generated class for the Signup component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class Signup {

  text: string;

  constructor() {
    console.log('Hello Signup Component');
    this.text = 'Hello World';
  }

}
