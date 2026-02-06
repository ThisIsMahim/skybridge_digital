const mongoose = require('mongoose');
const uri = "mongodb+srv://mahimmasrafi04_db_user:v22eGYAP1rPEt6CP@skybridge.ykqvnzi.mongodb.net/";

mongoose.connect(uri)
    .then(async () => {
        // Allow any schema
        const projects = await mongoose.connection.db.collection('projects').find({}).toArray();
        console.log("PROJECT_COUNT: " + projects.length);
        if (projects.length > 0) {
            console.log("SAMPLE_PROJECT: " + JSON.stringify(projects[0], null, 2));
        }
        process.exit(0);
    })
    .catch(e => { console.log(e); process.exit(1); });
