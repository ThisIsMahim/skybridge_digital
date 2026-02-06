const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.JWT_SECRET;
console.log(`Checking JWT Secret: ${secret ? 'Present' : 'Missing'}`);

if (!secret) {
    console.error('ERROR: JWT_SECRET is missing from .env');
    process.exit(1);
}

try {
    const token = jwt.sign({ id: 'test_id' }, secret, { expiresIn: '1h' });
    console.log('Token generated successfully.');

    const decoded = jwt.verify(token, secret);
    console.log('Token verified successfully.');
    console.log('Decoded ID:', decoded.id);

    if (decoded.id === 'test_id') {
        console.log('SUCCESS: JWT System is working correctly.');
    } else {
        console.error('ERROR: ID mismatch.');
    }

} catch (error) {
    console.error('ERROR:', error.message);
}
