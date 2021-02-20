import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent implements OnInit {
  @Input() currentTab: string;
  suggestion: string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.currentTab);
    if (this.currentTab === 'Your Feed'){
      this.suggestion = 'Please follow other people to display their post here';
    } else if (this.currentTab === 'My Articles'){
      this.suggestion = 'Please write a post to display here';
    } else if (this.currentTab === 'Favorited Articles'){
      this.suggestion = 'Please favorite a post to display here';
    }
  }

}
