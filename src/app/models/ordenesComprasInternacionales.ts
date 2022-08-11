

  export class OrdenComprasInternacionales{
    constructor (
       public ORDEN_COMPRA: string,
       public FECHA_REGISTRO: string,
       public USUARIO: string,
       public NOMBRE: string,
       public PROVEEDOR: number,
       public BODEGA: string,
       public CONDICION_PAGO: string,
       public MONEDA: string,
       public PAIS: string,
       public ESTADO: string,
       public FECHA: string,
       public FECHA_REQUERIDA: string,
       public  PORC_DESCUENTO: number,
       public  MONTO_DESCUENTO: number,
       public TOTAL_MERCADERIA: number,
       public  TOTAL_IMPUESTO1: number,
       public MONTO_FLETE: number,
       public  MONTO_SEGURO: number,
       public  MONTO_DOCUMENTACIO: number,
       public  MONTO_ANTICIPO: number,
       public TOTAL_A_COMPRAR: number,
       public PRD : string,
       public ACCION :string,
       public  LATITUD: number,
       public LONGITUD: number,
    
    ){}
    
    }