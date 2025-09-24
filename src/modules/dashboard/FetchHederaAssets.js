const FetchHederaAssets = async (HEDERA_RPC_URL, accountId) => {
    try {
      const res = await fetch(`${HEDERA_RPC_URL}/accounts/${accountId}`);
      const data = await res.json();
      console.log(data)
      return data || [];
    } catch (error) {
      console.error("Error fetching balances:", error);
      return [];
    }
  };
  
export default FetchHederaAssets;
  