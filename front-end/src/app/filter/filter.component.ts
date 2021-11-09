import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { MyResponse } from './myResponse.interface';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  /* Variables del Formulario */
  idCompForm = new FormControl('1');
  idUserForm= new FormControl('-1');
  fAntForm= new FormControl('2017-01-01')
  fActForm= new FormControl('2018-01-01')
  interForm= new FormControl(15)

  /* Variables de Datos */
  usuarios = ['-1'];

  /* Variables de vizualización */
  mostrarGrafico = false
  mostrarOpcion = false
  mostrarLoading = false

  /* Variables del Grafico */
  lineChartData: ChartDataSets[]=[
    {data:[]}
  ]
  lineChartLabels: Label[]=[]
  lineChartOptions: ChartOptions = {
    responsive: true,
  }
  lineChartColors: Color[] = [
    {
      backgroundColor: 'whitesmoke',
      borderColor: 'dimgray',


    }
  ]
  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  lineChartPlugins =[];
  


 // data = null;



  constructor(
    private httpClient: HttpClient
  ) {
    this.idCompForm.valueChanges.pipe().subscribe(()=>{
      this.idUserForm = new FormControl('-1');
      this.usuarios=['-1'];
      this.mostrarOpcion=false
    })
  }

  ngOnInit(): void {
  }

  async seach(){
    this.mostrarGrafico = false
    this.mostrarLoading = true
    const url = `http://localhost:3000`
    const solicitud = `/data/filter/idCom/${this.idCompForm.value}/idUsr/${this.idUserForm.value}/fechas/${this.fAntForm.value}_${this.fActForm.value}/inter/${this.interForm.value}`
    console.log(url+solicitud)
    await this.httpClient.get<MyResponse>(url+solicitud)
    .subscribe(res=>{
     
      if(this.idUserForm.value === '-1') this.usuarios = Object.keys(res.usuarios);
      this.lineChartData=[
        {data: Object.values(res.eventos), label: 'Numero de eventos', hitRadius:0.1}
      ]
      this.lineChartLabels= Object.keys(res.eventos)
      this.mostrarGrafico=true
      this.mostrarOpcion=true
      this.mostrarLoading = false

    })
    //console.log(this.data)
  }

  

  

}
