import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { TokenService } from './../../service/token.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
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
  status!: number;
  name: string = 'suscriptores' + new Date().getTime() + '.xlsx';
  id!: number;
  data: any = {};

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private susService: SuscriptoresService,
    private router: Router,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private titleService: Title
  ) {
    this.token = tokenService.getToken();
    titleService.setTitle('Suscriptores - Admin Proximamente')
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

  get_status(id: number): void {
    this.susService.get_suscriber_per_id(id, this.token).subscribe(
      res => {
        this.status = res.suscriptor.status;
      },
      err => {
        console.log(err);
      }
    )
  }

  change_state(id: number): void {
    this.get_status(id);
    $('#editstatus-' + id).modal('show');
    this.id = id;
  }

  edit_status(editst: any) {
    if (editst.valid) {
     this.data = {
        status: this.status
      }

      this.susService.put_suscriber_per_id(this.id, this.data, this.token).subscribe(
        res => {
          iziToast.success({
            title: 'ÉXITO',
            message: res.mensaje,
            position: 'topRight',
          });

          $('#editstatus-' + this.id).modal('hide');
          $('.modal-backdrop').removeClass('show');
          this.get_suscribers();
        },
        err => {
          iziToast.error({
            title: 'ERROR',
            message: err.error.message,
            position: 'topRight',
          });
        }
      )
    } else {
      iziToast.warning({
        title: 'ADVERTENCIA',
        message: "Debes escojer un estado",
        position: 'topRight',
      });
    }
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
