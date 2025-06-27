import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoaderService } from '../services/data-loader.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../dataType';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  isLogin = true;
  constructor(private userService: DataLoaderService, private router: Router) { }
  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  onLoginSubmit(form: any) {
    const { email, password } = form.value;
    const users = this.userService.getStoredUsers();

    const matched = users.find(u => u.email === email && u.password === password);

    if (matched) {
      localStorage.setItem('isLoggedIn', 'true');
      this.userService.isSellerLoggedIn.next(true); // ✅ Trigger update for header
      this.router.navigate(['home']);
    } else {
      alert('Invalid email or password');
    }
  }

  onSignupSubmit(form: any) {
    const { name, email, password } = form.value;
    const users = this.userService.getStoredUsers();

    const exists = users.find(u => u.email === email);

    if (exists) {
      alert('Email already exists!');
    } else {
      const newUser: User = { name, email, password };
      users.push(newUser);
      this.userService.saveUsers(users);
      alert('Signup successful');

      this.toggleForm(); // switch to login view
    }
  }
}
