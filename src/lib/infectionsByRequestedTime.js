import actualTimeInDays from './actualTimeInDays';
import currentlyInfected from './currentlyInfected';
import impactLevel from './impactLevel';

const calImpactByRequestedTime = (currentlyInfectedNum,
  factor) => currentlyInfectedNum * (2 ** factor);

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

export default infectionsByRequestedTime;
