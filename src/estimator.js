const covid19ImpactEstimator = (data)=>{
    const IMPACT = 'impact';
    const SEVERE_IMPACT = 'severeimpact';

    let impactCurrentlyInfected = 0;
    let severeImpactCurrentlyInfected = 0;
    let impact = {};
    let severeImpact = {};

    const calImpactByRequestedTime = (currentlyInfected, factor)=>{
        return currentlyInfected * Math.pow(2, factor);
    }

    const infectionsByRequestedTime = (timeToElapse, impactLevel)=>{
        // NB: currentlyInfected doubles every 3 days
        impactCurrentlyInfected =
            currentlyInfected(data['reportedCases'], IMPACT);
        severeImpactCurrentlyInfected = 
            currentlyInfected(data['reportedCases'], SEVERE_IMPACT);

        // Normalizing time to elapse
        let actualTime = 0;
        switch(timeToElapse){
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

        const impactInfectionsByRequestedTime =
             calImpactByRequestedTime(impactCurrentlyInfected, factor)
        const severeImpactInfectionsByRequestedTime =
             calImpactByRequestedTime(severeImpactCurrentlyInfected, factor);

        // Set the appropriate properties of both impact of severe impact
        impact.infectionsByRequestedTime = impactInfectionsByRequestedTime;
        severeImpact.infectionsByRequestedTime = severeImpactInfectionsByRequestedTime;
    };
    
    const currentlyInfected = (reportedCases, impactLevel)=>{
        switch(impactLevel.toLowerCase()){
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

    impact.infectionsByRequestedTime =
         infectionsByRequestedTime(data['timeToElapse'], IMPACT);
    severeImpact.infectionsByRequestedTime =
         infectionsByRequestedTime(data['timeToElapse'], SEVERE_IMPACT);

    return {
        data,
        impact,
        severeImpact
    }
};

export default covid19ImpactEstimator;