import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService } from '../../services/produit.service';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  produits: any[] = [];
  produitForm: FormGroup;
  editing: boolean = false;
  currentProduitId: number | null = null;
  message: string = '';

  constructor(private produitService: ProduitService, private fb: FormBuilder) {
    this.produitForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits() {
    this.produitService.getProduits().subscribe({
      next: (data) => this.produits = data,
      error: (err) => this.message = '❌ Failed to load products: ' + err.message
    });
  }

  onSubmit() {
    if (this.produitForm.invalid) return;

    const produitData = this.produitForm.value;

    if (this.editing && this.currentProduitId !== null) {
      this.produitService.updateProduit(this.currentProduitId, produitData).subscribe({
        next: () => {
          this.message = '✅ Product updated successfully';
          this.loadProduits();
          this.resetForm();
        },
        error: (err) => this.message = '❌ Update failed: ' + err.message
      });
    } else {
      this.produitService.createProduit(produitData).subscribe({
        next: () => {
          this.message = '✅ Product added successfully';
          this.loadProduits();
          this.resetForm();
        },
        error: (err) => this.message = '❌ Add failed: ' + err.message
      });
    }
  }

  editProduit(produit: any) {
    this.editing = true;
    this.currentProduitId = produit.id;
    this.produitForm.patchValue(produit);
  }

  deleteProduit(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.produitService.deleteProduit(id).subscribe({
        next: () => {
          this.message = '🗑️ Product deleted';
          this.loadProduits();
        },
        error: (err) => this.message = '❌ Delete failed: ' + err.message
      });
    }
  }

  resetForm() {
    this.produitForm.reset();
    this.editing = false;
    this.currentProduitId = null;
  }
}
