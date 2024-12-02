import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SignupService } from './signup.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private signupservice: SignupService){}

  public onSignup(addForm: NgForm): void{
    this.signupservice.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);

      }
    )
  }
}
