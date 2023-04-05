<template>
  <div class="bill">
    <div class="d-flex align-items-baseline justify-content-between border-bottom mb-4">
      <h1>
        {{ isNewBill ? 'Créer une nouvelle ' : 'Modifier la' }} facture
        <span v-if="!isNewBill" class="text-primary">#{{ id }}</span>
      </h1>
      <div class="d-flex gap-2">
        <BButton v-if="!isNewBill" size="sm" variant="outline-danger" icon-left="trash"
          >Supprimer</BButton
        >
        <BButton to="/" size="sm" variant="outline-secondary" icon-left="angle-left"
          >Annuler</BButton
        >
      </div>
    </div>
    <section v-if="bill && bill.id">
      <div class="row">
        <div class="col-md-6 col-lg-5">
          <div class="mb-3 row">
            <label for="billnum" class="col-sm-4 col-form-label">Facture N°</label>
            <div class="col-sm-8">
              <input v-model="bill.billnum" class="form-control" id="billnum" />
            </div>
          </div>
        </div>
        <div class="col-md-12 col-lg-7">
          <div class="mb-3 row">
            <label for="description" class="col-sm-4 col-form-label">Description</label>
            <div class="col-sm-8">
              <input v-model="bill.description" class="form-control" id="description" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-5">
          <div class="mb-3 row">
            <label for="date" class="col-sm-4 col-form-label">Émise le:</label>
            <div class="col-sm-8">
              <input v-model="bill.date" class="form-control" id="date" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-5">
          <div class="mb-3 row">
            <label for="client" class="col-sm-4 col-form-label">Client :</label>
            <div class="col-sm-8">
              <select
                class="form-select"
                :arialabel="bill.client.firstName + ' ' + bill.client.lastName"
                v-model="bill.client"
                id="client"
              >
                <option>Choisir</option>
                <option
                  v-for="option in clientOptions"
                  :key="option.value.idclient"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <table class="table mt-5">
        <thead>
          <tr>
            <th scope="col">Actions</th>
            <th scope="col">Prestation</th>
            <th scope="col">Quantité</th>
            <th scope="col" class="text-end">Montant U.</th>
            <th scope="col" class="text-end">Montant Total</th>
          </tr>
        </thead>
        <tbody>
          <!-- prestations -->
          <tr v-for="(prestation, index) in bill.prestations" :key="'prestation-' + index">
            <td>
              <BButton
                class="pe-0"
                icon-left="circle-plus"
                variant="white text-success border-0"
                v-if="index === bill.prestations.length - 1"
                @click="onAdd"
                ><span class="sr-only">Ajouter</span></BButton
              >
              <BButton
                class="pe-0"
                icon-left="trash"
                variant="white text-danger border-0"
                :disabled="bill.prestations.length === 1"
                @click="onDeletePrestation(index)"
                ><span class="sr-only">Supprimer</span></BButton
              >
            </td>
            <td>
              <input v-model="prestation.description" class="form-control" />
            </td>
            <td>
              <input min="1" type="number" v-model="prestation.qty" class="form-control" />
            </td>
            <td><input v-model="prestation.price" class="form-control text-end" /></td>
            <td>
              <input
                :value="prestation.qty * prestation.price"
                disabled
                class="form-control text-end"
              />
            </td>
          </tr>
          <!-- ./prestations -->
          <!-- totaux -->
          <tr>
            <td colspan="4" class="text-end border-0 pt-3 pb-1">
              <label for="discount" class="form-label pt-1">Remises</label>
            </td>
            <td class="text-end border-0 pt-3 pb-1">
              <input
                class="form-control text-end"
                type="number"
                v-model.number="bill.discount"
                id="discount"
              />
            </td>
          </tr>

          <tr>
            <td colspan="4" class="text-end border-0 pt-3 pb-1">
              <label for="totalHT" class="form-label pt-1">Total HT</label>
            </td>
            <td class="text-end border-0 pt-3 pb-1">
              <input class="form-control text-end" type="number" id="totalHT" :value="totalHT" />
            </td>
          </tr>
          <tr>
            <td colspan="4" class="text-end border-0 pt-3 pb-1">
              <label for="totalTVA" class="form-label pt-1">TVA ({{ bill.tva }}%)</label>
            </td>
            <td class="text-end border-0 pt-3 pb-1">
              <input
                class="form-control text-end"
                type="number"
                id="totalTVA"
                readonly
                :value="totalTVA"
              />
            </td>
          </tr>
          <tr>
            <td colspan="4" class="text-end border-0 pt-3 pb-1">
              <label for="totalTTC" class="form-label pt-1">Montant total TTC</label>
            </td>
            <td class="text-end border-0 pt-3 pb-1">
              <input
                class="form-control text-end"
                type="number"
                id="totalTTC"
                readonly
                :value="totalTTC"
              />
            </td>
          </tr>
          <tr>
            <td colspan="4" class="text-end border-0 pt-3 pb-1">
              <label for="paid" class="form-label pt-1">Acompte déjà payé</label>
            </td>
            <td class="text-end border-0 pt-3 pb-1">
              <input
                class="form-control text-end"
                type="number"
                v-model.number="bill.paid"
                id="paid"
              />
            </td>
          </tr>
          <tr>
            <td colspan="4" class="text-end border-0 py-1">
              <label for="totalRestDue" class="form-label pt-1">Reste Dû TTC</label>
            </td>
            <td class="text-end border-0 py-1">
              <input
                class="form-control text-end bg-secondary-subtle fw-bold"
                readonly
                type="number"
                id="totalRestDue"
                :value="totalRestDue"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="row">
        <div class="col">
          <div class="form-check my-3">
            <input class="form-check-input" type="checkbox" v-model="debug" id="debug" />
            <label class="form-check-label" for="debug"> Debug </label>
          </div>
        </div>
        <div class="col text-end">
          <b-button @click="saveBill()" icon-right="fas fa-floppy-disk">
            {{ isNewBill ? 'Enregistrer' : 'Modifier' }}
          </b-button>
        </div>
      </div>
    </section>

    <pre class="card p-2" v-if="debug">
      {{ bill }}
    </pre>
  </div>
</template>

<script>
import { clientOptions } from '../libs/clientOptions.js'
import prestationInterface from '../interfaces/prestationInterface'
import { mapWritableState, mapActions } from 'pinia'
import { useBillStore } from '../stores/bill'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      debug: false,
      clientOptions
    }
  },
  mounted() {
    if (this.isNewBill) {
      this.createBill()
    } else {
      this.getBill(this.id)
    }
  },
  methods: {
    ...mapActions(useBillStore, ['getBill', 'saveBill', 'createBill', 'deleteBill']),
    onDeletePrestation(index) {
      this.bill.prestations.splice(index, 1)
    },
    onAdd() {
      this.bill.prestations.push({ ...prestationInterface })
    }
  },
  computed: {
    // est-ce une nouvelle facture ? ou est-on en train de modifier une facture enregistrée ?
    ...mapWritableState(useBillStore, ['bill']),
    isNewBill() {
      return !this.id || this.id < 0
    },
    totalHT() {
      let total = 0
      if (this.bill.prestations && this.bill.prestations.length) {
        for (const prestation of this.bill.prestations) {
          total += prestation.qty * prestation.price
          total -= this.bill.discount
        }
      }
      return total
    },
    totalTVA() {
      return (this.totalHT * this.bill.tva) / 100
    },
    totalTTC() {
      return this.totalHT + this.totalTVA
    },
    totalRestDue() {
      return this.totalTTC - this.bill.paid
    }
  }
}
</script>
