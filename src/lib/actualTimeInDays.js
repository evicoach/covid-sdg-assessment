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

export default actualTimeInDays;
