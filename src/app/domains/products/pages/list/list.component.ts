import {
  Component,
  inject,
  signal,
  OnInit,
  OnChanges,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';

import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
})
export default class ListComponent implements OnInit, OnChanges {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  readonly categoryId = input<string>();
  readonly slug = input<string>();

  categoriesResource = rxResource({
    loader: () => this.categoryService.getAll(),
  });

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges() {
    this.getProductsBySlug();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProductsBySlug() {
    this.productService.getProducts({ categorySlug: this.slug() }).subscribe({
      next: (products) => {
        this.products.set(products);
      },
    });
  }

  private getCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
    });
  }

  resetCategories() {
    this.categoriesResource.set([]);
  }

  reloadCategories() {
    this.categoriesResource.reload();
  }
}
