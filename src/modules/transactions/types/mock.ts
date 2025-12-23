const mock = [
  {
    date: '2025-12-19',
    title: 'Honest Ubuntu',
    amount: '23.50'
  },
  {
    date: '2025-12-14',
    title: 'Drogasil2776',
    amount: '89.20'
  },
  {
    date: '2025-12-14',
    title: 'Munhozmultimarcas',
    amount: '16.00'
  },
  {
    date: '2025-12-13',
    title: 'Claro Flex',
    amount: '39.99'
  },
  {
    date: '2025-12-11',
    title: 'Conta Vivo',
    amount: '156.00'
  },
  {
    date: '2025-12-09',
    title: 'Centauro Ce220',
    amount: '109.98'
  },
  {
    date: '2025-12-09',
    title: 'Shopee *Lupakids',
    amount: '113.36'
  },
  {
    date: '2025-12-09',
    title: 'Amazonmktplc*Inoxshopc',
    amount: '19.00'
  },
  {
    date: '2025-12-09',
    title: 'Park Place',
    amount: '22.00'
  },
  {
    date: '2025-12-08',
    title: 'Leroy Merlin',
    amount: '126.45'
  },
  {
    date: '2025-12-08',
    title: 'Ubuntuhomemarket',
    amount: '11.00'
  },
  {
    date: '2025-12-07',
    title: 'Wet N Wild Sao Paulo',
    amount: '18.00'
  },
  {
    date: '2025-12-07',
    title: 'Tkt360*X8ae',
    amount: '422.47'
  },
  {
    date: '2025-12-07',
    title: 'Auto Ban Jundiai',
    amount: '13.70'
  },
  {
    date: '2025-12-07',
    title: 'Drogasil2776',
    amount: '31.95'
  },
  {
    date: '2025-12-07',
    title: 'Wet N Wild Sao Paulo',
    amount: '44.90'
  },
  {
    date: '2025-12-07',
    title: 'Burger King',
    amount: '104.80'
  },
  {
    date: '2025-12-07',
    title: 'Auto Ban Jundiai',
    amount: '13.70'
  },
  {
    date: '2025-12-06',
    title: 'Pagamento recebido',
    amount: '-408.00'
  },
  {
    date: '2025-12-01',
    title: 'Pagamento recebido',
    amount: '-344.33'
  },
  {
    date: '2025-12-01',
    title: 'Ubuntuhomemarket',
    amount: '8.00'
  },
  {
    date: '2025-12-01',
    title: 'Shopee *Meufestore',
    amount: '29.99'
  },
  {
    date: '2025-12-01',
    title: 'Ubuntuhomemarket',
    amount: '14.50'
  },
  {
    date: '2025-11-30',
    title: 'Fernandalina',
    amount: '80.00'
  },
  {
    date: '2025-11-29',
    title: 'Drogasil2776',
    amount: '52.89'
  },
  {
    date: '2025-11-29',
    title: 'Gelateria Della Vitta',
    amount: '21.53'
  },
  {
    date: '2025-11-29',
    title: 'Munhozmultimarcas',
    amount: '22.00'
  },
  {
    date: '2025-11-28',
    title: 'Casasbahiacom - Parcela 5/5',
    amount: '115.80'
  }
];

export const getData = () => {
  return mock.map((item, index) => ({ ...item, id: String(index + 1) }));
};
