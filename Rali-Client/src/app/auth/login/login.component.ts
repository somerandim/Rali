import { Component } from '@angular/core';
import { LoginService } from './login.service';  // Import your LoginService
import { Router } from '@angular/router'; // To navigate to other routes after login
import { FormsModule, NgForm } from '@angular/forms'; // Import NgForm

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = ''; // To store error messages

  constructor(private loginService: LoginService, private router: Router) {}

  public async login(loginForm: NgForm): Promise<void> {
    const { email, password } = loginForm.value; // Get the email and password directly from the form
  
    // Check if the credentials are "admin" and "admin"
    if (email === 'admin' && password === 'admin') {
      console.log('Admin login detected. Redirecting to admin page...');
      this.router.navigate(['/admin']); // Redirect to the admin page
      return; // Skip the rest of the method
    }
  
    // Prepare the request body as JSON
    const loginData = { email, password };
  
    // Make the POST request using fetch with application/json
    fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the correct content type for JSON
      },
      body: JSON.stringify(loginData), // Convert the object to a JSON string
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Invalid login credentials!'); // Handle failed response
        }
  
        const data = await response.json(); // Parse the response JSON
        console.log('Full response:', data);
  
        // Extract the token from the response
        const token = data.token;
        console.log('Received Token:', token);
  
        if (token) {
          // Store the JWT token in localStorage using LoginService
          this.loginService.storeToken(token);
  
          // Log success message and the token
          console.log('Successfully logged in!');
          console.log('Generated JWT Token:', token);
  
          // Navigate to the dashboard or a protected page after successful login
          this.router.navigate(['/profile']);
        } else {
          this.errorMessage = 'Invalid login credentials!'; // Handle invalid login
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        // Handle errors (e.g., network issue, invalid credentials)
        this.errorMessage = 'Login failed. Please try again.';
      });
  }
}