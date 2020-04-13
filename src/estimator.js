import currentlyInfected from './lib/currentlyInfected';
import impactLevel from './lib/impactLevel';
import dollarsInFlight from './lib/dollarsInFlight';
import hospitalBedsByRequestedTime from './lib/hospitalBedsByRequestedTime';
import infectionsByRequestedTime from './lib/infectionsByRequestedTime';
import percentNeeded from './lib/percentNeeded';
// The main function
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

  impact.severeCasesByRequestedTime = percentNeeded(data, 15,
    impactLevel.IMPACT);
  severeImpact.severeCasesByRequestedTime = percentNeeded(data, 15,
    impactLevel.SEVERE_IMPACT);

  impact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime(
    data, availableBedsPct, impact.severeCasesByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime(
    data, availableBedsPct, severeImpact.severeCasesByRequestedTime
  );

  impact.casesForICUByRequestedTime = percentNeeded(data, 5,
    impactLevel.IMPACT);
  severeImpact.casesForICUByRequestedTime = percentNeeded(data, 5,
    impactLevel.SEVERE_IMPACT);

  impact.casesForVentilatorsByRequestedTime = percentNeeded(data, 2,
    impactLevel.IMPACT);
  severeImpact.casesForVentilatorsByRequestedTime = percentNeeded(data, 2,
    impactLevel.SEVERE_IMPACT);

  impact.dollarsInFlight = dollarsInFlight(data, impactLevel.IMPACT);
  severeImpact.dollarsInFlight = dollarsInFlight(data, impactLevel.SEVERE_IMPACT);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
