import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-crud-app',
  templateUrl: './crud-app.component.html',
  styleUrls: ['./crud-app.component.scss']
})
export class CrudAppComponent {

  @ViewChild('fileImport') fileImport: ElementRef;

  public hide: boolean = true;

  constructor(private configService: ConfigService) { }

  import() {
    this.fileImport.nativeElement.onchange = () => {
      const fileToLoad = this.fileImport.nativeElement.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = (fileLoadedEvent: any) => {
        const textFromFileLoaded = fileLoadedEvent.target.result as string;
        this.configService.loadConfig(JSON.parse(textFromFileLoaded));
      };
      fileReader.readAsText(fileToLoad, "UTF-8");
    };
    this.fileImport.nativeElement.click();
  }

  export() {
    this.configService.exportConfig();
  }

}
