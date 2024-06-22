document.addEventListener('DOMContentLoaded', function() {
  const actionButton = document.getElementById('actionStartButton');

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTab = tabs[0];
    var statusElement = document.getElementById('status');
    var totalElement = document.getElementById('total');
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
})

function automateClicks() {
  var addButtons = document.querySelector('.ant-table-tbody').getElementsByTagName('button')

  for (let i = 0; i < addButtons.length; i++) {
    setTimeout(() => {
      addButtons[i].click();
      console.log(`Button ${i+1} -----> Clicked`);
    }, 1000 * i)
  }

  const nextPageButton = document.querySelector(".ant-pagination-next .ant-pagination-item-link");

  if (nextPageButton) {
    setTimeout(() => {
      nextPageButton.click();
      setTimeout(automateClicks, 5000);
    }, addButtons.length * 1000 + 1000);
  }
}

document.getElementById('actionStartButton').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: automateClicks,
    });
  });  
});
