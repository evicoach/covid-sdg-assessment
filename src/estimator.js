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

const infectionsByRequestedTime = (input, impact, neededImpact) => {
  // NB: currentlyInfected doubles every 3 days
  const impactCurrentlyInfected = currentlyInfected(input.reportedCases, impact.IMPACT);
  const severeImpactCurrentlyInfected = currentlyInfected(input.reportedCases,
    impact.SEVERE_IMPACT);

  // Normalizing time to elapse
  let actualTime = 0;
  switch (input.periodType) {
    case 'days':
      actualTime = input.timeToElapse;
      break;
    case 'weeks':
      actualTime = input.timeToElapse * 7;
      break;
    case 'month':
      actualTime = input.timeToElapse * 30;
      break;
    default:
      actualTime = -1;
  }

  // Getting the factor
  const timeToDouble = 3;
  const factor = parseInt(actualTime / timeToDouble, 10);

  const impactByReqTime = calImpactByRequestedTime(impactCurrentlyInfected, factor);
  const severeImptByReqTime = calImpactByRequestedTime(severeImpactCurrentlyInfected, factor);

  // Set the appropriate properties of both impact of severe impact
  if (neededImpact.toLowerCase() === impactLevel.IMPACT) return impactByReqTime;
  if (neededImpact.toLowerCase() === impactLevel.SEVERE_IMPACT) return severeImptByReqTime;
  return null;
};

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  const impactCurrentlyInfected = currentlyInfected(data.reportedCases, impactLevel.IMPACT);
  const severeImpactCurrentlyInfected = currentlyInfected(data.reportedCases,
    impactLevel.SEVERE_IMPACT);

  impact.currentlyInfected = impactCurrentlyInfected;
  severeImpact.currentlyInfected = severeImpactCurrentlyInfected;

  impact.infectionsByRequestedTime = infectionsByRequestedTime(data.timeToElapse,
    impactLevel, impactLevel.IMPACT);
  severeImpact.infectionsByRequestedTime = infectionsByRequestedTime(data.timeToElapse,
    impactLevel, impactLevel.SEVERE_IMPACT);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
