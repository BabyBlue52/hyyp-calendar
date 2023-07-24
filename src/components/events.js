
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today 

export const INITIAL_EVENTS = [
    {
        "title": "The Title",
        "start": todayStr + 'T16:00:00', 
        "end": todayStr + 'T17:30:00', 
    },
    {
        "title": "The Other Title",
        "start": todayStr + 'T17:30:00',
        "end": todayStr + 'T18:30:00', 
    },
]

export function createEventsId() {
    return String(eventGuid++)
}
