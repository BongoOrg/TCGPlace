import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core'
import { SearchService } from '../../../core/services/SearchService/search.service'
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	Observable,
	startWith,
	Subject,
	switchMap,
	tap
} from 'rxjs'
import { ItemSearchResponseModel } from '../../../core/models/item-search-response.model'
import { PokemonItemReferenceModel } from '../../../core/models/pokemon-item-reference.model'
import { FormControl } from '@angular/forms'
import { ExtensionModel } from '../../../home/components/extension-card-slider/models/extension.model'

@Component({
	selector: 'app-search-reference',
	templateUrl: './search-reference.component.html',
	styleUrls: ['./search-reference.component.scss']
})
export class SearchReferenceComponent {
	public valueSubject = new Subject<string>()
	public searchValue: string = ''
	@Input() DefaultResults: boolean = false
	@Input() Extensions: ExtensionModel[] | undefined = undefined
	//results$: Observable<PokemonItemReferenceModel[]>;

	constructor(private searchService: SearchService) {
		/*this.results$ = this.valueSubject.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      filter(value => this.DefaultResults || value != ""),
      switchMap(value => this.searchService.SearchReference(value).pipe(
      ))
    ); */
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['Extensions'] && !changes['Extensions'].isFirstChange()) {
			this.valueSubject.next(this.searchValue)
		}
	}

	onValueChanged(value: any) {
		if (this.DefaultResults || value != '') {
			this.valueSubject.next(value.detail.value)
		}
	}
}
