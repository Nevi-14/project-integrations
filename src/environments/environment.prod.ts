// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  maxCharCodigoProd: 6,
  preURL:'http://api_irp',
  preURL2:'http://api_isa',
  TestURL:'_test',
  postURL:'.di-apps.co.cr/api/',
  prdMode: true,
  articulosURL:'ONE_ArtProv/',
  bodegasURL:'ONE_Bodega',
  lineasPostURL:'ONE_OCLin',
  lineasPostURL2:'ONE_OC_Linea',
  consultarOrdenCompraLineasURLSoftland:'ONE_OCLinQuery/?oc=',
  consultarOrdenCompraLineasURL:'ONE_OCLin/?ID=',
  ordenCompraURL:'ONE_OC',
  proveedoresURL:'Proveedores/',
  ordenCompraEstadoURL:'ONE_OCQuery/?estado=',
  ultimaOrdenCompraURL:'ONE_Consec',
  idParam :'?ID=',
  numParam: '&Num=',
  usuarioParam: '&Usuario=',
  usuarioAuthParam: '?Usuario=',
  claveParam: '&Clave=',
  usuariosURL:    'ONE_Aut/',
  ONE_UserAprob:'ONE_UserAprob',
  ONE_OCAprob:'ONE_OCAprob',
  idProvedorParam:'?IDProv=',
  mapboxKey:'pk.eyJ1IjoibWhlcnJhIiwiYSI6ImNrcWxhdXk4eTByMDUyd28xNnZ2b2hoMjMifQ.IrIAxPGO4oFiRVR8U5sqkA',
  emailApi:'Email/',
  ONE_ListUserAprob:'ONE_ListUserAprob',
  gestorArchivos:'cargar-archivo',
  tipoParam:'?tipo=',
  tipoParam2:'&Tipo=',
  nombreParam:'&Nombre=',
  ONE_GestorArch:'ONE_GestorArch'
  
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
