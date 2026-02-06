const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/skybridge_db';

console.log('Connecting to MongoDB at:', MONGO_URI);

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✓ Connected to DB');

        // Define schema inline to avoid module path issues
        const projectSchema = new mongoose.Schema({}, { strict: false });
        const Project = mongoose.model('Project', projectSchema, 'projects'); // explicit collection name

        const projects = await Project.find({});

        console.log('---------------------------------------------------');
        console.log(`Found ${projects.length} projects in the database.`);
        console.log('---------------------------------------------------');

        projects.forEach((p, i) => {
            console.log(`Project #${i + 1}:`);
            console.log(`  _id: ${p._id}`);
            console.log(`  Title: ${p.title}`);
            console.log(`  ImageUrl (Raw in DB): '${p.imageUrl}'`);
            console.log(`  Featured: ${p.featured}`);
            console.log('---------------------------------------------------');
        });

        if (projects.length === 0) {
            console.log("WARNING: No projects found. The frontend will likely show static fallback data.");
        } else {
            const hasFeatured = projects.some(p => p.featured);
            if (!hasFeatured) {
                console.log("WARNING: Projects exist but NONE are marked as 'Featured'.");
                console.log("Check WorkSection.tsx logic. If it prioritizes featured, it might be skipping these.");
            }

            const possibleBadPaths = projects.filter(p => !p.imageUrl || (!p.imageUrl.startsWith('http') && !p.imageUrl.startsWith('uploads')));
            if (possibleBadPaths.length > 0) {
                console.log("WARNING: Some image paths look suspicious (not http and not starting with 'uploads').");
            }
        }

        process.exit(0);
    })
    .catch(err => {
        console.error('DB Connection Error:', err);
        process.exit(1);
    });
