import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoFecha'
})
export class FormatoFechaPipe implements PipeTransform {
  transform(value: Date | string | number, formato: string = 'dd/MM/yyyy'): string {
    if (!value) return '';

    const fecha = new Date(value);
    if (isNaN(fecha.getTime())) return 'Fecha inválida';

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();

    switch (formato) {
      case 'dd/MM/yyyy':
        return `${dia}/${mes}/${año}`;
      case 'MM/dd/yyyy':
        return `${mes}/${dia}/${año}`;
      case 'yyyy-MM-dd':
        return `${año}-${mes}-${dia}`;
      default:
        return `${dia}/${mes}/${año}`;
    }
  }
}
