import { useState } from "react"
import { TransactionPendingContext } from "@Helpers/context"

/**
 * Creating provider with default state
 * - holds the state for the message used everywhere in the App
 * - takes children parameter because it needs to render the children of the context
 * - updateMessage can be used from any child of provider and will update the global state
 */
export const TransactionPendingProvider = ({ children }) => {
  const [pending, setPending] = useState(false)

  const updatePending = val => {
    setPending(val)
  }

  return (
    <TransactionPendingContext.Provider value={[pending, updatePending]}>
      {children}
    </TransactionPendingContext.Provider>
  )
}
