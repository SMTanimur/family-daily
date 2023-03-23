import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Order, OrderDocument } from '../orders/schemas';
import { Product, ProductDocument } from '../products/schemas';

const monthsArray = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: PaginateModel<OrderDocument>,
    @InjectModel(Product.name)
    private productModel: PaginateModel<ProductDocument>,
  ) {}

  async findAll() {
    let TODAY = new Date(new Date().setMonth(new Date().getMonth() + 1));
    let YESTERDAY = new Date().setDate(new Date().getDate() - 1);
    let YEAR_BEFORE = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1),
    );
    const totalRevenue = this.orderModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$total' },
        },
      },
    ]);
    const todaysRevenue = this.orderModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date(YESTERDAY).setUTCHours(0, 0, 0, 0)),
          },
        },
      },
      {
        $group: {
          _id: null,
          data: { $sum: '$total' },
        },
      },
    ]);
    const totalProducts = this.productModel.estimatedDocumentCount();
    const totalOrders = this.orderModel.estimatedDocumentCount();
    const newCustomers = this.orderModel
      .find({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        },
      })
      .count();
    const totalYearSaleByMonth = await this.orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: YEAR_BEFORE, $lte: TODAY },
        },
      },
      {
        $group: {
          _id: { year_month: { $substrCP: ['$createdAt', 0, 7] } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year_month': 1 },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          month_year: {
            $concat: [
              {
                $arrayElemAt: [
                  monthsArray,
                  {
                    $subtract: [
                      { $toInt: { $substrCP: ['$_id.year_month', 5, 2] } },
                      1,
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          data: { $push: { month: '$month_year', total: '$count' } },
        },
      },
      {
        $project: {
          monthlyData: '$data',
          _id: 0,
        },
      },
    ]);
    const [
      totalRevenueData,
      todaysRevenueData,
      totalProductsData,
      totalOrdersData,
      newCustomersData,
      totalYearSaleByMonthData,
    ] = await Promise.all([
      totalRevenue,
      todaysRevenue,
      totalProducts,
      totalOrders,
      newCustomers,
      totalYearSaleByMonth,
    ]);
    return {
      totalRevenue:
        totalRevenueData && totalRevenueData?.length > 0
          ? totalRevenueData?.[0]?.total
          : 0,
      todaysRevenue:
        todaysRevenueData && todaysRevenueData?.length > 0
          ? todaysRevenueData?.[0]?.data
          : 0,
      totalProducts: totalProductsData ? totalProductsData : 0,
      totalOrders: totalOrdersData ? totalOrdersData : 0,
      newCustomers: newCustomersData ? newCustomersData : 0,
      totalYearSaleByMonth:
        totalYearSaleByMonthData && totalYearSaleByMonthData.length > 0
          ? totalYearSaleByMonthData?.[0]?.monthlyData
          : [],
    };
  }
}
