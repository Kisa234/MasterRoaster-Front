

export interface Tueste {

  id_tueste                 ?:string,
  fecha_tueste              ?:Date,              
  tostadora                 ?:string,              
  peso_entrada              ?:number,              
  temperatura_entrada       ?:number,              
  llama_inicial             ?:number,              
  aire_inicial              ?:number,              
  punto_no_retorno          ?:number,              
  tiempo_despues_crack      ?:number,              
  temperatura_crack         ?:number,              
  temperatura_salida        ?:number,              
  tiempo_total              ?:number,              
  porcentaje_caramelizacion ?:number,              
  desarrollo                ?:number,              
  grados_desarrollo         ?:number,              
  peso_salida               ?:number,              
  merma                     ?:number,              
  agtrom_comercial          ?:number,              
  agtrom_gourmet            ?:number,              
  estado_tueste             ?:string,              
  id_analisis_rapido        ?:string,              
  id_lote_tostado           ?:string,              
  id_pedido                 ?:string,              
  eliminado                 ?:boolean,              

}
