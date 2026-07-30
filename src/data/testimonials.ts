export interface Testimonial {
  name: string
  location: string
  rating: number
  text: string
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Franco Christ',
    location: 'Florida',
    rating: 5,
    text: 'Excelente atención y seguimiento en todo momento. El trámite se resolvió rápido y sin complicaciones. Muy recomendable.',
    initials: 'FC',
  },
  {
    name: 'María González',
    location: 'Buenos Aires',
    rating: 5,
    text: 'Muy profesionales y honestos. Me explicaron todo el proceso paso a paso. Pude resolver la transferencia sin ningún inconveniente.',
    initials: 'MG',
  },
  {
    name: 'Carlos Ramírez',
    location: 'Córdoba',
    rating: 5,
    text: 'Tenía un caso complicado con una sucesión y lo resolvieron de manera impecable. Gracias por la dedicación y la transparencia.',
    initials: 'CR',
  },
  {
    name: 'Laura Fernández',
    location: 'Rosario',
    rating: 5,
    text: 'Rapidez y claridad en todo. Siempre disponibles para responder mis dudas. 100% recomiendo LIBA para cualquier gestión vehicular.',
    initials: 'LF',
  },
  {
    name: 'Diego Morales',
    location: 'Mendoza',
    rating: 4,
    text: 'Me ayudaron con la baja de un vehículo que parecía imposible de resolver. Profesionalismo de primera. Definitivamente vuelvo.',
    initials: 'DM',
  },
  {
    name: 'Valeria Torres',
    location: 'La Plata',
    rating: 5,
    text: 'La atención fue excelente desde el primer momento. Me asesoraron sobre todas las opciones y elegimos la mejor para mi situación.',
    initials: 'VT',
  },
]
