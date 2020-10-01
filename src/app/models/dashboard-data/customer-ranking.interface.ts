import {ICustomer} from '../customer.interface';

export interface ICustomerRanking {
    customer_id: number;
    orders_quantity: number;
    customer: ICustomer;
}
