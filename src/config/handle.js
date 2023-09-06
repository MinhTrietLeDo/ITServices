export const PriorityState = {
    5: 'Very High',
    4: 'Medium',
    3: 'Low',
    2: 'Very Low'
}

export const HandleUrgency = (urgency, urgencyState) => {
    switch(urgency){
        case PriorityState[5]:
            return urgencyState(console.log('123'))

    }
}
