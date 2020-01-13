import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-crud-app',
  templateUrl: './crud-app.component.html',
  styleUrls: ['./crud-app.component.scss']
})
export class CrudAppComponent {

  @ViewChild('fileImport') fileImport: ElementRef;

  public hide: boolean = true;

  constructor(private configService: ConfigService, private cookieService: CookieService) { }

  import() {
    const fileReader = new FileReader();
    this.fileImport.nativeElement.onchange = () => {
      fileReader.onloadend = (fileLoadedEvent: any) => {
        const textFromFileLoaded = fileLoadedEvent.target.result as string;
        this.configService.loadConfig(JSON.parse(textFromFileLoaded));
      };
      fileReader.readAsText(this.fileImport.nativeElement.files[0], "UTF-8");
    };
    this.fileImport.nativeElement.click();
  }

  export() {
    this.configService.exportConfig();
  }

  deleteAll() {
    this.cookieService.clearAll();
    location.reload();
  }

}
