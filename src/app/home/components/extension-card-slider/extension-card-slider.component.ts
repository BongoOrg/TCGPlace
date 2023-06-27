import { Component, OnInit } from '@angular/core';
import { ExtensionModel } from './models/extension.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExtensionCardService } from './services/extension-card.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extension-card-slider',
  templateUrl: './extension-card-slider.component.html',
  styleUrls: ['./extension-card-slider.component.scss'],
})
export class ExtensionCardSliderComponent implements OnInit {

  extensions$!: Observable<ExtensionModel[]>
  skeletons = [0,0];
  constructor(private router:Router, private http: HttpClient, private extensionCardService: ExtensionCardService) { }

  ngOnInit() {
    this.extensions$= this.extensionCardService.GetAllExtensions()
  }

  navigateTo(idExtension:string) {
    this.router.navigateByUrl(`/tabs/store/extension/${idExtension}`);
   }
}
