import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService
    , public platform: Platform) {
    this.dir = platform.dir();
    translate.get(["TUTORIAL_SLIDE_START_TITLE",
      "TUTORIAL_SLIDE_START_DESCRIPTION",
      "TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
      "TUTORIAL_SLIDE4_TITLE",
      "TUTORIAL_SLIDE4_DESCRIPTION",
      "TUTORIAL_SLIDE5_TITLE",
      "TUTORIAL_SLIDE5_DESCRIPTION",
      "TUTORIAL_SLIDE6_TITLE",
      "TUTORIAL_SLIDE6_DESCRIPTION",
      "TUTORIAL_SLIDE7_TITLE",
      "TUTORIAL_SLIDE7_DESCRIPTION",
      "TUTORIAL_SLIDE8_TITLE",
      "TUTORIAL_SLIDE8_DESCRIPTION"
    ]).subscribe(
      (values) => {
        this.slides = [
          {
            title: values.TUTORIAL_SLIDE_START_TITLE,
            description: values.TUTORIAL_SLIDE_START_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-1.png',
          },
          {
            title: values.TUTORIAL_SLIDE1_TITLE,
            description: values.TUTORIAL_SLIDE1_DESCRIPTION,
            image: 'assets/img/1-sign-up.png',
          },
          {
            title: values.TUTORIAL_SLIDE2_TITLE,
            description: values.TUTORIAL_SLIDE2_DESCRIPTION,
            image: 'assets/img/2-wait-for-approval.png',
          },
          {
            title: values.TUTORIAL_SLIDE3_TITLE,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/3-sign-in.png',
          },
          {
            title: values.TUTORIAL_SLIDE4_TITLE,
            description: values.TUTORIAL_SLIDE4_DESCRIPTION,
            image: 'assets/img/4-browse-projects.png',
          },
          {
            title: values.TUTORIAL_SLIDE5_TITLE,
            description: values.TUTORIAL_SLIDE5_DESCRIPTION,
            image: 'assets/img/5-subscribe-to-project.png',
          },
          {
            title: values.TUTORIAL_SLIDE6_TITLE,
            description: values.TUTORIAL_SLIDE6_DESCRIPTION,
            image: 'assets/img/6-start-tagging.png',
          },
          {
            title: values.TUTORIAL_SLIDE7_TITLE,
            description: values.TUTORIAL_SLIDE7_DESCRIPTION,
            image: 'assets/img/7-choose-proper-tag.png',
          },
          {
            title: values.TUTORIAL_SLIDE8_TITLE,
            description: values.TUTORIAL_SLIDE8_DESCRIPTION,
            image: 'assets/img/8-modify-tagged-document.png',
          }
        ];
      });
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
