function checkSiteStatus(url, timeout = 5000) {
  return new Promise((resolve) => {
    // Создаём таймаут, который отвергнет промис через timeout миллисекунд
    const timer = setTimeout(() => {
      resolve(false); // по таймауту считаем, что сайт недоступен
    }, timeout);

    fetch(url, { method: 'HEAD', mode: 'no-cors' })
      .then(response => {
        clearTimeout(timer);
        // При режиме no-cors статус всегда 0, но fetch не падает, считаем доступным
        // Если нужен более точный статус — mode: 'cors' и сервер должен разрешать CORS
        resolve(true);
      })
      .catch(() => {
        clearTimeout(timer);
        resolve(false);
      });
  });
}

function setIndicatorColor(element, enable) {
  element.classList.remove("status-ok", "status-error");
  if (enable) {
    element.classList.add("status-ok");
  } else {
    element.classList.add("status-error");
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const camperInd = document.getElementById("camper-indicator");
  const pansanggInd = document.getElementById("pansangg-indicator");
  const meexInd = document.getElementById("meex-indicator");

  checkSiteStatus("https://camper.isvery.fun")
    .then(result => setIndicatorColor(camperInd, result));

  checkSiteStatus("https://pansangg.isvery.fun")
    .then(result => setIndicatorColor(pansanggInd, result));

  checkSiteStatus("https://meex.isvery.fun")
    .then(result => setIndicatorColor(meexInd, result));
});
