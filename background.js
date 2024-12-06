let targetUrl = "crazygames.com"; // Base URL to check
let timerRunning = false;

function startTimer() {
  if (!timerRunning) {
    timerRunning = true;
    fetch('http://localhost:5000/start_timer')
      .then(response => response.text())
      .then(data => console.log(data));
  }
}

function stopTimer() {
  if (timerRunning) {
    timerRunning = false;
    fetch('http://localhost:5000/stop_timer')
      .then(response => response.text())
      .then(data => console.log(data));
  }
}

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (tab.url.startsWith(`https://${targetUrl}`)) {
      startTimer();
    } else {
      stopTimer();
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      if (tabs[0].id === tabId && tabs[0].url.startsWith(`https://${targetUrl}`)) {
        startTimer();
      } else {
        stopTimer();
      }
    });
  }
});
