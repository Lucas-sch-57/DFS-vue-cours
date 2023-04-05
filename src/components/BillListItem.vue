<template>
  <tr>
    <td>{{ bill.id }}</td>
    <td>{{ bill.date }}</td>
    <td>{{ bill.description }}</td>
    <td>{{ bill.client.firstName }} {{ bill.client.lastName }} ({{ bill.client.companyName }})</td>
    <td class="text-end">{{ bill.totalHT.toFixed(2) }} € HT</td>
    <td class="text-end">{{ bill.totalTTC.toFixed(2) }} € TTC</td>
    <td class="d-flex gap-1 justify-content-end">
      <button class="btn btn-sm btn-outline-danger text-nowrap" @click="onDeleteBill()">
        <i class="fa-solid fa-trash" /> Supprimer
      </button>
      <button class="btn btn-sm btn-outline-primary ms-2 text-nowrap" @click="onEditBill()">
        <i class="fa-solid fa-pen" /> Éditer
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['bill'],
  methods: {
    onDeleteBill() {
      // on crée un événement qui est écouté dans le composant parent
      this.$emit('onDeleteBill', this.bill.id)
    },
    onEditBill() {
      // on crée un événement qui est écouté dans le composant parent
      this.$emit('onEditBill', this.bill.id)
    }
  }
}
</script>

<style lang="scss" scoped></style>
