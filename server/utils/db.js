var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db');
const insert = (sql, param) => {
    return new Promise((res, rej) => {
        db.run(sql, param, (err, row) => {
            res(row);
            //db.close();
        });
    });
}
const update = (sql, param) => {
    return new Promise((res, rej) => {
        db.run(sql, param, (err, row) => {
            res(row);
            //db.close();
        });
    });
}
const del = (sql, param) => {
    return new Promise((res, rej) => {
        db.run(sql, param, (err, row) => {
            res(row);
            //db.close();
        });
    });
}
const query = (sql, param) => {
    return new Promise((res, rej) => {
        db.all(sql, param, (err, row) => {
            res(row);
            //db.close();
        });
    });
}
const get = (sql, param) => {
    return new Promise((res, rej) => {
        db.get(sql, param, (err, row) => {
            res(row);
            //db.close();
        });
    });
}
module.exports = {
    insert,
    update,
    del,
    query,
    get
};

/*
//增
var sql1 = db.prepare("insert into 表名 values (内容，跟mysql一样)");
sql1.run();
//console.log(sql1);//可以这样检查
//删
var sql2 = db.prepare("delete from 表名 where id = 1");
// console.log(sql2);
sql2.run();
//改
var sql3 = db.prepare("update 表名 set name = winston where id = 1");
sql3.run();
//查
//查一个表的所有数据
db.all("select * from 表名",function(err,row){
    console.log(JSON.stringify(row));
})
//查一条数据
db().each("select * from 表名",function(err,row){
    console.log(row);
})

增 : this.sql(`insert into ${this.tableName} (begin_time, create_time, end_time, play_id, postion_id, status, task_id) values(?, ?, ?, ?, ?, ?, ?)`, [obj.begin_time, obj.create_time, obj.end_time, obj.play_id, obj.postion_id, obj.status, obj.task_id]);
删 : this.sql(`delete from ${this.tableName} where id = ?`, id);
改 : this.sql(`update ${this.tableName} set begin_time = ?, status = ? where postion_id = ?`, [begin_timeValue, statusValue, postion_idValue]);
查 : this.sql(`select * from ${this.tableName} where id = ?`, id, 'get/all');
*/
