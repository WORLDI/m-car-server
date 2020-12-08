/* eslint-disable prefer-const */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  // 用户登录验证
  async checkLogin() {
    let username = this.ctx.request.body.username;
    let password = this.ctx.request.body.password;
    console.log(username, password);
    const sql = " SELECT username FROM user WHERE username = '" + username +
    "' AND password = '" + password + "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功
      this.ctx.body = {
        data: '登录成功',
      };
    } else {
      this.ctx.body = {
        data: '登录失败',
      };
    }
  }

  // 获取车辆列表
  async getCarList() {

    let sql = 'SELECT car.id as id,' +
                'car.car_number as number,' +
                'car.comes_from as comes,' +
                'car.photo as photo,' +
                'car.isFirst as isFirst,' +
                'car.isBad as isBad,' +
                'car.car_key FROM car';

    const resultList = await this.app.mysql.query(sql);
    this.ctx.body = {
      carList: resultList,
    };
  }

  // 获取车辆进出记录列表
  async getRecordList() {

    let sql = `SELECT record.id as id,
            record.car_number as number,
            record.in_time as inTime,
            record.out_time as outTime,
            record.stay_time as stayTime,
            record.money as money,
            record.record_key FROM record`;

    const resultList = await this.app.mysql.query(sql);
    this.ctx.body = {
      recordList: resultList,
    };
  }

  // 获取黑名单
  async getBadList() {
    let sql = 'SELECT car.id as id,' +
                'car.car_number as number,' +
                'car.comes_from as comes,' +
                'car.photo as photo,' +
                'car.isFirst as isFirst,' +
                'car.isBad as isBad,' +
                'car.car_key FROM car WHERE car.isBad = 1';

    const resultList = await this.app.mysql.query(sql);
    this.ctx.body = {
      badList: resultList,
    };
  }

  // 根据id获取车辆信息
  async getCarById() {
    let id = this.ctx.params.id;

    let sql = `SELECT car.id as id,
                car.car_number as number,
                car.comes_from as comes,
                car.photo as photo,
                car.isFirst as isFirst,
                car.isBad as isBad,
                car.car_key FROM car WHERE car.id=${id}`;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  // 根据车牌号获取车辆记录
  async getRecordByCar() {
    let car_number = this.ctx.params.car_number;
    console.log(car_number);
    let sql = `SELECT record.id as id,
                record.car_number as number,
                record.in_time as inTime,
                record.out_time as outTime,
                record.stay_time as stayTime,
                record.money as money,
                record.record_key FROM record WHERE record.car_number='${car_number}'`;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  // 将车辆加入黑名单
  async addToBad() {
    let id = this.ctx.params.id;

    let sql = `UPDATE car SET isBad=1 WHERE id=${id}`;
    const result = await this.app.mysql.query(sql);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      updateSuccess,
    };
  }

  // 移出黑名单
  async removeFromBad() {
    let id = this.ctx.params.id;

    let sql = `UPDATE car SET isBad=0 WHERE id=${id}`;
    const result = await this.app.mysql.query(sql);

    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      updateSuccess,
    };
  }

  // 批量移出黑名单
  async removeBads() {
    let keyList = this.ctx.request.body;

    let sql = `UPDATE car SET isBad=0 WHERE car_key in ${keyList}`;

    const result = await this.app.mysql.query(sql);

    const updateSuccess = result.affectedRows === keyList.length;
    this.ctx.body = {
      updateSuccess,
    };
  }

  // 删除单条记录
  async deleteRecord() {
    let id = this.ctx.params.id;
    const result = await this.app.mysql.delete('record', { id });

    const deleteSuccess = result.affectedRows === 1;
    this.ctx.body = {
      deleteSuccess,
    };
  }

  // 批量删除记录
  async deleteSomeRecords() {
    let keyList = this.ctx.request.body;
    let sql = `DELETE FROM record WHERE record_key in (${keyList})`;

    const result = await this.app.mysql.query(sql);
    const deleteSuccess = result.affectedRows === keyList.length;
    this.ctx.body = {
      deleteSuccess,
    };
  }

  // 删除单条车辆信息
  async deleteCar() {
    let id = this.ctx.params.id;
    const result = await this.app.mysql.delete('car', { id });
    const deleteSuccess = result.affectedRows === 1;
    this.ctx.body = {
      deleteSuccess,
    };
  }

  // 批量删除车辆信息
  async deleteSomeCars() {
    let keyList = this.ctx.request.body;
    let sql = `DELETE FROM car WHERE car_key in (${keyList})`;

    const result = await this.app.mysql.query(sql);
    const deleteSuccess = result.affectedRows === keyList.length;
    this.ctx.body = {
      deleteSuccess,
    };
  }

}

module.exports = HomeController;
