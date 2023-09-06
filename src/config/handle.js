export const PriorityState = {
    5: 'Very High',
    4: 'Medium',
    3: 'Low',
    2: 'Very Low'
}

export const HandleUrgency = (urgency, colorScheme) => {
    console.log('state', urgency.urgency)
    switch (urgency.urgency) {
        case 6:
            console.log('Major')
            return 'Major'
        case 5:
            console.log('Very High')
            return 'Very High'
        case 4:
            console.log('Medium')
            return 'Medium'
        case 3:
            console.log('Low')
            return 'Low'
        case 2:
            console.log('Very Low')
            return 'Very Low'
        case 1:
            console.log('Minor')
            return 'Minor'
        default: console.log('default case: no')
    }
}

export const HandleBadgeUrgency = (urgency) => {

}
