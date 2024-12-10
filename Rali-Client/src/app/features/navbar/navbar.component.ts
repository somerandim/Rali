import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isStorePage: boolean = false;
  searchQuery: string = '';

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {
    // Check the initial route and set visibility
    this.updateSearchVisibility();

    // Listen to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSearchVisibility();
      }
    });
  }

  // Update the visibility of the search bar based on the current route
  updateSearchVisibility(): void {
    this.isStorePage = this.router.url.startsWith('/store');
  }

  // Update the search query in the SearchService when the input changes
  onSearchChange(): void {
    this.searchService.setSearchQuery(this.searchQuery);
  }

  // Handle profile navigation based on login status
  onProfileClick(): void {
    const isLoggedIn = localStorage.getItem('jwtToken') !== null; // Check if user is logged in
    if (isLoggedIn) {
      this.router.navigate(['/profile']); // Navigate to profile page
    } else {
      this.router.navigate(['/signup']); // Navigate to signup page
    }
  }
}
