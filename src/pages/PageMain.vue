<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-slide-item
          v-for="entry in entries"
          :key="entry.id"
          @right="onEntrySlideRight($event, entry)"
          right-color="negative"
        >
          <template v-slot:right><q-icon name="delete" /></template>

          <q-item>
            <q-item-section :class="useAmountColorClass(entry.amount)" class="text-weight-bold">
              {{ entry.name }}
            </q-item-section>
            <q-item-section
              :class="useAmountColorClass(entry.amount)"
              class="text-weight-bold"
              side
            >
              {{ useCurrencify(entry.amount) }}
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">Balance:</div>
        <div :class="useAmountColorClass(balance)" class="col text-h6 text-right">
          {{ useCurrencify(balance) }}
        </div>
      </div>
      <q-form @submit="addEntry" class="row q-pb-sm q-col-gutter-sm bg-primary">
        <div class="col">
          <q-input
            v-model="addEntryForm.name"
            ref="nameRef"
            placeholder="Name"
            bg-color="white"
            outlined
            dense
          >
          </q-input>
        </div>
        <div class="col">
          <q-input
            v-model.number="addEntryForm.amount"
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
          <q-btn type="submit" color="primary" icon="add" round />
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>
/*
  imports
*/
import { ref, computed, reactive } from 'vue'
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColorClass } from 'src/use/useAmountColorClass'
import { useQuasar, uid } from 'quasar'

/*
  Use Quasar
*/

const $q = useQuasar()
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
    amount: -999,
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

/*
  Add entry
*/

const nameRef = ref(null)

const addEntryFormDefault = {
  name: '',
  amount: null,
}

const addEntryForm = reactive({
  ...addEntryFormDefault,
})

const addEntryFormReset = () => {
  Object.assign(addEntryForm, addEntryFormDefault)
  nameRef.value.focus()
}

const addEntry = () => {
  const newEntry = Object.assign({}, addEntryForm, { id: uid() })
  entries.value.push(newEntry)
  addEntryFormReset()
}

/*
  Calculate balance
*/

const balance = computed(() => {
  return entries.value.reduce((accumulator, { amount }) => {
    return accumulator + amount
  }, 0)
})

/*
  Slide items
*/

const onEntrySlideRight = ({ reset }, entry) => {
  $q.dialog({
    title: 'Delete entry',
    message: `
      Finally delete this entry?
      <div class="q-mt-md text-weight-bold ${useAmountColorClass(entry.amount)}">
        ${entry.name}
        ${useCurrencify(entry.amount)}
      </div>`,
    persistent: true,
    html: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      noCaps: true,
    },
    cancel: {
      color: 'primary',
      noCaps: true,
    },
  })
    .onOk(() => {
      deleteEntry(entry.id)
    })
    .onCancel(() => {
      reset()
    })
}

const deleteEntry = (entryId) => {
  const index = entries.value.findIndex((entry) => entry.id === entryId)
  entries.value.splice(index, 1)
}
</script>
