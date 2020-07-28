/**
 * Aids in setting the columns for the Table component. Has baked in functionality for responsive support if that's
 * ever needed in the future.
 */
export class ColumnConfiguration {
  constructor({ desktop, tablet, mobile }) {
    if (Array.isArray(desktop)) {
      this.desktop = desktop;
    } else {
      this.desktop = [];
    }

    if (Array.isArray(tablet)) {
      this.tablet = tablet;
    } else {
      this.tablet = [];
    }

    if (Array.isArray(mobile)) {
      this.mobile = mobile;
    } else {
      this.mobile = [];
    }
  }

  // Setters
  setDesktop(desktop) {
    if (Array.isArray(desktop)) {
      this.desktop = desktop;
    }
  }

  setTablet(tablet) {
    if (Array.isArray(tablet)) {
      this.tablet = tablet;
    }
  }

  setMobile(mobile) {
    if (Array.isArray(mobile)) {
      this.mobile = mobile;
    }
  }

  // Methods

  /**
   * Insert Column
   *
   * @param {number} columnIndex
   * @param {object} column => new column that will go into the array
   */
  insertDesktopColumn(columnIndex, column) {
    if (this.desktop && columnIndex >= 0 && this.desktop.length > columnIndex) {
      this.desktop.splice(columnIndex, 0, column);
    }
  }

  insertTabletColumn(columnIndex, column) {
    if (this.tablet && columnIndex >= 0 && this.tablet.length > columnIndex) {
      this.tablet.splice(columnIndex, 0, column);
    }
  }

  insertMobileColumn(columnIndex, column) {
    if (this.mobile && columnIndex >= 0 && this.mobile.length > columnIndex) {
      this.mobile.splice(columnIndex, 0, column);
    }
  }

  /**
   * Remove Column
   *
   * @param {number} columnIndex
   */
  removeDesktopColumn(columnIndex) {
    if (this.desktop && columnIndex >= 0 && this.desktop.length > columnIndex) {
      this.desktop.splice(columnIndex, 1);
    }
  }

  removeTabletColumn(columnIndex) {
    if (this.tablet && columnIndex >= 0 && this.tablet.length > columnIndex) {
      this.tablet.splice(columnIndex, 1);
    }
  }

  removeMobileColumn(columnIndex) {
    if (this.mobile && columnIndex >= 0 && this.mobile.length > columnIndex) {
      this.mobile.splice(columnIndex, 1);
    }
  }

  /**
   * Update Column Widths
   *
   * @param {String} newWidth
   * @param {Array} exceptions => array of column indexes you want excluded from the update
   */
  updateDesktopColumnWidths(newWidth, exceptions = []) {
    this.desktop = this.desktop.map((column, index) => {
      if (!exceptions.includes(index)) {
        column.width = newWidth;
      }
      return column;
    });
  }

  updateTabletColumnWidths(newWidth, exceptions = []) {
    this.tablet = this.tablet.map((column, index) => {
      if (!exceptions.includes(index)) {
        column.width = newWidth;
      }
      return column;
    });
  }

  updateMobileColumnWidths(newWidth, exceptions = []) {
    this.mobile = this.mobile.map((column, index) => {
      if (!exceptions.includes(index)) {
        column.width = newWidth;
      }
      return column;
    });
  }

  /**
   * Update Specific Column Width
   *
   * @param {String} newWidth
   * @param {number} index => index of element you want updated
   */
  updateDesktopSpecificColumnWidth(newWidth, index) {
    if (index >= 0 && this.desktop.length > index) {
      this.desktop[index].width = newWidth;
    }
  }

  updateTabletSpecificColumnWidth(newWidth, index) {
    if (index >= 0 && this.tablet.length > index) {
      this.tablet[index].width = newWidth;
    }
  }

  updateMobileSpecificColumnWidth(newWidth, index) {
    if (index >= 0 && this.mobile.length > index) {
      this.mobile[index].width = newWidth;
    }
  }

  /**
   * Update Specific Column Variable
   *
   * @param {number} index => index of element you want updated
   * @param {String} key
   * @param {number} value
   * mediaType must be either desktop, tablet, or mobile
   * @param {String} mediaType
   */
  updateSpecificColumnVariable(index, key, value, mediaType = "desktop") {
    if (index >= 0 && this[mediaType] && this[mediaType].length > index) {
      this[mediaType][index][key] = value;
    }
  }

  /**
   * Set/Update Specific Column's columnLinkHooksRefKeys
   *
   * @param {number} index => index of element you want updated
   * @param {array} newList => list of keys desired on the hook for the Link in the table cell
   */
  setDesktopColumnLinkHooksRefKeys(index, newList) {
    if (index >= 0 && this.desktop.length > index) {
      this.desktop[index].columnLinkHooksRefKeys = newList;
    }
  }

  setTabletColumnLinkHooksRefKeys(index, newList) {
    if (index >= 0 && this.tablet.length > index) {
      this.tablet[index].columnLinkHooksRefKeys = newList;
    }
  }

  setMobileColumnLinkHooksRefKeys(index, newList) {
    if (index >= 0 && this.mobile.length > index) {
      this.mobile[index].columnLinkHooksRefKeys = newList;
    }
  }
}

export const ColumnConfigurationHelperFunctions = {
  /**
   * Get Hooks from columnLinkHooksRefKeys
   *
   * @param {object} rowData
   * @param {Array} columnLinkHooksRefKeys
   */
  getHooks: (columnLinkHooksRefKeys, rowData) => {
    let hooks = {};
    if (columnLinkHooksRefKeys && Array.isArray(columnLinkHooksRefKeys) && rowData) {
      columnLinkHooksRefKeys.forEach(hookKey => {
        if (rowData[hookKey] || rowData[hookKey] === 0) {
          hooks[hookKey] = rowData[hookKey];
        }
      });
    }

    return hooks;
  }
};
