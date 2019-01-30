import {
  Component
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';
import {
  BarcodeScanner,
  BarcodeScannerOptions
} from '@ionic-native/barcode-scanner';
import {
  Toast
} from '@ionic-native/toast';
import {
  DataServiceProvider
} from '../../providers/data-service/data-service';
import {
  DetailPage
} from '../../pages/detail/detail'
import { AdherentsPage } from '../adherents/adherents';
import { AgentPage } from '../agent/agent';
import { PrestationPage } from '../prestation/prestation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private detailPage;
  private adherentsPage;
  private agentPage;
  private prestationPage;
  options: BarcodeScannerOptions;
  encodText: string = "";
  encodedData: any = {};
  scannedData: any = {};
  products: any[] = [];
  pprScanned:String="[ PPR : 6637373][Ajd,jjjd]";

  selectedProduct: any;
  productFound: boolean = false;
  test = "test";


  constructor(public navCtrl: NavController,
    public scanner: BarcodeScanner,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public dataService: DataServiceProvider) {
     // var txt = "#div-name-1234-characteristic:561613213213";
     // var numb = this.pprScanned.match(/\d/g);
     //// this.pprScanned = numb.join("");
     // alert (numb);​
    //  this.pprScanned= this.pprScanned;//.replace(/[^0-9]/g,'');
      this.detailPage = DetailPage;
      this.adherentsPage = AdherentsPage;
      this.agentPage = AgentPage;
      this.prestationPage = PrestationPage;

    this.dataService.getProducts()
      .subscribe((response) => {
        this.products = response
        console.log(this.products);
      });
  }



  scan2() {
    this.options = {
      prompt: 'Scanner votre carte adhérent'
    };
    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data;
      //===========================/ME
      if (this.scannedData !== undefined) {

          this.loadDetail(data);
      } else {
        this.selectedProduct = {};
        this.productFound = false;
        this.toast.show('Product not found', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
      //===========================/ME

    }, (err) => {
      console.log('Error', err);
    })
  }


  encode() {
    this.scanner.encode(this.scanner.Encode.TEXT_TYPE, this.encodText).then((data) => {
        this.encodedData = data;
      },
      (err) => {
        console.log('Error', err);

      })
  }

  loadDetail(ppr) {
    this.navCtrl.push(this.detailPage,{ppr:ppr});
  }

  adherentAPI() {
    this.navCtrl.push(this.adherentsPage);
  }


  loadAgentPage(ppr) {
    this.navCtrl.push(this.agentPage,{ppr:ppr});
  }

  loadPrestationPage(ppr) {
    this.navCtrl.push(this.prestationPage,{ppr:ppr});
  }
testPrestationPage() {
    this.navCtrl.push(this.prestationPage);
  }


  addPrestation() {
    console.log('addPrestation');
    this.navCtrl.push(this.prestationPage);
  }

  scan1() {
    this.options = {
      prompt: 'Scanner votre carte adhérent'
    };
    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data;
      //===========================/ME
      if (this.scannedData !== undefined) {

        this.loadPrestationPage(data);
      } else {
        this.selectedProduct = {};
        this.productFound = false;
        this.toast.show('Product not found', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
      //===========================/ME

    }, (err) => {
      console.log('Error', err);
    })
  }

  scan3() {
    this.options = {
      prompt: 'Scanner votre carte adhérent'
    };
    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data;
      //===========================/ME
      if (this.scannedData !== undefined) {

          this.loadAgentPage(data);
      } else {
        this.selectedProduct = {};
        this.productFound = false;
        this.toast.show('Product not found', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
      //===========================/ME

    }, (err) => {
      console.log('Error', err);
    })
  }
}
