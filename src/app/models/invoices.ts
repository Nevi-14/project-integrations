export class Invoices {
    constructor(
        public id: number,
        public iD_COMPANY: number,
        public iD_CUSTOMER: number,
        public iD_USER: number,
        public title: string,
        public description: string,
        public currency: string,
        public status: string,
        public date: Date,
        public requireD_DATE: Date,
        public quotatioN_DATE: Date,
        public approvaL_DATE: Date,
        public closE_DATE: Date,
        public totaL_INVOICE_LINES: number,
        public sub_total: number,
        public total: number,
        public discount: number,
        public discounT_AMOUNT: number,
        public shppinG_AMOUNT: number,
        public instructions: string
    ) { }
}