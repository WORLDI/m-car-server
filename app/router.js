'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/checkLogin', controller.home.checkLogin);
  router.get('/getCarList', controller.home.getCarList);
  router.get('/getRecordList', controller.home.getRecordList);
  router.get('/getBadList', controller.home.getBadList);
  // router.post('/getCarById:id', controller.home.getCarById);
  router.post('/deleteRecord/:id', controller.home.deleteRecord);
  router.post('/deleteSomeRecords', controller.home.deleteSomeRecords);
  router.post('/deleteSomeCars', controller.home.deleteSomeCars);
  router.post('/deleteCar', controller.home.deleteCar);
  router.post('/addToBad/:id', controller.home.addToBad);
  router.post('/removeFromBad/:id', controller.home.removeFromBad);
  router.post('/removeBads', controller.home.removeBads);
  router.post('/getRecordByCar/:car_number', controller.home.getRecordByCar);
};
