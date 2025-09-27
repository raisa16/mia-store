import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { environment } from '@env/environment';

export interface pageMetaData {
  title: string;
  description: string;
  image: string;
  url: string;
}

const defaultMetaData: pageMetaData = {
  title: 'Default Title',
  description: 'Default description for the application.',
  image: 'https://www.example.com/default-image.jpg',
  url: environment.apiUrl,
};

@Injectable({
  providedIn: 'root',
})
export class MetaTagsService {
  titleService = inject(Title);
  metaService = inject(Meta);

  updateMetaTags(metaData: Partial<pageMetaData> = defaultMetaData): void {
    const data = {
      ...defaultMetaData,
      ...metaData,
    };
    const tags = this.generateMetaDefinitions(data);

    tags.forEach(tag => this.metaService.updateTag(tag));
    this.titleService.setTitle(data.title);
  }
  private generateMetaDefinitions(metaData: pageMetaData): MetaDefinition[] {
    return [
      { name: 'title', content: metaData.title },
      { name: 'description', content: metaData.description },
      { name: 'og:title', content: metaData.title },
      { name: 'og:description', content: metaData.description },
      { name: 'og:url', content: metaData.url },
      { name: 'og:image', content: metaData.image },
    ];
  }
}
