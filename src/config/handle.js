//handle mức độ ưu tiên của ticket
export const HandleUrgency = (urgency) => {
    switch (urgency.urgency) {
        case 6:
            return 'Major'
        case 5:
            return 'Very High'
        case 4:
            return 'Medium'
        case 3:
            return 'Low'
        case 2:
            return 'Very Low'
        case 1:
            return 'Minor'
        default: console.log('default case: no')
    }
}

//handle trạng thái của ticket
export const HandleBadgeStatus = (status) => {
    switch (status.status) {
        case 6:
            return 'Closed'
        case 5:
            return 'Solved'
        case 4:
            return 'Pending'
        case 3:
            return 'Processing (planned)'
        case 2:
            return 'Processing (assigned)'
        case 1:
            return 'New'
        default: console.log('default case: no')
    }
}

//handle màu sắc trạng thái của ticket
export const HandeStatusColor = (status) => {
    switch (status.status) {
        case 6: //Ticket Closed
            return "default"
        case 5://Solved
            //return 'Solved'
        case 4: //Pending
            // return 'Pending'
        case 3: //Processing (planned)
            // return 'Processing (planned)'
        case 2: //Processing (assigned)
            // return 'Processing (assigned)'
        case 1: //New
            return "success"
        default: 
    }
}

//handle màu sắc mức độ ưu tiên của ticket
export const HandeUrgencyColor = (urgency) => {
    switch (urgency.urgency) {
        case 6: //Major
            return 'error'
        case 5: //Very High
            return 'warning'
        case 4: //Medium
            return 'info'
        case 3: //Low
            return 'info'
        case 2: //Very Low
            return 'info'
        case 1: //Minor 😭
            //return "success"
        default: 
    }
}
