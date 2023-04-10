export class InvoiceLines {
    constructor(
        public id: number,
        public id_invoice: number,
        public id_product: number,
        public description: string,
        public price: number,
        public units: number,
        public tax_id: number,
        public tax_description: string,
        public tax_amount: number,
        public sub_total: number,
        public total: number
    ) { }
}