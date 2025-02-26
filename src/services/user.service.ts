import { Injectable } from '@angular/core';

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};

@Injectable({ providedIn: 'root' })
export class UserService {
  async getUsers(): Promise<User[]> {
    const response = await fetch('https://jsonplaceholder.org/users');
    if (!response.ok) {
      return [];
    }
    return await response.json();
  }
}
