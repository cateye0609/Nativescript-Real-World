import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Errors } from '../_model/error.model';
import * as Toast from 'nativescript-toast';
// import * as connectivity from '@nativescript/core/connectivity';
// import * as permissions from 'nativescript-permissions'
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public handleError(error: any | HttpErrorResponse) {

    if (error instanceof HttpErrorResponse) {
      // if (permissions.hasPermission(android.Manifest.permission.ACCESS_NETWORK_STATE)) {
      //   const connectionType = connectivity.getConnectionType();
      //   if (connectionType === connectivity.connectionType.none) {
      //     Toast.makeText("No network connection available!").show();
      //   } else {
      console.error(`${error.status} - ${error.message}`);
      this.setErrors(error.error.errors);
      //   }
      // } else {
      //   permissions.requestPermission(android.Manifest.permission.ACCESS_NETWORK_STATE, "Bruh I need this permission 😁")
      //     .then(() => {
      //       console.log("ACCESS_NETWORK_STATE permission granted!");
      //     })
      //     .catch(() => {
      //       Toast.makeText("ACCESS_NETWORK_STATE permission denied 😑").show();
      //       console.log("ACCESS_NETWORK_STATE permission denied!");
      //     });
      // }
    } else {
      // Client Error
      console.error(error);
      Toast.makeText(JSON.stringify(error)).show();
    }
    return throwError(error);
  }

  setErrors(errors: Errors) {
    const errors_List = Object.keys(errors || {})
      .map(key => `${key} ${errors[key]}`);

    this.showError(errors_List);
  }

  showError(errors: string[]) {
    errors.forEach(err => {
      Toast.makeText(err).show();
    })
  }
}