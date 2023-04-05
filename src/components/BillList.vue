<template>
  <table class="table my-5 table-striped table-hover">
    <thead>
      <slot name="head">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Description</th>
          <th scope="col">Client</th>
          <th scope="col" class="text-end">tarif HT</th>
          <th scope="col" class="text-end">tarif TTC</th>
          <th scope="col" class="text-end">actions</th>
        </tr>
      </slot>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
