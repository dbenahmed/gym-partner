const dum = [
    {
        "id": 1,
        "sessionId": 32,
        "exerciseId": 914,
        "creationdate": "2025-06-29T17:54:41.074Z",
        "order": 1,
        "weight": [10, 12, 8],
        "unit": ["kg", "kg", "lbs"],
        "reps": [10, 12, 8],
        "sessions": {
            "id": 32,
            "planId": null,
            "name": "Session 1",
            "starttime": "2025-06-29T16:54:41.000Z",
            "endtime": "2025-06-29T16:54:41.000Z",
            "note": "This is a note for session 1",
            "rating": 2,
            "createdBy": 51
        }
    },
    {
        "id": 2,
        "sessionId": 33,
        "exerciseId": 915,
        "creationdate": "2025-07-01T09:30:15.123Z",
        "order": 1,
        "weight": [15, 18, 12],
        "unit": ["kg", "kg", "kg"],
        "reps": [8, 10, 12],
        "sessions": {
            "id": 33,
            "planId": 2,
            "name": "Morning Workout",
            "starttime": "2025-07-01T08:30:00.000Z",
            "endtime": "2025-07-01T09:45:00.000Z",
            "note": "Great morning session",
            "rating": 4,
            "createdBy": 51
        }
    },
    {
        "id": 3,
        "sessionId": 33,
        "exerciseId": 916,
        "creationdate": "2025-07-01T09:35:22.456Z",
        "order": 2,
        "weight": [20, 22, 18],
        "unit": ["kg", "kg", "kg"],
        "reps": [6, 8, 10],
        "sessions": {
            "id": 33,
            "planId": 2,
            "name": "Morning Workout",
            "starttime": "2025-07-01T08:30:00.000Z",
            "endtime": "2025-07-01T09:45:00.000Z",
            "note": "Great morning session",
            "rating": 4,
            "createdBy": 51
        }
    },
    {
        "id": 4,
        "sessionId": 34,
        "exerciseId": 917,
        "creationdate": "2025-07-02T14:20:30.789Z",
        "order": 1,
        "weight": [25, 30, 20],
        "unit": ["lbs", "lbs", "kg"],
        "reps": [5, 6, 8],
        "sessions": {
            "id": 34,
            "planId": 1,
            "name": "Afternoon Push",
            "starttime": "2025-07-02T13:15:00.000Z",
            "endtime": "2025-07-02T14:30:00.000Z",
            "note": "Focused on strength today",
            "rating": 5,
            "createdBy": 51
        }
    },
    {
        "id": 5,
        "sessionId": 34,
        "exerciseId": 918,
        "creationdate": "2025-07-02T14:25:45.012Z",
        "order": 2,
        "weight": [12, 15, 10],
        "unit": ["kg", "kg", "kg"],
        "reps": [12, 15, 18],
        "sessions": {
            "id": 34,
            "planId": 1,
            "name": "Afternoon Push",
            "starttime": "2025-07-02T13:15:00.000Z",
            "endtime": "2025-07-02T14:30:00.000Z",
            "note": "Focused on strength today",
            "rating": 5,
            "createdBy": 51
        }
    },
    {
        "id": 6,
        "sessionId": 35,
        "exerciseId": 919,
        "creationdate": "2025-07-03T11:45:18.345Z",
        "order": 1,
        "weight": [40, 45, 35],
        "unit": ["lbs", "lbs", "lbs"],
        "reps": [4, 5, 6],
        "sessions": {
            "id": 35,
            "planId": 3,
            "name": "Heavy Day",
            "starttime": "2025-07-03T10:30:00.000Z",
            "endtime": "2025-07-03T12:00:00.000Z",
            "note": "Personal records today!",
            "rating": 5,
            "createdBy": 51
        }
    },
    {
        "id": 7,
        "sessionId": 36,
        "exerciseId": 920,
        "creationdate": "2025-07-03T19:15:33.678Z",
        "order": 1,
        "weight": [8, 10, 12],
        "unit": ["kg", "kg", "kg"],
        "reps": [15, 20, 25],
        "sessions": {
            "id": 36,
            "planId": null,
            "name": "Evening Cardio",
            "starttime": "2025-07-03T18:00:00.000Z",
            "endtime": "2025-07-03T19:30:00.000Z",
            "note": "Light evening workout",
            "rating": 3,
            "createdBy": 51
        }
    },
    {
        "id": 8,
        "sessionId": 36,
        "exerciseId": 921,
        "creationdate": "2025-07-03T19:20:45.901Z",
        "order": 2,
        "weight": [5, 7, 9],
        "unit": ["kg", "kg", "kg"],
        "reps": [20, 25, 30],
        "sessions": {
            "id": 36,
            "planId": null,
            "name": "Evening Cardio",
            "starttime": "2025-07-03T18:00:00.000Z",
            "endtime": "2025-07-03T19:30:00.000Z",
            "note": "Light evening workout",
            "rating": 3,
            "createdBy": 51
        }
    }
]

console.log(dum.sort((a, b) => new Date(b.creationdate) - new Date(a.creationdate)).filter(item => {
    const ses = dum[0].sessionId;
    return item.sessionId === ses
}).sort((a, b) => (a.order - b.order)))