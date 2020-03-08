import { pick } from 'lodash';

import * as orderModel from '../models/order';
import * as productModel from '../models/product';

import { getTime } from '../helper/time';

export const fetchOrderByUserId = async (req, res) => {
  try {
    const { userId } = req;

    // const orderList = await orderModel.getOrderByUserId(userId);
    const orderList = await orderModel.orderRepo.findByUserId(userId);

    const orderDetailList = orderList
      .map((order) => ({
        ...order,
        productIdAry: order.productIdAry.split(','),
        quantityAry: order.quantityAry.split(','),
        priceAry: order.priceAry.split(','),
      }))
      .map((order) => ({
        ...order,
        detailOrder: order.productIdAry.map((id, i) => ({
          id,
          quantity: order.quantityAry[i],
          price: order.priceAry[i],
        })),
      }))
      .map((order) => pick(order, ['order_id', 'totalPrice', 'detailOrder', 'createdAt']));

    res.status(200).json({
      orderDetailList,
    });
  } catch (error) {
    // return error;
    console.log(error);
  }
};

export const fetchOrderByOrderId = async (req, res) => {
  try {
    const orderId = pick(req.params, 'id').id;

    console.log('fetchOrderByOrderId', orderId);
  } catch (error) {
    console.log(error);
  }
};


export const createOrder = async (req, res) => {
  const { userId } = req;
  console.log('create Order');

  try {
    const orderNumber = await orderModel.getOrderId();

    console.log(req.body.order, orderNumber);

    const orders = req.body.order;

    const orderProductIds = orders.map((order) => order.id);
    const productList = await productModel.findMultipleProduct(orderProductIds);

    const replacements = orders.map((order) => {
      const productInfo = productList.find((product) => product.p_id === order.id);
      return [
        orderNumber + 1,
        productInfo.p_id,
        userId,
        order.count,
        productInfo.price * order.count,
        getTime(),
        getTime(),
      ];
    });


    console.log('replacements', replacements);

    await orderModel.createMultipleOrder(replacements);
  } catch (error) {
    return error;
  }
};

export const updateOrderSubmit = async (req, res) => {
  try {
    const orderId = pick(req.params, 'id').id;

    console.log('submitOrder', orderId);

    await orderModel.orderRepo.updateSubmission({
      order_id: orderId,
      isComplete: 1,
    });
  } catch (error) {
    return error;
  }
};
