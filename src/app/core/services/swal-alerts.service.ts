import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SwalAlertsService {

  constructor() { }
  erorrAlert(title: string, descripcion: string ) {
    return Swal.fire({
      title: title,
      text: descripcion,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#031a3d',
    });
  }
  messageAlert(descripcion: string ) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: descripcion,
      showConfirmButton: false,
      timer: 1500
    });
  }
  messageWhitTimer(mensaje: string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: mensaje
    })
  }
}
