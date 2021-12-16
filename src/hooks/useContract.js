import { useState } from 'react';
import { useContractFunction } from '@usedapp/core';

const useContract = (contract, func, transactionName) => {
    
    const [ pending, setPending ] = useState(false);

    const { state, send } = useContractFunction(contract, func, { transactionName: transactionName });
    set

    return 

}

export default useContract;