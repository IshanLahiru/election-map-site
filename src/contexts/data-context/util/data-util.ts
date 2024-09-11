import { Party } from '../types/data-intarfaces';

export const getPartyByName = (
  parties: Party[],
  partyName: string
): Party | undefined => {
  return parties.find(
    (party) => party.partyName.toLowerCase() === partyName.toLowerCase()
  );
};
