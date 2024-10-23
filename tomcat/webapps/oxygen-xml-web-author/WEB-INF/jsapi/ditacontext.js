
namespace('sync.api');


/**
 * Editing context for a DITA file.
 *
 * @since 22
 * @class
 */
export default class DitaContext {
  /**
   * @param {string} ditamapUrl The URL of the context DITA Map - used for resolving keys and to display.
   * @param {string} filterUrl The URL of the DITAVAL filter used to conditionally include and exclude content from
   * both the DITA Map and the editor.
   * @param {boolean=} opt_guessed true if the DITA map or project URL is guessed from the history rather that provided
   * by the user explicitly.
   * @param {string=} opt_ditaProjectUrl The URL of the context DITA Project (@since 26.1). See more details about DITA Project XML files here:
   * https://www.dita-ot.org/dev/topics/using-project-files.html
   * @param {string=} opt_contextId The id of the DITA project context (@since 26.1)
   * @param {boolean=} opt_isProjectActive If DITA project is currently active (@since 26.1)
   *
   * @constructor
   */
  constructor(
   ditamapUrl,
   filterUrl,
   opt_guessed,
   opt_ditaProjectUrl,
   opt_contextId,
   opt_isProjectActive
  ) {
   /**
    * The URL of the context DITA Map - used for resolving keys and to display.
    * @type {string}
    */
   this.ditamapUrl = null;

   /**
    * The URL of the DITAVAL filter used to conditionally include and exclude content from
    * both the DITA Map and the editor.
    *
    * @type {string}
    */
   this.filterUrl = null;

   /**
    * true if the DITA map URL is guessed from the history.
    * @type {boolean}
    */
   this.guessed = null;

   /**
    * The URL of the DITA Project
    * @type {string}
    */
   this.ditaProjectUrl = null;

   /**
    * The id of the DITA context.
    * @type {string}
    */
   this.ditaProjectContextId = null;

   /**
    * True if DITA project is active.
    * @type {boolean}
    */
   this.isProjectActive = null;
  }
}

sync.api.DitaContext = DitaContext;

