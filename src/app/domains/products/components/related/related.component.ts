import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '@shared/services/product.service';
import { ProductComponent } from '@products/components/product/product.component';

@Component({
  selector: 'app-related',
  imports: [ProductComponent],
  templateUrl: './related.component.html',
})
export class RelatedComponent {
  private productService = inject(ProductService);
  $slug = input.required<string>();

  relatedProducts = rxResource({
    params: () => ({
      slug: this.$slug(),
    }),
    stream: ({ params }) => {
      return this.productService.getRelatedProducts(params.slug);
    },
  });
}
