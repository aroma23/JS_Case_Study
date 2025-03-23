// const odbc = require("odbc");

// // const cn = "DSN=usrProd;UID=username1;PWD=password1";

// const cn = "DRIVER=IBM i Access ODBC Driver;SERVER=db2://cpl3:4474/RDB2LCS1;UID=TRSDPS2;PWD=jQk4kkH2P1tNASRvUCz1AA==--Txr9m1AwevtbdmfZKiSWBg==;DATABASE=RDB2LCS1";

// odbc.connect(cn, (error, connection) => {
//   connection.query(
//     "SELECT * FROM QIWS.QCUSTCDT FETCH FIRST 6 ROWS ONLY",
//     (error, result) => {
//       if (error) {
//         throw error;
//       }
//       console.log(result);
//     }
//   );
// });


const java = require("java");

// Load the Db2 JDBC Driver
java.classpath.push("path/to/db2jcc.jar");

// Create a database connection
const DriverManager = java.import("java.sql.DriverManager");
const url = "jdbc:db2://cpl3:4474/RDB2LCS1";
const username = "TRSDPS2";
const password = "jQk4kkH2P1tNASRvUCz1AA==--Txr9m1AwevtbdmfZKiSWBg==";

DriverManager.getConnection(url, username, password, function (err, conn) {
    if (err) {
        console.error("Connection error:", err);
        return;
    }
    console.log("Connected to Db2!");

    const stmt = conn.createStatementSync();
    const rs = stmt.executeQuerySync("SELECT * FROM SAMPLE_TABLE FETCH FIRST 5 ROWS ONLY");

    while (rs.nextSync()) {
        console.log("Row:", rs.getStringSync(1));
    }

    conn.closeSync();
});
