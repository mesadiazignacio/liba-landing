const _whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER as string
const _ytUrl = import.meta.env.VITE_YOUTUBE_EMBED_URL as string

export const WHATSAPP_NUMBER = _whatsapp
export const WHATSAPP_URL = `https://wa.me/${_whatsapp}?text=Hola%2C%20quiero%20consultar%20sobre%20un%20tr%C3%A1mite`
export const YOUTUBE_EMBED_URL = _ytUrl.replace('youtube.com/watch?v=', 'youtube.com/embed/')
export const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string

/**
 * Contacto directo publicado en el footer.
 *
 * El asunto va precargado por la misma razón que el `wa.me` lleva texto: quien
 * escribe desde el footer todavía no dijo de qué se trata, y un mail sin asunto
 * es un mail que tarda más en contestarse.
 */
export const CONTACT_EMAIL = 'libagestoria@gmail.com'
export const CONTACT_EMAIL_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  'Consulta por un trámite',
)}`

/**
 * Zona de atención. Es la misma que declara la sección "Dónde estamos" de
 * `ContactUs.tsx` — copia real de LIBA, no una afirmación de cobertura nacional,
 * que PRODUCT.md marca explícitamente como no definida.
 */
export const SERVICE_AREA = 'Olivos, Provincia de Buenos Aires, Argentina'

export type SocialLink = {
  label: string
  href: string
  icon: 'instagram' | 'tiktok' | 'linkedin'
}

/**
 * Perfiles sociales. Las tres redes están confirmadas; el usuario `libagestoria`
 * está derivado de la casilla de contacto y hay que verificarlo perfil por perfil
 * antes de publicar — un ícono social que lleva a un 404 cuesta más confianza que
 * no tenerlo.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/libagestoria', icon: 'instagram' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@libagestoria', icon: 'tiktok' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/libagestoria', icon: 'linkedin' },
]

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
