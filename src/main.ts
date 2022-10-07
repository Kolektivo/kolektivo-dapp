const params = new URLSearchParams(location.search);
const stamp = params.get('seed-data');
if (stamp) {
  void import('./firebase').then(async (x) => await x.seed());
} else {
  import('./app-root');
}
