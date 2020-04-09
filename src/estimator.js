const covid19ImpactEstimator = (data) => {
    const IMPACT = 'impact';
    const SEVERE_IMPACT = 'severeimpact';

    const impact = {};
    const severeImpact = {};

    let impactCurrentlyInfected = 0;
    let severeImpactCurrentlyInfected = 0;

    const calImpactByRequestedTime = (currentlyInfected, factor) => currentlyInfected * Math.pow(2, factor);

    const infectionsByRequestedTime = (timeToElapse) => {
        // NB: currentlyInfected doubles every 3 days
        impactCurrentlyInfected = currentlyInfected(data.reportedCases, IMPACT);
        severeImpactCurrentlyInfected = currentlyInfected(data.reportedCases, SEVERE_IMPACT);

        // Normalizing time to elapse
        let actualTime = 0;
        switch (timeToElapse) {
            case 'days':
                return actualTime = timeToElapse;
            case 'weeks':
                return actualTime = timeToElapse * 7;
            case 'month':
                return actualTime = timeToElapse * 30;
        }

        // Getting the factor
        let timeToDouble = 3;
        let factor = parseInt(actualTime / timeToDouble);

        const impactInfectionsByRequestedTime = calImpactByRequestedTime(impactCurrentlyInfected, factor)
        const severeImpactInfectionsByRequestedTime = calImpactByRequestedTime(severeImpactCurrentlyInfected, factor);

        // Set the appropriate properties of both impact of severe impact
        impact.infectionsByRequestedTime = impactInfectionsByRequestedTime;
        severeImpact.infectionsByRequestedTime = severeImpactInfectionsByRequestedTime;
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
    }

    impact.currentlyInfected = impactCurrentlyInfected;
    severeImpact.currentlyInfected = severeImpactCurrentlyInfected;

    impact.infectionsByRequestedTime = infectionsByRequestedTime(data.timeToElapse);
    severeImpact.infectionsByRequestedTime = infectionsByRequestedTime(data.timeToElapse);

    return {
        data,
        impact,
        severeImpact
    };
};

export default covid19ImpactEstimator;
