const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateGrade(score) {
    if (score > 79) {
        return 'A';
    } else if (score >= 60 && score <= 79) {
        return 'B';
    } else if (score >= 50 && score <= 59) {
        return 'C';
    } else if (score >= 40 && score <= 49) {
        return 'D';
    } else {
        return 'E';
    }
}

function generateGradeFromInput() {
    // Prompt user for input
    rl.question('Enter student marks (between 0 and 100): ', function (userInput) {
        // Validate input
        const userMarks = parseFloat(userInput);
        if (isNaN(userMarks) || userMarks < 0 || userMarks > 100) {
            console.log('Invalid input. Please enter a valid number between 0 and 100.');
            rl.close();
            return;
        }

        // Generate and output grade
        const grade = generateGrade(userMarks);
        console.log(`Student Marks: ${userMarks}\nStudent Grade: ${grade}`);
        rl.close();
    });
}

// Call the function
generateGradeFromInput();
