# Chrome Extension: Automated Button Clicking

This Chrome Extension automates the process of clicking buttons on a web page, particularly designed for use with Rephonic list URLs.

## Description

The extension checks if the current active tab is a Rephonic list URL. If it is, it enables an action button (`actionStartButton`). Upon clicking this button, the extension will automatically click all button elements within a specific section of the page and then navigate through pagination to continue the clicking process.

## How It Works

1. **Initialization**:
   - The extension listens for the `DOMContentLoaded` event to ensure the DOM is fully loaded.
   - It queries the currently active tab to check its URL.
   - If the URL matches the specified pattern (`https://rephonic.com/search`), it updates the status on the popup and enables the action button.
   
2. **Automate Clicks**:
   - When the action button is clicked, the extension runs a script that clicks all buttons in a certain table body (`.ant-table-tbody`).
   - After clicking all buttons on the current page, it checks for a "Next Page" button and, if available, clicks it and continues the process after a short delay.
   
## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" using the toggle switch at the top-right.
4. Click "Load unpacked" and select the directory where you cloned/downloaded this repository.

## Usage

1. Navigate to a Rephonic list URL (e.g., `https://rephonic.com/search`).
2. Open the extension popup by clicking its icon in the Chrome toolbar.
3. Observe the status message on the popup:
   - If the URL is correct, the message `"You found a list!"` will display, and the action button will be enabled.
   - If not, the message `"Please go to Rephonic List URL"` will display, and the action button will be disabled.
4. Click the enabled action button to start the automated clicking process.

## Script Breakdown

### Event Listeners

- **DOMContentLoaded**: Sets up the initial state of the action button based on the current URL.
- **Action Button Click**: Executes the `automateClicks` function in the active tab.

### Functions

#### `automateClicks()`
This function:
- Selects all buttons within `.ant-table-tbody` and clicks each one sequentially with a 1-second delay.
- Checks for a "Next Page" button and clicks it, then recursively calls itself after a delay to process the next page.

```javascript
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
```

## Note

Ensure that you have the necessary permissions and consents from the website owner before running automated scripts that interact with their site.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.