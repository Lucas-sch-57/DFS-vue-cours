import prestationsInterface from './prestationInterface';
const date = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
})
export default {
    id: -1,
    billnum: 0,
    description: '',
    date,
    client: {},
    prestations: [{ ...prestationsInterface }],
    discount: 0.0,
    paid: 0.0,
    totalHT: 0,
    tva: 20,
    totalTTC: 0
}
