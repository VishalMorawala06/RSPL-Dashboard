const sql = require("mssql");
const sqlConfig = require("../common/ServerConfig");

//#region  ADD-Start
const UserMaster_Add = async (req, res, next) => {
    let BodyData = req.body;
    let dbConn = new sql.ConnectionPool(sqlConfig);
  
    try {
      await dbConn.connect();
      
      const transaction = new sql.Transaction(dbConn);
  
      try {
        await transaction.begin();
  
        const request = new sql.Request(transaction);
        const result = await request
          .input("rid", sql.Int, BodyData.rid)
          .input("usercountrylocationid", sql.Int, BodyData.usercountrylocationid)
          .input("userstatelocationid", sql.Int, BodyData.userstatelocationid)
          .input("usercitylocationid", sql.Int, BodyData.usercitylocationid)
          .input("userid", sql.VarChar(100), BodyData.userid)
          .input("userpassword", sql.VarChar(15), BodyData.userpassword)
          .input("username", sql.VarChar(sql.MAX), BodyData.username)
          .input("useremail", sql.VarChar(sql.MAX), BodyData.useremail)
          .input("usermobile", sql.VarChar(16), BodyData.usermobile)
          .input("userroleid", sql.Int, BodyData.userroleid)
          .input("userstatus", sql.Int, BodyData.userstatus)
          .input("useremailverified", sql.Bit, BodyData.useremailverified)
          .input("userisemployee", sql.Bit, BodyData.userisemployee)
          .input("userdepartment", sql.Int, BodyData.userdepartment)
          .input("usercreatedby", sql.Int, BodyData.usercreatedby)
          .input("userupdatedby", sql.Int, BodyData.userupdatedby)
          .input("menudetails", sql.VarChar(sql.MAX), JSON.stringify(BodyData.menudetails))
          .output("status", sql.VarChar(500))
          .execute("sp_UserMaster_CRUD");
  
        const status = result.output.status;
  
        await transaction.commit();
        dbConn.close();
  
        return res.status(200).json({
          message: status,
        });
  
      } catch (err) {
        await transaction.rollback();
        dbConn.close();
        return res.status(500).json({
          message: "Transaction Error: " + err.message,
        });
      }
  
    } catch (err) {
      dbConn.close();
      return res.status(500).json({
        message: "Connection Error: " + err.message,
      });
    }
  };
//#endregion 

//#region  GET
const UserMasterId_Get = async (req, res, next) => {
    let pool;
    try {
        const { rid } = req.query;
        pool = await sql.connect(sqlConfig);
        let Result = await pool.request()
            .input("rid", sql.Int, rid)
            .execute("sp_UserMaster_Get");

        const {recordset, recordsets } = Result;

        // Check if we have results from both queries
        if (recordset.length == 0) {
            return res.status(404).send({
              message: "Data Not Found",
            });
          }
          next({
            message: "Data Found",
            result: recordsets,
          });
        } catch (error) {
          res.status(500).send({
            message: error.message,
          });
        } finally {
          pool?.close();
        }
};

//#regin GET
module.exports = {
    // ADD
    UserMaster_Add,

    //GET
    UserMasterId_Get
};