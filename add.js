document.addEventListener('DOMContentLoaded', function() {
  const actionButton = document.getElementById('actionStartButton');

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTab = tabs[0];
    var statusElement = document.getElementById('status');
    var baseUrl = currentTab.url;

    if (baseUrl.includes('https://rephonic.com/search')) {
      statusElement.textContent = "You found a list!";
      statusElement.style.fontSize = "20px";
      actionButton.disabled = false;
      actionButton.classList.add("activeButton");
      actionButton.style.backgroundColor = "#007BFF";
      actionButton.style.color = "white";
      actionButton.style.cursor = "pointer";
      actionButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = "#0056b3";
      });
      actionButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = "#007BFF";
      });
    } else {
      statusElement.textContent = "Please go to Rephonic List URL";
      statusElement.style.fontSize = "20px";
      actionButton.disabled = true;
      actionButton.classList.remove("activeButton");
      actionButton.style.backgroundColor = "grey";
      actionButton.style.color = "white";
      actionButton.style.cursor = "not-allowed";
    }
  });
});

function setRunningState(isRunning) {
  chrome.storage.local.set({ isRunning: isRunning });
}

document.getElementById('actionStartButton').addEventListener('click', function() {
  chrome.storage.local.get('isRunning', (result) => {
    const isRunning = result.isRunning;

    if (isRunning) {
      setRunningState(false);
      this.textContent = "Start";
    } else {
      setRunningState(true);
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: automateClicks,
        });
      });
      this.textContent = "Stop";
    }
  });
});

function automateClicks() {
  chrome.storage.local.get('isRunning', function(result) {
    if (!result.isRunning) return;

    var addButtons = document.querySelector('.ant-table-tbody').getElementsByTagName('button');

    for (let i = 0; i < addButtons.length; i++) {
      setTimeout(() => {
        chrome.storage.local.get('isRunning', function(result) {
          if (!result.isRunning) return;

          addButtons[i].click();
          console.log(`Button ${i + 1} -----> Clicked`);
        });
      }, 1000 * i)
    }

    const nextPageButton = document.querySelector(".ant-pagination-next .ant-pagination-item-link");

    if (nextPageButton) {
      setTimeout(() => {
        chrome.storage.local.get('isRunning', function(result) {
          if (!result.isRunning) return;

          nextPageButton.click();
          setTimeout(automateClicks, 5000);
        });
      }, addButtons.length * 1000 + 1000);
    }
  });
}