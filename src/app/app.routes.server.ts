import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'recettes/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () =>
      Promise.resolve([
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
        { id: '8' },
        { id: '9' },
        { id: '10' },
      ]),
  },

  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
