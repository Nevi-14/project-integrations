

  export class OrdenCompra{
    constructor (
       public ORDEN_COMPRA: string,
       public USUARIO: string,
       public PROVEEDOR: number,
       public BODEGA: string,
       public CONDICION_PAGO: string,
       public MONEDA: string,
       public PAIS: string,
       public MODULO_ORIGEN: string,
       public FECHA: string,
       public FECHA_REQUERIDA: string,
       public  TIPO_DESCUENTO: string,
       public  PORC_DESCUENTO: number,
       public  MONTO_DESCUENTO: number,
       public TOTAL_MERCADERIA: number,
       public  TOTAL_IMPUESTO1: number,
       public TOTAL_IMPUESTO2: number,
       public MONTO_FLETE: number,
       public  MONTO_SEGURO: number,
       public  MONTO_DOCUMENTACIO: number,
       public  MONTO_ANTICIPO: number,
       public TOTAL_A_COMPRAR: number,
       public PRD : string,
       public ACCION :string
    
    ){}
    
    }