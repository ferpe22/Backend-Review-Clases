import Order from "../dao/classes/order.dao.js";
import User from "../dao/classes/user.dao.js";
import Business from "../dao/classes/business.dao.js";

const userService = new User();
const orderService = new Order();
const businessService = new Business();

export const getOrders = async (req, res) => {
  let result = await orderService.getOrders();
  res.send({status: "success", result})
}

export const getOrderById = async (req, res) => {
  const { oid } = req.params;
  let order = await orderService.getOrderById(oid);
  res.send({status: "success", result:order})
}

export const createOrders = async (req, res) => {
  const {user,business,products} = req.body;
  const resutlUser = await userService.getUserById(user);
  const resutlBusiness = await businessService.getBusinessById(business);
  let actualOrders = resutlBusiness.products.filter(product => products.includes(product.id));
  let sum = actualOrders.reduce((acc,prev)=>{
    acc+=prev.price
    return acc
  },0);
  let orderNumber = Date.now() + Math.floor(Math.random()*10000+1);
  let order = {
    number:orderNumber,
    business,
    user,
    status:"pending",
    products:actualOrders.map(product=>product.id),
    totalPrice:sum
  }
  let orderResult = await orderService.createOrder(order);
  resutlUser.orders.push(orderResult._id);
  await userService.updateUser(user, resutlUser);
  res.send({status: "success", orderResult})
}

export const resolveOrder = async (req, res) => {
  const {resolve} = req.query;
  let order = await orderService.getOrderById(req.params.oid);
  order.status = resolve;
  await orderService.resolveOrder(order._id, order);
  res.send({status: "success", result: "Order resolved"})
}