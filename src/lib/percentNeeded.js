import infectionsByRequestedTime from './infectionsByRequestedTime';
import impactLevel from './impactLevel';

const percentNeeded = (input, percent, neededImpact) => {
  const value = ((percent / 100).toFixed(2)) * infectionsByRequestedTime(input,
    impactLevel, neededImpact);
  return parseInt(value, 10);
};

export default percentNeeded;
