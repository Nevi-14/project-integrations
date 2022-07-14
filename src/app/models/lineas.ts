export class Lineas{

    constructor(
       public ORDEN_COMPRA:string,
       public   ORDEN_COMPRA_LINEA:number,
       public  ARTICULO:number,
       public BODEGA: number,
       public LINEA_USUARIO: number,
       public DESCRIPCION: string,
       public CANTIDAD_ORDENADA: number,
       public  CANTIDAD_EMBARCADA: number,
       public  CANTIDAD_RECIBIDA: number,
       public  CANTIDAD_RECHAZADA: number,
       public  PRECIO_UNITARIO: number,
       public  IMPUESTO1: number,
       public  IMPUESTO2: number,
       public  PORC_DESCUENTO: number,
       public  MONTO_DESCUENTO: number,
       public  FECHA: string,
       public  FACTOR_CONVERSION: number,
       public FECHA_REQUERIDA: string,
       public CENTRO_COSTO: string,
       public CUENTA_CONTABLE: string,
       public TIPO_IMPUESTO1: string,
       public TIPO_TARIFA1: string
    ){}
}