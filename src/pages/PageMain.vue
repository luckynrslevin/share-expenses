<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-item v-for="entry in entries" :key="entry.id">
          <q-item-section :class="useAmountColorClass(entry.amount)" class="text-weight-bold">
            {{ entry.name }}
          </q-item-section>
          <q-item-section :class="useAmountColorClass(entry.amount)" class="text-weight-bold" side>
            {{ useCurrencify(entry.amount) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-footer>
      <div class="row q-pa-sm q-col-gutter-sm">
        <div class="col">
          <q-input placeholder="Name" bg-color="white" outlined dense></q-input>
        </div>
        <div class="col">
          <q-input
            input-class="text-right"
            placeholder="Amount"
            bg-color="white"
            type="number"
            step="0.01"
            outlined
            dense
          ></q-input>
        </div>
        <div class="col-auto">
          <q-btn color="primary" icon="add" round />
        </div>
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
/*
  imports
*/
import { ref } from 'vue'
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColorClass } from 'src/use/useAmountColorClass'

/*
  entries
*/

const entries = ref([
  {
    id: '1',
    name: 'Salary',
    amount: 5000,
  },
  {
    id: '2',
    name: 'Groceries',
    amount: -99,
  },
  {
    id: '3',
    name: 'Stron',
    amount: -22.4,
  },
  {
    id: '4',
    name: 'ohne wert',
    amount: 0,
  },
])
</script>
