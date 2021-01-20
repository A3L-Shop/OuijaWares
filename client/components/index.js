/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as AllProducts} from './AllProducts'
export {default as SingleProduct} from './SingleProduct'
export {default as Cart} from './Cart'
export {default as Login} from './auth/LogInForm'
export {default as Signup} from './auth/SignUpForm'
export {default as ConfirmCheckout} from './ConfirmCheckout'
export {default as NotFound} from './error/NotFound'
export {default as Error500} from './error/Error500'
export {default as GuestCheckout} from './GuestCheckout'
export {default as GuestCheckoutForm} from './GuestCheckoutForm'
export {default as UsersView} from './admin/UsersView'
export {default as CartQuantity} from './CartQuantity'
export {default as InventoryView} from './admin/InventoryView'
