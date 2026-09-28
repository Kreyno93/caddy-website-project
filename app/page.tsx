'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Menu, Minus, Plus, Search, ShoppingBag, X } from 'lucide-react';
import { products, type Product, type ProductCategory } from '@/data/products';

const categories: Array<'All' | ProductCategory> = ['All', 'Coffee', 'Espresso', 'Filter', 'Decaf', 'Cups', 'Thermal Mugs', 'Accessories'];
const money = (value: number) => new Intl.NumberFormat('en-DE', { style: 'currency', currency: 'EUR' }).format(value);

type Cart = Record<string, number>;

export default function Home() {
  const [cart, setCart] = useState<Cart>(() => {
    if (typeof window === 'undefined') return {};
    const stored = window.localStorage.getItem('northline-cart');
    return stored ? JSON.parse(stored) as Cart : {};
  });
  const [drawer, setDrawer] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<(typeof categories)[number]>('All');
  const [sort, setSort] = useState('featured');
  const [selected, setSelected] = useState<Product | null>(null);
  const [checkout, setCheckout] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    window.localStorage.setItem('northline-cart', JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase();
    const list = products.filter((product) => {
      const categoryMatch = filter === 'All' || product.category === filter || (filter === 'Coffee' && ['Coffee', 'Espresso', 'Filter', 'Decaf'].includes(product.category));
      const queryMatch = `${product.name} ${product.category} ${product.description} ${product.notes}`.toLowerCase().includes(query);
      return categoryMatch && queryMatch;
    });
    if (sort === 'price-low') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') return [...list].sort((a, b) => b.price - a.price);
    if (sort === 'name') return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [filter, search, sort]);

  const cartEntries = Object.entries(cart).map(([id, quantity]) => ({ product: products.find((product) => product.id === id), quantity })).filter((entry): entry is { product: Product; quantity: number } => Boolean(entry.product));
  const itemCount = cartEntries.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotal = cartEntries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);

  function add(product: Product) {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }));
    setNotice(`${product.name} added to your bag`);
    window.setTimeout(() => setNotice(''), 2200);
  }

  function change(productId: string, amount: number) {
    setCart((current) => {
      const next = (current[productId] || 0) + amount;
      const copy = { ...current };
      if (next < 1) delete copy[productId]; else copy[productId] = next;
      return copy;
    });
  }

  function scrollTo(id: string) {
    setMobileNav(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  function goCheckout() {
    if (!itemCount) return;
    setDrawer(false);
    setCheckout(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (ordered) return <Success onHome={() => { setOrdered(false); setCheckout(false); }} />;
  if (checkout) return <Checkout subtotal={subtotal} entries={cartEntries} onSubmit={() => { setCart({}); setOrdered(true); }} onBack={() => setCheckout(false)} />;

  return <>
    <div className="topline">Free shipping on orders over €60 · Roasted fresh every Tuesday</div>
    <header className="site-header"><nav className="container nav"><button className="brand" onClick={() => scrollTo('home')}><span className="brand-mark">N</span> Northline</button><div className={`nav-links ${mobileNav ? 'open' : ''}`}><button onClick={() => scrollTo('shop')}>Shop</button><button onClick={() => scrollTo('coffee')}>Coffee</button><button onClick={() => scrollTo('objects')}>Cups &amp; mugs</button><button onClick={() => scrollTo('story')}>Our story</button><button onClick={() => scrollTo('journal')}>Journal</button></div><div className="nav-actions"><button className="icon-label" onClick={() => setSearchOpen(true)}><Search size={16} /> <span>Search</span></button><button className="icon-label" onClick={() => setDrawer(true)}><ShoppingBag size={16} /> <span>Bag</span><b className="count">{itemCount}</b></button><button className="menu-button" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle navigation">{mobileNav ? <X /> : <Menu />}</button></div></nav></header>
    <main id="home">
      <section className="hero"><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow">Small batch · big feeling</div><h1>Coffee worth slowing down for.</h1><p>Specialty coffee, thoughtfully roasted and made for everyday rituals. Find your next favourite cup.</p><div className="button-row"><button className="button" onClick={() => scrollTo('shop')}>Shop coffee <ArrowUpRight size={17} /></button><button className="button ghost" onClick={() => scrollTo('story')}>Our story <ArrowUpRight size={17} /></button></div></div><div className="hero-visual"><div className="hero-image" /><div className="hero-stamp">ROASTED<br />WITH<br />PATIENCE</div></div></div></section>
      <div className="marquee">Traceable lots <b>✳</b> Roasted in Hamburg <b>✳</b> Free shipping over €60 <b>✳</b> Traceable lots <b>✳</b> Roasted in Hamburg</div>
      <section className="section paper" id="featured"><div className="container"><SectionHeading eyebrow="The good stuff" title={<>Meet your new<br />morning people.</>} action="View all products" onAction={() => scrollTo('shop')} /><div className="product-grid">{products.filter((product) => product.featured).map((product) => <ProductCard key={product.id} product={product} onAdd={add} onOpen={setSelected} />)}</div></div></section>
      <section className="section coffee" id="coffee"><div className="container split"><div className="section-image coffee-image" /><div className="section-copy"><div className="eyebrow">The coffee collection</div><h2>Bright, balanced,<br />never boring.</h2><p>From floral single origins to rich chocolate-forward espresso blends, every coffee is selected for clarity, sweetness and the small details that make a cup memorable.</p><div className="category-list">{['All coffee', 'Espresso', 'Filter coffee', 'Decaf'].map((label) => <button key={label} onClick={() => { setFilter(label === 'All coffee' ? 'Coffee' : label === 'Filter coffee' ? 'Filter' : label as ProductCategory); scrollTo('shop'); }}>{label}<ArrowUpRight size={17} /></button>)}</div></div></div></section>
      <section className="section dark" id="objects"><div className="container"><div className="eyebrow">A daily practice</div><h2>Make room for<br />the little things.</h2><div className="steps">{[['01', 'Choose your beans', 'Follow the flavour, not the crowd.'], ['02', 'Grind fresh', 'Let the aroma set the pace.'], ['03', 'Brew slowly', 'There is no good reason to rush.'], ['04', 'Enjoy the pause', 'The best part is being there.']].map(([number, title, copy]) => <div className="step" key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>
      <section className="section sage" id="story"><div className="container split"><div className="section-image story-image" /><div className="section-copy"><div className="eyebrow">Our story</div><h2>Good coffee<br />is a ritual.</h2><p>Northline began with a simple question: what if the everyday cup felt like a place to return to? We work closely with producers, roast in small batches and make objects that reward a slower morning.</p><p>Thoughtful sourcing. Precise roasting. A little more care in the details.</p><button className="button ghost" onClick={() => scrollTo('journal')}>Read our journal <ArrowUpRight size={17} /></button></div></div></section>
      <section className="section newsletter" id="journal"><div className="container narrow"><div className="eyebrow">The Northline journal</div><h2>Stay close to the roast.</h2><p>New coffees, field notes and slow recipes. Just enough to make the inbox feel human.</p><form onSubmit={(event) => { event.preventDefault(); setNotice('You are on the list'); window.setTimeout(() => setNotice(''), 2200); event.currentTarget.reset(); }}><input aria-label="Email address" type="email" placeholder="Your email address" required /><button className="button">Subscribe <ArrowUpRight size={17} /></button></form></div></section>
    </main>
    <Footer onShop={() => scrollTo('shop')} />
    <ShopSection filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} sort={sort} setSort={setSort} products={filteredProducts} onAdd={add} onOpen={setSelected} />
    {drawer && <CartDrawer entries={cartEntries} subtotal={subtotal} onClose={() => setDrawer(false)} onChange={change} onCheckout={goCheckout} />}
    {searchOpen && <SearchModal search={search} setSearch={setSearch} onClose={() => setSearchOpen(false)} onOpen={(product) => { setSearchOpen(false); setSelected(product); }} />}
    {selected && <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={() => { add(selected); setSelected(null); }} />}
    {notice && <div className="toast">{notice}</div>}
  </>;
}

function SectionHeading({ eyebrow, title, action, onAction }: { eyebrow: string; title: React.ReactNode; action: string; onAction: () => void }) { return <div className="section-heading"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2></div><button className="text-link" onClick={onAction}>{action} <ArrowUpRight size={15} /></button></div>; }
function ProductCard({ product, onAdd, onOpen }: { product: Product; onAdd: (product: Product) => void; onOpen: (product: Product) => void }) { return <article className="product-card"><button className="product-photo" onClick={() => onOpen(product)} style={{ backgroundImage: `url(${product.image})` }} aria-label={`View ${product.name}`}><span>{product.tag}</span></button><button className="product-name" onClick={() => onOpen(product)}>{product.name}</button><p>{product.description}</p><div className="product-foot"><strong>{money(product.price)}</strong><button className="quick-add" onClick={() => onAdd(product)}>Add <Plus size={14} /></button></div></article>; }
function ShopSection({ filter, setFilter, search, setSearch, sort, setSort, products: visible, onAdd, onOpen }: { filter: string; setFilter: (filter: (typeof categories)[number]) => void; search: string; setSearch: (search: string) => void; sort: string; setSort: (sort: string) => void; products: Product[]; onAdd: (product: Product) => void; onOpen: (product: Product) => void }) { return <section className="shop-section" id="shop"><div className="container"><div className="shop-header"><div><div className="eyebrow">The full collection</div><h2>Shop the ritual.</h2></div><div className="shop-tools"><label className="search-field"><Search size={15} /><input aria-label="Search products" placeholder="Search products" value={search} onChange={(event) => setSearch(event.target.value)} /></label><select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></div></div><div className="filters">{categories.map((category) => <button className={filter === category ? 'active' : ''} key={category} onClick={() => setFilter(category)}>{category}</button>)}</div><div className="product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} onOpen={onOpen} />)}</div></div></section>; }
function CartDrawer({ entries, subtotal, onClose, onChange, onCheckout }: { entries: Array<{ product: Product; quantity: number }>; subtotal: number; onClose: () => void; onChange: (id: string, amount: number) => void; onCheckout: () => void }) { return <><div className="backdrop" onClick={onClose} /><aside className="drawer"><div className="drawer-head"><h2>Your bag</h2><button onClick={onClose} aria-label="Close cart"><X /></button></div>{entries.length ? entries.map(({ product, quantity }) => <div className="cart-row" key={product.id}><div className="cart-thumb" style={{ backgroundImage: `url(${product.image})` }} /><div><h3>{product.name}</h3><p>{money(product.price)} · {money(product.price * quantity)}</p><div className="quantity"><button onClick={() => onChange(product.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{quantity}</span><button onClick={() => onChange(product.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div></div>) : <p className="empty">Your bag is waiting for something good.</p>}<div className="drawer-summary"><strong><span>Subtotal</span>{money(subtotal)}</strong><p>This is a front-end demonstration. Shipping is calculated at checkout.</p><button className="button" onClick={onCheckout}>Continue to checkout <ArrowUpRight size={17} /></button></div></aside></>; }
function ProductModal({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: () => void }) { return <><div className="backdrop" onClick={onClose} /><div className="product-modal"><button className="modal-close" onClick={onClose} aria-label="Close product details"><X /></button><div className="modal-image" style={{ backgroundImage: `url(${product.image})` }} /><div className="modal-copy"><div className="eyebrow">{product.category}</div><h2>{product.name}</h2><strong>{money(product.price)}</strong><p>{product.details}</p><dl><div><dt>Origin / material</dt><dd>{product.origin}</dd></div><div><dt>Notes</dt><dd>{product.notes}</dd></div><div><dt>Availability</dt><dd>In stock</dd></div></dl><button className="button" onClick={onAdd}>Add to bag <ArrowUpRight size={17} /></button></div></div></>; }
function SearchModal({ search, setSearch, onClose, onOpen }: { search: string; setSearch: (value: string) => void; onClose: () => void; onOpen: (product: Product) => void }) { const matches = products.filter((product) => `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(search.toLowerCase())).slice(0, 5); return <><div className="backdrop" onClick={onClose} /><div className="search-modal"><button className="modal-close" onClick={onClose} aria-label="Close search"><X /></button><div className="eyebrow">Find your next cup</div><h2>Search Northline.</h2><input autoFocus aria-label="Search the collection" placeholder="Coffee, mug, Ethiopia..." value={search} onChange={(event) => setSearch(event.target.value)} />{matches.map((product) => <button className="search-result" key={product.id} onClick={() => onOpen(product)}><span style={{ backgroundImage: `url(${product.image})` }} /><span><b>{product.name}</b><small>{product.category} · {money(product.price)}</small></span></button>)}</div></>; }
function Checkout({ subtotal, entries, onSubmit, onBack }: { subtotal: number; entries: Array<{ product: Product; quantity: number }>; onSubmit: () => void; onBack: () => void }) { return <main className="checkout-page"><div className="container"><button className="text-link" onClick={onBack}>← Back to shop</button><div className="eyebrow">Demonstration checkout</div><h1>Almost yours.</h1><div className="checkout-grid"><form className="checkout-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}><h2>Your details</h2><div className="form-grid">{['First name', 'Last name', 'Email', 'Address', 'City', 'Postcode'].map((label) => <label key={label}>{label}<input required type={label === 'Email' ? 'email' : 'text'} /></label>)}</div><h2>Payment</h2><p className="demo-copy">This is a demo checkout. No payment is collected and no information is sent anywhere.</p><label>Demo card number<input required placeholder="4242 4242 4242 4242" /></label><button className="button">Place demo order <ArrowUpRight size={17} /></button></form><aside className="order-summary"><h2>Your order</h2>{entries.map(({ product, quantity }) => <p key={product.id}><span>{product.name} × {quantity}</span><span>{money(product.price * quantity)}</span></p>)}<p className="total"><span>Total</span><span>{money(subtotal + 4.9)}</span></p></aside></div></div></main>; }
function Success({ onHome }: { onHome: () => void }) { return <main className="success-page"><div className="eyebrow">Demo order complete</div><h1>Thank you for your order.</h1><p>This was a demonstration checkout, so no payment was processed and no personal information was saved.</p><button className="button" onClick={onHome}>Return home <ArrowUpRight size={17} /></button></main>; }
function Footer({ onShop }: { onShop: () => void }) { return <footer><div className="container footer-grid"><div><div className="brand"><span className="brand-mark">N</span> Northline</div><p>Specialty coffee and considered objects for people who like to linger.</p></div><div><b>Shop</b><button onClick={onShop}>Coffee</button><button onClick={onShop}>Cups &amp; mugs</button><button onClick={onShop}>Accessories</button></div><div><b>About</b><button>Our story</button><button>Journal</button><a href="mailto:hello@northline.coffee">Contact</a></div><div><b>Follow along</b><button>Instagram ↗</button><button>Newsletter</button><button>Stockists</button></div></div><div className="container footer-bottom">© 2026 Northline Coffee Co. <span>Privacy · Terms · Made for slow mornings.</span></div></footer>; }
