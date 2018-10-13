import * as fs from 'fs-extra';

import * as path from 'path';
import { ROUTER_LIST } from '../../site/src/app/router';

const indexTemplate = fs.readFileSync('./dist/index.html', 'utf-8');

const nav = navMenu();

function generateAll(): void {
  generateIntros();
  generateComponents();
  generateIndex();
}

function generateIntros(): void {
  ROUTER_LIST.intro.forEach(route => {
    const htmlFile = route.path.replace(/(.*)\/(\w+)$/, '$1-$2.html');
    generatePage(route.path, htmlFile, route.label);
  });
}

function generateComponents(): void {
  ROUTER_LIST.components.forEach(category => {
    category.children.forEach((route) => {
      const htmlFile = route.path.replace(/components\/(.*)$/, '$1.html');
      generatePage(route.path, htmlFile, route.zh || route.label);
    });
  });
}

function generateIndex(): void {
  const pageContent = indexTemplate.replace(/<app-root>[\s\S]*?<\/app-root>/, `<app-root><div style="overflow: hidden;height: 0"><nav>${nav}</nav><main></main></div></app-root>`);
  fs.writeFileSync('./dist/index.html', pageContent, 'utf-8');
}

function componentsOf(routes: Array<{ label: string, path: string, zh: string }>): string {
  return routes.map((route) => `<li><a href="/${route.path}">${route.zh || route.label}</a></li>`).join('\n');
}

function navMenu(): string {
  const intros = ROUTER_LIST.intro.map((route) => `<li><a href="/${route.path}">${route.label}</a></li>`)
    .join('\n');

  const categories = ROUTER_LIST.components.map((route) => `<li><h3>${route.name}</h3><ul>${componentsOf(route.children)}</ul></li>`);

  return `<ul>${intros}</ul><ul>${categories}</ul>`;
}

function generatePage(url: string, file: string, label: string): void {
  const content = fs.readFileSync(path.join('./site/src/app', file), 'utf-8');
  const pageContent = indexTemplate.replace(/<app-root>[\s\S]*?<\/app-root>/, `<app-root><div style="overflow: hidden;height: 0"><nav>${nav}</nav><main>${content}</main></div></app-root>`)
    .replace(/<title>(.*)<\/title>/, `<title>${label} - $1</title>`);
  const destFile = path.join('./dist', url + '.html');
  fs.mkdirpSync(path.dirname(destFile));
  fs.writeFileSync(destFile, pageContent, 'utf-8');
}

generateAll();
