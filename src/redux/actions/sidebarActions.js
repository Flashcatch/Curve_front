export const CHANGE_SIDEBAR_VISIBILITY = 'CHANGE_SIDEBAR_VISIBILITY';
export const CHANGE_MOBILE_SIDEBAR_VISIBILITY = 'CHANGE_MOBILE_SIDEBAR_VISIBILITY';
export const CHANGE_SIDEBAR_LINK = 'CHANGE_SIDEBAR_LINK';

export function changeSidebarVisibility() {
  return {
    type: CHANGE_SIDEBAR_VISIBILITY
  };
}

export function changeMobileSidebarVisibility() {
  return {
    type: CHANGE_MOBILE_SIDEBAR_VISIBILITY
  };
}

export const changeSidebarLink = ( params ) => ({type: CHANGE_SIDEBAR_LINK, params});

