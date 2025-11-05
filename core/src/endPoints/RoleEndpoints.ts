import sqlite3 from "sqlite3";
import {fetchFirst} from "../server";

export default async function RoleEndpoint(dbpath:string,username:string){
    const db = new sqlite3.Database(dbpath,
        (err) => {
            if (err) {
                console.error(err.message);
                return err;
            }
        }
    );
    try {
        let role: any = null;
        const user: any = await fetchFirst(db, `SELECT USR01.ROLEID FROM USR01 WHERE USR01.PERSNR=?`, [username]);
        if (user){
            role = await fetchFirst(db, `SELECT ROLES.ROLNAM FROM ROLES WHERE ROLEKZ=?`, [user.ROLEID]);
            return ({role: role.ROLNAM});
        }
    } catch (err) {
      console.log(err);
    } finally {
      db.close();
    }
    return null
}