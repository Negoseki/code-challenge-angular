import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { User, UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  userService = inject(UserService);
  destroy$ = inject(DestroyRef);
  users: User[] = [];

  filteredUsers: User[] = [];
  searchControl = new FormControl('');

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
    this.filteredUsers = this.users;
    this.setupSearch();
  }

  setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroy$), distinctUntilChanged())
      .subscribe((search) => this.filterUsers(search ?? ''));
  }

  filterUsers(name: string): void {
    if (!name) {
      this.filteredUsers = this.users;
    }
    this.filteredUsers = this.users.filter(
      (u) =>
        `${u.firstname} ${u.lastname}`
          .toLowerCase()
          .indexOf(name.toLowerCase()) > -1
    );
  }
}
