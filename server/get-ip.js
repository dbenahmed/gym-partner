import os from 'os';

function getHostIp() {
    const interfaces = os.networkInterfaces();

    for (const name of Object.keys(interfaces)) {
        // Ignore virtual and loopback interfaces
        if (name.toLowerCase().includes('docker') || name.toLowerCase().includes('wsl') || name.toLowerCase().includes('vethernet')) {
            continue;
        }

        for (const iface of interfaces[name]) {
            // Grab the first external IPv4 address
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const ip = getHostIp();
console.log(`[IP_ADDRESS]: ${ip}`);