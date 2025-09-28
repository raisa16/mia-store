import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private url = environment.domains;

  getProducts(params: { categoryId?: string; categorySlug?: string }) {
    const url = new URL(`${this.url}/api/v1/products/`);
    if (params.categorySlug) {
      url.searchParams.set('categorySlug', params.categorySlug);
    }

    return this.http.get<Product[]>(url.toString());
  }

  getOne(slug: string) {
    const url = new URL(`${this.url}/api/v1/products/slug/${slug}`);
    return this.http.get<Product>(url.toString());
  }
  getRelatedProducts(slug: string) {
    const url = new URL(`${this.url}/api/v1/products/slug/${slug}/related`);
    return this.http.get<Product[]>(url.toString());
  }
}
