
// Copyright 2005 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// Copyright (c) 2018 Syncro Soft SRL - All Rights Reserved.
// Removed parts that are not considered parts of the Oxygen XML Web Author API.

/**
 * A base class for event objects, so that they can support preventDefault and
 * stopPropagation.
 *
 * @suppress {underscore} Several properties on this class are technically
 *     public, but referencing these properties outside this package is strongly
 *     discouraged.
 *
 * @param {string|!goog.events.EventId} type Event Type.
 * @param {Object=} opt_target Reference to the object that is the target of
 *     this event. It has to implement the `EventTarget` interface
 *     declared at {@link http://developer.mozilla.org/en/DOM/EventTarget}.
 * @constructor
 */
goog.events.Event = function(type, opt_target) {
 /**
  * Event type.
  * @type {string}
  */
 this.type = null;

 /**
  * Target of the event.
  * @type {Object|undefined}
  */
 this.target = null;

 /**
  * Object that had the listener attached.
  * @type {Object|undefined}
  */
 this.currentTarget = null;

 /**
  * Whether the default action has been prevented.
  * This is a property to match the W3C specification at
  * {@link http://www.w3.org/TR/DOM-Level-3-Events/
 * #events-event-type-defaultPrevented}.
  * Must be treated as read-only outside the class.
  * @type {boolean}
  */
 this.defaultPrevented = null;
};


/**
 * Stops event propagation.
 */
goog.events.Event.prototype.stopPropagation = function() {};


/**
 * Prevents the default action, for example a link redirecting to a url.
 */
goog.events.Event.prototype.preventDefault = function() {};
