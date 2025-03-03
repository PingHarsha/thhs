import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withState,
} from '@ngrx/signals';
import { computed, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { APP_ROUTES } from './shared/constants';
import { MenuLink } from './layout/shared/types';
import { LayoutStore } from './layout/layout.store';

const data = <T extends { [i: string]: any }>(links: T, parentPath = '') => {
  const keys = Object.keys(links);
  const obj: MenuLink[] = [];
  keys.forEach(key => {
    const route = structuredClone(links[key]);
    route.path =
      route.parent.length === 0
        ? `/${route.path}`
        : `${parentPath}/${route.path}`;
    if (route?.children) {
      route.children = structuredClone(
        data(structuredClone(route.children), route.path)
      );
    }
    obj.push({
      path: route.path,
      children: route.children,
      title: route.title,
      id: route.id,
    });
  });
  return obj;
};
const getDetails = (
  data: MenuLink[],
  targetUrl: string
): MenuLink | undefined => {
  return data.find(({ children, path }) => {
    if (children) {
      return getDetails(children, targetUrl);
    }
    return path === targetUrl ? path : undefined;
  });
};

const initialState = {
  projects: APP_ROUTES.projects,
  productionTables: APP_ROUTES.productionTables,
  admin: APP_ROUTES.admin,
  rugs: APP_ROUTES.rugs,
};

const menuLinks: MenuLink[] = [];

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState({
    _appLinks: initialState,
    _menuLinks: menuLinks,
  }),
  withHooks({
    onInit: (
      store,
      router = inject(Router),
      destroyRef = inject(DestroyRef),
      layoutStore = inject(LayoutStore)
    ) => {
      patchState(store, { _menuLinks: data(store._appLinks()) });
      router.events.pipe(takeUntilDestroyed(destroyRef)).subscribe(event => {
        const extracted = (
          urlSegments: string[],
          currentMatchingUrl: string,
          activeIds: string[],
          links: MenuLink[]
        ) => {
          urlSegments.forEach((urlSegment, index) => {
            const segment =
              currentMatchingUrl !== ''
                ? `${currentMatchingUrl}/${urlSegment}`
                : `/${urlSegment}`;

            const matchingLink = links.find(link => link.path === segment);
            if (matchingLink) {
              activeIds.push(matchingLink.id);
              extracted(
                urlSegments.splice(index),
                segment,
                activeIds,
                matchingLink.children ?? []
              );
            }
          });
        };

        if (event instanceof NavigationEnd) {
          const { urlAfterRedirects: activeUrl } = event;
          const activeLink = getDetails(store._menuLinks(), activeUrl);
          if (activeLink) {
            const urlSegments = activeUrl
              .split('/')
              .filter(segment => segment !== '');
            const activeIds: string[] = [];
            const links = store._menuLinks();
            extracted(urlSegments, '', activeIds, links);
            layoutStore.updateActiveLink({ activeLink, activeUrl, activeIds });
          }
        }
      });
    },
  }),
  withComputed(store => ({
    menuLinks: computed(() => store._menuLinks),
  }))
);
