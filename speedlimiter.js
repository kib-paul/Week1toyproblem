const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculateDemeritPoints(speed) {
    const speedLimit = 70;
    const pointsPerKmOverSpeedLimit = 5;
    const demeritPointsThreshold = 12;

    if (speed < speedLimit) {
        console.log('OK');
        return 0;
    } else {
        const demeritPoints = Math.floor((speed - speedLimit) / pointsPerKmOverSpeedLimit);
        console.log(`Points: ${demeritPoints}`);
        
        if (demeritPoints > demeritPointsThreshold) {
            console.log('License suspended');
        }

        return demeritPoints;
    }
}

function getSpeedInput() {
    rl.question('Enter car speed: ', function (userInput) {
        const speed = parseFloat(userInput);
        if (isNaN(speed) || speed < 0) {
            console.log('Invalid input. Please enter a valid speed.');
            rl.close();
            return;
        }

        calculateDemeritPoints(speed);
        rl.close();
    });
}

getSpeedInput();