import { CatalogController } from './controllers/catalog.controller';

import { CatalogService } from './services/catalog.service';

export const controllersArray = [CatalogController];

export const providersArray = [CatalogService];
