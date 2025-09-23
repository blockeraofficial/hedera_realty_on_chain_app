// Reason: We need to build HAPI contract functions params
// And we want the string contract function params that ethers expects
// This is an opportunity for the adapter pattern.

import { ContractFunctionParameters } from "@hashgraph/sdk";

export class ContractFunctionParameterBuilder {
  constructor() {
    this.params = [];
  }

  addParam(param) {
    this.params.push(param);
    return this;
  }

  // Purpose: Build the ABI function parameters
  buildAbiFunctionParams() {
    return this.params.map(param => `${param.type} ${param.name}`).join(", ");
  }

  // Purpose: Build the ethers compatible contract function call params
  buildEthersParams() {
    return this.params.map(param => param.value.toString());
  }

  // Purpose: Build the HAPI compatible contract function params
  buildHAPIParams() {
    const contractFunctionParams = new ContractFunctionParameters();
    for (const param of this.params) {
      // ensure type is alphanumeric and does not start with a number
      const alphanumericIdentifier = /^[a-zA-Z][a-zA-Z0-9]*$/;
      if (!param.type.match(alphanumericIdentifier)) {
        throw new Error(
          `Invalid type: ${param.type}. Type must only contain alphanumeric characters.`
        );
      }
      // capitalize the first letter of the type
      const type = param.type.charAt(0).toUpperCase() + param.type.slice(1);
      const functionName = `add${type}`;
      if (functionName in contractFunctionParams) {
        contractFunctionParams[functionName](param.value);
      } else {
        throw new Error(
          `Invalid type: ${param.type}. Could not find function ${functionName} in ContractFunctionParameters class.`
        );
      }
    }

    return contractFunctionParams;
  }
}
