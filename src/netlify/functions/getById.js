const db = require('../../db.json');

exports.handler = async (event, context) => {
    const id = event.path.split('/').pop();
    const record = db.find(item => item.id === parseInt(id));

    if (!record) {
        return {
            statusCode: 404,
            body: 'Not Found'
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(record)
    };
};
