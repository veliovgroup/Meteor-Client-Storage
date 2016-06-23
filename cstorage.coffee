###
@locus Client
@class clientStorage
@param driver {Sting} - Preferable driver `localStorage` or `cookies`
@summary Implement boilerplate Client storage functions, localStorage with fall-back to Cookies
###
class clientStorage
  constructor: (driver = null) ->
    @_data = {}
    if navigator.cookieEnabled
      @cookies = new Cookies runOnServer: false
    else
      @cookies = false

    if driver is null
      if @LSSupport
        @ls = window.localStorage or localStorage
      else
        @ls = null
    else if driver is 'localStorage'
      if @LSSupport
        @ls = window.localStorage or localStorage
      else
        console.warn 'ClientStorage is set to "localStorage", but it is not supported on this browser'
    else if driver is 'cookies'
      if @cookies
        @LSSupport = false
        @ls = null
      else
        console.warn 'ClientStorage is set to "cookies", but Cookies is disabled on this browser'
    else
      console.warn 'Wrong ClientStorage driver!'

  ###
  @function
  @memberOf clientStorage
  @name get
  @param {String} key - The name of the stored record to read
  @summary Read a record. If the record doesn't exist a null value will be returned.
  @returns {mixed}
  ###
  get: (key) ->
    if @LSSupport
      @_prepare @ls.getItem(key)
    else if @cookies
      @_prepare @cookies.get(key)
    else
      @_prepare @_data[key]

  ###
  @function
  @memberOf clientStorage
  @name set
  @param {String} key   - The name of the key to create/overwrite
  @param {mixed}  value - The value
  @summary Create/overwrite a value in storage.
  @returns {Boolean}
  ###
  set: (key, value) ->
    if @LSSupport
      @ls.setItem key, @_prepare value
    else if @cookies
      @cookies.set key, @_prepare(value), null, null, false, null
    else
      @_data[key] = @_prepare value
    true

  ###
  @function
  @memberOf clientStorage
  @name remove
  @param {String} key - The name of the record to create/overwrite
  @summary Remove a record.
  @returns {Boolean}
  ###
  remove: (key) ->
    if key and @has(key)
      if @LSSupport
        @ls.removeItem key
        true
      else if @cookies
        @cookies.remove key, null, window.location.host
      else
        delete @_data[key]
        true
    else
      false

  ###
  @function
  @memberOf clientStorage
  @name has
  @param {String} key - The name of the record to check
  @summary Check if record exists
  @returns {Boolean}
  ###
  has: (key) ->
    if @LSSupport
      !!@ls.getItem key
    else if @cookies
      @cookies.has key
    else
      @_data.hasOwnProperty key

  ###
  @function
  @memberOf clientStorage
  @name keys
  @summary Returns all storage keys
  @returns {[String]]}
  ###
  keys: ->
    if @LSSupport
      i = @ls.length
      while i--
        @ls.key i
    else if @cookies
      @cookies.keys()
    else
      Object.keys @_data

  ###
  @function
  @memberOf clientStorage
  @name empty
  @summary Empty storage (remove all key/value pairs)
  @returns {Boolean}
  ###
  empty: ->
    if @LSSupport and @ls.length > 0
      self = @
      @keys().forEach (key) -> self.remove key
      return true
    else if @cookies
      return @cookies.remove()
    else if Object.keys(@_data).length
      @_data = {}
      return true
    else
      return false

  ###
  @function
  @memberOf clientStorage
  @name _prepare
  @param {mix} value - Value to prepare
  @summary Stringify objects and parse strings
  ###
  _prepare: (value) ->
    type = typeof value
    if type is 'function' or type is 'object' and !!value
      return JSON.stringify value
    else
      try
        return JSON.parse(value)
      catch error
        return value

  ###
  @memberOf clientStorage
  @name LSSupport
  @summary Test browser for localStorage support
  ###
  LSSupport: do ->
    try
      support = "localStorage" of window and window.localStorage isnt null
      if support
        window.localStorage.setItem '___test___', 'test'
        window.localStorage.removeItem '___test___'
        return true
      else
        return false
    catch
      false

ClientStorage = new clientStorage()