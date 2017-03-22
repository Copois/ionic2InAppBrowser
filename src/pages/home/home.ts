import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
browser: InAppBrowser;
onResumeSubscription
  constructor(public navCtrl: NavController, private platform:Platform) {
    this.onResumeSubscription = platform.resume.subscribe(() => {
      console.log('resume');
      console.log(this.browser)
      if(this.browser !== undefined){
        this.browser.on("loadstart").subscribe(
        (res) => {
          console.log(res)
          if(res.url == "https://ionicframework.com/"){
            this.browser.executeScript({code:"window.stop();"})
            new InAppBrowser("https://ionicframework.com/", '_system');
          }
        },
        err => {
          console.log("InAppBrowser loadstart Event Error: " + err);
        });
      this.browser.on("exit").subscribe(
        (res) => {
          alert('InAppBrowser exit Success');
        },
        err => {
          console.log("InAppBrowser exit Event Error: " + err);
        });




      }
       // do something meaningful when the app is put in the foreground
    }); 
  }
  openInAppBrowser(){

    alert('InAppBrowser call');
    this.browser = new InAppBrowser('https://www.google.be');
    this.browser.on("loadstart").subscribe(
      (res) => {
        console.log(res)
        if(res.url == "https://ionicframework.com/"){
          this.browser.executeScript({code:"window.stop();"})
          new InAppBrowser("https://ionicframework.com/", '_system');
        }
      },
      err => {
        console.log("InAppBrowser loadstart Event Error: " + err);
      });
    this.browser.on("exit").subscribe(
      (res) => {
        alert('InAppBrowser exit Success');
      },
      err => {
        console.log("InAppBrowser exit Event Error: " + err);
      });
  }
}
