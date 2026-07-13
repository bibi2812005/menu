import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Banknote,
  Check,
  CheckCircle2,
  ChefHat,
  Clock3,
  Croissant,
  MapPin,
  Minus,
  PackageCheck,
  Phone,
  Plus,
  Salad,
  Sandwich,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  Truck,
  UtensilsCrossed,
  X,
} from 'lucide-react'
import './App.css'

const categories = [
  { id: 'all', label: 'Tất cả' },
  { id: 'combo', label: 'Set combo' },
  { id: 'savory', label: 'Món mặn' },
  { id: 'sides', label: 'Rau & ăn kèm' },
]

const products = [
  { id: 'classic', name: 'Classic', price: 30000, category: 'combo', badge: 'Bán chạy', tone: 'cream', image: '/assets/products/classic.png', description: 'Xúc xích dài, phô mai, trứng rán, salad và cà chua.' },
  { id: 'bacon', name: 'Bacon', price: 40000, category: 'combo', badge: 'Được yêu thích', tone: 'orange', image: '/assets/products/bacon.png', description: 'Bacon, trứng rán, xúc xích lát, salad và cà chua.' },
  { id: 'jambon', name: 'Jambon', price: 45000, category: 'combo', tone: 'rose', image: '/assets/products/jambon.png', description: 'Jambon, phô mai, trứng rán, salad và cà chua.' },
  { id: 'steak', name: 'Steak', price: 65000, category: 'combo', badge: 'Đặc biệt', tone: 'brown', image: '/assets/products/steak.png', description: 'Steak, trứng ốp la, măng tây, salad và cà chua.' },
  { id: 'fruitscoo', name: 'Fruitscoo', price: 45000, category: 'combo', tone: 'green', image: '/assets/products/fruitscoo.png', description: 'Croissant cùng trái cây tươi thay đổi theo mùa.' },
  { id: 'hawai', name: 'Hawai', price: 50000, category: 'combo', tone: 'yellow', image: '/assets/products/hawai.png', description: 'Tôm, xúc xích, trứng bông, ô liu, thơm và salad.' },
  { id: 'seafood', name: 'Seafood', price: 60000, category: 'combo', badge: 'Mới', tone: 'blue', image: '/assets/products/seafood.png', description: 'Tôm, trứng bông, phô mai, salad và cà chua.' },
  { id: 'shrimp', name: 'Tôm', price: 20000, category: 'savory', tone: 'orange', description: 'Tôm tươi áp chảo, thêm vào món theo sở thích.' },
  { id: 'salmon', name: 'Cá hồi', price: 65000, category: 'savory', tone: 'rose', image: '/assets/products/salmon.png', description: 'Cá hồi mềm ẩm, giàu đạm cho một bữa no lâu.' },
  { id: 'honey-chicken', name: 'Gà sốt mật ong', price: 25000, category: 'savory', badge: 'Dễ ăn', tone: 'yellow', description: 'Gà mềm phủ sốt mật ong ngọt dịu.' },
  { id: 'pepper-chicken', name: 'Gà sốt tiêu đen', price: 25000, category: 'savory', tone: 'brown', description: 'Gà sốt tiêu đen thơm ấm, vị đậm vừa.' },
  { id: 'bacon-extra', name: 'Thịt bacon', price: 30000, category: 'savory', tone: 'rose', description: 'Bacon xông khói áp chảo giòn cạnh.' },
  { id: 'jambon-extra', name: 'Thịt jambon', price: 30000, category: 'savory', tone: 'cream', description: 'Jambon cắt lát, vị mặn nhẹ và mềm.' },
  { id: 'honey-beef', name: 'Bò sốt mật ong', price: 89000, category: 'savory', badge: 'Premium', tone: 'orange', description: 'Thịt bò mềm cùng sốt mật ong cân bằng.' },
  { id: 'pepper-beef', name: 'Bò sốt tiêu đen', price: 89000, category: 'savory', tone: 'brown', description: 'Bò áp chảo với sốt tiêu đen đậm đà.' },
  { id: 'salad', name: 'Salad xanh', price: 5000, category: 'sides', tone: 'green', description: 'Rau xà lách tươi giòn mỗi ngày.' },
  { id: 'tomato', name: 'Cà chua lát', price: 5000, category: 'sides', tone: 'rose', description: 'Cà chua tươi cắt lát, vị chua ngọt nhẹ.' },
  { id: 'olive', name: 'Ô liu', price: 10000, category: 'sides', tone: 'green', description: 'Ô liu cắt lát, thơm và mằn mặn.' },
  { id: 'avocado', name: 'Bơ', price: 15000, category: 'sides', badge: 'Tươi mỗi ngày', tone: 'green', description: 'Bơ chín béo mịn, lượng dùng vừa đủ.' },
  { id: 'asparagus', name: 'Măng tây', price: 10000, category: 'sides', tone: 'green', description: 'Măng tây áp chảo giữ độ giòn.' },
  { id: 'mushroom', name: 'Nấm xào', price: 8000, category: 'sides', tone: 'brown', description: 'Nấm xào thơm, mềm mọng và vừa vị.' },
  { id: 'seaweed', name: 'Rong biển', price: 10000, category: 'sides', tone: 'blue', description: 'Rong biển giòn nhẹ, tăng vị umami.' },
]

