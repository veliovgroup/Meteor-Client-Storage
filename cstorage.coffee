###
@class clientStorage
@description Implement boilerplate Client storage functions, localStorage with fall-back to Cookies
###
class clientStorage
  constructor: (driver = null) ->
    @cookies   = new Cookies runOnServer: false
    @LSSupport = @_localStorageSupport()
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
      @LSSupport = false
      @ls = null
    else
      console.warn 'Wrong ClientStorage driver!'
  
  ###
  @function
  @namespace clientStorage
  @name get
  @param {String} key - The name of the stored record to read
  @description Read a record. If the record doesn't exist a null value will be returned.
  @returns {mixed}
  ###
  get: (key) ->
    if @LSSupport
      @_prepare @ls.getItem(key)
    else
      @_prepare @cookies.get(key)
  
  ###
  @function
  @namespace clientStorage
  @name set
  @param {String} key   - The name of the key to create/overwrite
  @param {mixed}  value - The value
  @description Create/overwrite a value in storage.
  @return {Boolean}
  ###
  set: (key, value) ->
    if @LSSupport
      @ls.setItem key, @_prepare(value)
    else
      @cookies.set key, @_prepare(value), null, null, false, null
    true
  
  ###
  @function
  @namespace clientStorage
  @name remove
  @param {String} key - The name of the record to create/overwrite
  @description Remove a record.
  @returns {Boolean}
  ###
  remove: (key) ->
    if key and @has(key)
      if @LSSupport
        @ls.removeItem key
        true
      else
        @cookies.remove key, null, window.location.host
    else
      false
  
  ###
  @function
  @namespace clientStorage
  @name has
  @param {String} key - The name of the record to check
  @description Check if record exists
  @returns {Boolean}
  ###
  has: (key) ->
    if @LSSupport
      !!@ls.getItem key
    else
      @cookies.has key
  
  ###
  @function
  @namespace clientStorage
  @name keys
  @description Returns all storage keys
  @returns {[String]]}
  ###
  keys: ->
    if @LSSupport
      i = @ls.length
      while i--
        @ls.key i
    else
        @cookies.keys()
  
  ###
  @function
  @namespace clientStorage
  @name empty
  @description Empty storage (remove all key/value pairs)
  @returns {Boolean}
  ###
  empty: ->
    if @LSSupport and @ls.length > 0
      @keys().forEach (key) => @remove key
      true
    else
      @cookies.remove()
  
  ###
  @function
  @namespace clientStorage
  @name _prepare
  @param {mix}  value - Value to prepare
  @description Stringify objects and parse strings
  ###
  _prepare: (value) ->
    type = typeof value
    if type is 'function' or type is 'object' and !!value
      JSON.stringify value
    else
      try
        JSON.parse(value)
      catch error
        value
  
  ###
  @function
  @namespace clientStorage
  @name localstorage
  @description Test browser for localStorage support
  @return {Boolean}
  ###
  _localStorageSupport: =>
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