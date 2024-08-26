const sql = require("mssql");
const sqlConfig = require("../common/ServerConfig");
const jwt = require("jsonwebtoken");

//#region POST

const UserLogin = async (req, res, next) => {
  let pool;
  let UserData = req.query;
  try {
    pool = await sql.connect(sqlConfig);
    let Result = await pool
      .request()
      .input("UserID", sql.NVarChar(50), UserData.userid)
      .input("Pwd", sql.NVarChar(50), UserData.pwd)
      .output("Status", sql.NVarChar(500))
      .execute("sp_LoginGet");

    const token = jwt.sign({ UserID: UserData.UserID }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const { recordset, recordsets } = Result;
    if (recordset.length == 0) {
      return res.status(404).send({
        message: "Data Not Found",
      });
    }
    next({
      message: "Data Found",
      result: recordsets,
      Token: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const UserRegistration = async (req, res, next) => {
  let pool;
  const UserData = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    let Result = await pool
      .request()
      .input("UserLocationID", sql.Int, UserData.UserLocationID)
      .input("UserName", sql.VarChar(100), UserData.UserName)
      .input("UserFirstName", sql.VarChar(100), UserData.UserFirstName)
      .input("UserLastName", sql.VarChar(100), UserData.UserLastName)
      .input("UserEmail", sql.VarChar(320), UserData.UserEmail)
      .input("UserMobile", sql.VarChar(12), UserData.UserMobile)
      .input("UserPassword", sql.VarChar(50), UserData.UserPassword)
      .input("UserRoleID", sql.Int, UserData.UserRoleID)
      .input("UserGroupID", sql.Int, UserData.UserGroupID)
      .input("UserPartyID", sql.Decimal, UserData.UserPartyID)
      .input("UserCreatedBy", sql.Int, UserData.UserCreatedBy)
      .input("UserCreatedDate", sql.DateTime, UserData.UserCreatedDate)
      .input("UserCreatedIP", sql.VarChar(30), UserData.UserCreatedIP)
      .input("UserModifiedBy", sql.Int, UserData.UserModifiedBy)
      .input("UserModifiedDate", sql.DateTime, UserData.UserModifiedDate)
      .input("UserStatus", sql.Int, UserData.UserStatus)
      .input("UserEmailVerified", sql.Bit, UserData.UserEmailVerified)
      .output("Status", sql.Bit)
      .execute("sp_LoginInsert");
    const { output } = Result;
    next({
      Table: output.Status,
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

//#endregion

//#region PUT
const UpdateUser = async (req, res, next) => {
  let pool;
  let UserData = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    let Result = await pool
      .request()
      .input("UserID", sql.Int, UserData.UserID)
      .input("UserLocationID", sql.Int, UserData.UserLocationID)
      .input("UserName", sql.VarChar(100), UserData.UserName)
      .input("UserFirstName", sql.VarChar(100), UserData.UserFirstName)
      .input("UserLastName", sql.VarChar(100), UserData.UserLastName)
      .input("UserEmail", sql.VarChar(320), UserData.UserEmail)
      .input("UserMobile", sql.VarChar(12), UserData.UserMobile)
      .input("UserPassword", sql.VarChar(50), UserData.UserPassword)
      .input("UserRoleID", sql.Int, UserData.UserRoleID)
      .input("UserGroupID", sql.Int, UserData.UserGroupID)
      .input("UserPartyID", sql.Decimal, UserData.UserPartyID)
      .input("UserCreatedBy", sql.Int, UserData.UserCreatedBy)
      .input("UserCreatedDate", sql.DateTime, UserData.UserCreatedDate)
      .input("UserCreatedIP", sql.VarChar(30), UserData.UserCreatedIP)
      .input("UserModifiedBy", sql.Int, UserData.UserModifiedBy)
      .input("UserModifiedDate", sql.DateTime, UserData.UserModifiedDate)
      .input("UserStatus", sql.Int, UserData.UserStatus)
      .input("UserEmailVerified", sql.Bit, UserData.UserEmailVerified)
      .output("Status", sql.Bit)
      .execute("sp_LoginUpdate");
    const { output } = Result;
    if (!output.Status) {
      return res.status(400).send({
        message: "Update Failed",
      });
    }
    next({
      Table: output.Status,
      message: "User Updated Successfully",
    });
  } catch (error) {
  } finally {
  }
};
//#endregion

//#region GET

//#endregion


module.exports = {
  UserLogin,
  UserRegistration,
  UpdateUser,
};
