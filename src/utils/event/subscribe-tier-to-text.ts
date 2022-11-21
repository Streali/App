export const SubscribeTierToText = (tier: 'prime' | '1000' | '2000' | '3000') => {
  switch (tier) {
    case 'prime':
      return 'Prime';
    case '1000':
      return 'Tier 1';
    case '2000':
      return 'Tier 2';
    case '3000':
      return 'Tier 3';
    default:
      return 'Unknown Tier';
  }
};
