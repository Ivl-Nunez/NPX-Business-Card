#! /usr/bin/env node

'use strict'

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
clear();

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do?",
        choices: [
            {
                name: `Send me an ${chalk.green.bold("email")}?`,
                value: () => {
                    open("mailto:mnunez1013@gmail.com");
                    console.log("\nDone, see you soon at inbox.\n");
                }
            },
            {
                name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
                value: () => {
                    // cliSpinners.dots;
                    const loader = ora({
                        text: ' Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();
                    let pipe = request('https://docs.google.com/document/d/e/2PACX-1vRJ1x4hun5VZq1q55PIaBrw7DPoi9CQgb3IQjR6QKRK6HAFS7qoXTltmsS-98fkTg/pub').pipe(fs.createWriteStream('./michael-nunez-resume.docx'));
                    pipe.on("finish", function () {
                        let downloadPath = path.join(process.cwd(), 'michael-nunez-resume.docx')
                        console.log(`\nResume Downloaded at ${downloadPath} \n`);
                        open(downloadPath)
                        loader.stop();
                    });
                }
            },

            {
                name: `Schedule a ${chalk.redBright.bold("Meeting")}?`,
                value: () => {
                    open('https://calendly.com/newnez/general-meeting');
                    console.log("\n See you at the meeting \n");
                }
            },
            {
                name: "Just quit.",
                value: () => {
                    console.log("Hasta la vista.\n");
                }
            }
        ]
    }
];

const data = {
    name: chalk.bold.green("             Michael Nunez"),
    //handle: chalk.white("@anmol098"),
    work: `${chalk.white("Freelancer")}`,// ${chalk
        // .hex("#2b82b2")
        // .bold("FootLoose Labs")}`,
    //twitter: chalk.gray("https://twitter.com/") + chalk.cyan("misteranmol"),
    github: chalk.gray("https://github.com/") + chalk.green("IvI-Nunez"),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("newnez"),
    //web: chalk.cyan("https://anmolsingh.me"),
    npx: chalk.red("npx") + " " + chalk.white("nunez"),

    //labelWork: chalk.white.bold("       Work:"),
    //labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelWeb: chalk.white.bold("        Web:"),
    //labelCard: chalk.white.bold("       Card:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        //`${data.labelWork}  ${data.work}`,
        //``,
        //`${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        //`${data.labelWeb}  ${data.web}`,
        ``,
        `${data.npx}`,
        ``,
        `${chalk.italic(
            "Always interested in making new connections!"
        )}`,
        `${chalk.italic("Send me an email or schedule a meeting.")}`,
        `${chalk.italic(
            "Hope to hear from you soon :) "
        )}`,
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "green"
    }
);

console.log(me);
const tip = [
    `Tip: Try ${chalk.cyanBright.bold(
        "cmd/ctrl + click"
    )} on the links above`,
    '',
].join("\n");
console.log(tip);

prompt(questions).then(answer => answer.action());
