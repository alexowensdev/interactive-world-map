import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  
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

      });
        
        path.addEventListener('mouseout', () => {
          console.log('Mouse left:', countryId);
          path.style.fill = '#333';
        });
      });
    } else {
      console.error('Failed to load the SVG content.');
    }
  });
}
}

