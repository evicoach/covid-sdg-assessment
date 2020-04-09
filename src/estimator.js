const impactLevel = {
  IMPACT: 'impact',
  SEVERE_IMPACT: 'severeimpact'
};

const currentlyInfected = (reportedCases, neededImpact) => {
  if (neededImpact === impactLevel.IMPACT) {
    return reportedCases * 10;
  }
  return reportedCases * 50;
};

const calImpactByRequestedTime = (currentlyInfectedNum,
  factor) => currentlyInfectedNum * (2 ** factor);

const actualTimeInDays = (input) => {
  let timeInDays = 0;
  switch (input.periodType) {
    case 'days':
      timeInDays = input.timeToElapse;
      break;
    case 'weeks':
      timeInDays = input.timeToElapse * 7;
      break;
    case 'months':
      timeInDays = input.timeToElapse * 30;
      break;
    default:
      timeInDays = 1;
  }
  return timeInDays;
};
const infectionsByRequestedTime = (input, impact, neededImpact) => {
  // NB: currentlyInfected doubles every 3 days
  const impactCurrentlyInfected = currentlyInfected(input.reportedCases, impact.IMPACT);
  const severeImpactCurrentlyInfected = currentlyInfected(input.reportedCases,
    impact.SEVERE_IMPACT);

  // Normalizing time to elapse
  const actualTime = actualTimeInDays(input);

  // Getting the factor
  let timeToDouble = 3;
  if (timeToDouble <= 0) {
    timeToDouble = 1;
  }
  const factor = parseInt(actualTime / timeToDouble, 10);
  let value = 0;
  const impactByReqTime = calImpactByRequestedTime(impactCurrentlyInfected, factor);
  const severeImptByReqTime = calImpactByRequestedTime(severeImpactCurrentlyInfected, factor);

  // Set the appropriate properties of both impact of severe impact
  if (neededImpact.toLowerCase() === impactLevel.IMPACT) value = impactByReqTime;
  if (neededImpact.toLowerCase() === impactLevel.SEVERE_IMPACT) value = severeImptByReqTime;
  return value;
};

// const severeCasesByRequestedTime = (input, neededImpact) => {
//   const severeCases = 0.15 * infectionsByRequestedTime(input, impactLevel, neededImpact);
//   return parseInt(severeCases, 10);
// };

// const casesForICUByRequestedTime = (input, neededImpact) => {
//   let fivePct = 0.05 * infectionsByRequestedTime(input, impactLevel, neededImpact);
//   return parseInt(fivePct, 10);
// }

// const pctNeeded = (input, percent, neededImpact) => {
//   const value = ((percent / 100).toFixed(2)) * infectionsByRequestedTime(input,
//     impactLevel, neededImpact);
//   return parseInt(value, 10);
// };

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  const availableBedsPct = 0.35;

  const impactCurrentlyInfected = currentlyInfected(data.reportedCases, impactLevel.IMPACT);
  const severeImpactCurrentlyInfected = currentlyInfected(data.reportedCases,
    impactLevel.SEVERE_IMPACT);

  impact.currentlyInfected = impactCurrentlyInfected;
  severeImpact.currentlyInfected = severeImpactCurrentlyInfected;

  impact.infectionsByRequestedTime = parseInt(infectionsByRequestedTime(data,
    impactLevel, impactLevel.IMPACT), 10);
  severeImpact.infectionsByRequestedTime = parseInt(infectionsByRequestedTime(data,
    impactLevel, impactLevel.SEVERE_IMPACT), 10);

  // CHALLENGE 2

  impact.severeCasesByRequestedTime = pctNeeded(data, 15,
    impactLevel.IMPACT);
  severeImpact.severeCasesByRequestedTime = pctNeeded(data, 15,
    impactLevel.SEVERE_IMPACT);

  impact.hospitalBedsByRequestedTime = parseInt((data.totalHospitalBeds * availableBedsPct)
    - impact.severeCasesByRequestedTime, 10);
  severeImpact.hospitalBedsByRequestedTime = parseInt((data.totalHospitalBeds * availableBedsPct)
     - severeImpact.severeCasesByRequestedTime, 10);

  // CHALLENGE 3

  impact.casesForICUByRequestedTime = 0.05
    * impact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = 0.05
   * severeImpact.infectionsByRequestedTime;

  impact.casesForVentilatorsByRequestedTime = 0.02
   * impact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = 0.02
   * severeImpact.infectionsByRequestedTime;

  impact.dollarsInFlight = impact.infectionsByRequestedTime
    * data.region.avgDailyIncomeInUSD
    * data.region.avgDailyIncomePopulation
    * actualTimeInDays(data);
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime
    * data.region.avgDailyIncomeInUSD
    * data.region.avgDailyIncomePopulation
    * actualTimeInDays(data);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
