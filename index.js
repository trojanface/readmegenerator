//Imports the required NPM packages for accepting user input and altering the file system
const inquirer = require("inquirer");
const fs = require('fs');


//Prompt user with various questions for readme file generation.
inquirer.prompt([
    {
        type: "input",
        name: "Username",
        message: "gitHub username:",
        //is validated as the user MUST supply their username.
        validate: (input) => {
            if (input === "") {
                return "Must be answered";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "Project_Title",
        message: "Project Title:",
        //is validated as the user MUST supply a project name.
        validate: (input) => {
            if (input === "") {
                return "Must be answered";
            }
            return true;
        }
    },
    {
        name: "Description",
        type: "input",
        message: "Description:"
    },
    {
        type: "confirm",
        message: "Include a Table of Contents:",
        name: "Contents"
    },
    {
        name: "Screenshot",
        type: "input",
        message: "Screenshot Link/s (seperate by , ):"
    },
    {
        name: "Deployed",
        type: "input",
        message: "Link to deployed App https://:"
    },
    {
        name: "Installation",
        type: "editor",
        message: "Installation Instructions:"
    },
    {
        name: "Usage",
        type: "editor",
        message: "Usage Instructions:"
    },
    {
        type: "list",
        message: "License:",
        name: "License",
        choices: [
            "Public Domain",
            "Permissive",
            "Copyleft",
            "Proprietary"
        ]
    },
    {
        name: "Contributors",
        type: "input",
        message: "Contributors:"
    },
    {
        name: "Tests",
        type: "input",
        message: "Tests:"
    },
    {
        type: "list",
        message: "Preferred Contact Method:",
        name: "Contact_Preference",
        choices: [
            "Email",
            "Phone"
        ]
    },
    {
        name: "Address",
        type: "input",
        message: "Contact email address:"
    }
]).then(function (data) {
    //creates a prefilled Table of Contents variable and a blank readme string.
    let tableOfContents = "\n## Table of Contents\n";
    let readMeContent = "";
    //loops through the properties in the user prompts and checks if they're empty. Any empty sections are not included in the readme file.
    for (property in data) {
        if (data[property] !== "") {
            //Checks for various cases which require individual formatting.
            switch (property) {
                //table of contents will generate based on the properties which have been answered not including formatting properties such as username and project title.
                case "Contents":
                    if (data.Contents === true) { //checks that a contents table has been selected to include.
                        for (property in data) {
                            if (property != "Username" && property != "Project_Title") { //Ensures current property isn't a formatting property.
                                if (data[property] != "") {
                                    tableOfContents += `\n${property}`; //Adds the property to the table of contents variable.
                                }
                            }
                        }
                    } else {
                        tableOfContents = "";
                    }
                    readMeContent += tableOfContents; //Adds the contents table to the readme file.
                    break;
                case "Project_Title": //Uses the formatting properties to create the header and sub-header.
                    readMeContent += `\n# ${data[property]}\n### By ${data.Username}\n`;
                    break;
                case "Username"://Does not include the username property in the default behaviour.
                    break;
                case "Deployed"://Special formatting requirements for the link to the deployed app.
                    readMeContent += `\n## Link to Deployed App\nhttps://${data.Deployed}\n`;
                    break;
                case "Screenshot"://Special formatting requirements for the screenshots.
                    let screenShots = data[property].split(",");
                    screenShots.forEach(element => {
                        readMeContent += `\n![A screenshot of ${data.Project_Title}](${element})\n`;
                    });
                    break;
                    case "Contact_Preference"://Special formatting requirements for the Contact preference
                        readMeContent += `\n## ${property}\n${data[property]} - `;
                    break;
                    case "Address"://Special formatting for the address property
                        readMeContent += `${data[property]}`;
                    break;
                default://By default it adds the property as a title and its value as the text beneath
                    readMeContent += `\n## ${property}\n${data[property]}\n`;
            }
        }

    }
    fs.writeFile("new README.md", //creates a new readme file.
        readMeContent,
        function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Readme file created");

        });
});
