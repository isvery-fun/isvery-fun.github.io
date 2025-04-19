const services = [
    { name: "camper.isvery.fun", url: "https://camper.isvery.fun", type: "http" }
];

async function checkHttp(url) {
    try {
        let response = await fetch(url, { method: 'GET', mode: 'no-cors' });
        return response.ok;
    } catch (e) {
        return false;
    }
}

async function updateStatus() {
    const isUp = await checkHttp(services[0].url);
    const statusIndicator = document.getElementById("status-camper");

    if (isUp) {
        statusIndicator.className = "status-indicator up";
    } else {
        statusIndicator.className = "status-indicator down";
    }
}

updateStatus();
setInterval(updateStatus, 60000);
