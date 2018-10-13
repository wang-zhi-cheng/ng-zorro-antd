import * as fs from 'fs-extra';
import * as path from 'path';

import {minify} from 'html-minifier';

import { ROUTER_LIST } from '../../../site/src/app/router';
import { renderPage } from './prerender-engine';

function generateAll(): void {
  renderPage('/docs/introduce/zh').then(html => {
    generateIntros(html, 'zh');
  });
  renderPage('/docs/introduce/en').then(html => {
    generateIntros(html, 'en');
  });
  renderPage('/components/button/zh').then(html => {
    generateComponents(html, 'zh');
  });
  renderPage('/components/button/en').then(html => {
    generateComponents(html, 'en');
  });
  renderPage('/').then(html => {
    generateIndex(html);
  });
}

function generateIntros(template: string, lang: string): void {
  ROUTER_LIST.intro
    .filter(it => it.language === lang)
    .forEach(route => {
      const htmlFile = route.path.replace(/(.*)\/(\w+)$/, '$1-$2.html');
      generatePage(template, route.path, htmlFile, route.label);
    });
}

function generateComponents(template: string, lang: string): void {
  ROUTER_LIST.components.forEach(category => {
    category.children
      .filter(it => it.language === lang)
      .forEach((route) => {
        const htmlFile = route.path.replace(/components\/(.*)$/, '$1.html');
        generatePage(template, route.path, htmlFile, route.zh || route.label);
      });
  });
}

const minifyOptions = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  removeAttributeQuotes: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  useShortDoctype: true
};

function generateIndex(template: string): void {
  fs.writeFileSync('./dist/index.html', minify(template, minifyOptions), 'utf-8');
}

function generatePage(template: string, url: string, file: string, label: string): void {
  const content = fs.readFileSync(path.join('./site/src/app', file), 'utf-8');
  const pageContent = template.replace(/<article\b[\s\S]*?<\/article>/, `${content}`)
    .replace(/<title>(.*)<\/title>/, `<title>${label} - $1</title>`);
  const destFile = path.join('./dist', url + '.html');
  fs.mkdirpSync(path.dirname(destFile));
  fs.writeFileSync(destFile, minify(pageContent, minifyOptions), 'utf-8');
}

generateAll();
