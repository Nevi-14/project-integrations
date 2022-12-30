export class Desalmacenaje{

  constructor(
     public ORDEN_COMPRA:string,
     public ORDEN_COMPRA_LINEA:number,
     public  ARTICULO:number,
     public BODEGA: string,
     public DESCRIPCION: string,
     public  CANTIDAD_RECIBIDA: number,
     public  CANTIDAD_DESALMACENADA: number,
     public  SALDO: number,
     public  FACTOR_CONVERSION: number,
     public LOTE :string,
     public nuevo:boolean,
  ){}
}