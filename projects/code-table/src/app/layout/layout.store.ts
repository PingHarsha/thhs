import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { MenuLink } from './shared/types';

interface InitialState {
  activeLink: Partial<MenuLink>;
  activeUrl: string;
  activeIds: string[];
}

export const LayoutStore = signalStore(
  { providedIn: 'root' },
  withState<InitialState>({
    activeLink: {},
    activeUrl: '',
    activeIds: [],
  }),
  withMethods(store => ({
    resetState() {
      patchState(store, { activeLink: {}, activeUrl: '' });
    },
    updateActiveLink({
      activeLink,
      activeUrl,
      activeIds,
    }: {
      activeLink: Partial<MenuLink>;
      activeUrl: string;
      activeIds: string[];
    }) {
      patchState(store, { activeLink, activeUrl, activeIds });
    },
  }))
);
