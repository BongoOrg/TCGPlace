import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-skeleton-grid',
  templateUrl: './skeleton-grid.component.html',
  styleUrls: ['./skeleton-grid.component.scss'],
})
export class SkeletonGridComponent implements OnInit {

  @Input() nbSkeletons = 4
  skeletons:number[] = []
  constructor() { }

  ngOnInit() {
    for(let i = 0; i<this.nbSkeletons; i++){
      this.skeletons.push(0)
    }
  }

}
