export class Articulos{

    constructor(
       public ARTICULO:number,
       public   DESCRIPCION:string,
       public PROVEEDOR: number,
       public  CODIGO_CATALOGO:string,
       public LOTE_MINIMO: number,
       public LOTE_ESTANDAR: number,
       public  PESO_MINIMO_ORDEN: number,
       public MULTIPLO_COMPRA: number,
       public CANT_ECONOMICA_COM: number,
       public UNIDAD_MEDIDA_COMP: string,
       public  FACTOR_CONVERSION: number,
       public  PLAZO_REABASTECIMI: number,
       public  PORC_AJUSTE_COSTO: number,
       public  FECHA_ULT_COTIZACI: null,
       public  NOTAS: string,
       public  DESCRIP_CATALOGO: null,
       public  PAIS: string,
       public  TIPO: string,
       public  IMPUESTO: number,
       public  SELECTED: boolean
    ){}
}