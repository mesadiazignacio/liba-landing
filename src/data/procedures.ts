export type ProcedureBlock =
  | { kind: 'intro'; text: string }
  | { kind: 'section'; heading: string; items: string[] }
  | { kind: 'note'; heading: string; items: string[] }

export interface Procedure {
  title: string
  subtitle?: string
  blocks: ProcedureBlock[]
}

export interface ProcedureCategory {
  title: string
  tone: 'navy' | 'coral'
  procedures: Procedure[]
}

export const procedureCategories: ProcedureCategory[] = [
  {
    title: 'Transferencias y titularidad',
    tone: 'navy',
    procedures: [
      {
        title: 'Transferencia de vehículos',
        subtitle: 'Autos y motos: el más consultado',
        blocks: [
          {
            kind: 'intro',
            text: 'Cuando comprás o vendés un vehículo, el trámite de transferencia es lo que hace que el auto o la moto quede legalmente a nombre del nuevo dueño. Sin eso, el vehículo sigue ligado al titular anterior (con todo lo que eso implica en materia de multas, impuestos y responsabilidades).',
          },
          {
            kind: 'section',
            heading: '¿Qué incluye?',
            items: [
              'Diagnóstico completo con informes y presupuesto.',
              'Verificación de deudas y prendas.',
              'Revisión integral de la documentación.',
              'Coordinación de turnos.',
              'Presentación del trámite.',
              'Seguimiento y subsanación si hubiese observaciones.',
              'Altas y bajas de patentes en caso de realizar en organismo descentralizados.',
            ],
          },
          {
            kind: 'section',
            heading: 'Para quienes:',
            items: [
              'Compradores de autos o motos usados.',
              'Vendedores que quieren traspasar la titularidad.',
              'Concesionarias y reventas.',
              'Casos con deuda, mora o irregularidades.',
            ],
          },
        ],
      },
      {
        title: 'Transferencia por oficio de sucesión',
        subtitle: 'Herencias / Vehículos de titulares fallecidos',
        blocks: [
          {
            kind: 'intro',
            text: 'Cuando un familiar fallece y deja un vehículo, ese auto o moto queda en un limbo registral hasta que se completa el proceso sucesorio. Con el oficio judicial emitido, gestionamos la transferencia para que el vehículo quede a nombre del o los herederos de manera definitiva.',
          },
          {
            kind: 'section',
            heading: '¿Qué incluye?',
            items: [
              'Revisión del oficio judicial.',
              'Coordinación con el abogado de la sucesión en caso de ser necesario.',
              'Diagnóstico completo con informes y presupuesto.',
              'Coordinación de turnos.',
              'Presentación del trámite.',
              'Seguimiento y subsanación si hubiese observaciones.',
            ],
          },
          {
            kind: 'note',
            heading: 'Importante:',
            items: [
              'Requiere oficio de sucesión completo emitido por el juzgado (no es suficiente con sólo la declaratoria de herederos).',
              'El proceso judicial lo lleva el abogado del cliente.',
              'Nosotros tomamos el trámite desde el oficio ya concluído o próximo a finalizar.',
            ],
          },
        ],
      },
      {
        title: 'Denuncia de compra y posesión',
        subtitle: 'Protección al comprador ante problemas de transferencia',
        blocks: [
          {
            kind: 'intro',
            text: 'Compraste un vehículo pero por alguna razón la transferencia no puede realizarse (titular fallecido o no es quien te lo vendió, víctima de estafa, etc). La denuncia de compra y posesión es el trámite que protege al comprador durante ese período intermedio: deja asentado ante el Registro del Automotor que el vehículo ya tiene un nuevo poseedor adquirido de buena fé, junto con el posible posterior trámite de transferencia o, en su defecto, el inicio de acciones legales.',
          },
          {
            kind: 'section',
            heading: '¿Para qué sirve?:',
            items: [
              'Proteger al comprador de circular sin inconvenientes.',
              'Acreditar la compra de buena fé del vehículo ante terceros.',
              'Iniciar el camino de la titularidad del auto con procedimientos legales.',
            ],
          },
          {
            kind: 'section',
            heading: '¿Cuándo hacerlo?',
            items: [
              'Cuando has sido víctima de una estafa.',
              'Cuando la transferencia se demora por algún inconveniente legal (embargos, inhibiciones, sucesiones en curso, etc).',
              'Cuando el vendedor no quiere firmar el 08.',
            ],
          },
        ],
      },
      {
        title: 'Denuncia de venta',
        subtitle: 'Protección del vendedor después de la entrega',
        blocks: [
          {
            kind: 'intro',
            text: 'Vendiste tu vehículo pero el comprador no está realizando la transferencia. Mientras el auto siga a tu nombre, continuarás siendo responsable de multas, accidentes e impuestos que genere ese vehículo. La denuncia de venta ante el Registro del Automotor deja constancia de que ya no sos el poseedor y limita tu responsabilidad desde la fecha de la denuncia.',
          },
          {
            kind: 'section',
            heading: '¿Para qué sirve?',
            items: [
              'Desligar la responsabilidad sobre el vehículo vendido.',
              'Protegerse de multas e infracciones post-venta.',
              'Dejar constancia registral de la entrega.',
            ],
          },
          {
            kind: 'section',
            heading: '¿Cuándo hacerlo?',
            items: [
              'Cuando el comprador no realiza la transferencia.',
              'Apenas entregado el vehículo como medida preventiva.',
              'Cuando dejás tu vehículo para vender en una concesionaria.',
            ],
          },
          {
            kind: 'note',
            heading: 'Importante:',
            items: [
              'La denuncia de venta no reemplaza la transferencia. El auto sigue figurando a tu nombre hasta que el comprador transfiera. Pero te protege legalmente desde el momento en que la presentás.',
            ],
          },
        ],
      },
      {
        title: 'Patentamiento de vehículos',
        subtitle: 'Inscripción inicial / 0km y vehículos sin patente',
        blocks: [
          {
            kind: 'intro',
            text: 'El patentamiento es la inscripción inicial de un vehículo en el Registro del Automotor. Es el primer paso para que exista registralmente. También aplica en casos de inscripción de vehículos que nunca fueron patentados o que provienen de importaciones particulares.',
          },
          {
            kind: 'section',
            heading: '¿Qué incluye?',
            items: [
              'Inscripción ante el Registro del Automotor.',
              'Retiro de patente, título y cédula.',
              'Coordinación con el concesionario o importador en caso de ser necesario.',
              'Gestión de alta impositiva de patentes.',
            ],
          },
          {
            kind: 'section',
            heading: '¿Para quién?',
            items: [
              'Compradores de vehículos 0km.',
              'Empresas con incorporación de unidades nuevas a la flota.',
              'Importadores de vehículos particulares.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Documentación registral',
    tone: 'coral',
    procedures: [
      {
        title: 'Cédulas RAC para personas jurídicas',
        subtitle: 'Empresas: SRL, SA y otras formas societarias',
        blocks: [
          {
            kind: 'intro',
            text: 'Cuando un vehículo pertenece a una empresa, la ex cédula azul (habilitación para circular a nombre de un tercero) tiene requisitos específicos distintos a los de una persona física. Gestionamos la tramitación y renovación de cédulas RAC para personas jurídicas, asegurándonos de que la documentación sea válida para circular y para cualquier control de tránsito.',
          },
          {
            kind: 'section',
            heading: '¿Qué incluye?',
            items: ['Gestión de altas y bajas de cédulas en el sistema.'],
          },
          {
            kind: 'section',
            heading: '¿Para quién?',
            items: [
              'Personas jurídicas con vehículos a nombre de la sociedad.',
              'Flotas corporativas con múltiples conductores.',
            ],
          },
        ],
      },
      {
        title: 'Asesoramiento previo a la compra',
        subtitle: 'Pack de informes: Antes de firmar algo',
        blocks: [
          {
            kind: 'intro',
            text: 'Antes de comprar un auto o moto usado, verificamos el estado registral completo del vehículo: si tiene deudas, prendas activas, medidas judiciales, si el titular es quien dice ser y si la documentación está en orden. La información que te damos puede ahorrarte un problema enorme posterior a la compra.',
          },
          {
            kind: 'section',
            heading: '¿Qué verificamos?',
            items: [
              'Informe de dominio y titular registral.',
              'Deudas de patentes e infracciones.',
              'Prendas y gravámenes activos.',
              'Medidas judiciales vigentes.',
              'Consistencia de la documentación.',
            ],
          },
          {
            kind: 'note',
            heading: 'Resultado:',
            items: [
              'Informe claro sobre el estado del vehículo.',
              'Recomendación concreta sobre si conviene avanzar.',
              'Si hay problemas, te explicamos cuáles y qué implican.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Impuestos e infracciones',
    tone: 'navy',
    procedures: [
      {
        title: 'Altas y bajas de patentes',
        subtitle: 'Impuestos provinciales y municipales',
        blocks: [
          {
            kind: 'intro',
            text: 'Las patentes son el impuesto anual sobre los vehículos automotores. Pagadas fuera de término generan recargos e intereses que se acumulan. Regularizamos la situación impositiva dado que no está dado de alta en tu jurisdicción.',
          },
          {
            kind: 'section',
            heading: '¿Qué gestionamos?',
            items: [
              'Verificación del estado de patentes del vehículo.',
              'Altas y bajas con solicitud de certificado de libre de deuda.',
              'Gestión ante ARBA, AGIP y organismos municipales.',
            ],
          },
          {
            kind: 'section',
            heading: '¿Para quién?',
            items: [
              'Particulares quienes necesiten actualizar la jurisdicción de patentes.',
              'Empresas con flota que necesitan monitoreo.',
              'Compradores que detectan deuda antes de la transferencia.',
            ],
          },
        ],
      },
      {
        title: 'Tratamiento de infracciones de tránsito',
        subtitle: 'Multas: Reducción y regularización',
        blocks: [
          {
            kind: 'intro',
            text: 'Las infracciones acumuladas pueden convertirse en un obstáculo para cualquier trámite registral. Verificamos el estado de tus infracciones, analizamos las opciones de reducción o pedidos de nulidad y gestionamos la regularización ante los organismos correspondientes.',
          },
          {
            kind: 'section',
            heading: '¿Qué incluye?',
            items: [
              'Armado de descargos para los juzgados correspondientes.',
              'Verificación completa de infracciones por dominio.',
              'Análisis de opciones de reducción vigentes.',
              'Regularización documentada para otros trámites.',
            ],
          },
          {
            kind: 'section',
            heading: '¿Para quién?',
            items: [
              'Particulares que necesitan el vehículo en regla para venderlo o presentar el libre de deuda ante el seguro.',
              'Empresas con infracciones acumuladas en su flota.',
              'Compradores que detectan infracciones previas a la compra.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Gravámenes y medidas judiciales',
    tone: 'coral',
    procedures: [
      {
        title: 'Inscripción y cancelación de prendas',
        blocks: [
          {
            kind: 'intro',
            text: 'Una prenda es un gravamen que queda asentado sobre el vehículo cuando se financia su compra. Mientras la prenda esté activa, muchos trámites posteriores del auto deberán tener la notificación previa al acreedor. Gestionamos tanto la inscripción de nuevas prendas como la cancelación de las ya pagadas que todavía no fueron levantadas registralmente (un problema frecuente que traba transferencias).',
          },
          {
            kind: 'section',
            heading: '¿Qué gestionamos?',
            items: [
              'Inscripción y reinscripción de prenda sobre vehículos financiados.',
              'Cancelación de prenda una vez saldada la deuda.',
            ],
          },
          {
            kind: 'section',
            heading: '¿Para quién?',
            items: [
              'Compradores con financiamiento bancario o prendario.',
              'Personas que terminaron de pagar y necesitan levantar la prenda.',
              'Abogados o bancos que necesiten volver a inscribir una prenda vigente.',
              'Compradores de autos que tienen prenda del dueño anterior.',
            ],
          },
          {
            kind: 'note',
            heading: 'Caso frecuente:',
            items: [
              'El auto ya está pago pero la prenda sigue figurando en el registro porque nadie gestionó la cancelación.',
            ],
          },
        ],
      },
      {
        title: 'Inscripción y levantamiento de medidas judiciales',
        subtitle: 'Embargos - Inhibiciones - Medidas cautelares',
        blocks: [
          {
            kind: 'intro',
            text: 'Las medidas judiciales sobre un vehículo quedan asentadas en el Registro del Automotor y demoran cualquier operación registral sobre ese bien. Gestionamos tanto la inscripción como el levantamiento de estas medidas, trabajando en coordinación con los letrados intervinientes cuando corresponde.',
          },
          {
            kind: 'section',
            heading: '¿Qué gestionamos?',
            items: [
              'Inscripción de medidas cautelares dispuestas judicialmente.',
              'Levantamiento de embargos e inhibiciones.',
              'Coordinación con abogados del caso.',
            ],
          },
          {
            kind: 'section',
            heading: '¿Para quién?',
            items: [
              'Personas con vehículos afectados por juicios o deudas.',
              'Demandantes que necesiten presentar las medidas ante el registro.',
              'Empresas con unidades bloqueadas judicialmente.',
              'Abogados que necesitan soporte de gestoría.',
            ],
          },
        ],
      },
    ],
  },
]
