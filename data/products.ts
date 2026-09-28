export type ProductCategory = 'Coffee' | 'Espresso' | 'Filter' | 'Decaf' | 'Cups' | 'Thermal Mugs' | 'Accessories';

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  details: string;
  origin: string;
  notes: string;
  image: string;
  tag: string;
  featured?: boolean;
};

export const products: Product[] = [
  { id: 'house-espresso', name: 'House Espresso', category: 'Espresso', price: 18, description: 'Milk chocolate, toasted almond, orange peel.', details: 'A generous, all-weather espresso with a syrupy body and a clean citrus finish.', origin: 'Brazil · Colombia', notes: 'Chocolate · Almond · Orange', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=85', tag: 'Bestseller', featured: true },
  { id: 'ethiopia-guji', name: 'Ethiopia Guji', category: 'Filter', price: 22, description: 'Jasmine, peach, bergamot and honey.', details: 'An expressive washed coffee with a lifted floral aroma and a soft, tea-like finish.', origin: 'Guji, Ethiopia', notes: 'Jasmine · Peach · Honey', image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=85', tag: 'Bright', featured: true },
  { id: 'colombia-huila', name: 'Colombia Huila', category: 'Filter', price: 21, description: 'Red apple, cacao, panela sweetness.', details: 'A balanced daily filter coffee with a silky texture and deep caramel sweetness.', origin: 'Huila, Colombia', notes: 'Apple · Cacao · Panela', image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=85', tag: 'New', featured: true },
  { id: 'morning-blend', name: 'Morning Blend', category: 'Coffee', price: 17, description: 'Caramel, hazelnut and a soft finish.', details: 'A warm and easy blend designed for a first cup, a second cup and everything after.', origin: 'Brazil · Colombia', notes: 'Caramel · Hazelnut · Toffee', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=85', tag: 'Everyday', featured: true },
  { id: 'decaf-colombia', name: 'Decaf Colombia', category: 'Decaf', price: 20, description: 'Cocoa, raisin and gentle brown sugar.', details: 'All the comfort, none of the caffeine. Swiss Water processed for a clear, sweet cup.', origin: 'Huila, Colombia', notes: 'Cocoa · Raisin · Brown sugar', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85', tag: 'No caffeine' },
  { id: 'signature-cup', name: 'Signature Ceramic Cup', category: 'Cups', price: 26, description: 'Hand-finished stoneware, 350ml.', details: 'A considered everyday cup with a comfortable handle and a softly irregular glaze.', origin: 'Made in Portugal', notes: 'Stoneware · 350ml · Oat', image: 'https://images.unsplash.com/photo-1572119865084-43c285814d63?auto=format&fit=crop&w=900&q=85', tag: 'Handmade' },
  { id: 'espresso-cup', name: 'Espresso Cup', category: 'Cups', price: 18, description: 'Small format, thick walls, 90ml.', details: 'A compact stoneware cup made to keep a short coffee warm and full of aroma.', origin: 'Made in Portugal', notes: 'Stoneware · 90ml · Ink', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=900&q=85', tag: 'New' },
  { id: 'thermal-mug', name: 'Matte Black Thermal Mug', category: 'Thermal Mugs', price: 34, description: 'Double-wall steel, built for the commute.', details: 'A leak-resistant, powder-coated travel mug that keeps coffee warm without shouting about it.', origin: 'Stainless steel', notes: '355ml · Matte black', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85', tag: 'On the go' },
  { id: 'cream-tumbler', name: 'Cream Travel Tumbler', category: 'Thermal Mugs', price: 36, description: 'A calm companion for the long way around.', details: 'Double-wall insulation and a soft-touch finish in our signature warm cream.', origin: 'Stainless steel', notes: '355ml · Warm cream', image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=900&q=85', tag: 'On the go' },
  { id: 'brew-kit', name: 'Morning Brew Kit', category: 'Accessories', price: 42, description: 'Dripper, filters and a little room to experiment.', details: 'Everything needed for a slow, bright pour-over ritual, packed in a reusable cotton pouch.', origin: 'Ceramic · paper · cotton', notes: 'V60 dripper · 40 filters', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=85', tag: 'Giftable' },
];
