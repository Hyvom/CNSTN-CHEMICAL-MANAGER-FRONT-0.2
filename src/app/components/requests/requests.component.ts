import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests: any[] = [];
  message: string = '';

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.requestService.getRequests().subscribe({
      next: (data) => this.requests = data,
      error: (err) => this.message = '❌ Failed to load requests: ' + err.message
    });
  }

  deleteRequest(id: number) {
    if (confirm('Are you sure you want to delete this request?')) {
      this.requestService.deleteRequest(id).subscribe({
        next: () => {
          this.message = '🗑️ Request deleted successfully';
          this.loadRequests();
        },
        error: (err) => this.message = '❌ Delete failed: ' + err.message
      });
    }
  }
}
