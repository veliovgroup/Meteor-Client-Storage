###*
@namespace Meteor
@name storage
@type {Object} - Implement boilerplate Client storage functions, localStorage with fall-back to Cookies
###
Meteor.storage =
  
  ###*
  @function
  @namespace Meteor.storage
  @name get
  @param {string} key   - The name of the stored record to read
  @description Read a record. If the record doesn't exist a null value will be returned.
  ###
  get: (key) ->
    if @localStorageSupport()
      @prepare Meteor._localStorage.getItem(key)
    else
      @prepare Meteor.cookie.get(key)

  
  ###*
  @function
  @namespace Meteor.storage
  @name set
  @param {string}  key      - The name of the key to create/overwrite
  @param {mixed}   value    - The value
  @description Create/overwrite a value in storage.
  ###
  set: (key, value) ->
    if @localStorageSupport()
      Meteor._localStorage.setItem key, @prepare(value)
    else
      Meteor.cookie.set key, @prepare(value), null, null, false, null
    true
  
  ###*
  @function
  @namespace Meteor.storage
  @name remove
  @param {string}  key      - The name of the record to create/overwrite
  @description Remove a record.
  ###
  remove: (key) ->
    if key and @has(key)
      if @localStorageSupport()
        Meteor._localStorage.removeItem key
        true
      else
        Meteor.cookie.remove key, null, window.location.host
    else
      false


  ###*
  @function
  @namespace Meteor.storage
  @name has
  @param {string}  key      - The name of the record to check
  @description Check if record exists
  @returns {boolean}
  ###
  has: (key) ->
    if @localStorageSupport()
      return false unless Meteor._localStorage.getItem key
      true
    else
      Meteor.cookie.has key

  ###*
  @function
  @namespace Meteor.storage
  @name keys
  @description Returns all storage keys
  @returns {array}
  ###
  keys: ->
    if @localStorageSupport()
      i = localStorage.length
      while i--
        localStorage.key i
    else
        Meteor.cookie.keys()

  ###*
  @function
  @namespace Meteor.storage
  @name empty
  @description Empty storage (remove all key/value pairs)
  @returns {boolean}
  ###
  empty: ->
    if @localStorageSupport() and localStorage.length > 0
      @keys().forEach (key) ->
        Meteor.storage.remove key

      true
    else
      Meteor.cookie.remove()
  
  ###*
  @function
  @namespace Meteor.storage
  @name remove
  @param {mix}  value       - Value to prepare
  @description Stringify objects and parse strings
  ###
  prepare: (value) ->
    type = typeof value
    if type is 'function' || type is 'object' and !!obj
      JSON.stringify value
    else
      try
        JSON.parse(value)
      catch error
        value

  ###*
  @function
  @namespace SiC.support
  @name localstorage
  @description Test browser for localStorage support
  ###
  localStorageSupport: () ->
    try
      "localStorage" of window and window.localStorage isnt null
    catch
      false