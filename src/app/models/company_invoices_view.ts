export class CompanyInvoicesView{  
    constructor(
    public iD_CUSTOMER:number,
    public name:string,
    public lastname:string,
    public iD_COMPANY:number,
    public currency:string,
    public status:string,
    public date: Date,
    public description:string,
    public iD_INVOICE:number,
    public total :number,
    public title:string    
    ){}
    
    }