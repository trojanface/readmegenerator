const inquirer = require("inquirer");
const fs = require('fs');

inquirer.prompt([
    {
        name: "Username",
        message: "gitHub username:"
    },
    {
        name: "Project Title",
        message: "Project Title:"
    },
    {
        name: "Description",
        message: "Description:"
    },
    {
        name: "Screenshot",
        message: "Screenshot Link/s:"
    },
    {
        name: "Installation",
        message: "Installation Instructions:"
    },
    {
        name: "Usage",
        message: "Usage Instructions:"
    },
    {
        name: "License",
        message: "License:"
    },
    {
        name: "Contributors",
        message: "Contributors:"
    },
    {
        name: "Tests",
        message: "Tests:"
    },
    {
        name: "Picture",
        message: "gitHub profile picture?"
    },
    {
        name: "Address",
        message: "gitHub email address?"
    }
]).then(function(data) {
console.log(data);
});