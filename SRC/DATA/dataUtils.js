import rawData from './liquorDataJH.json';

// Flatten nested manufacturers -> products into a single array
let _flatProducts = null;

export const getFlatProducts = () => {
  if (_flatProducts) return _flatProducts;

  const { document, manufacturers } = rawData;
  const flatList = [];
  let id = 0;

  manufacturers.forEach(manufacturer => {
    manufacturer.products.forEach(product => {
      flatList.push({
        id: String(id++),
        brandName: manufacturer.name,
        labelName: product.label_name,
        category: normalizeCategory(product.category),
        packSize: product.pack_size,
        mrp: product.mrp,
        effectiveDate: product.effective_date,
        state: document.state,
        year: document.financial_year,
      });
    });
  });

  _flatProducts = flatList;
  return flatList;
};

// Normalize category casing for consistent filtering
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
  if (lower.includes('brandy')) return 'Brandy';
  if (lower === 'lab') return 'LAB';
  return capitalizeFirst(cat);
};

const capitalizeFirst = str =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// Get all unique categories
export const getCategories = () => {
  const products = getFlatProducts();
  const cats = new Set(products.map(p => p.category));
  return ['All', ...Array.from(cats).sort()];
};

// Filter + search + sort products
export const filterProducts = ({ searchQuery = '', category = 'All', sortOrder = 'none' }) => {
  let products = getFlatProducts();

  // Category filter
  if (category && category !== 'All') {
    products = products.filter(p => p.category === category);
  }

  // Search filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    products = products.filter(
      p =>
        p.brandName.toLowerCase().includes(q) ||
        p.labelName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }

  // Sort
  if (sortOrder === 'asc') {
    products = [...products].sort((a, b) => a.mrp - b.mrp);
  } else if (sortOrder === 'desc') {
    products = [...products].sort((a, b) => b.mrp - a.mrp);
  }

  return products;
};

// Get all pack sizes for a given label + brandName (for detail screen)
export const getProductVariants = (brandName, labelName) => {
  const products = getFlatProducts();
  return products.filter(
    p => p.brandName === brandName && p.labelName === labelName,
  );
};