const categoryNames = Object.fromEntries(categories.map((item) => [item.id, item.label]))
const formatMoney = (value) => new Intl.NumberFormat('vi-VN').format(value) + 'đ'
const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')
const getIngredients = (product) => product.description.replace(/\.$/, '').split(',').map((item) => item.trim())
const getPreparationTime = (product) => product.category === 'sides' ? '5–10 phút' : product.category === 'savory' ? '10–15 phút' : '15–20 phút'

function ProductVisual({ product }) {
  const Icon = product.category === 'sides' ? Salad : product.category === 'savory' ? UtensilsCrossed : Sandwich
  if (product.image) {
    return (
      <div className={`product-visual product-photo ${product.imageWide ? 'wide-artwork' : ''}`}>
        <img src={product.image} alt={`Hình món ${product.name} từ thiết kế Machiico`} loading="lazy" />
      </div>
    )
  }
  return (
    <div className={`product-visual tone-${product.tone}`} aria-hidden="true">
      <span className="visual-ring" />
      <Icon size={40} strokeWidth={1.45} />
      <span className="visual-label">ảnh đang cập nhật</span>
    </div>
  )
}

function QuantityControl({ quantity, onDecrease, onIncrease, compact = false }) {
  return (
    <div className={`quantity-control ${compact ? 'compact' : ''}`} aria-label="Chọn số lượng">
      <button type="button" onClick={onDecrease} aria-label="Giảm số lượng"><Minus size={15} /></button>
      <strong aria-live="polite">{quantity}</strong>
      <button type="button" onClick={onIncrease} aria-label="Tăng số lượng"><Plus size={15} /></button>
    </div>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('machiico-cart')) || {} } catch { return {} }
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [toast, setToast] = useState('')
  const [order, setOrder] = useState(null)

  useEffect(() => {
    localStorage.setItem('machiico-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', cartOpen || checkoutOpen || Boolean(selectedProduct))
    return () => document.body.classList.remove('no-scroll')
  }, [cartOpen, checkoutOpen, selectedProduct])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape') {
        setCartOpen(false)
        setCheckoutOpen(false)
        setSelectedProduct(null)
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  const filteredProducts = useMemo(() => {
    const term = normalize(query.trim())
    return products.filter((product) => {
      const inCategory = activeCategory === 'all' || product.category === activeCategory
      const matches = !term || normalize(`${product.name} ${product.description}`).includes(term)
      return inCategory && matches
    })
  }, [activeCategory, query])

  const cartItems = useMemo(() => products
    .filter((product) => cart[product.id])
    .map((product) => ({ ...product, quantity: cart[product.id] })), [cart])
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal === 0 || subtotal >= 150000 ? 0 : 15000
  const total = subtotal + shipping

  const addToCart = (product) => {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }))
    setToast(`Đã thêm ${product.name} vào giỏ`)
  }

  const changeQuantity = (id, delta) => {
    setCart((current) => {
      const nextQuantity = (current[id] || 0) + delta
      const next = { ...current }
      if (nextQuantity <= 0) delete next[id]
      else next[id] = nextQuantity
      return next
    })
  }

  const scrollToMenu = () => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })

  const startCheckout = () => {
    setCartOpen(false)
    setOrder(null)
    setCheckoutOpen(true)
  }

  const submitOrder = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const snapshot = {
      code: `MC${Date.now().toString().slice(-6)}`,
      name: data.get('name'),
      total,
      items: itemCount,
    }
    setOrder(snapshot)
    setCart({})
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Machiico - Trang chủ">
          <img src="/assets/brand-logo.png" alt="" />
          <span>machiico</span>
        </a>
        <nav aria-label="Điều hướng chính">
          <a href="#menu">Thực đơn</a>
          <a href="#story">Câu chuyện</a>
          <a href="#contact">Liên hệ</a>
        </nav>
        <button className="header-cart" type="button" onClick={() => setCartOpen(true)} aria-label={`Mở giỏ hàng, ${itemCount} món`}>
          <ShoppingBag size={20} />
          <span>Giỏ hàng</span>
          <b>{itemCount}</b>
        </button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> Brunch tươi mới mỗi ngày</div>
            <h1>Đừng vội,<br /><em>dừng lại một nhịp.</em></h1>
            <p>Những chiếc croissant sandwich ấm giòn, đầy đặn và vừa đủ để bạn bắt đầu một ngày thật dịu dàng.</p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={scrollToMenu}>Đặt món ngay <ArrowRight size={18} /></button>
              <a className="text-button" href="#story">Khám phá Machiico</a>
            </div>
            <div className="quick-facts">
              <span><Clock3 size={18} /><b>20–30 phút</b><small>Chuẩn bị & giao</small></span>
              <span><ChefHat size={18} /><b>Làm khi bạn đặt</b><small>Luôn tươi mới</small></span>
              <span><Star size={18} /><b>4.9/5</b><small>Khách hàng yêu thích</small></span>
            </div>
          </div>
          <div className="hero-gallery" aria-label="Hình ảnh thương hiệu Machiico từ Canva">
            <img className="hero-cover" src="/assets/brand-cover.png" alt="Croissant sandwich Machiico với tôm, trứng và rau tươi" />
            <img className="hero-square" src="/assets/food-campaign.png" alt="Classic croissant sandwich Machiico" />
            <div className="hero-note"><Croissant size={25} /><span><b>Classic Croissant</b><small>Giòn bên ngoài · Đầy đặn bên trong</small></span></div>
          </div>
        </section>

        <section className="service-strip" aria-label="Cam kết dịch vụ">
          <div><PackageCheck /><span><b>Đóng gói chỉn chu</b><small>Giữ món ngon khi đến tay bạn</small></span></div>
          <div><Truck /><span><b>Giao nhanh nội thành</b><small>Miễn phí cho đơn từ 150.000đ</small></span></div>
          <div><UtensilsCrossed /><span><b>Nguyên liệu tươi</b><small>Chuẩn bị mới trong ngày</small></span></div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <span className="kicker">Chọn món bạn thích</span>
              <h2>Thực đơn hôm nay</h2>
              <p>Kết hợp set có sẵn hoặc thêm topping theo đúng khẩu vị của bạn.</p>
            </div>
            <label className="search-box">
              <Search size={19} />
              <span className="sr-only">Tìm món</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm croissant, bacon..." />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Xóa tìm kiếm"><X size={16} /></button>}
            </label>
          </div>

          <div className="category-tabs" role="tablist" aria-label="Danh mục món">
            {categories.map((category) => (
              <button
                key={category.id}
                className={activeCategory === category.id ? 'active' : ''}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >{category.label}</button>
            ))}
          </div>

          {filteredProducts.length ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <button className="product-details-trigger" type="button" onClick={() => setSelectedProduct(product)} aria-label={`Xem thông tin chi tiết món ${product.name}`} />
                  <ProductVisual product={product} />
                  <div className="product-card-body">
                    <div className="product-meta">
                      <span>{categoryNames[product.category]}</span>
                      {product.badge && <mark>{product.badge}</mark>}
                    </div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-footer">
                      <strong>{formatMoney(product.price)}</strong>
                      {cart[product.id] ? (
                        <QuantityControl compact quantity={cart[product.id]} onDecrease={() => changeQuantity(product.id, -1)} onIncrease={() => changeQuantity(product.id, 1)} />
                      ) : (
                        <button className="add-button" type="button" onClick={() => addToCart(product)}><Plus size={17} /> Thêm</button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-search"><Search size={36} /><h3>Chưa tìm thấy món phù hợp</h3><p>Thử một từ khóa khác hoặc xem toàn bộ thực đơn nhé.</p><button type="button" onClick={() => { setQuery(''); setActiveCategory('all') }}>Xem tất cả món</button></div>
          )}
        </section>

        <section className="brand-story" id="story">
          <div className="story-image-wrap">
            <img src="/assets/machiico-packaging.png" alt="Hộp đóng gói Machiico màu kem và nâu" />
            <span>Đóng gói bằng cả sự dịu dàng</span>
          </div>
          <div className="story-copy">
            <span className="kicker">Một chút bình yên trong ngày</span>
            <h2>Đơn giản, tươi ngon<br />và thật gần gũi.</h2>
            <p>Machiico tin rằng một bữa ăn ngon không cần quá cầu kỳ. Từ lớp bánh croissant giòn nhẹ đến phần nhân đầy đặn, mọi thứ được làm để bạn có thể chậm lại và tận hưởng.</p>
            <ul>
              <li><Check size={17} /> Làm mới sau khi nhận đơn</li>
              <li><Check size={17} /> Chọn thêm topping theo khẩu vị</li>
              <li><Check size={17} /> Bao bì đồng điệu, gọn gàng</li>
            </ul>
            <button className="secondary-button" type="button" onClick={scrollToMenu}>Chọn món của bạn <ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="order-steps">
          <div className="section-heading compact-heading"><div><span className="kicker">Đặt món thật đơn giản</span><h2>Chỉ ba bước là xong</h2></div></div>
          <div className="steps-grid">
            <div><span>01</span><ShoppingBag /><h3>Chọn món</h3><p>Thêm combo và topping bạn yêu thích vào giỏ.</p></div>
            <div><span>02</span><MapPin /><h3>Nhập địa chỉ</h3><p>Để lại thông tin nhận món và lời nhắn cho bếp.</p></div>
            <div><span>03</span><Truck /><h3>Chờ một chút</h3><p>Machiico chuẩn bị món mới và giao đến bạn.</p></div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="footer-brand"><span>machiico</span><p>Fresh food, good mood — delivered to you.</p></div>
        <div><b>Khám phá</b><a href="#menu">Thực đơn</a><a href="#story">Về Machiico</a></div>
        <div><b>Liên hệ</b><a href="mailto:machicostudio@gmail.com">machicostudio@gmail.com</a><a href="tel:0900000000"><Phone size={14} /> 0900 000 000</a></div>
        <div className="footer-note"><small>© 2026 Machiico. Giao diện đặt món demo, không xử lý backend.</small></div>
      </footer>

      <button className="mobile-cart" type="button" onClick={() => setCartOpen(true)} aria-label={`Mở giỏ hàng, ${itemCount} món`}>
        <ShoppingBag size={20} /><span>{itemCount ? `${itemCount} món · ${formatMoney(total)}` : 'Giỏ hàng'}</span>
      </button>

      {cartOpen && (
        <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && setCartOpen(false)}>
          <aside className="cart-drawer" aria-label="Giỏ hàng" aria-modal="true">
            <div className="drawer-header"><div><span>Đơn của bạn</span><h2>Giỏ hàng</h2></div><button type="button" onClick={() => setCartOpen(false)} aria-label="Đóng giỏ hàng"><X /></button></div>
            {cartItems.length ? (
              <>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div className={`cart-thumb tone-${item.tone}`}><Croissant size={24} /></div>
                      <div className="cart-item-info"><b>{item.name}</b><small>{formatMoney(item.price)}</small><QuantityControl compact quantity={item.quantity} onDecrease={() => changeQuantity(item.id, -1)} onIncrease={() => changeQuantity(item.id, 1)} /></div>
                      <button className="remove-item" type="button" onClick={() => changeQuantity(item.id, -item.quantity)} aria-label={`Xóa ${item.name}`}><Trash2 size={17} /></button>
                    </div>
                  ))}
                </div>
                <div className="delivery-progress">
                  <Truck size={18} />
                  {subtotal >= 150000 ? <span><b>Bạn được miễn phí giao hàng!</b><small>Cảm ơn bạn đã chọn Machiico.</small></span> : <span><b>Thêm {formatMoney(150000 - subtotal)} để miễn phí giao</b><small><i style={{ width: `${Math.min(100, subtotal / 1500)}%` }} /></small></span>}
                </div>
                <div className="cart-summary"><span>Tạm tính <b>{formatMoney(subtotal)}</b></span><span>Phí giao hàng <b>{shipping ? formatMoney(shipping) : 'Miễn phí'}</b></span><span className="total-row">Tổng cộng <b>{formatMoney(total)}</b></span></div>
                <button className="checkout-button" type="button" onClick={startCheckout}>Tiến hành đặt món <ArrowRight size={18} /></button>
              </>
            ) : (
              <div className="empty-cart"><div><ShoppingBag size={35} /></div><h3>Giỏ hàng đang trống</h3><p>Một chiếc croissant ấm nóng đang chờ bạn chọn đấy.</p><button type="button" onClick={() => { setCartOpen(false); scrollToMenu() }}>Xem thực đơn</button></div>
            )}
          </aside>
        </div>
      )}

      {checkoutOpen && (
        <div className="overlay modal-overlay" onMouseDown={(event) => event.target === event.currentTarget && setCheckoutOpen(false)}>
          <div className="checkout-modal" role="dialog" aria-modal="true" aria-label="Thông tin đặt món">
            <button className="modal-close" type="button" onClick={() => setCheckoutOpen(false)} aria-label="Đóng"><X /></button>
            {order ? (
              <div className="order-success">
                <div><CheckCircle2 size={44} /></div>
                <span>Đặt món thành công</span>
                <h2>Cảm ơn {order.name}!</h2>
                <p>Mã đơn <b>#{order.code}</b> đã được ghi nhận trên thiết bị này. Đây là bản demo frontend nên đơn chưa được gửi đến cửa hàng.</p>
                <div className="success-ticket"><span>{order.items} món</span><strong>{formatMoney(order.total)}</strong></div>
                <button className="primary-button" type="button" onClick={() => setCheckoutOpen(false)}>Hoàn tất</button>
              </div>
            ) : (
              <>
                <div className="modal-heading"><span>Gần xong rồi</span><h2>Thông tin nhận món</h2><p>Điền thông tin bên dưới để hoàn tất đơn hàng.</p></div>
                <form onSubmit={submitOrder}>
                  <div className="form-row"><label>Họ và tên<input name="name" required placeholder="Nguyễn Minh Anh" autoComplete="name" /></label><label>Số điện thoại<input name="phone" required inputMode="tel" pattern="[0-9 +]{9,15}" placeholder="090 000 0000" autoComplete="tel" /></label></div>
                  <label>Địa chỉ nhận món<div className="input-with-icon"><MapPin size={17} /><input name="address" required placeholder="Số nhà, đường, phường/xã..." autoComplete="street-address" /></div></label>
                  <label>Lời nhắn cho Machiico<textarea name="note" rows="3" placeholder="Ít sốt, giao trước 11:30..." /></label>
                  <fieldset><legend>Phương thức thanh toán</legend><label className="payment-option"><input type="radio" name="payment" value="cod" defaultChecked /><Banknote /><span><b>Thanh toán khi nhận</b><small>Tiền mặt hoặc chuyển khoản lúc giao</small></span><i /></label><label className="payment-option"><input type="radio" name="payment" value="bank" /><PackageCheck /><span><b>Chuyển khoản trước</b><small>Thông tin sẽ hiển thị sau khi đặt</small></span><i /></label></fieldset>
                  <div className="checkout-total"><span>Tổng thanh toán</span><b>{formatMoney(total)}</b></div>
                  <button className="checkout-button" type="submit">Xác nhận đặt món <ArrowRight size={18} /></button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="overlay modal-overlay" onMouseDown={(event) => event.target === event.currentTarget && setSelectedProduct(null)}>
          <div className="product-detail-modal" role="dialog" aria-modal="true" aria-labelledby="product-detail-title">
            <button className="modal-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Đóng thông tin món"><X /></button>
            <div className="product-detail-layout">
              <div className={`detail-media ${selectedProduct.image ? 'has-photo' : ''} ${selectedProduct.imageWide ? 'wide-media' : ''}`}>
                <ProductVisual product={selectedProduct} />
                {!selectedProduct.image && <span className="detail-image-note">Ảnh món sẽ được cập nhật sớm</span>}
              </div>
              <div className="detail-content">
                <div className="detail-meta">
                  <span>{categoryNames[selectedProduct.category]}</span>
                  {selectedProduct.badge && <mark>{selectedProduct.badge}</mark>}
                </div>
                <h2 id="product-detail-title">{selectedProduct.name}</h2>
                <div className="detail-rating"><span><Star size={15} fill="currentColor" /> 4.9</span><small>· Làm mới sau khi bạn đặt</small></div>
                <p className="detail-description">{selectedProduct.description}</p>

                <div className="detail-facts">
                  <div><Clock3 size={18} /><span><small>Chuẩn bị</small><b>{getPreparationTime(selectedProduct)}</b></span></div>
                  <div><ChefHat size={18} /><span><small>Khẩu phần</small><b>1 người</b></span></div>
                  <div><UtensilsCrossed size={18} /><span><small>Phục vụ</small><b>Tươi mới</b></span></div>
                </div>

                <div className="ingredient-section">
                  <h3>Thành phần chính</h3>
                  <div className="ingredient-list">
                    {getIngredients(selectedProduct).map((ingredient) => <span key={ingredient}><Check size={13} /> {ingredient}</span>)}
                  </div>
                </div>

                <div className="detail-note"><Sparkles size={18} /><p><b>Tùy chỉnh theo ý bạn</b><small>Bạn có thể thêm topping hoặc ghi chú khẩu vị ở bước đặt món.</small></p></div>

                <div className="detail-order-row">
                  <div><small>Giá món</small><strong>{formatMoney(selectedProduct.price)}</strong></div>
                  {cart[selectedProduct.id] ? (
                    <QuantityControl quantity={cart[selectedProduct.id]} onDecrease={() => changeQuantity(selectedProduct.id, -1)} onIncrease={() => changeQuantity(selectedProduct.id, 1)} />
                  ) : (
                    <button className="checkout-button detail-add-button" type="button" onClick={() => addToCart(selectedProduct)}><Plus size={18} /> Thêm vào giỏ</button>
                  )}
                </div>
                {cart[selectedProduct.id] && <button className="detail-cart-link" type="button" onClick={() => { setSelectedProduct(null); setCartOpen(true) }}><ShoppingBag size={16} /> Xem giỏ hàng · {cart[selectedProduct.id]} phần</button>}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`toast ${toast ? 'show' : ''}`} role="status"><CheckCircle2 size={19} /> {toast}</div>
    </div>
  )
}

export default App
