export class Invoices {
    constructor(
        public id: number,
        public id_company: number,
        public id_customer: number,
        public id_user: number,
        public title: string,
        public description: string,
        public currency: string,
        public status: string,
        public date: Date,
        public required_date: Date,
        public quotation_date: Date,
        public approval_date: Date,
        public close_date: Date,
        public total_invoices_lines: number,
        public sub_total: number,
        public total: number,
        public discount: number,
        public discount_amount: number,
        public shipping_amount: number,
        public instructions: string
    ) { }
}