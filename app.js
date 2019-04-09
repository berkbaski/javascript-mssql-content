const express = require('express');
const app = express();
const sql = require("mssql");

require('custom-env').env();

var config = {
    user: process.env.db_user,
    password: process.env.db_password,
    server: process.env.db_server,
    database: process.env.db_name
};

app.get('/table', function (req, res) {

    sql.connect(config, function (err) {

        if (err) res.send({
            success: false,
            err
        });

        var request = new sql.Request();

        request.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'", function (err, recordset) {

            if (err) res.send({
                success: false,
                err
            });
            else res.send({
                success: true,
                result: recordset
            });

            sql.close();

        });
    });
});

app.get('/view', function (req, res) {

    sql.connect(config, function (err) {

        if (err) res.send({
            success: false,
            err
        });

        var request = new sql.Request();

        request.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'VIEW'", function (err, recordset) {

            if (err) res.send({
                success: false,
                err
            });
            else res.send({
                success: true,
                result: recordset
            });

            sql.close();

        });
    });
});

app.get('/sp', function (req, res) {

    sql.connect(config, function (err) {

        if (err) res.send({
            success: false,
            err
        });

        var request = new sql.Request();

        request.query("SELECT * FROM " + process.env.db_name + ".information_schema.routines WHERE ROUTINE_TYPE = 'PROCEDURE'", function (err, recordset) {

            if (err) res.send({
                success: false,
                err
            });
            else res.send({
                success: true,
                result: recordset
            });

            sql.close();

        });
    });
});

var server = app.listen(process.env.PORT, function () {
    console.log('Server is running on ' + process.env.PORT + '..');
});