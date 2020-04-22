const inquirer = require("inquirer");
const fs = require('fs');

inquirer.prompt([
    {
        type: "input",
        name: "Username",
        message: "gitHub username:"
    },
    {
        type: "input",
        name: "Project_Title",
        message: "Project Title:"
    },
    {
        name: "Description",
        type: "input",
        message: "Description:"
    },
    {
        type: "list",
        message: "Include a Table of Contents:",
        name: "Contents",
        choices: [
          "Yes",
          "No"
        ]
      },
    {
        name: "Screenshot",
        type: "input",
        message: "Screenshot Link/s:"
    },
    {
        name: "Installation",
        type: "input",
        message: "Installation Instructions:"
    },
    {
        name: "Usage",
        type: "input",
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
        name: "contact",
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
    let readMeContent ="";
    for (property in data) {
        if (data[property] !== "" && property !== "Contents") {
            readMeContent += `\n## ${property}\n${data[property]}\n`;
        }
        if (property === "Contents") {
            if (data.Contents === "Yes") {
                for (property in data) {
                    if (data[property] != "") {
                        tableOfContents += `\n${property}`;
                    }
                    console.log(`key= ${property} value = ${data[property]}`)
                }
            } else {
                tableOfContents = "";
            }
        }
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
