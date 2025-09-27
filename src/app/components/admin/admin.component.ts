import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Admin, AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admins: Admin[] = [];
  newAdmin: Admin = { username: '', email: '', password: '' };
  editAdmin: Admin | null = null;
  message: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.getAdmins().subscribe({
      next: (data) => this.admins = data,
      error: (err) => this.message = '❌ Failed to load admins: ' + err.message
    });
  }

  addAdmin() {
    this.adminService.createAdmin(this.newAdmin).subscribe({
      next: () => {
        this.message = '✅ Admin added successfully';
        this.newAdmin = { username: '', email: '', password: '' };
        this.loadAdmins();
      },
      error: (err) => this.message = '❌ Add failed: ' + err.message
    });
  }

  startEdit(admin: Admin) {
    this.editAdmin = { ...admin };
  }

  saveEdit() {
    if (!this.editAdmin || !this.editAdmin.id) return;

    this.adminService.updateAdmin(this.editAdmin.id, this.editAdmin).subscribe({
      next: () => {
        this.message = '✅ Admin updated successfully';
        this.editAdmin = null;
        this.loadAdmins();
      },
      error: (err) => this.message = '❌ Update failed: ' + err.message
    });
  }

  deleteAdmin(id: number) {
    if (confirm('Are you sure you want to delete this admin?')) {
      this.adminService.deleteAdmin(id).subscribe({
        next: () => {
          this.message = '🗑️ Admin deleted successfully';
          this.loadAdmins();
        },
        error: (err) => this.message = '❌ Delete failed: ' + err.message
      });
    }
  }
}
