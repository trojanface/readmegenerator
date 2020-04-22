const inquirer = require("inquirer");
const fs = require('fs');

inquirer.prompt([
    {
        type: "input",
        name: "Username",
        message: "gitHub username:"
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
        message: "Screenshot Link/s:"
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
                default:
                    readMeContent += `\n## ${property}\n${data[property]}\n`;
            }
        }



        // if (data[property] !== "" && property !== "Contents") {
        //     readMeContent += `\n## ${property}\n${data[property]}\n`;
        // }
        // if (property === "Contents") {
        //     if (data.Contents === "Yes") {
        //         for (property in data) {
        //             if (data[property] != "") {
        //                 tableOfContents += `\n${property}`;
        //             }
        //             console.log(`key= ${property} value = ${data[property]}`)
        //         }
        //     } else {
        //         tableOfContents = "";
        //     }
        // }
    }






    fs.writeFile("README.md",
        readMeContent,
        //         `# ${data.Project_Title}
        //         By ${data.Username} ${data.Contributors}

        // ## Description
        // ${data.Description}

        // Badges will go here

        // build status
        // issues (waffle.io maybe)
        // devDependencies
        // npm package
        // coverage

        // Screenshot here
        // ${tableOfContents}

        // ## Installation
        // ${data.Installation}

        // ## Usage
        // ${data.Usage}

        // ## License
        // ${data.License}

        // ## Contributing
        // ${data.Contributors}

        // ## Tests
        // ${data.Tests}

        // ## Contact Information
        // ${data.Username}
        // ${data.Address}
        //         `
        function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Readme file created");

        });
});
