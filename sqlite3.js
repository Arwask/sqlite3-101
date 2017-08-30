'use strict';

const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('employeeData.sqlite', (err) => {
    if(err)
        console.log("Err:", err.toString());
    console.log("Connected");
});


const deleteTable = () => {
    db.run('DROP TABLE IF EXISTS employees');
    createTable();
}

const createTable = () => {
    db.run('CREATE TABLE IF NOT EXISTS employees (id INT, firstName TEXT, lastName TEXT, jobTitle TEXT, salary INT, address TEXT)', () => {
        populateData();
    });
}

const populateData = () => {
    const { employees } = require('./employeeData.json');
    employees.forEach( (employee) => {
        db.run(`INSERT INTO employees VALUES(
            ${employee.id},
            "${employee.firstName}",
            "${employee.lastName}",
            "${employee.jobTitle}",
            ${employee.salary},
            "${employee.address}")`)
       });
    // getAllData();
    // getJobTitles();
    getSpecificTitle();
}

// Write a statement to query the database and console.log() all employee records.

// const getAllData = () => {
//     db.each('SELECT * FROM employees', (err, data) => {
//         if(err)
//             console.log('errorr', err.toString());
//         console.log(data);
//     })
// }

//Write a statement to query the database and console.log() each employees jobTitle.

// const getJobTitles = () => {
//     db.each('SELECT firstName || " " || lastName as Name, jobTitle FROM employees', (err, data) => {
//         if(err)
//             console.log('errorr', err.toString());
//         console.log("Name:", data.Name, "Title:", data.jobTitle);
//     })
// }

// Write a statement to query the database and console.log() each employees firstName, lastName and address only.

// const getJobTitles = () => {
//     db.each('SELECT firstName, lastName, address FROM employees', (err, data) => {
//         if(err)
//             console.log('errorr', err.toString());
//         console.log(data);
//     })
// }

const getSpecificTitle = () => {
    db.get('select * from employees where jobTitle = "Manager"', (err, data) => {
        if(err) 
            console.log(err.toString());
        console.log("Manager:", data)
    })
}
deleteTable();