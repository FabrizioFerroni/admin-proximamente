import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { TokenService } from './../../service/token.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { SuscriptoresService } from 'src/app/service/suscriptores.service';
import * as XLSX from 'xlsx';
// var fs = require('file-saver');
// import { fs } from 'file-saver';
// import { Workbook } from "exceljs";

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
  load_data: boolean = true;
  page: number = 1;
  pageSize: number = 20;

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
          this.load_data = false;
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

  // donwload_excel(){
  //   let workbook = new Workbook();
  //   let worksheet = workbook.addWorksheet("Reporte de productos");

  //   worksheet.addRow(undefined);
  //   for (let x1 of this.suscriptores){
  //     let x2=Object.keys(x1);

  //     let temp=[]
  //     for(let y of x2){
  //       temp.push(x1[y])
  //     }
  //     worksheet.addRow(temp)
  //   }

  //   let fname='REP01- ';

  //   worksheet.columns = [
  //     { header: 'Id', key: 'col1', width: 30},
  //     { header: 'Nombre', key: 'col2', width: 15},
  //     { header: 'Email', key: 'col3', width: 15},
  //     { header: 'Estado', key: 'col4', width: 25},
  //     { header: 'Fecha de Suscripcion', key: 'col5', width: 15},
  //   ]as any;

  //   workbook.xlsx.writeBuffer().then((data) => {
  //     let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
  //   });
  // }

}
