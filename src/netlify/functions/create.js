const fs = require('fs');
const db = require('../../db.json');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body);

    // Assuming every record has a unique ID. If not, you'll need to generate a unique ID here.
    const newWorkout = { ...data, id: db.length + 1 };

    // Updating the db.json file with the new workout
    db.push(newWorkout);
    fs.writeFileSync('../../db.json', JSON.stringify(db));

    return {
        statusCode: 201,
        body: JSON.stringify(newWorkout)
    };
};
