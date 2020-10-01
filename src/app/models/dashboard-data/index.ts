import {IOrderStatistic} from './order-statistic.interface';
import {IRevenueStatistic} from './revenue-statistic.interface';
import {ICustomerQuantityStatistic} from './customer-quantity-statistic.interface';
import {ICustomerRanking} from './customer-ranking.interface';
import {ITopCustomerOfLocation} from './top-customer-of-location.interface';

export interface IDashboardData {
    orders_statistics: IOrderStatistic[];
    revenue_statistics: IRevenueStatistic[];
    customers_quantity_statistics: ICustomerQuantityStatistic[];
    customer_ranking: ICustomerRanking[];
    top_pick_up_district: ITopCustomerOfLocation[];
}
