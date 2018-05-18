## Punchclock Tracker Extension

A wrapper browser extension for Coding Avenue's punch clock application (w/ extra functionalities).

### Getting Started

Before you can use the extension, you will need to compile the source code first. Once the compilation is successful, the build files can be located inside the `dist` directory. 

### Prerequisites

Install [NodeJS](https://nodejs.org/).

### Installing

1.) Install dependencies

    npm install --verbose
    
2.) Compile the source code

    npm run prod
    
3.) Open your Chrome browser and open the extensions page by entering **[chrome://extensions](chrome://extensions)** into the address bar or go to **Settings** > **More Tools** > **Extensions**.

4.) Enable the **Developer Mode** by clicking the switch located at the top right of the page.

5.) After enabling **Developer Mode**, a **Load Unpacked** button should appear together with 2 more buttons. Click the **Load Unpacked** button then locate and select the `dist` directory where the compiled files are stored.

If installation is successful, you should be able to see the extension in the list and a coding avenue logo should appear at the right side of the menu bar in your Chrome browsser.

Click the logo and log-in using your account in order for the extension to start tracking your time. 


### Built With

[VueJS](https://vuejs.org/) - Main library used

[Laravel Mix](https://github.com/JeffreyWay/laravel-mix) - A Webpack wrapper
