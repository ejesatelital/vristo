
import Swal from 'sweetalert2';

export class NOTIFY {
  showToast(text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question', config = {}, position: 'top-end' | 'top' | 'top-start' | 'center' | 'bottom' | 'bottom-start' | 'bottom-end' = 'top-end') {
    Swal.fire({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      title: text,
      icon: icon,
      ...config,
    });
  }

  showAlert(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question', config = {}) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: true,
      ...config,
    });
  }

  // método para mostrar una confirmación
  async showConfirm(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question', confirmButtonText: string, cancelButtonText: string, config = {}) {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      ...config,
    });
    return result.isConfirmed;
  }


}
