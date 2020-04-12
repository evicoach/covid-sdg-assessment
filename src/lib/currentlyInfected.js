import impactLevel from './impactLevel';

const currentlyInfected = (reportedCases, neededImpact) => {
  if (neededImpact === impactLevel.IMPACT) {
    return reportedCases * 10;
  }
  return reportedCases * 50;
};

export default currentlyInfected;
