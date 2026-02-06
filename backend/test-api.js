const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/skybridge_db';

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✓ MongoDB Connected');

        const Project = require('./models/Project');
        const projects = await Project.find({});

        console.log(`\n📊 Total Projects in Database: ${projects.length}\n`);

        if (projects.length > 0) {
            projects.forEach((p, index) => {
                console.log(`[${index + 1}] ${p.title}`);
                console.log(`    Image: ${p.imageUrl || 'NO IMAGE'}`);
                console.log(`    Featured: ${p.featured ? 'YES' : 'NO'}`);
                console.log(`    Tags: ${p.tags ? p.tags.join(', ') : 'none'}\n`);
            });
        } else {
            console.log('⚠️  No projects found in database!');
            console.log('   Please add projects via Admin Panel at http://localhost:3000/admin/projects\n');
        }

        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err);
        process.exit(1);
    });
