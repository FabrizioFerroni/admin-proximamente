import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { TokenService } from './../../service/token.service';
import { Component, OnInit } from '@angular/core';
import { SuscriptoresService } from 'src/app/service/suscriptores.service';
import * as XLSX from 'xlsx';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-suscriptores',
  templateUrl: './suscriptores.component.html',
  styleUrls: ['./suscriptores.component.css']
})
export class SuscriptoresComponent implements OnInit {

  token!: string;
  suscriptores: Array<any> = [];
  name: string = 'suscriptores' + new Date().getTime() + '.xlsx';
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private susService: SuscriptoresService,
    private router: Router
  ) {
    this.token = tokenService.getToken();
  }

  ngOnInit(): void {
    this.get_suscribers();
  }


  get_suscribers(): void {
    this.susService.get_suscriber(this.token).subscribe(
      res => {
        this.suscriptores = res.data;
      },
      err => {
        console.log(err);

      }
    )
  }


  exporttoexcel(): void {
    let element = document.getElementById('suscriptores-table');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Suscriptores');

    XLSX.writeFile(book, this.name);
  }

  change_state(estado: number):void{
    console.log("Estado: ", estado);

  }

  cerrarsesion(): void {
    this.authService.cerrarsesion(this.token).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/iniciarsesion']);
      },
      err => {
        console.log(err);
        this.router.navigate(['/iniciarsesion']);

      }
    )
  }

}
