//handle mức độ ưu tiên của ticket
export const HandleUrgency = (urgency) => {
    switch (urgency.urgency) {
        case 6:
            return 'Major'
        case 5:
            return 'High'
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
            return "#444444"
        case 5://Solved
            return "#595E60"
        case 4: //Pending
            return "#AEC300"
        case 3: //Processing (planned)
            return "#FFA500"
        case 2: //Processing (assigned)
            return "#FFA500"
        case 1: //New
            return "#32CD32"
        default:
    }
}

//handle màu sắc mức độ ưu tiên của ticket
export const HandeUrgencyColor = (urgency) => {
    switch (urgency.urgency) {
        case 6: //Major
            return "red"
        case 5: //High
            return "#FF7D61"
        case 4: //Medium
            return "#f0ad4e"
        case 3: //Low
            return "#5bc0de"
        case 2: //Very Low
            return "#5bc0de"
        case 1: //Minor 😭
            return "gray"
        default: return "gray"
    }
}

//handle khứa noti
export const HandleNoti = (navigate, noti) => {
    console.log('AAAAAAAAA')
}

export const NotiOnOff = (noti) => {
    switch (noti){
        // case 
    }
}