export interface Pedido {
  id_pedido     ?:string,
  fecha_registro?:Date,
  tipo_pedido   ?:string,
  cantidad      ?:number,
  estado_pedido ?:string  ,
  id_user       ?:string,
  id_lote       ?:string,
  id_nuevoLote  ?:string,
  comentario    ?:string,
  pesos         ?:number[],
  fecha_tueste  ?:Date,
  tostadora     ?:string,
  eliminado     ?:boolean ,
            
}
