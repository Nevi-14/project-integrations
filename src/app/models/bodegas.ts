export class Bodegas{
    constructor (
      public  BODEGA: string,
      public NOMBRE: string,
      public  TIPO: string,
      public  TELEFONO: string,
      public DIRECCION:string,
      public CONSEC_TRASLADOS: string,
      public  NoteExistsFlag: number,
      public  RecordDate: Date,
      public RowPointer:string,
      public CreatedBy:string,
      public UpdatedBy: string,
      public CreateDate:Date ,
      public U_SUCURSAL: string ,
      public  U_COORDINADAS: string,
      public CODIGO_ESTABLECIMIENTO: string,
      public MERCADO_LIBRE: string,
      public NO_STOCK_NEGATIVO: string,
     
    ){}
    
    }