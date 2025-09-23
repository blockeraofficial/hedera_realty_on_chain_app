// WalletInterface documentation (not enforced in JS)
//
// Each wallet should implement these methods:
//
// - executeContractFunction(contractId, functionName, functionParameters, gasLimit)
// - disconnect()
// - transferHBAR(toAddress, amount)
// - transferFungibleToken(toAddress, tokenId, amount)
// - transferNonFungibleToken(toAddress, tokenId, serialNumber)
// - associateToken(tokenId)
//
// All functions should return either a TransactionId, a string, or null.

export const WalletInterface = {};
