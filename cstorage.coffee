###
@class clientStorage
@description Implement boilerplate Client storage functions, localStorage with fall-back to Cookies
###
class clientStorage
  constructor: () ->
    @cookies = new Cookies runOnServer: false
  
  ###
  @function
  @namespace clientStorage
  @name get
  @param {String} key - The name of the stored record to read
  @description Read a record. If the record doesn't exist a null value will be returned.
  @returns {mixed}
  ###
  get: (key) ->
    if @_localStorageSupport()
      @_prepare Meteor._localStorage.getItem(key)
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
    if @_localStorageSupport()
      Meteor._localStorage.setItem key, @_prepare(value)
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
      if @_localStorageSupport()
        Meteor._localStorage.removeItem key
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
    if @_localStorageSupport()
      !!Meteor._localStorage.getItem key
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
    if @_localStorageSupport()
      i = localStorage.length
      while i--
        localStorage.key i
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
    if @_localStorageSupport() and localStorage.length > 0
      @keys().forEach (key) => @remove key
      true
    else
      @cookies.remove()
  
  ###*
  @function
  @namespace clientStorage
  @name _prepare
  @param {mix}  value - Value to prepare
  @description Stringify objects and parse strings
  ###
  _prepare: (value) ->
    type = typeof value
    if type is 'function' || type is 'object' and !!value
      JSON.stringify value
    else
      try
        JSON.parse(value)
      catch error
        value

  ###*
  @function
  @namespace clientStorage
  @name localstorage
  @description Test browser for localStorage support
  @return {Boolean}
  ###
  _localStorageSupport: ->
    try
      "localStorage" of window and window.localStorage isnt null
    catch
      false

ClientStorage = new clientStorage()