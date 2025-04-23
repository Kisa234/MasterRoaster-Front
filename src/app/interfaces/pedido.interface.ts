export interface Pedido {

  id_pedido      ?: string,
  fecha_registro ?: Date,
  tipo_pedido    ?: string,
  cantidad       ?: number,
  estado_pedido  ?: string,
  comentario     ?: string,
  id_user        ?: string,
  id_lote        ?: string,
  eliminado      ?: boolean,

}
