function updateTime() {
    const now = new Date();
    document.getElementById("time").textContent = now.toLocaleTimeString("lt-LT", { hour: '2-digit', minute: '2-digit' });
}

updateTime();
setInterval(updateTime, 1000);