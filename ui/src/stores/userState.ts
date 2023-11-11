import { writable } from 'svelte/store';

const userInitialState = {
  walletKeys: [],
};

export const userStore = writable(userInitialState);

export function saveUserData({ walletKeys }) {
  userStore.update(store => ({ ...store, walletKeys }));
}
