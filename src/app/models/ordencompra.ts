

  export class OrdenCompra{
    constructor (
       public ORDEN_COMPRA: string,
       public USUARIO: string,
       public PROVEEDOR: number,
       public BODEGA: string,
       public CONDICION_PAGO: number,
       public MONEDA: string,
       public PAIS: string,
       public ESTADO: string,
       public FECHA: string,
       public FECHA_COTIZACION: string,
       public  FECHA_REQUERIDA: string,
       public  FECHA_EMBARQUE: string,
       public FECHA_ARRIBO: string,
       public  FECHA_APROBACION: string,
       public FECHA_DESALMACENAJE: string,
       public  FECHA_CIERRE: string,
       public  PORC_DESCUENTO: number,
       public  MONTO_DESCUENTO: number,
       public TOTAL_MERCADERIA: number,
       public TOTAL_IMPUESTO1 : number,
       public MONTO_FLETE :number,
       public MONTO_SEGURO :number,
       public MONTO_DOCUMENTACIO :number,
       public MONTO_ANTICIPO :number,
       public TOTAL_A_COMPRAR :number,
       public INSTRUCCIONES :string
    
    ){}
    
    }