import { Component, effect, inject, input, linkedSignal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { MetaTagsService } from 'src/app/shared/meta-tags.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-detail.component.html',
})
export default class ProductDetailComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private metaTagsService = inject(MetaTagsService);

  readonly slug = input.required<string>();

  productRs = rxResource({
    params: () => ({
      slug: this.slug(),
    }),
    stream: ({ params }) => {
      return this.productService.getOne(params.slug);
    },
  });

  $cover = linkedSignal({
    source: this.productRs.value,
    computation: (product, previousValue) => {
      if (product && product.images.length > 0) {
        return product.images[0];
      }
      return previousValue?.value;
    },
  });

  constructor() {
    effect(() => {
      const product = this.productRs.value();
      this.metaTagsService.updateMetaTags({
        title: product?.title,
        description: product?.description,
        image: product?.images[0],
        url: environment.apiUrl + '/products/' + product?.slug,
      });
    });
  }

  changeCover(newImg: string) {
    this.$cover.set(newImg);
  }

  addToCart() {
    const product = this.productRs.value();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
