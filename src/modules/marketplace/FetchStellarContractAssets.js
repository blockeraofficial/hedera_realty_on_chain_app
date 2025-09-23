import axios from 'axios';

const FetchStellarContractAssets = async (stellar_api) => {
    try {
      const response = await axios.get(
        `${stellar_api}/value`
      );
      return response.data.trustlines
    } catch (error) {
      console.error("Error fetching balances:", error);
      return [];
    }
  };
  
  export default FetchStellarContractAssets;
  