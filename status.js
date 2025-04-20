const indicator = document.getElementById("status-indicator");
const urlToCheck = "https://camper.isvery.fun"; // <- тут нужный URL

async function checkStatus() {
  indicator.className = "status-checking"; // Жёлтый и мигает

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 сек

    const response = await fetch(urlToCheck, {
      mode: "no-cors", // нужно для большинства сайтов
      signal: controller.signal
    });

    clearTimeout(timeout);
    indicator.className = "status-ok"; // Сайт работает

  } catch (e) {
    indicator.className = "status-error"; // Ошибка / не работает
  }
}

checkStatus();
setInterval(checkStatus, 15000); // Проверять каждые 15 секунд
