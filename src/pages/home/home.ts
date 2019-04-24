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
  private options: BarcodeScannerOptions;
  private scannedData: any = {};

  constructor(public navCtrl: NavController,
    public scanner: BarcodeScanner,
    private toast: Toast) {
      this.detailPage = DetailPage;
      this.adherentsPage = AdherentsPage;
      this.agentPage = AgentPage;
      this.prestationPage = PrestationPage;
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

  scanAdherentCard() {
    this.options = {
      prompt: 'Scanner votre carte adhérent'
    };
    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data;
      //===========================/ME
      if (this.scannedData !== undefined)
      {
        this.loadPrestationPage(data);
      } else {
          this.toast.show('Agent not found', '5000', 'center').subscribe(
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
  scanAdherentCardStub() {
        this.loadPrestationPage('2772662');
  }


}
