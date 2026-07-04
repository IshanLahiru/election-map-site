import { Party } from '../types/data-intarfaces';

export const getPartyByCode = (
  parties: Party[],
  partyCode: string
): Party | undefined => {
  return parties.find((party) => party.partyCode === partyCode);
};

export const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};
