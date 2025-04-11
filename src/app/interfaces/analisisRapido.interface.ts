export interface AnalisisRapido {
   id_analisis_rapido?: string;
   fecha_registro?: string | Date;
   horneado: boolean;
   humo: boolean;
   uniforme: boolean;
   verde: boolean;
   arrebatado: boolean;
   oscuro: boolean;
   comentario?: string;
 }
 