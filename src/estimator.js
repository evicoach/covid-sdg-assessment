const covid19ImpactEstimator = (data) => {
  const IMPACT = 'impact';
  const SEVERE_IMPACT = 'severeimpact';

  const impact = {};
  const severeImpact = {};

  let impactCurrentlyInfected = currentlyInfected(data.reportedCases, IMPACT);
  let severeImpactCurrentlyInfected = currentlyInfected(data.reportedCases, SEVERE_IMPACT);

  impact.currentlyInfected = impactCurrentlyInfected;
  severeImpact.currentlyInfected = severeImpactCurrentlyInfected;

  impact.infectionsByRequestedTime = infectionsByRequestedTime(data.timeToElapse, IMPACT);
  severeImpact.infectionsByRequestedTime = infectionsByRequestedTime(data.timeToElapse, SEVERE_IMPACT);

  return {
    data,
    impact,
    severeImpact
  };
};

const currentlyInfected = (reportedCases, impactLevel) => {
  switch (impactLevel.toLowerCase()) {
    case 'impact':
      return reportedCases * 10;
    case 'severeimpact':
      return reportedCases * 50;
    default:
      throw Error('No such Impact');
  }
};

const calImpactByRequestedTime = (currentlyInfectedNum,
  factor) => currentlyInfectedNum * (2 ** factor);

const infectionsByRequestedTime = (timeToElapse, impactLevel) => {
    // NB: currentlyInfected doubles every 3 days
    impactCurrentlyInfected = currentlyInfected(data.reportedCases, IMPACT);
    severeImpactCurrentlyInfected = currentlyInfected(data.reportedCases, SEVERE_IMPACT);

    // Normalizing time to elapse
    let actualTime = 0;
    switch (timeToElapse) {
      case 'days':
        actualTime = timeToElapse;
        break;
      case 'weeks':
        actualTime = timeToElapse * 7;
        break;
      case 'month':
        actualTime = timeToElapse * 30;
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
    if(impactLevel.toLowerCase() === 'impact') return impactByReqTime;
    if(impactLevel.toLowerCase() === 'severeimpact') return severeImptByReqTime;
  };

export default covid19ImpactEstimator;
