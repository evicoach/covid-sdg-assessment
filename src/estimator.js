const covid19ImpactEstimator = (data)=>{

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
};

const currentlyInfected = (reportedCases, impactLevel)=>{
    switch(impactLevel.toLowerCase()){
        case 'impact':
            return reportedCases * 10;
            case 'severeimpact':
                return reportedCases * 50;
    }
}

export default covid19ImpactEstimator;