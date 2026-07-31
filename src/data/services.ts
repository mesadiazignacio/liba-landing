export interface Service {
  label: string
  /**
   * One sentence on what the trámite actually resolves, shown when the card on
   * the home page opens.
   *
   * Seven of these are condensed from LIBA's own writing in `procedures.ts` and
   * `ServicesPage.tsx` — same claims, same voice, cut to two lines. The eighth
   * (`Trámites para reventas y agencias`) is marked below: there is no
   * LIBA-authored description of that line anywhere in the project, so it was
   * drafted from what PRODUCT.md already establishes about the audience and it
   * needs LIBA's confirmation before it is treated as final.
   */
  summary: string
}

export const services: Service[] = [
  {
    label: 'Transferencias de autos',
    summary:
      'Que el auto o la moto quede legalmente a nombre del nuevo dueño. Verificamos deudas y prendas, revisamos toda la documentación y presentamos el trámite.',
  },
  {
    label: 'Radicaciones y patentamiento',
    summary:
      'La inscripción inicial del vehículo en el Registro del Automotor: el primer paso para que exista registralmente. Incluye el retiro de patente, título y cédula.',
  },
  {
    label: 'Gestión de multas e infracciones',
    summary:
      'Las infracciones acumuladas traban cualquier trámite registral. Verificamos el estado por dominio, analizamos las opciones de reducción y gestionamos la regularización.',
  },
  {
    // PENDIENTE DE CONFIRMACIÓN DE LIBA. No existe descripción escrita por LIBA
    // para esta línea; ésta se redactó a partir de lo que PRODUCT.md ya afirma
    // sobre concesionarias y reventas. Sin promesas de plazo, que PRODUCT.md
    // prohíbe fuera de las 48 hs promedio ya confirmadas.
    label: 'Trámites para reventas y agencias',
    summary:
      'Transferencias y altas en volumen para concesionarias y reventas, con un mismo interlocutor y los plazos coordinados de punta a punta.',
  },
  {
    label: 'Trámites para el seguro',
    summary:
      'Cuando la aseguradora informa un trámite pendiente por robo o demoras en la baja del vehículo, nos encargamos de la documentación, los plazos y la coordinación con el Registro.',
  },
  {
    label: 'Altas y bajas impositivas',
    summary:
      'Las patentes pagadas fuera de término acumulan recargos e intereses. Regularizamos la situación impositiva del vehículo en la jurisdicción que corresponda.',
  },
  {
    label: 'Oficios sucesorios',
    summary:
      'Cuando fallece el titular, el vehículo queda en un limbo registral. Con el oficio judicial emitido, gestionamos la transferencia a nombre de los herederos de manera definitiva.',
  },
  {
    label: 'Cédulas RAC para empresas',
    summary:
      'Cuando el vehículo pertenece a una empresa, la ex cédula azul tiene requisitos propios. Tramitamos y renovamos las cédulas RAC para personas jurídicas y flotas.',
  },
]
