# Closure Chrome Extension

**Closure** is a Chrome extension designed to help you manage your browser tabs more efficiently. It automatically closes inactive tabs after a specified period of inactivity and keeps track of the closed tabs, allowing you to easily reopen them from the popup interface. 

## Features
- Automatically closes inactive tabs after a user-defined time interval.
- Keeps a record of closed tabs and allows you to reopen them easily.
- Customizable inactivity threshold for closing tabs.
- Simple and user-friendly popup interface for configuration and tab management.

## How It Works

The extension works in the background, tracking the activity of all open tabs. If a tab remains inactive (not in focus) for a specified amount of time, it will be automatically closed. The closed tabs are stored, and you can view them in the popup and reopen them with just one click.

### Key Components:
1. **Inactivity Threshold**: You can set a time limit in minutes after which inactive tabs will be closed automatically.
2. **Closed Tabs List**: A list of recently closed tabs is available in the popup, with an option to reopen any of them.
3. **Manual Tab Closure**: You can adjust the inactivity threshold in real-time, and the extension will adapt immediately.

---

## Installation

1. **Clone or Download this Repository:**
   ```
   git clone https://github.com/thewisepeter/closure
   ```

2. **Load the Extension in Chrome:**
   - Open Google Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer Mode** by toggling the switch in the top right corner.
   - Click on **Load unpacked** and select the folder where you cloned/downloaded this repository.
   - The extension will now be installed and appear in your Chrome extensions toolbar.

3. **Usage:**
   - Click on the **Closure Extension** icon in the toolbar to open the popup.
   - Set your desired inactivity threshold (in minutes).
   - The extension will begin automatically closing inactive tabs and keeping a list of them.
   - You can reopen any closed tabs from the popup by clicking the "Reopen" button.

---

## Customization

To modify the inactivity threshold or other settings:
- Open the popup by clicking the **Closure** icon in your toolbar.
- Adjust the inactivity threshold (in minutes) in the input field and click **Save**.

---

## Contributing

Feel free to fork this project, make improvements, and submit a pull request. Contributions are always welcome!

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
