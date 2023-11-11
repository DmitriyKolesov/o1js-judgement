import { writable } from 'svelte/store';
import { wait } from '../helpers/wait';
import type { Contest } from '../types/Contest';

const contestInitialState: {
  contests: Contest[];
  loading: boolean;
  error: string | null;
  updating: boolean;
} = {
  contests: [],
  loading: false,
  error: null,
  updating: false,
}

export const contestsStore = writable(contestInitialState);

export async function loadContests() {
  contestsStore.update(store => ({ ...store, loading: true, error: null }));
  try {
    //const response = await fetch('https://your-api.com/entities');
    await wait(1000);
    const contests = [] as Contest[];
    //await response.json();

    contestsStore.update(store =>
      ({ ...store, contests, loading: false, error: null }));
  } catch (error: any) {
    contestsStore.update(store =>
      ({ ...store, contests: [], loading: false, error: error.message || `Something went wrong, try again later` }));
  }
}

export async function addContest(contest: Contest) {
  contestsStore.update(store => ({ ...store, updating: true, error: null }));
  try {
    await wait(1000);
    contestsStore.update(store =>
      ({ ...store, contests: [...store.contests, contest], updating: false }));
  } catch (error: any) {
    contestsStore.update(store =>
      ({ ...store, updating: false, error: error.message || `Something went wrong, try again later` }));
  }
}

export async function addParticipant({ participantId, contestId }) {
  contestsStore.update(store => ({ ...store, updating: true, error: null }));
  try {
    await wait(1000);
    //execute method for adding participant to contest
    contestsStore.update(store =>
      ({ ...store, updating: false }));
  } catch (error: any) {
    contestsStore.update(store =>
      ({ ...store, updating: false, error: error.message || `Something went wrong, try again later` }));
  }
}


