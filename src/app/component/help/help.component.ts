import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfigService, Config } from 'src/app/services/config.service';


const PREVIEW_CONFIG = `
{
  "title": "Usefull Services",
  "services": [
    {
      "name": "Bootstrap",
      "description": "The most popular Web framework.",
      "group": "Development",
      "repo_link": "https://github.com/twbs/bootstrap",
      "no_env_url": "https://getbootstrap.com/"
    },
    ...
  ]
}
`

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
