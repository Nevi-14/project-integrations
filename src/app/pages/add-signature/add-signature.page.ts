import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-add-signature',
  templateUrl: './add-signature.page.html',
  styleUrls: ['./add-signature.page.scss'],
})
export class AddSignaturePage implements OnInit, AfterViewInit{
  @ViewChild('canvas') canvas: ElementRef
  signaturePad:SignaturePad;
  @ViewChild('svgSignature') svgSignature: ElementRef
  isOpen:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log('this.canvas-2', this.canvas.nativeElement)
    this.signaturePad =  new SignaturePad(this.canvas.nativeElement);
  
    
  }
  clear(){
    this.signaturePad.clear();
    
    if(this.svgSignature){
      this.svgSignature.nativeElement.innerHTML = '';
      this.svgSignature = null;
    }
   
  }

  print(){

    if(this.svgSignature){
      this.svgSignature.nativeElement.innerHTML =  this.signaturePad.toSVG();
      console.log('signature', this.svgSignature)
    }

  }
}
