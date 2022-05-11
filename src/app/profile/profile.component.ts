import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../Profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() users: Profile[];
  @Input() deleteFunc: Function;
  constructor() { }

  ngOnInit(): void {
  }

}
