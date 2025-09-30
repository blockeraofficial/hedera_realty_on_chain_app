// useMarketPlace.js
import { useEffect, useState } from "react";
import { DamacCavalli1, DamacCavalli2, DamacCavalli3, DamacCavalli4 } from "assets/images";
import axios from "axios";

const API_HEDERA_MIRRORNODE = process.env.REACT_APP_API_HEDERA_MIRRORNODE || "";
const TARGET_TOKEN = process.env.REACT_APP_HEDERA_ASSET_CONTRACT_ID || "";

// A safe, non-null placeholder so UI can render immediately
const EMPTY_ASSET = {
  token_id: "",
  balance: 0,
  name: "—",
  type: "OPEN",
  location: "—",
  media: "",
  images: [],
  total_assets_available: "0",
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
  yearBuilt: null,
  collected: 0,
  price: 0,
};

function formatHbarFixed(tinybar) {
  const n = Number(tinybar ?? 0) / 10 ** 8;
  return n.toFixed(3);
}

const useMarketPlace = () => {
  // Generic (kept for compatibility)
  const [marketPlaceAssets, setMarketPlaceAssets] = useState([]);
  const [highlightedMarketplaceAssets, setHighlightedMarketplaceAssets] = useState(EMPTY_ASSET);

  // Hedera
  const [HederaMarketplaceAssets, setHederaMarketplaceAssets] = useState([]);
  const [highlightedHederaMarketplaceAssets, setHederaHighlightedMarketplaceAssets] = useState(EMPTY_ASSET);
  const [hederaContractAllAssets, setHederaContractAllAssets] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isError, setErrorFetching] = useState(false);

  const FetchHederaContractAllAssets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_HEDERA_MIRRORNODE);
      const tokens = res?.data?.balance?.tokens ?? [];

      const normalized = tokens.map((item) => ({
        ...item,
        type: "OPEN",
        location: "Dubai",
        media: "",
        collected: ((10000 * 10 ** 8 - Number(item?.balance ?? 0)) / 10 ** 8) / 100,
        price: 10 ** 6,
      }));

      // Prefer the target; otherwise first available; otherwise EMPTY_ASSET
      const picked =
        normalized.find((t) => String(t.token_id) === String(TARGET_TOKEN)) ??
        normalized[0] ??
        { ...EMPTY_ASSET };

      const tokenizedAssets =
        picked.token_id
          ? [
              {
                ...picked,
                name: "Cavalli Apartment 1",
                images: [DamacCavalli1, DamacCavalli2, DamacCavalli3, DamacCavalli4],
                total_assets_available: "10000",
                bedrooms: 1,
                bathrooms: 1,
                area: 86,
                yearBuilt: 2025,
              },
            ]
          : [];

      // Always keep highlighted non-null (fallback to EMPTY_ASSET)
      const highlighted = tokenizedAssets[0] ?? { ...EMPTY_ASSET };

      setHederaMarketplaceAssets(tokenizedAssets);
      setHederaHighlightedMarketplaceAssets(highlighted);
      setHederaContractAllAssets(tokenizedAssets);

      // keep the legacy mirrors in sync (optional)
      setMarketPlaceAssets(tokenizedAssets);
      setHighlightedMarketplaceAssets(highlighted);

      sessionStorage.setItem(
        "marketPlaceData2",
        JSON.stringify({
          HederaMarketplaceAssets: tokenizedAssets,
          HederaHighlightedMarketplaceAssets: highlighted,
          HederaContractAllAssets: tokenizedAssets,
        })
      );
      sessionStorage.setItem("marketPlaceTimestamp2", String(Date.now()));
    } catch (error) {
      console.log("error:", error);
      setErrorFetching(true);
      // keep safe values even on error
      setHederaMarketplaceAssets([]);
      setHederaHighlightedMarketplaceAssets({ ...EMPTY_ASSET });
      setHederaContractAllAssets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem("marketPlaceData2");
    const storedTimestamp = sessionStorage.getItem("marketPlaceTimestamp2");
    const currentTime = Date.now();

    const isFresh =
      storedData && storedTimestamp && currentTime - parseInt(storedTimestamp, 10) < 600_000;

    if (isFresh) {
      const parsed = JSON.parse(storedData);
      const a = parsed?.HederaMarketplaceAssets ?? [];
      const h = parsed?.HederaHighlightedMarketplaceAssets ?? { ...EMPTY_ASSET };
      const all = parsed?.HederaContractAllAssets ?? [];
      setHederaMarketplaceAssets(a);
      setHederaHighlightedMarketplaceAssets(h);
      setHederaContractAllAssets(all);
      setMarketPlaceAssets(a);
      setHighlightedMarketplaceAssets(h);
    } else {
      FetchHederaContractAllAssets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    isError,

    marketPlaceAssets,
    highlightedMarketplaceAssets,

    HederaMarketplaceAssets,
    highlightedHederaMarketplaceAssets,
    hederaContractAllAssets,

    formatHbarFixed,
  };
};

export { useMarketPlace };
