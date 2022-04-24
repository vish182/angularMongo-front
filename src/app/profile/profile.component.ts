import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() users: String[];
  @Input() passwords: String[];
  @Input() deleteFunc: Function;
  constructor() { }

  ngOnInit(): void {
  }

}
