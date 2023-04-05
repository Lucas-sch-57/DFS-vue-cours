<template>
  <div class="home">
    <!-- titre + bouton -->
    <div class="d-flex align-items-baseline justify-content-between border-bottom mb-4">
      <h1 class="mb-4"><i class="fas fa-angle-down me-2" />Accueil</h1>
      <BButton size="sm" iconLeft="circle-plus" :to="{ name: 'bill', params: { id: -1 } }">
        Ajouter une facture
      </BButton>
      <BButton variant="danger" iconLeft="house"> Test </BButton>
    </div>
    <!-- ./titre + bouton -->

    <p v-if="!bills || !bills.length" class="text-primary my-5">Aucune facture pour l'instant.</p>
    <!-- tableau des factures -->
    <!-- <BillList>
      <template #head>
        <tr>
          <th>simple entete</th>
        </tr>
      </template>
      <tr>
        <td>simple cellule</td>
      </tr>
    </BillList> -->

    <BillList v-else>
      <BillListItem
        v-for="bill in bills"
        :key="bill.id"
        :bill="bill"
        @onDeleteBill="deleteBill($event)"
        @onEditBill="editBill($event)"
      />
    </BillList>
    <p class="text-center text-muted">
      {{ totalBills }} facture<span v-if="totalBills > 1">s</span>
    </p>

    <!-- ./tableau des factures -->
  </div>
</template>

<script>
import BillList from '@/components/BillList.vue'
import BillListItem from '@/components/BillListItem.vue'
import BButton from '../components/BButton.vue'
import { useBillStore } from '../stores/bill'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    BillList,
    BillListItem,
    BButton
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(useBillStore, ['bills', ['totalBills']])
  },
  methods: {
    // méthode appelée lorsque le composant enfant envoie
    // l'évémenent onDeleteBill

    // méthode appelée lorsque le composant enfant envoie
    // l'évémenent onEditBill
    ...mapActions(useBillStore, ['deleteBill']),
    editBill(id) {
      console.log('edit bill with id : ', id)
      this.$router.push({
        name: 'bill',
        params: { id }
      })
    }
  }
}
</script>
