import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Archivos } from 'src/app/models/archivos';
import { GestorArchivosService } from 'src/app/services/gestor-archivos.service';
import { AlertasService } from '../../services/alertas.service';
import { GestionOrdenesService } from '../../services/gestion-ordenes.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-gestor-archivos',
  templateUrl: './gestor-archivos.page.html',
  styleUrls: ['./gestor-archivos.page.scss'],
})
export class GestorArchivosPage implements OnInit {
  @ViewChild('myInput')
  myInputVariable: ElementRef;

textoBuscar = '';
url = 'http://api_irp_test.di-apps.co.cr/api/descargar-archivo?ID='
archivo:Archivos = {
  ORDEN_COMPRA:this.gestionOrdenesService.ordenCompra.ORDEN_COMPRA,
  Tipo:null,
  Nombre: null,
  Fecha:new Date(),
  Usuario: this.usuariosService.usuario.Usuario,
  Folder: null,
  Estado: 'A'
}
file:any  = null;
name = this.file ? this.file.name :''
base64 = '';
formatosValidos = [
  
  {id:1, name:'png'},
  {id:2, name:'jpg'},
  {id:3, name:'svg'},
  {id:4, name:'txt'},
  {id:5, name:'xlsx'},
  {id:6, name:'csv'},
  {id:7, name:'pdf'},
  {id:8, name:'docx'},
  {id:9, name:'doc'}
  

];
  constructor(
public modalCtrl: ModalController,
public gestorArchivosService: GestorArchivosService,
public alertasService: AlertasService,
public gestionOrdenesService: GestionOrdenesService,
public usuariosService:UsuariosService,
private cd: ChangeDetectorRef

  ) { }

  ngOnInit() {
this.cargarArchivos();
  }

  cargarArchivos(){
   
    this.gestorArchivosService.syncGetArchivosToPromise(this.gestionOrdenesService.ordenCompra.ORDEN_COMPRA).then(resp => {
     console.log('archivos get resp' , resp)
  
      if(resp.length > 0){

this.gestorArchivosService.archivos = resp;
this.cd.detectChanges();
      } else{
        this.alertasService.message('DiOne', 'No se ha guardado ningun arcivo')
      }
    }, error =>{

      this.alertasService.message('DiOne', 'Error cargando Archivos')
      this.cerrarModal();
    });
  }

  limpiarDatos(){

    this.archivo = {
      ORDEN_COMPRA:this.gestionOrdenesService.ordenCompra.ORDEN_COMPRA,
      Tipo:null,
      Nombre: null,
      Fecha:new Date(),
      Usuario: this.usuariosService.usuario.Usuario,
      Folder: null,
      Estado: 'A'
    };
    this.name = '';
    this.file = null;
    this.myInputVariable.nativeElement.value = "";

  }
  cerrarModal(){
this.modalCtrl.dismiss();

  }

  onSearchChange(event){
    this.textoBuscar = event.detail.value;
  }
  onFileChange(fileChangeEvent){
    // Get a reference to the file that has just been added to the input

   let file = fileChangeEvent.target.files[0];

  let format =  file.name.split('.')[1]
   let i = this.formatosValidos.findIndex(archivo => archivo.name == format);

   if (i < 0){
    this.alertasService.message('DiOne', 'El formato '+format+' no es permitido')
this.limpiarDatos();
    return;
   }

    this.file = fileChangeEvent.target.files[0];
   this.name = this.file.name;
    console.log('this.file',this.file ) 
 
  }
  reset() {
    if(!this.file){
      this.alertasService.message('DiOne', 'Debes seleccionar un archivo!.')
      return;
    }

    console.log(this.myInputVariable.nativeElement.files);

    console.log(this.myInputVariable.nativeElement.files);
    this.limpiarDatos();
}
  async cargarArchivo() {
  let ext = this.file.name.split('.')[1];

    if(!this.file){
      this.alertasService.message('DiOne', 'Debes seleccionar un archivo!.')
      return;
    }
    this.archivo.Tipo = ext;
    this.archivo.Nombre = this.name;
    let currentTime = Date.now();
    let fileName = currentTime+'.'+ext;
    const formData = new FormData();
    formData.append('photo', this.file, this.file.name);
    let tipo = null;
    
    switch(ext)
    {
      case  'png':
        tipo = 'image'
        this.archivo.Folder = 'Images';
        break;
        case  'jpg':
          tipo = 'image'
          this.archivo.Folder = 'Images';
          break;
          case  'svg':
            tipo = 'image'
            this.archivo.Folder = 'Images';
            break;
            default:
              tipo = 'file'
              this.archivo.Folder = 'Files';
              
            break;

    }
  


  

  this.alertasService.presentaLoading('Guardando Archivo..')

  this.gestorArchivosService.syncPostArchivosToPromise(this.archivo).then(resp =>{
    this.gestorArchivosService.syncCargarArchivoPost(tipo, formData).then(resp =>{
      this.limpiarDatos();
      console.log('resp', resp)
      this.alertasService.loadingDissmiss();
      this.cargarArchivos();
    //  this.alertasService.message('DiOne', resp)
            }, error =>{
              this.file = null;
              console.log('error', error)
              this.alertasService.loadingDissmiss();
              this.alertasService.message('DiOne', error)
      
            })
  }, error =>{
    this.alertasService.message('DiOne', 'Error Cargando el archivo')
    this.alertasService.loadingDissmiss();


  });
   
  
  }
  descargarArchivo(){


  }

  eliminarArchivo(archivo:Archivos){
    this.alertasService.presentaLoading('Borrando Archivo..')

 
    let archivoPost =  {
      ORDEN_COMPRA:archivo.ORDEN_COMPRA,
      Tipo:archivo.Tipo,
      Nombre: archivo.Nombre,
      Fecha:archivo.Fecha,
      Usuario: archivo.Usuario,
      Folder: archivo.Folder,
      Estado: 'I'
    }
    this.gestorArchivosService.syncPutArchivosToPromise(archivoPost).then(resp =>{
      this.alertasService.loadingDissmiss();
      this.alertasService.message('DiOne', 'El archivo quedo inactivo')
      this.cargarArchivos();
    }, error =>{
      this.alertasService.message('DiOne', 'Error borrando el archivo')
      this.alertasService.loadingDissmiss();

    })

  }
}
