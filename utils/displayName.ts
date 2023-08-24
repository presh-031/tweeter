const generateDefaultDisplayName = (email: any) => {
  const username = email.split("@")[0];
  const displayName = username
    .replace(/\./g, " ")
    .replace(/\b\w/g, (c: any) => c.toUpperCase());
  return displayName;
};
