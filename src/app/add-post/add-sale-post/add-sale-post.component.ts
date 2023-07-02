import { Component, OnInit } from '@angular/core';
import {PhotoService} from "../../core/services/photo.service";
import {PokemonService} from "../../core/services/PokemonService/pokemon.service";
import {PokemonItemReferenceModel} from "../../core/models/pokemon-item-reference.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, switchMap, tap} from "rxjs";
import {ModalController} from "@ionic/angular";
import { FullScreenImageComponent } from 'src/app/core/components/full-screen-image/full-screen-image.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalePostModel } from 'src/app/core/models/sale-post.model';
import { AddSalePostService } from '../services/add-sale-post.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { UserPhoto } from '../../core/services/photo.service';
import {finished} from "stream";
import {destroyView} from "@ionic/angular/directives/navigation/stack-utils";
import {SearchPostModel} from "../../core/models/search-post.model";
import {HttpResponse} from "@angular/common/http";
import {OfferService} from "../../store/sale/services/OfferService/offer.service";
import {SalePostService} from "../../store/sale/services/sale-post.service";

@Component({
  selector: 'app-add-sale-post',
  templateUrl: './add-sale-post.component.html',
  styleUrls: ['./add-sale-post.component.scss'],
})
export class AddSalePostComponent implements OnInit {

  constructor(public photoService: PhotoService,
              private pokemonService:PokemonService,
              private addSalePostService: AddSalePostService,
              private salePostService: SalePostService,
              private toastService:ToastService,
              private router:Router,
              public formBuilder: FormBuilder,
              private userService: UserService,
              private modalCtrl: ModalController,
              private route:ActivatedRoute,
              private offerService:OfferService) { }

  idBuyer!: number
  searchPost!:SearchPostModel
  reference$!: Observable<PokemonItemReferenceModel>
  ionicForm!: FormGroup;
  loading: boolean = false;
  private selectedImage!: HTMLIonImgElement;
  public photos: UserPhoto[] = [];

  ngOnInit() {
    if(this.searchPost === undefined){
      this.reference$ = this.pokemonService.GetReferenceById(this.route.snapshot.params['id'])
    }else{
      this.reference$ = this.pokemonService.GetReferenceById(this.searchPost.itemId.toString())
    }

    this.buildIonicForm()
  }

  addPhotoToGallery(){
    this.photoService.addNewToGallery();
  }

  async deletePhoto(photo: UserPhoto) {
    await this.photoService.deletePhoto(photo);
  }


  buildIonicForm(){
    let refId;
    if(!this.searchPost){
      refId = this.route.snapshot.params['id']
    }else{
      refId = this.searchPost.itemId
    }
    this.ionicForm = this.formBuilder.group({
      price: ['', [Validators.required, Validators.min(0.5)]],
      grading: ['', [Validators.required]],
      remarks: [''],
      public: [true],
      refId: refId
    });
  }

  async submitForm() {
    this.loading = true;
    let salePost:SalePostModel = this.getFormData()
    let lesPictures = await this.photoService.CreatePicture()
    salePost.pictures = lesPictures;
    this.addSalePostService.PostSalePost(salePost).subscribe({
      next: (response) => {
        if(response.status == 201){
          this.photoService.photos = []
          this.toastService.presentToastSuccess("Annonce crée")
          this.loading = false;
          this.router.navigateByUrl("/tabs/add")
        }
      }
    })
  }

  async submitOffer(){
    this.loading = true;
    let salePost: SalePostModel = this.getFormData();
    let lesPictures = await this.photoService.CreatePicture();
    salePost.pictures = lesPictures;
    let salePostIdFromResponse: string;

    this.addSalePostService.PostSalePost(salePost).pipe(
      tap(response => {
        if (response.status !== 201) {
          throw new Error("Erreur lors de la création du poste de vente");
        } else {
          // Extrayez l'id de la réponse et stockez-le dans une variable
          if(response.body){
            salePostIdFromResponse = response.body.id;
          }
        }
      }),
      switchMap(response => {
        this.photoService.photos = [];
        this.loading = false;
        return this.offerService.createOffer(salePostIdFromResponse, this.searchPost.id, this.idBuyer, salePost.price);
      })
    ).subscribe({
      next: async (response: HttpResponse<any>) => {
        if (response.status == 201) {
          this.toastService.presentToastSuccess("Offre créée");
          this.loading = false;
          await this.router.navigate(['/tabs/messages/conversation'], {queryParams: {salePostId: salePostIdFromResponse, idUser: this.searchPost.userId}});
          await this.modalCtrl.dismiss()
        }
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  getFormData():SalePostModel{
    let salePost:SalePostModel = new SalePostModel()
    salePost.itemId = this.ionicForm.controls['refId'].value;
    salePost.price = this.ionicForm.controls['price'].value;
    if(this.searchPost){
      salePost.isPublic = false;
    }else{
      salePost.isPublic = this.ionicForm.controls['public'].value;
    }
    salePost.remarks = this.ionicForm.controls['remarks'].value;
    salePost.gradingId = this.ionicForm.controls['grading'].value;
    salePost.statePostId = "C";
    salePost.userId = this.userService.GetCurrentUserID()
    return salePost;
  }

  async openFullscreenImage(imageUrl: string) {
    const modal = await this.modalCtrl.create({
      component: FullScreenImageComponent,
      componentProps: {
        imageUrl: imageUrl
      }

    });
    return await modal.present();
  }

  isPhotoNotEmpty(){
    return this.photoService.photos.length > 0;
  }



}
