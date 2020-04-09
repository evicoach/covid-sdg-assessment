const covid19ImpactEstimator = (data)=>{
    const IMPACT = "impact";
    const SEVERE_IMPACT = "severeimpact";

    let output = {};
    
    let impact = {};
    let severeImpact = {};

    // Copy the input data as property of the output
    output.data = {...data, region: data['region']};

    impact.currentlyInfected = data['reportedCases'] * 10;
    severeImpact.currentlyInfected = data['reportedCases'] * 50;

    impact.infectionsByRequestedTime = (timeInDays)=>{
        // NB: currentlyInfected doubles every 3 days
    };
    severeImpact.infectionsByRequestedTime = (timeInDays)=>{
        // NB: currentlyInfected doubles every 3 days
    };

    return {
        data,
        impact,
        severeImpact
    }
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

export default covid19ImpactEstimator;