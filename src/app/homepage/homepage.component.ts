import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import { AudioData } from '../shared/models/audio-data';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  host: {ngSkipHydration: 'true'},
  styleUrl: './homepage.component.css'
})

export class HomepageComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  public files: AudioData[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.refreshFiles();
  }

  downloadExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.files);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'example');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = fileName + '.xlsx';
    link.click();
  }

  fileChange(event: any) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('my_audio_file', file);

      this.http.post('http://localhost:8086/api/file_tempo?my_audio_file', formData).subscribe((res: any) => {
        this.files.push(res);
        localStorage.setItem('files',JSON.stringify(this.files));
        console.log(localStorage.getItem('files'))
      });
    }
  }

  clear() {
    this.files = [];
    localStorage.setItem('files',JSON.stringify(this.files));
    localStorage.setItem('test',JSON.stringify(this.files));
  }

  refreshFiles() {
    if(localStorage.getItem('files')) {
      localStorage.setItem('files',JSON.stringify(this.files));
    }
    let retrievedObject = localStorage.getItem("files");
    this.files = JSON.parse(retrievedObject);
  }

}
