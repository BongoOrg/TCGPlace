import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PokemonService} from "../../core/services/PokemonService/pokemon.service";
import {PokemonItemReferenceModel} from "../../core/models/pokemon-item-reference.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-reference-post',
  templateUrl: './add-reference-post.component.html',
  styleUrls: ['./add-reference-post.component.scss'],
})
export class AddReferencePostComponent {

  @Input() SearchedReferences!: PokemonItemReferenceModel[]
  @Input() loading!: boolean
  @Output() selectRef: EventEmitter<string> = new EventEmitter();


  constructor() {
  }


  SelectReference(reference:PokemonItemReferenceModel){
    this.selectRef.emit(reference.idCard);
  }
}
