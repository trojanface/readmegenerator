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
        name: "Picture",
        type: "input",
        message: "gitHub profile picture?"
    },
    {
        name: "Address",
        type: "input",
        message: "gitHub email address?"
    }
]).then(function (data) {
    fs.writeFile("README.md",
        `#${data.Project_Title}

##Description

##Table of Contents

##Installation

##Usage

##License

##Contributing

##Tests

##Questions
    
        `,
        function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Readme file created");

        });
});
