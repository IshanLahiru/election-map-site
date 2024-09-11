import {
  ElectionResult,
  Party,
  Division,
  Province,
  PartyResult,
  ColorData,
} from '../types/data-intarfaces';

export interface SampleDataPack {
  divisionResultArray: ElectionResult[];
  provinceResultArray: ElectionResult[];
}

interface PollingData {
  electors: number;
  polled: number;
  valid: number;
  rejected: number;
}

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function generateRandomVotingDataArray(length: number): PollingData[] {
  const array: PollingData[] = [];

  for (let i = 0; i < length; i++) {
    const electors = getRandomNumber(4000, 8000);
    const polled = getRandomNumber(Math.floor(electors * 0.8), electors);
    const valid = getRandomNumber(Math.floor(polled * 0.9), polled);
    const rejected = polled - valid;

    const data: PollingData = {
      electors,
      polled,
      valid,
      rejected,
    };

    array.push(data);
  }

  return array;
}

const generatePartyResults = (
  partyList: Party[],
  totalVotes: number
): PartyResult[] => {
  const results: PartyResult[] = [];
  let remainingVotes = totalVotes;

  const shuffledPartyList = [...partyList].sort(() => Math.random() - 0.5);

  shuffledPartyList.forEach((party, index) => {
    const maxVotesForParty =
      index === shuffledPartyList.length - 1
        ? remainingVotes
        : getRandomNumber(1, Math.floor(remainingVotes / 2));

    remainingVotes -= maxVotesForParty;
    const percentage = ((maxVotesForParty / totalVotes) * 100).toFixed(2);

    results.push({
      party_code: party.partyCode,
      votes: maxVotesForParty,
      percentage,
      party_name: party.partyName,
      candidate: party.candidate,
    });
  });

  results.sort((a, b) => b.votes - a.votes);

  return results;
};

export const getPollingData = (
  partyList: Party[],
  divisionArray: Division[],
  provinceArray: Province[],
  level: string
): SampleDataPack => {
  const divisionResultArray: ElectionResult[] = [];
  const provinceResultArray: ElectionResult[] = [];

  const lengthOfDivisionArray = divisionArray.length;
  const lengthOfProvinceArray = provinceArray.length;

  const randomVotingDataArrayDivision = generateRandomVotingDataArray(
    lengthOfDivisionArray
  );
  const randomVotingDataArrayProvince = generateRandomVotingDataArray(
    lengthOfProvinceArray
  );

  randomVotingDataArrayDivision.forEach((data, index) => {
    const divisionResult: ElectionResult = {
      timestamp: new Date().toISOString(),
      level,
      ed_code: divisionArray[index].divisionId,
      ed_name: divisionArray[index].divisionName,
      pd_code: divisionArray[index].divisionId,
      pd_name: divisionArray[index].divisionName,
      by_party: generatePartyResults(partyList, data.polled),
      summary: {
        valid: data.valid,
        rejected: data.rejected,
        polled: data.polled,
        electors: data.electors,
        percent_valid: ((data.valid / data.polled) * 100).toFixed(2),
        percent_rejected: ((data.rejected / data.polled) * 100).toFixed(2),
        percent_polled: ((data.polled / data.electors) * 100).toFixed(2),
      },
      type: 'ELECTION_TYPE',
      sequence_number: (index + 1).toString(),
    };

    divisionResultArray.push(divisionResult);
  });

  randomVotingDataArrayProvince.forEach((data, index) => {
    const provinceResult: ElectionResult = {
      timestamp: new Date().toISOString(),
      level,
      ed_code: provinceArray[index].provinceId,
      ed_name: provinceArray[index].provinceName,
      pd_code: provinceArray[index].provinceId,
      pd_name: provinceArray[index].provinceName,
      by_party: generatePartyResults(partyList, data.polled),
      summary: {
        valid: data.valid,
        rejected: data.rejected,
        polled: data.polled,
        electors: data.electors,
        percent_valid: ((data.valid / data.polled) * 100).toFixed(2),
        percent_rejected: ((data.rejected / data.polled) * 100).toFixed(2),
        percent_polled: ((data.polled / data.electors) * 100).toFixed(2),
      },
      type: 'ELECTION_TYPE',
      sequence_number: (index + 1).toString(),
    };

    provinceResultArray.push(provinceResult);
  });

  return {
    divisionResultArray,
    provinceResultArray,
  };
};

export const calculateAllIslandResult = (
  divisionResultArray: ElectionResult[],
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

  divisionResultArray.forEach((result) => {
    totalElectors += result.summary.electors;
    totalPolled += result.summary.polled;
    totalValid += result.summary.valid;
    totalRejected += result.summary.rejected;

    result.by_party.forEach((partyResult) => {
      partyVoteMap[partyResult.party_code] += partyResult.votes;
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

  allIslandPartyResults.sort((a, b) => b.votes - a.votes);

  const top4Parties = allIslandPartyResults.slice(0, 4);

  const otherParties = allIslandPartyResults.slice(4);

  if (otherParties.length > 0) {
    const totalOtherVotes = otherParties.reduce(
      (sum, party) => sum + party.votes,
      0
    );
    const otherPercentage = ((totalOtherVotes / totalPolled) * 100).toFixed(2);

    const otherPartyResult: PartyResult = {
      party_code: 'OTHERS',
      votes: totalOtherVotes,
      percentage: otherPercentage,
      party_name: 'Other Parties',
      candidate: 'N/A',
    };
    top4Parties.push(otherPartyResult);
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
    type: 'ELECTION_TYPE',
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
