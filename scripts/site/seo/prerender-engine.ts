// These are important and needed before anything else

require('zone.js/dist/zone-node');
require('reflect-metadata');
const fs = require('fs');
const path = require('path');
const {renderModuleFactory} = require('@angular/platform-server');

const {enableProdMode} = require('@angular/core');

const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();
const DIST_FOLDER = path.join(process.cwd(), 'dist');
const index = fs.readFileSync(path.join(DIST_FOLDER, 'index.html'));

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(path.join(process.cwd(), 'site/dist/main.js'));

export function renderPage(url: string): Promise<string> {
  return renderModuleFactory(AppServerModuleNgFactory, {
    document: index,
    url,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  });
}
