import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner , BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
options: BarcodeScannerOptions;
encodText:string="";
encodedData:any={};
scannedData:any={};

  products: any[] = [];
  selectedProduct: any;
  productFound:boolean = false;
  test= "test";


  constructor(public navCtrl: NavController,
    public scanner: BarcodeScanner,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public dataService: DataServiceProvider) {
      this.dataService.getProducts()
        .subscribe((response)=> {
            this.products = response
            console.log(this.products);
        });
  }

  scan() {
    this.test="ELLAOUZI Mohamed";
    console.log('OKKKKK');
    
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
        console.log(this.selectedProduct);
      } else {
        this.selectedProduct = {};
        this.productFound = false;
        this.toast.show('Product not found', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }



  scan2(){
    this.options ={
      prompt: 'Scan your barcode'
    };
    this.scanner.scan(this.options).then((data) => {
      this.scannedData=data;
    } , (err) => {
      console.log('Error', err);
    })
  }
  encode(){
    this.scanner.encode(this.scanner.Encode.TEXT_TYPE, this.encodText).then((data)=>{
      this.encodedData=data;
    },
     (err) => {
      console.log('Error', err);

     })
  }

}
