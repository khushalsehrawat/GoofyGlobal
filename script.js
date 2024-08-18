function measureSpeed() {
    const downloadSpeedEl = document.getElementById('downloadSpeed');
    const uploadSpeedEl = document.getElementById('uploadSpeed');

    // Function to measure download speed
    async function testDownloadSpeed() {
        const startTime = new Date().getTime();
        const image = new Image();
        const cacheBuster = `?nnn=${startTime}`;
        image.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Small_Logo.png' + cacheBuster;
        
        return new Promise((resolve, reject) => {
            image.onload = () => {
                const endTime = new Date().getTime();
                const duration = (endTime - startTime) / 1000;
                const bitsLoaded = 8 * 6000; // Size of the image in bits (6 KB)
                const speedBps = (bitsLoaded / duration).toFixed(2); // Bits per second
                const speedMbps = (speedBps / (1024 * 1024)).toFixed(2); // Megabits per second
                resolve(speedMbps);
            };
            image.onerror = reject;
        });
    }

    // Function to measure upload speed (simulated for this example)
    async function testUploadSpeed() {
        // Simulated upload speed, replace with real measurement if needed
        return new Promise(resolve => setTimeout(() => resolve((Math.random() * 10).toFixed(2)), 2000));
    }

    // Run tests and display results
    testDownloadSpeed().then(speed => {
        downloadSpeedEl.textContent = speed;
    }).catch(() => {
        downloadSpeedEl.textContent = "Error";
    });

    testUploadSpeed().then(speed => {
        uploadSpeedEl.textContent = speed;
    }).catch(() => {
        uploadSpeedEl.textContent = "Error";
    });
}

document.getElementById('startTest').addEventListener('click', measureSpeed);
