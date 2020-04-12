import impactLevel from './impactLevel';
import infectionsByRequestedTime from './infectionsByRequestedTime';
import actualTimeInDays from './actualTimeInDays';

const dollarsInFlight = (input, neededImpact) => {
  if (neededImpact === impactLevel.IMPACT) {
    return parseInt((infectionsByRequestedTime(input,
      impactLevel, impactLevel.IMPACT)
      * input.region.avgDailyIncomePopulation
      * input.region.avgDailyIncomeInUSD)
      / actualTimeInDays(input), 10);
  } if (neededImpact === impactLevel.SEVERE_IMPACT) {
    return parseInt((infectionsByRequestedTime(input,
      impactLevel, impactLevel.SEVERE_IMPACT)
      * input.region.avgDailyIncomePopulation
      * input.region.avgDailyIncomeInUSD)
      / actualTimeInDays(input), 10);
  }
  return null;
};

export default dollarsInFlight;
