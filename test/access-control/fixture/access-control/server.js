function filterNavigationItems({
  navigationItems,
  filterContext: userAuthContext,
}) {
  const userGroups = retrieveUserGroups(userAuthContext.token);
  return navigationItems.filter((item) => {
    const allowedGroups = item.permissions.allowed || [];
    return isAllowed(userGroups, allowedGroups);
  });
}

async function filterCaasItems({
  mappedItems,
  referenceMap,
  resolvedReferences,
  filterContext: userAuthContext,
}) {
  const userGroups = retrieveUserGroups(userAuthContext.token);
  const filteredMappedItems = mappedItems.filter((item) => {
    if (item.type === "Image") {
      const permissions = item.meta.md_permissions;
      if (permissions) {
        const firstPermission = permissions.value[0];
        const allowedGroups = firstPermission.allowed.map(
          (group) => group.groupId,
        );
        return isAllowed(userGroups, allowedGroups);
      } else return false;
    } else return true;
  });

  const filteredResolvedReferences = Object.fromEntries(
    Object.entries(resolvedReferences).filter(([key, item]) => {
      if (item.type === "Image") {
        const permissions = item.meta.md_permissions;
        if (permissions) {
          const firstPermission = permissions.value[0];
          const allowedGroups = firstPermission.allowed.map(
            (group) => group.groupId,
          );
          return isAllowed(userGroups, allowedGroups);
        } else return false;
      } else return true;
    }),
  );

  return {
    mappedItems: filteredMappedItems,
    referenceMap,
    resolvedReferences: filteredResolvedReferences,
  };
}

function isAllowed(userGroups, allowedGroups) {
  return userGroups.some((group) => allowedGroups.includes(group));
}

function retrieveUserGroups(userAuthToken) {
  if (!userAuthToken) return ["anonymous"];

  if (Array.isArray(userAuthToken.groups)) return userAuthToken.groups;
  else return [];
}

export default {
  navigationItemFilter: filterNavigationItems,
  caasItemFilter: filterCaasItems,
};
