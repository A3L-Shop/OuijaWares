# Code Review II


## MVP AUDIT

* Need UX feedack on adding to cart
    * Can be toast or just a span of line-items nexxt to cart in header
* Remove Redux logging middleware from production 
* Same for browser-side console.logs
* Excellent job implementing MVP
* excellent Responsive Design

## CODE REVIEW

* Excellent Security Gates!
* Also good to see Route tests 
* How to test for authenticated User?
    * Hard way: create a mock session store
    * Eas(ier) way: create a user **stub**!
    ```
        req.user = {name : Spoopy, isAdmin : true, id: 666} 
    ```
    * Stub = create data type for non-existant entity
        * creating fake users, products, etc
        * creating fake user classes
        * Bypassing auth

    * Spy = wrapper function that returns if callback was invoked
        * checking if instance/class methods are invoked
        * checking if correct middleware is hit

    * Mock = replacement wholesale for a function
        * prevents db from being polluted
        * adding testing data to cart
        ``` 
        const mockCreate = () => {name : "Tom Joad", id : 5};
        // avoid this
        let ghostOfTomJoad = Ghost.create()
        // do this
        let ghostOfTomJoadMock = mockCreate()
        ```
### Schema Design
    * Good job implementing suggestions from last time
    * How can we preserve price at time of purchase?
        * prop = currPrice to preserve

### Client-Side

    * Remove `console.logs` from deployed code
    * How can we leverage heartbeat fn to conditionally render front-end components?

    ```javascript
    // allows browser to access user stored on back-end!
    router.get('/me', (req, res) => {
        res.json(req.user)
    })
    ```

    ```javascript

    class NavBar {
        constructor() {
            this.state = {
                user : {}
            }
        }

        async componentDidMount() {
            let user = await axios.get('/api/me')
            this.setState({user})
        }
        render() {
            return(
                <div>
                    {
                        this.state.isAdmin ? <InventoryLink /> : null
                    }
                </div>
            )
        }
    }


    ```



* ForEach err in fetchUserCart Thunk
    * conditionally fetch cart
    * add condition around dispatch

## REMAINING TASKS (MVP)

* admin features
    * User List
        * Conditionally render/link in Nav
    * Inventory
        * Easy win to also implement +/- components for Admins on Product List

* UX Updates
    * Simple: incluide <span> of items in cart in nav
    * Alternative: Toast notifcations
        * You can use built-in library, or role your own
        * CSS: use transition property on display/ to remove from DOM
        * React: set timeOut on state, to clear after 2-3s have elapsed and remove component from Virtual DOM

## FEATURE ROADMAP

* User who enter a PROMOCODE get 50% off total order
* PromoCode = "SpookyScarySale"

* React form for promo code
* validating form (and keep it secret from prying eyes in browser or github repo)
* Order should perhaps have "Total Price" virtual method, calculated based on line items and halve it if promocode request made

BONUS
* Admin can CRUD promo code for future sales