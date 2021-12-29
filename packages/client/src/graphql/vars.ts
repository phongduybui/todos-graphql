import { makeVar } from '@apollo/client';
import { AuthPayload } from '../__generated__/graphql';

const userDataFromStorage = localStorage.getItem('loggedInUser');

const userData: AuthPayload | null = userDataFromStorage
  ? JSON.parse(localStorage.getItem('loggedInUser') as string)
  : null;

export const loggedInUser = makeVar(userData);
