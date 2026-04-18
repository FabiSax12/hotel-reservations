export type EstadoReservacion = "pendiente" | "aprobada" | "cancelada" | "completada";

export interface Huesped {
  nombre: string;
  email: string;
  iniciales: string;
}

export interface Habitacion {
  nombre: string;
  ubicacion: string;
}

export interface Reservacion {
  id: string;
  codigo: string;
  huesped: Huesped;
  habitacion: Habitacion;
  checkIn: string;
  checkOut: string;
  noches: number;
  totalUSD: number;
  estado: EstadoReservacion;
}
