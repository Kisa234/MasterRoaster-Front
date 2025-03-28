
export interface Lote {


  id_lote               : string,
  productor             : string,
  finca                 : string,
  region                : string,
  departamento          : string,
  fecha_compra          : Date,
  peso                  : number,
  estado                : string,
  variedades            : string,
  eliminado             : boolean,
  user_id_user?          : string,
  analisis_id?         : string,

}
