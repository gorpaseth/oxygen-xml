
/*
 * Copyright (c) 2021 Syncro Soft SRL - All Rights Reserved.
 *
 * This file contains proprietary and confidential source code.
 * Unauthorized copying of this  file, via any medium, is strictly prohibited.
 */

namespace('sync.api.change_tracking');


/**
 * Possible initial states for the change tracking feature.
 * @enum {String}
 */
sync.api.change_tracking.ChangeTrackingInitialState = {
  /**
   * The status of change tracking is determined by server's global options.
   */
  DEFAULT: 'default',
  /**
   * Change tracking is ENABLED but the user can disable it using a toolbar action.
   */
  ENABLED: 'enabled',
  /**
   * Change tracking is ENABLED and the user cannot disable it. She can reject her own changes but cannot accept or reject other changes.
   */
  FORCED: 'forced',
  /**
   * Change tracking is DISABLED and the user cannot enable it. She can reject her own changes but cannot accept or reject other changes.
   */
  FORCED_OFF: 'forcedOff'
};

