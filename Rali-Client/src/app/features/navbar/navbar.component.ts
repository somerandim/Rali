import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isStorePage: boolean = false;
  searchQuery: string = '';

  constructor(
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check the initial URL
    this.updateSearchVisibility();

    // Subscribe to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSearchVisibility();
      }
    });
  } 


  updateSearchVisibility(): void {
    // Set visibility based on the current route
    this.isStorePage = this.router.url === 'store';
  }

  onSearchChange(): void {
    this.searchService.setSearchQuery(this.searchQuery);
  }
}
