import jh from './liquorDataJH.json';
import tn from './liquorDataTN.json';

// ── State registry ────────────────────────────────────────────────
export const STATES = [
  { label: 'Jharkhand', value: 'jharkhand', flag: '🏛️', authority: 'JSBCL' },
  { label: 'Tamil Nadu', value: 'tamilnadu', flag: '🌴', authority: 'TASMAC' },
];

const STATE_DATA_MAP = {
  jharkhand: jh,
  tamilnadu: tn,
};

// ── Per-state flat cache ──────────────────────────────────────────
const flatCache = {};

export const getFlatProducts = (stateKey = 'jharkhand') => {
  if (flatCache[stateKey]) return flatCache[stateKey];

  const rawData = STATE_DATA_MAP[stateKey];
  if (!rawData) return [];

  const { document, manufacturers } = rawData;
  const flatList = [];
  let id = 0;

  manufacturers.forEach(manufacturer => {
    manufacturer.products.forEach(product => {
      flatList.push({
        id: `${stateKey}_${id++}`,
        brandName: manufacturer.name,
        labelName: product.label_name,
        category: normalizeCategory(product.category),
        packSize: product.pack_size,
        mrp: product.mrp,
        effectiveDate: product.effective_date,
        state: document.state,
        authority: document.authority || '',
        year: document.financial_year,
        stateKey,
      });
    });
  });

  flatCache[stateKey] = flatList;
  return flatList;
};

// ── Category normalizer ───────────────────────────────────────────
const normalizeCategory = cat => {
  if (!cat) return 'Other';
  const lower = cat.toLowerCase().trim();
  if (lower.includes('whisky') || lower.includes('whiskey')) return 'Whisky';
  if (lower.includes('beer')) return 'Beer';
  if (lower.includes('rum')) return 'Rum';
  if (lower.includes('vodka')) return 'Vodka';
  if (lower.includes('wine')) return 'Wine';
  if (lower.includes('gin')) return 'Gin';
  if (lower === 'cl') return 'CL';
  if (lower.includes('brandy') || lower.includes('cognac')) return 'Brandy';
  if (lower.includes('tequila')) return 'Tequila';
  if (lower.includes('liqueur') || lower.includes('liquor')) return 'Liqueur';
  if (lower === 'lab') return 'LAB';
  return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
};

// ── Filter + search + sort ────────────────────────────────────────
export const filterProducts = ({
  searchQuery = '',
  category = 'All',
  sortOrder = 'none',
  stateKey = 'jharkhand',
}) => {
  let products = getFlatProducts(stateKey);

  if (category && category !== 'All') {
    products = products.filter(p => p.category === category);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    products = products.filter(
      p =>
        p.brandName.toLowerCase().includes(q) ||
        p.labelName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }

  if (sortOrder === 'asc') {
    products = [...products].sort((a, b) => a.mrp - b.mrp);
  } else if (sortOrder === 'desc') {
    products = [...products].sort((a, b) => b.mrp - a.mrp);
  }

  return products;
};

// ── Variants for detail screen ────────────────────────────────────
export const getProductVariants = (brandName, labelName, stateKey = 'jharkhand') => {
  return getFlatProducts(stateKey).filter(
    p => p.brandName === brandName && p.labelName === labelName,
  );
};
