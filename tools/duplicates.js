// Two pages are duplicates if both exist and their titles match.
function isDuplicate(pageA, pageB) {
  if (!pageA || !pageB) {
    return false;
  }
  return pageA.title === pageB.title;
}
module.exports = { isDuplicate };
