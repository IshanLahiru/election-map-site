import {
  ElectionResult,
  Party,
  PartyResult,
  ColorData,
} from '../types/data-intarfaces';
import divisionElectionResults from '../data/division_result.json';
import provinceElectionResults from '../data/province_result.json';

export interface SampleDataPack {
  divisionResultArray: ElectionResult[];
  provinceResultArray: ElectionResult[];
}

const OTHERS_CODE = 'OTH';

export const getPollingData = (): SampleDataPack => {
  return {
    divisionResultArray: divisionElectionResults as ElectionResult[],
    provinceResultArray: provinceElectionResults as ElectionResult[],
  };
};

export const calculateAllIslandResult = (
  provinceResultArray: ElectionResult[],
  partyList: Party[]
): ElectionResult => {
  let totalElectors = 0;
  let totalPolled = 0;
  let totalValid = 0;
  let totalRejected = 0;

  const partyVoteMap: { [key: string]: number } = {};

  partyList.forEach((party) => {
    partyVoteMap[party.partyCode] = 0;
  });

  provinceResultArray.forEach((result) => {
    totalElectors += result.summary.electors;
    totalPolled += result.summary.polled;
    totalValid += result.summary.valid;
    totalRejected += result.summary.rejected;

    result.by_party.forEach((partyResult) => {
      partyVoteMap[partyResult.party_code] =
        (partyVoteMap[partyResult.party_code] || 0) + partyResult.votes;
    });
  });

  const allIslandPartyResults: PartyResult[] = partyList.map((party) => {
    const votes = partyVoteMap[party.partyCode];
    const percentage = ((votes / totalPolled) * 100).toFixed(2);

    return {
      party_code: party.partyCode,
      votes,
      percentage,
      party_name: party.partyName,
      candidate: party.candidate,
    };
  });

  // The "Other Candidates" bucket is already an aggregate, not a single
  // candidate, so it should never occupy a "leading candidates" slot -
  // it always gets folded into the final rollup below.
  const namedResults = allIslandPartyResults.filter(
    (party) => party.party_code !== OTHERS_CODE
  );
  const othersBucket = allIslandPartyResults.find(
    (party) => party.party_code === OTHERS_CODE
  );

  namedResults.sort((a, b) => b.votes - a.votes);

  const top4Parties = namedResults.slice(0, 4);
  const remainingParties = namedResults.slice(4);

  const remainingVotes =
    remainingParties.reduce((sum, party) => sum + party.votes, 0) +
    (othersBucket?.votes || 0);

  if (remainingVotes > 0) {
    const otherPercentage = ((remainingVotes / totalPolled) * 100).toFixed(2);

    top4Parties.push({
      party_code: OTHERS_CODE,
      votes: remainingVotes,
      percentage: otherPercentage,
      party_name: 'Other Candidates',
      candidate: 'Various',
    });
  }

  const allIslandResult: ElectionResult = {
    timestamp: new Date().toISOString(),
    level: 'ALL_ISLAND',
    ed_code: 'ALL_ISLAND',
    ed_name: 'All Island',
    pd_code: 'ALL_ISLAND',
    pd_name: 'All Island',
    by_party: top4Parties,
    summary: {
      electors: totalElectors,
      polled: totalPolled,
      valid: totalValid,
      rejected: totalRejected,
      percent_valid: ((totalValid / totalPolled) * 100).toFixed(2),
      percent_rejected: ((totalRejected / totalPolled) * 100).toFixed(2),
      percent_polled: ((totalPolled / totalElectors) * 100).toFixed(2),
    },
    type: 'PRESIDENTIAL',
    sequence_number: '1',
  };

  return allIslandResult;
};

export const getWinningPartyColors = (
  resultArray: ElectionResult[],
  partyArray: Party[]
): ColorData[] => {
  return resultArray.map((result) => {
    const winningPartyResult = result.by_party.reduce((prev, current) =>
      current.votes > prev.votes ? current : prev
    );

    const winningParty = partyArray.find(
      (party) => party.partyCode === winningPartyResult.party_code
    );

    return {
      id: result.ed_code,
      color: winningParty ? winningParty.color : '#000000',
    };
  });
};
