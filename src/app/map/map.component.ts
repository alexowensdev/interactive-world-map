import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../country.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

  generalInfo: any = { name: '', capitalCity: '', region: { value: '' } };
  populationInfo: any = [{ value: '' }];
  landAreaInfo: any = [{ value: '' }];

  constructor(private countryService: CountryService, private cdr: ChangeDetectorRef) {}
  
  @ViewChild('worldMap', { static: false }) worldMap!: ElementRef;


  ngAfterViewInit(): void {
    const objectElement = document.getElementById('worldMap') as HTMLObjectElement;

    objectElement.addEventListener('load', () => {
    const svgDoc = objectElement.contentDocument;

    if (svgDoc) {
      const paths = svgDoc.querySelectorAll('path');
      paths.forEach((path: SVGPathElement) => {
        const countryId = path.id;
        path.style.stroke = 'red';
        path.style.fill = '#333';
        path.style.strokeWidth = '1px';
        
        path.addEventListener('mouseover', () => {
          console.log('Hovered over:', countryId);
          path.style.fill = '#666';
          this.fetchCountryData(countryId);

      });
        
        path.addEventListener('mouseout', () => {
          console.log('Mouse left:', countryId);
          path.style.fill = '#333';
          this.resetCountryData();
        });
      });
    } else {
      console.error('Failed to load the SVG content.');
    }
  });
}

fetchCountryData(countryId: string): void {
  this.countryService.getAllCountryData(countryId).subscribe(([generalInfo, population, landArea]) => {
    console.log('General Info:', generalInfo);
    console.log('Population Info:', population);
    console.log('Land Area Info:', landArea);

    this.generalInfo = generalInfo[1][0];
      this.populationInfo = population[1][1];
      this.landAreaInfo = landArea[1][2];

    this.cdr.detectChanges();
  });
}

resetCountryData(): void {
  this.generalInfo = { name: '', capitalCity: '', region: { value: '' } };
  this.populationInfo = [{ value: '' }];
  this.landAreaInfo = [{ value: '' }];

  this.cdr.detectChanges();
};

}

