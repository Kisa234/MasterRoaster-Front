

export interface User {

  id_user: string,
  nombre: string,
  email: string,
  numero_telefono: number,
  rol: string,
  password: string,
  eliminado: boolean,
  lote: string[],
  muestras: string[],
  pedido: string[],
  pedido_asignado: string[],
  fecha_registro: Date,
  fecha_editado?: Date,

}
