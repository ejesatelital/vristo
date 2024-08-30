
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

}
