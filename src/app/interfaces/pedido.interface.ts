export interface Pedido {

  id_pedido       : string,
  fecha_pedido    : Date,
  tipo_tueste     : string,
  cantidad_tostado: number,
  estado_pedido   : string,
  observaciones   : string,
  cliente_id      : string,
  asignado_a_id?  : string,
  fecha_asignacion?: Date,
  eliminado?      : boolean


}
