const { exec } = require('child_process');

var playersInQueue1 = [];
var playersInQueue2 = [];
var playersInQueue3 = [];

exports.queueForGame = function (user) {
    console.log('queue for game ' + user.id + ' ' + user.rank);
    if (user.rank > 8) { // 9 and 10
        playersInQueue1.push(user);
        checkIfQueueIsReady(playersInQueue1);
    } else if (user.rank <= 8 && user.rank >= 5) { // 8 to 5
        playersInQueue2.push(user);
        checkIfQueueIsReady(playersInQueue2);
    } else if (user.rank <= 4 && user.rank >= 1) { // 4 to 1
        playersInQueue3.push(user);
        checkIfQueueIsReady(playersInQueue3);
    }
};

function checkIfQueueIsReady(queue) {
    for (user in queue) {
        console.log('test: ' + user.id);
    }
    if (queue.length > 1) {
        startServer(queue);
    }
}

function startServer(queue) {
    const startSh = exec('sh test.sh', (error, stdout, stderr) => {
        console.log('server started for: ');
        for (user in queue) {
            console.log(user);
        }
    });
};
