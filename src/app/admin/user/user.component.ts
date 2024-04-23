import {Component} from '@angular/core';
import {LazyLoadEvent} from 'primeng/api';
import {Table} from 'primeng/table';

@Component({
  selector: 'app-admin-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  customers = [{
    id: 1000,
    name: 'James Butt',
    country: {
      name: 'Algeria',
      code: 'dz'
    },
    company: 'Benton, John B Jr',
    date: '2015-09-13',
    status: 'unqualified',
    verified: true,
    activity: 17,
    representative: {
      name: 'Ioni Bowcher',
      image: 'ionibowcher.png'
    },
    balance: 70663
  }]

  loading: boolean = false;

  activityValues: number[] = [0, 100];


  ngOnInit() {
  }

  clear(table: Table) {
    table.clear();
  }
}
