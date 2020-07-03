import { useState } from 'react'
import { useMutation } from '@redwoodjs/web'

export const QUERY = gql`
  query FIND_INVOICE_BY_ID($id: String!) {
    invoice: invoice(id: $id) {
      id
    }
  }
`

const CREATE_INVOICE_MUTATION = gql`
  mutation CreateInvoiceMutation($input: CreateInvoiceInput!) {
    createInvoice(input: $input) {
      id
    }
  }
`

export const useInvoice = () => {
  const [invoice, setInvoice] = useState(null)
  const [createInvoice, { loading, error }] = useMutation(
    CREATE_INVOICE_MUTATION,
    {
      onCompleted: (res) => {
        console.log(res)
        // setInvoice(res)
      },
    }
  )

  return {
    invoice,
    createInvoice,
    loading,
    error,
  }
}
