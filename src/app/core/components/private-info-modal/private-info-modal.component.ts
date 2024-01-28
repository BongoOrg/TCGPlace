import { Component, Input, OnInit } from '@angular/core'
import { copy } from 'ionicons/icons'
import { ModalController } from '@ionic/angular'
import { ToastService } from '../../services/toast.service'
import { Clipboard } from '@capacitor/clipboard'

@Component({
  selector: 'app-private-info-modal',
  templateUrl: './private-info-modal.component.html',
  styleUrls: ['./private-info-modal.component.scss'],
})
export class PrivateInfoModalComponent {

  constructor(private modalCtrl: ModalController, private toastService:ToastService) { }

  @Input() salePostId: any;
  @Input() accessCode: any;
  @Input() postType: any;

  dismiss() {
    return this.modalCtrl.dismiss(null, 'cancel')
  }

  async copyToClipboard(){
    let text = `http://localhost:8100/tabs/store/${this.postType}/view/${this.salePostId}`;
    if(this.accessCode != ""){
      text += "?accessCode=" + this.accessCode
    }
    await this.toastService.presentInfoToast("Lien copié dans le presse-papier", 2000)
    await Clipboard.write({
      string: text
    });
  }
}
