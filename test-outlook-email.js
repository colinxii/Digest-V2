const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Sample test data
const testData = {
    recipient: {
        name: 'John Doe',
        title: 'Senior Advisor'
    },
    today: new Date(),
    matured_mortgages: [
        {
            date: new Date('2025-01-15'),
            amount: 250000,
            members: 'Smith Family',
            crm_link: '#',
            last_update: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
        },
        {
            date: new Date('2025-01-20'),
            amount: 175000,
            members: 'Johnson Trust',
            crm_link: '#',
            last_update: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
        }
    ],
    renewing_mortgages: [
        {
            date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
            amount: 300000,
            members: 'Williams Estate',
            crm_link: '#',
            last_update: new Date()
        },
        {
            date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
            amount: 425000,
            members: 'Brown Corporation',
            crm_link: '#',
            last_update: new Date()
        }
    ],
    appointmentData: [
        { Year: 2025, Month: 1, Day: 5, Count: 3 },
        { Year: 2025, Month: 1, Day: 10, Count: 2 },
        { Year: 2025, Month: 1, Day: 15, Count: 4 },
        { Year: 2025, Month: 1, Day: 20, Count: 1 },
        { Year: 2025, Month: 1, Day: 25, Count: 2 },
        { Year: 2024, Month: 12, Day: 20, Count: 3 },
        { Year: 2024, Month: 12, Day: 15, Count: 2 }
    ],
    appointments: [
        {
            date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            service: 'Mortgage Review',
            members: 'Davis Family',
            crm_link: '#',
            last_update: new Date()
        },
        {
            date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
            service: 'Investment Planning',
            members: 'Miller Trust',
            crm_link: '#',
            last_update: new Date()
        }
    ],
    getRelativeTimeString: function(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Updated today';
        if (diffDays === 1) return 'Updated yesterday';
        return `Updated ${diffDays} days ago`;
    }
};

// Read and render the template
const templatePath = path.join(__dirname, 'views', 'advisordigest.ejs');
const template = fs.readFileSync(templatePath, 'utf8');

const html = ejs.render(template, testData, {
    filename: templatePath,
    views: [path.join(__dirname, 'views')]
});

// Save the rendered HTML
const outputPath = path.join(__dirname, 'test-outlook-email.html');
fs.writeFileSync(outputPath, html);

console.log('Test email generated successfully!');
console.log(`Output saved to: ${outputPath}`);
console.log('\nTo test in Outlook:');
console.log('1. Open the generated HTML file in a browser');
console.log('2. Select all (Ctrl+A) and copy (Ctrl+C)');
console.log('3. Paste into an Outlook email compose window');
console.log('4. Send the email to yourself to test rendering');
