const _whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER as string
const _ytUrl = import.meta.env.VITE_YOUTUBE_EMBED_URL as string

export const WHATSAPP_NUMBER = _whatsapp
export const WHATSAPP_URL = `https://wa.me/${_whatsapp}?text=Hola%2C%20quiero%20consultar%20sobre%20un%20tr%C3%A1mite`
export const YOUTUBE_EMBED_URL = _ytUrl.replace('youtube.com/watch?v=', 'youtube.com/embed/')
export const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string

export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
export const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string

export type NavLink = {
  label: string
  to: string
  children?: { label: string; to: string }[]
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Sobre LIBA', to: '/about-us' },
  {
    label: 'Servicios',
    to: '/services',
    children: [
      { label: 'Concesionaria', to: '/services/dealership' },
      { label: 'Empresa', to: '/services/company' },
      { label: 'Particular', to: '/services/individual' },
    ],
  },
  { label: 'Trámites', to: '/procedures' },
  { label: 'Preguntas Frecuentes', to: '/faqs' },
  { label: 'Contacto', to: '/contact-us' },
]

export const STATS = [
  { prefix: '+', value: 800, suffix: '', label: 'Trámites\nresueltos' },
  { prefix: '+', value: 10, suffix: '', label: 'Tipos de servicios\nprestados' },
  { prefix: '', value: 48, suffix: ' hs', label: 'Tiempo promedio\nde resolución' },
]
