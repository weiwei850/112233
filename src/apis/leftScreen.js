/*
 * @Author: Binggan
 * @Date: 2022-02-26 17:30:26
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-09 10:58:06
 * @Description:左屏相关请求
 */
import request from "@/utils/request";

/**
 ************************** 三道门
 */

// 获取入市人员
export const getArrivalPerson = (data) => {
  return request.post("/person/getPerson", data);
};

// 获取入市车辆
export const getArrivalCar = (qxdm = "6501%") => {
  return request.post("/car/getRwCar", { qxdm });
};

// 获取入市货物
export const getArrivalGoods = () => {
  return request.get("/business/getGoods");
};

/**
 ************************** 五大主题库
 */

