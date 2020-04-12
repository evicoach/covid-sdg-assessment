const hospitalBedsByRequestedTime = (input, availBedsPct,
  casesByRequestedTime) => {
  let value = 0;
  value = parseInt((input.totalHospitalBeds * availBedsPct)
  - casesByRequestedTime, 10);
  return value;
};

export default hospitalBedsByRequestedTime;
