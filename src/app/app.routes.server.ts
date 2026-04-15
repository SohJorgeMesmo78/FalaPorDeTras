import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'game/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { id: 'quem-sou-eu' },
      { id: 'cha-ou-cafe' }
    ]
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
