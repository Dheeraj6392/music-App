import { Component , HostListener} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isSidebarOpen = false;

  // Method to toggle the sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Listen for clicks outside the sidebar to close it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = (event.target as HTMLElement).closest('.sidebar, .three-dots-icon');
    if (!clickedInside) {
      this.isSidebarOpen = false; // Close the sidebar if clicked outside
    }
  }

  dropdownVisible = false;

  // Function to toggle dropdown visibility
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  
}
