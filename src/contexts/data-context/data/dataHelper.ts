import {
  ElectionResult,
  Party,
  Division,
  Province,
  PartyResult,
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

  partyList.forEach((party) => {
    const votes = getRandomNumber(1, remainingVotes);
    remainingVotes -= votes;
    const percentage = ((votes / totalVotes) * 100).toFixed(2);

    results.push({
      party_code: party.partyCode,
      votes,
      percentage,
      party_name: party.partyName,
      candidate: party.candidate,
    });
  });

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
