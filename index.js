const inquirer = require("inquirer");
const fs = require('fs');

inquirer.prompt([
    {
        type: "input",
        name: "Username",
        message: "gitHub username:",
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
        name: "License",
        type: "input",
        message: "License:"
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
        name: "Contact",
        choices: [
            "email",
            "phone",
            "telekinesis"
        ]
    },
    {
        name: "Address",
        type: "input",
        message: "Contact email address:"
    }
]).then(function (data) {
    let tableOfContents = "\n## Table of Contents\n";
    let readMeContent = "";
    for (property in data) {
        if (data[property] !== "") {
            switch (property) {
                case "Contents":
                    if (data.Contents === true) {
                        for (property in data) {
                            if (data[property] != "") {
                                tableOfContents += `\n${property}`;
                            }
                            console.log(`key= ${property} value = ${data[property]}`)
                        }
                    } else {
                        tableOfContents = "";
                    }
                    readMeContent += tableOfContents;
                    break;
                case "Project_Title":
                    readMeContent += `\n# ${data[property]}\n### By ${data.Username}\n`;
                    break;
                case "Username":
                    break;
                case "Screenshot":
                    let screenShots = data[property].split(",");
                    screenShots.forEach(element => {
                        readMeContent += `\n![A screenshot of ${data.Project_Title}](${element})\n`;
                    });
                    break;
                default:
                    readMeContent += `\n## ${property}\n${data[property]}\n`;
            }
        }

    }
    fs.writeFile("README.md",
        readMeContent,
        function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Readme file created");

        });
});
