import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';


const PREVIEW_CONFIG = `{
  "title": "Usefull Tools",
  "services": [
    {
      "name": "Explorer",
      "description": "Manage bookmarks by environment.",
      "group": "Development",
      "repo_link": "github.com/The224/Services-Explorer",
      "doc_link": "github.com/The224/Services-Explorer/wiki",
      "website_link": "explorer.the224.info/",
      "urls": {
        "dev": "localhost:4200",
        "prod": "explorer.the224.info/"
      },
      "no_env_url": "explorer.the224.info/"
    },
    ...
  ]
}`

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  @ViewChild('fileImport') fileImport: ElementRef;

  public cmOptions = { lineNumbers: true, theme: 'material', mode: { name: "javascript", json: true }, readOnly: true }
  public content = PREVIEW_CONFIG

  constructor(private configService: ConfigService) { }

  ngOnInit() { }

  public import() {
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

}
