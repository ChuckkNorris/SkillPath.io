import { TutorialService } from './services/tutorial.service';
import { TutorialCardComponent } from './tutorial-card/tutorial-card.component';
import { SubmitTutorialFormComponent } from './submit-tutorial-form/submit-tutorial-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export {Tutorial} from './tutorial';
export { TutorialService } from './services/tutorial.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ TutorialCardComponent],
  exports: [],
  providers: [TutorialService],
  
})
export class TutorialModule { }
